# Build Plan

## Phase 1 — Homepage POC

### Setup & Foundation
- [x] Initialize Next.js 15 + TypeScript + Tailwind + pnpm
- [x] Configure Tailwind with custom dark theme colors/tokens
- [x] Set up fonts (Space Grotesk, Inter, JetBrains Mono via next/font)
- [x] Create globals.css with CSS custom properties
- [x] Install dependencies: motion, gsap, three, @types/three, recharts, lucide-react, swr
- [x] Copy in Aceternity UI components needed (blur-fade, spotlight, bento-grid, moving-border, timeline)
- [x] Copy in Magic UI components needed (number-ticker, animated-gradient-text, orbit)
- [x] Set up cn() utility and base shadcn config
- [x] Create layout.tsx with metadata, fonts, body classes

### Navigation
- [x] Build Navbar (fixed, backdrop-blur, logo + links + CTA)
- [x] Build MobileNav (hamburger + slide drawer)
- [x] Scroll-aware: subtle background opacity increase on scroll

### Hero Section
- [x] Build HexGrid.tsx Three.js component (hex wireframe mesh, wave deformation, mouse reactivity)
- [x] Dynamic import HexGrid with loading skeleton
- [x] Hero overlay: pill badge, headline, subheadline, two CTA buttons
- [x] Scroll indicator animation at bottom
- [x] Performance: lazy load, requestAnimationFrame throttle, dispose on unmount

### Problem → Solution
- [x] Two-column layout with contrasting treatments
- [x] Animated stat counter bar (4 stats: TPS, block time, fee %, miners)
- [x] Scroll-triggered entrance animations

### Key Features Bento Grid
- [x] Bento grid layout (asymmetric cards)
- [x] Spotlight/glow hover effect on each card
- [ ] DPoS card with orbit animation (future enhancement)
- [x] QuarrySwap card
- [x] Asset Tokenization card
- [x] Icons and brief copy for each

### How DPoS Works
- [x] Timeline or step-through component
- [x] 4 steps with scroll-triggered reveals
- [ ] Simple animated diagram or node visualization (future enhancement)

### Ecosystem Grid
- [x] 2×3 card grid with spotlight effect
- [x] 6 ecosystem tools with icons and one-liners
- [x] Hover animations, link-outs

### Live Network Stats
- [x] Blockscout API integration (SWR polling)
- [x] Stats banner: block height, total txns, addresses, block time
- [x] Animated number transitions on data refresh
- [x] Fallback static values if API unavailable

### Tokenomics
- [x] Animated donut chart (Recharts, dark themed)
- [x] Token allocation data + key stats
- [x] Revenue model callout

### Roadmap
- [x] Timeline component with 4 phases
- [x] Scroll-triggered phase highlighting
- [x] Status indicators (complete, in progress, upcoming, future)

### Team
- [x] Abstract cards: name + role only
- [x] Staggered entrance animation
- [x] Minimal, clean layout

### CTA + Footer
- [x] CTA section with gradient background and social links
- [x] Footer with logo, link columns, copyright
- [x] Social icons row

### Polish & QA
- [ ] Responsive testing (mobile, tablet, desktop)
- [ ] prefers-reduced-motion fallbacks
- [ ] Lighthouse audit (target 90+ performance)
- [ ] OG image and meta tags
- [ ] Favicon
- [ ] Vercel deployment config

## Phase 2 — Additional Pages (Future)
- [ ] /technology — deep dive on DPoS, QVM, architecture
- [ ] /ecosystem — expanded tool pages
- [ ] /tokenomics — full breakdown
- [ ] /developers — docs, API reference, SDK links
- [ ] Light mode toggle
- [ ] CMS integration (TBD)
- [ ] Blog / News section

## Pending Data / Blockers
- Logo SVG needed from client
- OG image asset needed
- Blockscout API availability on testnet TBD
