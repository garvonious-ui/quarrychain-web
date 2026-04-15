"use client";

import { useState, useCallback } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import BlurFade from "@/components/ui/blur-fade";
import { TOKENOMICS } from "@/lib/constants";

const pieData = TOKENOMICS.allocation.map((item) => ({
  name: item.name,
  value: item.percentage,
  color: item.color,
}));

/**
 * Donut chart of QRY allocation + interactive side panel.
 *
 * Hovering a slice (or a legend row) highlights it and updates the
 * center label. Used by both /tokenomics and /whitepaper §9.
 */
export default function TokenAllocationChart() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onPieEnter = useCallback((_: unknown, index: number) => {
    setActiveIndex(index);
  }, []);

  const onPieLeave = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const activeItem = activeIndex !== null ? pieData[activeIndex] : null;

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <BlurFade delay={0.1}>
        <div className="h-[460px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={110}
                outerRadius={190}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
                style={{ cursor: "pointer" }}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    opacity={activeIndex !== null && activeIndex !== index ? 0.35 : 1}
                    stroke={activeIndex === index ? entry.color : "none"}
                    strokeWidth={activeIndex === index ? 2 : 0}
                    style={{
                      transition:
                        "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), filter 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                      filter:
                        activeIndex === index
                          ? `drop-shadow(0 0 16px ${entry.color}60)`
                          : "none",
                    }}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center transition-all duration-500 ease-out">
              {activeItem ? (
                <>
                  <p
                    className="text-4xl font-bold font-display transition-colors duration-500 ease-out"
                    style={{ color: activeItem.color }}
                  >
                    {activeItem.value}%
                  </p>
                  <p className="text-sm text-text-secondary max-w-[140px] leading-tight mt-1">
                    {activeItem.name}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-3xl font-bold font-display text-text-primary">
                    200M
                  </p>
                  <p className="text-sm text-text-muted mt-1">QRY Total</p>
                </>
              )}
            </div>
          </div>
        </div>
      </BlurFade>

      <BlurFade delay={0.2}>
        <div>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[
              { label: "Total Supply", value: "200,000,000 QRY" },
              { label: "Seed Price", value: "$0.25" },
              { label: "Symbol", value: "QRY" },
              { label: "Decimals", value: "18" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl bg-bg-secondary border border-white/5 p-4"
              >
                <p className="text-sm text-text-muted">{item.label}</p>
                <p className="text-lg font-bold font-display text-text-primary">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            {TOKENOMICS.allocation.map((item, i) => (
              <div
                key={item.name}
                className="flex items-center gap-3 cursor-pointer rounded-lg px-3 py-2 -mx-3 transition-colors hover:bg-white/5"
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <span
                  className="w-3 h-3 rounded-full shrink-0 transition-transform duration-500 ease-out"
                  style={{
                    backgroundColor: item.color,
                    transform: activeIndex === i ? "scale(1.4)" : "scale(1)",
                  }}
                />
                <span
                  className="text-sm flex-1 transition-colors duration-500 ease-out"
                  style={{
                    color: activeIndex === i ? "#f1f5f9" : "#94a3b8",
                  }}
                >
                  {item.name}
                </span>
                <span className="text-sm font-mono text-text-primary">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </BlurFade>
    </div>
  );
}
