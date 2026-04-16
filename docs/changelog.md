# Changelog

## 2026-04-16 — Session 8: Hero rebuild (hex-sphere) + HexDivider accent

### What was built
Two visual overhauls to the homepage. Both are live in local dev but the hex-sphere has known tuning follow-ups.

#### Hero — HexGrid replaced with scroll-reactive Goldberg hex-sphere (`ScrollSphere.tsx`)
- The old `HexGrid.tsx` was a full-screen **fragment-shader hex pattern** on an orthographic quad — 2D, ambient, generic. Replaced with a **true 3D hex-tiled sphere** rendered as wireframe line segments.
- **Geometry:** build a subdivided icosahedron (subdiv 3 → 642 unique vertices), merge identical positions (three.js's PolyhedronGeometry ships unindexed with duplicated corner verts), then compute the dual: for each vertex, collect adjacent face centroids and sort them tangentially around the vertex normal into a polygon. Result: 12 pentagons + N hexagons (Goldberg polyhedron / fullerene / geodesic-dome pattern). No gaps at rest.
- **Per-cell scroll reaction:** each polygon has a stable random noise seed (0..1). On scroll, each cell translates outward along its own radial direction by `scrollProgress * (0.3 + noise * 0.7) * MAX_DISPLACEMENT`. Cells spread apart unevenly at peak — "blooming" fragmentation rather than uniform expansion. Colors lerp from per-cell gradient (blue top → teal bottom) toward red (`COLOR_DISPLACED`) proportional to displacement.
- **Per-frame buffer rewrites:** each polygon owns a contiguous region of one shared `LineSegments` position + color buffer. Animate loop rewrites displaced positions + updated colors per cell, then flags `needsUpdate`. ~4k floats/frame for positions, same for colors; cheap.
- **Pin-and-hold scroll behavior in `Hero.tsx`:** restructured the hero as a **250vh outer section with an inner `position: sticky; top: 0` content div**. Scroll math:
  - Outer rect.top = 0 → -150vh: inner is sticky-pinned. Triangle wave progress 0 → 1 → 0 (80% of pin) → held at 0 (final 20%, `HOLD_FRACTION`).
  - Outer rect.top = -150vh → -250vh: inner unsticks naturally, section exits normally. Shape is already at 0 (compact) — no further animation during exit.
- **`getScrollProgress` controller prop** on `ScrollSphere` so the pinned hero owns the scroll math (triangle wave across pin duration); falls back to raw `window.scrollY / vh` mapping if the prop is omitted (keeps the component usable standalone).
- **Backdrop layers:** octahedron (radius 1.8, blue, 10% opacity) + dodecahedron (radius 2.5, teal, 7% opacity), simple wireframes, auto-rotate only. Same pattern from earlier iteration — restored after an experimental Path-B phase with three colored brand hexagons (red top / blue bottom-left / green bottom-right framing the sphere) was built, tried, and removed.
- **Mouse tilt + auto-rotate** on the parent group (unchanged behavior from the shader era). Reduced-motion respected (no scroll response, no rotation, static render).

#### HexDivider — section-to-section accent between DeveloperCTA and Ecosystem
- **`FloatingHex.tsx`** (new) — extruded hexagonal prism rendered as `EdgesGeometry` + `LineSegments` (wireframe silhouette, no tessellation noise). Counter-rotating **octahedron shell** at 1.75× the hex's radius wraps it — subdivision 0 (8 faces, 12 edges) so it reads as a sparse geometric envelope, not a dense cage. All colors, opacities, and scale exposed as props.
- **`HexDivider.tsx`** (new) — section component that positions a green `FloatingHex` at the right edge of the standard `max-w-7xl` content container. Uses **negative vertical margin** (`-my-24 md:-my-32`) exactly equal to half the hex container's height (`w-48 md:w-64`), so the hex overlaps into DeveloperCTA's bottom padding and Ecosystem's top padding without adding net page height.
- Wired into `page.tsx` between `<DeveloperCTA />` and `<Ecosystem />`.

### Decisions
- **Goldberg polyhedron over triangulated icosphere.** The original icosphere wireframe shows triangle edges — fine but generic. The goldberg shows the dual (hex + pent tiling) — feels bespoke and matches the brand's hex-heavy visual vocabulary. Built manually (dedup verts from unindexed three.js geometry, sort adjacent centroids by tangent-plane angle) rather than importing a library.
- **Per-cell rigid translation, not per-vertex noise displacement.** Earlier prototype had each cell vertex move independently (cells distort/shear at peak). Current version translates each cell as a rigid unit outward. Cells stay visually coherent as hexes/pentagons throughout, which is more brand-aligned. Gaps form between cells at peak rather than cells warping.
- **Sticky pin is CSS-native, not GSAP.** We have GSAP available but `position: sticky` works out-of-the-box with Lenis smooth scroll, doesn't fight with Next.js hydration, and requires no plugin registration. Good enough.
- **Triangle-wave + hold phase.** User wanted the expand-contract-settle narrative fully contained in the pin, then unstick with the shape already compact. `HOLD_FRACTION = 0.2` at the top of `Hero.tsx` gives the contracted state a beat to register before the section releases.
- **Zero-net-height divider.** `HexDivider` uses negative vertical margin exactly equal to half its container's height, so the hex visually lives "in the gap" between sections without pushing them apart. A key user-driven constraint: "you don't need to add more space."
- **Tried Path B (three colored brand hexes) and removed it.** Experimented with red/blue/green brand hexagons framing the hex-sphere in the hero — looked like the literal logo rendered in 3D. User felt the hero was missing something different (the octahedron/dodecahedron backdrops from an earlier iteration), so the brand-frame hexes came out. Noted for reuse "further down the homepage" — the green solo hex in the divider is the first reuse.
- **Kept `HexGrid.tsx` on disk unused.** Easy revert path if the hex-sphere direction is ever wrong for some future redesign.

### Verification
- `pnpm build` exits 0. 19 routes. `/` still shows `1m` revalidate (ISR preserved).
- TypeScript clean (`pnpm tsc --noEmit`).
- Visually tuned through several rounds of user feedback (starting size, displacement amplitude, hold fraction, cell density, backdrop shape selection, divider position/size). Current state is a functional v1 — user flagged "gonna want to tweak more later."

### Issues / gotchas to address
- **`ICO_SUBDIV = 3`** gives 642 cells — dense and readable. Bumping to 4 gives 2562 cells (heavier render; a wireframe becomes nearly solid from distance). Bumping to 2 → 162 cells (classic soccer-ball look, more legible hexes). Worth eyeballing on different viewport sizes.
- **The pin's "weight" is controlled by `SECTION_HEIGHT_VH = 250`.** Higher = more scroll-distance pinned = more dramatic. Lower = snappier. The HOLD_FRACTION is also tunable. Both are at the top of `Hero.tsx`.
- **`FloatingHex` backdrop** currently defaults to `backdropColor = 0x14b8a6` (teal), `backdropOpacity = 0.2`. If we scatter more `HexDivider`s throughout the homepage (red between Tokenomics/Roadmap, blue between Ecosystem/GovernancePreview, etc.), we'd want to vary these defaults per divider.
- **Mobile responsiveness of the pinned hero** is unverified on actual phones. `position: sticky` + Lenis works in principle; worth a real-device check.

### Current status of overall build
- Phase 1 (Homepage POC) — ✅ complete
- Phase 1.5 (V2 overhaul) — ✅ complete
- Phase 2 (Subpages) — ✅ complete
- Phase 3 — Tokenomics ✅, Sanity CMS for blog ✅, Brand page enhancements ✅, Litepaper ✅, Team + Roadmap → Sanity ✅, **Hero rebuild + HexDivider ✅ (this session, v1 — more tuning pending)**. Remaining: light mode toggle, real social handles, brand PDF redesign, Sanity Studio team invites.
- Live on `quarrychain-web.vercel.app` — push triggers an auto-deploy.

## 2026-04-16 — Session 7: Team + Roadmap → Sanity

### What was built
The homepage `<Team />` and `<Roadmap />` sections (and their twins in the litepaper at §11/§12) now pull from Sanity instead of the hardcoded constants in `src/lib/constants.ts`. Dual-mode data layer — if Sanity is configured AND has docs, use Sanity; otherwise fall back to constants. Seeded the dataset with the current 6 team members and 4 roadmap phases. This closes out the Phase 3 Sanity integration that Session 5 started planning.

#### New queries (`src/lib/sanity/queries.ts`)
- `sanityGetTeamMembers()` — ordered by `order asc, name asc`
- `sanityGetRoadmapPhases()` — ordered by `phase asc`
- Types: `SanityTeamMember`, `SanityRoadmapPhase`

#### New dual-mode data layers
- **`src/lib/team.ts`** — `getTeamMembers()` async function. If `isSanityConfigured()` AND Sanity returns ≥1 doc, use it; else constants. The "has docs" check means an empty Sanity dataset during onboarding won't blank out the homepage.
- **`src/lib/roadmap.ts`** — same pattern for `getRoadmapPhases()`.

#### Components converted to async server components
- **`Team.tsx`** — dropped `"use client"`, now `async function Team()`. Renders `<BlurFade>` (which is still client-side) as a server→client boundary, works fine in App Router.
- **`Roadmap.tsx`** — same treatment.
- **`src/app/whitepaper/sections/11-roadmap.tsx` + `12-team.tsx`** — also converted to async so the litepaper reflects Sanity edits alongside the homepage.

#### ISR + revalidation
- Added `export const revalidate = 60` to `src/app/page.tsx` and `src/app/whitepaper/page.tsx`. Build output confirms both now show `1m` revalidate alongside `/blog`.
- Extended **`src/app/api/revalidate/route.ts`** to dispatch by Sanity's `_type`:
  - `blogPost` → revalidates `/blog` + `/blog/[slug]`
  - `teamMember` or `roadmapPhase` → revalidates `/` + `/whitepaper`
  - Missing/unknown `_type` → revalidates everything (safe default)
  - Returns which paths were revalidated in the response body

#### Seed script (`scripts/seed-sanity.mjs`)
- One-shot `.mjs` script using Node's native `--env-file=.env.local` flag (requires Node 20.6+). No new devDeps.
- Uses `createOrReplace` with deterministic `_id`s (`team-alec-arrambide`, `roadmap-phase-1`) so re-runs overwrite rather than duplicate.
- Data is a snapshot of TEAM/ROADMAP constants inlined in the script — one-time bootstrap, not an ongoing sync. After seeding, Sanity is the source of truth; edits happen in Studio.
- New script entry in `package.json`: `pnpm seed:sanity`.
- Requires `SANITY_API_TOKEN` (Editor role) in `.env.local` at seed time. Token generated, used, and removed from `.env.local` in the same session — production Vercel env never gets write credentials, reads use the public CDN with just `NEXT_PUBLIC_SANITY_PROJECT_ID`.

### Decisions
- **Dual-mode with graceful fallback on empty dataset.** If a future dev clones the repo and configures Sanity env vars but hasn't seeded the dataset, the homepage still renders from constants instead of going blank. The `members.length > 0` check costs nothing and removes a whole class of "Sanity configured but not populated" footgun.
- **Also wired the litepaper sections 11/12 to Sanity, not just the homepage.** Same source of truth — otherwise a team edit in Studio would desync the two renderings.
- **Extended webhook via request body parse, not path params.** Sanity's default webhook payload includes `_type`, and parsing it server-side lets one webhook URL cover all doc types. Falls back to revalidating everything if the body's missing or malformed — cheap insurance.
- **Kept constants.ts as the fallback instead of deleting it.** Local dev without Sanity env vars still works exactly as before. Constants stay wired into places that don't need Sanity (e.g. the `<Footer />` link lists).
- **Write token is session-scoped, not Vercel-scoped.** The production site literally doesn't need write credentials — all reads go through `useCdn: true`. Token was added to `.env.local`, used for the one-shot seed, and removed immediately after. The line is left in `.env.local` commented out as a reminder for future re-seeds.

### Verification
- `pnpm build` exits 0. 19 routes. Build output confirms `/` and `/whitepaper` now show `Revalidate 1m Expire 1y`.
- `pnpm tsc --noEmit` clean.
- Direct GROQ query against `owhgeovj.apicdn.sanity.io/v2024-01-01/data/query/production` returns all 6 team members and 4 roadmap phases in the correct order. Data is live on the public CDN.

### Issues / gotchas to address
- **Studio has no team/roadmap UI polish.** Default list view only shows the preview fields defined in the schema. If we want a better editing experience (e.g. drag-to-reorder for team members), we'd need to add orderable-document-list plugin and/or custom preview components. Fine for now — 6 team members and 4 phases isn't hard to manage in the default UI.
- **Seed script's data is frozen at commit time.** If someone edits constants.ts in the future and re-runs the seed, it'll overwrite any Studio edits that diverged. Safer long-term: drop the data from the script and document "seed runs once, edit in Studio after." Not urgent.
- **Write token needs to be revoked by hand.** Go to https://www.sanity.io/manage/project/owhgeovj/api/tokens and delete the `seed-script` token. The `.env.local` line is commented out so it's not reused accidentally.

### Current status of overall build
- Phase 1 (Homepage POC) — ✅ complete
- Phase 1.5 (V2 overhaul) — ✅ complete
- Phase 2 (Subpages) — ✅ complete
- Phase 3 — Tokenomics page ✅, Sanity CMS for blog ✅, Brand page enhancements ✅, Litepaper ✅, **Team + Roadmap → Sanity ✅ (this session)**. Remaining: light mode toggle, real social handles, brand PDF redesign, Sanity Studio team invites.
- Live on `quarrychain-web.vercel.app` — push triggers an auto-deploy.

## 2026-04-14 — Session 6: Litepaper

### What was built
The `/whitepaper` route is no longer a "download a PDF" landing page — it's now a long-form, on-site **litepaper** distilled from the 81-page source PDF in `docs/whitepaper-source.pdf`. 13 sections, sticky TOC sidebar with scroll-spy, mobile drawer, full content. Live at `/whitepaper`.

#### Infrastructure (`src/components/litepaper/`, `src/lib/litepaper.ts`)
- **`lib/litepaper.ts`** — single source of truth for section metadata (id, number, label, title, accent color). Used by both the layout (rendering) and the TOC (scroll-spy + links). Drives ordering, accent colors, and the URL hash for every section.
- **`LitepaperLayout.tsx`** — grid wrapper: 220px sticky TOC sidebar on lg+, content cell on the right. `min-w-0` on the content cell so it shrinks correctly inside the grid. Mounts `MobileTocDrawer` for mobile.
- **`TocSidebar.tsx`** — sticky TOC, hidden on <lg. Uses `IntersectionObserver` with `rootMargin: "-80px 0px -60% 0px"` to mark a section "active" once its top reaches ~40% of the viewport. Active link highlights with the section's accent color and a left-border indicator. Smooth scroll on click is handled globally by Lenis (`SmoothScroll.tsx`) — no per-component anchor handling needed.
- **`MobileTocDrawer.tsx`** — fixed "Contents" button bottom-right on mobile (<lg). Tapping opens a slide-out sheet from the right with the same TOC list, locks body scroll, closes on backdrop tap, item tap, or Escape.
- **`LitepaperSection.tsx`** — consistent section wrapper. Renders `<section id={meta.id}>` with `scroll-mt-24` (so anchor scrolls land below the navbar), the number + label + accent-divider header, the gradient headline, and a `space-y-6` body slot.
- **No dedicated reading progress bar** — the global `ScrollProgress` in the root layout already renders a 2px gradient bar at the top of every page, so adding a litepaper-specific one would be duplicate UI.

#### Tokenomics refactor (`src/components/sections/tokenomics/`)
- All 7 sections that were inlined in `/tokenomics/page.tsx` are now extracted into individual content-only components: `TokenAllocationChart`, `AllocationBreakdown`, `TokenUtility`, `VestingTimeline`, `SupplySchedule`, `StakingRewards`, `RevenueModel`.
- Each component is "content only" — no `<section>` wrapper, no header. Both `/tokenomics` and the litepaper §9 import them and provide their own wrapper styling.
- `/tokenomics/page.tsx` is now a clean import + section list. Dropped `"use client"` from the page itself — it's now a server component rendering client component children.
- Litepaper §9 uses 4 of the 7 (allocation chart, breakdown, vesting, supply schedule). Skips staking tiers and revenue model — those are deeper investor content covered elsewhere on the site.

#### Litepaper sections (`src/app/whitepaper/sections/01-13.tsx`)
13 TSX files, one per section, each importing `LitepaperSection` and the relevant `meta` from `lib/litepaper.ts`. Content is distilled directly from the whitepaper PDF — skipping the educational fluff (no "what is a blockchain" / "what is a hash"), keeping the project-specific tech.

1. **Intro** — one-paragraph thesis + 4 stat cards (TPS, finality, validators, EVM).
2. **Architecture** — 3-layer stack (Application / Core / Storage). LevelDB + KhaosDB. Google Protobuf. RESTful HTTP fallback.
3. **Consensus** — DPoS basics, 27 Quarry Miners, 6hr rounds, 9999 QRC burn cost. **TaPoS callout** (transactions include a recent block hash — defends against DoS, 51%, selfish mining, double-spend). 3 node types (Witness / Full / Solidity).
4. **QVM** — forked from EVM, Solidity ^0.4.24, ~100% bytecode compatible. 4 properties grid: Lightweight, Robust, EVM-Compatible, Low Cost.
5. **Economics** — the 5,000 free daily bandwidth points (the killer feature). Bandwidth vs Energy (smart contracts use Energy, separate from bandwidth). Fixed fee table for the few operations that cost QRC.
6. **Token Standards** — QRC-10 vs QRC-20 (today, with the 1000× transfer cost difference called out). QRC-1400 + QRC-721 (roadmap).
7. **Real-World Asset Tokenization** — the most differentiated section. 5 asset categories grid (collectibles, metals, consumables, financial instruments, intangible assets), 4-step technical approach, 8 benefits.
8. **Governance** — 2-layer split: Quarry Mining (election + rewards, with the Vote Reward + Block Reward math at 230 QRC/round / 336,700 QRC/year) and the Committee (27 QM, 19/27 to pass, 3-day voting window, dynamic parameter changes without a hard fork).
9. **Tokenomics** — embeds 4 shared tokenomics components inline (allocation chart, breakdown, vesting, supply schedule). Demonstrates the refactor's payoff.
10. **Ecosystem & Tools** — core apps grid (QuarryWallet, QuarrySwap, QuarryScan, QVM) + dev toolchain grid (QuarryStudio, QuarryBox, QuarryGrid, QuarryWeb) + Shasta/mainnet callout.
11. **Roadmap** — 4-phase grid (inlined from `ROADMAP` constant, since the homepage `<Roadmap />` component has its own `<section id="roadmap">` wrapper that would conflict with `<LitepaperSection>`'s id).
12. **Team** — 6-person grid (inlined from `TEAM` constant for the same conflict reason).
13. **The Ask** — 2-paragraph close + 3 CTAs (Read the Docs, Join Discord, GitHub).

#### `/whitepaper/page.tsx`
- Stripped down to a clean composition: `PageHero` (kept the tetrahedron wireframe shape, dropped the page-counter animation since "81 pages" no longer makes sense), then `LitepaperLayout` containing all 13 section components in order.
- `metadata` updated for SEO (title + description focused on litepaper content, not "download PDF").

### Decisions
- **Static TSX over Sanity.** The litepaper isn't a blog — it's a marketing asset that gets rewritten every few months, and inline JSX makes it trivial to embed `<TokenAllocationChart />`, custom diagrams, and code blocks anywhere. The Sanity win (non-dev edits) didn't outweigh the friction of stuffing custom React through Portable Text.
- **Skip dedicated reading progress bar.** The global `ScrollProgress` in `app/layout.tsx` already renders a 2px gradient bar across every page. A litepaper-specific one would be duplicate UI.
- **Refactor `/tokenomics` first, then build litepaper §9.** Extracting the 7 tokenomics sections into shared components paid off twice: `/tokenomics` got cleaner (the page is now a server component composing client component children), and §9 got a concise import list instead of 200 lines of duplicated chart code.
- **Inline Roadmap and Team grids in §11/§12 instead of importing the homepage components.** The homepage `<Roadmap />` and `<Team />` render their own `<section id="roadmap">` and `<section id="team">` wrappers, which would have collided with `<LitepaperSection>`'s anchor IDs. Inlining the grid markup (with the `ROADMAP` and `TEAM` constants still as the source of truth) was simpler than refactoring the homepage components.
- **§13 Ask is litepaper-specific copy, not the homepage `<CTA />`.** The homepage CTA has a Three.js WireframeGem background that doesn't fit inside the litepaper grid layout and would feel disconnected from the rest of the long-form read.
- **Conflicts with the source PDF** (whitepaper is older than current site state) resolved in favor of the site: QRY symbol (PDF says QRC), $0.25 seed price (PDF says $0.05/$0.10), 5-slice tokenomics (PDF has 9), 100K TPS (PDF says 20K-100K range). Dropped the "Get Quality with Quarry" tagline and the "no inflation before Jan 1, 2022" governance note.

### Verification
- `pnpm build` exits 0. 19 routes built, `/whitepaper` is a static page in the route list. TypeScript pass at 85s. The pre-existing Recharts `width(-1)` warnings on the `SupplySchedule` chart are harmless — `ResponsiveContainer` has no measured size at SSG time, but the chart only renders client-side once `useInView` triggers.
- `pnpm tsc --noEmit` clean after the mobile drawer was added.
- Visual eyeball pass on `quarrychain-web.vercel.app/whitepaper` after the deploy — user confirmed "looks good". No deep scroll-spy / mobile-drawer interaction test yet, but the page renders, content is right, the hero loads, and section anchors are in place.

### Shipped
Three commits, pushed in order to `origin/main` (`d60bac7..d7b17d6`):
- **`9c57077`** refactor: extract /tokenomics sections into shared components (8 files changed, +622/-473)
- **`cdffa14`** feat: add /whitepaper as on-site litepaper (20 files changed, +1693/-95 — includes `.claude/launch.json` for future Claude Preview sessions)
- **`d7b17d6`** docs: log Session 6 (litepaper)

Vercel auto-deployed from the push (`quarrychain-tl52kb7na`, status ● Ready, 1m build time). Live at `quarrychain-web.vercel.app/whitepaper`.

### Issues / gotchas to address
- **§9 reuses 4 tokenomics components** that fit inside the litepaper content cell. The `TokenAllocationChart` uses a `lg:grid-cols-2` layout that may feel cramped at the litepaper width (~676px at lg, ~868px at xl). Worth a visual check.
- **Roadmap `sm:grid-cols-2` works fine** at the content cell width, but the homepage uses `md:grid-cols-4` — the litepaper version is intentionally narrower.
- **`/api/revalidate` webhook** still doesn't cover `/whitepaper`. Static page, no Sanity content, so this is fine for now — but if we ever move litepaper content into Sanity, the webhook needs to revalidate `/whitepaper` too.

### Current status of overall build
- Phase 1 (Homepage POC) — ✅ complete
- Phase 1.5 (V2 overhaul) — ✅ complete
- Phase 2 (Subpages) — ✅ complete
- Phase 3 — Tokenomics page ✅, Sanity CMS for blog ✅, Brand page enhancements ✅, **Litepaper ✅ (this session)**. Remaining: Team + Roadmap → Sanity (started Session 5, picking up later), light mode toggle, real social handles, brand PDF redesign, Sanity Studio team invites.
- Live on `quarrychain-web.vercel.app` — push triggers an auto-deploy.

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
