"use client";

import BlurFade from "@/components/ui/blur-fade";
import NumberTicker from "@/components/ui/number-ticker";

type GovernanceStat =
  | { value: number; suffix: string; label: string; display?: never }
  | { display: string; label: string; value?: never; suffix?: never };

const GOVERNANCE_STATS: GovernanceStat[] = [
  { display: "Time-Based", label: "Voting model" },
  { value: 1, suffix: " QRY", label: "Minimum stake to vote" },
  { value: 100, suffix: "%", label: "Community-elected" },
];

// Each node gets a color from the brand palette
const NODE_COLORS = [
  { color: "#14b8a6", glow: "rgba(20,184,166,0.6)" },   // teal
  { color: "#3b82f6", glow: "rgba(59,130,246,0.6)" },    // blue
  { color: "#22c55e", glow: "rgba(34,197,94,0.6)" },     // green
  { color: "#ef4444", glow: "rgba(239,68,68,0.6)" },     // red
];

function NodeRing() {
  const totalNodes = 27;
  const radius = 150;

  // Groups of active nodes — simulates blocks being produced across the network
  const activeIndices = [0, 1, 2, 7, 8, 13, 14, 15, 20, 21, 25, 26];

  // Assign colors to active nodes in rotation
  const getNodeStyle = (i: number) => {
    if (!activeIndices.includes(i)) {
      return { bg: "rgba(71,85,105,0.25)", shadow: "none" }; // muted gray
    }
    const colorIndex = activeIndices.indexOf(i) % NODE_COLORS.length;
    const nc = NODE_COLORS[colorIndex];
    return { bg: nc.color, shadow: `0 0 12px ${nc.glow}` };
  };

  // Draw connection lines between clustered active nodes
  const getNodePos = (i: number) => {
    const angle = (i / totalNodes) * 2 * Math.PI - Math.PI / 2;
    return {
      x: 170 + radius * Math.cos(angle),
      y: 170 + radius * Math.sin(angle),
    };
  };

  // Connection pairs (clusters of adjacent active nodes)
  const connections = [
    [0, 1], [1, 2],
    [7, 8],
    [13, 14], [14, 15],
    [20, 21],
    [25, 26],
  ];

  return (
    <div className="relative w-[340px] h-[340px] mx-auto">
      {/* Outer ring with gradient */}
      <div className="absolute inset-0 rounded-full border border-[rgba(20,184,166,0.12)]" />

      {/* Second subtle ring */}
      <div className="absolute inset-3 rounded-full border border-[rgba(59,130,246,0.06)]" />

      {/* Connection lines SVG */}
      <svg className="absolute inset-0 w-full h-full motion-safe:animate-[spin_60s_linear_infinite]" viewBox="0 0 340 340">
        {connections.map(([a, b]) => {
          const posA = getNodePos(a);
          const posB = getNodePos(b);
          const colorIndex = activeIndices.indexOf(a) % NODE_COLORS.length;
          return (
            <line
              key={`${a}-${b}`}
              x1={posA.x} y1={posA.y}
              x2={posB.x} y2={posB.y}
              stroke={NODE_COLORS[colorIndex].color}
              strokeOpacity={0.2}
              strokeWidth={1}
            />
          );
        })}
      </svg>

      {/* Rotating dot container */}
      <div className="absolute inset-0 motion-safe:animate-[spin_60s_linear_infinite]">
        {Array.from({ length: totalNodes }).map((_, i) => {
          const angle = (i / totalNodes) * 2 * Math.PI - Math.PI / 2;
          const x = 170 + radius * Math.cos(angle);
          const y = 170 + radius * Math.sin(angle);
          const isActive = activeIndices.includes(i);
          const style = getNodeStyle(i);

          return (
            <div
              key={i}
              className="absolute -translate-x-1.5 -translate-y-1.5"
              style={{
                left: x,
                top: y,
                width: isActive ? 14 : 10,
                height: isActive ? 14 : 10,
                marginLeft: isActive ? -1 : 0,
                marginTop: isActive ? -1 : 0,
              }}
            >
              <div
                className={`w-full h-full rounded-full transition-all duration-300 ${
                  isActive ? "motion-safe:animate-pulse" : ""
                }`}
                style={{
                  backgroundColor: style.bg,
                  boxShadow: style.shadow,
                  animationDelay: isActive ? `${(activeIndices.indexOf(i) * 200)}ms` : undefined,
                  animationDuration: isActive ? "2s" : undefined,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-qc-teal to-qc-blue">
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-qc-green to-qc-teal">Decentralized</span> by design.
          </h2>
        </BlurFade>

        <BlurFade delay={0.1}>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-16">
            27 Quarry Miners are elected by QRY stakers through time-based
            voting. No foundation override. No insider control.
          </p>
        </BlurFade>

        {/* Node visualization */}
        <BlurFade delay={0.15}>
          <NodeRing />
        </BlurFade>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto mt-16">
          {GOVERNANCE_STATS.map((stat, i) => {
            const colors = ["border-qc-teal/20", "border-qc-blue/20", "border-qc-green/20"];
            const textColors = ["text-qc-teal", "text-qc-blue", "text-qc-green"];
            return (
              <BlurFade key={stat.label} delay={0.2 + i * 0.05}>
                <div className={`p-6 bg-bg-secondary rounded-xl border ${colors[i]}`}>
                  <p className={`text-2xl font-bold font-display ${textColors[i]}`}>
                    {stat.display !== undefined ? (
                      stat.display
                    ) : (
                      <NumberTicker
                        value={stat.value}
                        suffix={stat.suffix}
                        duration={1.5}
                      />
                    )}
                  </p>
                  <p className="text-sm text-text-muted mt-1">{stat.label}</p>
                </div>
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}
