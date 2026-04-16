import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

/**
 * Sanity webhook handler. Revalidates pages whose content depends on Sanity docs.
 *
 * Configure the webhook in Sanity Studio → Manage → API → Webhooks to POST here
 * with header `x-sanity-webhook-secret: <SANITY_WEBHOOK_SECRET>` and a JSON body
 * containing the `_type` of the document that changed (Sanity's default payload
 * includes this).
 *
 * - blogPost → /blog and /blog/[slug]
 * - teamMember, roadmapPhase → / (homepage) and /whitepaper (litepaper sections 11 + 12)
 * - anything else (or missing _type) → revalidate all of the above, to be safe
 */
export async function POST(request: Request) {
  const secret = request.headers.get("x-sanity-webhook-secret");

  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  let type: string | undefined;
  try {
    const body = await request.json();
    type = typeof body?._type === "string" ? body._type : undefined;
  } catch {
    // Body not JSON or missing — fall through to revalidate-everything.
  }

  const revalidated: string[] = [];

  if (!type || type === "blogPost") {
    revalidatePath("/blog");
    revalidatePath("/blog/[slug]", "page");
    revalidated.push("/blog", "/blog/[slug]");
  }

  if (!type || type === "teamMember" || type === "roadmapPhase") {
    revalidatePath("/");
    revalidatePath("/whitepaper");
    revalidated.push("/", "/whitepaper");
  }

  return NextResponse.json({
    revalidated: true,
    type: type ?? null,
    paths: revalidated,
    now: Date.now(),
  });
}
