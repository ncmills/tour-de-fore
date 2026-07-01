import { NextRequest, NextResponse } from "next/server";
import type Anthropic from "@anthropic-ai/sdk";
import { getAnthropicClient } from "@/lib/anthropic";

export const maxDuration = 300; // streaming responses bypass Vercel timeout
import {
  ThreeFreePreview,
  ThreePlanResult,
  ThreeDestinationResult,
  DestinationRecommendation,
  StoredPlan,
  PriceLevel,
  GeneratedPlan,
  WizardState,
  PlanCourse,
  PlanDining,
  PlanBar,
} from "@/lib/plan-types";
import { deriveLeadFields, type DeriveInput } from "@/lib/derive";
import { storePlan, storeAttendees, recordDestinationView } from "@/lib/kv";
import {
  getThreeDestinations,
  buildSystemPrompt,
  buildUserMessage,
  type PriceTargets,
} from "@/lib/planner-prompt";
import { buildDestinationContext, setPopularityScores } from "@/data/query";
import type { Destination } from "@/data/types";
import { getAllPopularityScores } from "@/lib/kv";
import { buildFreePreview } from "@/lib/free-plan";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { validateWizardState, validateNotifyEmail } from "@/lib/validate";
import { sendEmail, buildPlanReadyEmail } from "@/lib/email";
import { addPlanToUser } from "@/lib/auth";
import { getRedis } from "@/lib/redis";
import { UNLIMITED_EMAILS, getMonthKey, getNextMonthReset } from "@/lib/shared-constants";
import { logSignalServer } from "@/lib/signals";

/**
 * Parse TDF's freeform per-person budget label → a per-person USD ceiling.
 * TDF (unlike BMHQ/MOH's budget ids) stores labels like "$2K per person" /
 * "Fat pockets". Returns null for unknown / unbounded so est_spend_usd stays
 * null rather than multiplying a sentinel.
 */
function parseTdfPerPersonBudget(budget: string | undefined | null): number | null {
  if (!budget) return null;
  const s = budget.toLowerCase();
  // "$2K per person", "$4k", "$6K per person" → 2000/4000/6000.
  const k = s.match(/\$?\s*(\d+(?:\.\d+)?)\s*k\b/);
  if (k) return Math.round(parseFloat(k[1]) * 1000);
  // Plain dollar amount, e.g. "$2,500 per person".
  const dollars = s.match(/\$\s*([\d,]+)/);
  if (dollars) {
    const n = parseInt(dollars[1].replace(/,/g, ""), 10);
    if (Number.isFinite(n) && n > 0) return n;
  }
  // "Fat pockets" / "sky's the limit" → unbounded → unknown.
  return null;
}

/**
 * Map a TDF WizardState → the brand-agnostic DeriveInput consumed by
 * deriveLeadFields (A4). TDF has no tripYear (month only) and golf-specific
 * off-course fields; course quality / rounds / must-plays feed golfTokens.
 */
function wizardToDeriveInput(state: WizardState): DeriveInput {
  return {
    eventMonth: state.tripMonth || null,
    eventYear: null, // TDF wizard captures month only
    season: state.preferredSeason || null,
    groupSize: state.groupSize ?? null,
    perPersonBudgetUsd: parseTdfPerPersonBudget(state.budget),
    activityTokens: state.activities ?? [],
    lodgingTokens: state.lodging ? [state.lodging] : [],
    nightlifeTokens: state.nightlife ? [state.nightlife] : [],
    diningTokens: state.dining ?? [],
    golfTokens: [
      ...(state.courseQuality ? [state.courseQuality] : []),
      ...(state.roundsPerDay ? [state.roundsPerDay] : []),
      ...(state.mustPlayCourses ? [state.mustPlayCourses] : []),
      ...(state.walkingOrRiding ? [state.walkingOrRiding] : []),
    ],
  };
}

