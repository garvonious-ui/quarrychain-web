"use client";

import {
  Wallet,
  ArrowLeftRight,
  Search,
  Cpu,
  Coins,
  Building,
} from "lucide-react";
import { ECOSYSTEM } from "@/lib/constants";
import BlurFade from "@/components/ui/blur-fade";
import SpotlightCard from "@/components/ui/spotlight-card";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Wallet,
  ArrowLeftRight,
  Search,
  Cpu,
  Coins,
  Building,
};

// Cycle through brand colors for each card
const cardColors = [
  { color: "text-qc-blue", spotlight: "rgba(59, 130, 246, 0.08)" },
  { color: "text-qc-green", spotlight: "rgba(34, 197, 94, 0.08)" },
  { color: "text-qc-red", spotlight: "rgba(239, 68, 68, 0.08)" },
  { color: "text-qc-teal", spotlight: "rgba(20, 184, 166, 0.08)" },
  { color: "text-qc-blue", spotlight: "rgba(59, 130, 246, 0.08)" },
  { color: "text-qc-green", spotlight: "rgba(34, 197, 94, 0.08)" },
];

export default function Ecosystem() {
  return (
    <section id="ecosystem" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <BlurFade>
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest text-qc-blue mb-4">
              Ecosystem
            </p>
            <h2 className="text-3xl md:text-5xl font-bold font-display text-text-primary">
              One Network. Infinite Possibilities.
            </h2>
          </div>
        </BlurFade>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ECOSYSTEM.map((item, i) => {
            const Icon = iconMap[item.icon];
            const colors = cardColors[i];
            return (
              <BlurFade key={item.name} delay={0.05 + i * 0.05}>
                <SpotlightCard
                  className="cursor-pointer h-full"
                  spotlightColor={colors.spotlight}
                >
                  <div className="p-6">
                    <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-white/5 p-3">
                      {Icon && (
                        <Icon className={`w-6 h-6 ${colors.color}`} />
                      )}
                    </div>
                    <h3 className="text-lg font-bold font-display text-text-primary mb-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {item.tagline}
                    </p>
                  </div>
                </SpotlightCard>
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}
