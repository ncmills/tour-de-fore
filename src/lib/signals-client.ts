/**
 * TDF client-side signal emit helpers — local mirror of shared-engine's
 * client helpers (BMHQ/MOH use `shared-engine`; TDF is a standalone port).
 *
 * Kept separate from `signals.ts` (which imports node:crypto for the
 * server-side session hash) so none of that Node-only code lands in the
 * client bundle. All helpers are fire-and-forget: they POST to /api/signals,
 * auto-attach the `vid` cookie, and NEVER await or throw — analytics must
 * never block UX.
 */

import { getVid } from "./vid";
import type { SignalTable } from "./signals";

export type Brand = "tdf" | "moh" | "bestman";

export interface ClientSignalPayload {
  brand: Brand;
  vid?: string;
  [key: string]: unknown;
}

/**
 * Client-side fire-and-forget signal logger. Returns immediately; the network
 * request runs in the background and any failure is silently dropped. NEVER
 * awaited inside UI flow. `keepalive` lets the request survive navigation.
 */
export function logSignal(table: SignalTable, payload: ClientSignalPayload): void {
  try {
    void fetch("/api/signals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table, payload }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Total fallthrough — never break UX for analytics.
  }
}

/** A wizard/builder option toggle. `slot` is the field/category, `optionId`
 *  the chosen value, `action` pick vs un-pick, `dwellMs` optional step time. */
export function logSelection(
  brand: Brand,
  data: { slot: string; optionId?: string; action: "add" | "remove"; dwellMs?: number }
): void {
  logSignal("plan_selections", { brand, vid: getVid() ?? undefined, ...data });
}

/** A pin/save of an itinerary item. */
export function logBookmark(
  brand: Brand,
  data: { planId?: string; itemId: string; action: "add" | "remove" }
): void {
  logSignal("plan_bookmarks", { brand, vid: getVid() ?? undefined, ...data });
}

/** First-pageview acquisition beacon (referrer / UTM / coarse device). */
export function logAcquisition(
  brand: Brand,
  data: { ref?: string; utm?: Record<string, string>; device?: string; landing?: string }
): void {
  logSignal("acquisition_log", { brand, vid: getVid() ?? undefined, ...data });
}
