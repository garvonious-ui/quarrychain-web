"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ScrollSphereProps {
  className?: string;
  /**
   * Optional scroll-progress controller. If provided, ScrollSphere calls it
   * each frame instead of reading window.scrollY. Use this when an outer
   * component (e.g. a sticky pinned hero) owns the scroll math. Should
   * return a value in [0, 1] — can be a triangular wave where 0 = compact,
   * 1 = peak expansion, and back to 0.
   */
  getScrollProgress?: () => number;
}

// ===== Tunable constants =====

// Subdivided icosahedron → Goldberg polyhedron (the hex-tiled sphere).
// Levels: 2 → 162 cells, 3 → 642 cells, 4 → 2562 cells (heavy).
// Always 12 pentagons; rest are hexagons.
const ICO_SUBDIV = 3;
const SPHERE_RADIUS = 1.2;

// Scroll-driven radial displacement — each cell translates outward along
// its own radial direction as you scroll. At rest: perfect tiling, no gaps.
// At peak: cells have spread apart slightly (noise-modulated) creating
// small visible gaps — the "blooming" fragmentation effect.
const MAX_DISPLACEMENT = 0.9;

// Breathing — subtle continuous motion at rest.
const BREATHING_AMPLITUDE = 0.015;
const BREATHING_SPEED = 0.4;

// Parent-group rotation (applies to whole constellation).
const MOUSE_TILT_X = 0.12;
const MOUSE_TILT_Y = 0.18;
const MOUSE_LERP = 0.05;
const AUTO_ROT_Y = 0.0015;
const AUTO_ROT_X = 0.0005;

// Per-cell base color gradient (vertical by Y) + red accent on displacement.
const COLOR_TOP = new THREE.Color(0x3b82f6);      // qc-blue
const COLOR_BOTTOM = new THREE.Color(0x14b8a6);   // qc-teal
const COLOR_DISPLACED = new THREE.Color(0xef4444); // qc-red

// ===== Backdrop layers =====
// Two fainter wireframe shapes behind the hex-sphere for depth, same as
// the previous iteration when the main shape was the icosphere. Simple
// wireframes (no shader), auto-rotate only — no scroll or mouse input,
// so focus stays on the main hex-sphere.
const MID_GEO_RADIUS = 1.8;
const MID_GEO_SUBDIV = 1;
const MID_OPACITY = 0.1;
const MID_COLOR = 0x3b82f6; // qc-blue
const MID_ROT_Y = -0.0008;  // counter-rotates vs main
const MID_ROT_X = 0.0004;

const FAR_GEO_RADIUS = 2.5;
const FAR_GEO_SUBDIV = 0;
const FAR_OPACITY = 0.07;
const FAR_COLOR = 0x14b8a6; // qc-teal
const FAR_ROT_Y = 0.0005;
const FAR_ROT_X = -0.0003;

// Camera
const CAMERA_FOV = 55;
const CAMERA_Z = 5;

// ===== Geometry helpers =====

/**
 * Deduplicates positions in a non-indexed BufferGeometry, returning unique
 * vertices + face-index triples. THREE.IcosahedronGeometry ships unindexed
 * with duplicated verts at shared corners; we need unique verts to build
 * the dual polyhedron.
 */
function mergeIdenticalVertices(
  geo: THREE.BufferGeometry
): { verts: THREE.Vector3[]; faces: [number, number, number][] } {
  const pos = geo.attributes.position;
  const count = pos.count;

  const precision = 1e5;
  const keyFor = (v: THREE.Vector3) =>
    `${Math.round(v.x * precision)}:${Math.round(v.y * precision)}:${Math.round(v.z * precision)}`;

  const uniqueVerts: THREE.Vector3[] = [];
  const keyToIndex = new Map<string, number>();
  const rawToUnique = new Array<number>(count);

  for (let i = 0; i < count; i++) {
    const v = new THREE.Vector3().fromBufferAttribute(pos, i);
    const key = keyFor(v);
    let idx = keyToIndex.get(key);
    if (idx === undefined) {
      idx = uniqueVerts.length;
      uniqueVerts.push(v);
      keyToIndex.set(key, idx);
    }
    rawToUnique[i] = idx;
  }

  const faces: [number, number, number][] = [];
  for (let i = 0; i < count; i += 3) {
    faces.push([rawToUnique[i], rawToUnique[i + 1], rawToUnique[i + 2]]);
  }

  return { verts: uniqueVerts, faces };
}

/**
 * Builds the dual polyhedron's polygons. For each vertex of the subdivided
 * icosahedron, collects all adjacent face centroids and sorts them
 * tangentially around the vertex to form the polygon (hex or pent).
 *
 * Returns: each polygon's radial center direction (unit vector) and its
 * ordered vertex positions in world space (at rest, on the sphere surface).
 */
