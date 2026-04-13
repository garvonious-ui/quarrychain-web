"use client";

import { useRef } from "react";
import { Lock, Users, Blocks, Trophy } from "lucide-react";
import { useInView } from "framer-motion";
import PageHero from "@/components/layout/PageHero";
import PageCTA from "@/components/layout/PageCTA";
import BlurFade from "@/components/ui/blur-fade";
import SpotlightCard from "@/components/ui/spotlight-card";
import NumberTicker from "@/components/ui/number-ticker";

// ===== DPoS Steps =====

const DPOS_STEPS = [
  {
    step: 1,
    title: "Freeze & Gain Power",
    description: "Stakeholders freeze QRY tokens to gain Quarry Power — the voting weight that determines influence in the network.",
    icon: Lock,
    color: "text-qc-blue",
    bgColor: "bg-qc-blue/10",
    borderColor: "border-qc-blue/30",
  },
  {
    step: 2,
    title: "Vote for Miners",
    description: "Community votes to elect 27 Quarry Miners. Elections run every 6 hours. No insider control, no foundation override.",
    icon: Users,
    color: "text-qc-red",
    bgColor: "bg-qc-red/10",
    borderColor: "border-qc-red/30",
  },
  {
    step: 3,
    title: "Produce Blocks",
    description: "Elected miners produce blocks in 3-second rounds. 100,000 transactions per second. Energy-efficient by design.",
    icon: Blocks,
    color: "text-qc-green",
    bgColor: "bg-qc-green/10",
    borderColor: "border-qc-green/30",
  },
  {
    step: 4,
    title: "Earn Rewards",
    description: "Both voters and miners earn block rewards. Stake more, earn more. The network rewards participation, not hardware.",
    icon: Trophy,
    color: "text-qc-teal",
    bgColor: "bg-qc-teal/10",
    borderColor: "border-qc-teal/30",
  },
];

// ===== Consensus Comparison =====

const COMPARISON = [
  { metric: "TPS", pow: "3-7", pos: "15-30", dpos: "100,000", dposValue: 100000 },
  { metric: "Finality", pow: "60 min", pos: "6 min", dpos: "3 sec", dposValue: 3 },
  { metric: "Energy", pow: "Extreme", pos: "Low", dpos: "Minimal", dposValue: null },
  { metric: "Governance", pow: "None", pos: "Validator-weighted", dpos: "Community-elected", dposValue: null },
  { metric: "Validators", pow: "Miners (expensive)", pos: "Stakers (capital-heavy)", dpos: "27 elected", dposValue: 27 },
];

function ComparisonGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="grid md:grid-cols-3 gap-4">
      {/* PoW Column */}
      <BlurFade delay={0.1}>
        <div className="rounded-xl bg-bg-secondary border border-white/5 p-6">
          <h3 className="text-lg font-bold font-display text-text-primary mb-6">Proof of Work</h3>
          <div className="space-y-6">
            {COMPARISON.map((row) => (
              <div key={`pow-${row.metric}`}>
                <p className="text-xs uppercase tracking-widest text-text-muted font-mono mb-1">{row.metric}</p>
                <p className="text-lg text-text-secondary">{row.pow}</p>
              </div>
            ))}
          </div>
        </div>
      </BlurFade>

      {/* PoS Column */}
      <BlurFade delay={0.2}>
        <div className="rounded-xl bg-bg-secondary border border-white/5 p-6">
          <h3 className="text-lg font-bold font-display text-text-primary mb-6">Proof of Stake</h3>
          <div className="space-y-6">
            {COMPARISON.map((row) => (
              <div key={`pos-${row.metric}`}>
                <p className="text-xs uppercase tracking-widest text-text-muted font-mono mb-1">{row.metric}</p>
                <p className="text-lg text-text-secondary">{row.pos}</p>
              </div>
            ))}
          </div>
        </div>
      </BlurFade>

      {/* DPoS Column — highlighted */}
      <BlurFade delay={0.3}>
        <div className="rounded-xl bg-bg-secondary border border-qc-teal/20 p-6 shadow-[0_0_30px_rgba(20,184,166,0.06)] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-qc-teal/[0.03] to-transparent" />
          <div className="relative">
            <h3 className="text-lg font-bold font-display text-qc-teal mb-6">DPoS (QuarryChain)</h3>
            <div className="space-y-6">
              {COMPARISON.map((row) => (
                <div key={`dpos-${row.metric}`}>
                  <p className="text-xs uppercase tracking-widest text-text-muted font-mono mb-1">{row.metric}</p>
                  <p className={`text-lg font-semibold transition-all duration-700 ${inView ? "text-text-primary" : "text-text-muted"}`}>
                    {row.dposValue !== null && inView ? (
                      <NumberTicker value={row.dposValue} suffix={row.metric === "Finality" ? " sec" : row.metric === "Validators" ? " elected" : ""} duration={2} />
                    ) : (
                      <span className={inView ? "text-qc-teal" : ""}>{row.dpos}</span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </BlurFade>
    </div>
  );
}

// ===== Badges =====

const BADGES = ["EVM Compatible", "Solidity", "Web3.js", "Ethers.js", "MetaMask", "Hardhat", "Remix"];

export default function TechnologyPage() {
  return (
    <div className="pt-16">
      <PageHero
        label="Technology"
        headline="How QuarryChain works."
        subheadline="Delegated Proof of Stake. EVM-compatible. Built for scale."
      />

      {/* DPoS Consensus */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <BlurFade>
            <p className="text-xs uppercase tracking-widest text-qc-teal font-mono mb-4">Consensus</p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-16">Delegated Proof of Stake</h2>
          </BlurFade>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-qc-teal/40 via-qc-blue/20 to-transparent hidden md:block" />

            <div className="space-y-12">
              {DPOS_STEPS.map((step, i) => (
                <BlurFade key={step.step} delay={0.1 + i * 0.1}>
                  <div className="flex gap-6 md:gap-10 items-start">
                    <div className={`shrink-0 w-12 h-12 rounded-full ${step.bgColor} flex items-center justify-center border ${step.borderColor} relative z-10`}>
                      <step.icon className={`w-5 h-5 ${step.color}`} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-text-muted font-mono mb-1">Step {step.step}</p>
                      <h3 className="text-xl font-bold font-display text-text-primary mb-2">{step.title}</h3>
                      <p className="text-text-secondary max-w-lg">{step.description}</p>
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Consensus Comparison */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <BlurFade>
            <p className="text-xs uppercase tracking-widest text-qc-blue font-mono mb-4">Comparison</p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-4">Why DPoS wins.</h2>
            <p className="text-text-secondary text-lg mb-16 max-w-2xl">Side-by-side with PoW and PoS — QuarryChain&apos;s Delegated Proof of Stake delivers on every metric.</p>
          </BlurFade>
          <ComparisonGrid />
        </div>
      </section>

      {/* QVM Architecture */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <BlurFade>
            <p className="text-xs uppercase tracking-widest text-qc-teal font-mono mb-4">Virtual Machine</p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-4">QuarryChain Virtual Machine</h2>
            <p className="text-text-secondary text-lg mb-8 max-w-2xl">
              Lightweight, Turing-complete VM built for the QuarryChain ecosystem. Fully EVM-compatible — deploy existing Solidity contracts with zero modifications. Connects seamlessly with Web3.js, Ethers.js, Hardhat, and Remix.
            </p>
          </BlurFade>
          <BlurFade delay={0.1}>
            <div className="flex flex-wrap gap-2">
              {BADGES.map((badge) => (
                <span key={badge} className="px-3.5 py-1.5 rounded-full text-xs font-medium text-qc-teal bg-[rgba(20,184,166,0.08)] border border-[rgba(20,184,166,0.15)] font-mono">
                  {badge}
                </span>
              ))}
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Token Standards */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <BlurFade>
            <p className="text-xs uppercase tracking-widest text-qc-blue font-mono mb-4">Token Standards</p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-16">Two standards. Full compatibility.</h2>
          </BlurFade>

          <div className="grid md:grid-cols-2 gap-4">
            <BlurFade delay={0.1}>
              <SpotlightCard spotlightColor="rgba(59, 130, 246, 0.08)">
                <div className="p-8">
                  <p className="text-xs uppercase tracking-widest text-text-muted font-mono mb-2">QRC-10</p>
                  <h3 className="text-xl font-bold font-display text-text-primary mb-3">System Tokens</h3>
                  <p className="text-text-secondary">System-level tokens for bandwidth and energy on the QuarryChain network. Native to the protocol layer.</p>
                </div>
              </SpotlightCard>
            </BlurFade>

            <BlurFade delay={0.2}>
              <SpotlightCard spotlightColor="rgba(20, 184, 166, 0.08)">
                <div className="p-8">
                  <p className="text-xs uppercase tracking-widest text-text-muted font-mono mb-2">QRC-20</p>
                  <h3 className="text-xl font-bold font-display text-text-primary mb-3">Smart Contract Tokens</h3>
                  <p className="text-text-secondary">Fully ERC-20 compatible. Launch tokens using the standard developers already know.</p>
                </div>
              </SpotlightCard>
            </BlurFade>
          </div>
        </div>
      </section>

      <PageCTA
        headline="Start building on QuarryChain."
        ctas={[
          { text: "Read the Docs", href: "/developers", primary: true },
          { text: "View Whitepaper", href: "/whitepaper" },
        ]}
      />
    </div>
  );
}
