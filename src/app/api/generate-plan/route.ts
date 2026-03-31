import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
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
} from "@/lib/auth";

async function generatePlansForDestination(
  client: Anthropic,
  state: Parameters<typeof buildUserMessage>[0],
  destinationContext: string
): Promise<ThreePlanResult> {
  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 16384,
    system: buildSystemPrompt(destinationContext),
    messages: [{ role: "user", content: buildUserMessage(state) }],
  });

  const textBlock = message.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") throw new Error("No text response");

  let jsonStr = textBlock.text.trim();
  if (jsonStr.startsWith("```")) {
    jsonStr = jsonStr.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }
  return JSON.parse(jsonStr);
}

export async function POST(req: NextRequest) {
  try {
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
    const raw = await req.json();
    const state = validateWizardState(raw);

    // Check free plan limit (1 per month, unlimited for test account)
    const email = state.organizerEmail;
    const UNLIMITED_EMAILS = ["nicholauscmills@gmail.com"];

    if (email && !UNLIMITED_EMAILS.includes(email)) {
      const canGenerate = await canGenerateFreePlan(email);
      if (!canGenerate) {
        return NextResponse.json({
          error: "You've used your free plan this month. Check back next month!",
          limitReached: true,
        }, { status: 429 });
      }
    }

    // Load popularity scores
    const popularity = await getAllPopularityScores();
    setPopularityScores(popularity);

    // Pick 3 destinations
    const picks = getThreeDestinations(state);
    if (picks.length === 0) {
      return NextResponse.json(
        { error: "No destinations match your criteria. Try adjusting your preferences." },
        { status: 400 }
      );
    }

    // Build free previews (for destination cards — always fast)
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

    // Generate FULL Claude plans for ALL users — all 3 destinations
    const client = new Anthropic();
    const destsToGenerate = picks;

    const planPromises = destsToGenerate.map(async (pick) => {
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
    });

    const recommendations = await Promise.all(planPromises);

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

    // Record free plan usage (1/month limit)
    if (email) {
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
      paid: true, // all plans are fully unlocked now
    };

    await storePlan(storedPlan);
    await storeAttendees(planId, [{ name: state.organizerName, email }]);

    if (email) {
      await addPlanToUser(email, planId);
    }

    for (const preview of previews) {
      await recordDestinationView(preview.destinationId, state);
    }

    return NextResponse.json({ planId, freePreviews });
  } catch (err) {
    console.error("Plan generation error:", err);
    return NextResponse.json(
      { error: "Failed to generate plan. Please try again." },
      { status: 500 }
    );
  }
}
