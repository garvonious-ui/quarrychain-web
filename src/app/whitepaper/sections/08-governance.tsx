import { Vote, Users, FileCheck } from "lucide-react";
import LitepaperSection from "@/components/litepaper/LitepaperSection";
import { LITEPAPER_SECTIONS } from "@/lib/litepaper";

const meta = LITEPAPER_SECTIONS.find((s) => s.id === "governance")!;

const REWARDS = [
  {
    name: "Block Reward",
    color: "#3b82f6",
    payout: "230 QRC / round",
    annual: "336,700 QRC / year",
    body: "Split across the 27 active Quarry Miners each voting round, less any blocks they missed. Compensates the cost of running validator infrastructure.",
  },
  {
    name: "Vote Reward",
    color: "#14b8a6",
    payout: "230 QRC / round",
    annual: "336,700 QRC / year",
    body: "Distributed across the top 127 candidates — including the 100 ranks below the active set — proportional to vote share. Rank 28 through 127 still earn for showing up.",
  },
];

export default function Section08Governance() {
  return (
    <LitepaperSection meta={meta}>
      <p>
        QuarryChain&apos;s governance has two layers. The first elects the
        validator set and pays them. The second lets that validator set vote
        on the protocol&apos;s own dynamic parameters — block rewards,
        transaction fees, and other knobs — without requiring a hard fork.
      </p>

      <h3 className="text-xl font-bold font-display text-text-primary pt-4 flex items-center gap-3">
        <Vote className="w-5 h-5 text-qc-blue" />
        Layer 1 — Quarry Mining
      </h3>
      <p>
        Anyone can become a Quarry Miner candidate. Applying burns 9,999 QRC
        from the candidate&apos;s account, which prevents trivial sybil
        spam. Every QRY holder can vote, weighted by frozen tokens — 1 frozen
        QRY equals 1 Quarry Power, and votes are recounted on a time-based cadence.
        The top 27 by vote weight become active producers for the next round.
      </p>

      <p>
        Rewards are split into two streams, both denominated in QRC:
      </p>

      <div className="not-prose grid sm:grid-cols-2 gap-4 pt-2">
        {REWARDS.map((r) => (
          <div
            key={r.name}
            className="rounded-xl bg-bg-secondary border border-white/5 p-5"
            style={{ borderColor: `${r.color}22` }}
          >
            <h4
              className="text-base font-bold font-display"
              style={{ color: r.color }}
            >
              {r.name}
            </h4>
            <p className="text-2xl font-bold font-display text-text-primary mt-2">
              {r.payout}
            </p>
            <p className="text-xs font-mono text-text-muted mt-1">{r.annual}</p>
            <p className="text-sm text-text-secondary mt-3">{r.body}</p>
          </div>
        ))}
      </div>

      <p>
        Block production rewards land in a sub-account that the QM controls
        but can&apos;t spend directly. A withdrawal can be made once every 24
        hours — small friction that prevents validators from leaking rewards
        to compromised wallets in real time.
      </p>

      <h3 className="text-xl font-bold font-display text-text-primary pt-4 flex items-center gap-3">
        <Users className="w-5 h-5 text-qc-blue" />
        Layer 2 — The Committee
      </h3>
      <p>
        The 27 active Quarry Miners collectively make up the Committee. Only
        Committee members can propose changes to dynamic network parameters
        (block rewards, transaction fees, energy multipliers). Once a proposal
        is created, it&apos;s active for{" "}
        <strong className="text-text-primary">3 days</strong>.
      </p>

      <div className="not-prose rounded-xl bg-bg-secondary border border-qc-blue/15 p-6 my-2">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-qc-blue/10 flex items-center justify-center shrink-0">
            <FileCheck className="w-5 h-5 text-qc-blue" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-text-primary mb-1">
              19 of 27 to pass
            </h4>
            <p className="text-sm text-text-secondary">
              A proposal needs at least <strong className="text-text-primary">
              19 yes votes</strong> within the 3-day window to be approved.
              Members who don&apos;t vote count as a no. Passing proposals are
              applied at the next maintenance period (3 days later). The
              proposer can cancel at any time before the proposal becomes
              effective.
            </p>
          </div>
        </div>
      </div>

      <p>
        The two-layer split matters. Stakers control who validates, but
        validators — accountable to those same stakers because they can be
        voted out at the next voting round — control the dials that tune the
        protocol. Neither layer can capture the other without losing its
        position.
      </p>
    </LitepaperSection>
  );
}
