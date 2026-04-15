import { Coins, Code2, ShieldCheck, ImageIcon } from "lucide-react";
import LitepaperSection from "@/components/litepaper/LitepaperSection";
import { LITEPAPER_SECTIONS } from "@/lib/litepaper";

const meta = LITEPAPER_SECTIONS.find((s) => s.id === "tokens")!;

const TODAY = [
  {
    icon: Coins,
    name: "QRC-10",
    color: "#a855f7",
    short: "System tokens",
    body: "Issued at the protocol level for 3 QRC. Accessible via API and smart contracts. Transfer fees are roughly 1,000× cheaper than QRC-20. Best for high-volume payment tokens, in-game currencies, and anything that doesn't need custom contract logic.",
  },
  {
    icon: Code2,
    name: "QRC-20",
    color: "#a855f7",
    short: "Smart contract tokens",
    body: "ERC-20 compatible. Implemented inside Solidity contracts with the standard interface (totalSupply, balanceOf, transfer, approve, transferFrom). Customizable, but only accessible from inside the QVM. The right choice for governance tokens, rebasing tokens, and anything with on-chain logic.",
  },
];

const FUTURE = [
  {
    icon: ShieldCheck,
    name: "QRC-1400",
    color: "#94a3b8",
    short: "Security tokens",
    body: "For tokenized securities — KYC-gated transfers, partition support, and forced redemption by an authorized controller.",
  },
  {
    icon: ImageIcon,
    name: "QRC-721",
    color: "#94a3b8",
    short: "Non-fungible tokens",
    body: "ERC-721 equivalent for unique on-chain assets. Tokenized art, fractionalized real estate, collectibles.",
  },
];

export default function Section06Tokens() {
  return (
    <LitepaperSection meta={meta}>
      <p>
        QuarryChain ships two production token standards today, with two more
        on the roadmap. The split between protocol-level (QRC-10) and
        contract-level (QRC-20) is intentional — most projects don&apos;t need
        a custom contract for a simple payment token, and protocol-level
        tokens are dramatically cheaper to transfer.
      </p>

      <h3 className="text-xl font-bold font-display text-text-primary pt-4">
        Live today
      </h3>

      <div className="not-prose grid md:grid-cols-2 gap-4">
        {TODAY.map((t) => {
          const Icon = t.icon;
          return (
            <div
              key={t.name}
              className="rounded-xl bg-bg-secondary border border-purple-400/20 p-5"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                style={{ backgroundColor: `${t.color}15` }}
              >
                <Icon className="w-5 h-5" style={{ color: t.color }} />
              </div>
              <h4
                className="text-base font-bold font-display"
                style={{ color: t.color }}
              >
                {t.name}
              </h4>
              <p className="text-xs uppercase tracking-widest font-mono text-text-muted mb-2">
                {t.short}
              </p>
              <p className="text-sm text-text-secondary">{t.body}</p>
            </div>
          );
        })}
      </div>

      <h3 className="text-xl font-bold font-display text-text-primary pt-4">
        On the roadmap
      </h3>

      <p>
        QuarryChain Solidity tracks the same versioning as Ethereum&apos;s, so
        any token standard that compiles on EVM can be ported with minimal
        work. The two standards prioritized for native support are:
      </p>

      <div className="not-prose grid md:grid-cols-2 gap-4">
        {FUTURE.map((t) => {
          const Icon = t.icon;
          return (
            <div
              key={t.name}
              className="rounded-xl bg-bg-secondary border border-white/5 p-5"
            >
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-3">
                <Icon className="w-5 h-5 text-text-muted" />
              </div>
              <h4 className="text-base font-bold font-display text-text-primary">
                {t.name}
              </h4>
              <p className="text-xs uppercase tracking-widest font-mono text-text-muted mb-2">
                {t.short}
              </p>
              <p className="text-sm text-text-secondary">{t.body}</p>
            </div>
          );
        })}
      </div>
    </LitepaperSection>
  );
}
