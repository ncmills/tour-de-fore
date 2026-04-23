#!/usr/bin/env tsx
/**
 * enrich-places.ts — Google Places API enrichment batch for Tour de Fore
 *
 * Populates `googleRating` and `reviewCount` on non-course venue categories
 * (dining, bars, activities, lodging) across all destination data files,
 * writing results into a side-file at src/data/place-enrichment.json
 * (merged at read time by src/data/query.ts).
 *
 * WHY SIDE-JSON (not AST edit):
 *   - Neither ts-morph nor leven are installed; adding heavy deps for a one-
 *     shot enrichment script is not worth it.
 *   - Regex/string edits on 7 large destination TS files are brittle and
 *     irreversible; a side-file keeps source data clean.
 *   - The query.ts helper already merges overlays (prose-overlay); adding
 *     place-enrichment.json to that pattern is zero-cost.
 *
 * CATEGORIES COVERED:  dining | bars | activities | lodging
 * COURSES SKIPPED:     Golf courses already have ratings in source data.
 *                      Pass --force-overwrite to enrich courses too.
 *
 * FIELDS POPULATED:    googleRating, reviewCount
 * FIELDS NOT TOUCHED:  hypeTag, rankNote (reserved for manual / LLM curation)
 *
 * Usage:
 *   npx tsx scripts/enrich-places.ts --dry-run
 *   GOOGLE_PLACES_API_KEY=xxx npx tsx scripts/enrich-places.ts --city=scottsdale-az
 *   GOOGLE_PLACES_API_KEY=xxx npx tsx scripts/enrich-places.ts --all
 *   GOOGLE_PLACES_API_KEY=xxx npx tsx scripts/enrich-places.ts --all --resume
 *   GOOGLE_PLACES_API_KEY=xxx npx tsx scripts/enrich-places.ts --all --skip-enriched
 *   GOOGLE_PLACES_API_KEY=xxx npx tsx scripts/enrich-places.ts --all --force-overwrite
 *   GOOGLE_PLACES_API_KEY=xxx npx tsx scripts/enrich-places.ts --all --no-budget-cap
 */

import { promises as fs } from "node:fs";
import path from "node:path";

// ── Constants ────────────────────────────────────────────────────────────────

const REPO_ROOT = path.resolve(__dirname, "..");
const ENRICHMENT_JSON = path.join(REPO_ROOT, "src/data/place-enrichment.json");
const CACHE_DIR = path.join(REPO_ROOT, "scripts/.places-cache");
const PROGRESS_FILE = path.join(REPO_ROOT, "scripts/.places-progress.json");
const UNMATCHED_LOG = path.join(CACHE_DIR, "unmatched.jsonl");

/** Google Places Text Search v1 endpoint */
const PLACES_API = "https://places.googleapis.com/v1/places:searchText";
/** Fields we request (billed per field). */
const FIELD_MASK =
  "places.displayName,places.rating,places.userRatingCount,places.formattedAddress,places.websiteUri";

/** Requests per second (stay under free-tier burst). */
const REQ_PER_SEC = 10;
/** Places Text Search pricing: $32 per 1,000 requests (2024 pricing). */
const COST_PER_REQUEST = 32 / 1000;
/** Default budget cap in USD. Pass --no-budget-cap to disable. */
const BUDGET_CAP_USD = 25;
/** Min reviews to trust a result. */
const MIN_REVIEW_COUNT = 10;
/** Min fuzzy-match score (0–1) to accept a place. */
const MIN_MATCH_SCORE = 0.7;
/** Save progress every N venues. */
const SAVE_EVERY = 25;

// ── Types ────────────────────────────────────────────────────────────────────

type TdfCategory = "dining" | "bars" | "activities" | "lodging";

interface WorkItem {
  destinationId: string; // e.g. "scottsdale-az"
  category: TdfCategory;
  index: number;
  name: string;
  cityName: string;
  stateName: string;
  alreadyEnriched: boolean; // true when googleRating is set in source data
}

