"use client";

import PageHero from "@/components/layout/PageHero";
import PageCTA from "@/components/layout/PageCTA";
import BlurFade from "@/components/ui/blur-fade";
import NumberTicker from "@/components/ui/number-ticker";

const HIGHLIGHTS = [
  "Layer 1 DPoS blockchain — 100,000 TPS, 3-second finality",
  "27 Quarry Miners elected every 6 hours by community vote",
  "QVM is fully EVM-compatible — Solidity contracts work natively",
  "QRC-10 (system tokens) and QRC-20 (smart contract tokens, ERC-20 compatible)",
  "QuarrySwap: built-in non-custodial DEX with AMM and yield farming",
  "Total supply: 200M QRY — seed round at $0.25/token",
];

const TOC = [
  "Introduction",
  "What is a Blockchain?",
  "QuarryChain Architecture",
  "Account Data Structure",
  "Consensus: Delegated Proof of Stake",
  "Quarry Miners & Governance",
  "Tokenomics & Distribution",
  "QuarrySwap & Liquidity Pools",
  "Yield Farming",
  "Real-World Asset Tokenization",
  "Roadmap",
];

export default function WhitepaperPage() {
  return (
    <div className="pt-16">
      <PageHero
        label="Whitepaper"
        headline="QuarryChain Whitepaper"
        subheadline="81 pages covering architecture, consensus, tokenomics, and the full technical specification."
        shape="tetrahedron"
        ctas={[
          { text: "Download PDF", href: "/quarrychain-whitepaper-v2.pdf", primary: true },
          { text: "View Online", href: "/quarrychain-whitepaper-v2.pdf" },
        ]}
      />

      {/* Page counter animation */}
      <section className="pb-16 px-4">
        <div className="text-center">
          <BlurFade>
            <p className="text-6xl font-bold font-display text-text-primary">
              <NumberTicker value={81} duration={2.5} />
            </p>
            <p className="text-sm text-text-muted font-mono uppercase tracking-widest mt-2">pages of technical specification</p>
          </BlurFade>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <BlurFade>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-12">Key highlights</h2>
          </BlurFade>

          <div className="space-y-4">
            {HIGHLIGHTS.map((item, i) => (
              <BlurFade key={i} delay={0.05 + i * 0.05}>
                <div className="flex items-start gap-4">
                  <span className="text-qc-teal font-mono text-sm mt-0.5 shrink-0">0{i + 1}</span>
                  <p className="text-text-secondary text-lg">{item}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <BlurFade>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-12">What&apos;s inside</h2>
          </BlurFade>

          <div className="border-l border-white/10 pl-6 space-y-4">
            {TOC.map((section, i) => (
              <BlurFade key={i} delay={0.03 + i * 0.03}>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-text-muted font-mono w-6">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-text-secondary">{section}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <PageCTA
        headline="Read the full specification."
        ctas={[
          { text: "Download PDF", href: "/quarrychain-whitepaper-v2.pdf", primary: true },
          { text: "Back to Home", href: "/" },
        ]}
      />
    </div>
  );
}
