I'm building the QuarryChain ICO Launchpad — the actual functional token sale where KYC'd buyers purchase QRY with USDC/USDT/ETH. The marketing site lives in a separate repo (`/Users/loucesario/QUARRY/quarrychain-web`) with a teaser page at `/ico`; this repo is the real thing that handles wallet connect → KYC → purchase → vesting claim.

Before starting, read two reference docs in the marketing site repo:

- `docs/ico-research-summary.md` — distilled strategy + legal posture + chain/token decisions + one flagged open question (Reg CF vs Reg D for Seed)
- `docs/quarrychain-pitch-deck-2026.pdf` — investor pitch deck (source of truth for tokenomics + Seed round mechanics)
- `docs/ico-research-2026-04-21.pdf` — 28-page compliance research (source of truth for legal, KYC, chain, payment, allocation mechanics, vesting, launch-day flow)

## What to do in this first session

1. Initialize a Next.js 15 + TypeScript + Tailwind CSS 4 project with pnpm
2. Install web3 deps: `wagmi`, `viem`, `@tanstack/react-query`, `@rainbow-me/rainbowkit`
3. Install design deps: `motion`, `lucide-react`, `clsx`, `tailwind-merge`, `lenis`
4. Install Sumsub React SDK: `@sumsub/websdk-react`
5. Install sanctions screening: Chainalysis or TRM Labs (pick per team call)
6. Install backend: `@supabase/supabase-js` (or Neon + Drizzle) for registration / KYC state / purchase records
7. Scaffold the directory structure below
8. Mirror the dark-mode design tokens from the marketing site
9. Build the geoblock middleware + terms-acceptance modal first — nothing renders until these pass
10. Create docs + .claude/commands scaffolding

## Tech Stack

- Next.js 15 (App Router), TypeScript, Tailwind CSS 4
- pnpm, Vercel for deploy
- wagmi + viem + RainbowKit (MetaMask, WalletConnect, Coinbase Wallet, Rainbow, Rabby)
- LayerZero V2 OFT for omnichain QRY-ERC20 (Base + Arbitrum)
- Sumsub React SDK — KYC, liveness, VPN/proxy detection, geoblock audit trail
- Chainalysis or TRM Labs — real-time sanctions screening on incoming wallets
- Uniswap or 1inch SDK — Treasury Shield auto-convert (ETH/USDT → USDC on settlement)
- Supabase / Neon — registration state, KYC status, purchase records, allocation state
- Upstash Redis — rate-limiting, lottery draw state, geoblock cache
- Chainlink VRF v2 — verifiable random function for the Lottery Round draw
- Motion + Lucide React + Lenis (match marketing site aesthetics)

