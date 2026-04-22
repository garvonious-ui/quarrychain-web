I'm building the QuarryChain ICO Launchpad — the actual functional token sale where KYC'd buyers purchase QRY with USDC/USDT/ETH on Ethereum mainnet. The marketing site lives in a separate repo (`/Users/loucesario/QUARRY/quarrychain-web`) with a teaser page at `/ico`; this repo is the real thing that handles geoblock → wallet connect → terms → KYC → purchase → vesting claim. Follows the same split pattern as QuarrySwap (marketing in quarrychain-web, functional app in a separate repo) and the No-Code Token Generator.

## What this is (and what it isn't)

**Is:** A functional ERC-20 token sale launchpad. Registration, KYC-gated buy flow, VRF-backed lottery, vesting claim UX, admin surface. Money flows through audited smart contracts on Ethereum mainnet. Zero custody.

**Isn't:** A marketing site (that's `/ico` in quarrychain-web). Isn't the ICO Marketplace product (different future repo for discovering/investing in multiple ICO projects). Isn't the QuarryChain testnet itself.

## Before starting, read these reference docs in the marketing site repo

- **`/Users/loucesario/QUARRY/quarrychain-web/docs/ico-research-summary.md`** — distilled strategy + legal posture + chain decision + flagged open questions. Read this first; it's authoritative.
- **`/Users/loucesario/QUARRY/quarrychain-web/docs/quarrychain-pitch-deck-2026.pdf`** — Alec's 18-slide investor deck (source of truth for tokenomics + Seed round mechanics)
- **`/Users/loucesario/QUARRY/quarrychain-web/docs/ico-research-2026-04-21.pdf`** — 28-page compliance/strategy research. Note: the research PDF recommends Base + Arbitrum via LayerZero V2; Alec has since clarified that QRY will be a standard ERC-20 on **Ethereum mainnet** for both rounds. The chain sections of the research PDF are superseded; everything else (legal posture, KYC, allocation mechanic, vesting, launch-day flow) still applies.

## What to do in this first session

1. Initialize a Next.js 15 + TypeScript + Tailwind CSS 4 project with pnpm
2. Install web3 deps: `wagmi`, `viem`, `@tanstack/react-query`, `@rainbow-me/rainbowkit`
3. Install design deps: `motion`, `lucide-react`, `clsx`, `tailwind-merge`, `lenis`, `gsap`, `three`, `@types/three`
4. Install Sumsub React SDK: `@sumsub/websdk-react`
5. Install backend: `@supabase/supabase-js` (or Neon + Drizzle — pick per team preference) for registration / KYC state / purchase records
6. Install sanctions screening: Chainalysis or TRM Labs SDK (pick per team call)
7. Install Solidity dev: `foundry` for contracts (Anvil local, Forge tests, Cast deploys)
8. Scaffold the directory structure below
9. Port the dark-mode design tokens from quarrychain-web exactly (same colors / fonts / component patterns)
10. Build the geoblock middleware + terms-acceptance modal first — **nothing renders until these pass**
11. Create the docs + `.claude/commands/` + `.claude/rules/` scaffolding
12. Write CLAUDE.md with Critical Rules + Session Rules + Deploy Workflow sections (see below)

## Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 15 (App Router) | Server components by default; client only where wallet/interactive |
| Language | TypeScript | strict mode |
| Styling | Tailwind CSS 4 | Dark mode only, CSS custom properties for tokens |
| Package Manager | pnpm | Same as quarrychain-web |
| Motion | Motion (framer-motion) | Import from `motion/react` |
| Scroll | GSAP + ScrollTrigger | For any pinned / cinematic scroll effects |
| Smooth Scroll | Lenis | Can be disabled on /admin routes if it fights with nested scrollables |
| 3D | Three.js | Dynamic import + ssr:false only; hero or accent elements |
| Icons | Lucide React | Line icons only, NO clipart |
| Wallet | wagmi + viem + @rainbow-me/rainbowkit | Supports MetaMask, WalletConnect, Coinbase Wallet, Rainbow, Rabby |
| Chain | **Ethereum mainnet** (production) / Ethereum Sepolia (testing) | Single-chain ERC-20. NOT Base, NOT Arbitrum, NOT LayerZero OFT |
| KYC | Sumsub React SDK | Default KYC provider (see ico-research-summary.md) |
| Sanctions screening | Chainalysis **or** TRM Labs | Real-time wallet screening on every deposit |
| Treasury auto-convert | Uniswap SDK **or** 1inch SDK | Route incoming ETH/USDT → USDC on settlement |
| Backend DB | Supabase (or Neon + Drizzle) | users, purchases, kyc_events, audit_log tables |
| Rate-limit / lottery state | Upstash Redis | VRF draw state, geoblock cache, contribution throttling |
| Randomness | Chainlink VRF v2 | Verifiable lottery draw |
| Contracts | Foundry (Forge + Anvil + Cast) | Solidity 0.8.24+ |
| Deploy | Vercel | Same workflow as quarrychain-web — git push triggers auto-build |

