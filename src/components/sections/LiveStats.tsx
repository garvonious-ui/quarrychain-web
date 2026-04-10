"use client";

import useSWR from "swr";
import { FALLBACK_STATS } from "@/lib/constants";
import { fetchNetworkStats, type NetworkStats } from "@/lib/api";
import NumberTicker from "@/components/ui/number-ticker";
import BlurFade from "@/components/ui/blur-fade";

export default function LiveStats() {
  const { data } = useSWR<NetworkStats | null>("network-stats", fetchNetworkStats, {
    refreshInterval: 15000,
    fallbackData: null,
  });

  const stats = data ?? FALLBACK_STATS;

  const items = [
    { label: "Total Blocks", value: stats.totalBlocks },
    { label: "Total Transactions", value: stats.totalTransactions },
    { label: "Active Addresses", value: stats.activeAddresses },
  ];

  return (
    <section className="py-12 border-y border-white/5 bg-bg-secondary/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {items.map((item, i) => (
            <BlurFade key={item.label} delay={i * 0.05}>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold font-mono text-text-primary">
                  <NumberTicker value={item.value} duration={2.5} />
                </p>
                <p className="text-xs text-text-muted mt-1 uppercase tracking-wider">
                  {item.label}
                </p>
              </div>
            </BlurFade>
          ))}
          <BlurFade delay={0.15}>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold font-mono text-text-primary">
                {stats.avgBlockTime}
              </p>
              <p className="text-xs text-text-muted mt-1 uppercase tracking-wider">
                Avg Block Time
              </p>
            </div>
          </BlurFade>
        </div>

        {data && (
          <p className="text-center mt-4 text-xs text-text-muted">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-qc-green animate-pulse mr-1.5 align-middle" />
            Live from testnet
          </p>
        )}
      </div>
    </section>
  );
}