function buildGoldbergPolygons(
  verts: THREE.Vector3[],
  faces: [number, number, number][]
): { centerDir: THREE.Vector3; polyVerts: THREE.Vector3[] }[] {
  // Face centroids.
  const centroids = faces.map((f) =>
    new THREE.Vector3()
      .add(verts[f[0]])
      .add(verts[f[1]])
      .add(verts[f[2]])
      .divideScalar(3)
  );

  // Vertex → adjacent face indices.
  const vertFaces = new Map<number, number[]>();
  for (let fi = 0; fi < faces.length; fi++) {
    for (const vi of faces[fi]) {
      let list = vertFaces.get(vi);
      if (!list) {
        list = [];
        vertFaces.set(vi, list);
      }
      list.push(fi);
    }
  }

  const out: { centerDir: THREE.Vector3; polyVerts: THREE.Vector3[] }[] = [];

  for (const [vi, adjFaceIndices] of vertFaces) {
    if (adjFaceIndices.length < 3) continue;

    const vertPos = verts[vi];
    const centerDir = vertPos.clone().normalize();
    const adjCentroids = adjFaceIndices.map((fi) => centroids[fi]);

    // Build tangent basis at this vertex to sort centroids by angle.
    const up =
      Math.abs(centerDir.y) < 0.99
        ? new THREE.Vector3(0, 1, 0)
        : new THREE.Vector3(1, 0, 0);
    const tangent = new THREE.Vector3().crossVectors(up, centerDir).normalize();
    const bitangent = new THREE.Vector3().crossVectors(centerDir, tangent);

    const withAngles = adjCentroids.map((c, i) => {
      const d = c.clone().sub(vertPos);
      return { angle: Math.atan2(d.dot(bitangent), d.dot(tangent)), i };
    });
    withAngles.sort((a, b) => a.angle - b.angle);

    const polyVerts = withAngles.map((wa) => adjCentroids[wa.i]);

    out.push({ centerDir, polyVerts });
  }

  return out;
}