## Project Structure

    quarrychain-ico/
    ├── CLAUDE.md                          # Critical rules + session protocol + deploy workflow
    ├── AGENTS.md                          # (optional) agent directives
    ├── .claude/
    │   ├── commands/
    │   │   ├── start.md
    │   │   ├── wrap.md
    │   │   ├── checkpoint.md
    │   │   └── status.md
    │   └── rules/
    │       ├── ui-components.md
    │       ├── web3.md
    │       ├── security.md                # Geoblock, KYC gating, PII handling, audit log
    │       ├── three-js.md
    │       └── animation.md
    ├── docs/
    │   ├── architecture.md                # Decisions table + data flow
    │   ├── build-plan.md                  # Phased checklist (see Build Plan below)
    │   ├── design-system.md               # Colors, fonts, components — inherited from quarrychain-web
    │   ├── content-copy.md                # Page-by-page copy source of truth
    │   ├── api-routes.md                  # geoblock / kyc webhook / sanctions / lottery-draw / revalidate
    │   ├── legal-posture.md               # Geoblock country list + per-round regulatory framing
    │   ├── contracts.md                   # Contract addresses, ABIs, deploy history, verification links
    │   ├── kyc-flow.md                    # Sumsub integration, webhook signatures, approval criteria
    │   └── changelog.md                   # Dated session entries
    ├── contracts/                         # Foundry project (separate build via forge)
    │   ├── src/
    │   │   ├── QRYToken.sol               # Standard ERC-20 on Ethereum mainnet
    │   │   ├── QRYPurchaseVault.sol       # Accepts USDC/USDT/ETH, records Purchase event
    │   │   ├── QRYVesting.sol             # Per-category schedules + Instant-Stake flag
    │   │   └── TestnetDistributor.sol     # On QuarryChain testnet — merkle claim from purchase events
    │   ├── test/
    │   ├── script/
    │   └── foundry.toml
    ├── src/
    │   ├── app/
    │   │   ├── layout.tsx                 # Root: geoblock check, terms modal, fonts, metadata, SmoothScroll
    │   │   ├── page.tsx                   # Landing: sale status, countdown, wallet connect, CTA to register
    │   │   ├── globals.css                # Tailwind + CSS custom properties (match quarrychain-web)
    │   │   ├── register/
    │   │   │   └── page.tsx               # 14-day registration window (KYC gate)
    │   │   ├── priority/
    │   │   │   └── page.tsx               # 24h Priority Round (testnet-reputation wallets)
    │   │   ├── lottery/
    │   │   │   └── page.tsx               # 48h Lottery Round (VRF draw)
    │   │   ├── overflow/
    │   │   │   └── page.tsx               # Optional public FCFS
    │   │   ├── dashboard/
    │   │   │   └── page.tsx               # Wallet-gated: purchase, vesting, claim, Instant-Stake opt-in
    │   │   ├── restricted/
    │   │   │   └── page.tsx               # Shown to geoblocked visitors
    │   │   ├── admin/
    │   │   │   ├── page.tsx               # Admin dashboard (wallet-allowlist gated)
    │   │   │   ├── kyc-queue/
    │   │   │   ├── allowlist/
    │   │   │   └── audit-log/
    │   │   └── api/
    │   │       ├── geoblock/route.ts      # IP + VPN check → { allowed, country }
    │   │       ├── kyc/webhook/route.ts   # Sumsub webhook (HMAC verify)
    │   │       ├── sanctions/route.ts     # Chainalysis / TRM wallet screening
    │   │       ├── reputation/route.ts    # Testnet reputation score lookup (Galxe / Layer3)
    │   │       ├── lottery/draw/route.ts  # VRF-backed allocation draw
    │   │       └── revalidate/route.ts    # On-demand ISR revalidate (optional)
    │   ├── components/
    │   │   ├── layout/
    │   │   │   ├── Navbar.tsx
    │   │   │   ├── Footer.tsx
    │   │   │   ├── MobileNav.tsx
    │   │   │   ├── GeoGate.tsx            # Server-side middleware + client-side banner fallback
    │   │   │   ├── TermsModal.tsx         # E-sign + persist before wallet connect
    │   │   │   ├── SmoothScroll.tsx       # Lenis wrapper (disabled on /admin)
    │   │   │   ├── ScrollProgress.tsx     # Top-of-page gradient bar
    │   │   │   ├── CursorGlow.tsx
    │   │   │   └── PageHero.tsx           # Shared hero (wireframe shape + label + headline)
    │   │   ├── sections/                  # Landing sections (Hero, Rounds, Flow, Compliance, FAQ, CTA)
    │   │   ├── sale/
    │   │   │   ├── PurchaseModal.tsx      # Amount input + chain check + tx submit
    │   │   │   ├── AllocationCard.tsx
    │   │   │   ├── CountdownTimer.tsx
    │   │   │   └── RoundStatus.tsx        # Live round state (Registration / Priority / Lottery / Overflow / Ended)
    │   │   ├── kyc/
    │   │   │   ├── SumsubVerificationFlow.tsx
    │   │   │   └── KYCStatusBadge.tsx
    │   │   ├── web3/
    │   │   │   ├── ConnectButton.tsx      # RainbowKit wrapper
    │   │   │   ├── NetworkGuard.tsx       # Enforces Ethereum mainnet; prompts switch if wrong
    │   │   │   └── TxToast.tsx            # Pending / confirmed / failed tx UX
    │   │   ├── vesting/
    │   │   │   ├── VestingSchedule.tsx
    │   │   │   ├── ClaimButton.tsx
    │   │   │   └── InstantStakeOptIn.tsx  # +6mo lock → 10% bonus + Founding Validator badge
    │   │   ├── three/                     # Three.js components (dynamic import + ssr:false)
    │   │   │   └── WireframeShape.tsx     # Match quarrychain-web shape library
    │   │   └── ui/                        # COPIED from Aceternity/Magic UI — never npm installed
    │   │       ├── blur-fade.tsx
    │   │       ├── text-reveal.tsx
    │   │       ├── number-ticker.tsx
    │   │       ├── spotlight-card.tsx
    │   │       └── animated-gradient-text.tsx
    │   ├── lib/
    │   │   ├── utils.ts                   # cn() helper
    │   │   ├── constants.ts               # Round config, allocation tiers, token addresses, chain ID
    │   │   ├── contracts/                 # Typed viem helpers + ABIs
    │   │   │   ├── QRYToken.ts
    │   │   │   ├── QRYPurchaseVault.ts
    │   │   │   ├── QRYVesting.ts
    │   │   │   └── TestnetDistributor.ts
    │   │   ├── wagmi.ts                   # Ethereum mainnet + Sepolia config
    │   │   ├── sumsub.ts                  # Client wrapper + webhook HMAC verify
    │   │   ├── geoblock.ts                # IP country check (MaxMind / Cloudflare header) + VPN detection
    │   │   ├── sanctions.ts               # Chainalysis / TRM wrapper
    │   │   ├── supabase.ts                # DB client (server-only)
    │   │   ├── cross-chain-listener/      # Node service: Ethereum Purchase events → testnet tQRY distribution
    │   │   │   └── README.md              # Deploy as separate worker (Railway / Fly.io / Cloudflare Workers)
    │   │   └── audit-log.ts               # Append-only event logger
    │   └── hooks/
    │       ├── useScrollProgress.ts
    │       ├── useMousePosition.ts
    │       └── useKYCStatus.ts
    ├── tsconfig.json
    ├── next.config.ts
    ├── middleware.ts                      # Geoblock enforcement before any page renders
    ├── package.json
    └── .env.local                         # NEVER commit; includes Sumsub / Chainalysis / Supabase keys

