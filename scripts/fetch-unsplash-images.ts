/**
 * Build-time fetcher for Unsplash hero/banner images.
 *
 * Populates src/data/unsplash-cache.json across three surfaces:
 *   - destinations:   /golf-trips/[slug]                         (city + state landscape)
 *   - bachelorParty:  /golf-trips/[slug]/bachelor-party          (city nightlife/skyline)
 *   - guides:         /guides/[slug]                              (handpicked themes)
 *
 * Usage:
 *   npx tsx scripts/fetch-unsplash-images.ts            # default --limit=40
 *   npx tsx scripts/fetch-unsplash-images.ts --limit=20 # smaller batch
 *   npx tsx scripts/fetch-unsplash-images.ts --refetch  # refetch entries already in cache
 *
 * Rate-limit aware:
 *   - Skips slugs already in the cache (idempotent)
 *   - Sleeps 1 second between calls
 *   - Aborts gracefully when X-Ratelimit-Remaining drops below 5
 *   - Bounded per invocation by --limit
 *
 * Reads UNSPLASH_ACCESS_KEY from .env.local.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { allDestinations } from "../src/data/index";
import {
  searchUnsplash,
  UnsplashRateLimitError,
  type UnsplashCacheEntry,
} from "../src/lib/unsplash";

// ── Config ─────────────────────────────────────────────────────────

const CACHE_PATH = resolve(__dirname, "..", "src", "data", "unsplash-cache.json");
const ENV_PATH = resolve(__dirname, "..", ".env.local");
const SLEEP_MS = 1000;
const RATELIMIT_FLOOR = 5;
const DEFAULT_LIMIT = 40;

interface UnsplashCache {
  destinations: Record<string, UnsplashCacheEntry>;
  bachelorParty: Record<string, UnsplashCacheEntry>;
  guides: Record<string, UnsplashCacheEntry>;
}

type Surface = keyof UnsplashCache;

interface WorkItem {
  surface: Surface;
  key: string;
  query: string;
  /** Tried only if `query` returns no Unsplash results. */
  fallbackQuery?: string;
  label: string;
}

// Two-letter state code → full name. Used to expand fallback queries
// from "Mesquite NV landscape" → "Nevada desert landscape" when the
// city-specific query returns nothing on Unsplash.
const STATE_NAMES: Record<string, string> = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
  CO: "Colorado", CT: "Connecticut", DE: "Delaware", FL: "Florida", GA: "Georgia",
  HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa",
  KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland",
  MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi", MO: "Missouri",
  MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey",
  NM: "New Mexico", NY: "New York", NC: "North Carolina", ND: "North Dakota", OH: "Ohio",
  OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina",
  SD: "South Dakota", TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont",
  VA: "Virginia", WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming",
};

// ── Guide queries (handpicked thematic) ─────────────────────────────

const GUIDE_QUERIES: Record<string, string> = {
  "how-to-plan-a-group-golf-trip": "group golf friends",
  "best-golf-trip-destinations-by-month": "golf course seasons",
  "best-walkable-golf-courses": "links golf walking",
  "golf-trip-budget-guide": "golf bag fairway",
  "golf-trip-packing-list": "golf travel bag",
  "best-golf-trips-under-500": "affordable golf course",
  "desert-vs-coastal-vs-mountain-golf": "desert golf course sunset",
  "best-golf-destinations-for-large-groups": "golf foursome celebration",
  "top-bucket-list-golf-courses": "iconic golf course aerial",
  "first-time-golf-trip-mistakes": "golfer thinking fairway",
  "best-golf-trips-near-airports": "golf course aerial landscape",
  "best-fall-golf-trip-destinations": "fall golf course leaves",
};

// ── Bachelor party destinations (matches bachelor-party page logic) ─

const bachelorDests = allDestinations.filter(
  (d) => d.bars.length >= 3 && d.population !== "tiny",
);

// ── .env.local loader ──────────────────────────────────────────────

function loadEnvLocal(): Record<string, string> {
  if (!existsSync(ENV_PATH)) return {};
  const text = readFileSync(ENV_PATH, "utf8");
  const out: Record<string, string> = {};
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
}

// ── Cache helpers ───────────────────────────────────────────────────

function loadCache(): UnsplashCache {
  if (!existsSync(CACHE_PATH)) {
    return { destinations: {}, bachelorParty: {}, guides: {} };
  }
  try {
    const raw = JSON.parse(readFileSync(CACHE_PATH, "utf8")) as Partial<UnsplashCache>;
    return {
      destinations: raw.destinations || {},
      bachelorParty: raw.bachelorParty || {},
      guides: raw.guides || {},
    };
  } catch {
    return { destinations: {}, bachelorParty: {}, guides: {} };
  }
}

function saveCache(cache: UnsplashCache): void {
  writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2) + "\n", "utf8");
}

// ── Build work queue ────────────────────────────────────────────────

