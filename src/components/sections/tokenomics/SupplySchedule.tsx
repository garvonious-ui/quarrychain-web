"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import BlurFade from "@/components/ui/blur-fade";
import { VESTING_SCHEDULE } from "@/lib/constants";

// Cumulative tokens unlocked (in millions). Slice sizes from deck slide 14:
// Public 100M, Staking 40M, Team 40M, Angel Investors 20M.
const supplyData = VESTING_SCHEDULE.map((point) => {
  const publicSale = (100 * point.publicSale) / 100;
  const staking = (40 * point.staking) / 100;
  const team = (40 * point.team) / 100;
  const angel = (20 * point.angelInvestors) / 100;
  return {
    month: `M${point.month}`,
    "Public Sale": publicSale,
    Staking: staking,
    Team: team,
    "Angel Investors": angel,
    total: publicSale + staking + team + angel,
  };
});

const SERIES = [
  { key: "Public Sale", color: "#3b82f6", gradId: "litepaper-colorPublic" },
  { key: "Staking", color: "#14b8a6", gradId: "litepaper-colorStaking" },
  { key: "Team", color: "#22c55e", gradId: "litepaper-colorTeam" },
  { key: "Angel Investors", color: "#ef4444", gradId: "litepaper-colorAngel" },
];

/**
 * Stacked area chart showing cumulative QRY supply unlocked over 48 months.
 * Lazy-renders when the chart enters the viewport so the AreaChart animates
 * on first scroll.
 */
export default function SupplySchedule() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <BlurFade>
      <div ref={ref} className="rounded-xl bg-bg-secondary border border-white/5 p-6">
        <div className="h-[400px]">
          {inView && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={supplyData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  {SERIES.map((s) => (
                    <linearGradient
                      key={s.gradId}
                      id={s.gradId}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor={s.color} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={s.color} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#475569", fontSize: 12 }}
                  axisLine={{ stroke: "rgba(255,255,255,0.05)" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#475569", fontSize: 12 }}
                  axisLine={{ stroke: "rgba(255,255,255,0.05)" }}
                  tickLine={false}
                  tickFormatter={(v) => `${v}M`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f1019",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "#f1f5f9",
                    fontSize: "12px",
                  }}
                  formatter={(value) => [`${Number(value).toFixed(1)}M QRY`]}
                />
                {SERIES.map((s) => (
                  <Area
                    key={s.key}
                    type="monotone"
                    dataKey={s.key}
                    stackId="1"
                    stroke={s.color}
                    fill={`url(#${s.gradId})`}
                    strokeWidth={2}
                  />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {SERIES.map((s) => (
            <div key={s.key} className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: s.color }}
              />
              <span className="text-xs text-text-muted">{s.key}</span>
            </div>
          ))}
        </div>
      </div>
    </BlurFade>
  );
}
