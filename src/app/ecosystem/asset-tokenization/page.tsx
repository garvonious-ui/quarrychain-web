import {
  Gem,
  Coins,
  Wheat,
  Building,
  Lightbulb,
  Layers,
  Wallet,
  Bot,
  TrendingDown,
  Clock,
  Eye,
} from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import PageCTA from "@/components/layout/PageCTA";
import BlurFade from "@/components/ui/blur-fade";

export const metadata = {
  title: "Asset Tokenization — QuarryChain",
  description:
    "Bring real-world assets on-chain. QuarryChain turns property, commodities, and rights into programmable tokens — fractionalized, transferable, 24/7 liquid.",
};

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
    body: "Pick the right token standard. QRC-20 for fungible goods. QRC-1400 for regulated securities. QRC-721 for unique items.",
  },
  {
    n: "02",
    title: "Model the asset",
    body: "Decide what lives on-chain and what stays off. Legal constraints, business process, and scalability shape the design.",
  },
  {
    n: "03",
    title: "Audit the code",
    body: "Once deployed, contracts are immutable. Run automated audits — via QuarryChain templates or a third party — before going live.",
  },
  {
    n: "04",
    title: "Deploy",
    body: "Publish to QuarryChain — public or permissioned. Tokens issue automatically and start trading on-chain.",
  },
];

const BENEFITS = [
  {
    icon: Layers,
    name: "Fractionalization",
    body: "High-barrier assets become accessible to smaller investors.",
  },
  {
    icon: Wallet,
    name: "Liquidity",
    body: "Secondary markets unlock capital that was previously stuck.",
  },
  {
    icon: Bot,
    name: "Automation",
    body: "Smart contracts handle compliance, escrow, and dividend payouts.",
  },
  {
    icon: TrendingDown,
    name: "Cost Efficiency",
    body: "Removes brokers, custodians, and clearinghouses from the chain.",
  },
  {
    icon: Clock,
    name: "Faster Settlement",
    body: "DPoS finality settles trades in seconds — not T+2.",
  },
  {
    icon: Eye,
    name: "Transparency",
    body: "Every transfer and every dividend is visible and auditable on-chain.",
  },
];

export default function AssetTokenizationPage() {
  return (
    <div className="pt-16">
      <PageHero
        label="Asset Tokenization"
        headline="Real-world assets, on-chain."
        subheadline="Turn property, commodities, rights, and royalties into programmable tokens — fractionalized, transferable, 24/7 liquid."
        shape="icosahedron"
        shapeColors={{
          primary: "#22c55e",
          secondary: "#a855f7",
          tertiary: "#3b82f6",
        }}
      />

      {/* Intro */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <BlurFade>
            <p className="text-xs uppercase tracking-widest text-qc-green font-mono mb-4">
              Concept
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-6">
              Bridge physical value into{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-qc-green to-qc-blue">
                programmable tokens.
              </span>
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed max-w-3xl">
              Anything with provable ownership and a stable enough valuation can
              be tokenized. A kilogram of gold. A share of a building. A film
              royalty. QuarryChain gives each of them an on-chain
              representation you can trade, fractionalize, or use as collateral
              — with the same finality and fees as any other QuarryChain
              transaction.
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Asset categories */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <BlurFade>
            <p className="text-xs uppercase tracking-widest text-qc-blue font-mono mb-4">
              Asset Categories
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-16">
              What can be{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-qc-blue to-qc-green">
                tokenized.
              </span>
            </h2>
          </BlurFade>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ASSET_CATEGORIES.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <BlurFade key={cat.name} delay={0.05 + i * 0.05}>
                  <div className="rounded-xl bg-bg-secondary border border-white/5 p-6 h-full">
                    <div
                      className="w-11 h-11 rounded-lg flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${cat.color}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: cat.color }} />
                    </div>
                    <h3
                      className="text-base font-bold font-display mb-2"
                      style={{ color: cat.color }}
                    >
                      {cat.name}
                    </h3>
                    <p className="text-sm text-text-secondary">{cat.examples}</p>
                  </div>
                </BlurFade>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <BlurFade>
            <p className="text-xs uppercase tracking-widest text-qc-teal font-mono mb-4">
              Process
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-4">
              Four steps to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-qc-teal to-qc-blue">
                on-chain.
              </span>
            </h2>
            <p className="text-text-secondary text-lg mb-16 max-w-2xl">
              The order matters. Once a contract ships, it can&apos;t be
              unshipped.
            </p>
          </BlurFade>

          <div className="space-y-4">
            {STEPS.map((step, i) => (
              <BlurFade key={step.n} delay={0.05 + i * 0.05}>
                <div className="rounded-xl bg-bg-secondary border border-white/5 p-6 flex gap-6 items-start">
                  <span className="text-3xl font-bold font-display text-qc-green shrink-0 leading-none pt-1 font-mono">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold font-display text-text-primary mb-2">
                      {step.title}
                    </h3>
                    <p className="text-text-secondary">{step.body}</p>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <BlurFade>
            <p className="text-xs uppercase tracking-widest text-qc-red font-mono mb-4">
              Benefits
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-16">
              Why bother{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-qc-red to-qc-green">
                tokenizing.
              </span>
            </h2>
          </BlurFade>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BENEFITS.map((b, i) => {
              const Icon = b.icon;
              return (
                <BlurFade key={b.name} delay={0.05 + i * 0.05}>
                  <div className="rounded-xl bg-bg-secondary border border-white/5 p-6 h-full">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="w-4 h-4 text-qc-green" />
                      <h3 className="text-base font-bold font-display text-text-primary">
                        {b.name}
                      </h3>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {b.body}
                    </p>
                  </div>
                </BlurFade>
              );
            })}
          </div>
        </div>
      </section>

      <PageCTA
        headline="Ready to tokenize?"
        ctas={[
          { text: "Read the Docs", href: "/developers", primary: true },
          { text: "Read the Litepaper", href: "/whitepaper#rwa" },
        ]}
      />
    </div>
  );
}
