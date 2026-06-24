/**
 * First-party visitor id (`vid`) — local copy for Tour de Fore.
 *
 * TDF is a standalone port and does not depend on the `shared-engine`
 * package (which is the canonical source of this primitive for BMHQ/MOH),
 * so the same logic is mirrored here. Keep the two in sync if either changes.
 *
 * The `vid` is a random v4 UUID set as a long-lived first-party cookie by
 * middleware. It carries NO identity content — an opaque random token — so it
 * is explicitly NOT PII and must never be scrubbed. It is the join key that
 * connects anonymous behavior (signal session) ↔ anonymous plans (planId) ↔
 * captured email (wp_leads), so a full behavioral profile can be attached to
 * an email at the moment of capture.
 *
 * Isomorphic: no imports; relies only on the global Web Crypto API.
 */

/** Cookie name. Stable — changing it orphans existing visitors. */
export const VID_COOKIE = "wp_vid";

/** ~13 months in seconds. */
export const VID_MAX_AGE = 60 * 60 * 24 * 400;

const VID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/** True when `v` is a well-formed v4 UUID. */
export function isValidVid(v: unknown): v is string {
  return typeof v === "string" && VID_RE.test(v);
}

/** Mint a new visitor id. */
export function newVid(): string {
  return globalThis.crypto.randomUUID();
}

/**
 * Read the `vid` out of a raw Cookie header (server) or `document.cookie`
 * (client). Returns null when absent or malformed.
 */
export function readVid(cookieHeader: string | null | undefined): string | null {
  if (!cookieHeader) return null;
  for (const part of cookieHeader.split(";")) {
    const eq = part.indexOf("=");
    if (eq === -1) continue;
    if (part.slice(0, eq).trim() !== VID_COOKIE) continue;
    const value = decodeURIComponent(part.slice(eq + 1).trim());
    return isValidVid(value) ? value : null;
  }
  return null;
}
