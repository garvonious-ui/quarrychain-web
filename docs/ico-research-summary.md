# QRY ICO 2026 — Research Summary

Distilled from two source documents living alongside this file in `docs/`:

- `quarrychain-pitch-deck-2026.pdf` — 18-slide investor deck from Alec (source of truth for **tokenomics + Seed round structure**)
- `ico-research-2026-04-21.pdf` — 28-page compliance/strategy research (source of truth for **legal posture, KYC, chain choice, payment tokens, allocation mechanics, vesting beyond Seed, launch-day flow**)

Where the two conflict, the deck governs product facts (allocation, raise, price); the research PDF governs compliance/go-to-market strategy. One material contradiction is flagged below.

## ⚠️ Open contradiction — Seed regulatory posture

| Source | Seed posture | Implication |
|---|---|---|
| Deck (slide 15) | **Reg CF** | US retail *included* via a registered funding portal (Republic / StartEngine / Wefunder); $5M hard cap; full public marketing. No US geo-block for Seed. |
| Research PDF (§ "US Posture: The Bifurcated Strategy") | **Reg D 506(c)** | US accredited *only*; unlimited raise ceiling; US non-accredited geo-blocked. |

The research PDF is dated 2026-04-21 and references the "March 17, 2026 Joint Interpretive Release," so it's likely the updated guidance — but Alec needs to confirm before we hard-code US posture in the launchpad. **Until resolved, public copy should read "Reg-compliant, US posture TBC by counsel" and not specify Reg CF vs Reg D.**

## Tokenomics (deck slide 14 — use this)

Total supply: **200,000,000 QRY**. Four slices:

