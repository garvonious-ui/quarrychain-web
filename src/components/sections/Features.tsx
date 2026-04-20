"use client";

import { Vote, ArrowLeftRight, Building } from "lucide-react";
import BlurFade from "@/components/ui/blur-fade";
import SpotlightCard from "@/components/ui/spotlight-card";

const features = [
  {
    subtitle: "DPoS Consensus",
    description:
      "Community-elected validators. Time-based voting rounds. Energy-efficient block production.",
    icon: Vote,
    large: true,
    color: "text-qc-blue",
    bgColor: "bg-qc-blue/10",
    spotlightColor: "rgba(59, 130, 246, 0.08)",
  },
  {
    subtitle: "QuarrySwap DEX",
    description:
      "Non-custodial AMM with liquidity pools, yield farming, and AI-powered contract auditing.",
    icon: ArrowLeftRight,
    large: false,
    color: "text-qc-green",
    bgColor: "bg-qc-green/10",
    spotlightColor: "rgba(34, 197, 94, 0.08)",
  },
  {
    subtitle: "Real-World Assets",
    description:
      "Tokenize, fractionalize, and trade real-world assets on-chain. 1% commission. Continuous settlement.",
    icon: Building,
    large: false,
    color: "text-qc-red",
    bgColor: "bg-qc-red/10",
    spotlightColor: "rgba(239, 68, 68, 0.08)",
  },
];

export default function Features() {
  return (
    <section id="technology" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 3-col equal grid */}
        <div className="grid md:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <BlurFade key={feature.subtitle} delay={0.1 + i * 0.1}>
              <SpotlightCard
                className="h-full"
                spotlightColor={feature.spotlightColor}
              >
                <div className="p-8 h-full">
                  <div
                    className={`mb-4 inline-flex items-center justify-center rounded-lg ${feature.bgColor} p-3`}
                  >
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <p className="text-xs uppercase tracking-widest text-text-muted mb-2">
                    {feature.subtitle}
                  </p>
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
