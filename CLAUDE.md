# QuarryChain Website — Dark-mode L1 blockchain marketing site

## What This Is
Homepage POC for QuarryChain (quarrychain.network). Sleek dark-mode landing page with Three.js hex grid hero, animated sections, and live network stats. Built to look like a top-tier L1 (Cosmos, Solana, Monad level).

## Tech Stack
- Next.js 15 (App Router), TypeScript, Tailwind CSS 4
- Aceternity UI + Magic UI (free, copy-paste animated components in src/components/ui/)
- Three.js (hero hex grid only — dynamic import, no SSR)
- GSAP + ScrollTrigger (scroll-driven animations)
- Motion (Framer Motion) for component animations
- Recharts (tokenomics chart)
- Lucide React (icons — NO clipart ever)
- Vercel deployment

## Critical Rules
- DARK MODE ONLY for now. Background: #08080f. No light mode yet.
- NO generic clipart icons. Lucide line icons or custom SVG with glow only.
- All animated components live in src/components/ui/ (copied, not npm installed)
- Three.js hero MUST be dynamic imported with ssr:false and have a loading fallback
- Every section uses blur-fade entrance animation on scroll
- Typography: Space Grotesk (display), Inter (body), JetBrains Mono (code/data)
- Brand colors are muted/glowy: teal #14b8a6, blue #3b82f6, red #ef4444, green #22c55e
- Cards: bg-[#0f1019] border-white/5 backdrop-blur hover:glow
- Copy tone: confident, punchy, no corporate fluff. Think Solana not IBM.
- Keep sections modular — each in its own file under src/components/sections/
- Accessible: respect prefers-reduced-motion, proper heading hierarchy, alt text

## Session Rules
- BEFORE starting work: read @docs/build-plan.md and @docs/changelog.md
- AFTER completing a feature: update both files
- When I say "wrap up": update build-plan checkboxes, write changelog entry, summarize

## Deploy Workflow
- **Git is the source of truth for deploys.** Vercel auto-deploys from pushes to `main`.
- **NEVER run `vercel --prod` / `vercel deploy` from this directory.** The Vercel CLI bypasses git and creates "live but not in git" drift. We hit this in Session 5 — Session 4's entire output was on production but never committed.
- Workflow: commit → `git push origin main` → Vercel auto-builds → live on quarrychain-web.vercel.app
- Production project: `garvonious-uis-projects/quarrychain-web` (projectId `prj_WYd6NtZuN69d4c2wNHPO9WLedMST`)
- Custom domain `quarrychain.network` is NOT this Next.js app yet — still serving the legacy site. We work on `quarrychain-web.vercel.app`.

## Reference Docs
- Architecture: @docs/architecture.md
- Build plan: @docs/build-plan.md
- Design system: @docs/design-system.md
- Content/copy: @docs/content-copy.md
- API routes: @docs/api-routes.md
- Changelog: @docs/changelog.md

## Commands
- pnpm dev — start dev server
- pnpm build — production build
- pnpm lint — run linter

## Current Phase
Phase 1 — Homepage POC
See @docs/build-plan.md for task checklist
