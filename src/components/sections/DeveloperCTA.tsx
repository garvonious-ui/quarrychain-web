"use client";

import { useState } from "react";
import BlurFade from "@/components/ui/blur-fade";

const SOLIDITY_CODE = `// Deploy to QuarryChain — zero changes needed
pragma solidity ^0.8.0;

import "@quarrychain/contracts/token/QRC20.sol";

contract MyToken is QRC20 {
    constructor() QRC20("MyToken", "MTK") {
        _mint(msg.sender, 1000000 * 10**18);
    }
}`;

const BADGES = [
  "EVM Compatible",
  "Solidity Native",
  "Web3.js",
  "Ethers.js",
  "MetaMask Ready",
];

function SyntaxHighlight({ code }: { code: string }) {
  const lines = code.split("\n");

  function highlightLine(line: string) {
    // Comments
    if (line.trim().startsWith("//")) {
      return <span className="text-[#475569]">{line}</span>;
    }

    let result = line;

    // Build tokens for syntax highlighting
    const tokens: { text: string; color: string }[] = [];
    let remaining = line;
    let pos = 0;

    // Simple tokenizer — process character by character
    const patterns: [RegExp, string][] = [
      [/^(pragma|solidity|import|contract|constructor|is)\b/, "#c084fc"], // keywords purple
      [/^(function|returns?|public|private|external|internal|view|pure|payable|memory|storage|calldata)\b/, "#c084fc"],
      [/^(uint256|uint|int|address|string|bool|bytes|mapping)\b/, "#2dd4bf"], // types teal
      [/^(QRC20|MyToken)\b/, "#2dd4bf"], // contract names teal
      [/^"[^"]*"/, "#fbbf24"], // strings yellow
      [/^'[^']*'/, "#fbbf24"],
      [/^\d+(\.\d+)?/, "#fbbf24"], // numbers yellow
      [/^(_mint|msg\.sender)\b/, "#3b82f6"], // function calls blue
      [/^@[^\s;]+/, "#94a3b8"], // imports
    ];

    while (remaining.length > 0) {
      let matched = false;
      for (const [pattern, color] of patterns) {
        const match = remaining.match(pattern);
        if (match) {
          if (pos < line.length - remaining.length) {
            // There was unmatched text before
          }
          tokens.push({ text: match[0], color });
          remaining = remaining.slice(match[0].length);
          matched = true;
          break;
        }
      }
      if (!matched) {
        // Collect plain text
        const lastToken = tokens[tokens.length - 1];
        if (lastToken && lastToken.color === "") {
          lastToken.text += remaining[0];
        } else {
          tokens.push({ text: remaining[0], color: "" });
        }
        remaining = remaining.slice(1);
      }
    }

    return (
      <>
        {tokens.map((t, i) =>
          t.color ? (
            <span key={i} style={{ color: t.color }}>
              {t.text}
            </span>
          ) : (
            <span key={i} className="text-text-secondary">
              {t.text}
            </span>
          )
        )}
      </>
    );
  }

  return (
    <pre className="text-sm leading-relaxed overflow-x-auto">
      <code>
        {lines.map((line, i) => (
          <div key={i}>{highlightLine(line)}</div>
        ))}
      </code>
    </pre>
  );
}

export default function DeveloperCTA() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(SOLIDITY_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Copy */}
          <div className="order-2 lg:order-1">
            <BlurFade>
              <p className="text-xs uppercase tracking-widest text-qc-teal font-mono mb-4">
                Build on QuarryChain
              </p>
            </BlurFade>

            <BlurFade delay={0.05}>
              <h2 className="text-3xl md:text-5xl font-bold font-display text-text-primary mb-6">
                Your Solidity contracts
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-qc-teal to-qc-blue">
                  work natively.
                </span>
              </h2>
            </BlurFade>

            <BlurFade delay={0.1}>
              <p className="text-text-secondary leading-relaxed mb-8 max-w-lg">
                QVM is fully EVM-compatible. Deploy existing contracts, use
                familiar tooling, and access 100K TPS — no rewrites required.
              </p>
            </BlurFade>

            <BlurFade delay={0.15}>
              <div className="flex flex-wrap gap-2 mb-8">
                {BADGES.map((badge) => (
                  <span
                    key={badge}
                    className="px-3.5 py-1.5 rounded-full text-xs font-medium text-qc-teal bg-[rgba(20,184,166,0.08)] border border-[rgba(20,184,166,0.15)] font-mono"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </BlurFade>

            <BlurFade delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="/developers"
                  className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white rounded-lg border border-qc-teal/50 bg-gradient-to-r from-qc-teal/10 to-qc-blue/10 hover:from-qc-teal/20 hover:to-qc-blue/20 hover:shadow-[0_0_30px_rgba(20,184,166,0.2)] transition-all duration-300"
                >
                  Read the Docs →
                </a>
                <a
                  href="https://github.com/QuarryLabsInc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-text-secondary rounded-lg border border-white/[0.08] hover:border-white/20 hover:text-text-primary transition-all duration-300"
                >
                  View on GitHub
                </a>
              </div>
            </BlurFade>
          </div>

          {/* Right — Code block */}
          <BlurFade delay={0.1} className="order-1 lg:order-2">
            <div className="rounded-xl bg-bg-secondary border border-white/[0.06] overflow-hidden shadow-[0_0_40px_rgba(20,184,166,0.06)]">
              {/* Header bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/60" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <span className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <span className="text-xs text-text-muted font-mono">
                  MyToken.sol
                </span>
                <button
                  onClick={handleCopy}
                  className="text-xs text-text-muted hover:text-text-secondary font-mono transition-colors"
                >
                  {copied ? (
                    <span className="text-qc-green">Copied ✓</span>
                  ) : (
                    "Copy"
                  )}
                </button>
              </div>

              {/* Code */}
              <div className="p-5 font-mono">
                <SyntaxHighlight code={SOLIDITY_CODE} />
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
