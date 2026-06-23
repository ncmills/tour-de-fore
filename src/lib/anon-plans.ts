/**
 * Client-side tracking of plans an anonymous (no-account) user has generated.
 *
 * "Generate-first" lets anyone complete the wizard and see a full plan without
 * an account. We stash the resulting planIds in localStorage so that when the
 * user later registers or signs in, the front-end can hand those IDs to
 * `POST /api/claim-plans` and the plans show up in My Trips.
 *
 * Storage is best-effort and intentionally forgiving — a missing/blocked
 * localStorage (Safari private mode, etc.) just degrades to "no claim", never
 * an error. All functions are no-ops on the server.
 */

const KEY = "tdf-anon-plans";
const MAX = 25; // cap so a bot loop can't bloat localStorage

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

/** Read the list of locally-tracked anon planIds (newest last). */
export function getAnonPlanIds(): string[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((v): v is string => typeof v === "string");
  } catch {
    return [];
  }
}

/** Remember a planId generated without an account. */
export function addAnonPlanId(planId: string): void {
  if (!isBrowser() || !planId) return;
  try {
    const existing = getAnonPlanIds().filter((id) => id !== planId);
    existing.push(planId);
    const trimmed = existing.slice(-MAX);
    window.localStorage.setItem(KEY, JSON.stringify(trimmed));
  } catch {
    /* ignore */
  }
}

/** Clear the local list (call after a successful claim). */
export function clearAnonPlanIds(): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}

/**
 * Claim any locally-tracked anon plans for the now-signed-in user.
 * Safe to call unconditionally after register/login — no-ops when the list is
 * empty. Clears the local list on success so we don't re-POST forever.
 * Returns the number claimed (0 on any failure).
 */
export async function claimAnonPlans(): Promise<number> {
  const planIds = getAnonPlanIds();
  if (planIds.length === 0) return 0;
  try {
    const res = await fetch("/api/claim-plans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planIds }),
    });
    if (!res.ok) return 0;
    const data = await res.json().catch(() => ({}));
    // Clear regardless of how many were claimable — the ones that failed
    // (already owned by someone else, expired) won't become claimable later.
    clearAnonPlanIds();
    return typeof data.claimed === "number" ? data.claimed : 0;
  } catch {
    return 0;
  }
}
