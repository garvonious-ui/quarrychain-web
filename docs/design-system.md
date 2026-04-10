# Design System

## Color Palette (Dark Mode Default)

### Backgrounds
| Token | Hex | Usage |
|---|---|---|
| `--bg-primary` | `#08080f` | Near-black with blue undertone — page background |
| `--bg-secondary` | `#0f1019` | Card backgrounds |
| `--bg-tertiary` | `#161822` | Elevated surfaces |

### Brand Colors (muted/glowy versions of QuarryChain RGB)
| Token | Hex | Usage |
|---|---|---|
| `--qc-blue` | `#3b82f6` | Primary actions, links |
| `--qc-blue-glow` | `#60a5fa` | Hover states, accents |
| `--qc-red` | `#ef4444` | Alerts, emphasis |
| `--qc-red-muted` | `#dc2626` | Secondary emphasis |
| `--qc-green` | `#22c55e` | Success, eco messaging |
| `--qc-green-muted` | `#16a34a` | Secondary success |
| `--qc-teal` | `#14b8a6` | Accent, grid glow, hero mesh |
| `--qc-teal-glow` | `#2dd4bf` | Bright accent |

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

## Typography

### Font Families
- **Display / Headlines:** "Space Grotesk" (Google Fonts) — geometric, techy, bold
- **Body:** "Inter" — clean readability at all sizes
- **Mono / Code:** "JetBrains Mono" — for code snippets or technical data

### Type Scale (mobile-first)
| Name | Classes | Description |
|---|---|---|
| `hero-headline` | `text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight` | Hero headline |
| `section-headline` | `text-3xl md:text-5xl font-bold` | Section titles |
| `section-sub` | `text-lg md:text-xl text-secondary` | Section subtitles |
| `body` | `text-base text-secondary leading-relaxed` | Body text |
| `label` | `text-sm uppercase tracking-widest text-muted` | Labels, badges |

## Motion Principles

- **Enter animations:** Elements fade up + blur-in on scroll (Aceternity's blur-fade component)
- **Hover states:** Subtle glow expansion, not color change
- **Section transitions:** Staggered children (50ms delay between items)
- **Hero grid:** Continuous subtle wave, accelerates toward mouse cursor
- **Stats/numbers:** Animated count-up on scroll-into-view (Magic UI number ticker)
- **Performance rule:** No animation on `prefers-reduced-motion`. Lazy-load Three.js hero.

## Component Patterns

### Cards
- `bg-secondary` with 1px `border-white/5`
- Subtle `backdrop-blur`
- Hover: glow ring effect

### Buttons
- **Primary:** Gradient border (teal→blue), transparent fill, white text, glow on hover
- **Secondary:** Ghost style, border-white/10, text-secondary

### Section Dividers
- Subtle gradient line, or no divider (spacing handles separation)

### Badges / Pills
- Small rounded, `bg-white/5`, `text-teal`
- For labels like "DPoS", "100K TPS"

### Icons
- **NO clipart icons ever.**
- Lucide line icons only, or custom SVG with glow treatment
