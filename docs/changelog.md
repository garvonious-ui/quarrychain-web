# Changelog

## 2026-04-14 — Session 5: Git/Vercel Reconciliation + Phase 3 Planning

### What was built
No new feature code shipped. This was an infra/operations session:

- **Reconciled git ↔ Vercel state.** All of Session 4 (tokenomics page, Sanity CMS, brand geometric shapes) was live on `quarrychain-web.vercel.app` but had never been committed to GitHub — discovered the Vercel deployments had been pushed via `vercel --prod` CLI, bypassing git entirely. Working tree was 13 files modified + 6 untracked directories.
- **Committed Session 4 in 4 logical batches** and pushed to `origin/main`:
  - `4169c99` feat: integrate Sanity CMS for blog content (sanity config/lib/studio/api, blog data layer rewrite, PortableTextRenderer, PostCard cover images, Lenis /studio fix, Sanity deps)
  - `293c359` feat: add /tokenomics deep-dive page (route, sphere ShapeType, constants additions, Footer link)
  - `9b0f793` feat: add geometric shapes section to /brand page (DownloadableShape + brand/page.tsx updates)
  - `437fda5` docs: log Session 4
- **Confirmed Vercel auto-deploy from git is live.** The push triggered a fresh production build (`dpl_Ao1BnP9RrzU9wFiLTrWQaZKeRpN5`, status ● Ready). Verified via the `quarrychain-web-git-main-...` alias that Vercel only generates for git-sourced deploys, and confirmed the build output included `studio/[[...tool]]` and `api/revalidate` routes (proving Session 4 code shipped).
- **Set global git identity** to `garvonious-ui <258640365+garvonious-ui@users.noreply.github.com>` so future commits attribute to the GitHub profile (avatar, contribution graph) without exposing a real email. Existing 4 commits left as-is.
- **Started Phase 3 Sanity work.** Explored teamMember/roadmapPhase schemas, blog dual-mode pattern, and current Team.tsx/Roadmap.tsx components. Designed a full implementation plan but stopped before writing code — picking up next session.

### Decisions
- **Stop using `vercel --prod` CLI for deploys.** Git is now the single source of truth: commit → push → Vercel auto-builds. Mixing CLI deploys with git creates the exact "live but not in git" drift we just untangled.
- **GitHub noreply email format.** Used the standard `{userId}+{username}@users.noreply.github.com` pattern instead of a personal email — keeps the public repo's git history private while still attributing commits to the GitHub profile.
- **Did not force-push to rewrite the 4 commits' author.** Force-pushing main is destructive shared-state and would invalidate the SHAs Vercel's deployment record points at. The cosmetic mismatch (4 commits show `Lou Cesario <loucesario@MacBook-Air-8.local>`, everything from now uses the GitHub identity) is acceptable.
- **Team + Roadmap → Sanity will mirror the blog dual-mode pattern.** New `src/lib/team.ts` and `src/lib/roadmap.ts` files, NOT modifications to `constants.ts`. Constants stay as the fallback exactly like blog MDX files do, so local dev without Sanity env vars still works.
- **Will convert Team.tsx and Roadmap.tsx from client to async server components.** BlurFade child stays a client component — server parent + client child works fine in App Router.

### Issues / gotchas to address
- **3 errored deployments in Vercel history from ~24h ago.** Latest production is healthy, but worth a glance at the logs next time we're in Vercel to make sure nothing structural is broken.
- **`/api/revalidate` webhook only revalidates blog tags right now (presumably).** When team/roadmap go to Sanity, need to either extend the webhook to cover the homepage `/` path, OR add `export const revalidate = 60` to `src/app/page.tsx`. Either works; need to pick one.
- **Sanity dataset has no team/roadmap content yet.** Studio will be empty for those types until either we seed it with a migration script (mirror what was done for blog posts) or the user manually populates via Studio.

### Current status of overall build
- Phase 1 (Homepage POC) — ✅ complete
- Phase 1.5 (V2 overhaul) — ✅ complete
- Phase 2 (Subpages: /technology, /developers, /ecosystem, /blog, /whitepaper, /privacy) — ✅ complete
- Phase 3 — Tokenomics page ✅, Sanity CMS for blog ✅, Brand page enhancements ✅. Started: Team + Roadmap → Sanity. Remaining: light mode toggle, real social handles, whitepaper PDF, Sanity Studio team invites.
- **Live on `quarrychain-web.vercel.app`** with auto-deploy from `main` branch pushes confirmed working.

