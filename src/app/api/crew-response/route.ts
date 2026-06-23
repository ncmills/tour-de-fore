import { NextRequest, NextResponse } from "next/server";
import { getPlan } from "@/lib/kv";
import { getSessionEmail } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

const SITE = "tdf";

// Tier ids match the plan tiers surfaced everywhere else (imp / devil /
// demon-king). Stored verbatim in crew_responses.vote_tier.
const VALID_TIERS = new Set(["imp", "devil", "demon-king"]);
const VALID_RSVP = new Set(["in", "maybe", "out"]);

function cleanEmail(val: unknown): string {
  if (typeof val !== "string") return "";
  const s = val.slice(0, 254).trim().toLowerCase();
  if (!s.includes("@") || !s.includes(".")) return "";
  return s;
}

function cleanName(val: unknown): string {
  if (typeof val !== "string") return "";
  return val.slice(0, 80).trim();
}

/**
 * POST /api/crew-response
 *
 * Lightweight identity (name + email, NO account). Any crew member holding the
 * unguessable share link can vote on a tier + RSVP. Upserts into the shared
 * `crew_responses` table (service-role only, RLS on) keyed by
 * (site, plan_id, email) so a person can change their vote without dupes.
 */
export async function POST(req: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json({ error: "Storage unavailable" }, { status: 503 });
    }

    // Rate-limit per IP — generous so real crew aren't blocked, tight enough
    // to stop bulk spam. Reuses the shared sliding-window limiter.
    const ip = getClientIp(req);
    const rl = await rateLimit(`crew:${ip}`, 20, 3600);
    if (!rl.allowed) {
      return NextResponse.json({ error: "Slow down a sec." }, { status: 429 });
    }

    const body = await req.json().catch(() => ({}));
    const planId = typeof body.planId === "string" ? body.planId.trim() : "";
    const email = cleanEmail(body.email);
    const name = cleanName(body.name);
    const voteTier = typeof body.voteTier === "string" ? body.voteTier.trim() : "";
    const rsvp = typeof body.rsvp === "string" ? body.rsvp.trim() : "";

    if (!planId) {
      return NextResponse.json({ error: "Missing planId" }, { status: 400 });
    }
    if (!email) {
      return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
    }
    if (!name) {
      return NextResponse.json({ error: "Enter your name." }, { status: 400 });
    }
    if (!VALID_TIERS.has(voteTier)) {
      return NextResponse.json({ error: "Pick a tier." }, { status: 400 });
    }
    if (!VALID_RSVP.has(rsvp)) {
      return NextResponse.json({ error: "Pick an RSVP." }, { status: 400 });
    }

    // Plan must exist (anyone holding the link can vote — no ownership check).
    const plan = await getPlan(planId);
    if (!plan) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }

    const now = new Date().toISOString();
    const { error } = await supabase.from("crew_responses").upsert(
      {
        site: SITE,
        plan_id: planId,
        email,
        name,
        vote_tier: voteTier,
        rsvp_status: rsvp,
        updated_at: now,
      },
      { onConflict: "site,plan_id,email" }
    );

    if (error) {
      console.error("[crew-response upsert]", error.message);
      return NextResponse.json({ error: "Couldn't save your vote." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[crew-response POST]", err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: "Something broke." }, { status: 500 });
  }
}

/**
 * GET /api/crew-response?planId=...
 *
 * Owner-gated tally. The caller's tdf-session email must match the plan's
 * organizerEmail. Returns aggregated votes by tier, RSVP counts, and the names
 * of everyone who's in/maybe (re-engagement surface — captured crew emails
 * persist in crew_responses; emails are NOT exposed here).
 */
export async function GET(req: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json({ error: "Storage unavailable" }, { status: 503 });
    }

    const planId = req.nextUrl.searchParams.get("planId")?.trim() || "";
    if (!planId) {
      return NextResponse.json({ error: "Missing planId" }, { status: 400 });
    }

    const plan = await getPlan(planId);
    if (!plan) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }

    // Owner gate: session email === plan organizer email.
    const sessionEmail = await getSessionEmail();
    const organizerEmail = plan.inputs?.organizerEmail;
    const isOwner = Boolean(
      sessionEmail &&
        organizerEmail &&
        sessionEmail.toLowerCase() === organizerEmail.toLowerCase()
    );
    if (!isOwner) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    const { data, error } = await supabase
      .from("crew_responses")
      .select("name, vote_tier, rsvp_status")
      .eq("site", SITE)
      .eq("plan_id", planId);

    if (error) {
      console.error("[crew-response GET]", error.message);
      return NextResponse.json({ error: "Couldn't load tally." }, { status: 500 });
    }

    const rows = data || [];
    const votesByTier: Record<string, number> = { imp: 0, devil: 0, "demon-king": 0 };
    const rsvpCounts = { in: 0, maybe: 0, out: 0 };
    const attendees: { name: string }[] = [];

    for (const row of rows) {
      if (row.vote_tier && row.vote_tier in votesByTier) {
        votesByTier[row.vote_tier] += 1;
      }
      if (row.rsvp_status === "in") {
        rsvpCounts.in += 1;
        attendees.push({ name: row.name || "Someone" });
      } else if (row.rsvp_status === "maybe") {
        rsvpCounts.maybe += 1;
      } else if (row.rsvp_status === "out") {
        rsvpCounts.out += 1;
      }
    }

    return NextResponse.json({
      total: rows.length,
      votesByTier,
      rsvpCounts,
      attendees,
    });
  } catch (err) {
    console.error("[crew-response GET]", err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: "Something broke." }, { status: 500 });
  }
}