interface EnrichmentRecord {
  googleRating: number;
  reviewCount: number;
}

/** Keyed by `${destinationId}::${category}::${index}` */
type EnrichmentStore = Record<string, EnrichmentRecord>;

interface ProgressStore {
  completedKeys: string[];
  lastUpdated: string;
}

interface PlacesResult {
  displayName?: { text: string };
  rating?: number;
  userRatingCount?: number;
  formattedAddress?: string;
  websiteUri?: string;
}

// ── CLI Args ─────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run") || args.includes("--help");
const RUN_ALL = args.includes("--all");
const RESUME = args.includes("--resume");
const SKIP_ENRICHED = args.includes("--skip-enriched");
const FORCE_OVERWRITE = args.includes("--force-overwrite");
const NO_BUDGET_CAP = args.includes("--no-budget-cap");
const CITY_ARG = args.find((a) => a.startsWith("--city="))?.split("=")[1];
const COMMIT_ARG = !args.includes("--no-commit");

const API_KEY = process.env.GOOGLE_PLACES_API_KEY ?? "";

// ── Levenshtein (inline, no deps) ────────────────────────────────────────────

function levenshtein(a: string, b: string): number {
  const m = a.length,
    n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

/** Returns 0–1 similarity (1 = identical). */
function fuzzyScore(a: string, b: string): number {
  const na = a.toLowerCase().trim();
  const nb = b.toLowerCase().trim();
  if (na === nb) return 1;
  const dist = levenshtein(na, nb);
  return 1 - dist / Math.max(na.length, nb.length, 1);
}

// ── Data Loading ─────────────────────────────────────────────────────────────

interface RawVenueWithRating {
  name: string;
  googleRating?: number;
}

interface RawDestination {
  id: string;
  city: string;
  state: string;
  dining?: RawVenueWithRating[];
  bars?: RawVenueWithRating[];
  activities?: RawVenueWithRating[];
  // NOTE: LodgingOption has no `name` field — it describes a property type /
  // area rather than a named business. It cannot be looked up via Places API.
  // The overlay key space still supports "lodging" for any future manual
  // entries, but the script will not auto-enrich this category.
}

async function loadAllDestinations(): Promise<RawDestination[]> {
  // Dynamic import — works because tsx handles TS resolution at runtime.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mod = (await import("../src/data/index")) as any;
  return mod.allDestinations as RawDestination[];
}

function buildWorkQueue(
  destinations: RawDestination[],
  cityFilter?: string
): WorkItem[] {
  const queue: WorkItem[] = [];
  for (const dest of destinations) {
    if (cityFilter && dest.id !== cityFilter) continue;
    // Lodging is intentionally excluded: LodgingOption has no `name` field
    // (it describes a property type / area), so Places API lookup is not
    // possible. The overlay key space still supports "lodging" for any
    // future manual entries written directly to place-enrichment.json.
    const categories: Array<
      [TdfCategory, RawVenueWithRating[] | undefined]
    > = [
      ["dining", dest.dining],
      ["bars", dest.bars],
      ["activities", dest.activities],
    ];
    for (const [cat, venues] of categories) {
      if (!venues) continue;
      venues.forEach((v, i) => {
        queue.push({
          destinationId: dest.id,
          category: cat,
          index: i,
          name: v.name,
          cityName: dest.city,
          stateName: dest.state,
          alreadyEnriched: v.googleRating != null,
        });
      });
    }
  }
  return queue;
}

function itemKey(item: WorkItem): string {
  return `${item.destinationId}::${item.category}::${item.index}`;
}

// ── Cache helpers ────────────────────────────────────────────────────────────

function cacheSlug(item: WorkItem): string {
  return `${item.destinationId}--${item.category}--${item.index}`;
}

async function readCache(item: WorkItem): Promise<PlacesResult[] | null> {
  const file = path.join(CACHE_DIR, `${cacheSlug(item)}.json`);
  try {
    const raw = await fs.readFile(file, "utf-8");
    return JSON.parse(raw) as PlacesResult[];
  } catch {
    return null;
  }
}

async function writeCache(
  item: WorkItem,
  places: PlacesResult[]
): Promise<void> {
  await fs.mkdir(CACHE_DIR, { recursive: true });
  const file = path.join(CACHE_DIR, `${cacheSlug(item)}.json`);
  await fs.writeFile(file, JSON.stringify(places, null, 2));
}

async function logUnmatched(
  item: WorkItem,
  reason: string,
  candidate?: string
): Promise<void> {
  await fs.mkdir(CACHE_DIR, { recursive: true });
  const entry = {
    key: itemKey(item),
    name: item.name,
    city: item.cityName,
    state: item.stateName,
    reason,
    candidate,
    ts: new Date().toISOString(),
  };
  await fs.appendFile(UNMATCHED_LOG, JSON.stringify(entry) + "\n");
}

// ── Enrichment store (side-JSON) ─────────────────────────────────────────────

async function loadEnrichmentStore(): Promise<EnrichmentStore> {
  try {
    const raw = await fs.readFile(ENRICHMENT_JSON, "utf-8");
    return JSON.parse(raw) as EnrichmentStore;
  } catch {
    return {};
  }
}

async function saveEnrichmentStore(store: EnrichmentStore): Promise<void> {
  await fs.mkdir(path.dirname(ENRICHMENT_JSON), { recursive: true });
  await fs.writeFile(ENRICHMENT_JSON, JSON.stringify(store, null, 2));
}

// ── Progress tracking ────────────────────────────────────────────────────────

async function loadProgress(): Promise<Set<string>> {
  try {
    const raw = await fs.readFile(PROGRESS_FILE, "utf-8");
    const p = JSON.parse(raw) as ProgressStore;
    return new Set(p.completedKeys);
  } catch {
    return new Set();
  }
}

async function saveProgress(completed: Set<string>): Promise<void> {
  const p: ProgressStore = {
    completedKeys: [...completed],
    lastUpdated: new Date().toISOString(),
  };
  await fs.writeFile(PROGRESS_FILE, JSON.stringify(p, null, 2));
}

// ── Rate limiting ─────────────────────────────────────────────────────────────

const MIN_INTERVAL_MS = Math.ceil(1000 / REQ_PER_SEC);
let lastRequestTime = 0;

async function rateLimitedDelay(): Promise<void> {
  const now = Date.now();
  const elapsed = now - lastRequestTime;
  if (elapsed < MIN_INTERVAL_MS) {
    await new Promise((r) => setTimeout(r, MIN_INTERVAL_MS - elapsed));
  }
  lastRequestTime = Date.now();
}

/** Exponential back-off on 429. Returns null on final failure. */
async function fetchWithBackoff(
  query: string,
  apiKey: string,
  retries = 3
): Promise<PlacesResult[] | null> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    await rateLimitedDelay();
    let resp: Response;
    try {
      resp = await fetch(PLACES_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": FIELD_MASK,
        },
        body: JSON.stringify({ textQuery: query }),
      });
    } catch (err) {
      console.error(`  Network error: ${err}`);
      if (attempt < retries) {
        const delay = 2 ** attempt * 1000;
        await new Promise((r) => setTimeout(r, delay));
        continue;
      }
      return null;
    }

    if (resp.ok) {
      const data = (await resp.json()) as { places?: PlacesResult[] };
      return data.places ?? [];
    }

    if (resp.status === 429) {
      const delay = 2 ** attempt * 2000;
      console.warn(
        `  429 rate limit — backing off ${delay}ms (attempt ${attempt + 1}/${retries + 1})`
      );
      await new Promise((r) => setTimeout(r, delay));
      continue;
    }

    if (resp.status === 403) {
      const body = await resp.text();
      console.error(
        `\n  FATAL 403 — quota exhausted or API key invalid.\n  Body: ${body}`
      );
      console.error(
        `\n  To resume: GOOGLE_PLACES_API_KEY=xxx npx tsx scripts/enrich-places.ts --all --resume\n`
      );
      process.exit(1);
    }

    console.error(`  HTTP ${resp.status}: ${await resp.text()}`);
    return null;
  }
  return null;
}

