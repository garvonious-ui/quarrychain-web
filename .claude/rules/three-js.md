---
globs: ["src/components/three/**/*.tsx"]
---
# Three.js Rules
- ALWAYS dynamic import with { ssr: false }
- ALWAYS provide a loading fallback (skeleton or gradient)
- ALWAYS dispose geometry, materials, renderer on unmount
- Use requestAnimationFrame, not setInterval
- Respect prefers-reduced-motion — disable animation, show static frame
- Keep canvas behind content with z-index layering (absolute positioning)
- Performance budget: target 60fps on mid-range devices, graceful degradation
- Do NOT use THREE.CapsuleGeometry (not available in r128)
