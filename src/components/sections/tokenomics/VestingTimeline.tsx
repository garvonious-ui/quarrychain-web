"use client";

import BlurFade from "@/components/ui/blur-fade";
import { TOKENOMICS_DETAILS } from "@/lib/constants";

const MILESTONES = [
  { label: "TGE", month: "M0", desc: "40% public sale unlocked" },
  { label: "Cliff", month: "M6", desc: "Private round begins vesting" },
  { label: "Team unlock", month: "M12", desc: "Team tokens begin vesting" },
  { label: "Fully vested", month: "M48", desc: "100% circulating supply" },
];

/**
 * Vesting timeline — milestone pills + per-allocation progress bars
 * showing vesting duration relative to the 48-month total.
 */
export default function VestingTimeline() {
  return (
    <div className="rounded-xl bg-bg-secondary border border-white/5 p-6">
      {/* Milestone pills */}
      <div className="flex flex-wrap gap-3 mb-8">
        {MILESTONES.map((milestone) => (
          <div
            key={milestone.label}
            className="px-3 py-1.5 rounded-full text-xs font-mono bg-qc-teal/8 border border-qc-teal/15 text-qc-teal"
          >
            {milestone.month} &middot; {milestone.label}
          </div>
        ))}
      </div>

      {/* Vesting progress bars */}
      <div className="space-y-4">
        {TOKENOMICS_DETAILS.map((item, i) => (
          <BlurFade key={item.name} delay={0.15 + i * 0.05}>
            <div>
              <div className="flex justify-between mb-1.5">
                <span className="text-sm text-text-secondary">{item.name}</span>
                <span className="text-xs font-mono text-text-muted">
                  {item.vestingMonths} months
                </span>
              </div>
              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${(item.vestingMonths / 48) * 100}%`,
                    backgroundColor: item.color,
                    opacity: 0.7,
                  }}
                />
              </div>
            </div>
          </BlurFade>
        ))}
      </div>
    </div>
  );
}
