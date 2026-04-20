"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { LineSegments2 } from "three/examples/jsm/lines/LineSegments2.js";
import { LineSegmentsGeometry } from "three/examples/jsm/lines/LineSegmentsGeometry.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { Download } from "lucide-react";
import type { ShapeType } from "./WireframeShape";

interface DownloadableShapeProps {
  shape: ShapeType;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  exportSize?: number; // square px
}

const PREVIEW_LINEWIDTH = 1.25;
const EXPORT_LINEWIDTH = 2.5;

function createGeometry(shape: ShapeType, scale: number, layer: 0 | 1 | 2): THREE.BufferGeometry {
  const mult = layer === 0 ? 1 : layer === 1 ? 1.15 : 1.35;
  switch (shape) {
    case "torusKnot":
      return new THREE.TorusKnotGeometry(scale * (layer === 0 ? 0.7 : layer === 1 ? 0.8 : 0.9), scale * (layer === 0 ? 0.25 : layer === 1 ? 0.2 : 0.15), layer === 0 ? 80 : layer === 1 ? 60 : 48, layer === 0 ? 12 : layer === 1 ? 10 : 8);
    case "octahedron":
      return new THREE.OctahedronGeometry(scale * mult, layer === 0 ? 2 : layer === 1 ? 1 : 0);
    case "dodecahedron":
      return new THREE.DodecahedronGeometry(scale * mult, layer === 0 ? 1 : 0);
    case "tetrahedron":
      return new THREE.TetrahedronGeometry(scale * (layer === 0 ? 1.2 : layer === 1 ? 1.4 : 1.65), layer === 0 ? 2 : layer === 1 ? 1 : 0);
    case "sphere":
      return new THREE.SphereGeometry(scale * mult, layer === 0 ? 24 : layer === 1 ? 18 : 12, layer === 0 ? 16 : layer === 1 ? 12 : 8);
    case "icosahedron":
    default:
      return new THREE.IcosahedronGeometry(scale * mult, layer === 0 ? 2 : layer === 1 ? 1 : 0);
  }
}

function buildLineGeometry(shape: ShapeType, scale: number, layer: 0 | 1 | 2): LineSegmentsGeometry {
  const source = createGeometry(shape, scale, layer);
  const edges = new THREE.EdgesGeometry(source);
  const lineGeo = new LineSegmentsGeometry().fromEdgesGeometry(edges);
  source.dispose();
  edges.dispose();
  return lineGeo;
}

export default function DownloadableShape({
  shape,
  name,
  primaryColor,
  secondaryColor,
  tertiaryColor,
  exportSize = 1024,
}: DownloadableShapeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    lines: LineSegments2[];
  } | null>(null);
  const frameRef = useRef<number>(0);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const width = container.clientWidth;
    const height = container.clientHeight;
    const pixelRatio = Math.min(window.devicePixelRatio, 2);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(pixelRatio);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scale = 1.8;
    const layers: { color: string; opacity: number; layer: 0 | 1 | 2 }[] = [
      { color: primaryColor, opacity: 0.75, layer: 0 },
      { color: secondaryColor, opacity: 0.5, layer: 1 },
      { color: tertiaryColor, opacity: 0.32, layer: 2 },
    ];

    const lines: LineSegments2[] = layers.map(({ color, opacity, layer }) => {
      const geo = buildLineGeometry(shape, scale, layer);
      const mat = new LineMaterial({
        color: new THREE.Color(color).getHex(),
        linewidth: PREVIEW_LINEWIDTH,
        transparent: true,
        opacity,
        depthTest: true,
        worldUnits: false,
      });
      mat.resolution.set(width * pixelRatio, height * pixelRatio);
      const line = new LineSegments2(geo, mat);
      line.computeLineDistances();
      scene.add(line);
      return line;
    });

    sceneRef.current = { scene, camera, lines };

    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      lines.forEach((l) => {
        (l.material as LineMaterial).resolution.set(w * pixelRatio, h * pixelRatio);
      });
    };
    window.addEventListener("resize", handleResize, { passive: true });

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      if (!reducedMotion) {
        lines[0].rotation.x += 0.0012;
        lines[0].rotation.y += 0.0018;
        lines[1].rotation.x -= 0.001;
        lines[1].rotation.y += 0.0014;
        lines[2].rotation.x += 0.0006;
        lines[2].rotation.y -= 0.0008;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", handleResize);
      lines.forEach((l) => {
        l.geometry.dispose();
        (l.material as LineMaterial).dispose();
      });
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [shape, primaryColor, secondaryColor, tertiaryColor]);

  const handleDownload = () => {
    setDownloading(true);
    try {
      const exportPixelRatio = 2;
      const exportRenderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true,
      });
      exportRenderer.setSize(exportSize, exportSize);
      exportRenderer.setPixelRatio(exportPixelRatio);
      exportRenderer.setClearColor(0x000000, 0);

      const exportCamera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
      exportCamera.position.set(0, 0, 5);

      const exportScene = new THREE.Scene();
      const scale = 1.8;
      const layers: { color: string; opacity: number; layer: 0 | 1 | 2 }[] = [
        { color: primaryColor, opacity: 0.85, layer: 0 },
        { color: secondaryColor, opacity: 0.55, layer: 1 },
        { color: tertiaryColor, opacity: 0.35, layer: 2 },
      ];

      const liveLines = sceneRef.current?.lines;
      const resW = exportSize * exportPixelRatio;
      const resH = exportSize * exportPixelRatio;

      const exportLines = layers.map(({ color, opacity, layer }, i) => {
        const geo = buildLineGeometry(shape, scale, layer);
        const mat = new LineMaterial({
          color: new THREE.Color(color).getHex(),
          linewidth: EXPORT_LINEWIDTH,
          transparent: true,
          opacity,
          depthTest: true,
          worldUnits: false,
        });
        mat.resolution.set(resW, resH);
        const line = new LineSegments2(geo, mat);
        line.computeLineDistances();
        if (liveLines && liveLines[i]) {
          line.rotation.copy(liveLines[i].rotation);
        }
        exportScene.add(line);
        return line;
      });

      exportRenderer.render(exportScene, exportCamera);

      const dataUrl = exportRenderer.domElement.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `quarrychain-${shape}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      exportLines.forEach((l) => {
        l.geometry.dispose();
        (l.material as LineMaterial).dispose();
      });
      exportRenderer.dispose();
    } catch (e) {
      console.error("Export failed", e);
    } finally {
      setTimeout(() => setDownloading(false), 600);
    }
  };

  return (
    <div className="rounded-xl bg-bg-secondary border border-white/5 overflow-hidden group hover:border-white/15 transition-all">
      <div
        ref={containerRef}
        className="aspect-square bg-bg-primary"
        style={{ width: "100%" }}
      />
      <div className="p-4 flex items-center justify-between border-t border-white/5">
        <div>
          <p className="text-sm font-bold font-display text-text-primary capitalize">{name}</p>
          <p className="text-xs font-mono text-text-muted">{shape}</p>
        </div>
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-qc-teal bg-qc-teal/8 border border-qc-teal/15 rounded-lg hover:bg-qc-teal/15 transition-all disabled:opacity-50"
        >
          <Download className="w-3 h-3" />
          {downloading ? "..." : "PNG"}
        </button>
      </div>
    </div>
  );
}