## Design System (port from quarrychain-web exactly)

### Colors (CSS custom properties in globals.css)

    --bg-primary: #08080f;       /* near-black with blue undertone */
    --bg-secondary: #0f1019;     /* card bg */
    --bg-tertiary: #161822;      /* elevated surfaces */

    --qc-teal: #14b8a6;
    --qc-teal-glow: #2dd4bf;
    --qc-blue: #3b82f6;
    --qc-blue-glow: #60a5fa;
    --qc-red: #ef4444;
    --qc-red-muted: #dc2626;
    --qc-green: #22c55e;
    --qc-green-muted: #16a34a;

    --text-primary: #f1f5f9;
    --text-secondary: #94a3b8;
    --text-muted: #475569;

    --glow-blue: rgba(59, 130, 246, 0.15);
    --glow-teal: rgba(20, 184, 166, 0.2);
    --glow-red: rgba(239, 68, 68, 0.1);

### Fonts (next/font/google, self-hosted)

- **Space Grotesk** — display / headlines
- **Inter** — body
- **JetBrains Mono** — code / labels / stats / addresses / tx hashes

### Component patterns

- **Cards:** `bg-bg-secondary border border-white/5 rounded-xl backdrop-blur` · padding `p-6` or `p-8` · hover adds teal/blue glow
- **Buttons (primary):** `border-qc-teal/50 bg-gradient-to-r from-qc-teal/10 to-qc-blue/10` · white text · hover `shadow-[0_0_30px_rgba(20,184,166,0.2)]`
- **Buttons (secondary/ghost):** `border-white/10 text-text-secondary` · hover `border-white/20 text-text-primary`
- **Pills / badges:** `rounded-full px-3.5 py-1.5` · `bg-qc-teal/[0.08] border-qc-teal/25` · `text-qc-teal text-xs font-mono uppercase tracking-widest`
- **Stat display:** value `text-3xl font-bold font-display` · label `text-xs uppercase tracking-widest font-mono text-text-muted`
- **Wireframe geometries:** torusKnot / octahedron / dodecahedron / icosahedron / tetrahedron / sphere — pick one per major page, avoid reuse

