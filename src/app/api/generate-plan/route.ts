import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

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
} from "@/lib/planner-prompt";
import { buildDestinationContext, setPopularityScores } from "@/data/query";
import { getAllPopularityScores } from "@/lib/kv";
import { buildFreePreview } from "@/lib/free-plan";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { validateWizardState } from "@/lib/validate";
import {
  canGenerateFreePlan,
  recordFreePlanGeneration,
  addPlanToUser,
  isSubscribed,
} from "@/lib/auth";

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

async function generateSingleTier(
  client: Anthropic,
  state: Parameters<typeof buildUserMessage>[0],
  destinationContext: string,
  tier: "imp" | "devil" | "demonKing",
  attempt = 1
): Promise<GeneratedPlan> {
  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 8000,
    temperature: 0.3,
    system: buildSystemPrompt(destinationContext),
    messages: [{ role: "user", content: buildUserMessage(state, tier) }],
  });

  console.log(`Claude [${tier}] attempt=${attempt}: model=${message.model} in=${message.usage.input_tokens} out=${message.usage.output_tokens} stop=${message.stop_reason}`);

  const textBlock = message.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") throw new Error(`No text response for ${tier}`);

  if (message.stop_reason === "max_tokens") {
    console.warn(`${tier} hit max_tokens at ${message.usage.output_tokens} tokens`);
  }

  const parsed = tryParseJSON(textBlock.text);
  if (parsed) return parsed as GeneratedPlan;

  console.error(`JSON parse failed for ${tier} attempt=${attempt} (${message.usage.output_tokens} tokens, stop: ${message.stop_reason}). First 500 chars: ${textBlock.text.trim().slice(0, 500)}`);

  // Retry up to 3 attempts
  if (attempt < 3) {
    console.log(`Retrying ${tier} tier (attempt ${attempt + 1})...`);
    return generateSingleTier(client, state, destinationContext, tier, attempt + 1);
  }

  throw new Error(`Plan generation failed for ${tier} tier after ${attempt} attempts`);
}

async function generatePlansForDestination(
  client: Anthropic,
  state: Parameters<typeof buildUserMessage>[0],
  destinationContext: string
): Promise<ThreePlanResult> {
  // Generate all 3 tiers in parallel — each fits in 8K tokens
  const [imp, devil, demonKing] = await Promise.all([
    generateSingleTier(client, state, destinationContext, "imp"),
    generateSingleTier(client, state, destinationContext, "devil"),
    generateSingleTier(client, state, destinationContext, "demonKing"),
  ]);
  return { imp, devil, demonKing };
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

  // If login mode and no name, fetch from stored profile
  if (!state.organizerName && state.organizerEmail) {
    const { getUserName } = await import("@/lib/auth");
    const storedName = await getUserName(state.organizerEmail);
    if (storedName) state.organizerName = storedName;
    else state.organizerName = "Trip Organizer";
  }

  const email = state.organizerEmail;
  const UNLIMITED_EMAILS = ["nicholauscmills@gmail.com"];
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

  // Check free plan limit (1 plan/month for non-subscribed, non-unlimited users)
  if (email && !UNLIMITED_EMAILS.includes(email)) {
    const isUserSubscribed = await isSubscribed(email);
    if (!isUserSubscribed) {
      const canGenerate = await canGenerateFreePlan(email);
      if (!canGenerate) {
        return NextResponse.json({
          error: "You've used your free plan this month. Check back next month!",
          limitReached: true,
        }, { status: 429 });
      }
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
    buildFreePreview(pick.destination, state, pick.priceLevel)
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
      const send = (data: Record<string, unknown>) => {
        controller.enqueue(encoder.encode(JSON.stringify(data) + "\n"));
      };

      // Send keepalive pings every 5s to prevent proxy/CDN timeouts
      const keepalive = setInterval(() => {
        send({ type: "ping" });
      }, 5000);

      try {
        send({ type: "status", message: "Scouting destinations..." });

        const client = new Anthropic({ timeout: 240_000 }); // 4 min — our NDJSON stream keeps Vercel alive

        // Generate ALL destinations in parallel
        send({ type: "status", message: `Building plans for ${picks.map(p => p.destination.city).join(", ")}...` });

        const recommendations = await Promise.all(
          picks.map(async (pick) => {
            const context = buildDestinationContext(pick.destination);
            const plans = await generatePlansForDestination(client, state, context);
            return {
              destinationId: pick.destination.id,
              city: pick.destination.city,
              state: pick.destination.state,
              tagline: pick.destination.tagline,
              priceLevel: pick.priceLevel,
              plans,
            } satisfies DestinationRecommendation;
          })
        );

        send({ type: "status", message: "Saving your trip..." });

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

        // Record free plan usage
        const subscribed = email ? await isSubscribed(email) : false;
        if (email && !UNLIMITED_EMAILS.includes(email) && !subscribed) {
          await recordFreePlanGeneration(email);
        }

        // Store plan
        const planId = crypto.randomUUID();
        const storedPlan: StoredPlan = {
          id: planId,
          freePreviews,
          destinations,
          inputs: state,
          createdAt: new Date().toISOString(),
          emailsSent: false,
          paid: subscribed || UNLIMITED_EMAILS.includes(email || ""),
        };

        await storePlan(storedPlan);
        await storeAttendees(planId, [{ name: state.organizerName, email }]);

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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const statusCode = (err as any)?.status || (err as any)?.statusCode || "";
        console.error(`Plan generation error [${errName}] (${statusCode}): ${errMsg}`);
        if (err instanceof Error && err.stack) console.error(err.stack);
        send({ type: "error", error: "Failed to generate plan. Please try again.", debug: `${errName}: ${errMsg}` });
      } finally {
        clearInterval(keepalive);
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
