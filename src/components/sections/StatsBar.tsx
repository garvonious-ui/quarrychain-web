"use client";

import BlurFade from "@/components/ui/blur-fade";
import NumberTicker from "@/components/ui/number-ticker";

const stats = [
  {
    value: 100000,
    label: "TPS",
    suffix: "",
    formatOptions: { useGrouping: true } as Intl.NumberFormatOptions,
  },
  {
    value: 3,
    label: "Finality",
    suffix: "s",
    formatOptions: {} as Intl.NumberFormatOptions,
  },
  {
    value: 0.25,
    label: "Fees",
    suffix: "%",
    formatOptions: {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    } as Intl.NumberFormatOptions,
  },
  {
    value: 27,
    label: "Validators",
    suffix: "",
    formatOptions: {} as Intl.NumberFormatOptions,
  },
  {
    staticText: "EVM",
    label: "Compatible",
  },
] as const;

type NumericStat = { value: number; label: string; suffix: string; formatOptions: Intl.NumberFormatOptions };
type StaticStat = { staticText: string; label: string };
type Stat = NumericStat | StaticStat;

export default function StatsBar() {
  return (
    <section className="border-y border-white/[0.04] bg-bg-secondary">
      <div className="mx-auto max-w-[1000px] px-6 py-10">
        <BlurFade>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 sm:gap-x-16 md:gap-x-8 md:flex-nowrap">
            {(stats as readonly Stat[]).map((stat) => (
              <div key={stat.label} className="text-center min-w-[80px]">
                <p className="text-2xl sm:text-3xl font-bold text-text-primary font-display">
                  {"staticText" in stat ? (
                    stat.staticText
                  ) : (
                    <NumberTicker
                      value={stat.value}
                      suffix={stat.suffix}
                      formatOptions={stat.formatOptions}
                      duration={1.5}
                    />
                  )}
                </p>
                <p className="text-xs uppercase tracking-widest text-text-muted font-mono mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
