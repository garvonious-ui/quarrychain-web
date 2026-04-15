// ===== Tokenomics =====

export const TOKENOMICS = {
  totalSupply: 200_000_000,
  symbol: "QRY",
  decimals: 18,
  seedPrice: 0.25,
  allocation: [
    { name: "Public Sale & Liquidity", percentage: 30, color: "#3b82f6" },
    { name: "Staking & Farming", percentage: 20, color: "#14b8a6" },
    { name: "Team", percentage: 20, color: "#ef4444" },
    { name: "Ecosystem & Growth", percentage: 15, color: "#22c55e" },
    { name: "Private & Angel Rounds", percentage: 15, color: "#a855f7" },
  ],
} as const;

export const TOKENOMICS_DETAILS = [
  {
    name: "Public Sale & Liquidity",
    percentage: 30,
    color: "#3b82f6",
    tokens: "60,000,000 QRY",
    description: "Allocated for the public ICO and DEX liquidity pools. Ensures deep liquidity from day one across QuarrySwap and centralized exchanges.",
    vesting: "40% at TGE, 60% over 6 months",
    vestingMonths: 6,
  },
  {
    name: "Staking & Farming",
    percentage: 20,
    color: "#14b8a6",
    tokens: "40,000,000 QRY",
    description: "Block rewards for Quarry Miners and staking rewards for QRY holders. Emitted over 4 years on a decreasing schedule.",
    vesting: "Linear emission over 48 months",
    vestingMonths: 48,
  },
  {
    name: "Team",
    percentage: 20,
    color: "#ef4444",
    tokens: "40,000,000 QRY",
    description: "Reserved for founders, engineers, and early team members. Fully locked for 12 months, then linear vesting over 24 months.",
    vesting: "12-month cliff, 24-month linear vest",
    vestingMonths: 36,
  },
  {
    name: "Ecosystem & Growth",
    percentage: 15,
    color: "#22c55e",
    tokens: "30,000,000 QRY",
    description: "Grants, partnerships, hackathons, and developer incentives. Managed by the QuarryChain Foundation with community governance oversight.",
    vesting: "Unlocked as needed, governance-approved",
    vestingMonths: 48,
  },
  {
    name: "Private & Angel Rounds",
    percentage: 15,
    color: "#a855f7",
    tokens: "30,000,000 QRY",
    description: "Early investors who funded protocol development. Discounted seed and private round pricing with strict lock-up.",
    vesting: "6-month cliff, 18-month linear vest",
    vestingMonths: 24,
  },
] as const;

export const TOKEN_UTILITY = [
  {
    title: "Gas & Transaction Fees",
    description: "QRY is used to pay all transaction fees on the network. 0.25% per transaction — minimal, predictable costs.",
    icon: "Zap",
    color: "text-qc-teal",
    bgColor: "bg-qc-teal/10",
  },
  {
    title: "Staking & Governance",
    description: "Freeze QRY to gain Quarry Power. Vote for Quarry Miners, participate in governance proposals, and earn staking rewards.",
    icon: "Vote",
    color: "text-qc-blue",
    bgColor: "bg-qc-blue/10",
  },
  {
    title: "Block Rewards",
    description: "Quarry Miners earn QRY for producing blocks. Rewards decrease over time following a deflationary emission schedule.",
    icon: "Pickaxe",
    color: "text-qc-red",
    bgColor: "bg-qc-red/10",
  },
  {
    title: "DApp Deployment",
    description: "Deploy smart contracts using QRY. Contract deployment fees are burned, creating deflationary pressure as the ecosystem grows.",
    icon: "Code",
    color: "text-qc-green",
    bgColor: "bg-qc-green/10",
  },
  {
    title: "Asset Tokenization",
    description: "Tokenize and trade real-world assets on-chain. 1% commission on asset tokenization events, paid in QRY.",
    icon: "Building",
    color: "text-qc-teal",
    bgColor: "bg-qc-teal/10",
  },
] as const;

