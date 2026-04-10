"use client";

import BlurFade from "@/components/ui/blur-fade";
import NumberTicker from "@/components/ui/number-ticker";

export default function ProblemSolution() {
  return (
    <section id="technology" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 mb-16">
          {/* Problem — red accent */}
          <BlurFade delay={0.1}>
            <div>
              <p className="text-sm uppercase tracking-widest text-qc-red mb-4">
                The Problem
              </p>
              <h2 className="text-3xl md:text-5xl font-bold font-display text-text-primary mb-6">
                Current blockchains{" "}
                <span className="text-qc-red/60">
                  hit a wall
                </span>
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Proof of Work wastes energy. Proof of Stake trends toward
                centralization. Both suffer from slow speeds and high fees that
                limit real-world adoption.
              </p>
            </div>
          </BlurFade>

          {/* Solution — green accent */}
          <BlurFade delay={0.2}>
            <div>
              <p className="text-sm uppercase tracking-widest text-qc-green mb-4">
                The Solution
              </p>
              <h2 className="text-3xl md:text-5xl font-bold font-display text-text-primary mb-6">
                QuarryChain{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-qc-green to-qc-teal">
                  removes the ceiling
                </span>
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Delegated Proof of Stake delivers blazing speed, minimal cost,
                democratic governance, and energy efficiency — without
                compromise.
              </p>
            </div>
          </BlurFade>
        </div>

        {/* Animated stat bar — alternating color accents */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              value: 100000,
              label: "TPS",
              comparison: "vs Bitcoin 3, ETH 15-30",
              suffix: "",
              color: "text-qc-blue",
            },
            {
              value: 3,
              label: "Block Time",
              comparison: "near-instant finality",
              suffix: "s",
              color: "text-qc-green",
            },
            {
              value: 0.25,
              label: "Transaction Fee",
              comparison: "minimal cost",
              suffix: "%",
              format: { minimumFractionDigits: 2, maximumFractionDigits: 2 },
              color: "text-qc-teal",
            },
            {
              value: 27,
              label: "Quarry Miners",
              comparison: "elected per round",
              suffix: "",
              color: "text-qc-red",
            },
          ].map((stat, i) => (
            <BlurFade key={stat.label} delay={0.3 + i * 0.05}>
              <div className="rounded-xl bg-bg-secondary border border-white/5 p-6 text-center">
                <p className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-1">
                  <NumberTicker
                    value={stat.value}
                    suffix={stat.suffix}
                    formatOptions={stat.format}
                    duration={2}
                    delay={0.5}
                  />
                </p>
                <p className={`text-sm font-medium mb-1 ${stat.color}`}>
                  {stat.label}
                </p>
                <p className="text-xs text-text-muted">{stat.comparison}</p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
