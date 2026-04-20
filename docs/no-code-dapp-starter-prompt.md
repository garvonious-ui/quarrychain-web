I'm building the QuarryChain No-Code Token Generator DApp — the actual functional product, not the marketing site for it. The marketing site lives in a separate repo (`/Users/loucesario/QUARRY/quarrychain-web`) with a reskinned preview on the /developers page; this repo is the real thing that wallet users will connect to and deploy tokens through.

Reference the demo at https://7a90-009-86997-coifsp0uh1dr-deployed-internal.easysite.ai/ for scope: wallet connect → token/NFT/DApp wizard → badge-based role system (Bronze/Silver/Gold + DeFi instruments: Collateralized NFTs, Digital Bonds, Crypto Mortgages) → one-click deploy to QuarryChain.

## What to do in this first session

1. Initialize a Next.js 15 + TypeScript + Tailwind CSS 4 project with pnpm
2. Install deps for the marketing shell: `motion`, `gsap`, `three`, `@types/three`, `lucide-react`, `clsx`, `tailwind-merge`
3. Install Web3 deps: `wagmi`, `viem`, `@tanstack/react-query`, `@rainbow-me/rainbowkit` (or equivalent)
4. Scaffold the directory structure below
5. Set up the dark-mode design tokens in `globals.css` matching the brand (see below)
6. Create the docs + .claude/commands scaffolding
7. Build a minimal landing shell — navbar + hero placeholder

## Tech Stack
- Next.js 15 (App Router), TypeScript, Tailwind CSS 4
- pnpm
- Motion (framer-motion) for component animations
- GSAP + ScrollTrigger for scroll-driven effects
- Three.js for any 3D / wireframe elements
- Lucide React (icons — NO generic clipart ever)
- Lenis for smooth scroll
- wagmi + viem for wallet/contract interaction
- Vercel for deploy

## Project Structure

    src/
    ├── app/
    │   ├── layout.tsx           # Root: fonts, metadata, SmoothScroll, CursorGlow
    │   ├── page.tsx             # Landing (marketing half)
    │   ├── globals.css          # Tailwind + CSS custom properties
    │   ├── wizard/page.tsx      # Token creation wizard (functional half)
    │   ├── dashboard/page.tsx   # Wallet-gated dashboard
    │   └── api/                 # Any server routes (contract reads, etc.)
    ├── components/
    │   ├── layout/              # Navbar, Footer, SmoothScroll, CursorGlow
    │   ├── sections/            # Landing sections (Hero, Features, etc.)
    │   ├── wizard/              # Wizard steps (WalletConnect, ChooseType, ConfigureToken, BadgePermissions, Deploy)
    │   ├── web3/                # WalletProvider, ConnectButton, ContractForm, etc.
    │   ├── three/               # Three.js components (dynamic import + ssr:false)
    │   └── ui/                  # Copy-pasted Aceternity/Magic UI (blur-fade, spotlight-card, number-ticker, etc.)
    ├── lib/
    │   ├── utils.ts             # cn() helper
    │   ├── constants.ts         # Token standards, role tiers, etc.
    │   ├── contracts/           # ABIs + deploy helpers
    │   └── wagmi.ts             # Chain config
    └── hooks/
    docs/
    ├── architecture.md
    ├── build-plan.md
    ├── design-system.md
    ├── content-copy.md
    └── changelog.md
    .claude/
    ├── commands/
    │   ├── start.md
    │   ├── wrap.md
    │   ├── checkpoint.md
    │   └── status.md
    └── rules/
        ├── ui-components.md
        ├── three-js.md
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

**Fonts (next/font/google):**
- Space Grotesk — display / headlines
- Inter — body
- JetBrains Mono — code / labels / stats

**Cards:** `bg-[#0f1019] border-white/5 backdrop-blur`, `rounded-xl`, hover adds teal/blue glow.

**Buttons:** primary = gradient teal→blue border with teal text, secondary = `border-white/10` ghost.

**Pills / badges:** `rounded-full`, `px-3.5 py-1.5`, teal-10/teal-15 background with teal text, JetBrains Mono.

