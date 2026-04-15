import { Feather, ShieldCheck, Puzzle, CircleDollarSign } from "lucide-react";
import LitepaperSection from "@/components/litepaper/LitepaperSection";
import { LITEPAPER_SECTIONS } from "@/lib/litepaper";

const meta = LITEPAPER_SECTIONS.find((s) => s.id === "qvm")!;

const PROPERTIES = [
  {
    icon: Feather,
    name: "Lightweight",
    color: "#3b82f6",
    body: "Architected to keep resource consumption predictable and small. Validators can run on commodity hardware without performance cliffs.",
  },
  {
    icon: ShieldCheck,
    name: "Robust",
    color: "#14b8a6",
    body: "Each computational step has a fixed bandwidth cost, so consumption is deterministic and the VM can't be DoS'd by pathological contract code.",
  },
  {
    icon: Puzzle,
    name: "EVM-Compatible",
    color: "#22c55e",
    body: "QVM forked from EVM and tracks Solidity ^0.4.24 syntax. Existing Ethereum contracts run unmodified, and tooling like web3.js, ethers, and MetaMask connect natively.",
  },
  {
    icon: CircleDollarSign,
    name: "Low Cost",
    color: "#ef4444",
    body: "Energy model replaces gas. Most transactions cost zero QRC at the user level — fees come out of the bandwidth budget every account gets for free.",
  },
];

export default function Section04QVM() {
  return (
    <LitepaperSection meta={meta}>
      <p>
        The QuarryChain Virtual Machine is a lightweight, Turing-complete VM
        forked from the Ethereum Virtual Machine. It tracks Solidity{" "}
        <code className="text-xs bg-bg-secondary border border-white/5 px-1.5 py-0.5 rounded text-qc-teal font-mono">
          ^0.4.24
        </code>{" "}
        and is approximately 100% compatible with EVM bytecode. If a contract
        deploys to Ethereum, it deploys to QuarryChain — same source, same
        ABI, same wallet integrations.
      </p>

      <p>
        The compiler reads Solidity and emits bytecode. The QVM executes that
        bytecode through opcodes against a stack-based finite state machine,
        then accesses on-chain data through an interoperation layer. Standard
        EVM mental model, faster execution, and a different fee model
        underneath (covered in the next section).
      </p>

      <div className="not-prose grid sm:grid-cols-2 gap-4 pt-2">
        {PROPERTIES.map((prop) => {
          const Icon = prop.icon;
          return (
            <div
              key={prop.name}
              className="rounded-xl bg-bg-secondary border border-white/5 p-5"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                style={{ backgroundColor: `${prop.color}15` }}
              >
                <Icon className="w-5 h-5" style={{ color: prop.color }} />
              </div>
              <h3
                className="text-base font-bold font-display mb-1.5"
                style={{ color: prop.color }}
              >
                {prop.name}
              </h3>
              <p className="text-sm text-text-secondary">{prop.body}</p>
            </div>
          );
        })}
      </div>
    </LitepaperSection>
  );
}
