"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface FloatingHexProps {
  className?: string;
  /** Hex color as a number literal (e.g. 0x22c55e). */
  color?: number;
  /** Outer radius of the hex. */
  radius?: number;
  /** Extrusion depth — gives the hex prism 3D thickness so it stays
   *  visible when tumbling edge-on. */
  depth?: number;
  /** Line opacity. */
  opacity?: number;
  /** Color of the enveloping backdrop shape. */
  backdropColor?: number;
  /** Backdrop opacity. Set to 0 to disable the backdrop. */
  backdropOpacity?: number;
  /** Backdrop radius as a multiplier of `radius`. */
  backdropScale?: number;
}

/**
 * A single extruded hexagonal prism rendered as wireframe edges, tumbling
 * slowly on a tilted axis. Same visual vocabulary as the brand-frame hexes
 * that briefly lived in the hero. Intended as a decorative accent between
 * sections — no scroll reaction, no mouse tilt, keeps focus on adjacent
 * content.
 */
export default function FloatingHex({
  className,
  color = 0x22c55e,
  radius = 1.0,
  depth = 0.3,
  opacity = 0.5,
  backdropColor = 0x14b8a6, // qc-teal by default
  backdropOpacity = 0.2,
  backdropScale = 1.75, // a bit more distance between hex and shell
}: FloatingHexProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 4);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Build hex prism → edges wireframe.
    const shape = new THREE.Shape();
    for (let i = 0; i < 6; i++) {
      const a = Math.PI / 2 - (i * Math.PI) / 3;
      const x = radius * Math.cos(a);
      const y = radius * Math.sin(a);
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.closePath();

    const extrude = new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: false,
      curveSegments: 1,
    });
    const edges = new THREE.EdgesGeometry(extrude, 30);
    extrude.dispose();

    const mat = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const mesh = new THREE.LineSegments(edges, mat);
    // Initial tilt so we don't see a flat-facing hex on first paint.
    mesh.rotation.x = Math.PI / 6;
    mesh.rotation.y = Math.PI / 8;
    // Center the prism on its depth axis so rotation pivots around the
    // center, not the back face.
    mesh.position.z = -depth / 2;
    scene.add(mesh);

    // Backdrop shape — a sparse octahedron wireframe enveloping the hex.
    // Octahedron subdivision 0 gives just 8 triangle faces (12 edges),
    // much fewer lines than an icosahedron, so it reads as a light shell
    // around the hex instead of a dense cage containing it. Counter-rotates
    // slowly for depth parallax. Toggled off by backdropOpacity=0.
    let backdropMesh: THREE.Mesh | null = null;
    let backdropGeo: THREE.OctahedronGeometry | null = null;
    let backdropMat: THREE.MeshBasicMaterial | null = null;
    if (backdropOpacity > 0) {
      backdropGeo = new THREE.OctahedronGeometry(radius * backdropScale, 0);
      backdropMat = new THREE.MeshBasicMaterial({
        color: backdropColor,
        wireframe: true,
        transparent: true,
        opacity: backdropOpacity,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      backdropMesh = new THREE.Mesh(backdropGeo, backdropMat);
      scene.add(backdropMesh);
    }

    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      if (!reducedMotion) {
        mesh.rotation.x += 0.002;
        mesh.rotation.y += 0.003;
        if (backdropMesh) {
          // Counter-rotate the backdrop for depth parallax, slower than
          // the main hex so it feels "further away."
          backdropMesh.rotation.x -= 0.0012;
          backdropMesh.rotation.y -= 0.0018;
        }
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", handleResize);
      edges.dispose();
      mat.dispose();
      backdropGeo?.dispose();
      backdropMat?.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [color, radius, depth, opacity, backdropColor, backdropOpacity, backdropScale]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
