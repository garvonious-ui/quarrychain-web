"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface HexGridProps {
  className?: string;
}

// Fragment shader — procedural hex grid with wave distortion
const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  varying vec2 vUv;

  // Hex distance function
  float hexDist(vec2 p) {
    p = abs(p);
    return max(dot(p, normalize(vec2(1.0, 1.73))), p.x);
  }

  // Returns (distance to edge, distance to center, cell id)
  vec4 hexCoords(vec2 uv) {
    vec2 r = vec2(1.0, 1.73);
    vec2 h = r * 0.5;
    vec2 a = mod(uv, r) - h;
    vec2 b = mod(uv - h, r) - h;

    vec2 gv;
    if (length(a) < length(b))
      gv = a;
    else
      gv = b;

    float x = atan(gv.x, gv.y);
    float y = 0.5 - hexDist(gv);
    vec2 id = uv - gv;
    return vec4(x, y, id.x, id.y);
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;

    // Scale the hex grid — dense mesh for visible wave flow
    float scale = 36.0;
    vec2 hexUv = uv * scale;

    // Multi-layer wave — ocean-like undulation
    float wave1 = sin(hexUv.x * 0.10 + uTime * 0.5) * 0.6;
    float wave2 = cos(hexUv.y * 0.08 + uTime * 0.35) * 0.45;
    float wave3 = sin((hexUv.x + hexUv.y) * 0.07 + uTime * 0.2) * 0.35;
    float wave4 = sin(hexUv.x * 0.2 - hexUv.y * 0.15 + uTime * 0.6) * 0.2;
    float wave = wave1 + wave2 + wave3 + wave4;

    // Propagating ripple rings from center
    float centerDist = length(uv);
    float ripple1 = sin(centerDist * 12.0 - uTime * 1.8) * 0.15 * smoothstep(1.5, 0.0, centerDist);
    float ripple2 = sin(centerDist * 8.0 + uTime * 1.2) * 0.1 * smoothstep(1.2, 0.0, centerDist);

    // Mouse influence — big concentric ripples that follow cursor
    vec2 mouseUv = (uMouse - 0.5) * vec2(uResolution.x / uResolution.y, 1.0) * 2.0;
    float mouseDist = length(uv - mouseUv);
    float mouseWave = sin(mouseDist * 8.0 - uTime * 3.0) * 0.5 * smoothstep(1.0, 0.0, mouseDist);
    float mouseWave2 = sin(mouseDist * 14.0 - uTime * 4.5) * 0.2 * smoothstep(0.7, 0.0, mouseDist);

    hexUv.y += wave + ripple1 + ripple2 + mouseWave + mouseWave2;
    hexUv.x += wave * 0.3 + ripple1 * 0.5 + mouseWave * 0.4;

    vec4 hex = hexCoords(hexUv);

    // Draw hex edges — crisp thin lines
    float edge = smoothstep(0.0, 0.015, hex.y) - smoothstep(0.015, 0.03, hex.y);

    // Subtle glow around edges
    float glow = smoothstep(0.08, 0.0, hex.y) * 0.12;

    // Color — teal with slight variation based on wave
    vec3 tealColor = vec3(0.078, 0.722, 0.651); // #14b8a6
    vec3 blueColor = vec3(0.231, 0.510, 0.965); // #3b82f6

    float colorMix = sin(hex.z * 0.5 + uTime * 0.3) * 0.5 + 0.5;
    vec3 lineColor = mix(tealColor, blueColor, colorMix * 0.3);

    // Compose — thin but visible
    float alpha = edge * 0.3 + glow * 0.12;

    // Light vignette to soften corners
    float vignette = 1.0 - length(uv) * 0.25;
    alpha *= vignette;

    // Mouse proximity glow — visible halo
    float mouseGlow = smoothstep(0.5, 0.0, mouseDist) * 0.12;
    alpha += mouseGlow;

    gl_FragColor = vec4(lineColor, alpha);
  }
`;

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

export default function HexGrid({ className }: HexGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const frameRef = useRef<number>(0);
  const reducedMotion = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene with full-screen quad
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(width * Math.min(window.devicePixelRatio, 2), height * Math.min(window.devicePixelRatio, 2)) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Mouse tracking (normalized 0-1)
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: 1.0 - e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Resize
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      const dpr = Math.min(window.devicePixelRatio, 2);
      renderer.setSize(w, h);
      uniforms.uResolution.value.set(w * dpr, h * dpr);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // Animate
    let time = 0;
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      if (!reducedMotion.current) {
        time += 0.01;
      }
      uniforms.uTime.value = time;
      uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
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