### Section alignment rule (critical — learned from quarrychain-web Session 9)

Use a **consistent `max-w-5xl`** for every `<section>` container on a page. Shrink reading line-length for prose by adding `max-w-3xl` to the inner `<p>` — never narrow the section wrapper itself. Mixing max-widths across adjacent sections makes the content column's left edge jump during scroll.

## Critical Rules (put these in CLAUDE.md)

### General
- **Dark mode only.** Background `#08080f`. No light mode.
- **No generic clipart icons.** Lucide line icons or custom SVG with glow only.
- **Aceternity/Magic UI components are COPIED into `src/components/ui/`** — never npm installed. Own the code.
- **Every section** wraps children in `BlurFade` entrance animation with 50ms stagger.
- **Copy tone:** confident, punchy, technical but accessible. State, don't ask. No rhetorical questions. Think Solana, not IBM.
- **Typography:** Space Grotesk for headlines, Inter for body, JetBrains Mono for stats / addresses / tx hashes.
- **Git is the source of truth for deploys.** Never run `vercel --prod` CLI — commit + `git push origin main` triggers Vercel auto-deploy.

### Security / compliance (NON-NEGOTIABLE)
- **Geoblock runs server-side in `middleware.ts`.** IP + VPN/proxy detection via MaxMind GeoLite2 or Cloudflare IP country header. Restricted countries see `/restricted` and cannot render any sale UI.
- **Restricted countries (initial blacklist — confirm final list with counsel):** United States (public sale; pending Seed posture resolution per `ico-research-summary.md`), Mainland China, North Korea, Iran, Syria, Cuba, Russia, Belarus, Crimea / DNR / LNR, Myanmar, Sudan, Ontario (Canada). Stored as a `restrictedCountries` export in `src/lib/geoblock.ts`.
- **Terms acceptance modal runs BEFORE wallet connect.** User attests to country of residence, acknowledges risk disclosures, e-signs subscription agreement. State persisted in Supabase keyed on wallet address, not just localStorage.
- **KYC must complete before purchase.** Sumsub flow: ID document + liveness selfie + proof of residency + sanctions / PEP / adverse-media screening. `kycStatus: 'approved'` required on the user row before purchase UI renders.
- **Sanctions screening runs on every incoming wallet** pre-deposit (Chainalysis or TRM). Tainted wallets → rejection + log entry. Audit trail queryable via admin surface.
- **Never custody funds.** All deposits flow directly into the on-chain `QRYPurchaseVault` contract. No intermediate custodial wallet. No server-side private keys holding user funds.
- **Treasury Shield on settlement.** Foundation's contract auto-routes incoming ETH / USDT → USDC via Uniswap or 1inch on successful purchase. Locks in $0.50 price floor.
- **PII handling:** KYC data lives with Sumsub. Never store passport images, SSN, or DOB in our DB. Store only `sumsubId`, `kycStatus`, `jurisdiction`, `approvedAt`.
- **Audit log EVERYTHING.** Each purchase, refund, KYC state change, admin action writes to an append-only `audit_log` table. A "Geoblock Efficacy Audit" report must be generatable on demand.
- **Reg CF vs Reg D 506(c) for the Seed round is NOT resolved.** Do not hard-code US-specific Seed access logic until Alec + counsel confirm. Public copy should hedge with "regulatory posture finalizing with counsel."

