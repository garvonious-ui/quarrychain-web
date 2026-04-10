# Architecture

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 15 (App Router) | SSR, file-based routing, Vercel deploy |
| Language | TypeScript | Type safety across components |
| Styling | Tailwind CSS 4 | Utility-first, dark mode built-in |
| Base UI | shadcn/ui | Accessible primitives, consistent tokens |
| Animated Components | Aceternity UI (free) | Copy-paste animated components — parallax hero, spotlight cards, bento grids, text reveals, background shaders |
| Animated Components 2 | Magic UI (free) | Animated counters, marquees, globe, orbit animations |
| Animation Engine | Motion (Framer Motion) | Scroll-triggered reveals, layout animations, gesture handlers |
| Scroll Animation | GSAP + ScrollTrigger | Cinematic scroll-driven section transitions, pinned sections |
| 3D Hero | Three.js (r128+) | Custom hexagonal grid wave mesh — mouse-reactive, dark background |
| Icons | Lucide React | Clean line icons, no clipart |
| Charts | Recharts | Tokenomics donut chart |
| Deployment | Vercel | Zero-config Next.js hosting |
| Package Manager | pnpm | Fast, disk-efficient |

## Architecture Decisions

1. **App Router (Next.js 15)** — use `app/` directory, server components by default, client components only where interactivity needed (hero, charts, counters, animations)
2. **Three.js hero isolated** — wrap in dynamic import with `ssr: false` and a loading skeleton. Don't let it block page paint.
3. **Aceternity/Magic UI components** — copy into `src/components/ui/` (not installed as packages). This is the shadcn pattern — own the code.
4. **GSAP loaded client-side only** — register ScrollTrigger plugin in a layout effect
5. **Image optimization** — use `next/image` for any raster assets. SVG for logo and icons.
6. **Font loading** — `next/font/google` for Space Grotesk + Inter. Self-hosted, no layout shift.
7. **Dark mode** — Tailwind `darkMode: 'class'`, default to dark. Optional light toggle (Phase 2).
8. **Static export ready** — homepage is mostly static content. ISR or static generation for performance.
9. **Live stats** — client component with SWR, polling Blockscout JSON-RPC or REST API. Graceful fallback to static numbers.

## File Structure

```
quarrychain-web/
├── CLAUDE.md
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
│   ├── logo.svg
│   ├── og-image.png
│   └── fonts/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MobileNav.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── ProblemSolution.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── HowDPoSWorks.tsx
│   │   │   ├── Ecosystem.tsx
│   │   │   ├── LiveStats.tsx
│   │   │   ├── Tokenomics.tsx
│   │   │   ├── Roadmap.tsx
│   │   │   ├── Team.tsx
│   │   │   └── CTA.tsx
│   │   ├── three/
│   │   │   └── HexGrid.tsx
│   │   └── ui/
│   │       ├── spotlight-card.tsx
│   │       ├── bento-grid.tsx
│   │       ├── number-ticker.tsx
│   │       ├── blur-fade.tsx
│   │       ├── moving-border.tsx
│   │       ├── timeline.tsx
│   │       ├── animated-gradient-text.tsx
│   │       └── ...
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── constants.ts
│   │   └── api.ts
│   └── hooks/
│       ├── useScrollProgress.ts
│       └── useMousePosition.ts
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
├── package.json
└── .env.local
```
