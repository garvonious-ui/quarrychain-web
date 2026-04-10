---
globs: ["src/components/ui/**/*.tsx"]
---
# UI Component Rules
- All components here are COPIED from Aceternity UI, Magic UI, or shadcn — not npm installed
- Always use cn() utility for conditional classes
- Every component must accept className prop for override
- Use CSS variables from globals.css for brand colors
- Dark mode only — never reference light mode variants
- Animation: use Motion (framer-motion) — import from "motion/react"
- Reference @docs/design-system.md for full color/spacing tokens