### Web3
- **Single chain: Ethereum mainnet** (production) + Sepolia (test). No LayerZero, no Base, no Arbitrum. Simpler audit scope.
- **RainbowKit ConnectButton** with MetaMask, WalletConnect, Coinbase Wallet, Rainbow, Rabby.
- **`NetworkGuard`** component forces Ethereum mainnet; prompts switch if user is on wrong chain. No sale UI renders until chain matches.
- **All contract reads through viem** — never ethers.js. Typed ABIs committed to `src/lib/contracts/`.
- **Every tx shows pending → confirmed → explorer link states.** Never fail silently. Use inline toasts.
- **Gas estimate visible in the purchase modal** — Ethereum mainnet fees are real; users need to see them before signing. Consider a minimum contribution floor ($500–$1,000) to keep gas:contribution ratio sane.

### Three.js
- Dynamic import with `{ ssr: false }` + loading fallback (gradient or skeleton)
- Dispose geometry, materials, renderer on unmount
- `requestAnimationFrame`, never `setInterval`
- Respect `prefers-reduced-motion` — disable animation, render static frame
- Canvas sits behind content via z-index layering

### Animation
- Every section wraps children in `BlurFade` (fade up 6px + blur-in) on scroll
- Stagger children 50ms
- Hover: SpotlightCard with mouse-following radial gradient
- Continuous: WireframeShape rotation, CountdownTimer tick
- Transitions 200–300ms ease, entrances 400–600ms ease-out
- No animation if `prefers-reduced-motion`

## Authoritative Product Spec (use these exact numbers)

### Tokenomics (investor deck slide 14)

| Slice | % | QRY |
|---|---|---|
| Public Sale | 50% | 100,000,000 |
| Staking & Farming | 20% | 40,000,000 |
| Team | 20% | 40,000,000 |
| Angel Investors | 10% | 20,000,000 |
| **Total** | **100%** | **200,000,000** |

### Rounds

| Round | Price | Size | Type | Status |
|---|---|---|---|---|
| Seed (Angel Investors) | $0.25 (50% discount) | 20M QRY / $5M cap | **Reg CF (deck) or Reg D 506(c) (research PDF) — TBC** | Counsel-dependent |
| Public ICO | $0.50 | 100M QRY / $50M target | **Reg S** (Global, US-geoblocked) | Research PDF |

### Vesting

| Category | Allocation | TGE Unlock | Cliff | Duration |
|---|---|---|---|---|
| Team | 40M QRY | 0% | 12 months | 4 years (25% annual) |
| Angel Investors / Seed | 20M QRY | 0% | 12 months | 4 years (25% annual) — deck slide 15 |
| Public ICO | 100M QRY | **25%** | None | 6 months linear |
| Staking / Farming | 40M QRY | — | — | Emission schedule over 4 years (not investor vesting) |

### Launch-day flow (Hybrid CoinList mechanic)