export default function ScrollSphere({
  className,
  getScrollProgress,
}: ScrollSphereProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const getScrollProgressRef = useRef(getScrollProgress);
  getScrollProgressRef.current = getScrollProgress;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // ===== Scene =====
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      CAMERA_FOV,
      width / height,
      0.1,
      100
    );
    camera.position.set(0, 0, CAMERA_Z);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ===== Build Goldberg polyhedron =====
    const icoGeo = new THREE.IcosahedronGeometry(SPHERE_RADIUS, ICO_SUBDIV);
    const { verts: icoVerts, faces: icoFaces } = mergeIdenticalVertices(icoGeo);
    icoGeo.dispose();
    const polygons = buildGoldbergPolygons(icoVerts, icoFaces);

    // Total edge count across all polygons (each polygon contributes one
    // edge per vertex since we treat it as a closed loop).
    let totalEdges = 0;
    for (const p of polygons) totalEdges += p.polyVerts.length;

    // Positions: 2 endpoints per edge × 3 floats per endpoint.
    const positionsArray = new Float32Array(totalEdges * 2 * 3);
    const colorsArray = new Float32Array(totalEdges * 2 * 3);

    // Per-polygon metadata for per-frame animation.
    type PolyData = {
      centerDir: THREE.Vector3;    // unit radial direction
      restVerts: THREE.Vector3[];  // rest-position polygon vertices
      writeStart: number;          // offset into positionsArray (in floats)
      writeCount: number;          // number of floats this polygon owns
      noise: number;               // 0..1 random seed for displacement variety
      baseColor: THREE.Color;
    };

    const polyData: PolyData[] = [];
    let cursor = 0;
    for (const poly of polygons) {
      const gradT = (poly.centerDir.y + 1) * 0.5;
      const baseColor = new THREE.Color()
        .copy(COLOR_BOTTOM)
        .lerp(COLOR_TOP, gradT);
      const writeCount = poly.polyVerts.length * 2 * 3;
      polyData.push({
        centerDir: poly.centerDir,
        restVerts: poly.polyVerts.map((v) => v.clone()),
        writeStart: cursor,
        writeCount,
        noise: Math.random(),
        baseColor,
      });
      cursor += writeCount;
    }

    // Write initial (rest) positions + base colors.
    const tmpColor = new THREE.Color();
    for (const pd of polyData) {
      let off = pd.writeStart;
      for (let i = 0; i < pd.restVerts.length; i++) {
        const a = pd.restVerts[i];
        const b = pd.restVerts[(i + 1) % pd.restVerts.length];
        positionsArray[off++] = a.x;
        positionsArray[off++] = a.y;
        positionsArray[off++] = a.z;
        positionsArray[off++] = b.x;
        positionsArray[off++] = b.y;
        positionsArray[off++] = b.z;
      }
      tmpColor.copy(pd.baseColor);
      let coff = pd.writeStart;
      for (let i = 0; i < pd.restVerts.length * 2; i++) {
        colorsArray[coff++] = tmpColor.r;
        colorsArray[coff++] = tmpColor.g;
        colorsArray[coff++] = tmpColor.b;
      }
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(positionsArray, 3));
    lineGeo.setAttribute("color", new THREE.BufferAttribute(colorsArray, 3));

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.6, // slightly lower since we're drawing ~4× more lines now
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const lineSegs = new THREE.LineSegments(lineGeo, lineMat);

    const constellation = new THREE.Group();
    constellation.add(lineSegs);
    scene.add(constellation);

    const posAttr = lineGeo.getAttribute("position") as THREE.BufferAttribute;
    const colAttr = lineGeo.getAttribute("color") as THREE.BufferAttribute;

    // ===== Backdrop: mid layer (octahedron) =====
    const midGeo = new THREE.OctahedronGeometry(MID_GEO_RADIUS, MID_GEO_SUBDIV);
    const midMat = new THREE.MeshBasicMaterial({
      color: MID_COLOR,
      wireframe: true,
      transparent: true,
      opacity: MID_OPACITY,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const midMesh = new THREE.Mesh(midGeo, midMat);
    scene.add(midMesh);

    // ===== Backdrop: far layer (dodecahedron) =====
    const farGeo = new THREE.DodecahedronGeometry(FAR_GEO_RADIUS, FAR_GEO_SUBDIV);
    const farMat = new THREE.MeshBasicMaterial({
      color: FAR_COLOR,
      wireframe: true,
      transparent: true,
      opacity: FAR_OPACITY,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const farMesh = new THREE.Mesh(farGeo, farMat);
    scene.add(farMesh);

    // ===== Scroll progress =====
    let scrollProgress = 0;
    let targetScrollProgress = 0;
    const hasExternalProgress = !!getScrollProgressRef.current;

    const updateInternalScroll = () => {
      const vh = window.innerHeight;
      targetScrollProgress = Math.max(
        0,
        Math.min(1, window.scrollY / Math.max(vh, 1))
      );
    };
    if (!hasExternalProgress) {
      updateInternalScroll();
      window.addEventListener("scroll", updateInternalScroll, {
        passive: true,
      });
    }

    // ===== Mouse tilt =====
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // ===== Resize =====
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // ===== Animate =====
    let time = 0;
    let tiltX = 0;
    let tiltY = 0;

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      if (!reducedMotion) {
        time += 0.016;

        const external = getScrollProgressRef.current;
        if (external) {
          targetScrollProgress = Math.max(0, Math.min(1, external()));
        }
        scrollProgress += (targetScrollProgress - scrollProgress) * 0.08;

        // Per-polygon updates: displace along radial + color lerp toward red.
        for (const pd of polyData) {
          const scrollDisp =
            scrollProgress * (0.3 + pd.noise * 0.7) * MAX_DISPLACEMENT;
          const breathing =
            Math.sin(time * BREATHING_SPEED + pd.noise * 6.28) *
            BREATHING_AMPLITUDE;
          const disp = scrollDisp + breathing;

          const tx = pd.centerDir.x * disp;
          const ty = pd.centerDir.y * disp;
          const tz = pd.centerDir.z * disp;

          // Rewrite polygon's line-segment endpoints with displaced positions.
          let off = pd.writeStart;
          for (let i = 0; i < pd.restVerts.length; i++) {
            const a = pd.restVerts[i];
            const b = pd.restVerts[(i + 1) % pd.restVerts.length];
            positionsArray[off++] = a.x + tx;
            positionsArray[off++] = a.y + ty;
            positionsArray[off++] = a.z + tz;
            positionsArray[off++] = b.x + tx;
            positionsArray[off++] = b.y + ty;
            positionsArray[off++] = b.z + tz;
          }

          // Color: base → red as this cell fragments outward.
          const redT = Math.min(1, scrollDisp * 1.3);
          tmpColor.copy(pd.baseColor).lerp(COLOR_DISPLACED, redT);
          let coff = pd.writeStart;
          for (let i = 0; i < pd.restVerts.length * 2; i++) {
            colorsArray[coff++] = tmpColor.r;
            colorsArray[coff++] = tmpColor.g;
            colorsArray[coff++] = tmpColor.b;
          }
        }
        posAttr.needsUpdate = true;
        colAttr.needsUpdate = true;

        // Whole-constellation rotation.
        tiltX += (mouseY * MOUSE_TILT_X - tiltX) * MOUSE_LERP;
        tiltY += (mouseX * MOUSE_TILT_Y - tiltY) * MOUSE_LERP;
        constellation.rotation.x = tiltX + time * AUTO_ROT_X;
        constellation.rotation.y = tiltY + time * AUTO_ROT_Y;

        // Backdrop layers — independent rotation, no mouse/scroll input.
        midMesh.rotation.x += MID_ROT_X;
        midMesh.rotation.y += MID_ROT_Y;
        farMesh.rotation.x += FAR_ROT_X;
        farMesh.rotation.y += FAR_ROT_Y;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      if (!hasExternalProgress) {
        window.removeEventListener("scroll", updateInternalScroll);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      lineGeo.dispose();
      lineMat.dispose();
      midGeo.dispose();
      midMat.dispose();
      farGeo.dispose();
      farMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