## Critical Rules (put these in CLAUDE.md)
- **Dark mode only.** Background `#08080f`. No light mode.
- **No generic clipart icons.** Lucide line icons or custom SVG with glow only.
- **Aceternity/Magic UI components are COPIED into `src/components/ui/`** — not npm installed. Own the code.
- **Three.js:** dynamic import with `ssr: false` + loading fallback. Always dispose geometry/materials on unmount. `requestAnimationFrame`, not setInterval. Respect `prefers-reduced-motion`.
- **Every section** wraps children in `BlurFade` entrance animation (fade up + blur-in on scroll, 50ms stagger).
- **Copy tone:** confident, punchy, technical but accessible. State, don't ask. No rhetorical questions. Think Solana not IBM.
- **Git is source of truth for deploys.** Never run `vercel --prod` CLI — commit + push triggers Vercel auto-deploy.
- **Wallet/contract interactions** must surface errors clearly — never fail silently. Use proper error boundaries + toast/inline feedback.
- **Session protocol:** before starting work, read `@docs/build-plan.md` + `@docs/changelog.md`. After completing a feature, update both. On "wrap up", follow the `/wrap` command.

## Slash commands to create under `.claude/commands/`

**start.md:**

    Starting a new session. Do the following:
    1. Read @docs/build-plan.md and show me the next unchecked items
    2. Read @docs/changelog.md and show me what was done last session
    3. Tell me what we should work on next

**wrap.md:**

    Wrapping up this session. Do the following:
    1. List everything we built or changed this session
    2. Update @docs/build-plan.md — check off completed items
    3. Add a new dated entry to @docs/changelog.md with:
       - What was built
       - Decisions made
       - Bugs found or issues to address next time
       - Current status of overall build
    4. If new patterns or gotchas were discovered, add them to CLAUDE.md
    5. Give me a summary of what to tell Claude Code next session

**checkpoint.md:**

    Mid-session checkpoint. Do the following:
    1. Save current progress to @docs/changelog.md (append to today's entry)
    2. Check off any completed items in @docs/build-plan.md
    3. Note any files that were created or modified
    4. Summarize where we are so that if context is lost, we can resume

**status.md:**

    Show me project status:
    1. Read @docs/build-plan.md and show completion percentage per phase
    2. Show last 3 entries from @docs/changelog.md
    3. List any TODO/FIXME/HACK comments in codebase
    4. Report current /cost token usage

## Rules files under `.claude/rules/`

**ui-components.md:**

    # UI Component Rules
    - All components here are COPIED from Aceternity UI, Magic UI, or shadcn — not npm installed
    - Always use cn() utility for conditional classes
    - Every component must accept className prop for override
    - Use CSS variables from globals.css for brand colors
    - Dark mode only — never reference light mode variants
    - Animation: use Motion (framer-motion) — import from "motion/react"

**three-js.md:**

    # Three.js Rules
    - ALWAYS dynamic import with { ssr: false }
    - ALWAYS provide a loading fallback (skeleton or gradient)
    - ALWAYS dispose geometry, materials, renderer on unmount
    - Use requestAnimationFrame, not setInterval
    - Respect prefers-reduced-motion — disable animation, show static frame
    - Keep canvas behind content with z-index layering
    - Performance budget: target 60fps on mid-range devices
    - Do NOT use THREE.CapsuleGeometry (not available in r128)

**animation.md:**

    # Section Animation Rules
    - Every section wraps children in blur-fade entrance (scroll triggered)
    - Stagger children by 50ms delay
    - Use GSAP ScrollTrigger for pinned/parallax effects
    - Use Motion for component-level animations (hover, enter/exit)
    - Always check prefers-reduced-motion before running animations
    - No animation should block interactivity or content visibility

## Build Plan (seed docs/build-plan.md with this)

### Phase 1 — Scaffolding + Marketing Shell
- Initialize project, install deps, configure Tailwind + fonts + globals.css
- Root layout with Navbar, Footer, SmoothScroll
- Landing page: Hero + Features + 5-step flow + CTAs

### Phase 2 — Wallet + Web3 Foundation
- wagmi/viem setup with QuarryChain RPC config
- ConnectWallet button, wallet state management
- Contract ABI loading + type generation

### Phase 3 — Token Wizard (core product)
- Step 1: Connect wallet (gated)
- Step 2: Choose type (Token / NFT / DApp)
- Step 3: Configure (name, symbol, supply, metadata)
- Step 4: Badge permissions (Bronze/Silver/Gold + DeFi instruments)
- Step 5: Review + deploy to mainnet

### Phase 4 — Dashboard + History
- Wallet-gated dashboard showing deployed tokens
- Transaction history from QuarryScan
- Role Blocks management UI
- Staking screen

### Phase 5 — DeFi instruments
- Collateralized NFTs
- Digital Bonds (tokenized bonds with automated interest)
- Crypto Mortgages

### Phase 6 — Polish + deploy
- Analytics (QuarryScan integration)
- Full responsive pass
- Accessibility audit
- Vercel production deploy

Start by setting up the project and getting a minimal hero rendering with the brand fonts and colors. Ask me for any decisions (project name, repo name, deploy target, etc.) before proceeding.