1. **Registration Phase (14 days):** KYC via Sumsub + wallet link. Build email/Discord funnel.
2. **Priority Round (first 24h):** Guaranteed $1,000 allocation to wallets with high testnet reputation score (Galxe / Layer3 quests).
3. **Lottery Round (next 48h):** Chainlink VRF-selected winners from the general pool get fixed $500–$2,000 allocations. Anti-bot, no gas wars.
4. **Overflow (optional):** If $50M isn't hit, open remaining to public FCFS.

### Miami Safeguard (Instant-Stake opt-in)

Public ICO buyers who lock their liquid 25% for +6 months at TGE receive:
- 10% QRY bonus from the Ecosystem Reserve
- "Founding Validator" badge (format TBD — NFT / SBT / off-chain registry)
- Priority slot when mainnet validator elections open

### Geoblock — hard list (default; confirm with counsel)

Allow-by-default with the following blocked:
- **United States** (public sale hard block; Seed posture TBC)
- **Mainland China**
- **North Korea, Iran, Syria, Cuba** (OFAC sanctions)
- **Russia, Belarus** (post-2022 sanctions)
- **Crimea, DNR, LNR, Myanmar, Sudan** (FATF high-risk)
- **Ontario, Canada** (OSC friction)

Green list priority markets (per research PDF): UAE (Dubai / Abu Dhabi) · EU (MiCA-passported via France or Germany) · Singapore + Vietnam · Switzerland (Zug/Zurich) · LATAM (El Salvador, Brazil).

### Payment tokens

- **Seed round ($5M):** USDC-only. Cleanest audit trail for US-adjacent banking.
- **Public ICO ($50M):** USDC + USDT + ETH. USDT mandatory for UAE / SEA / Turkey liquidity; ETH accepted for high-velocity launchpad phase.
- **Treasury Shield:** All ETH / USDT auto-convert to USDC on settlement via Uniswap or 1inch.

## Build Plan (seed for docs/build-plan.md)

### Phase 0 — Scaffolding
- [ ] Next.js 15 + TS + Tailwind 4 + pnpm init
- [ ] Design tokens in globals.css matching quarrychain-web exactly
- [ ] Fonts (Space Grotesk, Inter, JetBrains Mono) via next/font/google
- [ ] Root layout.tsx with dark-mode body classes + metadata
- [ ] Supabase schema: `users`, `purchases`, `kyc_events`, `audit_log`
- [ ] Geoblock middleware.ts + `/restricted` page
- [ ] Terms acceptance modal + Supabase persistence
- [ ] .claude/commands/{start,wrap,checkpoint,status}.md
- [ ] CLAUDE.md with Critical Rules + Session Rules + Deploy Workflow

### Phase 1 — Wallet + KYC gate
- [ ] RainbowKit ConnectButton + wagmi config (Ethereum mainnet + Sepolia)
- [ ] NetworkGuard component (enforce Ethereum mainnet, prompt switch if wrong)
- [ ] Sumsub SDK integration + webhook signature verify (HMAC)
- [ ] `kycStatus` state machine: `pending → under_review → approved | rejected`
- [ ] Sanctions screening on wallet connect (Chainalysis or TRM)
- [ ] Dashboard shell (wallet-gated, KYC-gated)

### Phase 2 — Contracts + registration
- [ ] Foundry project init with QRYToken.sol (standard ERC-20)
- [ ] QRYPurchaseVault.sol (accepts USDC/USDT/ETH, emits Purchase event)
- [ ] QRYVesting.sol (per-category schedules + Instant-Stake flag)
- [ ] Forge tests with 100% coverage on happy + sad paths
- [ ] Deploy to Sepolia for end-to-end integration testing
- [ ] 14-day Registration page with countdown + KYC progress indicator
- [ ] Testnet Reputation score lookup (Galxe / Layer3 integration)

### Phase 3 — Round mechanics
- [ ] Priority Round (24h) — guaranteed $1,000 allocation for qualifying reputation scores
- [ ] Lottery Round (48h) — Chainlink VRF draw + ticket UI
- [ ] Overflow (FCFS) — only activates if cap isn't hit
- [ ] Purchase modal: amount (USD-labeled), token selector (USDC/USDT/ETH), wallet balance check, gas estimate, tx submit

### Phase 4 — Vesting + Instant-Stake
- [ ] Vesting schedule UI per tier (Team, Seed, Public, Angel)
- [ ] Claim button post-TGE with per-tranche state
- [ ] Instant-Stake opt-in: lock liquid 25% for +6mo → 10% bonus + Founding Validator badge
- [ ] Founding Validator badge mint (SBT or off-chain registry — decide per Alec)