// ── Commit helper ─────────────────────────────────────────────────────────────

async function commitCity(cityId: string, cityName: string): Promise<void> {
  if (!COMMIT_ARG) return;
  const { execSync } = await import("node:child_process");
  try {
    execSync(`git -C "${REPO_ROOT}" add src/data/place-enrichment.json`, {
      stdio: "inherit",
    });
    execSync(
      `git -C "${REPO_ROOT}" diff --cached --quiet || git -C "${REPO_ROOT}" commit -m "feat(data): enrich ${cityName} venues with Google Places ratings + review counts"`,
      { stdio: "inherit" }
    );
  } catch (err) {
    console.warn(`  Git commit failed (continuing): ${err}`);
  }
}

// ── Dry-run output ────────────────────────────────────────────────────────────

function printDryRun(queue: WorkItem[], store: EnrichmentStore): void {
  console.log(
    "\n═══════════════════════════════════════════════════════════"
  );
  console.log("  Tour de Fore — Google Places Enrichment — DRY RUN");
  console.log(
    "═══════════════════════════════════════════════════════════\n"
  );

  // Group by destination
  const byDest = new Map<string, WorkItem[]>();
  for (const item of queue) {
    const group = byDest.get(item.destinationId) ?? [];
    group.push(item);
    byDest.set(item.destinationId, group);
  }

  // Count already enriched: either in source data OR in the overlay JSON
  let alreadyInSource = 0;
  let alreadyInOverlay = 0;
  for (const item of queue) {
    if (item.alreadyEnriched) alreadyInSource++;
    else if (store[itemKey(item)]?.googleRating) alreadyInOverlay++;
  }
  const enrichedCount = alreadyInSource + alreadyInOverlay;
  const unenrichedCount = queue.length - enrichedCount;
  const estimatedCost = unenrichedCount * COST_PER_REQUEST;

  console.log(`  Destinations scanned:  ${byDest.size}`);
  console.log(`  Total venue slots:     ${queue.length}`);
  console.log(`  Already enriched:      ${enrichedCount} (${alreadyInSource} in source, ${alreadyInOverlay} in overlay)`);
  console.log(`  Pending API calls:     ${unenrichedCount}`);
  console.log(
    `  Estimated cost:        $${estimatedCost.toFixed(2)} USD`
  );
  console.log(
    `  Budget cap:            $${BUDGET_CAP_USD} (pass --no-budget-cap to disable)`
  );
  console.log(`  Rate limit:            ${REQ_PER_SEC} req/sec`);
  console.log(`  Min match score:       ${MIN_MATCH_SCORE}`);
  console.log(`  Min review count:      ${MIN_REVIEW_COUNT}`);
  console.log(`\n  Side-file output:      src/data/place-enrichment.json`);
  console.log(`  Cache dir:             scripts/.places-cache/`);
  console.log(
    `  Unmatched log:         scripts/.places-cache/unmatched.jsonl`
  );
  console.log(`\n  Fields populated:      googleRating, reviewCount`);
  console.log(`  Fields NOT touched:    hypeTag, rankNote (manual curation)`);
  console.log(`\n  NOTE: Golf courses are NOT in this queue — they already`);
  console.log(`        have ratings populated directly in source data files.`);

  console.log("\n  Enumeration preview (first 20 venues):");
  for (const item of queue.slice(0, 20)) {
    const key = itemKey(item);
    const status = item.alreadyEnriched
      ? "✓ source "
      : store[key]?.googleRating
      ? "✓ overlay"
      : "· pending";
    console.log(
      `    ${status}  [${item.destinationId}] ${item.category}[${item.index}] — ${item.name}`
    );
  }
  if (queue.length > 20) {
    console.log(`    ... and ${queue.length - 20} more`);
  }

  console.log("\n  Queue by category:");
  const cats: Record<string, { total: number; pending: number }> = {};
  for (const item of queue) {
    if (!cats[item.category])
      cats[item.category] = { total: 0, pending: 0 };
    cats[item.category].total++;
    if (!item.alreadyEnriched && !store[itemKey(item)]?.googleRating) {
      cats[item.category].pending++;
    }
  }
  for (const [cat, { total, pending }] of Object.entries(cats)) {
    console.log(
      `    ${cat.padEnd(12)} ${total.toString().padStart(4)} total   ${pending.toString().padStart(4)} pending`
    );
  }

  console.log(
    "\n  To run: GOOGLE_PLACES_API_KEY=xxx npx tsx scripts/enrich-places.ts --all"
  );
  console.log(
    "═══════════════════════════════════════════════════════════\n"
  );
}

