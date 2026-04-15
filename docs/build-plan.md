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
- [x] Responsive testing (mobile, tablet, desktop)
- [x] prefers-reduced-motion fallbacks
- [x] Lighthouse audit (84 perf, 96 best practices)
- [x] OG image and meta tags
- [x] Favicon (SVG)
- [x] Vercel deployment config
- [x] All homepage buttons wired to real destinations
- [x] Social links updated (X, GitHub, LinkedIn confirmed)

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

## Phase 2 — Subpages (Completed 2026-04-11)

### Shared Infrastructure
- [x] PageHero component (centered text + wireframe shape backdrop)
- [x] PageCTA component (reusable CTA footer)
- [x] WireframeShape component (5 geometries, 3-layer, 3-color)
- [x] Navbar moved to root layout (all pages)
- [x] Footer moved to root layout (all pages)
- [x] MobileNav updated for page routes
- [x] Nav links: Technology, Ecosystem, Developers, Blog
- [x] CTA button: "Start Building" → /developers

### /technology
- [x] DPoS timeline (4 steps, vertical with colored icons)
- [x] Consensus comparison grid (PoW vs PoS vs DPoS, animated counters)
- [x] QVM section with compatibility badges
- [x] Token standards (QRC-10 / QRC-20 cards)
- [x] Gradient text accents on section headlines
- [x] Torus knot wireframe hero (blue/red/green)

### /developers
- [x] Quick start (3 steps with colored icons)
- [x] Terminal typing animation (auto-types deploy commands)
- [x] Resources grid (6 cards, "Coming soon" badges)
- [x] EVM compatibility badge row
- [x] Gradient text accents
- [x] Octahedron wireframe hero (teal/green/red)

### /ecosystem
- [x] Hub page with 3D tilt cards (6 products)
- [x] /ecosystem/quarryswap — swap animation, yield stacking, fee structure
- [x] /ecosystem/quarrywallet — 4 feature cards with spotlight
- [x] Gradient text accents on headlines
- [x] Unique wireframe shapes per page

### /blog
- [x] MDX-based (gray-matter frontmatter)
- [x] 4 starter posts
- [x] PostCard with reading time
- [x] Blog post page with markdown rendering
- [x] Static generation via generateStaticParams
- [x] Icosahedron wireframe hero (red/blue/green)

### /whitepaper
- [x] Page counter animation (81 counts up)
- [x] Key highlights with numbered list
- [x] Table of contents with left border
- [x] Gradient text on counter and headlines
- [x] Tetrahedron wireframe hero (teal/blue/red)

### /privacy
- [x] Standard privacy policy text page
- [x] Proper heading hierarchy

### Color & Polish
- [x] Gradient text on key headlines across all subpages
- [x] Colored icon backgrounds per section
- [x] Brand colors (teal, blue, red, green) used in wireframe shapes
- [x] SectionGlow divider component

## Phase 3 — Enhancements

### /tokenomics (Completed 2026-04-13)
- [x] PageHero with sphere wireframe shape (purple/teal/blue)
- [x] Enhanced donut chart (larger, synced legend)
- [x] Allocation breakdown (5 SpotlightCards with descriptions, vesting pills)
- [x] Token utility section (5 use cases: gas, staking, rewards, deployment, tokenization)
- [x] Vesting timeline with progress bars
- [x] Supply schedule AreaChart (stacked cumulative over 48 months)
- [x] Staking rewards grid (4 tiers with APR + NumberTicker)
- [x] Revenue model (3 stream cards + deflationary callout)
- [x] Nav link added, Footer link added
- [x] New "sphere" ShapeType added to WireframeShape

### Sanity CMS Integration (Completed 2026-04-13)
- [x] Sanity schemas: blogPost (with cover image), teamMember, roadmapPhase
- [x] Sanity client with dual-mode data layer (Sanity if env configured, MDX fallback)
- [x] Blog pages updated to async with ISR (60s revalidation)
- [x] Portable Text renderer for rich content
- [x] Embedded Sanity Studio at /studio (fullscreen overlay, basePath set)
- [x] Revalidation webhook at /api/revalidate
- [x] Cover image support on blog index cards and post detail hero
- [x] Sanity project created (ID: owhgeovj), CORS configured for localhost + production
- [x] Vercel env vars configured (project ID, dataset, webhook secret)
- [x] All 4 existing MDX posts migrated into Sanity dataset
- [x] Lenis smooth-scroll disabled on /studio routes (was hijacking Studio scroll)
- [x] Lazy-loaded sanity.config.ts in Studio page (avoids build-time projectId validation)

### Brand Page Enhancements (Completed 2026-04-13)
- [x] Geometric Shapes section with all 6 wireframe geometries
- [x] DownloadableShape component — 1024x1024 PNG export with transparent background
- [x] Section assignment legend (which shape goes where)

### Remaining
- [ ] Light mode toggle
- [ ] Real Discord/Telegram/YouTube handles (currently placeholder patterns)
- [ ] Whitepaper PDF at /public/quarrychain-whitepaper-v2.pdf
- [ ] Invite team members to Sanity Studio (Editor role for marketing)

## Pending Data / Blockers
- Logo SVG refinement from client
- Whitepaper PDF file needed
- Discord/Telegram/YouTube exact handles TBD
- Blockscout API availability on testnet TBD