| Slice | % | QRY | Notes |
|---|---|---|---|
| Public Sale | 50% | 100,000,000 | $0.50 at TGE; $50M raise target |
| Staking / Farming | 20% | 40,000,000 | Block rewards + staking emissions over 4yr decreasing schedule |
| Team | 20% | 40,000,000 | Vesting per research PDF: 12mo cliff + 4yr 25%/yr |
| Angel Investors | 10% | 20,000,000 | = the **Seed round** (deck's "Angel Investors" label) — $0.25, 4yr vesting 25%/yr, $5M raise cap |
| **Total** | **100%** | **200,000,000** | |

**Use of Funds from $5M Seed (deck slide 14):** Marketing 50% · Development 35% · Reserve 15%.

**Supersedes:** Session 9's 9-slice whitepaper split AND the research PDF's "Ecosystem/RWA" 4-slice proposal. Neither matches the deck exactly.

## Rounds

| Round | Price | Size | Type | Status |
|---|---|---|---|---|
| Seed / Angel Investors | $0.25 (50% discount) | 20M QRY / $5M cap | **Reg CF** (deck) or **Reg D 506(c)** (research) — TBC | Flagged in deck |
| Public ICO | $0.50 | 100M QRY / $50M target | **Reg S** (Global, US-geoblocked) | Research PDF |

## Legal / geographic posture (research PDF)

**Green list — target jurisdictions in priority order:**

1. **UAE (Dubai / Abu Dhabi)** — VARA/ADGM; most proactive for L1s in 2026; RWA whale liquidity hub. Spend priority: 40% UAE/MENA.
2. **EU (MiCA-passported via France or Germany)** — legal retail protection + institutional legitimacy. 30% EU.
3. **SEA (Singapore hub + Vietnam retail volume)** — 30% SEA/APAC.
4. **Switzerland** — Swiss DLT Act; Foundation prestige (alternative to Cayman).
5. LATAM (El Salvador, Brazil) — pro-innovation frameworks.

**Red list — hard geoblock (IP + VPN-exit-node detection):**
- **United States** (Reg S Safe Harbor requires full block on the public sale — decision pending whether the Seed runs parallel as Reg CF or Reg D)
- **Mainland China**
- **Sanctioned nations:** North Korea, Iran, Syria, Cuba, Russia
- **Ontario, Canada** (OSC friction)

**Disclaimer required on-page:** *"This list is subject to final verification by QuarryLabs legal counsel."*

## KYC — Sumsub

Strategic default per research PDF. Reasons:
- Best-in-class VPN/proxy detection + automated geoblock enforcement
- Liveness checks + audit trail generation ("Geoblock Efficacy Audit" document)
- Travel Rule compliance (critical for ERC-20 → QRC-20 migration)
- Single dashboard for Seed + Public while keeping data siloed for legal separation
- Sanctions/PEP/adverse-media baked in

Alternatives not chosen: Persona (strong on US accredited but secondary need), Fractal ID (reusable SBT, Reg-S / MiCA-focused), Synaps (EU-strong, weak US).

## Deposit chain — Ethereum mainnet (single-chain ERC-20)

**⚠️ Supersedes the research PDF's chain recommendation.** The research PDF proposed Base (Seed) + Arbitrum (Public) via LayerZero V2 OFT. Alec has since clarified QRY will launch as a **standard ERC-20 on Ethereum mainnet** for both rounds.

**Why Ethereum mainnet (not L2s):**
- Institutional legitimacy — Solana / Avalanche / Polygon / most notable L1s did Ethereum mainnet raises. Whale / VC investors in the UAE MENA + EU MiCA green list expect it at $50M+ scale.
- Simpler audit scope (single chain, no LayerZero OFT cross-chain messaging, no bridge vector).
- No chain-switch UX ambiguity for users.

**Tradeoff (what we're giving up):**
- **Gas economics hurt retail.** At Ethereum mainnet fees, a $100–$500 deposit can see 6–30% of the contribution eaten by gas. Mitigations:
  - Minimum contribution floor (recommend $500–$1,000) keeps gas:contribution ratio sane.
  - Visible gas estimate in the purchase modal before signing — users see the bill upfront.
  - Framing positions the ICO as institutional-grade; the pricing signals that intentionally.

**Testnet (Sepolia) deploys first** for all contracts. Chainlink VRF v2 has Sepolia + mainnet support. Foundry scripts for deploy + Etherscan verification + addresses written to `docs/contracts.md` in the launchpad repo.

## Payment tokens

- **US Seed ($5M): USDC-only.** "Qualified Payment Stablecoin" under 2025 GENIUS Act. Easiest off-ramp via Circle / Anchorage for Miami HQ banking. Clean audit trail.
- **Public ICO ($50M): USDC + USDT + ETH.**
  - USDT mandatory — primary liquidity vehicle in UAE, SEA, Turkey. USDC-only would reduce participation 40–60%.
  - ETH accepted — the token is an ERC-20 at launch; ETH swap without stablecoin hop reduces high-velocity friction.

**Treasury Shield:** Foundation's smart contract auto-routes incoming ETH + USDT through Uniswap or 1inch → USDC or yield-bearing US Treasury token on settlement. Locks in $0.50 price floor against volatility. Real-time sanctions screening via **Chainalysis** or **TRM Labs** on every incoming wallet.

## Allocation mechanic — Hybrid CoinList (lottery + guaranteed tiers)

Avoid pure FCFS (gas-war + bot-manipulation problem at $50M scale). Use:

1. **Registration Phase (14 days):** KYC via Sumsub + wallet link. Build email/Discord funnel.
2. **Priority Round (first 24h):** Guaranteed $1,000 allocation to wallets with high **Testnet Reputation** score (on-chain Quarry Quests via Galxe / Layer3). Rewards real users of the functional system.
3. **Lottery Round (next 48h):** VRF-selected winners from general pool get fixed $500–$2,000 allocations. "Artificial scarcity" creates the $0.50 feels-like-a-deal perception. Handles 100K+ micro-investors without crashing the site.
4. **Overflow (optional):** If $50M isn't hit, open remaining to public FCFS.

**US Seed investors do NOT go through this.** Handled via SAFT (or equivalent under whichever posture lands) + manual whitelist for "Claim" function — kept legally siloed from the Public lottery.

## Vesting (investor-deck seeds + research PDF details)

Per deck + research PDF synthesis:

| Category | Allocation | TGE Unlock | Cliff | Duration |
|---|---|---|---|---|
| Team | 40M QRY | 0% | 12 months | 4 years (25% annual) |
| Angel Investors / Seed ($0.25) | 20M QRY | 0% | 12 months | 4 years (25% annual) — deck slide 15 |
| Public ICO ($0.50) | 100M QRY | **25%** | None | 6 months linear |
| Staking / Farming | 40M QRY | — | — | Emission schedule over 4 years (not investor vesting) |

**Miami Safeguard ("Instant-Stake Pivot"):** ICO investors who lock their liquid 25% for +6 months at TGE receive a **10% QRY bonus** from the Ecosystem Reserve + a "**Founding Validator**" badge. Reduces sellable supply at TGE from 25% → ~10–12%, defending the $0.50 floor.

Deck doesn't specify Public vesting; this follows the research PDF's "Utility Hybrid" recommendation (must have immediate liquid supply or the token fails the "Digital Tool" classification test under the March 17 Joint Interpretive Release).

## Testnet utility (per Alec's answers, p. 25–28 of research PDF)

**Alec's direct instruction: "Remove the instances of 'Shasta'"** from the site. Done — stripped from litepaper §10 + §13 on 2026-04-21 (see `changelog.md`).

**What Shasta is:** The testnet was informally named after TRON's Shasta testnet because QuarryChain's architecture is TRON-derived. Being renamed; in the meantime site uses plain "testnet."

**Current status (Alec):**
- **Phase 2 (now):** UI/UX + **EVM-compatible wallet integration** working. **QRY-ERC20 is the token connecting to the testnet** — not a separate native testnet coin. Contributors' purchased ERC-20 can be used on testnet directly, which simplifies any "testnet utility for buyers" flow.
- **Phase 3 (upcoming):** Staking / Delegation features + minimum stake threshold for Quarry Miner candidacy. **Validator signup, on-chain governance voting, and staking rewards are NOT live today** — they're the Phase 3 build. Marketing the ICO around "buy and validate immediately" is premature.

**Faucet:** Not available by default. A "push" system (auto-airdrop on purchase event) needs to be added to Phase 2 or Phase 3 explicitly. Requires a **Cross-Chain Listener** (Node.js / Go backend) watching `Purchase` events on Ethereum mainnet and triggering distribution on the QuarryChain testnet.

## Implications for quarrychain-web

Already executed (Session 10, after this research landed):

- ✅ Stripped "Shasta" from [10-ecosystem.tsx](src/app/whitepaper/sections/10-ecosystem.tsx) (2 hits) + [13-ask.tsx](src/app/whitepaper/sections/13-ask.tsx) (2 hits). `HexGrid.tsx`-style keep-on-disk: `changelog.md` historical mentions are left alone as a historical record.
- ✅ Swapped `TOKENOMICS.allocation` + `TOKENOMICS_DETAILS` in [constants.ts](src/lib/constants.ts) to the deck's 4-slice breakdown (Public 50% / Staking 20% / Team 20% / Angel 10%).
- ✅ New `/ico` teaser page announcing round structure, allocation, compliance posture (hedged pending counsel), and waitlist CTA. Does NOT attempt to collect money — that's the separate launchpad repo.
- ✅ NAV_LINKS + Footer wired.

Deferred to separate `quarrychain-ico` repo (see `docs/qry-ico-starter-prompt.md`):
- Wallet connect (wagmi + RainbowKit)
- Sumsub KYC SDK integration + geoblock middleware
- Purchase contracts on Ethereum mainnet (standard ERC-20, no cross-chain OFT)
- Registration / Priority / Lottery / Overflow round logic (VRF-backed)
- Instant-Stake opt-in + Founding Validator badge mint
- Cross-Chain Listener + testnet distribution contract

## Still-open items needing confirmation

1. **Seed regulatory posture: Reg CF (deck) vs Reg D 506(c) (research PDF).** Blocks US-retail inclusion decision.
2. **Foundation jurisdiction: Cayman vs Switzerland.** Research PDF presents both. Affects footer copy, WHOIS, contact page.
3. **Partnered launchpads at TGE:** deck silent; research PDF references "Partnered Launchpads" (CoinList / MEXC / ByBit Launchpool?). Drives listing announcements.
4. **Mainnet launch date target** → TGE date → sale window dates.
5. **Testnet Reputation scoring criteria** for Priority Round 24h allocations.
6. **"Founding Validator" badge format:** NFT, SBT, or off-chain registry? Carries governance weight at mainnet?
