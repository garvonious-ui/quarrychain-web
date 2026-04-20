// ===== Litepaper section metadata =====
// Single source of truth for section ordering, TOC labels, and accent colors.
// Used by both LitepaperLayout (rendering) and TocSidebar (scroll-spy + TOC links).

export type LitepaperAccent = "teal" | "blue" | "red" | "green" | "purple";

export interface LitepaperSectionMeta {
  id: string;        // anchor id, used in URL hash
  number: string;    // "01", "02", ..., "13"
  label: string;     // short TOC label
  title: string;     // full section headline
  accent: LitepaperAccent;
}

export const LITEPAPER_SECTIONS: LitepaperSectionMeta[] = [
  { id: "intro",          number: "01", label: "Intro",         title: "QuarryChain in one paragraph",         accent: "teal"   },
  { id: "architecture",   number: "02", label: "Architecture",  title: "A 3-layer protocol stack",             accent: "red"    },
  { id: "consensus",      number: "03", label: "Consensus",     title: "Delegated Proof of Stake",             accent: "green"  },
  { id: "qvm",            number: "04", label: "QVM",           title: "The QuarryChain Virtual Machine",      accent: "blue"   },
  { id: "economics",      number: "05", label: "Economics",     title: "Bandwidth, energy, and the cost of using QuarryChain", accent: "teal"   },
  { id: "tokens",         number: "06", label: "Token Standards", title: "Native token standards",             accent: "purple" },
  { id: "rwa",            number: "07", label: "RWA",           title: "Real-world asset tokenization",        accent: "green"  },
  { id: "governance",     number: "08", label: "Governance",    title: "Quarry Mining and the Committee",      accent: "blue"   },
  { id: "tokenomics",     number: "09", label: "Tokenomics",    title: "Quarry (QRY)",                         accent: "teal"   },
  { id: "ecosystem",      number: "10", label: "Ecosystem",     title: "Tools, networks, and applications",    accent: "red"    },
  { id: "roadmap",        number: "11", label: "Roadmap",       title: "The path forward",                     accent: "green"  },
  { id: "team",           number: "12", label: "Team",          title: "Built by builders",                    accent: "teal"   },
  { id: "ask",            number: "13", label: "The Ask",       title: "Start building on QuarryChain",        accent: "blue"   },
];

// ===== Accent color tokens =====
// Maps an accent name to its Tailwind classes and raw hex (for inline styles).

export const LITEPAPER_ACCENTS: Record<
  LitepaperAccent,
  { text: string; bg: string; border: string; ring: string; hex: string }
> = {
  teal:   { text: "text-qc-teal",       bg: "bg-qc-teal/10",       border: "border-qc-teal/20",       ring: "ring-qc-teal/30",       hex: "#14b8a6" },
  blue:   { text: "text-qc-blue",       bg: "bg-qc-blue/10",       border: "border-qc-blue/20",       ring: "ring-qc-blue/30",       hex: "#3b82f6" },
  red:    { text: "text-qc-red",        bg: "bg-qc-red/10",        border: "border-qc-red/20",        ring: "ring-qc-red/30",        hex: "#ef4444" },
  green:  { text: "text-qc-green",      bg: "bg-qc-green/10",      border: "border-qc-green/20",      ring: "ring-qc-green/30",      hex: "#22c55e" },
  purple: { text: "text-purple-400",    bg: "bg-purple-400/10",    border: "border-purple-400/20",    ring: "ring-purple-400/30",    hex: "#a855f7" },
};