## Project Structure

    src/
    ├── app/
    │   ├── layout.tsx                # Root: geoblock check, terms modal, fonts, metadata
    │   ├── page.tsx                  # Landing — sale status, countdown, wallet connect, CTA to register
    │   ├── register/page.tsx         # 14-day registration window (KYC gate)
    │   ├── priority/page.tsx         # 24h Priority Round for testnet-reputation wallets
    │   ├── lottery/page.tsx          # 48h Lottery Round (VRF draw)
    │   ├── overflow/page.tsx         # Optional public FCFS if cap not hit
    │   ├── dashboard/page.tsx        # Wallet-gated: purchase, vesting, claim, Instant-Stake
    │   ├── restricted/page.tsx       # Shown to geoblocked visitors
    │   ├── admin/                    # KYC approval queue, allowlist mgmt, sale controls
    │   ├── api/
    │   │   ├── geoblock/route.ts     # IP + VPN check → returns { allowed: bool, country: string }
    │   │   ├── kyc/webhook/route.ts  # Sumsub webhook → update user KYC status
    │   │   ├── sanctions/route.ts    # Chainalysis/TRM wallet screening
    │   │   ├── reputation/route.ts   # Testnet reputation score lookup (Galxe / Layer3)
    │   │   └── lottery/draw/route.ts # VRF-backed random allocation draw
    │   └── globals.css               # Tailwind + CSS custom properties
    ├── components/
    │   ├── layout/                   # Navbar, Footer, GeoGate, TermsModal, SmoothScroll
    │   ├── sections/                 # Landing sections
    │   ├── sale/                     # PurchaseModal, AllocationCard, CountdownTimer, RoundStatus
    │   ├── kyc/                      # SumsubVerificationFlow, KYCStatusBadge
    │   ├── web3/                     # ConnectButton, ChainSwitch, TxToast
    │   ├── vesting/                  # VestingSchedule, ClaimButton, InstantStakeOptIn
    │   └── ui/                       # Copy-pasted Aceternity/Magic UI
    ├── lib/
    │   ├── utils.ts                  # cn() helper
    │   ├── constants.ts              # Chain IDs, token addresses, round config, allocation tiers
    │   ├── contracts/                # ABIs + typed viem helpers
    │   │   ├── QRYPurchaseVault.ts
    │   │   ├── QRYVesting.ts
    │   │   ├── TestnetDistributor.ts
    │   │   └── QRYToken.ts
    │   ├── wagmi.ts                  # Chain + connector config (Base + Arbitrum)
    │   ├── sumsub.ts                 # KYC client wrapper + webhook signature verify
    │   ├── geoblock.ts               # IP check (MaxMind) + VPN/proxy detection
    │   ├── sanctions.ts              # Chainalysis/TRM wrapper
    │   ├── supabase.ts               # DB client
    │   └── cross-chain-listener.ts   # Node service: purchase event → testnet distribution trigger
    ├── contracts/                    # Solidity / Stylus C++ sources (separate build via foundry/stylus)
    │   ├── QRYPurchaseVault.sol      # Accepts USDC/USDT/ETH, records purchase, emits Purchased event
    │   ├── QRYVesting.sol            # Per-category schedules + Instant-Stake opt-in flag
    │   ├── TestnetDistributor.sol    # On QuarryChain testnet — merkle claim from purchase events
    │   └── QRYToken.sol              # LayerZero V2 OFT on Base + Arbitrum
    └── hooks/
    docs/
    ├── architecture.md
    ├── build-plan.md
    ├── design-system.md
    ├── legal-posture.md              # Geoblock country list + per-round regulatory framing
    ├── contracts.md                  # Contract addresses, ABIs, deploy history
    ├── kyc-flow.md                   # Sumsub integration details + approval criteria
    └── changelog.md
    .claude/
    ├── commands/
    │   ├── start.md
    │   ├── wrap.md
    │   ├── checkpoint.md
    │   └── status.md
    └── rules/
        ├── ui-components.md
        ├── web3.md
        ├── security.md               # Geoblock, KYC gating, PII handling rules
        └── animation.md
    CLAUDE.md

## Design System (match the marketing site exactly)

**Colors:**
- `--bg-primary: #08080f` (near-black with blue undertone)
- `--bg-secondary: #0f1019` (card bg)
- `--bg-tertiary: #161822` (elevated)
- `--qc-teal: #14b8a6` / glow `#2dd4bf`
- `--qc-blue: #3b82f6` / glow `#60a5fa`
- `--qc-red: #ef4444`
- `--qc-green: #22c55e`
- `--text-primary: #f1f5f9` / `--text-secondary: #94a3b8` / `--text-muted: #475569`

**Fonts (next/font/google):** Space Grotesk (display) · Inter (body) · JetBrains Mono (code/labels/stats)

**Cards:** `bg-[#0f1019] border-white/5 backdrop-blur`, `rounded-xl`, hover glow.

**Buttons:** primary = gradient teal→blue border with teal text, secondary = `border-white/10` ghost.

## Critical Rules (put these in CLAUDE.md)

