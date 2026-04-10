"use client";

import BlurFade from "@/components/ui/blur-fade";
import NumberTicker from "@/components/ui/number-ticker";

const GOVERNANCE_STATS = [
  { value: 6, suffix: "hr", label: "Voting rounds" },
  { value: 1, suffix: " QRY", label: "Minimum stake to vote" },
  { value: 100, suffix: "%", label: "Community-elected" },
];

function NodeRing() {
  const totalNodes = 27;
  const activeIndices = [3, 11, 22]; // 3 highlighted nodes
  const radius = 150;

  return (
    <div className="relative w-[340px] h-[340px] mx-auto">
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full border border-[rgba(20,184,166,0.15)] shadow-[0_0_30px_rgba(20,184,166,0.05)]" />

      {/* Rotating dot container */}
      <div
        className="absolute inset-0 motion-safe:animate-[spin_60s_linear_infinite]"
      >
        {Array.from({ length: totalNodes }).map((_, i) => {
          const angle = (i / totalNodes) * 2 * Math.PI - Math.PI / 2;
          const x = 170 + radius * Math.cos(angle);
          const y = 170 + radius * Math.sin(angle);
          const isActive = activeIndices.includes(i);

          return (
            <div
              key={i}
              className="absolute w-3 h-3 -translate-x-1.5 -translate-y-1.5"
              style={{ left: x, top: y }}
            >
              <div
                className={`w-full h-full rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-qc-teal shadow-[0_0_12px_rgba(20,184,166,0.6)]"
                    : "bg-[rgba(20,184,166,0.3)]"
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl font-bold font-display text-text-primary">
            27
          </p>
          <p className="text-xs uppercase tracking-widest text-text-muted mt-1">
            Quarry Miners
          </p>
        </div>
      </div>
    </div>
  );
}

export default function GovernancePreview() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <BlurFade>
          <p className="text-xs uppercase tracking-widest text-qc-teal font-mono mb-4">
            Governance
          </p>
        </BlurFade>

        <BlurFade delay={0.05}>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-text-primary mb-4">
            Decentralized by design.
          </h2>
        </BlurFade>

        <BlurFade delay={0.1}>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-16">
            27 Quarry Miners are elected every 6 hours by QRY stakers. No
            foundation override. No insider control.
          </p>
        </BlurFade>

        {/* Node visualization */}
        <BlurFade delay={0.15}>
          <NodeRing />
        </BlurFade>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto mt-16">
          {GOVERNANCE_STATS.map((stat, i) => (
            <BlurFade key={stat.label} delay={0.2 + i * 0.05}>
              <div className="p-6 bg-bg-secondary rounded-xl border border-white/5">
                <p className="text-2xl font-bold font-display text-text-primary">
                  <NumberTicker
                    value={stat.value}
                    suffix={stat.suffix}
                    duration={1.5}
                  />
                </p>
                <p className="text-sm text-text-muted mt-1">{stat.label}</p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
