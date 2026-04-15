import {
  Gem,
  Coins,
  Wheat,
  Building,
  Lightbulb,
  Layers,
  Wallet,
  Settings,
  Bot,
  TrendingDown,
  Clock,
  Eye,
  Boxes,
} from "lucide-react";
import LitepaperSection from "@/components/litepaper/LitepaperSection";
import { LITEPAPER_SECTIONS } from "@/lib/litepaper";

const meta = LITEPAPER_SECTIONS.find((s) => s.id === "rwa")!;

const ASSET_CATEGORIES = [
  {
    icon: Gem,
    name: "Collectibles & Unique Objects",
    color: "#22c55e",
    examples: "Fine art, virtual collectibles, automobiles, medical devices",
  },
  {
    icon: Coins,
    name: "Precious Metals",
    color: "#fbbf24",
    examples: "Gold, silver, platinum",
  },
  {
    icon: Wheat,
    name: "Consumables",
    color: "#ef4444",
    examples: "Food & beverages, pharmaceuticals, coffee",
  },
  {
    icon: Building,
    name: "Financial Instruments",
    color: "#3b82f6",
    examples: "Real estate, certificates, fixed income",
  },
  {
    icon: Lightbulb,
    name: "Intangible Assets",
    color: "#a855f7",
    examples: "IP, copyrights, royalties, trademarks, patents, licenses",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Select the model",
    body: "Pick the right token standard for the asset. QRC-20 for fungible (a kilo of gold is a kilo of gold). QRC-1400 for regulated securities. QRC-721 for unique, indivisible items like a single artwork or a specific property.",
  },
  {
    n: "02",
    title: "Model the asset",
    body: "Decide what lives on-chain and what stays off-chain. Legal constraints, level of trust required, business process, scalability requirements. Real estate needs different on-chain data than a coffee shipment.",
  },
  {
    n: "03",
    title: "Audit the code",
    body: "Once deployed, the contract is immutable. Run automated security audits — either through QuarryChain's standardized templates or a third party like CERTIK — before anything goes live.",
  },
  {
    n: "04",
    title: "Deploy",
    body: "Publish the contract to QuarryChain — public or permissioned, depending on the use case. Tokens issue automatically (or manually, if the design calls for it) and start trading on-chain.",
  },
];

const BENEFITS = [
  {
    icon: Layers,
    name: "Fractionalization",
    body: "High-barrier assets like real estate become accessible to smaller investors.",
  },
  {
    icon: Settings,
    name: "Customizability",
    body: "Build portfolios down to the individual asset level instead of buying a sector index.",
  },
  {
    icon: Wallet,
    name: "Liquidity",
    body: "Wider investor pool plus secondary markets unlocks capital that was previously stuck.",
  },
  {
    icon: Bot,
    name: "Automation",
    body: "Smart contracts handle compliance, document verification, escrow, and dividend payouts automatically.",
  },
  {
    icon: TrendingDown,
    name: "Cost Efficiency",
    body: "Removes brokers, custodians, and clearinghouses from the chain of intermediaries.",
  },
  {
    icon: Clock,
    name: "Faster Settlement",
    body: "DPoS finality settles trades in seconds — versus T+2 or T+3 in traditional markets.",
  },
  {
    icon: Eye,
    name: "Transparency",
    body: "Every transfer, every dividend, every piece of metadata is visible and auditable on-chain.",
  },
  {
    icon: Boxes,
    name: "Structured Products",
    body: "Once the underlying is tokenized, baskets and derivatives become a few lines of Solidity.",
  },
];

export default function Section07RWA() {
  return (
    <LitepaperSection meta={meta}>
      <p>
        QuarryChain wasn&apos;t designed only for digital-native assets. The
        protocol&apos;s most distinctive bet is on{" "}
        <strong className="text-text-primary">tokenizing real-world
        assets</strong> — taking value that already exists in the physical or
        legal world and giving it a programmable, transferable on-chain
        representation. Anything from a kilogram of gold to a building to a
        film royalty becomes a token you can trade, fractionalize, or use as
        collateral.
      </p>

      <h3 className="text-xl font-bold font-display text-text-primary pt-4">
        What can be tokenized
      </h3>
      <p>
        Practically anything with provable ownership and a stable enough
        valuation to settle on. The categories the protocol is explicitly
        engineered around:
      </p>

      <div className="not-prose grid sm:grid-cols-2 gap-3">
        {ASSET_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.name}
              className="rounded-xl bg-bg-secondary border border-white/5 p-4 flex gap-4"
            >
              <div
                className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${cat.color}15` }}
              >
                <Icon className="w-4 h-4" style={{ color: cat.color }} />
              </div>
              <div>
                <h4
                  className="text-sm font-bold font-display"
                  style={{ color: cat.color }}
                >
                  {cat.name}
                </h4>
                <p className="text-xs text-text-secondary mt-1">
                  {cat.examples}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <h3 className="text-xl font-bold font-display text-text-primary pt-4">
        How tokenization works on QuarryChain
      </h3>
      <p>
        From the developer side, every tokenization project follows the same
        four-step process. The order matters — once a contract ships, it
        can&apos;t be unshipped.
      </p>

      <div className="not-prose space-y-3">
        {STEPS.map((step) => (
          <div
            key={step.n}
            className="rounded-xl bg-bg-secondary border border-white/5 p-5 flex gap-5"
          >
            <span className="text-2xl font-bold font-display text-qc-green shrink-0 leading-none pt-1">
              {step.n}
            </span>
            <div>
              <h4 className="text-base font-bold font-display text-text-primary mb-1">
                {step.title}
              </h4>
              <p className="text-sm text-text-secondary">{step.body}</p>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-bold font-display text-text-primary pt-4">
        Why bother
      </h3>

      <div className="not-prose grid sm:grid-cols-2 gap-3">
        {BENEFITS.map((b) => {
          const Icon = b.icon;
          return (
            <div
              key={b.name}
              className="rounded-xl bg-bg-secondary border border-white/5 p-4"
            >
              <div className="flex items-center gap-3 mb-1.5">
                <Icon className="w-4 h-4 text-qc-green" />
                <h4 className="text-sm font-bold font-display text-text-primary">
                  {b.name}
                </h4>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                {b.body}
              </p>
            </div>
          );
        })}
      </div>
    </LitepaperSection>
  );
}
