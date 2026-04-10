"use client";

import { Vote, ArrowLeftRight, Building } from "lucide-react";
import BlurFade from "@/components/ui/blur-fade";
import SpotlightCard from "@/components/ui/spotlight-card";

const features = [
  {
    title: "Democracy Meets Performance",
    subtitle: "DPoS Consensus",
    description:
      "Daily elections, 27 Quarry Miners, community-voted governance, and energy-efficient block production.",
    icon: Vote,
    large: true,
    color: "text-qc-blue",
    bgColor: "bg-qc-blue/10",
    spotlightColor: "rgba(59, 130, 246, 0.08)",
  },
  {
    title: "Trade Without Trust Issues",
    subtitle: "QuarrySwap DEX",
    description:
      "Self-custodial trading with AMM liquidity pools, QLP tokens, and AI-powered smart contract auditing.",
    icon: ArrowLeftRight,
    large: false,
    color: "text-qc-green",
    bgColor: "bg-qc-green/10",
    spotlightColor: "rgba(34, 197, 94, 0.08)",
  },
  {
    title: "Tokenize Anything. Trade Everything.",
    subtitle: "Real-World Assets",
    description:
      "Fractionalization, continuous trading, faster execution, and cost efficiency for real-world assets on-chain.",
    icon: Building,
    large: false,
    color: "text-qc-red",
    bgColor: "bg-qc-red/10",
    spotlightColor: "rgba(239, 68, 68, 0.08)",
  },
];

export default function Features() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <BlurFade>
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest text-qc-teal mb-4">
              Core Features
            </p>
            <h2 className="text-3xl md:text-5xl font-bold font-display text-text-primary">
              Built Different
            </h2>
          </div>
        </BlurFade>

        {/* Bento grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {features.map((feature, i) => (
            <BlurFade key={feature.title} delay={0.1 + i * 0.1}>
              <SpotlightCard
                className={feature.large ? "md:row-span-2" : ""}
                spotlightColor={feature.spotlightColor}
              >
                <div className="p-8 h-full">
                  <div className={`mb-4 inline-flex items-center justify-center rounded-lg ${feature.bgColor} p-3`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <p className="text-xs uppercase tracking-widest text-text-muted mb-2">
                    {feature.subtitle}
                  </p>
                  <h3 className="text-xl md:text-2xl font-bold font-display text-text-primary mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </SpotlightCard>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
