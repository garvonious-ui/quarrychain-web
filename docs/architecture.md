# Architecture

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 15 (App Router) | SSR, file-based routing, Vercel deploy |
| Language | TypeScript | Type safety across components |
| Styling | Tailwind CSS 4 | Utility-first, dark mode built-in |
| Base UI | shadcn/ui | Accessible primitives, consistent tokens |
| Animated Components | Aceternity UI (free) | Copy-paste animated components — spotlight cards, bento grids, text reveals |
| Animated Components 2 | Magic UI (free) | Animated counters, marquees, gradient text |
| Animation Engine | Motion (Framer Motion) | Scroll-triggered reveals, layout animations, gesture handlers |
| Scroll Animation | GSAP + ScrollTrigger | Cinematic scroll-driven section transitions, pinned sections |
| 3D | Three.js (r128+) | Hero hex grid (shader-based) + CTA wireframe gem |
| Smooth Scroll | Lenis | Smooth scroll with anchor offset support |
| Icons | Lucide React | Clean line icons, no clipart |
| Charts | Recharts | Tokenomics donut chart |
| Deployment | Vercel | Zero-config Next.js hosting |
| Package Manager | pnpm | Fast, disk-efficient |

## Architecture Decisions

1. **App Router (Next.js 15)** — use `app/` directory, server components by default, client components only where interactivity needed (hero, charts, counters, animations)
2. **Three.js isolated** — HexGrid and WireframeGem wrapped in dynamic import with `ssr: false` and loading fallbacks. Don't let them block page paint.
3. **Aceternity/Magic UI components** — copy into `src/components/ui/` (not installed as packages). This is the shadcn pattern — own the code.
4. **GSAP loaded client-side only** — register ScrollTrigger plugin in a layout effect
5. **Image optimization** — use `next/image` for any raster assets. SVG for logo and icons.
6. **Font loading** — `next/font/google` for Space Grotesk + Inter + JetBrains Mono. Self-hosted, no layout shift.
7. **Dark mode** — Tailwind `darkMode: 'class'`, default to dark. Optional light toggle (Phase 2).
8. **Static export ready** — homepage is mostly static content. ISR or static generation for performance.
9. **Live stats** — client component with SWR, polling Blockscout REST API. Graceful fallback to static numbers.
10. **Copy tone** — state, don't ask. No comparison framing. Max 2 sentences per card.

## File Structure (V2)

```
quarrychain-web/
├── CLAUDE.md
├── AGENTS.md
├── .claude/
│   ├── commands/
│   │   ├── start.md
│   │   ├── wrap.md
│   │   ├── checkpoint.md
│   │   └── status.md
│   └── rules/
│       ├── ui-components.md
│       ├── three-js.md
│       └── animation.md
├── docs/
│   ├── architecture.md
│   ├── build-plan.md
│   ├── design-system.md
│   ├── content-copy.md
│   ├── api-routes.md
│   └── changelog.md
├── public/
│   ├── logo-hero.png
│   ├── logo-original.png
│   ├── logo.svg
│   ├── quarrychain_name.svg
│   └── nav_icon.png
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Root layout, fonts, metadata, SmoothScroll, CursorGlow
│   │   ├── page.tsx              # Homepage — assembles sections (V2 order)
│   │   └── globals.css           # Tailwind base + CSS custom properties
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   ├── CursorGlow.tsx
│   │   │   ├── ScrollProgress.tsx
│   │   │   └── SmoothScroll.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── StatsBar.tsx          # NEW V2 — 5-col stat strip
│   │   │   ├── AsSeenIn.tsx
│   │   │   ├── MarqueeBanner.tsx
│   │   │   ├── Features.tsx          # UPDATED V2 — no header, tight copy
│   │   │   ├── DeveloperCTA.tsx      # NEW V2 — code block + badges
│   │   │   ├── Ecosystem.tsx         # UPDATED V2 — new copy
│   │   │   ├── GovernancePreview.tsx  # NEW V2 — node ring
│   │   │   ├── LiveStats.tsx
│   │   │   ├── Tokenomics.tsx        # UPDATED V2 — QRY, 5 slices
│   │   │   ├── Roadmap.tsx
│   │   │   ├── Team.tsx
│   │   │   ├── CTA.tsx              # UPDATED V2 — statement copy
│   │   │   ├── ProblemSolution.tsx   # KEPT — for future /technology page
│   │   │   └── HowDPoSWorks.tsx     # KEPT — for future /technology page
│   │   ├── three/
│   │   │   ├── HexGrid.tsx          # Shader-based hex grid, mouse-reactive
│   │   │   └── WireframeGem.tsx     # Rotating icosahedron for CTA
│   │   └── ui/
│   │       ├── blur-fade.tsx
│   │       ├── text-reveal.tsx
│   │       ├── number-ticker.tsx
│   │       ├── spotlight-card.tsx
│   │       ├── marquee.tsx
│   │       └── animated-gradient-text.tsx
│   ├── lib/
│   │   ├── utils.ts              # cn() helper
│   │   ├── constants.ts          # V2 data — QRY, 5-slice tokenomics, ecosystem taglines
│   │   └── api.ts                # Blockscout fetch helpers
│   └── hooks/
│       ├── useScrollProgress.ts
│       └── useMousePosition.ts
├── tsconfig.json
├── next.config.ts
├── package.json
└── .env.local
```

## Homepage Section Order (V2)

1. Navbar
2. Hero (Three.js HexGrid)
3. StatsBar (NEW)
4. AsSeenIn (press marquee)
5. Features (bento grid — no header)
6. DeveloperCTA (NEW — code block + badges)
7. Ecosystem (3×2 grid)
8. GovernancePreview (NEW — 27-node ring)
9. LiveStats (Blockscout API)
10. Tokenomics (5-slice donut)
11. Roadmap (4 phases)
12. Team (3×2 avatars)
13. CTA (statement + WireframeGem)
14. Footer
