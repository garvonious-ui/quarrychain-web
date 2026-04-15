"use client";

import { TrendingUp } from "lucide-react";
import BlurFade from "@/components/ui/blur-fade";
import SpotlightCard from "@/components/ui/spotlight-card";
import NumberTicker from "@/components/ui/number-ticker";
import { STAKING_TIERS } from "@/lib/constants";

/**
 * 4-tier staking rewards grid (Bronze / Silver / Gold / Diamond)
 * with animated APR counters and 30-day reward estimates.
 */
export default function StakingRewards() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {STAKING_TIERS.map((tier, i) => (
        <BlurFade key={tier.tier} delay={0.1 + i * 0.08}>
          <SpotlightCard spotlightColor={`${tier.color}15`}>
            <div className="p-6 text-center">
              <div
                className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: `${tier.color}15` }}
              >
                <TrendingUp className="w-5 h-5" style={{ color: tier.color }} />
              </div>
              <h3 className="text-lg font-bold font-display text-text-primary mb-1">
                {tier.tier}
              </h3>
              <p className="text-xs text-text-muted font-mono mb-4">
                {tier.minStake}
              </p>
              <p
                className="text-3xl font-bold font-display mb-1"
                style={{ color: tier.color }}
              >
                <NumberTicker value={tier.apr} suffix="%" duration={1.5} />
              </p>
              <p className="text-xs text-text-muted">APR</p>
              <div className="mt-4 pt-4 border-t border-white/5">
                <p className="text-xs text-text-muted">Est. 30-day reward</p>
                <p className="text-sm font-mono text-text-secondary mt-1">
                  {tier.reward30d}
                </p>
              </div>
            </div>
          </SpotlightCard>
        </BlurFade>
      ))}
    </div>
  );
}
