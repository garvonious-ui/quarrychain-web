import { Database, Cpu, Layers } from "lucide-react";
import LitepaperSection from "@/components/litepaper/LitepaperSection";
import { LITEPAPER_SECTIONS } from "@/lib/litepaper";

const meta = LITEPAPER_SECTIONS.find((s) => s.id === "architecture")!;

const LAYERS = [
  {
    icon: Layers,
    name: "Application Layer",
    color: "#14b8a6",
    body: "Where developers live. DApps, wallets, custom interfaces, and the QuarryChain Solidity smart contracts that drive on-chain behavior. Anything you build sits here.",
  },
  {
    icon: Cpu,
    name: "Core Layer",
    color: "#ef4444",
    body: "The protocol heart: stack-based virtual machine, account management, smart contract execution, and DPoS consensus. This is the layer that turns transactions into agreed-upon state.",
  },
  {
    icon: Database,
    name: "Storage Layer",
    color: "#3b82f6",
    body: "Two engines working together: LevelDB for the canonical chain, and KhaosDB — an in-memory store that holds forked chains so witnesses can switch to a new main chain without crashing or losing state.",
  },
];

export default function Section02Architecture() {
  return (
    <LitepaperSection meta={meta}>
      <p>
        QuarryChain is structured as three layers stacked on top of each other:
        Storage at the bottom, Core in the middle, Application at the top. Each
        layer has a single, focused job, and they talk to each other through a
        protocol built on Google Protocol Buffers — meaning every API is
        language-neutral, version-tolerant, and 3 to 10 times smaller on the
        wire than the JSON or XML alternatives.
      </p>

      <div className="not-prose space-y-4 pt-2">
        {LAYERS.map((layer) => {
          const Icon = layer.icon;
          return (
            <div
              key={layer.name}
              className="rounded-xl bg-bg-secondary border border-white/5 p-6 flex gap-5"
            >
              <div
                className="shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${layer.color}15` }}
              >
                <Icon className="w-5 h-5" style={{ color: layer.color }} />
              </div>
              <div>
                <h3
                  className="text-lg font-bold font-display mb-1"
                  style={{ color: layer.color }}
                >
                  {layer.name}
                </h3>
                <p className="text-text-secondary text-base">{layer.body}</p>
              </div>
            </div>
          );
        })}
      </div>

      <p>
        The protocol exposes both a Protobuf API for language-native clients
        (C++, Java, C#, Python, Ruby, Go, Objective-C, and more) and a RESTful
        HTTP API for everything else. Same interface, two transports — pick
        whichever fits the tooling you already use.
      </p>
    </LitepaperSection>
  );
}
