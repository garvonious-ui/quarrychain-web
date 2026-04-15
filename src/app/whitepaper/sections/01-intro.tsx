import LitepaperSection from "@/components/litepaper/LitepaperSection";
import { LITEPAPER_SECTIONS } from "@/lib/litepaper";

const meta = LITEPAPER_SECTIONS.find((s) => s.id === "intro")!;

const STATS = [
  { value: "100,000", unit: "TPS", color: "#14b8a6" },
  { value: "3s", unit: "finality", color: "#3b82f6" },
  { value: "27", unit: "validators", color: "#ef4444" },
  { value: "EVM", unit: "compatible", color: "#22c55e" },
];

export default function Section01Intro() {
  return (
    <LitepaperSection meta={meta}>
      <p>
        QuarryChain is an L1 blockchain built for high throughput, sub-second
        finality, and near-zero per-transaction cost. It runs a 3-layer protocol
        stack with a Delegated Proof of Stake consensus, an EVM-compatible
        virtual machine for Solidity contracts, and a native token model
        designed for both fungible value transfer and real-world asset
        tokenization at scale.
      </p>

      <p>
        The thesis is simple: most production blockchains force a tradeoff
        between speed, cost, and developer ergonomics. QuarryChain is engineered
        to refuse that tradeoff. The QVM runs existing Solidity contracts
        unmodified. The bandwidth model gives every account 5,000 free daily
        transactions. The DPoS validator set is elected by token holders every
        six hours. The whole network is designed to feel free at the point of
        use, while remaining cryptographically and economically sound underneath.
      </p>

      <div className="not-prose grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
        {STATS.map((s) => (
          <div
            key={s.unit}
            className="rounded-xl bg-bg-secondary border border-white/5 p-4"
          >
            <p
              className="text-2xl font-bold font-display"
              style={{ color: s.color }}
            >
              {s.value}
            </p>
            <p className="text-xs uppercase tracking-widest text-text-muted font-mono mt-1">
              {s.unit}
            </p>
          </div>
        ))}
      </div>
    </LitepaperSection>
  );
}