export const VESTING_SCHEDULE = [
  { month: 0, publicSale: 40, staking: 0, team: 0, ecosystem: 0, privateRound: 0 },
  { month: 3, publicSale: 70, staking: 6.25, team: 0, ecosystem: 5, privateRound: 0 },
  { month: 6, publicSale: 100, staking: 12.5, team: 0, ecosystem: 10, privateRound: 8 },
  { month: 12, publicSale: 100, staking: 25, team: 4, ecosystem: 20, privateRound: 33 },
  { month: 18, publicSale: 100, staking: 37.5, team: 29, ecosystem: 30, privateRound: 58 },
  { month: 24, publicSale: 100, staking: 50, team: 54, ecosystem: 40, privateRound: 100 },
  { month: 30, publicSale: 100, staking: 62.5, team: 79, ecosystem: 55, privateRound: 100 },
  { month: 36, publicSale: 100, staking: 75, team: 100, ecosystem: 65, privateRound: 100 },
  { month: 42, publicSale: 100, staking: 87.5, team: 100, ecosystem: 80, privateRound: 100 },
  { month: 48, publicSale: 100, staking: 100, team: 100, ecosystem: 100, privateRound: 100 },
] as const;

export const STAKING_TIERS = [
  { tier: "Bronze", minStake: "1,000 QRY", apr: 8, reward30d: "6.58 QRY", color: "#cd7f32" },
  { tier: "Silver", minStake: "10,000 QRY", apr: 12, reward30d: "98.63 QRY", color: "#94a3b8" },
  { tier: "Gold", minStake: "100,000 QRY", apr: 16, reward30d: "1,315.07 QRY", color: "#fbbf24" },
  { tier: "Diamond", minStake: "1,000,000 QRY", apr: 20, reward30d: "16,438.36 QRY", color: "#60a5fa" },
] as const;

export const REVENUE_STREAMS = [
  {
    title: "Transaction Fees",
    rate: "0.25%",
    description: "Applied to every on-chain transaction. Low enough to keep usage frictionless, high enough to sustain the network.",
    icon: "ArrowLeftRight",
    color: "#3b82f6",
  },
  {
    title: "Contract Deployment",
    rate: "Variable",
    description: "Fees for deploying smart contracts to the QVM. Scales with contract complexity. Partially burned to reduce supply.",
    icon: "FileCode",
    color: "#14b8a6",
  },
  {
    title: "Asset Tokenization",
    rate: "1%",
    description: "Commission on real-world asset tokenization events. Covers verification, fractionalization, and on-chain settlement.",
    icon: "Building",
    color: "#22c55e",
  },
] as const;

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
    tagline: "Non-custodial wallet for QRY and QRC-20 tokens.",
    icon: "Wallet",
    href: "/ecosystem/quarrywallet",
  },
  {
    name: "QuarrySwap",
    tagline: "Swap, stake, farm. Fully decentralized.",
    icon: "ArrowLeftRight",
    href: "/ecosystem/quarryswap",
  },
  {
    name: "QuarryScan",
    tagline: "Block explorer. Every transaction, every contract.",
    icon: "Search",
    href: "https://test.quarrychain.network",
    external: true,
  },
  {
    name: "QVM",
    tagline: "EVM-compatible virtual machine. Solidity-native.",
    icon: "Cpu",
    href: "/technology",
  },
  {
    name: "QRC-20 Tokens",
    tagline: "Launch tokens with the standard developers already know.",
    icon: "Coins",
    href: "/technology",
  },
  {
    name: "Asset Tokenization",
    tagline: "Bridge physical assets to the blockchain. Trade 24/7.",
    icon: "Building",
    href: "/ecosystem",
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
  { label: "Technology", href: "/technology" },
  { label: "Ecosystem", href: "/ecosystem" },
  { label: "Tokenomics", href: "/tokenomics" },
  { label: "Developers", href: "/developers" },
  { label: "Blog", href: "/blog" },
] as const;

// ===== Social Links =====

export const SOCIAL_LINKS = [
  { name: "X", href: "https://x.com/QuarryChain", icon: "Twitter" },
  { name: "Discord", href: "https://discord.gg/quarrychain", icon: "MessageCircle" },
  { name: "Telegram", href: "https://t.me/quarrychain", icon: "Send" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/alec-arrambide-91a7b321a/", icon: "Linkedin" },
  { name: "YouTube", href: "https://youtube.com/@quarrychain", icon: "Youtube" },
  { name: "GitHub", href: "https://github.com/QuarryLabsInc", icon: "Github" },
] as const;