### Phase 5 — Testnet utility
- [ ] Cross-Chain Listener service (Node/Go) — monitors Purchase events on Ethereum
- [ ] TestnetDistributor.sol on QuarryChain testnet — merkle claim
- [ ] "Your QRY works on testnet" post-purchase flow in dashboard

### Phase 6 — Admin + audit
- [ ] Admin surface (wallet-allowlist gated): KYC queue, pause/resume sale, refund tooling
- [ ] Audit log viewer
- [ ] Geoblock Efficacy Audit report generator
- [ ] External security audit (Code4rena / Trail of Bits / Spearbit) — **before mainnet money flows**

## Open items to resolve with Alec before Phase 2

1. **Seed regulatory posture:** Reg CF (deck slide 15) vs Reg D 506(c) (research PDF). Drives whether US investors see the Seed round at all.
2. **Foundation jurisdiction:** Cayman vs Switzerland. Affects footer copy, Terms of Service, WHOIS, contact page.
3. **Partnered Launchpads at TGE:** does QRY distribute via CoinList / MEXC / ByBit Launchpool alongside our own launchpad?
4. **Mainnet launch / TGE date** — drives all countdowns and sale window dates.
5. **Testnet Reputation scoring criteria** — Galxe or Layer3? Which quests qualify? What thresholds grant Priority Round access?
6. **"Founding Validator" badge format** — NFT / SBT / off-chain registry? Governance weight at mainnet?
7. **Minimum contribution floor** — given Ethereum mainnet gas, a $500–$1,000 minimum keeps the gas:contribution ratio sane. Acceptable to Alec?

## Session Protocol (put in CLAUDE.md)

- **Before starting work:** read `@docs/build-plan.md` + `@docs/changelog.md`.
- **After completing a feature:** update both files.
- **On "wrap up":** mark completed tasks in build-plan, write a dated changelog entry (what was built / decisions / issues / current status), summarize for the user.
- **On "checkpoint":** summarize what's been done in the current session; flag open decisions needing human input; confirm no security rule has been bypassed.
- **On "status":** show current phase, next 3 unchecked items, any deployed contract addresses from `docs/contracts.md`, items blocked on Alec / counsel.

## Deploy Workflow (put in CLAUDE.md)

- **Git is the source of truth for deploys.** Vercel auto-deploys from pushes to `main`.
- **NEVER run `vercel --prod` / `vercel deploy` from this directory.** The Vercel CLI bypasses git and creates "live but not in git" drift. Workflow: commit → `git push origin main` → Vercel auto-builds → live.
- **Contracts:** deploy via Foundry scripts. Verify on Etherscan immediately after deploy. Log addresses to `docs/contracts.md`.
- **Secrets:** `.env.local` is `.gitignore`d. Production secrets live in Vercel env. Sumsub / Chainalysis / Supabase / Alchemy API keys never touch the repo.

## Slash Commands (file contents go in `.claude/commands/`)

### `.claude/commands/start.md`

    Starting a new session. Do the following:
    1. Read @docs/build-plan.md and show me the next unchecked items
    2. Read @docs/changelog.md and show me what was done last session
    3. Confirm the geoblock country list in src/lib/geoblock.ts still matches @docs/legal-posture.md
    4. Confirm no deployed contract addresses have changed since last session (spot-check @docs/contracts.md against Etherscan)
    5. Tell me what we should work on next

### `.claude/commands/wrap.md`

    Wrapping up this session. Do the following:
    1. Mark completed tasks in @docs/build-plan.md
    2. Write a dated changelog entry in @docs/changelog.md covering:
       - What was built
       - Decisions made
       - Bugs found or issues to address next time
       - Current status of overall build
    3. If new contracts were deployed: update @docs/contracts.md with addresses + verification links + ABI pointers
    4. Confirm nothing is half-built — unfinished work lands in build-plan.md as explicit unchecked items
    5. If new patterns or gotchas were discovered, add them to CLAUDE.md
    6. Give me a summary of what to tell Claude next session

