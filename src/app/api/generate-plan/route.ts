import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import {
  WizardState,
  ThreePlanResult,
  ThreeDestinationResult,
  DestinationRecommendation,
  StoredPlan,
  PriceLevel,
} from "@/lib/plan-types";
import { storePlan, storeAttendees, recordDestinationView } from "@/lib/kv";
import {
  buildSystemPrompt,
  buildUserMessage,
  getThreeDestinations,
} from "@/lib/planner-prompt";
import { buildDestinationContext, setPopularityScores } from "@/data/query";
import { getAllPopularityScores } from "@/lib/kv";

async function generatePlansForDestination(
  client: Anthropic,
  state: WizardState,
  destinationContext: string
): Promise<ThreePlanResult> {
  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 16384,
    system: buildSystemPrompt(destinationContext),
    messages: [{ role: "user", content: buildUserMessage(state) }],
  });

  const textBlock = message.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text response from Claude");
  }

  let jsonStr = textBlock.text.trim();
  if (jsonStr.startsWith("```")) {
    jsonStr = jsonStr.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }

  return JSON.parse(jsonStr);
}

export async function POST(req: NextRequest) {
  try {
    const state: WizardState = await req.json();

    if (!state.organizerName || !state.organizerEmail) {
      return NextResponse.json(
        { error: "Organizer name and email are required" },
        { status: 400 }
      );
    }

    // Load popularity scores from user interactions (learning engine)
    const popularity = await getAllPopularityScores();
    setPopularityScores(popularity);

    // Pick 3 destinations at different price levels
    const picks = getThreeDestinations(state);

    if (picks.length === 0) {
      return NextResponse.json(
        { error: "No destinations match your criteria. Try adjusting your preferences." },
        { status: 400 }
      );
    }

    const client = new Anthropic();

    // Generate plans for all destinations in parallel
    const planPromises = picks.map(async (pick) => {
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

    // Build the three-destination result
    // If we only got 1-2 picks (e.g., specific city search), fill intelligently
    const byLevel: Record<PriceLevel, DestinationRecommendation | undefined> = {
      budget: recommendations.find((r) => r.priceLevel === "budget"),
      mid: recommendations.find((r) => r.priceLevel === "mid"),
      premium: recommendations.find((r) => r.priceLevel === "premium"),
    };

    // For specific city searches where we only have 1 destination
    const fallback = recommendations[0];
    const destinations: ThreeDestinationResult = {
      budget: byLevel.budget || fallback,
      mid: byLevel.mid || fallback,
      premium: byLevel.premium || fallback,
    };

    // Store plan
    const planId = crypto.randomUUID();
    const storedPlan: StoredPlan = {
      id: planId,
      destinations,
      inputs: state,
      createdAt: new Date().toISOString(),
      emailsSent: false,
    };

    await storePlan(storedPlan);
    await storeAttendees(planId, [{ name: state.organizerName, email: state.organizerEmail }]);

    // Record destination views for the learning engine
    for (const rec of recommendations) {
      await recordDestinationView(rec.destinationId, state);
    }

    return NextResponse.json({ planId, destinations });
  } catch (err) {
    console.error("Plan generation error:", err);
    return NextResponse.json(
      { error: "Failed to generate plan. Please try again." },
      { status: 500 }
    );
  }
}
