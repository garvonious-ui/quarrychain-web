import { TEAM } from "./constants";
import { isSanityConfigured } from "./sanity/client";
import { sanityGetTeamMembers } from "./sanity/queries";

export interface TeamMember {
  name: string;
  role: string;
  order?: number;
}

/**
 * Dual-mode team data.
 * - When Sanity is configured: fetch from Sanity (ordered by `order` asc, then `name`).
 * - Otherwise: fall back to the static TEAM constant in `src/lib/constants.ts`.
 *
 * Mirrors the pattern in `src/lib/blog.ts`.
 */
export async function getTeamMembers(): Promise<TeamMember[]> {
  if (isSanityConfigured()) {
    const members = await sanityGetTeamMembers();
    // If Sanity is configured but has no team docs yet, fall through to constants
    // so the homepage never renders empty during Sanity onboarding.
    if (members.length > 0) {
      return members.map((m) => ({ name: m.name, role: m.role, order: m.order }));
    }
  }
  return TEAM.map((m) => ({ name: m.name, role: m.role }));
}
