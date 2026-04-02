/**
 * TDF Engine Permutation Test — Tier 2: Live API Integration
 *
 * Hits /api/generate-plan for ~25 representative input combos.
 * Uses admin secret + unlimited email to bypass rate limits.
 * Parses NDJSON stream and validates full pipeline.
 *
 * Usage:
 *   npx tsx scripts/test-api.ts                              # localhost:3000
 *   npx tsx scripts/test-api.ts --base-url https://tourdefore.com  # production
 *   npx tsx scripts/test-api.ts --concurrency 3              # parallel requests
 */

import * as fs from "fs";
import * as path from "path";
import { buildWizardState, parseNDJSONStream, type ApiTestResult, type StreamMessage } from "./test-shared";
import type { WizardState } from "../src/lib/plan-types";

// ── Config ──

const args = process.argv.slice(2);
const baseUrlIdx = args.indexOf("--base-url");
const BASE_URL = baseUrlIdx >= 0 ? args[baseUrlIdx + 1] : "http://localhost:3000";
const concIdx = args.indexOf("--concurrency");
const CONCURRENCY = concIdx >= 0 ? parseInt(args[concIdx + 1], 10) : 2;
const ADMIN_SECRET = process.env.ADMIN_SECRET || "tdf-devils-2026";
const TIMEOUT_MS = 180_000; // 3 minutes max per test

console.log(`\nTDF Engine API Test Suite`);
console.log(`Base URL: ${BASE_URL}`);
console.log(`Concurrency: ${CONCURRENCY}`);
console.log(`Admin secret: ${ADMIN_SECRET.slice(0, 4)}...`);
console.log();

// ── Test Cases ──

interface ApiTestCase {
  name: string;
  overrides: Partial<WizardState>;
}

const TEST_CASES: ApiTestCase[] = [
  // 1-7: One per region (happy path)
  { name: "Region: Southwest", overrides: { region: "Southwest" } },
  { name: "Region: Pacific NW", overrides: { region: "Pacific NW", preferredSeason: "Summer" } },
  { name: "Region: Mountain West", overrides: { region: "Mountain West" } },
  { name: "Region: Midwest", overrides: { region: "Midwest" } },
  { name: "Region: Southeast", overrides: { region: "Southeast" } },
  { name: "Region: Northeast", overrides: { region: "Northeast" } },
  { name: "Region: South Central", overrides: { region: "South Central" } },

  // 8-10: Season coverage
  { name: "Spring + Southeast", overrides: { region: "Southeast", preferredSeason: "Spring" } },
  { name: "Summer + Pacific NW", overrides: { region: "Pacific NW", preferredSeason: "Summer" } },
  { name: "Fall + Midwest", overrides: { region: "Midwest", preferredSeason: "Fall" } },

  // 11-13: Group size edges
  { name: "Group=4 + Southwest", overrides: { region: "Southwest", groupSize: 4 } },
  { name: "Group=20 + Southeast", overrides: { region: "Southeast", groupSize: 20 } },
  { name: "Group=8 + Northeast", overrides: { region: "Northeast", groupSize: 8 } },

  // 14-17: Course quality sweep
  { name: "Cheap & fun + South Central", overrides: { region: "South Central", courseQuality: "Cheap & fun" } },
  { name: "Mix + Mountain West", overrides: { region: "Mountain West", courseQuality: "Mix of public & resort" } },
  { name: "Bucket list + Southeast", overrides: { region: "Southeast", courseQuality: "Bucket list only" } },
  { name: "Whatever + Pacific NW", overrides: { region: "Pacific NW", courseQuality: "Whatever fits budget", preferredSeason: "Summer" } },

  // 18-21: Activity tests
  { name: "Fishing + Southeast", overrides: { region: "Southeast", activities: ["Fishing"] } },
  { name: "Casino + Southwest", overrides: { region: "Southwest", activities: ["Casino"] } },
  { name: "[Brewery,Water] + Pacific NW", overrides: { region: "Pacific NW", activities: ["Brewery", "Water Sports"], preferredSeason: "Summer" } },
  { name: "[ATV,Shooting] + South Central", overrides: { region: "South Central", activities: ["ATV", "Shooting"] } },

  // 22-23: Budget extremes
  { name: "Budget $2K + Midwest", overrides: { region: "Midwest", budget: "$2K per person" } },
  { name: "Fat pockets + Southwest", overrides: { region: "Southwest", budget: "Fat pockets" } },

  // 24-25: Specific cities
  { name: "City: Scottsdale", overrides: { destinationType: "specific", destination: "Scottsdale", region: "" } },
  { name: "City: Charleston", overrides: { destinationType: "specific", destination: "Charleston", region: "" } },
];

// ── Semaphore for concurrency control ──

