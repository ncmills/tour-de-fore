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

async function generatePlansForDestination(
  client: Anthropic,
  state: Parameters<typeof buildUserMessage>[0],
  destinationContext: string,
  onProgress?: (tokens: number, status?: string) => void
): Promise<ThreePlanResult> {
  // Use streaming to avoid Anthropic SDK timeout on long generations
  const stream = client.messages.stream({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 8000,
    system: buildSystemPrompt(destinationContext),
    messages: [{ role: "user", content: buildUserMessage(state) }],
  });

  let fullText = "";
  let tokenCount = 0;
  let stopReason = "";

  for await (const event of stream) {
    if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
      fullText += event.delta.text;
      tokenCount++;
      if (onProgress && tokenCount % 200 === 0) {
        onProgress(tokenCount, `Generating... ${tokenCount} tokens`);
      }
    }
    if (event.type === "message_delta") {
      stopReason = (event.delta as { stop_reason?: string }).stop_reason || "";
    }
  }

  if (onProgress) onProgress(tokenCount, `Done: ${tokenCount} tokens, stop: ${stopReason}`);

  if (!fullText.trim()) throw new Error("No text response from Claude");

  if (stopReason === "max_tokens") {
    console.warn(`Plan generation hit max_tokens (${tokenCount} tokens). Response may be truncated.`);
  }

  let jsonStr = fullText.trim();
  if (jsonStr.startsWith("```")) {
    jsonStr = jsonStr.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }

  try {
    return JSON.parse(jsonStr);
  } catch (parseErr) {
    console.error(`JSON parse failed after ${tokenCount} tokens (stop: ${stopReason}). First 500 chars: ${jsonStr.slice(0, 500)}`);
    throw new Error(`Plan generation produced invalid output (${tokenCount} tokens, stop: ${stopReason})`);
  }
}

export async function POST(req: NextRequest) {
  // ── Pre-flight checks (fast, before streaming) ──

  // Rate limit: 5 plans per IP per hour
  const ip = getClientIp(req);
  const rl = await rateLimit(`generate:${ip}`, 5, 3600);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many plans generated. Try again later." },
      { status: 429, headers: { "Retry-After": String(rl.resetIn) } }
    );
  }

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

  // Check free plan limit
  const email = state.organizerEmail;
  const UNLIMITED_EMAILS = ["nicholauscmills@gmail.com"];

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
  const popularity = await getAllPopularityScores();
  setPopularityScores(popularity);

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

        const client = new Anthropic({ timeout: 120_000 });

        // Generate ALL destinations in parallel
        send({ type: "status", message: `Building plans for ${picks.map(p => p.destination.city).join(", ")}...` });

        const recommendations = await Promise.all(
          picks.map(async (pick) => {
            const context = buildDestinationContext(pick.destination);
            const plans = await generatePlansForDestination(client, state, context, (tokens, status) => {
              send({ type: "progress", city: pick.destination.city, tokens, status });
            });
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
        console.error(`Plan generation error [${errName}]: ${errMsg}`);
        if (err instanceof Error && err.stack) console.error(err.stack);
        send({ type: "error", error: "Failed to generate plan. Please try again." });
      } finally {
        clearInterval(keepalive);
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson",
      "Cache-Control": "no-cache",
      "Transfer-Encoding": "chunked",
    },
  });
}
