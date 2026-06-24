import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import {
  computeSessionIdFromRequest,
  resolveSignalTableName,
  stripPII,
  type SignalTable,
} from "@/lib/signals";
import { readVid, isValidVid } from "@/lib/vid";

/**
 * Signal capture endpoint — receives logSignal() emits (client + server),
 * scrubs PII, writes to Supabase. Always returns 204 — analytics must
 * never block UX. Rate limited 50/hr per session_id.
 */

const ALLOWED_TABLES: ReadonlySet<SignalTable> = new Set<SignalTable>([
  "plan_inputs",
  "surprise_me_actions",
  "plan_selections",
  "plan_bookmarks",
  "offer_clicks",
  "offer_conversions",
  "trip_room_activity",
  "acquisition_log",
]);

const HOUR_MS = 60 * 60 * 1000;
const SIGNALS_PER_HOUR = 50;

export async function POST(req: Request) {
  if (!supabase) {
    return new NextResponse(null, { status: 204 });
  }

  let body: { table?: string; payload?: Record<string, unknown> };
  try {
    body = await req.json();
  } catch {
    return new NextResponse(null, { status: 204 });
  }

  const { table, payload } = body;
  if (
    !table ||
    !ALLOWED_TABLES.has(table as SignalTable) ||
    !payload ||
    typeof payload !== "object"
  ) {
    return new NextResponse(null, { status: 204 });
  }

  const sessionId = computeSessionIdFromRequest(req);
  const brand = (payload as { brand?: string }).brand;
  if (brand !== "tdf" && brand !== "moh" && brand !== "bestman") {
    return new NextResponse(null, { status: 204 });
  }

  // Rate limit (best-effort, write-and-check)
  const hourBucket = new Date(Math.floor(Date.now() / HOUR_MS) * HOUR_MS).toISOString();
  try {
    const { data: existing } = await supabase
      .from("wp_signal_rate_limit")
      .select("count")
      .eq("session_id", sessionId)
      .eq("hour_bucket", hourBucket)
      .maybeSingle();
    if (existing && (existing as { count: number }).count >= SIGNALS_PER_HOUR) {
      return new NextResponse(null, { status: 204 });
    }
    await supabase.from("wp_signal_rate_limit").upsert(
      {
        session_id: sessionId,
        hour_bucket: hourBucket,
        count: ((existing as { count?: number } | null)?.count ?? 0) + 1,
      },
      { onConflict: "session_id,hour_bucket" }
    );
  } catch {
    // Rate-limit table missing or write failed — let the signal through.
  }

  const cleanPayload = stripPII(payload as Record<string, unknown>);
  // vid is the lead-gen join key — NOT PII (opaque UUID). stripPII preserves
  // it when the client includes it; backfill from the cookie otherwise so
  // every signal row is joinable to a visitor.
  const vid = isValidVid((payload as { vid?: unknown }).vid)
    ? (payload as { vid: string }).vid
    : readVid(req.headers.get("cookie"));
  if (vid) cleanPayload.vid = vid;
  try {
    await supabase.from(resolveSignalTableName(table as SignalTable)).insert({
      session_id: sessionId,
      brand,
      payload: cleanPayload,
    });
  } catch (err) {
    console.warn(`[signals] insert failed for ${table}:`, err);
  }
  return new NextResponse(null, { status: 204 });
}
