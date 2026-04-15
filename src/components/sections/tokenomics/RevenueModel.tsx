"use client";

import { ArrowLeftRight, FileCode, Building, Coins } from "lucide-react";
import BlurFade from "@/components/ui/blur-fade";
import SpotlightCard from "@/components/ui/spotlight-card";
import { REVENUE_STREAMS } from "@/lib/constants";

const ICON_MAP: Record<
  string,
  React.ComponentType<{ className?: string; style?: React.CSSProperties }>
> = {
  ArrowLeftRight,
  FileCode,
  Building,
};

/**
 * 3 revenue stream cards + a deflationary-pressure callout box.
 */
export default function RevenueModel() {
  return (
    <>
      <div className="grid md:grid-cols-3 gap-4">
        {REVENUE_STREAMS.map((stream, i) => {
          const Icon = ICON_MAP[stream.icon] || Coins;
          return (
            <BlurFade key={stream.title} delay={0.1 + i * 0.08}>
              <SpotlightCard spotlightColor={`${stream.color}12`}>
                <div className="p-6">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${stream.color}15` }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: stream.color }}
                    />
                  </div>
                  <h3 className="text-lg font-bold font-display text-text-primary mb-1">
                    {stream.title}
                  </h3>
                  <p
                    className="text-2xl font-bold font-display mb-3"
                    style={{ color: stream.color }}
                  >
                    {stream.rate}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {stream.description}
                  </p>
                </div>
              </SpotlightCard>
            </BlurFade>
          );
        })}
      </div>

      <BlurFade delay={0.4}>
        <div className="mt-8 rounded-xl bg-bg-secondary border border-qc-teal/20 p-6 shadow-[0_0_30px_rgba(20,184,166,0.04)]">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-qc-teal/10 flex items-center justify-center shrink-0">
              <Coins className="w-5 h-5 text-qc-teal" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-text-primary mb-1">
                Deflationary Pressure
              </h4>
              <p className="text-sm text-text-secondary">
                A portion of contract deployment fees are burned permanently,
                reducing total supply over time. As ecosystem activity grows,
                supply decreases — creating natural upward pressure on token value.
              </p>
            </div>
          </div>
        </div>
      </BlurFade>
    </>
  );
}