function tryParseJSON(jsonStr: string): unknown | null {
  // Strip markdown fences
  let s = jsonStr.trim();
  if (s.startsWith("```")) {
    s = s.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }

  // Direct parse
  try { return JSON.parse(s); } catch { /* fall through */ }

  // Strip trailing text after the last } (Haiku sometimes appends commentary)
  const lastBrace = s.lastIndexOf("}");
  if (lastBrace > 0 && lastBrace < s.length - 1) {
    const trimmed = s.slice(0, lastBrace + 1);
    try { return JSON.parse(trimmed); } catch { /* fall through */ }
  }

  // Try to repair truncated JSON by closing open brackets/braces
  let repaired = s;
  // Remove trailing partial key-value (e.g., `"key": "unclosed` or `"key":`)
  repaired = repaired.replace(/,\s*"[^"]*"?\s*:?\s*"?[^"]*$/, "");
  repaired = repaired.replace(/,\s*$/, "");

  const stack: string[] = [];
  let inString = false;
  let escape = false;
  for (const ch of repaired) {
    if (escape) { escape = false; continue; }
    if (ch === "\\") { escape = true; continue; }
    if (ch === '"') { inString = !inString; continue; }
    if (inString) continue;
    if (ch === "{") stack.push("}");
    else if (ch === "[") stack.push("]");
    else if (ch === "}" || ch === "]") stack.pop();
  }
  if (stack.length > 0) {
    repaired += stack.reverse().join("");
    try { return JSON.parse(repaired); } catch { /* fall through */ }
  }

  return null;
}

/** Compute tier-specific price targets from destination data */
function computePriceTargets(destination: Destination, groupSize: number, numberOfDays: number, roundsPerDay?: string): PriceTargets {
  const golfDays = Math.max(numberOfDays - 1, 1);
  const rpd = roundsPerDay === "One (18)" ? 1 : 2;
  const rounds = golfDays * rpd;
  const nights = numberOfDays + 1;
  const gs = Math.max(groupSize, 2);

  // Sort courses by avg fee
  const coursesByFee = [...destination.courses].sort(
    (a, b) => (a.greenFeeRange[0] + a.greenFeeRange[1]) / 2 - (b.greenFeeRange[0] + b.greenFeeRange[1]) / 2
  );
  // Budget: cheapest courses at low-end fees
  const budgetCourses = coursesByFee.slice(0, Math.max(3, Math.ceil(coursesByFee.length / 3)));
  const budgetAvgFee = budgetCourses.reduce((s, c) => s + c.greenFeeRange[0], 0) / budgetCourses.length;
  // Premium: most expensive courses at high-end fees
  const premCourses = coursesByFee.slice(-Math.max(3, Math.ceil(coursesByFee.length / 3)));
  const premAvgFee = premCourses.reduce((s, c) => s + c.greenFeeRange[1], 0) / premCourses.length;
  // Mid: midpoint
  const midAvgFee = coursesByFee.reduce((s, c) => s + (c.greenFeeRange[0] + c.greenFeeRange[1]) / 2, 0) / coursesByFee.length;

  // Lodging sorted by cost
  const lodgingByPrice = [...destination.lodging].sort(
    (a, b) => (a.nightlyRange[0] + a.nightlyRange[1]) / 2 - (b.nightlyRange[0] + b.nightlyRange[1]) / 2
  );
  const cheapLodging = lodgingByPrice[0];
  const expLodging = lodgingByPrice[lodgingByPrice.length - 1];
  const midLodging = lodgingByPrice[Math.floor(lodgingByPrice.length / 2)];

  const budgetLodgingPP = (cheapLodging.nightlyRange[0] * nights) / gs;
  const midLodgingPP = ((midLodging.nightlyRange[0] + midLodging.nightlyRange[1]) / 2 * nights) / gs;
  const premLodgingPP = (expLodging.nightlyRange[1] * nights) / gs;

  // Food estimates per tier
  const budgetFood = 50 * numberOfDays;
  const midFood = 75 * numberOfDays;
  const premFood = 120 * numberOfDays;

  // Extras (activities, transport)
  const budgetExtras = 100;
  const midExtras = 200;
  const premExtras = 400;

  const budgetTotal = Math.round(budgetAvgFee * rounds + budgetLodgingPP + budgetFood + budgetExtras);
  const midTotal = Math.round(midAvgFee * rounds + midLodgingPP + midFood + midExtras);
  const premTotal = Math.round(premAvgFee * rounds + premLodgingPP + premFood + premExtras);

  // Ensure minimum 20% gap between tiers
  const adjustedMid = Math.max(midTotal, Math.round(budgetTotal * 1.2));
  const adjustedPrem = Math.max(premTotal, Math.round(adjustedMid * 1.3));

  const fmt = (n: number) => `$${Math.round(n / 50) * 50}`;
  return {
    imp: `${fmt(budgetTotal * 0.9)}–${fmt(budgetTotal * 1.1)}`,
    devil: `${fmt(adjustedMid * 0.9)}–${fmt(adjustedMid * 1.1)}`,
    demonKing: `${fmt(adjustedPrem * 0.9)}–${fmt(adjustedPrem * 1.1)}`,
  };
}

async function generateSingleTier(
  client: Anthropic,
  state: Parameters<typeof buildUserMessage>[0],
  destinationContext: string,
  tier: "imp" | "devil" | "demonKing",
  priceTargets?: PriceTargets,
  attempt = 1
): Promise<GeneratedPlan> {
  // On final attempt: more tokens + lower temperature for deterministic output.
  // Bumped per MOH audit — 8k/10k was truncating. 11k/14k gives 30%+ headroom.
  const isLastAttempt = attempt >= 3;
  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: isLastAttempt ? 14000 : 11000,
    temperature: isLastAttempt ? 0.1 : 0.3,
    // Structured system block with ephemeral cache_control — 5-min TTL, ~90%
    // discount on cache-hit input tokens. Parallel tiers share the system
    // prompt so tiers 2+3 are cache hits.
    system: [
      { type: "text", text: buildSystemPrompt(destinationContext), cache_control: { type: "ephemeral" } },
    ],
    messages: [
      { role: "user", content: buildUserMessage(state, tier, priceTargets) },
      ...(attempt > 1 ? [{ role: "assistant" as const, content: "{" }] : []),
    ],
  });

  const cacheRead = (message.usage as { cache_read_input_tokens?: number }).cache_read_input_tokens || 0;
  const cacheWrite = (message.usage as { cache_creation_input_tokens?: number }).cache_creation_input_tokens || 0;
  console.log(`Claude [${tier}] attempt=${attempt}: model=${message.model} in=${message.usage.input_tokens} out=${message.usage.output_tokens} stop=${message.stop_reason} cacheR=${cacheRead} cacheW=${cacheWrite}`);

  const textBlock = message.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") throw new Error(`No text response for ${tier}`);

  if (message.stop_reason === "max_tokens") {
    console.warn(`${tier} hit max_tokens at ${message.usage.output_tokens} tokens`);
  }

  // On retries, we prefill "{" as assistant message — prepend it back
  const rawText = attempt > 1 ? "{" + textBlock.text : textBlock.text;
  const parsed = tryParseJSON(rawText);
  if (parsed) {
    const plan = parsed as GeneratedPlan;

    // Validate critical fields — retry on missing instead of silently filling defaults
    const missingFields = [
      !plan.lodging && "lodging",
      !Array.isArray(plan.courses) && "courses",
      !Array.isArray(plan.dining) && "dining",
      !Array.isArray(plan.bars) && "bars",
      !Array.isArray(plan.schedule) && "schedule",
      !plan.estimatedBudget && "estimatedBudget",
    ].filter(Boolean);

    if (missingFields.length > 0 && attempt < 3) {
      console.warn(`${tier} missing critical fields [${missingFields.join(", ")}], retrying (attempt ${attempt + 1})...`);
      return generateSingleTier(client, state, destinationContext, tier, priceTargets, attempt + 1);
    }

    // Normalize array fields (safe defaults only for non-critical optional fields)
    plan.courses = Array.isArray(plan.courses) ? plan.courses : [];
    plan.dining = Array.isArray(plan.dining) ? plan.dining : [];
    plan.bars = Array.isArray(plan.bars) ? plan.bars : [];
    plan.schedule = Array.isArray(plan.schedule) ? plan.schedule : [];
    plan.proTips = Array.isArray(plan.proTips) ? plan.proTips : [];
    plan.lodging = plan.lodging || { name: "Lodging TBD", type: "House", address: "", costPerNight: "$0", rationale: "" };
    plan.estimatedBudget = plan.estimatedBudget || { perPerson: "$0", breakdown: [] };
    plan.groupLogistics = plan.groupLogistics || { teeTimeStrategy: "", transport: "", packingList: [] };
    plan.numberOfDays = plan.numberOfDays || plan.schedule.length || 3;
    plan.groupSize = plan.groupSize || state.groupSize || 12;

    // Retry if critical array fields are empty (truncated JSON produced empty arrays)
    if ((plan.courses.length === 0 || plan.dining.length === 0 || plan.bars.length === 0) && attempt < 3) {
      const empty = [
        plan.courses.length === 0 && "courses",
        plan.dining.length === 0 && "dining",
        plan.bars.length === 0 && "bars",
      ].filter(Boolean).join(", ");
      console.warn(`${tier} has empty [${empty}] after parse, retrying (attempt ${attempt + 1})...`);
      return generateSingleTier(client, state, destinationContext, tier, priceTargets, attempt + 1);
    }
    return plan;
  }

  console.error(`JSON parse failed for ${tier} attempt=${attempt} (${message.usage.output_tokens} tokens, stop: ${message.stop_reason}). First 500 chars: ${textBlock.text.trim().slice(0, 500)}`);

  // Retry up to 3 attempts
  if (attempt < 3) {
    console.log(`Retrying ${tier} tier (attempt ${attempt + 1})...`);
    return generateSingleTier(client, state, destinationContext, tier, priceTargets, attempt + 1);
  }

  throw new Error(`Plan generation failed for ${tier} tier after ${attempt} attempts`);
}