class Semaphore {
  private queue: (() => void)[] = [];
  private running = 0;
  constructor(private max: number) {}
  async acquire(): Promise<void> {
    if (this.running < this.max) {
      this.running++;
      return;
    }
    return new Promise((resolve) => {
      this.queue.push(() => { this.running++; resolve(); });
    });
  }
  release() {
    this.running--;
    const next = this.queue.shift();
    if (next) next();
  }
}

// ── Run single test ──

async function runTest(tc: ApiTestCase, index: number): Promise<ApiTestResult> {
  const state = buildWizardState(tc.overrides);
  const start = Date.now();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(`${BASE_URL}/api/generate-plan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-secret": ADMIN_SECRET,
      },
      body: JSON.stringify(state),
      signal: controller.signal,
    });

    if (!res.ok) {
      const text = await res.text();
      let errMsg = `HTTP ${res.status}`;
      try { errMsg = JSON.parse(text).error || errMsg; } catch {}
      return {
        name: tc.name,
        passed: false,
        duration: Date.now() - start,
        error: errMsg,
        messages: [],
      };
    }

    const messages = await parseNDJSONStream(res);
    const duration = Date.now() - start;

    const doneMsg = messages.find(m => m.type === "done");
    const errorMsg = messages.find(m => m.type === "error");
    const statusMsgs = messages.filter(m => m.type === "status");

    if (errorMsg) {
      return {
        name: tc.name,
        passed: false,
        duration,
        error: `${errorMsg.error} ${errorMsg.debug || ""}`.trim(),
        messages,
      };
    }

    if (!doneMsg || !doneMsg.planId) {
      return {
        name: tc.name,
        passed: false,
        duration,
        error: "No done message with planId received",
        messages,
      };
    }

    // Validate freePreviews structure
    const fp = doneMsg.freePreviews as Record<string, Record<string, unknown>> | undefined;
    const hasPreviews = fp &&
      fp.budget && fp.mid && fp.premium &&
      fp.budget.city && fp.mid.city && fp.premium.city;

    if (!hasPreviews) {
      return {
        name: tc.name,
        passed: false,
        duration,
        planId: doneMsg.planId,
        error: "freePreviews missing or incomplete",
        messages,
      };
    }

    const destinations = [
      fp.budget.city as string,
      fp.mid.city as string,
      fp.premium.city as string,
    ];

    return {
      name: tc.name,
      passed: true,
      duration,
      planId: doneMsg.planId,
      destinations,
      messages,
    };
  } catch (err) {
    return {
      name: tc.name,
      passed: false,
      duration: Date.now() - start,
      error: err instanceof Error ? err.message : String(err),
      messages: [],
    };
  } finally {
    clearTimeout(timeout);
  }
}

// ── Main ──

async function main() {
  const sem = new Semaphore(CONCURRENCY);
  const results: ApiTestResult[] = new Array(TEST_CASES.length);
  let completed = 0;

  const promises = TEST_CASES.map(async (tc, i) => {
    await sem.acquire();
    try {
      const result = await runTest(tc, i);
      results[i] = result;
      completed++;

      const status = result.passed ? "✓ PASS" : "✗ FAIL";
      const time = `${(result.duration / 1000).toFixed(1)}s`;
      const detail = result.passed
        ? `planId=${result.planId?.slice(0, 8)}... → ${result.destinations?.join(", ")}`
        : result.error;
      console.log(`[${String(completed).padStart(2)}/${TEST_CASES.length}] ${status} ${tc.name.padEnd(35)} ${time.padStart(6)}  ${detail}`);
    } finally {
      sem.release();
    }
  });

  await Promise.all(promises);

  // Summary
  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed);
  const avgTime = results.reduce((s, r) => s + r.duration, 0) / results.length / 1000;
  const warnings = results.filter(r => r.passed && r.duration > 120_000);

  console.log(`\n${"=".repeat(60)}`);
  console.log(`SUMMARY: ${passed}/${results.length} passed, ${failed.length} failed`);
  console.log(`Average time: ${avgTime.toFixed(1)}s`);

  if (warnings.length > 0) {
    console.log(`\n⚠ WARNINGS (>120s):`);
    for (const w of warnings) {
      console.log(`  - ${w.name}: ${(w.duration / 1000).toFixed(1)}s`);
    }
  }

  if (failed.length > 0) {
    console.log(`\n✗ FAILURES:`);
    for (const f of failed) {
      console.log(`  - ${f.name}: ${f.error}`);
    }
  }

  // Save results (strip verbose message arrays for readability)
  const outPath = path.join(__dirname, "test-results-api.json");
  const slimResults = results.map(r => ({
    name: r.name,
    passed: r.passed,
    duration: r.duration,
    planId: r.planId,
    destinations: r.destinations,
    error: r.error,
    messageCount: r.messages.length,
  }));
  fs.writeFileSync(outPath, JSON.stringify(slimResults, null, 2));
  console.log(`\nResults saved to ${outPath}`);

  process.exit(failed.length > 0 ? 1 : 0);
}

main().catch(err => {
  console.error("Fatal error:", err);
  process.exit(2);
});
