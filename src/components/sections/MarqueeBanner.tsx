"use client";

import Marquee from "@/components/ui/marquee";

const items = [
  { text: "100,000 TPS", color: "text-qc-blue" },
  { text: "3-Second Finality", color: "text-qc-green" },
  { text: "DPoS Consensus", color: "text-qc-red" },
  { text: "QuarrySwap DEX", color: "text-qc-teal" },
  { text: "QVM Compatible", color: "text-qc-blue" },
  { text: "QRC-20 Tokens", color: "text-qc-green" },
  { text: "Asset Tokenization", color: "text-qc-red" },
  { text: "27 Quarry Miners", color: "text-qc-teal" },
  { text: "0.25% Fees", color: "text-qc-blue" },
  { text: "QuarryWallet", color: "text-qc-green" },
];

export default function MarqueeBanner() {
  return (
    <div className="py-6 border-y border-white/5 bg-bg-primary overflow-hidden">
      <Marquee speed={35} pauseOnHover>
        {items.map((item) => (
          <span
            key={item.text}
            className={`flex items-center gap-3 text-sm whitespace-nowrap ${item.color}`}
          >
            <span className="h-1 w-1 rounded-full bg-current opacity-50" />
            {item.text}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
