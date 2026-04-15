import {
  Wallet,
  Search,
  ArrowLeftRight,
  Cpu,
  Code2,
  Beaker,
  Server,
  FileCode,
  Network,
} from "lucide-react";
import LitepaperSection from "@/components/litepaper/LitepaperSection";
import { LITEPAPER_SECTIONS } from "@/lib/litepaper";

const meta = LITEPAPER_SECTIONS.find((s) => s.id === "ecosystem")!;

const APPS = [
  {
    icon: Wallet,
    name: "QuarryWallet",
    body: "Non-custodial wallet for QRY and QRC-10/20 tokens. Manages keys, signs transactions, and votes for Quarry Miners.",
  },
  {
    icon: ArrowLeftRight,
    name: "QuarrySwap",
    body: "Native AMM-based DEX. Liquidity pools, yield farming, and stacked yields from protocol fees, LP rewards, and lending interest.",
  },
  {
    icon: Search,
    name: "QuarryScan",
    body: "Block explorer for the network. Indexes every transaction, smart contract, account, and on-chain stat.",
  },
  {
    icon: Cpu,
    name: "QVM",
    body: "The Solidity-compatible execution environment. Where every smart contract on the network actually runs.",
  },
];

const DEV_TOOLS = [
  {
    icon: Code2,
    name: "QuarryStudio",
    body: "Integrated development environment with a built-in private testnet. Compile, deploy, and debug Solidity contracts before they hit Shasta or mainnet.",
  },
  {
    icon: Beaker,
    name: "QuarryBox",
    body: "A test framework for smart contracts. Wraps the QuarryWeb API to make integration tests fast and deterministic.",
  },
  {
    icon: Server,
    name: "QuarryGrid",
    body: "Load-balanced, hosted node clusters running on AWS worldwide. Lets DApps connect to the network without operating their own infrastructure.",
  },
  {
    icon: FileCode,
    name: "QuarryWeb",
    body: "JavaScript library wrapping the protocol's 60+ HTTP APIs. The fastest path from a frontend to on-chain data.",
  },
];

export default function Section10Ecosystem() {
  return (
    <LitepaperSection meta={meta}>
      <p>
        The protocol on its own is just rails. What makes a chain useful is
        what people build on top of it. QuarryChain ships with a first-party
        ecosystem of user-facing apps, plus a developer toolchain designed to
        get a Solidity engineer from <code className="text-xs bg-bg-secondary border border-white/5 px-1.5 py-0.5 rounded text-qc-teal font-mono">git
        clone</code> to a deployed contract on testnet in under an afternoon.
      </p>

      <h3 className="text-xl font-bold font-display text-text-primary pt-4">
        Core applications
      </h3>

      <div className="not-prose grid sm:grid-cols-2 gap-3">
        {APPS.map((app) => {
          const Icon = app.icon;
          return (
            <div
              key={app.name}
              className="rounded-xl bg-bg-secondary border border-white/5 p-5"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-qc-red/10 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-qc-red" />
                </div>
                <h4 className="text-base font-bold font-display text-text-primary">
                  {app.name}
                </h4>
              </div>
              <p className="text-sm text-text-secondary">{app.body}</p>
            </div>
          );
        })}
      </div>

      <h3 className="text-xl font-bold font-display text-text-primary pt-4">
        Developer toolchain
      </h3>

      <div className="not-prose grid sm:grid-cols-2 gap-3">
        {DEV_TOOLS.map((tool) => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.name}
              className="rounded-xl bg-bg-secondary border border-white/5 p-5"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-qc-teal/10 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-qc-teal" />
                </div>
                <h4 className="text-base font-bold font-display text-text-primary">
                  {tool.name}
                </h4>
              </div>
              <p className="text-sm text-text-secondary">{tool.body}</p>
            </div>
          );
        })}
      </div>

      <div className="not-prose rounded-xl bg-bg-secondary border border-qc-teal/20 p-6 mt-2 shadow-[0_0_30px_rgba(20,184,166,0.04)]">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-qc-teal/10 flex items-center justify-center shrink-0">
            <Network className="w-5 h-5 text-qc-teal" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-text-primary mb-1">
              Two networks, one toolchain
            </h4>
            <p className="text-sm text-text-secondary">
              QuarryChain ships with a public testnet (<strong className="text-text-primary">Shasta</strong>)
              and a production mainnet. Every dev tool can target either one
              with a config flag — local privatenet for unit tests, Shasta for
              integration, mainnet for production. Same code, three
              environments, no rewrites.
            </p>
          </div>
        </div>
      </div>
    </LitepaperSection>
  );
}
