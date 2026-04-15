import { createClient, type SanityClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";

let _client: SanityClient | null = null;

function isValidProjectId(id: string | undefined): id is string {
  return !!id && /^[a-z0-9-]+$/.test(id);
}

/**
 * Lazily creates the Sanity client on first use.
 * Returns null if NEXT_PUBLIC_SANITY_PROJECT_ID is not set or invalid.
 */
export function getSanityClient(): SanityClient | null {
  if (!isValidProjectId(projectId)) return null;
  if (!_client) {
    _client = createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      useCdn: true,
    });
  }
  return _client;
}

/**
 * Returns true if Sanity is configured with a valid project ID.
 * When false, the blog falls back to local MDX files.
 */
export function isSanityConfigured(): boolean {
  return isValidProjectId(projectId);
}
