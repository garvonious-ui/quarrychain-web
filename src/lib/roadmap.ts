import { ROADMAP, type RoadmapStatus } from "./constants";
import { isSanityConfigured } from "./sanity/client";
import { sanityGetRoadmapPhases } from "./sanity/queries";

export interface RoadmapPhase {
  phase: number;
  title: string;
  status: RoadmapStatus;
  items: string[];
}

/**
 * Dual-mode roadmap data.
 * - When Sanity is configured: fetch from Sanity (ordered by phase asc).
 * - Otherwise: fall back to the static ROADMAP constant in `src/lib/constants.ts`.
 *
 * Mirrors the pattern in `src/lib/blog.ts` and `src/lib/team.ts`.
 */
export async function getRoadmapPhases(): Promise<RoadmapPhase[]> {
  if (isSanityConfigured()) {
    const phases = await sanityGetRoadmapPhases();
    // If Sanity is configured but has no roadmap docs yet, fall through to constants
    // so the homepage never renders empty during Sanity onboarding.
    if (phases.length > 0) {
      return phases.map((p) => ({
        phase: p.phase,
        title: p.title,
        status: p.status,
        items: p.items ?? [],
      }));
    }
  }
  return ROADMAP.map((p) => ({
    phase: p.phase,
    title: p.title,
    status: p.status,
    items: [...p.items],
  }));
}
