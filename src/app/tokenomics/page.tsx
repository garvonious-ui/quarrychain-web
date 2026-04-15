"use client";

import { useState, useCallback, useRef } from "react";
import { useInView } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  Zap,
  Vote,
  Pickaxe,
  Code,
  Building,
  ArrowLeftRight,
  FileCode,
  TrendingUp,
  Lock,
  Coins,
} from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import PageCTA from "@/components/layout/PageCTA";
import BlurFade from "@/components/ui/blur-fade";
import SpotlightCard from "@/components/ui/spotlight-card";
import NumberTicker from "@/components/ui/number-ticker";
import {
  TOKENOMICS,
  TOKENOMICS_DETAILS,
  TOKEN_UTILITY,
  VESTING_SCHEDULE,
  STAKING_TIERS,
  REVENUE_STREAMS,
} from "@/lib/constants";

// ===== Icon map =====

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Zap,
  Vote,
  Pickaxe,
  Code,
  Building,
  ArrowLeftRight,
  FileCode,
};

// ===== Chart data =====

const pieData = TOKENOMICS.allocation.map((item) => ({
  name: item.name,
  value: item.percentage,
  color: item.color,
}));

// Supply schedule — cumulative tokens unlocked (in millions)
const supplyData = VESTING_SCHEDULE.map((point) => {
  const publicSale = (60 * point.publicSale) / 100;
  const staking = (40 * point.staking) / 100;
  const team = (40 * point.team) / 100;
  const ecosystem = (30 * point.ecosystem) / 100;
  const privateRound = (30 * point.privateRound) / 100;
  return {
    month: `M${point.month}`,
    "Public Sale": publicSale,
    "Staking": staking,
    "Team": team,
    "Ecosystem": ecosystem,
    "Private": privateRound,
    total: publicSale + staking + team + ecosystem + privateRound,
  };
});

// ===== Donut Chart Section =====

