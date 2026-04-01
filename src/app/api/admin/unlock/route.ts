import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getPlan, storePlan } from "@/lib/kv";
import { allDestinations } from "@/data/index";
import { buildDestinationContext } from "@/data/query";
import { buildSystemPrompt, buildUserMessage } from "@/lib/planner-prompt";
import { addPlanToUser } from "@/lib/auth";
import type { PriceLevel, ThreePlanResult, DestinationRecommendation } from "@/lib/plan-types";

const ADMIN_SECRET = process.env.ADMIN_SECRET;

/**
 * Admin endpoint to unlock a plan without payment (for testing).
 * POST /api/admin/unlock { planId, dest, secret }
 */
export async function POST(req: NextRequest) {
  try {
    const { planId, dest, secret } = await req.json();

    if (!ADMIN_SECRET || secret !== ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!planId || !dest) {
      return NextResponse.json({ error: "Missing planId or dest" }, { status: 400 });
    }

    const stored = await getPlan(planId);
    if (!stored) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    // Already generated?
    if (stored.destinations?.[dest as PriceLevel]) {
      return NextResponse.json({ success: true, message: "Already unlocked" });
    }

    const preview = stored.freePreviews?.[dest as PriceLevel];
    if (!preview) {
      return NextResponse.json({ error: "Invalid destination" }, { status: 400 });
    }

    const destination = allDestinations.find((d) => d.id === preview.destinationId);
    if (!destination) {
      return NextResponse.json({ error: "Destination not found" }, { status: 404 });
    }

    // Generate via Claude
    const client = new Anthropic();
    const context = buildDestinationContext(destination);
    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 16384,
      system: buildSystemPrompt(context),
      messages: [{ role: "user", content: buildUserMessage(stored.inputs) }],
    });

    const textBlock = message.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") throw new Error("No response");

    let jsonStr = textBlock.text.trim();
    if (jsonStr.startsWith("```")) {
      jsonStr = jsonStr.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
    }

    const plans: ThreePlanResult = JSON.parse(jsonStr);
    const recommendation: DestinationRecommendation = {
      destinationId: destination.id,
      city: destination.city,
      state: destination.state,
      tagline: destination.tagline,
      priceLevel: dest as PriceLevel,
      plans,
    };

    stored.destinations = {
      ...(stored.destinations || { budget: recommendation, mid: recommendation, premium: recommendation }),
      [dest]: recommendation,
    };
    stored.paid = true;
    stored.paidAt = new Date().toISOString();
    stored.paidDestination = dest as PriceLevel;

    await storePlan(stored);

    if (stored.inputs?.organizerEmail) {
      await addPlanToUser(stored.inputs.organizerEmail, planId);
    }

    return NextResponse.json({ success: true, planId, dest });
  } catch (err) {
    console.error("Admin unlock error:", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
