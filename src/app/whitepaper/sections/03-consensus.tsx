import { Shield, Vote, Pickaxe, Server } from "lucide-react";
import LitepaperSection from "@/components/litepaper/LitepaperSection";
import { LITEPAPER_SECTIONS } from "@/lib/litepaper";

const meta = LITEPAPER_SECTIONS.find((s) => s.id === "consensus")!;

const NODE_TYPES = [
  {
    icon: Pickaxe,
    name: "Witness Node",
    color: "#22c55e",
    role: "Run by elected Quarry Miners. Produces blocks and creates governance proposals.",
  },
  {
    icon: Server,
    name: "Full Node",
    color: "#3b82f6",
    role: "Exposes APIs and broadcasts transactions and blocks to the network.",
  },
  {
    icon: Server,
    name: "Solidity Node",
    color: "#14b8a6",
    role: "Syncs from Full Nodes and provides indexable APIs for downstream apps.",
  },
];

export default function Section03Consensus() {
  return (
    <LitepaperSection meta={meta}>
      <p>
        Proof of Work spends real-world energy to secure the chain. Standard
        Proof of Stake replaces that energy bill with a hoarding incentive — the
        more tokens you hold, the more influence you get, which tends to
        concentrate validation in a small number of large bagholders.
        QuarryChain runs <strong className="text-text-primary">Delegated Proof
        of Stake</strong>, which keeps the energy efficiency of PoS but takes
        the validator selection out of pure stake-weight and puts it in the
        hands of the community.
      </p>

      <div className="not-prose grid sm:grid-cols-2 gap-4 pt-2">
        <div className="rounded-xl bg-bg-secondary border border-qc-green/15 p-5">
          <div className="flex items-center gap-3 mb-2">
            <Vote className="w-4 h-4 text-qc-green" />
            <p className="text-xs font-mono uppercase tracking-widest text-qc-green">
              Election
            </p>
          </div>
          <p className="text-text-secondary text-sm">
            Every <strong className="text-text-primary">6 hours</strong>, QRY
            holders who freeze their tokens vote for Quarry Miner candidates.
            The top 27 by vote weight earn the right to produce blocks for the
            next round. 1 frozen QRY = 1 Quarry Power.
          </p>
        </div>
        <div className="rounded-xl bg-bg-secondary border border-qc-green/15 p-5">
          <div className="flex items-center gap-3 mb-2">
            <Pickaxe className="w-4 h-4 text-qc-green" />
            <p className="text-xs font-mono uppercase tracking-widest text-qc-green">
              Block Production
            </p>
          </div>
          <p className="text-text-secondary text-sm">
            The 27 Quarry Miners produce one block every{" "}
            <strong className="text-text-primary">3 seconds</strong> in
            round-robin fashion. A transaction is fully confirmed after ~19
            blocks, or roughly{" "}
            <strong className="text-text-primary">1 minute</strong>.
          </p>
        </div>
      </div>

      <p>
        Becoming a candidate isn&apos;t free. The protocol burns 9,999 QRC from
        an applicant&apos;s account when they enter the Quarry Miner race —
        enough to make sybil candidates economically painful, low enough that
        a serious team can self-fund a campaign. Candidate ranks 28 through 127
        also earn vote rewards, so the long tail has skin in the game even
        without producing blocks.
      </p>

      <h3 className="text-xl font-bold font-display text-text-primary pt-4 flex items-center gap-3">
        <Shield className="w-5 h-5 text-qc-teal" />
        TaPoS — Transaction as Proof of Stake
      </h3>
      <p>
        Every QuarryChain transaction includes a fragment of a recent block
        header hash. This forces every transaction to commit to a specific
        version of history — making it impossible to replay a transaction on a
        forked chain that doesn&apos;t include the referenced block. The same
        mechanism doubles as the network&apos;s defense against denial of
        service, 51% attacks, selfish mining, and double-spend attacks. It
        costs nothing extra and runs invisibly under every transaction the
        network processes.
      </p>

      <h3 className="text-xl font-bold font-display text-text-primary pt-4">
        Three node types
      </h3>
      <div className="not-prose grid sm:grid-cols-3 gap-3">
        {NODE_TYPES.map((node) => {
          const Icon = node.icon;
          return (
            <div
              key={node.name}
              className="rounded-xl bg-bg-secondary border border-white/5 p-5"
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                style={{ backgroundColor: `${node.color}15` }}
              >
                <Icon className="w-4 h-4" style={{ color: node.color }} />
              </div>
              <h4
                className="text-sm font-bold font-display mb-1"
                style={{ color: node.color }}
              >
                {node.name}
              </h4>
              <p className="text-xs text-text-secondary">{node.role}</p>
            </div>
          );
        })}
      </div>
    </LitepaperSection>
  );
}
