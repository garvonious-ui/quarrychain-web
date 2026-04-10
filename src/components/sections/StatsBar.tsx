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
    formatOptions: { minimumFractionDigits: 2, maximumFractionDigits: 2 } as Intl.NumberFormatOptions,
  },
  {
    value: 27,
    label: "Validators",
    suffix: "",
    formatOptions: {} as Intl.NumberFormatOptions,
  },
  {
    value: null,
    label: "Compatible",
    static: "EVM",
  },
] as const;

export default function StatsBar() {
  return (
    <section className="border-y border-white/[0.04] bg-bg-secondary">
      <div className="mx-auto max-w-[1000px] px-6 py-10">
        <BlurFade>
          {/* Desktop: 5-col. Mobile: 3 top + 2 bottom centered */}
          <div className="grid grid-cols-3 md:grid-cols-5 gap-y-8 gap-x-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`text-center ${
                  i >= 3
                    ? "hidden md:block"
                    : ""
                }`}
              >
                <StatValue stat={stat} />
                <p className="text-xs uppercase tracking-widest text-text-muted font-mono mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
            {/* Last 2 on mobile — centered 2-col below the 3 */}
            {stats.slice(3).map((stat) => (
              <div
                key={`mobile-${stat.label}`}
                className="text-center md:hidden col-span-1 first:col-start-1 last:col-start-3"
              >
                <StatValue stat={stat} />
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

function StatValue({ stat }: { stat: (typeof stats)[number] }) {
  return (
    <p className="text-3xl font-bold text-text-primary font-display">
      {"static" in stat ? (
        stat.static
      ) : (
        <NumberTicker
          value={stat.value}
          suffix={stat.suffix}
          formatOptions={stat.formatOptions}
          duration={1.5}
        />
      )}
    </p>
  );
}