function TokenAllocationChart() {
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
                      transition: "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), filter 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                      filter: activeIndex === index ? `drop-shadow(0 0 16px ${entry.color}60)` : "none",
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
                  <p className="text-3xl font-bold font-display text-text-primary">200M</p>
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
                  style={{ color: activeIndex === i ? "#f1f5f9" : "#94a3b8" }}
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

// ===== Main Page =====

export default function TokenomicsPage() {
  const supplyRef = useRef<HTMLDivElement>(null);
  const supplyInView = useInView(supplyRef, { once: true, margin: "-100px" });

  return (
    <div className="pt-16">
      <PageHero
        label="Tokenomics"
        headline="Quarry Coin (QRY)"
        subheadline="200 million tokens. Transparent allocation. Built-in deflation."
        shape="sphere"
        shapeColors={{ primary: "#a855f7", secondary: "#14b8a6", tertiary: "#3b82f6" }}
      />

      {/* Token Allocation */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <BlurFade>
            <p className="text-xs uppercase tracking-widest text-qc-teal font-mono mb-4">Allocation</p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-16">
              How QRY is{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-qc-teal to-qc-blue">
                distributed.
              </span>
            </h2>
          </BlurFade>
          <TokenAllocationChart />
        </div>
      </section>

      {/* Allocation Breakdown */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <BlurFade>
            <p className="text-xs uppercase tracking-widest text-qc-blue font-mono mb-4">Breakdown</p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-16">
              Every token{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-qc-blue to-qc-teal">
                accounted for.
              </span>
            </h2>
          </BlurFade>

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
        </div>
      </section>

      {/* Token Utility */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <BlurFade>
            <p className="text-xs uppercase tracking-widest text-qc-teal font-mono mb-4">Utility</p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-16">
              What QRY{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-qc-teal to-qc-blue">
                powers.
              </span>
            </h2>
          </BlurFade>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-qc-teal/40 via-qc-blue/20 to-transparent hidden md:block" />
            <div className="space-y-10">
              {TOKEN_UTILITY.map((item, i) => {
                const Icon = ICON_MAP[item.icon] || Coins;
                return (
                  <BlurFade key={item.title} delay={0.1 + i * 0.08}>
                    <div className="flex gap-6 md:gap-10 items-start">
                      <div className={`shrink-0 w-12 h-12 rounded-full ${item.bgColor} flex items-center justify-center relative z-10`}>
                        <Icon className={`w-5 h-5 ${item.color}`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold font-display text-text-primary mb-2">{item.title}</h3>
                        <p className="text-text-secondary max-w-lg">{item.description}</p>
                      </div>
                    </div>
                  </BlurFade>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Vesting Timeline */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <BlurFade>
            <p className="text-xs uppercase tracking-widest text-qc-blue font-mono mb-4">Vesting</p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-4">
              Token{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-qc-blue to-qc-teal">
                unlock schedule.
              </span>
            </h2>
            <p className="text-text-secondary text-lg mb-16 max-w-2xl">
              Gradual release over 48 months. Team tokens locked for 12 months. No sudden supply shocks.
            </p>
          </BlurFade>

          <BlurFade delay={0.1}>
            <div className="rounded-xl bg-bg-secondary border border-white/5 p-6">
              {/* Milestone pills */}
              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  { label: "TGE", month: "M0", desc: "40% public sale unlocked" },
                  { label: "Cliff", month: "M6", desc: "Private round begins vesting" },
                  { label: "Team unlock", month: "M12", desc: "Team tokens begin vesting" },
                  { label: "Fully vested", month: "M48", desc: "100% circulating supply" },
                ].map((milestone) => (
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
                        <span className="text-xs font-mono text-text-muted">{item.vestingMonths} months</span>
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
          </BlurFade>
        </div>
      </section>

      {/* Supply Schedule Chart */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" ref={supplyRef}>
        <div className="mx-auto max-w-6xl">
          <BlurFade>
            <p className="text-xs uppercase tracking-widest text-qc-teal font-mono mb-4">Supply</p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-4">
              Circulating supply{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-qc-teal to-qc-blue">
                over time.
              </span>
            </h2>
            <p className="text-text-secondary text-lg mb-16 max-w-2xl">
              Cumulative token release across all allocations. Full circulation reached at month 48.
            </p>
          </BlurFade>

          <BlurFade delay={0.1}>
            <div className="rounded-xl bg-bg-secondary border border-white/5 p-6">
              <div className="h-[400px]">
                {supplyInView && (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={supplyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorPublic" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorStaking" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorTeam" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorEcosystem" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorPrivate" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
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
                      <Area type="monotone" dataKey="Public Sale" stackId="1" stroke="#3b82f6" fill="url(#colorPublic)" strokeWidth={2} />
                      <Area type="monotone" dataKey="Staking" stackId="1" stroke="#14b8a6" fill="url(#colorStaking)" strokeWidth={2} />
                      <Area type="monotone" dataKey="Team" stackId="1" stroke="#ef4444" fill="url(#colorTeam)" strokeWidth={2} />
                      <Area type="monotone" dataKey="Ecosystem" stackId="1" stroke="#22c55e" fill="url(#colorEcosystem)" strokeWidth={2} />
                      <Area type="monotone" dataKey="Private" stackId="1" stroke="#a855f7" fill="url(#colorPrivate)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {[
                  { label: "Public Sale", color: "#3b82f6" },
                  { label: "Staking", color: "#14b8a6" },
                  { label: "Team", color: "#ef4444" },
                  { label: "Ecosystem", color: "#22c55e" },
                  { label: "Private", color: "#a855f7" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-text-muted">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Staking Rewards */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <BlurFade>
            <p className="text-xs uppercase tracking-widest text-qc-teal font-mono mb-4">Staking</p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-4">
              Stake QRY.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-qc-teal to-qc-blue">
                Earn rewards.
              </span>
            </h2>
            <p className="text-text-secondary text-lg mb-16 max-w-2xl">
              Higher stakes earn higher APR. Rewards are distributed every 6 hours alongside Quarry Miner elections.
            </p>
          </BlurFade>

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
                    <h3 className="text-lg font-bold font-display text-text-primary mb-1">{tier.tier}</h3>
                    <p className="text-xs text-text-muted font-mono mb-4">{tier.minStake}</p>
                    <p className="text-3xl font-bold font-display mb-1" style={{ color: tier.color }}>
                      <NumberTicker value={tier.apr} suffix="%" duration={1.5} />
                    </p>
                    <p className="text-xs text-text-muted">APR</p>
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <p className="text-xs text-text-muted">Est. 30-day reward</p>
                      <p className="text-sm font-mono text-text-secondary mt-1">{tier.reward30d}</p>
                    </div>
                  </div>
                </SpotlightCard>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Revenue Model */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <BlurFade>
            <p className="text-xs uppercase tracking-widest text-qc-blue font-mono mb-4">Revenue</p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-4">
              Sustainable{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-qc-blue to-qc-green">
                revenue model.
              </span>
            </h2>
            <p className="text-text-secondary text-lg mb-16 max-w-2xl">
              Three revenue streams fund network operations, development, and community rewards.
            </p>
          </BlurFade>

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
                        <Icon className="w-5 h-5" style={{ color: stream.color }} />
                      </div>
                      <h3 className="text-lg font-bold font-display text-text-primary mb-1">{stream.title}</h3>
                      <p className="text-2xl font-bold font-display mb-3" style={{ color: stream.color }}>
                        {stream.rate}
                      </p>
                      <p className="text-sm text-text-secondary">{stream.description}</p>
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
                  <h4 className="text-sm font-bold text-text-primary mb-1">Deflationary Pressure</h4>
                  <p className="text-sm text-text-secondary">
                    A portion of contract deployment fees are burned permanently, reducing total supply over time. As ecosystem activity grows, supply decreases — creating natural upward pressure on token value.
                  </p>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      <PageCTA
        headline="Explore the QuarryChain ecosystem."
        ctas={[
          { text: "Read Whitepaper", href: "/whitepaper", primary: true },
          { text: "Start Building", href: "/developers" },
        ]}
      />
    </div>
  );
}
