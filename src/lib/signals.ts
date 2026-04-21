/**
 * TDF signal capture — self-contained port of the shared-engine + per-site
 * pattern from MOH commit 6f73e4b / BESTMAN commit 2995d4f. Feeds the
 * cross-site iterative-engine learning loop (project_iterative_engine_0415).
 *
 * Tables (Supabase project bzmehrytiudgmgdrdlkg, already provisioned):
 *   wp_plan_inputs, wp_surprise_me_actions, wp_plan_selections,
 *   wp_plan_bookmarks, wp_offer_clicks, wp_offer_conversions,
 *   wp_trip_room_activity, wp_acquisition_log, wp_signal_rate_limit
 *
 * Shared with MOH + BESTMAN — tag `brand: "tdf"` on every emit.
 */

import crypto from "crypto";
import { supabase } from "./supabase";

export type SignalTable =
  | "plan_inputs"
  | "surprise_me_actions"
  | "plan_selections"
  | "plan_bookmarks"
  | "offer_clicks"
  | "offer_conversions"
  | "trip_room_activity"
  | "acquisition_log";

export interface SignalPayload {
  brand: "tdf" | "moh" | "bestman";
  [key: string]: unknown;
}

/** Supabase table names are prefixed `wp_` so the three brands share one DB. */
export function resolveSignalTableName(table: SignalTable): string {
  return `wp_${table}`;
}

/** PII keys to scrub from any signal payload, recursively. */
const PII_KEYS = new Set([
  "email", "organizerEmail", "attendeeEmail", "attendeeEmails", "authPassword",
  "phone", "password", "ip", "ipAddress", "ssn", "address", "streetAddress",
  "organizerName", "attendees", "attendeeNames",
]);

export function stripPII(input: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(input)) {
    if (PII_KEYS.has(k)) continue;
    if (v && typeof v === "object" && !Array.isArray(v)) {
      out[k] = stripPII(v as Record<string, unknown>);
    } else if (Array.isArray(v)) {
      out[k] = v.map((item) =>
        item && typeof item === "object" && !Array.isArray(item)
          ? stripPII(item as Record<string, unknown>)
          : item
      );
    } else {
      out[k] = v;
    }
  }
  return out;
}

const SESSION_SALT = process.env.SIGNAL_SESSION_SALT || "tdf-moh-bestman-default-salt";

/** Stable per-day session id from IP + UA — rotates daily to limit tracking. */
export function computeSessionIdFromRequest(req: Request): string {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  const ua = req.headers.get("user-agent") || "unknown";
  const day = new Date().toISOString().slice(0, 10);
  return crypto
    .createHash("sha256")
    .update(`${SESSION_SALT}|${ip}|${ua}|${day}`)
    .digest("hex")
    .slice(0, 32);
}

/**
 * Fire-and-forget server-side signal write. Use inside API routes. Never
 * throws, never awaits — UX is never blocked by analytics.
 */
export function logSignalServer(
  req: Request,
  table: SignalTable,
  payload: SignalPayload
): void {
  if (!supabase) return;
  const sessionId = computeSessionIdFromRequest(req);
  const cleanPayload = stripPII(payload as Record<string, unknown>);
  void supabase
    .from(resolveSignalTableName(table))
    .insert({ session_id: sessionId, brand: payload.brand, payload: cleanPayload })
    .then(
      () => {},
      (err: unknown) => console.warn(`[signals-server] insert failed for ${table}:`, err)
    );
}