// ── Main enrichment loop ──────────────────────────────────────────────────────

async function fetchAndEnrich(
  item: WorkItem,
  apiKey: string
): Promise<EnrichmentRecord | null> {
  // Try cache first
  let places = await readCache(item);

  if (!places) {
    const query = `${item.name} ${item.cityName} ${item.stateName}`;
    places = await fetchWithBackoff(query, apiKey);
    if (places !== null) {
      await writeCache(item, places);
    }
  }

  if (!places || places.length === 0) {
    await logUnmatched(item, "zero_results");
    return null;
  }

  // Find best matching place
  let best: PlacesResult | null = null;
  let bestScore = 0;
  for (const place of places) {
    const placeName = place.displayName?.text ?? "";
    const score = fuzzyScore(item.name, placeName);
    if (score > bestScore) {
      bestScore = score;
      best = place;
    }
  }

  if (!best || bestScore < MIN_MATCH_SCORE) {
    const candidate = best?.displayName?.text ?? "none";
    await logUnmatched(
      item,
      `low_match_score:${bestScore.toFixed(2)}`,
      candidate
    );
    return null;
  }

  const rating = best.rating;
  const reviewCount = best.userRatingCount;

  if (!rating || !reviewCount || reviewCount < MIN_REVIEW_COUNT) {
    await logUnmatched(
      item,
      `low_confidence (reviews=${reviewCount ?? 0})`
    );
    return null;
  }

  return { googleRating: Math.round(rating * 10) / 10, reviewCount };
}

