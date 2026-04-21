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
} from "@/lib/plan-types";
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
import { validateWizardState } from "@/lib/validate";
import { addPlanToUser } from "@/lib/auth";
import { getRedis } from "@/lib/redis";
import { UNLIMITED_EMAILS, getMonthKey, getNextMonthReset } from "@/lib/shared-constants";
import { logSignalServer } from "@/lib/signals";

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
  try {
    const raw = await req.json();
    state = validateWizardState(raw);
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

  // Rate limit: 5 plans per IP per hour (bypass for admin / unlimited emails)
  if (!isUnlimited) {
    const ip = getClientIp(req);
    const rl = await rateLimit(`generate:${ip}`, 5, 3600);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: "Too many plans generated. Try again later." },
        { status: 429, headers: { "Retry-After": String(rl.resetIn) } }
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
              const plans = await generatePlansForDestination(client, state, context, priceTargets);
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
              for (const plan of Object.values(plans)) {
                if (!plan?.courses) continue;
                for (const course of plan.courses) {
                  const nc = normalize(course.name);
                  const dbCourse = pick.destination.courses.find((c) => {
                    const nd = normalize(c.name);
                    return nd === nc || nd.includes(nc) || nc.includes(nd);
                  });
                  if (dbCourse?.imageUrl) course.imageUrl = dbCourse.imageUrl;
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
        const storedPlan: StoredPlan = {
          id: planId,
          freePreviews,
          destinations,
          inputs: state,
          createdAt: new Date().toISOString(),
          emailsSent: false,
          paid: true, // all plans are fully unlocked
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
