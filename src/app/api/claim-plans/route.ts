import { NextRequest, NextResponse } from "next/server";
import { getSessionEmail, claimPlanForUser } from "@/lib/auth";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

/**
 * POST /api/claim-plans  { planIds: string[] }
 *
 * Associates anonymous ("generate-first") plans with the now-signed-in user.
 * The client tracks anon planIds in localStorage (see src/lib/anon-plans.ts)
 * and calls this right after register/login so the plans land in My Trips.
 *
 * Each planId is claimed only if it exists AND is currently unowned (or
 * already owned by this same user). Plans owned by a different account are
 * silently skipped — never stolen.
 */
export async function POST(req: NextRequest) {
  const email = await getSessionEmail();
  if (!email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Light abuse guard — claiming requires a session, but cap churn per IP.
  const rl = await rateLimit(`claim-plans:${getClientIp(req)}`, 30, 3600);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Try again later." },
      { status: 429, headers: { "Retry-After": String(rl.resetIn) } }
    );
  }

  let planIds: unknown;
  try {
    ({ planIds } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!Array.isArray(planIds)) {
    return NextResponse.json({ error: "planIds must be an array" }, { status: 400 });
  }

  // Sanitize: unique, string, UUID-ish, capped.
  const ids = [...new Set(planIds)]
    .filter((id): id is string => typeof id === "string" && /^[a-f0-9-]{8,40}$/i.test(id))
    .slice(0, 25);

  let claimed = 0;
  for (const id of ids) {
    try {
      if (await claimPlanForUser(email, id)) claimed++;
    } catch {
      // Skip individual failures — best-effort batch claim.
    }
  }

  return NextResponse.json({ ok: true, claimed });
}
