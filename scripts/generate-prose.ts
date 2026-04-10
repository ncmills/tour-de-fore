// TDF prose generation — calls Claude for each destination to produce a
// 400–600 word unique editorial overview that gives Google something to
// index beyond the templated card grids.
//
// Usage:
//   ANTHROPIC_API_KEY=... npx tsx scripts/generate-prose.ts          # all
//   ANTHROPIC_API_KEY=... npx tsx scripts/generate-prose.ts scottsdale-az  # one
//
// Output: src/data/prose-overview.json — keyed by destination id.
// Idempotent: skips destinations already present in the JSON file.

import Anthropic from "@anthropic-ai/sdk";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { allDestinations } from "../src/data";
import type { Destination } from "../src/data/types";

const OUTPUT_PATH = join(process.cwd(), "src/data/prose-overview.json");
const MODEL = "claude-sonnet-4-6";
const MAX_TOKENS = 1200;
const PARALLELISM = 4; // concurrent API calls

const SYSTEM_PROMPT = `You are an editorial writer for a golf trip planning site. You write
distinctive, specific, opinionated overviews of golf trip destinations
for groups of buddies. Your job is to make each destination feel like
its own world — never formulaic, never interchangeable with other cities.

Voice: confident, precise, slightly irreverent. The reader is a guy
planning a 3–4 day trip with 8–16 friends. They've already decided to
go on a trip; you're helping them choose where.

Hard rules:
- 400–600 words. Two or three paragraphs separated by blank lines.
- NO bullet lists, NO headers, NO markdown. Plain prose only.
- Mention 2–3 specific course names from the data. Mention 1–2
  specific lodging neighborhoods or restaurant/bar names if it lands
  naturally. Never enumerate everything — pick the most distinctive.
- Write about what makes THIS destination unique: terrain, weather
  rhythm, vacation rental scale, post-round culture, the specific
  combinations only this city offers. Avoid platitudes.
- Avoid every cliché about "buddy trips" and "epic golf" and "from
  tee times to bar tabs" — those phrases are everywhere on this site
  and need to NOT appear in the prose.
- Don't repeat the tagline or the existing description verbatim.
  Build on them with new specifics.
- Don't fabricate facts. Every concrete claim (course names, prices,
  neighborhoods, distances) must be supported by the data given.
- End the prose with a specific, useful closer about practical
  logistics or value — not a generic "you won't regret it."

Output ONLY the prose. No preamble, no wrapper, no quotes.`;

function buildPrompt(d: Destination): string {
  const topCourses = d.courses.slice(0, 5).map((c) =>
    `- ${c.name} (${c.tier}, ${c.style}, ${c.holes} holes, ${c.driveMinutes} min from city center, $${c.greenFeeRange[0]}–${c.greenFeeRange[1]} green fee): ${c.highlight}`
  ).join("\n");

  const topLodging = d.lodging.slice(0, 3).map((l) =>
    `- ${l.type} sleeping ${l.sleeps[0]}–${l.sleeps[1]}, $${l.nightlyRange[0]}–${l.nightlyRange[1]}/night, in ${l.areaDescription}: ${l.notes}`
  ).join("\n");

  const topDining = d.dining.slice(0, 5).map((s) =>
    `- ${s.name} (${s.style}, ${s.priceRange}, ${s.capacity} group): ${s.highlight}`
  ).join("\n");

  const topBars = d.bars.slice(0, 5).map((b) =>
    `- ${b.name} (${b.vibe}${b.lateNight ? ", late night" : ""}): ${b.highlight}`
  ).join("\n");

  const activities = d.activities.slice(0, 4).map((a) =>
    `- ${a.name} (${a.type})`
  ).join("\n");

  return `Write a 400–600 word editorial overview of ${d.city}, ${d.state} as a golf trip destination.

CONTEXT:
- Region: ${d.region}
- Population tier: ${d.population}
- Best seasons: ${d.bestSeasons.join(", ")}
- Nearest airport: ${d.nearestAirport.code} (${d.nearestAirport.driveMinutes} min drive)
- Existing tagline (don't repeat verbatim): "${d.tagline}"
- Existing description (don't repeat verbatim): "${d.description}"
${d.groceryNotes ? `- Grocery / alcohol logistics: ${d.groceryNotes}` : ""}

TOP COURSES:
${topCourses}

TOP LODGING:
${topLodging}

TOP DINING:
${topDining}

TOP BARS:
${topBars}

ACTIVITIES BEYOND GOLF:
${activities}

Write the prose now. Remember: 400–600 words, plain paragraphs, no markdown, distinctive voice for ${d.city} specifically.`;
}

interface ProseStore {
  [destinationId: string]: {
    prose: string;
    generatedAt: string;
    model: string;
  };
}

function loadStore(): ProseStore {
  if (!existsSync(OUTPUT_PATH)) return {};
  try {
    return JSON.parse(readFileSync(OUTPUT_PATH, "utf-8"));
  } catch {
    return {};
  }
}

function saveStore(store: ProseStore): void {
  writeFileSync(OUTPUT_PATH, JSON.stringify(store, null, 2) + "\n", "utf-8");
}

async function generateOne(
  client: Anthropic,
  d: Destination
): Promise<string> {
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: buildPrompt(d) }],
  });
  const block = response.content[0];
  if (block.type !== "text") {
    throw new Error(`unexpected response type: ${block.type}`);
  }
  return block.text.trim();
}

async function main(): Promise<void> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("ANTHROPIC_API_KEY not set");
    process.exit(1);
  }

  const targetId = process.argv[2];
  const store = loadStore();
  const client = new Anthropic({ apiKey });

  const targets = targetId
    ? allDestinations.filter((d) => d.id === targetId)
    : allDestinations.filter((d) => !store[d.id]);

  if (targets.length === 0) {
    console.log("[prose] nothing to generate (all destinations already have prose)");
    return;
  }

  console.log(`[prose] generating ${targets.length} destinations using ${MODEL}`);
  console.log(`[prose] parallelism: ${PARALLELISM}`);
  console.log(`[prose] output: ${OUTPUT_PATH}`);

  let done = 0;
  let failed = 0;
  const queue = [...targets];
  const inFlight = new Set<Promise<void>>();

  async function processNext(): Promise<void> {
    const dest = queue.shift();
    if (!dest) return;
    try {
      const prose = await generateOne(client, dest);
      const wordCount = prose.split(/\s+/).length;
      store[dest.id] = {
        prose,
        generatedAt: new Date().toISOString(),
        model: MODEL,
      };
      saveStore(store); // persist after every success for resumability
      done++;
      console.log(
        `[prose] ✓ ${dest.id.padEnd(30)} (${wordCount} words) [${done}/${targets.length}]`
      );
    } catch (err) {
      failed++;
      console.error(
        `[prose] ✗ ${dest.id.padEnd(30)} ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }

  // Worker pool — keeps PARALLELISM in flight at all times
  while (queue.length > 0 || inFlight.size > 0) {
    while (inFlight.size < PARALLELISM && queue.length > 0) {
      const p = processNext().finally(() => inFlight.delete(p));
      inFlight.add(p);
    }
    if (inFlight.size > 0) {
      await Promise.race(inFlight);
    }
  }

  console.log(`[prose] done — ${done} succeeded, ${failed} failed`);
}

main().catch((err) => {
  console.error("[prose] fatal:", err);
  process.exitCode = 1;
});
