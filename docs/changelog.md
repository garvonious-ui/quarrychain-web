# Changelog

## 2026-04-10 — Session 2: V2 Homepage Overhaul
- Removed ProblemSolution and HowDPoSWorks from homepage (kept files for future /technology page)
- Created StatsBar section — 5-column stat bar (TPS, Finality, Fees, Validators, EVM) with NumberTicker animations, responsive 3+2 mobile layout
- Created DeveloperCTA section — two-column with Solidity code block, syntax highlighting, copy-to-clipboard, EVM compatibility badges, "Read the Docs" / "View on GitHub" CTAs
- Created GovernancePreview section — 27-node circular visualization with 3 active highlights, slow rotation, governance stats row
- Updated Features — removed "Built Different" header and subtitle titles, tightened card copy to max 2 sentences
- Updated Ecosystem — headline changed to "One chain. Everything you need.", tightened taglines
- Updated Tokenomics — fixed symbol QRC → QRY, consolidated 9 chart slices to 5
- Updated CTA — "Start building on QuarryChain." (statement not question), "Read the Docs" / "Join Discord"
- Updated Footer — removed "Get quality, with quarry." tagline
- Updated constants.ts — new ecosystem taglines, consolidated tokenomics allocation, QRY symbol fix
- New page.tsx section order: Hero → StatsBar → AsSeenIn → Features → DeveloperCTA → Ecosystem → GovernancePreview → LiveStats → Tokenomics → Roadmap → Team → CTA → Footer

### Decisions
- ProblemSolution/HowDPoSWorks are educational content, not homepage content — moved to Phase 2 /technology page
- DeveloperCTA is critical — every serious L1 needs a "deploy in 5 lines" section
- Tokenomics consolidated from 9 to 5 slices for cleaner visualization
- Copy direction: stop explaining, start stating. Solana doesn't justify, neither should we.

### Remaining
- Responsive testing across all new sections
- Social link hrefs still placeholder
- LiveStats may show zeros if testnet API unavailable — consider gating

## 2026-04-08 — Session 1
- Initialized full project structure: CLAUDE.md, docs/, .claude/commands/, .claude/rules/
- Created Next.js 15 + TypeScript + Tailwind CSS 4 project with pnpm
- Installed all deps: framer-motion, gsap, three, recharts, lucide-react, swr, clsx, tailwind-merge
- Configured dark theme with QuarryChain brand tokens in globals.css
- Set up fonts: Space Grotesk (display), Inter (body), JetBrains Mono (mono)
- Built all 10 homepage sections with real content (not placeholders)
- Built animated UI components: BlurFade (scroll-triggered entrance), NumberTicker (animated counters), SpotlightCard (mouse-tracking glow), AnimatedGradientText
- Built Three.js HexGrid hero: hexagonal wireframe mesh with sine-wave deformation + mouse-reactive ripple, proper disposal on unmount, reduced-motion support
- Wired up SWR polling for Blockscout API live stats with fallback values
- All sections have BlurFade scroll-triggered entrance animations with stagger
- prefers-reduced-motion support in globals.css and Three.js hero
- Production build passes clean, dev server serves correctly

### Decisions
- Used Framer Motion variant labels (not inline Variant objects) to avoid type conflicts
- Recharts Tooltip formatter uses untyped `value` param for compatibility
- Three.js hex grid uses ~900 hexagons (gridSize=16) — good visual density without perf issues
- No GSAP ScrollTrigger yet — Framer Motion's useInView handles scroll reveals well enough for now

### Remaining for Polish
- OG image and favicon from client
- Logo SVG from client
- DPoS orbit animation (nice-to-have)
- Node visualization diagram (nice-to-have)
- Responsive fine-tuning once visuals are reviewed in browser
- Vercel deployment config