/**
 * Validate that a parsed plan has the minimum content needed to render.
 * Any tier that fails this check triggers truncation-detection fallthrough.
 */
function planLooksComplete(p: GeneratedPlan, expectedDays: number): boolean {
  return (
    !!p.lodging &&
    Array.isArray(p.courses) && p.courses.length >= 2 &&
    Array.isArray(p.dining) && p.dining.length >= 3 &&
    Array.isArray(p.bars) && p.bars.length >= 2 &&
    Array.isArray(p.schedule) && p.schedule.length === expectedDays &&
    !!p.estimatedBudget
  );
}

async function generateAllTiersInOne(
  client: Anthropic,
  state: Parameters<typeof buildUserMessage>[0],
  destinationContext: string,
  priceTargets?: PriceTargets,
  attempt = 1
): Promise<ThreePlanResult | null> {
  const isLastAttempt = attempt >= 2;
  try {
    // Use streaming API — non-streaming `.create()` silently throws when
    // max_tokens ≥ 21333 (MOH audit 2026-04-11 caught this). Streaming also
    // bypasses the 10-min timeout ceiling. Semantically identical output.
    const stream = client.messages.stream({
      model: "claude-haiku-4-5-20251001",
      max_tokens: isLastAttempt ? 24000 : 20000,
      temperature: isLastAttempt ? 0.1 : 0.3,
      system: [
        { type: "text", text: buildSystemPrompt(destinationContext), cache_control: { type: "ephemeral" } },
      ],
      messages: [
        { role: "user", content: buildUserMessage(state, "allTiers", priceTargets) },
        ...(attempt > 1 ? [{ role: "assistant" as const, content: "[" }] : []),
      ],
    });
    const message = await stream.finalMessage();

    const cacheRead = (message.usage as { cache_read_input_tokens?: number }).cache_read_input_tokens || 0;
    const cacheWrite = (message.usage as { cache_creation_input_tokens?: number }).cache_creation_input_tokens || 0;
    console.log(`Claude [allTiers stream] attempt=${attempt}: model=${message.model} in=${message.usage.input_tokens} out=${message.usage.output_tokens} stop=${message.stop_reason} cacheR=${cacheRead} cacheW=${cacheWrite}`);

    const textBlock = message.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") return null;

    const rawText = attempt > 1 ? "[" + textBlock.text : textBlock.text;
    const parsed = tryParseJSON(rawText);

    if (Array.isArray(parsed) && parsed.length === 3) {
      const sanitize = (p: GeneratedPlan): GeneratedPlan => ({
        ...p,
        lodging: p.lodging || { name: "Lodging TBD", type: "House", address: "", costPerNight: "$0", rationale: "" },
        courses: Array.isArray(p.courses) ? p.courses : [],
        dining: Array.isArray(p.dining) ? p.dining : [],
        bars: Array.isArray(p.bars) ? p.bars : [],
        schedule: Array.isArray(p.schedule) ? p.schedule : [],
        proTips: Array.isArray(p.proTips) ? p.proTips : [],
        estimatedBudget: p.estimatedBudget || { perPerson: "$0", breakdown: [] },
        groupLogistics: p.groupLogistics || { teeTimeStrategy: "", transport: "", packingList: [] },
        numberOfDays: p.numberOfDays || p.schedule?.length || 3,
        groupSize: p.groupSize || state.groupSize || 12,
      });
      const imp = sanitize(parsed[0] as GeneratedPlan);
      const devil = sanitize(parsed[1] as GeneratedPlan);
      const demonKing = sanitize(parsed[2] as GeneratedPlan);

      // Truncation-detection fallthrough (MOH audit 2026-04-11): sanitize()
      // can silently fill defaults when max_tokens truncates tail tiers.
      // Validate every tier has minimum content before trusting the result.
      const expectedDays = state.numberOfDays || 3;
      const thinTiers = [
        !planLooksComplete(imp, expectedDays) && "imp",
        !planLooksComplete(devil, expectedDays) && "devil",
        !planLooksComplete(demonKing, expectedDays) && "demonKing",
      ].filter(Boolean);

      if (thinTiers.length > 0) {
        console.warn(`allTiers: thin tiers detected [${thinTiers.join(", ")}] — falling through`);
        if (attempt < 2) {
          return generateAllTiersInOne(client, state, destinationContext, priceTargets, attempt + 1);
        }
        return null; // fall through to per-tier path
      }

      return { imp, devil, demonKing };
    }

    if (attempt < 2) {
      console.log(`allTiers parse incomplete (got ${Array.isArray(parsed) ? parsed.length : 'non-array'}), retrying...`);
      return generateAllTiersInOne(client, state, destinationContext, priceTargets, attempt + 1);
    }
    return null;
  } catch (err) {
    console.error(`allTiers failed attempt=${attempt}:`, err);
    return null;
  }
}

