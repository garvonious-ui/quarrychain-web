"use client";

import { Lock } from "lucide-react";
import BlurFade from "@/components/ui/blur-fade";
import SpotlightCard from "@/components/ui/spotlight-card";
import { TOKENOMICS_DETAILS } from "@/lib/constants";

/**
 * Detailed allocation breakdown — one SpotlightCard per slice, with
 * the percentage pill, description, and vesting terms.
 */
export default function AllocationBreakdown() {
  return (
    <div className="space-y-4">
      {TOKENOMICS_DETAILS.map((item, i) => (
        <BlurFade key={item.name} delay={0.05 + i * 0.05}>
          <SpotlightCard spotlightColor={`${item.color}12`}>
            <div className="p-6 flex flex-col md:flex-row gap-6">
              <div
                className="w-1 md:w-1.5 rounded-full shrink-0 self-stretch"
                style={{ backgroundColor: item.color }}
              />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold font-display text-text-primary">
                    {item.name}
                  </h3>
                  <span
                    className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      color: item.color,
                      backgroundColor: `${item.color}15`,
                    }}
                  >
                    {item.percentage}% &middot; {item.tokens}
                  </span>
                </div>
                <p className="text-text-secondary mb-3">{item.description}</p>
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-text-muted" />
                  <span className="text-xs text-text-muted font-mono">
                    {item.vesting}
                  </span>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </BlurFade>
      ))}
    </div>
  );
}