// ── Entry point ───────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  // Guard: no API key in live mode
  if (!DRY_RUN && !API_KEY) {
    console.error(
      "\n  ERROR: GOOGLE_PLACES_API_KEY is not set.\n" +
        "  Get one at https://console.cloud.google.com/apis/credentials\n" +
        "  Then: GOOGLE_PLACES_API_KEY=xxx npx tsx scripts/enrich-places.ts --all\n"
    );
    process.exit(1);
  }

  if (!DRY_RUN && !RUN_ALL && !CITY_ARG) {
    console.error(
      "\n  ERROR: Must pass --dry-run, --all, or --city=<destination-id>.\n" +
        "  Examples:\n" +
        "    npx tsx scripts/enrich-places.ts --dry-run\n" +
        "    GOOGLE_PLACES_API_KEY=xxx npx tsx scripts/enrich-places.ts --city=scottsdale-az\n" +
        "    GOOGLE_PLACES_API_KEY=xxx npx tsx scripts/enrich-places.ts --all\n"
    );
    process.exit(1);
  }

  console.log("Loading destination data…");
  const destinations = await loadAllDestinations();
  const queue = buildWorkQueue(destinations, CITY_ARG);

  if (queue.length === 0) {
    console.error(
      CITY_ARG
        ? `  ERROR: No destination found with id "${CITY_ARG}". Check src/data/index.ts.`
        : "  ERROR: No destinations loaded. Check src/data/index.ts."
    );
    process.exit(1);
  }

  const store = await loadEnrichmentStore();

  // ── Dry run: print summary and exit ──
  if (DRY_RUN) {
    printDryRun(queue, store);
    return;
  }

  // ── Live run ──
  const progress = RESUME ? await loadProgress() : new Set<string>();
  let totalCost = 0;
  let processed = 0;
  let enriched = 0;
  let skipped = 0;

  // Identify distinct cities in this queue for per-city commit
  const cityOrder: string[] = [];
  const seenCities = new Set<string>();
  for (const item of queue) {
    if (!seenCities.has(item.destinationId)) {
      cityOrder.push(item.destinationId);
      seenCities.add(item.destinationId);
    }
  }

  let lastCommittedCity: string | null = null;

  console.log(
    `\nStarting enrichment: ${queue.length} venues across ${cityOrder.length} cities`
  );
  console.log(`Budget cap: $${NO_BUDGET_CAP ? "disabled" : BUDGET_CAP_USD}\n`);

  for (let qi = 0; qi < queue.length; qi++) {
    const item = queue[qi];
    const key = itemKey(item);

    // Budget check
    if (!NO_BUDGET_CAP && totalCost >= BUDGET_CAP_USD) {
      console.warn(
        `\n  Budget cap of $${BUDGET_CAP_USD} reached after ${processed} requests.` +
          `\n  Resume: GOOGLE_PLACES_API_KEY=xxx npx tsx scripts/enrich-places.ts --all --resume\n`
      );
      break;
    }

    // Skip already-completed (resume mode)
    if (RESUME && progress.has(key)) {
      skipped++;
      continue;
    }

    // Skip venues already enriched in source data (unless --force-overwrite)
    if (item.alreadyEnriched && !FORCE_OVERWRITE) {
      skipped++;
      continue;
    }

    // Skip already-enriched in overlay (--skip-enriched mode)
    if (SKIP_ENRICHED && store[key]?.googleRating && !FORCE_OVERWRITE) {
      skipped++;
      continue;
    }

    // Skip if overlay already has data and no --force-overwrite
    if (store[key]?.googleRating && !FORCE_OVERWRITE) {
      skipped++;
      continue;
    }

    // Fetch
    const result = await fetchAndEnrich(item, API_KEY);
    totalCost += COST_PER_REQUEST;
    processed++;

    if (result) {
      store[key] = result;
      enriched++;
      process.stdout.write(
        `  [${qi + 1}/${queue.length}] ${item.cityName} — ${item.name} ... ✓ ${result.googleRating}★ (${result.reviewCount.toLocaleString()} reviews)\n`
      );
    } else {
      process.stdout.write(
        `  [${qi + 1}/${queue.length}] ${item.cityName} — ${item.name} ... ✗ no match\n`
      );
    }

    progress.add(key);

    // Save progress every SAVE_EVERY venues
    if (processed % SAVE_EVERY === 0) {
      await saveEnrichmentStore(store);
      await saveProgress(progress);
      console.log(
        `  [checkpoint] saved ${enriched} enriched / $${totalCost.toFixed(2)} spent`
      );
    }

    // Per-city commit: commit when we finish the last item for a city
    const nextItem = queue[qi + 1];
    if (
      COMMIT_ARG &&
      (!nextItem || nextItem.destinationId !== item.destinationId) &&
      item.destinationId !== lastCommittedCity
    ) {
      await saveEnrichmentStore(store);
      await commitCity(item.destinationId, item.cityName);
      lastCommittedCity = item.destinationId;
    }
  }

  // Final save
  await saveEnrichmentStore(store);
  await saveProgress(progress);

  // Print summary
  console.log(
    "\n═══════════════════════════════════════════════════════════"
  );
  console.log("  Enrichment complete");
  console.log(`  Processed:   ${processed} API calls`);
  console.log(`  Enriched:    ${enriched} venues`);
  console.log(
    `  Skipped:     ${skipped} (already done or filtered)`
  );
  console.log(`  Total cost:  $${totalCost.toFixed(2)} USD`);
  console.log(`  Output:      src/data/place-enrichment.json`);
  console.log(`  Unmatched:   scripts/.places-cache/unmatched.jsonl`);
  console.log(
    "═══════════════════════════════════════════════════════════\n"
  );
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
