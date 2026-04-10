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

### StatsBar (V2 — replaces ProblemSolution)
- [x] 5-column stat bar: TPS, Finality, Fees, Validators, EVM Compatible
- [x] NumberTicker animated count-up on scroll
- [x] Responsive: 3+2 layout on mobile, 5-col on desktop

### Key Features Bento Grid (V2 — updated)
- [x] Bento grid layout (asymmetric cards) — no section header
- [x] Tightened copy (max 2 sentences per card)
- [x] Spotlight/glow hover effect on each card
- [x] QuarrySwap card
- [x] Asset Tokenization card

### DeveloperCTA (V2 — NEW)
- [x] Two-column: copy left, code block right
- [x] Solidity code block with syntax highlighting
- [x] Copy-to-clipboard button
- [x] EVM compatibility badges
- [x] "Read the Docs" + "View on GitHub" CTAs

### Ecosystem Grid (V2 — updated)
- [x] Updated headline: "One chain. Everything you need."
- [x] Tightened taglines (one line max)
- [x] 2×3 card grid with spotlight effect

### GovernancePreview (V2 — NEW)
- [x] 27-node circular visualization with 3 active highlights
- [x] Slow rotation animation (respects reduced-motion)
- [x] Stats row: 6hr voting, 1 QRY minimum, 100% community-elected

### Live Network Stats
- [x] Blockscout API integration (SWR polling)
- [x] Stats banner: block height, total txns, addresses, block time
- [x] Animated number transitions on data refresh
- [x] Fallback static values if API unavailable

### Tokenomics (V2 — updated)
- [x] Fixed symbol QRC → QRY
- [x] Consolidated 9 slices → 5 slices
- [x] Animated donut chart (Recharts, dark themed)
- [x] Revenue model callout

### Roadmap
- [x] Timeline component with 4 phases
- [x] Scroll-triggered phase highlighting
- [x] Status indicators (complete, in progress, upcoming, future)

### Team
- [x] Abstract cards: name + role only
- [x] Staggered entrance animation
- [x] Minimal, clean layout

### CTA + Footer (V2 — updated)
- [x] CTA: "Start building on QuarryChain." (statement, not question)
- [x] CTAs: "Read the Docs" / "Join Discord"
- [x] Footer: removed tagline, just logo

### Polish & QA
- [ ] Responsive testing (mobile, tablet, desktop)
- [ ] prefers-reduced-motion fallbacks
- [ ] Lighthouse audit (target 90+ performance)
- [ ] OG image and meta tags
- [ ] Favicon
- [ ] Vercel deployment config

## Phase 1.5 — V2 Overhaul (Completed 2026-04-10)
- [x] Removed ProblemSolution section from homepage
- [x] Removed HowDPoSWorks from homepage (kept file for /technology page)
- [x] Created StatsBar section
- [x] Created DeveloperCTA section with code block
- [x] Created GovernancePreview section with node visualization
- [x] Updated Features (removed header, tightened copy)
- [x] Updated Ecosystem (new headline, tightened taglines)
- [x] Updated Tokenomics (QRY fix, 5 slices)
- [x] Updated CTA (statement copy)
- [x] Updated Footer (removed tagline)
- [x] New section order in page.tsx

## Phase 2 — Additional Pages (Future)
- [ ] /technology — deep dive on DPoS, QVM, architecture (move HowDPoSWorks here)
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
- Social link hrefs (Discord, Telegram, LinkedIn, YouTube, Instagram)
