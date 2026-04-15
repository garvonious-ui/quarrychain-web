import { Gauge, Snowflake, Receipt } from "lucide-react";
import LitepaperSection from "@/components/litepaper/LitepaperSection";
import { LITEPAPER_SECTIONS } from "@/lib/litepaper";

const meta = LITEPAPER_SECTIONS.find((s) => s.id === "economics")!;

const FIXED_FEES = [
  { op: "Create a new account", fee: "0.1 QRC" },
  { op: "Issue a QRC-10 token", fee: "3 QRC" },
  { op: "Create an exchange pair", fee: "3 QRC" },
  { op: "Create a witness node", fee: "32 QRC" },
];

export default function Section05Economics() {
  return (
    <LitepaperSection meta={meta}>
      <p>
        Most blockchains charge a per-transaction fee. QuarryChain doesn&apos;t.
        Every account on the network gets{" "}
        <strong className="text-text-primary">5,000 free bandwidth points
        every day</strong>, refilled automatically. Standard transactions and
        token transfers are paid out of that bandwidth budget — not out of the
        sender&apos;s QRC balance. The user experience is closer to using a
        free internet service than paying gas.
      </p>

      <div className="not-prose rounded-xl bg-bg-secondary border border-qc-teal/20 p-6 shadow-[0_0_30px_rgba(20,184,166,0.04)]">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-qc-teal/10 flex items-center justify-center shrink-0">
            <Gauge className="w-5 h-5 text-qc-teal" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-text-primary mb-1">
              How bandwidth points work
            </h4>
            <p className="text-sm text-text-secondary">
              The cost of a transaction is its byte length × the network&apos;s
              bandwidth rate. A 200-byte transfer consumes 200 bandwidth
              points. Run out of free daily bandwidth? You can freeze QRC to
              earn more — frozen tokens stay yours, you just opt out of moving
              them in exchange for capacity.
            </p>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold font-display text-text-primary pt-4 flex items-center gap-3">
        <Snowflake className="w-5 h-5 text-qc-blue" />
        Energy is separate from bandwidth
      </h3>
      <p>
        Smart contracts use a second resource called{" "}
        <strong className="text-text-primary">Energy</strong>. Where the EVM
        meters every contract operation in gas paid out of the sender&apos;s
        balance, QuarryChain accounts gain Energy by freezing QRC — and the
        amount of Energy you get scales with your share of total frozen
        supply. Energy is purely computational, separate from the bandwidth
        cost of broadcasting the transaction. State-changing functions consume
        Energy. Read-only calls don&apos;t.
      </p>

      <h3 className="text-xl font-bold font-display text-text-primary pt-4 flex items-center gap-3">
        <Receipt className="w-5 h-5 text-qc-red" />
        The few things that do cost QRC
      </h3>
      <p>
        A small set of network operations have fixed fees, paid in QRC, that
        exist to discourage spam and fund the network:
      </p>

      <div className="not-prose rounded-xl bg-bg-secondary border border-white/5 overflow-hidden">
        {FIXED_FEES.map((row, i) => (
          <div
            key={row.op}
            className={`flex items-center justify-between px-5 py-3 text-sm ${
              i !== FIXED_FEES.length - 1 ? "border-b border-white/5" : ""
            }`}
          >
            <span className="text-text-secondary">{row.op}</span>
            <span className="font-mono text-qc-teal">{row.fee}</span>
          </div>
        ))}
      </div>

      <p>
        The combination — free bandwidth for normal use, frozen-stake Energy
        for smart contracts, and fixed fees only on network-altering
        operations — is what lets QuarryChain claim 100,000 TPS without
        forcing every user to think about gas. The network earns from
        deployment fees and a 0.25% transaction-level revenue share, not from
        nickel-and-diming individual transfers.
      </p>
    </LitepaperSection>
  );
}
