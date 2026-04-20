#!/usr/bin/env node
/**
 * One-shot Sanity seed script for team members and roadmap phases.
 *
 * Usage:
 *   # 1. Generate an Editor-role API token at
 *   #    https://www.sanity.io/manage/project/<projectId>/api/tokens
 *   # 2. Add it to .env.local as SANITY_API_TOKEN=<token>
 *   # 3. Run:
 *   node --env-file=.env.local scripts/seed-sanity.mjs
 *
 * Uses `createOrReplace` with deterministic `_id`s, so re-runs are idempotent —
 * running it again overwrites the same docs rather than duplicating them.
 *
 * This script's data is a snapshot of the TEAM and ROADMAP constants from
 * src/lib/constants.ts at the time it was written. After seeding, Sanity is
 * the source of truth for these docs — edits happen in /studio, not here.
 * constants.ts remains as the runtime fallback for local dev without Sanity.
 */

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId) {
  console.error("❌ Missing NEXT_PUBLIC_SANITY_PROJECT_ID — check .env.local");
  process.exit(1);
}
if (!token) {
  console.error(
    "❌ Missing SANITY_API_TOKEN — generate one at https://www.sanity.io/manage/project/" +
      projectId +
      "/api/tokens (Editor role) and add to .env.local"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

// ===== Data (snapshot from src/lib/constants.ts) =====

const TEAM = [
  { name: "Alec Arrambide", role: "Founder & CEO" },
  { name: "Tanner Hanks", role: "COO" },
  { name: "Gabby Parsons", role: "CMO" },
  { name: "David Aneo", role: "Lead Web Developer / Graphic Designer" },
  { name: "Toyama Haruo", role: "Senior Full Stack Developer" },
  { name: "John Wachi", role: "Full Stack Developer" },
];

const ROADMAP = [
  {
    phase: 1,
    title: "Foundation & Network Launch",
    status: "complete",
    items: [
      "QuarryChain Seed Round",
      "QuarryChain Testnet Development & Launch",
      "Core Team Expansion",
    ],
  },
  {
    phase: 2,
    title: "Ecosystem Infrastructure & Private Sale",
    status: "in-progress",
    items: [
      "Development of QVM (Quarry Virtual Machine)",
      "QRC-20 Development & Testing",
      "Development of QuarrySwap & QuarryWallet",
      "Development of No-Code API",
    ],
  },
  {
    phase: 3,
    title: "Network Maturation & Public Entry",
    status: "upcoming",
    items: [
      "QuarryChain Mainnet Development",
      "QuarryChain DPoS Network Launch",
      "Quarry (QRY) Public Sale (ICO)",
      "First Delegate Voting Round",
      "QRC-20 & QuarryWallet Desktop Launch",
      "Development of QuarryWallet Mobile App",
    ],
  },
  {
    phase: 4,
    title: "Global Ecosystem & Marketplace",
    status: "future",
    items: [
      "QuarrySwap's Real-World Marketplace",
      "QuarryWallet Mobile App Launch",
      "Ecosystem Expansion (DApps)",
      "No-Code API Global Rollout",
    ],
  },
];

// ===== ID helpers =====

/** Deterministic slug-based ID so re-runs are idempotent. */
function slugId(prefix, input) {
  const slug = String(input)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${prefix}-${slug}`;
}

// ===== Seed =====

async function seedTeam() {
  console.log(`\n→ Seeding ${TEAM.length} team members…`);
  const txn = client.transaction();
  TEAM.forEach((member, i) => {
    const _id = slugId("team", member.name);
    txn.createOrReplace({
      _id,
      _type: "teamMember",
      name: member.name,
      role: member.role,
      order: i + 1,
    });
    console.log(`  · ${_id}  ${member.name} — ${member.role}`);
  });
  await txn.commit();
  console.log("✓ Team members seeded");
}

async function seedRoadmap() {
  console.log(`\n→ Seeding ${ROADMAP.length} roadmap phases…`);
  const txn = client.transaction();
  ROADMAP.forEach((phase) => {
    const _id = slugId("roadmap", `phase-${phase.phase}`);
    txn.createOrReplace({
      _id,
      _type: "roadmapPhase",
      phase: phase.phase,
      title: phase.title,
      status: phase.status,
      items: phase.items,
    });
    console.log(`  · ${_id}  Phase ${phase.phase} — ${phase.title} (${phase.status})`);
  });
  await txn.commit();
  console.log("✓ Roadmap phases seeded");
}

async function main() {
  console.log(`Seeding Sanity dataset '${dataset}' on project '${projectId}'`);
  await seedTeam();
  await seedRoadmap();
  console.log("\n🎉 Done. Visit /studio to view and edit.\n");
}

main().catch((err) => {
  console.error("\n❌ Seed failed:", err.message || err);
  process.exit(1);
});