### `.claude/commands/checkpoint.md`

    Mid-session checkpoint. Do the following:
    1. Summarize what's been done so far this session
    2. Flag any open decisions needing human input
    3. Confirm no security rule (geoblock, KYC gate, sanctions screening, no-custody, audit log) has been bypassed
    4. Confirm all changes so far are committable — no placeholder data, no TODO hacks, no hardcoded secrets

### `.claude/commands/status.md`

    Show me project status:
    1. Current phase from @docs/build-plan.md
    2. Next 3 unchecked items
    3. Any deployed contracts + their Etherscan-verified addresses from @docs/contracts.md
    4. Open items blocked on Alec / legal counsel
    5. Current Vercel production URL

## Rules Files (go in `.claude/rules/`)

### `.claude/rules/ui-components.md`

    - All components in src/components/ui/ are COPIED from Aceternity / Magic UI / shadcn — not npm installed
    - Always use cn() utility for conditional classes
    - Every component accepts a className prop for override
    - Use CSS variables from globals.css for brand colors
    - Dark mode only — never reference light mode variants
    - Animation: import from "motion/react"

### `.claude/rules/web3.md`

    - Single chain: Ethereum mainnet (production) + Sepolia (test). No L2s.
    - RainbowKit for wallet connect. Supported: MetaMask, WalletConnect, Coinbase Wallet, Rainbow, Rabby.
    - All contract reads through viem. Typed ABIs in src/lib/contracts/.
    - Every tx shows pending / confirmed / failed states with explorer links.
    - NetworkGuard component enforces Ethereum mainnet before rendering sale UI.
    - Gas estimate visible in purchase modal before signing.

### `.claude/rules/security.md`

    - Geoblock in middleware.ts — runs before any page renders.
    - Terms acceptance modal before wallet connect — state persisted in Supabase.
    - KYC approved status required before purchase UI renders.
    - Sanctions screening on every incoming wallet (Chainalysis or TRM).
    - Never custody funds — all deposits go directly to QRYPurchaseVault contract.
    - Never store passport/SSN/DOB — only sumsubId, kycStatus, jurisdiction, approvedAt.
    - Audit log everything (purchase, refund, KYC change, admin action) to append-only table.
    - No secrets in the repo. .env.local is .gitignore'd. Production secrets in Vercel env.

### `.claude/rules/three-js.md`

    - ALWAYS dynamic import with { ssr: false } + loading fallback
    - ALWAYS dispose geometry, materials, renderer on unmount
    - Use requestAnimationFrame, not setInterval
    - Respect prefers-reduced-motion — disable animation, render static frame
    - Canvas behind content via z-index layering
    - Performance budget: 60fps mid-range devices, graceful degradation

### `.claude/rules/animation.md`

    - Every section wraps children in BlurFade (fade up + blur-in) on scroll
    - Stagger children 50ms
    - Hover: SpotlightCard with mouse-following radial gradient
    - Continuous: WireframeShape rotation, CountdownTimer tick
    - Transitions 200–300ms ease, entrances 400–600ms ease-out
    - No animation if prefers-reduced-motion

## Final instructions

1. Create the full directory structure above
2. Write CLAUDE.md including all Critical Rules + Session Rules + Deploy Workflow sections from this prompt
3. Write initial versions of all `docs/*.md` files — architecture decisions, build plan (copy the phases from this prompt), design system (port from quarrychain-web), content copy (start with landing + register + dashboard), api routes, legal posture (country list), contracts (scaffold, empty addresses), kyc flow, changelog (first session entry noting the scaffolding date)
4. Write all 4 slash-command files into `.claude/commands/`
5. Write all 5 rules files into `.claude/rules/`
6. Scaffold globals.css with design tokens ported from quarrychain-web
7. Build the root layout.tsx with dark-mode body, fonts loaded, metadata placeholder
8. Build middleware.ts with stub geoblock (returning allowed=true for everything initially, but wired up so that enabling the country list later is a one-line change)
9. Build the Terms acceptance modal
10. Build the minimal landing page (navbar + hero placeholder with "Registration opens soon" copy)

**After scaffolding, commit + push:** `git init`, create GitHub repo `garvonious-ui/quarrychain-ico` (private), push, connect to Vercel.

Once scaffolded and confirmed deploying, tell me what's next on the build plan and we'll work through Phase 0 → Phase 1 from there.