### General
- **Dark mode only.** Background `#08080f`. No light mode.
- **No generic clipart icons.** Lucide or custom SVG.
- **Aceternity/Magic UI components are COPIED into `src/components/ui/`** — not npm installed.
- **Every section** wraps children in `BlurFade` entrance animation with 50ms stagger.
- **Copy tone:** confident, punchy, technical but accessible. State, don't ask.
- **Git is source of truth for deploys.** Never run `vercel --prod` CLI.

### Security / compliance (NON-NEGOTIABLE)
- **Geoblock runs server-side in middleware.ts.** IP + VPN/proxy detection. Restricted countries see `/restricted` and cannot render any sale UI. MaxMind GeoLite2 or Cloudflare IP country header.
- **Restricted countries (default blacklist — confirm final list with counsel):** US (public sale; pending Seed resolution — see `ico-research-summary.md`), China (Mainland), North Korea, Iran, Syria, Cuba, Russia, Belarus, Crimea/DNR/LNR, Myanmar, Sudan, Ontario (Canada). Stored in `lib/geoblock.ts` with a `restrictedCountries` export.
- **Terms acceptance modal runs before wallet connect.** User attests to country of residence, acknowledges risk disclosures, e-signs subscription agreement. State persisted in Supabase, not just localStorage.
- **KYC must complete before purchase.** Sumsub flow: ID document + liveness + proof of residency + sanctions/PEP/adverse-media screening. `kycStatus: 'approved'` required on the user row before purchase UI renders.
- **Sanctions screening runs on every incoming wallet address** pre-deposit (Chainalysis or TRM). If wallet flags tainted, reject + log. Audit trail must be queryable.
- **Never custody funds.** All deposits go directly into the on-chain `QRYPurchaseVault` contract. No intermediate custodial wallet.
- **Treasury Shield on settlement.** Foundation's contract auto-routes incoming ETH/USDT → USDC via Uniswap/1inch on successful purchase. Locks in the $0.50 price floor.
- **PII handling:** KYC data lives with Sumsub — never store passport images, SSN, or DOB in our DB. Store only `sumsubId`, `kycStatus`, `jurisdiction`, `approvedAt`.
- **Audit log everything.** Each purchase, refund, KYC state change writes to an append-only audit table. A "Geoblock Efficacy Audit" report must be generatable on demand.

### Web3
- **Wallet connect** via RainbowKit with MetaMask, WalletConnect, Coinbase Wallet, Rainbow, Rabby supported.
- **Omnichain ERC-20** deployed on Base + Arbitrum via LayerZero V2 OFT. Launchpad detects wallet context and recommends the right chain per round (Base for Seed, Arbitrum for Public).
- **Transaction UX:** every tx shows pending → confirmed → explorer-link states. Never fail silently.
- **Chain switch prompt:** if user is on wrong chain for the active round, show the inline switch prompt with network logos.
- **All contract reads through viem** — no ethers.js. Typed ABIs committed to `lib/contracts/`.

## Build Plan (seed for docs/build-plan.md)

### Phase 0 — Scaffolding
- [ ] Next.js 15 + TS + Tailwind 4 + pnpm init
- [ ] Design tokens in globals.css matching marketing site
- [ ] Fonts (Space Grotesk, Inter, JetBrains Mono)
- [ ] Dark-mode layout.tsx + navbar placeholder
- [ ] Supabase schema: `users`, `purchases`, `kyc_events`, `audit_log`
- [ ] Geoblock middleware.ts + `/restricted` page
- [ ] Terms acceptance modal + Supabase persistence

### Phase 1 — Wallet + KYC gate
- [ ] RainbowKit ConnectButton + wagmi chain config (Base + Arbitrum)
- [ ] Sumsub SDK integration + webhook signature verify
- [ ] `kycStatus` state machine: `pending → under_review → approved | rejected`
- [ ] Sanctions screening on wallet connect (Chainalysis or TRM)
- [ ] Dashboard shell (wallet-gated, KYC-gated)

