"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export type ShapeType = "torusKnot" | "octahedron" | "dodecahedron" | "tetrahedron" | "icosahedron";

interface WireframeShapeProps {
  shape: ShapeType;
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

// Inner — most visible, high detail
function createGeometry(shape: ShapeType, scale: number): THREE.BufferGeometry {
  switch (shape) {
    case "torusKnot":
      return new THREE.TorusKnotGeometry(scale * 0.7, scale * 0.25, 80, 12);
    case "octahedron":
      return new THREE.OctahedronGeometry(scale, 2);
    case "dodecahedron":
      return new THREE.DodecahedronGeometry(scale, 1);
    case "tetrahedron":
      return new THREE.TetrahedronGeometry(scale * 1.2, 2);
    case "icosahedron":
    default:
      return new THREE.IcosahedronGeometry(scale, 2);
  }
}

// Middle layer
function createMidGeometry(shape: ShapeType, scale: number): THREE.BufferGeometry {
  switch (shape) {
    case "torusKnot":
      return new THREE.TorusKnotGeometry(scale * 0.8, scale * 0.2, 60, 10);
    case "octahedron":
      return new THREE.OctahedronGeometry(scale * 1.15, 1);
    case "dodecahedron":
      return new THREE.DodecahedronGeometry(scale * 1.15, 0);
    case "tetrahedron":
      return new THREE.TetrahedronGeometry(scale * 1.4, 1);
    case "icosahedron":
    default:
      return new THREE.IcosahedronGeometry(scale * 1.15, 1);
  }
}

// Outer — subtle, low detail
function createOuterGeometry(shape: ShapeType, scale: number): THREE.BufferGeometry {
  switch (shape) {
    case "torusKnot":
      return new THREE.TorusKnotGeometry(scale * 0.9, scale * 0.15, 48, 8);
    case "octahedron":
      return new THREE.OctahedronGeometry(scale * 1.35, 0);
    case "dodecahedron":
      return new THREE.DodecahedronGeometry(scale * 1.35, 0);
    case "tetrahedron":
      return new THREE.TetrahedronGeometry(scale * 1.65, 0);
    case "icosahedron":
    default:
      return new THREE.IcosahedronGeometry(scale * 1.35, 0);
  }
}

export default function WireframeShape({
  shape,
  className,
  primaryColor = "#14b8a6",
  secondaryColor = "#3b82f6",
}: WireframeShapeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scale = 1.8;

    // Layer 1 — inner, brightest
    const geo1 = createGeometry(shape, scale);
    const mat1 = new THREE.MeshBasicMaterial({
      color: new THREE.Color(primaryColor),
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });
    const mesh1 = new THREE.Mesh(geo1, mat1);
    scene.add(mesh1);

    // Layer 2 — middle
    const geo2 = createMidGeometry(shape, scale);
    const mat2 = new THREE.MeshBasicMaterial({
      color: new THREE.Color(secondaryColor),
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const mesh2 = new THREE.Mesh(geo2, mat2);
    scene.add(mesh2);

    // Layer 3 — outer, subtle
    const geo3 = createOuterGeometry(shape, scale);
    const mat3 = new THREE.MeshBasicMaterial({
      color: new THREE.Color(primaryColor),
      wireframe: true,
      transparent: true,
      opacity: 0.07,
    });
    const mesh3 = new THREE.Mesh(geo3, mat3);
    scene.add(mesh3);

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
        mesh1.rotation.x += 0.0012;
        mesh1.rotation.y += 0.0018;
        mesh2.rotation.x -= 0.001;
        mesh2.rotation.y += 0.0014;
        mesh3.rotation.x += 0.0006;
        mesh3.rotation.y -= 0.0008;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", handleResize);
      geo1.dispose();
      geo2.dispose();
      geo3.dispose();
      mat1.dispose();
      mat2.dispose();
      mat3.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [shape, primaryColor, secondaryColor]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
