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

function createGeometry(shape: ShapeType, scale: number): THREE.BufferGeometry {
  switch (shape) {
    case "torusKnot":
      return new THREE.TorusKnotGeometry(scale * 0.7, scale * 0.25, 80, 12);
    case "octahedron":
      return new THREE.OctahedronGeometry(scale, 0);
    case "dodecahedron":
      return new THREE.DodecahedronGeometry(scale, 0);
    case "tetrahedron":
      return new THREE.TetrahedronGeometry(scale * 1.2, 0);
    case "icosahedron":
    default:
      return new THREE.IcosahedronGeometry(scale, 1);
  }
}

function createOuterGeometry(shape: ShapeType, scale: number): THREE.BufferGeometry {
  switch (shape) {
    case "torusKnot":
      return new THREE.TorusKnotGeometry(scale * 0.9, scale * 0.15, 48, 8);
    case "octahedron":
      return new THREE.OctahedronGeometry(scale * 1.3, 1);
    case "dodecahedron":
      return new THREE.DodecahedronGeometry(scale * 1.3, 0);
    case "tetrahedron":
      return new THREE.TetrahedronGeometry(scale * 1.6, 1);
    case "icosahedron":
    default:
      return new THREE.IcosahedronGeometry(scale * 1.3, 0);
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

    // Inner wireframe
    const geo1 = createGeometry(shape, scale);
    const mat1 = new THREE.MeshBasicMaterial({
      color: new THREE.Color(primaryColor),
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const mesh1 = new THREE.Mesh(geo1, mat1);
    scene.add(mesh1);

    // Outer wireframe for depth
    const geo2 = createOuterGeometry(shape, scale);
    const mat2 = new THREE.MeshBasicMaterial({
      color: new THREE.Color(secondaryColor),
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const mesh2 = new THREE.Mesh(geo2, mat2);
    scene.add(mesh2);

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
        mesh2.rotation.x -= 0.0008;
        mesh2.rotation.y += 0.001;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", handleResize);
      geo1.dispose();
      geo2.dispose();
      mat1.dispose();
      mat2.dispose();
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