### Phase 2 — Purchase contracts + registration
- [ ] Solidity: `QRYPurchaseVault.sol` + `QRYVesting.sol` (both chains)
- [ ] LayerZero V2 OFT `QRYToken.sol` on Base + Arbitrum
- [ ] Deploy to testnet (Base Sepolia + Arbitrum Sepolia)
- [ ] 14-day Registration page with countdown + KYC progress indicator
- [ ] Testnet Reputation score lookup (Galxe / Layer3 integration)

### Phase 3 — Round mechanics
- [ ] Priority Round (24h) — guaranteed $1,000 allocation for qualifying reputation scores
- [ ] Lottery Round (48h) — Chainlink VRF draw + ticket UI
- [ ] Overflow (FCFS) — only activates if cap not hit
- [ ] Purchase modal: amount (USD-labeled), chain + token selector, wallet balance check, tx submit

### Phase 4 — Vesting + Instant-Stake
- [ ] Vesting schedule UI per tier (Team, Seed, Public, Angel)
- [ ] Claim button post-TGE with per-tranche state
- [ ] Instant-Stake opt-in flow: lock liquid 25% for +6mo → 10% bonus + Founding Validator badge
- [ ] Founding Validator badge mint (SBT or off-chain registry — TBD)

### Phase 5 — Testnet utility
- [ ] Cross-Chain Listener service (Node/Go) — monitors Purchase events on Base/Arbitrum
- [ ] TestnetDistributor.sol on QuarryChain testnet — merkle claim
- [ ] "Your QRY works on testnet" post-purchase flow in dashboard

### Phase 6 — Admin + audit
- [ ] Admin surface (wallet-allowlist gated): KYC queue, pause/resume sale, refund tooling
- [ ] Audit log viewer
- [ ] Geoblock Efficacy Audit report generator
- [ ] Final security audit (Code4rena, Trail of Bits, or similar) — before mainnet money flows

## Open items to resolve with Alec before Phase 2

1. **Seed regulatory posture:** Reg CF (deck) vs Reg D 506(c) (research PDF). See `ico-research-summary.md` for context. Drives whether US investors see the Seed round at all.
2. **Foundation jurisdiction:** Cayman vs Switzerland. Affects footer, Terms of Service, WHOIS.
3. **Partnered Launchpads at TGE:** does QRY distribute via CoinList / MEXC / ByBit Launchpool alongside the own launchpad?
4. **Mainnet launch / TGE date target** — drives all the countdowns and sale window dates.
5. **Testnet Reputation scoring criteria** — which quests count? Galxe or Layer3? What thresholds qualify for Priority Round?
6. **"Founding Validator" badge format:** NFT / SBT / off-chain registry? Governance weight at mainnet?

## Slash Commands (contents go in `.claude/commands/`)

### `.claude/commands/start.md`

    Starting a new session. Do the following:
    1. Read @docs/build-plan.md and show me the next unchecked items
    2. Read @docs/changelog.md and show me what was done last session
    3. Confirm the geoblock country list in lib/geoblock.ts still matches @docs/legal-posture.md
    4. Tell me what we should work on next

### `.claude/commands/wrap.md`

    Wrapping up this session. Do the following:
    1. Mark completed tasks in @docs/build-plan.md
    2. Write a changelog entry in @docs/changelog.md covering: what was built, decisions made, verification performed, shipped commits, issues/gotchas
    3. If new contracts were deployed: update @docs/contracts.md with addresses + ABI pointers
    4. Confirm nothing is half-built — unfinished work must land in build-plan.md as explicit unchecked items
    5. Summarize the session

### `.claude/commands/checkpoint.md`

    Mid-session checkpoint. Do the following:
    1. Summarize what's been done so far in this session
    2. Flag any open decisions needing human input
    3. Confirm no security rule (geoblock, KYC gate, sanctions screening, no-custody) has been bypassed

### `.claude/commands/status.md`

    Show me project status:
    1. Current phase from @docs/build-plan.md
    2. Next 3 unchecked items
    3. Any deployed contracts and their addresses from @docs/contracts.md
    4. Open items blocked on Alec / legal counsel
