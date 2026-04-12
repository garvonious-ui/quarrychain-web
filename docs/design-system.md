# Design System (V2)

## Color Palette (Dark Mode Default)

### Backgrounds
| Token | Hex | Usage |
|---|---|---|
| `--bg-primary` | `#08080f` | Near-black with blue undertone — page background |
| `--bg-secondary` | `#0f1019` | Card backgrounds, code blocks |
| `--bg-tertiary` | `#161822` | Elevated surfaces |

### Brand Colors (muted/glowy)
| Token | Hex | Usage |
|---|---|---|
| `--qc-teal` | `#14b8a6` | **Primary accent** — CTAs, labels, grid glow |
| `--qc-teal-glow` | `#2dd4bf` | Bright accent, types in syntax highlighting |
| `--qc-blue` | `#3b82f6` | Primary actions, links, "Quarry" in wordmark |
| `--qc-blue-glow` | `#60a5fa` | Hover states, secondary accent |
| `--qc-red` | `#ef4444` | Alerts, emphasis |
| `--qc-red-muted` | `#dc2626` | Secondary emphasis |
| `--qc-green` | `#22c55e` | Success, eco messaging |
| `--qc-green-muted` | `#16a34a` | Secondary success |

### Text
| Token | Hex | Usage |
|---|---|---|
| `--text-primary` | `#f1f5f9` | Headings, primary text |
| `--text-secondary` | `#94a3b8` | Body, descriptions |
| `--text-muted` | `#475569` | Labels, captions |

### Glow / Effects
| Token | Value | Usage |
|---|---|---|
| `--glow-blue` | `rgba(59, 130, 246, 0.15)` | Blue glow behind elements |
| `--glow-teal` | `rgba(20, 184, 166, 0.2)` | Teal glow for hero/accents |
| `--glow-red` | `rgba(239, 68, 68, 0.1)` | Red glow for emphasis |

### Gradient
- Primary: teal (#14b8a6) → blue (#3b82f6)
- Usage: headline accents, button borders via `bg-gradient-to-r` or `bg-clip-text text-transparent`
- Never on body text

## Typography

### Font Families
- **Display / Headlines:** "Space Grotesk" (Google Fonts) — geometric, techy, bold
- **Body:** "Inter" — clean readability at all sizes
- **Mono / Code / Labels:** "JetBrains Mono" — for code, stats, badges, labels

### Type Scale (mobile-first)
| Name | Classes | Description |
|---|---|---|
| `hero-headline` | `text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight` | Hero headline |
| `section-headline` | `text-3xl md:text-5xl font-bold` | Section titles |
| `section-sub` | `text-lg md:text-xl text-secondary` | Section subtitles |
| `body` | `text-base text-secondary leading-relaxed` | Body text |
| `label` | `text-xs uppercase tracking-widest text-muted font-mono` | Labels, badges |
| `stat-value` | `text-3xl font-bold font-display` | Stat numbers |
| `stat-label` | `text-xs uppercase tracking-widest text-muted font-mono` | Stat labels |

## Motion Principles

- **Enter animations:** BlurFade — fade up (6px) + blur-in on scroll, stagger 50ms
- **Hover states:** Spotlight glow follows cursor (cards), glow expansion (buttons)
- **Continuous:** HexGrid wave (hero), WireframeGem rotation (CTA), Marquee scroll, GovernancePreview node ring (60s)
- **Count-up:** NumberTicker on scroll-into-view, 1.5–2s ease-out
- **Timing:** Transitions 200–300ms ease, entrances 400–600ms ease-out
- **Performance:** No animation on `prefers-reduced-motion`. Lazy-load Three.js.

## Component Patterns

### Cards
- `bg-secondary` (#0f1019) with 1px `border-white/5`
- `rounded-xl` (12px)
- Padding: `p-6` (standard) or `p-8` (feature cards)
- Hover: SpotlightCard with mouse-following radial gradient glow
- No drop shadows — use subtle glow instead

### Buttons
- **Primary:** `border-qc-teal/50`, `bg-gradient-to-r from-qc-teal/10 to-qc-blue/10`, white text, glow on hover, `px-6 py-3 rounded-lg`
- **Secondary (Ghost):** `border-white/10`, transparent fill, `text-secondary`, hover: `border-white/20 text-primary`

### Badges / Pills
- `rounded-full`, `px-3.5 py-1.5`
- `bg-[rgba(20,184,166,0.08)]`, `border-[rgba(20,184,166,0.15)]`
- `text-qc-teal`, `text-xs font-medium font-mono`

### Code Blocks (NEW — V2)
- Container: `bg-secondary rounded-xl border-white/6`, subtle teal box-shadow glow
- Header bar: 3 dots (red/yellow/green at 60%), filename in JetBrains Mono, Copy button
- Syntax colors: purple `#c084fc` (keywords), teal `#2dd4bf` (types), yellow `#fbbf24` (strings/nums), blue `#3b82f6` (functions), muted `#475569` (comments)
- Copy button: shows "Copied ✓" in green for 2s

### Stat Displays
- Value: `text-3xl font-bold font-display text-primary`
- Label: `text-xs uppercase tracking-widest font-mono text-muted`
- NumberTicker animated count-up on scroll

### Node Visualization (NEW — V2)
- 27 dots in circle, `w-3 h-3 rounded-full`, `bg-[rgba(20,184,166,0.3)]`
- 3 active dots: `bg-qc-teal` with glow shadow
- Outer ring: 1px border with subtle teal glow
- Slow rotation: 60s linear infinite, respects `prefers-reduced-motion`

### Section Labels
- `text-xs uppercase tracking-widest font-mono`
- Color: `text-qc-teal` (primary sections) or `text-qc-blue` (ecosystem)

### Icons
- **NO clipart icons ever.**
- Lucide line icons only, or custom SVG with glow treatment
- Icon containers: `rounded-lg bg-{color}/10 p-3` with matching colored icon
