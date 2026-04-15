"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
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
    meshes: THREE.Mesh[];
  } | null>(null);
  const frameRef = useRef<number>(0);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scale = 1.8;
    const layers: { color: string; opacity: number; layer: 0 | 1 | 2 }[] = [
      { color: primaryColor, opacity: 0.55, layer: 0 },
      { color: secondaryColor, opacity: 0.35, layer: 1 },
      { color: tertiaryColor, opacity: 0.22, layer: 2 },
    ];

    const meshes: THREE.Mesh[] = layers.map(({ color, opacity, layer }) => {
      const geo = createGeometry(shape, scale, layer);
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(color),
        wireframe: true,
        transparent: true,
        opacity,
      });
      const mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);
      return mesh;
    });

    sceneRef.current = { scene, camera, meshes };

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
        meshes[0].rotation.x += 0.0012;
        meshes[0].rotation.y += 0.0018;
        meshes[1].rotation.x -= 0.001;
        meshes[1].rotation.y += 0.0014;
        meshes[2].rotation.x += 0.0006;
        meshes[2].rotation.y -= 0.0008;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", handleResize);
      meshes.forEach((m) => {
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
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
      // Render at high resolution to an offscreen canvas
      const exportRenderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true,
      });
      exportRenderer.setSize(exportSize, exportSize);
      exportRenderer.setPixelRatio(2);
      exportRenderer.setClearColor(0x000000, 0);

      const exportCamera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
      exportCamera.position.set(0, 0, 5);

      const exportScene = new THREE.Scene();
      const scale = 1.8;
      const layers: { color: string; opacity: number; layer: 0 | 1 | 2 }[] = [
        { color: primaryColor, opacity: 0.65, layer: 0 },
        { color: secondaryColor, opacity: 0.4, layer: 1 },
        { color: tertiaryColor, opacity: 0.25, layer: 2 },
      ];

      // Use the current rotation from the live scene for visual consistency
      const liveMeshes = sceneRef.current?.meshes;

      const exportMeshes = layers.map(({ color, opacity, layer }, i) => {
        const geo = createGeometry(shape, scale, layer);
        const mat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(color),
          wireframe: true,
          transparent: true,
          opacity,
        });
        const mesh = new THREE.Mesh(geo, mat);
        if (liveMeshes && liveMeshes[i]) {
          mesh.rotation.copy(liveMeshes[i].rotation);
        }
        exportScene.add(mesh);
        return mesh;
      });

      exportRenderer.render(exportScene, exportCamera);

      const dataUrl = exportRenderer.domElement.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `quarrychain-${shape}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up
      exportMeshes.forEach((m) => {
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
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
