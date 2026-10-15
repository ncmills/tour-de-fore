/**
 * Build-time sync: pull the shared image cache from GitHub and project
 * the `tdf/*` slice into the legacy `src/data/unsplash-cache.json` shape
 * that the existing pages already import.
 *
 * Runs as `prebuild` so production builds always have the latest entries.
 *
 * Source of truth: https://github.com/ncmills/shared-image-cache
 */

import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const CACHE_URL =
  "https://raw.githubusercontent.com/ncmills/shared-image-cache/main/cache.json";

// Plan 7a (G28): shared-image-cache is going private. When GH_SHARED_READ_TOKEN is
// set the raw fetch logs in with it; unset, the fetch stays anonymous, which works
// only while the repo is public. A 401/404 with no token names the fix.
function authHeaders(env: NodeJS.ProcessEnv = process.env): Record<string, string> {
  const token = env.GH_SHARED_READ_TOKEN;
  return token ? { Authorization: `token ${token}` } : {};
}

function privateHint(status: number, env: NodeJS.ProcessEnv = process.env): string {
  return (status === 401 || status === 404) && !env.GH_SHARED_READ_TOKEN
    ? " (shared-image-cache may be private; set GH_SHARED_READ_TOKEN)"
    : "";
}
const OUT_PATH = resolve(__dirname, "..", "src", "data", "unsplash-cache.json");

interface CacheEntry {
  url: string;
  alt: string;
  photographerName: string;
  photographerUrl: string;
  unsplashUrl: string;
  query: string;
  fetchedAt: string;
  addedBy: string;
}

interface LegacyCache {
  destinations: Record<string, CacheEntry>;
  bachelorParty: Record<string, CacheEntry>;
  guides: Record<string, CacheEntry>;
}

async function main() {
  console.log(`[sync-image-cache] fetching ${CACHE_URL}`);
  let res: Response;
  try {
    res = await fetch(CACHE_URL, { cache: "no-store", headers: authHeaders() });
  } catch (err) {
    console.warn(
      `[sync-image-cache] network error — keeping existing cache: ${err instanceof Error ? err.message : err}`,
    );
    return;
  }
  if (!res.ok) {
    console.warn(
      `[sync-image-cache] HTTP ${res.status}${privateHint(res.status)} — keeping existing cache`,
    );
    return;
  }

  const sharedCache = (await res.json()) as Record<string, CacheEntry>;

  const legacy: LegacyCache = {
    destinations: {},
    bachelorParty: {},
    guides: {},
  };

  let migrated = 0;
  for (const [key, entry] of Object.entries(sharedCache)) {
    const parts = key.split("/");
    if (parts[0] !== "tdf") continue;
    const category = parts[1];
    const slug = parts.slice(2).join("/");
    if (category === "destinations") {
      legacy.destinations[slug] = entry;
      migrated++;
    } else if (category === "bachelorParty") {
      legacy.bachelorParty[slug] = entry;
      migrated++;
    } else if (category === "guides") {
      legacy.guides[slug] = entry;
      migrated++;
    }
  }

  writeFileSync(OUT_PATH, JSON.stringify(legacy, null, 2) + "\n", "utf8");
  console.log(
    `[sync-image-cache] wrote ${migrated} tdf entries to src/data/unsplash-cache.json ` +
      `(${Object.keys(legacy.destinations).length}d / ${Object.keys(legacy.bachelorParty).length}b / ${Object.keys(legacy.guides).length}g)`,
  );
}

main().catch((err) => {
  console.error(err);
  // Don't fail the build — the existing cache file is still on disk
  process.exit(0);
});
