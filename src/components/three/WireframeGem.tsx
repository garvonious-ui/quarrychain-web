"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface WireframeGemProps {
  className?: string;
}

export default function WireframeGem({ className }: WireframeGemProps) {
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
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Icosahedron wireframe
    const geometry = new THREE.IcosahedronGeometry(1.8, 1);
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#14b8a6"),
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Second slightly larger one for depth
    const geometry2 = new THREE.IcosahedronGeometry(2.4, 0);
    const material2 = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#3b82f6"),
      wireframe: true,
      transparent: true,
      opacity: 0.04,
    });
    const mesh2 = new THREE.Mesh(geometry2, material2);
    scene.add(mesh2);

    // Resize
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // Animate
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      if (!reducedMotion) {
        mesh.rotation.x += 0.001;
        mesh.rotation.y += 0.002;
        mesh2.rotation.x -= 0.0008;
        mesh2.rotation.y += 0.001;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      geometry2.dispose();
      material.dispose();
      material2.dispose();
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
