// ===== Tokenomics =====

export const TOKENOMICS = {
  totalSupply: 200_000_000,
  symbol: "QRC",
  decimals: 18,
  seedPrice: 0.25,
  allocation: [
    { name: "Public Sale / Liquidity", percentage: 30, color: "#3b82f6" },
    { name: "Staking & Farming", percentage: 20, color: "#14b8a6" },
    { name: "Team", percentage: 20, color: "#ef4444" },
    { name: "Angel Investors", percentage: 10, color: "#60a5fa" },
    { name: "Dev", percentage: 5, color: "#22c55e" },
    { name: "Ecosystem", percentage: 5, color: "#2dd4bf" },
    { name: "Marketing", percentage: 5, color: "#a855f7" },
    { name: "Private Presale", percentage: 2.5, color: "#f97316" },
    { name: "Private Sale", percentage: 2.5, color: "#eab308" },
  ],
} as const;

// ===== Team =====

export const TEAM = [
  { name: "Alec Arrambide", role: "Founder & CEO" },
  { name: "Tanner Hanks", role: "COO" },
  { name: "Gabby Parsons", role: "CMO" },
  { name: "David Aneo", role: "Lead Web Developer / Graphic Designer" },
  { name: "Toyama Haruo", role: "Senior Full Stack Developer" },
  { name: "John Wachi", role: "Full Stack Developer" },
] as const;

// ===== Roadmap =====

export type RoadmapStatus = "complete" | "in-progress" | "upcoming" | "future";

export interface RoadmapPhase {
  phase: number;
  title: string;
  status: RoadmapStatus;
  items: string[];
}

export const ROADMAP: RoadmapPhase[] = [
  {
    phase: 1,
    title: "Foundation",
    status: "complete",
    items: ["Website launch", "Seed round"],
  },
  {
    phase: 2,
    title: "Development",
    status: "in-progress",
    items: [
      "DPoS network development",
      "QVM sandbox",
      "QRC-20 development",
      "QuarryWallet",
      "QuarrySwap",
      "Team expansion",
    ],
  },
  {
    phase: 3,
    title: "Launch",
    status: "upcoming",
    items: [
      "Mainnet launch",
      "Public ICO",
      "Wallet + QVM + QRC-20 launch",
      "CoinMarketCap / CoinGecko listings",
      "QuarrySwap launch",
      "First delegate voting",
    ],
  },
  {
    phase: 4,
    title: "Growth",
    status: "future",
    items: [
      "Giveaways & AMAs",
      "Real-world marketplace expansion",
      "Mobile wallet",
      "Ecosystem DApp growth",
    ],
  },
];

// ===== Ecosystem =====

export const ECOSYSTEM = [
  {
    name: "QuarryWallet",
    tagline: "Your keys. Your crypto. Your control.",
    icon: "Wallet",
  },
  {
    name: "QuarrySwap",
    tagline: "Swap, stake, and earn — decentralized.",
    icon: "ArrowLeftRight",
  },
  {
    name: "QuarryScan",
    tagline: "Explore every block, transaction, and contract.",
    icon: "Search",
  },
  {
    name: "QVM",
    tagline: "EVM-compatible. Deploy Solidity contracts instantly.",
    icon: "Cpu",
  },
  {
    name: "QRC-20 Tokens",
    tagline: "Launch tokens with enterprise-grade standards.",
    icon: "Coins",
  },
  {
    name: "Asset Tokenization",
    tagline: "Bridge physical assets to the blockchain.",
    icon: "Building",
  },
] as const;

// ===== Stats (fallback values) =====

export const FALLBACK_STATS = {
  totalBlocks: 1_245_678,
  totalTransactions: 8_934_521,
  activeAddresses: 45_230,
  avgBlockTime: "3.0s",
} as const;

// ===== Navigation =====

export const NAV_LINKS = [
  { label: "Technology", href: "#technology" },
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Tokenomics", href: "#tokenomics" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Team", href: "#team" },
] as const;

// ===== Social Links =====

export const SOCIAL_LINKS = [
  { name: "X", href: "https://x.com/QuarryChain", icon: "Twitter" },
  { name: "Discord", href: "#", icon: "MessageCircle" },
  { name: "Telegram", href: "#", icon: "Send" },
  { name: "LinkedIn", href: "#", icon: "Linkedin" },
  { name: "YouTube", href: "#", icon: "Youtube" },
  { name: "Instagram", href: "#", icon: "Instagram" },
] as const;