## 2026-04-13 — Session 4: Tokenomics Page + Sanity CMS

### /tokenomics Page
- Created full deep-dive tokenomics page with 7 content sections
- Enhanced donut chart (larger, interactive legend sync)
- Allocation breakdown with SpotlightCards, vesting pills, and lock icons
- Token utility timeline (5 use cases: gas, staking, rewards, deployment, tokenization)
- Vesting schedule with per-allocation progress bars and milestone pills
- Supply schedule stacked AreaChart showing cumulative unlock over 48 months
- Staking rewards grid with 4 tiers (Bronze/Silver/Gold/Diamond), APR + NumberTicker
- Revenue model cards (3 streams) + deflationary pressure callout
- Added "sphere" as 6th ShapeType to WireframeShape (purple/teal/blue)
- Added Tokenomics to NAV_LINKS and Footer
- Expanded constants.ts with TOKENOMICS_DETAILS, TOKEN_UTILITY, VESTING_SCHEDULE, STAKING_TIERS, REVENUE_STREAMS

### Sanity CMS Integration
- Installed sanity, next-sanity, @sanity/client, @portabletext/react, @sanity/image-url, @sanity/vision
- Created Sanity schemas: blogPost (Portable Text body), teamMember, roadmapPhase
- Created sanity.config.ts at project root
- Embedded Sanity Studio at /studio via NextStudio
- Rewrote blog.ts to async dual-mode: Sanity when NEXT_PUBLIC_SANITY_PROJECT_ID is set, MDX file fallback otherwise
- Blog pages now use ISR with 60s revalidation
- Created PortableTextRenderer component with styled blocks, marks, and lists
- Created /api/revalidate webhook for on-demand revalidation from Sanity
- Existing MDX content preserved — zero breaking changes when Sanity is not configured

### Sanity Live Setup
- Created Sanity project (ID: owhgeovj) under Quarry Labs organization
- Authenticated via GitHub, added CORS origins for localhost:3000 and quarrychain.network
- Added env vars to .env.local AND Vercel production (project ID, dataset, webhook secret)
- Installed @sanity/code-input plugin (fixed schema error for code blocks in body)
- Added basePath: "/studio" to sanity.config.ts (fixed "Tool not found: studio" routing error)
- Made Sanity client lazy (getSanityClient) — was failing build-time projectId validation
- Lazy-loaded sanity.config.ts in Studio page via dynamic import
- Made Studio page a fullscreen fixed overlay (z-9999) so it's not constrained by site layout
- Disabled Lenis smooth scroll on /studio routes — Lenis was hijacking all scroll events globally and preventing the Studio's internal scroll containers from working
- Migrated all 4 existing MDX blog posts into Sanity dataset via @sanity/client write API
- Added cover image field to blogPost schema (with hotspot + alt text)
- Created /lib/sanity/image.ts with urlFor() helper using @sanity/image-url
- Updated PostCard to display cover image (16:9 aspect, hover zoom)
- Updated blog post detail page to display hero image between metadata and body

### Brand Page
- Added "Geometric Shapes" section with all 6 wireframe geometries (torusKnot, octahedron, dodecahedron, icosahedron, tetrahedron, sphere)
- Created DownloadableShape component — renders Three.js wireframe in card with PNG download button
- PNG export uses preserveDrawingBuffer + offscreen renderer at 1024x1024 with transparent background
- Section assignment legend showing which shape is used on which page

### Decisions
- Dual-mode blog: no Sanity account required for local dev — MDX files work exactly as before
- Team and roadmap schemas defined but not yet wired to components (ready for Phase 3+)
- Revalidation set to 60s — fast enough for blog content, gentle on Sanity CDN
- Studio rendered as fullscreen overlay rather than embedded in main layout — cleanest way to bypass site chrome (navbar, footer, smooth scroll, cursor glow)
- Lenis disabled on /studio routes specifically (not removed entirely) — site keeps its smooth scroll, Studio gets native scroll behavior
- PNG export captures current rotation from live preview so the downloaded image matches what the user sees

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