function buildWorkQueue(cache: UnsplashCache, refetch: boolean): WorkItem[] {
  const queue: WorkItem[] = [];

  for (const dest of allDestinations) {
    if (!refetch && cache.destinations[dest.id]) continue;
    const stateName = STATE_NAMES[dest.state] || dest.state;
    queue.push({
      surface: "destinations",
      key: dest.id,
      query: `${dest.city} ${dest.state} landscape`,
      fallbackQuery: `${stateName} landscape`,
      label: `${dest.city}, ${dest.state}`,
    });
  }

  for (const dest of bachelorDests) {
    if (!refetch && cache.bachelorParty[dest.id]) continue;
    const stateName = STATE_NAMES[dest.state] || dest.state;
    queue.push({
      surface: "bachelorParty",
      key: dest.id,
      query: `${dest.city} nightlife skyline`,
      fallbackQuery: `${stateName} downtown night`,
      label: `${dest.city} bachelor`,
    });
  }

  for (const [slug, query] of Object.entries(GUIDE_QUERIES)) {
    if (!refetch && cache.guides[slug]) continue;
    queue.push({
      surface: "guides",
      key: slug,
      query,
      label: `guide:${slug}`,
    });
  }

  return queue;
}

// ── Sleep ───────────────────────────────────────────────────────────

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

// ── Args ────────────────────────────────────────────────────────────

function parseArgs(): { limit: number; refetch: boolean } {
  let limit = DEFAULT_LIMIT;
  let refetch = false;
  for (const arg of process.argv.slice(2)) {
    if (arg === "--refetch") refetch = true;
    else if (arg.startsWith("--limit=")) limit = parseInt(arg.slice(8), 10);
    else if (arg === "--limit") {
      // handled separately if next arg
    }
  }
  // also support `--limit 40` form
  const idx = process.argv.indexOf("--limit");
  if (idx > 0 && process.argv[idx + 1]) {
    const v = parseInt(process.argv[idx + 1], 10);
    if (!Number.isNaN(v)) limit = v;
  }
  if (Number.isNaN(limit) || limit <= 0) limit = DEFAULT_LIMIT;
  return { limit, refetch };
}

// ── Main ────────────────────────────────────────────────────────────

async function main() {
  const env = loadEnvLocal();
  const accessKey = env.UNSPLASH_ACCESS_KEY || process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) {
    console.error("✘ UNSPLASH_ACCESS_KEY not found in .env.local or environment");
    process.exit(1);
  }

  const { limit, refetch } = parseArgs();
  const cache = loadCache();
  const queue = buildWorkQueue(cache, refetch);

  console.log(`Unsplash fetch — ${queue.length} pending, processing up to ${limit} this run`);
  console.log(
    `  cached: ${Object.keys(cache.destinations).length} destinations, ` +
      `${Object.keys(cache.bachelorParty).length} bachelor, ` +
      `${Object.keys(cache.guides).length} guides`,
  );

  if (queue.length === 0) {
    console.log("✓ Nothing to fetch — cache is up to date");
    return;
  }

  const batch = queue.slice(0, limit);
  let processed = 0;
  let aborted = false;

  for (const item of batch) {
    processed++;
    try {
      let result = await searchUnsplash(item.query, accessKey);
      let usedFallback = false;

      // If primary query returned nothing AND we still have plenty of budget,
      // try the broader fallback query (state-level instead of city-level).
      if (
        !result.entry &&
        item.fallbackQuery &&
        item.fallbackQuery !== item.query &&
        !Number.isNaN(result.ratelimitRemaining) &&
        result.ratelimitRemaining > RATELIMIT_FLOOR + 2
      ) {
        await sleep(SLEEP_MS);
        const fb = await searchUnsplash(item.fallbackQuery, accessKey);
        if (fb.entry) {
          result = fb;
          usedFallback = true;
        } else {
          // Update remaining count from the second call so the loop sees it
          result = { entry: null, ratelimitRemaining: fb.ratelimitRemaining };
        }
      }

      if (result.entry) {
        cache[item.surface][item.key] = result.entry;
        const tag = usedFallback ? "↻" : "✓";
        console.log(
          `  [${processed}/${batch.length}] ${item.label} ${tag} (${result.ratelimitRemaining} left)` +
            (usedFallback ? `  fallback: "${item.fallbackQuery}"` : ""),
        );
      } else {
        console.log(`  [${processed}/${batch.length}] ${item.label} — no results for "${item.query}"`);
      }

      // Save after every successful fetch so we never lose progress on a crash
      saveCache(cache);

      if (
        !Number.isNaN(result.ratelimitRemaining) &&
        result.ratelimitRemaining < RATELIMIT_FLOOR
      ) {
        console.log(
          `\n⚠  Stopping early — only ${result.ratelimitRemaining} requests left in the hourly budget`,
        );
        aborted = true;
        break;
      }
    } catch (err) {
      if (err instanceof UnsplashRateLimitError) {
        console.log(`\n⚠  Rate limit hit — try again in an hour`);
        aborted = true;
        break;
      }
      console.error(`  ✘ ${item.label}: ${err instanceof Error ? err.message : String(err)}`);
    }

    if (processed < batch.length) {
      await sleep(SLEEP_MS);
    }
  }

  saveCache(cache);

  const remaining = queue.length - processed;
  console.log(
    `\n✓ Done — ${processed} processed${aborted ? " (aborted early)" : ""}, ${remaining} still pending`,
  );
  if (remaining > 0) {
    console.log(`  Re-run \`npm run fetch:unsplash\` after the rate-limit window resets (~1 hour)`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
