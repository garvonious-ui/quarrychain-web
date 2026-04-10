---
globs: ["src/components/sections/**/*.tsx"]
---
# Section Animation Rules
- Every section wraps children in blur-fade entrance (scroll triggered)
- Stagger children by 50ms delay
- Use GSAP ScrollTrigger for pinned/parallax effects
- Use Motion for component-level animations (hover, enter/exit)
- Always check prefers-reduced-motion before running animations
- No animation should block interactivity or content visibility
- Keep total page animation budget reasonable — not everything moves