async function generatePlansForDestination(
  client: Anthropic,
  state: Parameters<typeof buildUserMessage>[0],
  destinationContext: string,
  priceTargets?: PriceTargets
): Promise<ThreePlanResult> {
  // Parallel tiers is now the PRIMARY path — three 11k calls in parallel beat
  // one 20k call for wall-clock latency (~60-90s vs ~3min) and truncate less
  // often. The all-tiers batch is kept as the fallback for the rare case
  // where parallel hits Claude concurrency limits. Same flip MOH made on
  // 2026-04-21 (commit 20741c6).
  try {
    const [imp, devil, demonKing] = await Promise.all([
      generateSingleTier(client, state, destinationContext, "imp", priceTargets),
      generateSingleTier(client, state, destinationContext, "devil", priceTargets),
      generateSingleTier(client, state, destinationContext, "demonKing", priceTargets),
    ]);
    return { imp, devil, demonKing };
  } catch (err) {
    console.warn("Parallel tiers failed, falling back to batched allTiers:", err);
    const combined = await generateAllTiersInOne(client, state, destinationContext, priceTargets);
    if (combined) return combined;
    throw err;
  }
}

export async function POST(req: NextRequest) {
  // ── Pre-flight checks (fast, before streaming) ──

  // Validate input
  let state;
  let notifyEmail = "";
  try {
    const raw = await req.json();
    state = validateWizardState(raw);
    // Optional "email me when it's done" address — independent of the
    // organizer account email (anon users can request a notification without
    // creating an account). Empty/invalid is ignored downstream.
    notifyEmail = validateNotifyEmail(raw);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Invalid request" },
      { status: 400 }
    );
  }

  // Defense-in-depth array coercion (MOH audit 285ea23 — any request missing
  // an array-shaped field threw `TypeError: Cannot read properties of
  // undefined (reading 'length')` synchronously inside buildUserMessage).
  // validateWizardState already handles this but scripts / legacy clients
  // may bypass it — coerce here as a second line of defense.
  state.activities = Array.isArray(state.activities) ? state.activities : [];
  state.budgetPriorities = Array.isArray(state.budgetPriorities) ? state.budgetPriorities : [];
  state.attendees = Array.isArray(state.attendees) ? state.attendees : [];

  // If login mode and no name, fetch from stored profile
  if (!state.organizerName && state.organizerEmail) {
    const { getUserName } = await import("@/lib/auth");
    const storedName = await getUserName(state.organizerEmail);
    if (storedName) state.organizerName = storedName;
    else state.organizerName = "Trip Organizer";
  }

  const email = state.organizerEmail;
  const isAdminHeader = req.headers.get("x-admin-secret") === process.env.ADMIN_SECRET;
  const isUnlimited = isAdminHeader || (!!email && UNLIMITED_EMAILS.includes(email));

  // IP rate limit applies to EVERY non-unlimited request — this is the only
  // cost/abuse guard on the "generate-first" anonymous path (no account → no
  // monthly cap below). Logged-in users get both this AND the monthly cap.
  //   - 5 / IP / hour  (burst guard, unchanged)
  //   - 15 / IP / day  (sustained-spam guard — caps an anon IP that drips
  //     generations across hours; ~3 hours of full bursts)
  if (!isUnlimited) {
    const ip = getClientIp(req);
    const hourly = await rateLimit(`generate:${ip}`, 5, 3600);
    if (!hourly.allowed) {
      return NextResponse.json(
        { error: "Too many plans generated. Try again later." },
        { status: 429, headers: { "Retry-After": String(hourly.resetIn) } }
      );
    }
    const daily = await rateLimit(`generate-day:${ip}`, 15, 86400);
    if (!daily.allowed) {
      return NextResponse.json(
        { error: "Daily plan limit reached for this network. Try again tomorrow." },
        { status: 429, headers: { "Retry-After": String(daily.resetIn) } }
      );
    }
  }

  // Free tier: 3 plans per month (no paid tier right now)
  if (email && !isUnlimited) {
    const monthKey = getMonthKey();
    const countRaw = await getRedis().get(`user:${email}:plans:${monthKey}`);
    const count = countRaw ? parseInt(countRaw) : 0;
    if (count >= 3) {
      return NextResponse.json({
        error: "You've used your 3 free plans this month. Try again next month.",
        limitReached: true,
        plansUsed: count,
        resetsAt: getNextMonthReset(),
      }, { status: 429 });
    }
  }

  // Load popularity scores + pick destinations (fast, pure data)
  const { scores: popularity, viewCounts } = await getAllPopularityScores();
  setPopularityScores(popularity, viewCounts);

  const picks = getThreeDestinations(state);
  if (picks.length === 0) {
    return NextResponse.json(
      { error: "No destinations match your criteria. Try adjusting your preferences." },
      { status: 400 }
    );
  }

  // Build free previews (no Claude, instant)
  const previews = picks.map((pick) =>
    buildFreePreview(pick.destination, state, pick.priceLevel, pick.reasons)
  );
  const byLevel: Record<PriceLevel, typeof previews[0] | undefined> = {
    budget: previews.find((p) => p.priceLevel === "budget"),
    mid: previews.find((p) => p.priceLevel === "mid"),
    premium: previews.find((p) => p.priceLevel === "premium"),
  };
  const fallbackPreview = previews[0];
  const freePreviews: ThreeFreePreview = {
    budget: byLevel.budget || fallbackPreview,
    mid: byLevel.mid || fallbackPreview,
    premium: byLevel.premium || fallbackPreview,
  };

  // ── Stream the slow part (Claude generation) ──
  // Streaming keeps the Vercel function alive — no timeout.

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      // NDJSON terminalSent guard (MOH 9e26cea — stream ending without a
      // `done` or `error` event silently flipped the client back to the
      // wizard with no explanation). Every exit path must emit exactly one
      // terminal event; the finally block below fills in if none fired.
      let terminalSent = false;
      const send = (data: Record<string, unknown>) => {
        try {
          if (data.type === "done" || data.type === "error") terminalSent = true;
          controller.enqueue(encoder.encode(JSON.stringify(data) + "\n"));
        } catch {
          // Controller already closed — swallow; next iteration will no-op.
        }
      };

      // Send keepalive pings every 5s to prevent proxy/CDN timeouts
      const keepalive = setInterval(() => {
        send({ type: "ping" });
      }, 5000);

      try {
        send({ type: "status", message: "Scouting destinations..." });
        send({ type: "progress", pct: 8, stage: "scouting" });

        const client = getAnthropicClient();

        // Generate plans — deduplicate same-destination picks (specific city case)
        const uniqueCities = [...new Set(picks.map(p => p.destination.id))];
        send({ type: "status", message: `Building plans for ${[...new Set(picks.map(p => p.destination.city))].join(", ")}...` });
        send({ type: "progress", pct: 18, stage: "generating" });

        // Generate plans for each unique destination (max 2 concurrent to avoid Claude rate limits)
        const planCache = new Map<string, ThreePlanResult>();
        const MAX_CONCURRENT = 2;
        for (let i = 0; i < uniqueCities.length; i += MAX_CONCURRENT) {
          const batch = uniqueCities.slice(i, i + MAX_CONCURRENT);
          await Promise.all(
            batch.map(async (destId) => {
              const pick = picks.find(p => p.destination.id === destId)!;
              const context = buildDestinationContext(pick.destination);
              const priceTargets = computePriceTargets(pick.destination, state.groupSize, state.numberOfDays, state.roundsPerDay);
              // Enrich course data with imageUrl from destination database.
              // Name-normalize before match: lowercase, strip punctuation,
              // drop noise words ("the", "golf", "club", "course", "resort",
              // "links", "at"). Previous naive substring match was producing
              // a 3% hit rate (per audit-sample-plan vs 25% DB coverage) —
              // normalized match should recover most of the gap.
              const normalize = (s: string) =>
                s.toLowerCase()
                  .replace(/[^\p{L}\p{N}\s]/gu, " ")
                  .replace(/\b(the|golf|club|course|courses|resort|links|at)\b/g, "")
                  .replace(/\s+/g, " ")
                  .trim();
              // Fuzzy name match against a DB venue list (same normalization
              // the imageUrl enrichment uses). Empty normalized names (venue
              // was all noise words) fail closed to "matched" so we never drop
              // on a normalization artifact.
              const dbNameMatch = (name: string, dbNames: string[]): boolean => {
                const n = normalize(name);
                if (!n) return true;
                return dbNames.some((raw) => {
                  const nd = normalize(raw);
                  return !!nd && (nd === n || nd.includes(n) || n.includes(nd));
                });
              };

              // Deterministic geographic-hallucination guard (audit: a Monterey
              // plan listed Torrey Pines — a San Diego course ~330 mi away — as
              // "45 min south," with a fabricated drive-time itinerary). The
              // prompt already forbids cross-city venues; enforce it in CODE.
              // Every course/dining/bar the LLM names must exist in THIS
              // destination's DB list — drop the ones that don't, and enrich
              // surviving courses with the DB imageUrl on the same pass.
              const applyGuardsAndFixups = (plans: ThreePlanResult) => {
                const dbDiningNames = pick.destination.dining.map((r) => r.name);
                const dbBarNames = pick.destination.bars.map((b) => b.name);
                for (const plan of Object.values(plans)) {
                  if (!plan) continue;
                  if (Array.isArray(plan.courses)) {
                    plan.courses = plan.courses.filter((course: PlanCourse) => {
                      const nc = normalize(course.name);
                      const dbCourse = pick.destination.courses.find((c) => {
                        const nd = normalize(c.name);
                        return !!nc && (nd === nc || nd.includes(nc) || nc.includes(nd));
                      });
                      if (!dbCourse && nc) {
                        console.warn(`[venue-guard] dropped out-of-DB course "${course.name}" from ${pick.destination.id}`);
                        return false;
                      }
                      if (dbCourse?.imageUrl) course.imageUrl = dbCourse.imageUrl;
                      return true;
                    });
                  }
                  if (Array.isArray(plan.dining)) {
                    plan.dining = plan.dining.filter((d: PlanDining) => {
                      const ok = dbNameMatch(d.name, dbDiningNames);
                      if (!ok) console.warn(`[venue-guard] dropped out-of-DB dining "${d.name}" from ${pick.destination.id}`);
                      return ok;
                    });
                  }
                  if (Array.isArray(plan.bars)) {
                    plan.bars = plan.bars.filter((b: PlanBar) => {
                      const ok = dbNameMatch(b.name, dbBarNames);
                      if (!ok) console.warn(`[venue-guard] dropped out-of-DB bar "${b.name}" from ${pick.destination.id}`);
                      return ok;
                    });
                  }
                }

                // Strip any `lodging.url` Claude hallucinated — prompt says
                // never include it but 76% of stored plans (pre-audit) had
                // one anyway. Belt + suspenders: prompt rule + post-parse
                // sanitization so bogus URLs never reach the client.
                for (const plan of Object.values(plans)) {
                  if (plan?.lodging && "url" in plan.lodging) {
                    delete (plan.lodging as { url?: string }).url;
                  }
                }

                // Budget-range normalizer (audit: LLM emitted inverted ranges
                // like "$250–$150" in the estimatedBudget breakdown). Deterministic
                // swap so every "$A–$B" reads low→high. Line-item ↔ headline
                // reconciliation is left to the LLM (price targets already anchor
                // it); this only fixes the safe, unambiguous inversion.
                const fixRange = (s: string): string =>
                  s.replace(
                    /\$\s*([\d,]+)\s*[–-]\s*\$?\s*([\d,]+)/g,
                    (whole, a: string, b: string) => {
                      const na = parseInt(a.replace(/,/g, ""), 10);
                      const nb = parseInt(b.replace(/,/g, ""), 10);
                      if (Number.isFinite(na) && Number.isFinite(nb) && na > nb) {
                        return `$${b}–$${a}`;
                      }
                      return whole;
                    }
                  );
                for (const plan of Object.values(plans)) {
                  const eb = plan?.estimatedBudget;
                  if (!eb) continue;
                  if (typeof eb.perPerson === "string") eb.perPerson = fixRange(eb.perPerson);
                  if (Array.isArray(eb.breakdown)) {
                    for (const li of eb.breakdown) {
                      if (li && typeof li.perPerson === "string") li.perPerson = fixRange(li.perPerson);
                    }
                  }
                }
              };

              // Course-count of the thinnest tier after the venue-guard runs.
              // planLooksComplete requires courses.length >= 2; keep this in sync.
              const MIN_TIER_COURSES = 2;
              const thinnestTierCourses = (plans: ThreePlanResult) =>
                Math.min(
                  ...Object.values(plans).map((p) => (Array.isArray(p?.courses) ? p.courses.length : 0))
                );

              // Edge case [fix/tdf-venue-guard-thin]: the completeness check
              // (planLooksComplete, courses.length >= 2) runs DURING generation,
              // BEFORE the venue-guard below drops out-of-DB (cross-city)
              // courses. A mostly-hallucinated tier can therefore PASS
              // completeness and then be thinned below the minimum by the
              // guard, rendering a thin plan. Belt-and-suspenders: after the
              // guard, if any tier fell below MIN_TIER_COURSES, regenerate once
              // (reusing the existing retry path) and keep whichever generation
              // left the thinnest tier fullest. Not observed in practice (real
              // DB courses dominate) — this is defensive.
              let plans = await generatePlansForDestination(client, state, context, priceTargets);
              applyGuardsAndFixups(plans);
              if (thinnestTierCourses(plans) < MIN_TIER_COURSES) {
                console.warn(`[venue-guard] ${pick.destination.id}: a tier fell to ${thinnestTierCourses(plans)} course(s) after guard (min ${MIN_TIER_COURSES}) — regenerating once`);
                const retry = await generatePlansForDestination(client, state, context, priceTargets);
                applyGuardsAndFixups(retry);
                // Graceful fallback: prefer whichever run left more courses in
                // its thinnest tier (retry may also thin, or thin worse).
                if (thinnestTierCourses(retry) > thinnestTierCourses(plans)) plans = retry;
              }
              planCache.set(destId, plans);
            })
          );
        }

        const recommendations = picks.map((pick) => ({
          destinationId: pick.destination.id,
          city: pick.destination.city,
          state: pick.destination.state,
          tagline: pick.destination.tagline,
          priceLevel: pick.priceLevel,
          plans: planCache.get(pick.destination.id)!,
        } satisfies DestinationRecommendation));

        send({ type: "progress", pct: 82, stage: "enriching" });
        send({ type: "status", message: "Saving your trip..." });
        send({ type: "progress", pct: 94, stage: "saving" });

        // Build destinations result
        const destByLevel: Record<PriceLevel, DestinationRecommendation | undefined> = {
          budget: recommendations.find((r) => r.priceLevel === "budget"),
          mid: recommendations.find((r) => r.priceLevel === "mid"),
          premium: recommendations.find((r) => r.priceLevel === "premium"),
        };
        const fallbackRec = recommendations[0];

        const destinations: ThreeDestinationResult | undefined = recommendations.length > 0 ? {
          budget: destByLevel.budget || fallbackRec,
          mid: destByLevel.mid || fallbackRec,
          premium: destByLevel.premium || fallbackRec,
        } : undefined;

        // Record monthly plan usage
        if (email && !UNLIMITED_EMAILS.includes(email)) {
          const monthKey = getMonthKey();
          const redisKey = `user:${email}:plans:${monthKey}`;
          const pipe = getRedis().pipeline();
          pipe.incr(redisKey);
          pipe.expire(redisKey, 60 * 60 * 24 * 35); // ~35 days TTL
          await pipe.exec();
        }

        // Store plan — all plans are fully unlocked (no paywall)
        const planId = crypto.randomUUID();
        // A4: derive scoreable lead scalars from the wizard inputs so the
        // (later) capture path can read them back by planId/vid. Additive +
        // best-effort — a derivation slip must never void a generated plan.
        let derived: StoredPlan["derived"];
        try {
          derived = deriveLeadFields(wizardToDeriveInput(state), new Date());
        } catch (err) {
          console.warn("[leadgen] deriveLeadFields failed (non-fatal):", err);
        }
        const storedPlan: StoredPlan = {
          id: planId,
          freePreviews,
          destinations,
          inputs: state,
          createdAt: new Date().toISOString(),
          emailsSent: false,
          paid: true, // all plans are fully unlocked
          ...(derived ? { derived } : {}),
        };

        await storePlan(storedPlan);

        // Iterative-engine signal: record wizard inputs + selected destinations
        // (PII stripped) for the cross-site learning loop. Fire-and-forget.
        logSignalServer(req, "plan_inputs", {
          brand: "tdf",
          planId,
          destinationType: state.destinationType,
          region: state.destinationType === "region" ? state.region : undefined,
          specificCity: state.destinationType === "specific" ? state.destination : undefined,
          numberOfDays: state.numberOfDays,
          groupSize: state.groupSize,
          skillMix: state.skillMix,
          ageRange: state.ageRange,
          roundsPerDay: state.roundsPerDay,
          courseQuality: state.courseQuality,
          walkingOrRiding: state.walkingOrRiding,
          handicap: state.handicap || undefined,
          lodging: state.lodging,
          dining: state.dining,
          nightlife: state.nightlife,
          activities: state.activities,
          budget: state.budget,
          budgetPriorities: state.budgetPriorities,
          flexible: state.flexible,
          preferredSeason: state.preferredSeason,
          tripMonth: state.tripMonth,
          pickedCities: picks.map((p) => ({ city: p.destination.city, state: p.destination.state, priceLevel: p.priceLevel })),
        });

        // Store organizer + any attendees from the wizard
        const allAttendees = [
          { name: state.organizerName, email },
          ...(state.attendees || []).filter((a) => a.email && a.email !== email),
        ];
        await storeAttendees(planId, allAttendees);

        if (email) {
          await addPlanToUser(email, planId);
        }

        for (const preview of previews) {
          await recordDestinationView(preview.destinationId, state);
        }

        // "Email me the plan when it's ready" — fire here, while the server
        // function is alive, so it delivers even if the user closed the tab
        // during the 60-250s generation. Best-effort & non-fatal: a Resend
        // hiccup must NEVER break the stream or fail the generation. Sent at
        // most once (this path runs once per successful generation). Only when
        // the plan actually has destination data to render in the email.
        if (notifyEmail && storedPlan.destinations) {
          try {
            const isOrganizer = !!email && notifyEmail === email;
            const { subject, html } = buildPlanReadyEmail(storedPlan, { isOrganizer });
            await sendEmail({ to: notifyEmail, subject, html }); // swallows its own errors
          } catch (notifyErr) {
            console.error("notifyEmail send failed (non-fatal):", notifyErr);
          }
        }

        // Final result
        send({ type: "done", planId, freePreviews });
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : String(err);
        const errName = err instanceof Error ? err.constructor.name : "Unknown";
        const statusCode = err instanceof Error && "status" in err ? (err as Error & { status: number }).status : "";
        console.error(`Plan generation error [${errName}] (${statusCode}): ${errMsg}`);
        if (err instanceof Error && err.stack) console.error(err.stack);
        send({ type: "error", error: "Failed to generate plan. Please try again.", debug: `${errName}: ${errMsg}` });
      } finally {
        clearInterval(keepalive);
        // Terminal-event guarantee — if nothing fired (unexpected crash,
        // Vercel function timeout kill, uncaught error past the catch
        // boundary), emit a final error so the client doesn't silently
        // revert to the wizard with no signal.
        if (!terminalSent) {
          try {
            controller.enqueue(encoder.encode(JSON.stringify({
              type: "error",
              error: "Plan generation timed out or was interrupted. Try again.",
            }) + "\n"));
          } catch {
            // Controller already closed — nothing to do.
          }
        }
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson",
      "Cache-Control": "no-cache, no-transform",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
