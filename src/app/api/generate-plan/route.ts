import { NextRequest, NextResponse } from "next/server";
import {
  ThreeFreePreview,
  FreePreview,
  StoredPlan,
  PriceLevel,
} from "@/lib/plan-types";
import { storePlan, storeAttendees, recordDestinationView } from "@/lib/kv";
import { getThreeDestinations } from "@/lib/planner-prompt";
import { setPopularityScores } from "@/data/query";
import { getAllPopularityScores } from "@/lib/kv";
import { buildFreePreview } from "@/lib/free-plan";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { validateWizardState } from "@/lib/validate";

export async function POST(req: NextRequest) {
  try {
    // Rate limit: 10 plans per IP per hour
    const ip = getClientIp(req);
    const rl = await rateLimit(`generate:${ip}`, 10, 3600);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: "Too many plans generated. Try again later." },
        { status: 429, headers: { "Retry-After": String(rl.resetIn) } }
      );
    }

    // Validate and sanitize input
    const raw = await req.json();
    const state = validateWizardState(raw);

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

    // Build FREE previews from database only — NO Claude API calls ($0 cost)
    const previews = picks.map((pick) =>
      buildFreePreview(pick.destination, state, pick.priceLevel)
    );

    // Assemble the three-preview result
    const byLevel: Record<PriceLevel, FreePreview | undefined> = {
      budget: previews.find((p) => p.priceLevel === "budget"),
      mid: previews.find((p) => p.priceLevel === "mid"),
      premium: previews.find((p) => p.priceLevel === "premium"),
    };

    const fallback = previews[0];
    const freePreviews: ThreeFreePreview = {
      budget: byLevel.budget || fallback,
      mid: byLevel.mid || fallback,
      premium: byLevel.premium || fallback,
    };

    // Store plan with free previews only (paid plans added after payment)
    const planId = crypto.randomUUID();
    const storedPlan: StoredPlan = {
      id: planId,
      freePreviews,
      inputs: state,
      createdAt: new Date().toISOString(),
      emailsSent: false,
    };

    await storePlan(storedPlan);
    await storeAttendees(planId, [{ name: state.organizerName, email: state.organizerEmail }]);

    // Associate plan with user profile
    if (state.organizerEmail) {
      const { addPlanToUser } = await import("@/lib/auth");
      await addPlanToUser(state.organizerEmail, planId);
    }

    // Record destination views for the learning engine
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
