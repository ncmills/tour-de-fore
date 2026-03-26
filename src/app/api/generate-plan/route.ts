import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { WizardState, GeneratedPlan, StoredPlan } from "@/lib/plan-types";
import { storePlan, storeAttendees } from "@/lib/kv";
import { buildSystemPrompt, buildUserMessage, getDestinationContext } from "@/lib/planner-prompt";

export async function POST(req: NextRequest) {
  try {
    const state: WizardState = await req.json();

    if (!state.organizerName || !state.organizerEmail) {
      return NextResponse.json(
        { error: "Organizer name and email are required" },
        { status: 400 }
      );
    }

    // Build destination context from database
    const destinationContext = getDestinationContext(state);

    // Call Claude with real destination data
    const client = new Anthropic();
    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 8192,
      system: buildSystemPrompt(destinationContext),
      messages: [{ role: "user", content: buildUserMessage(state) }],
    });

    // Extract text response
    const textBlock = message.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      throw new Error("No text response from Claude");
    }

    // Parse JSON — handle potential markdown wrapping
    let jsonStr = textBlock.text.trim();
    if (jsonStr.startsWith("```")) {
      jsonStr = jsonStr.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
    }

    const plan: GeneratedPlan = JSON.parse(jsonStr);

    // Store plan
    const planId = crypto.randomUUID();
    const storedPlan: StoredPlan = {
      id: planId,
      plan,
      inputs: state,
      createdAt: new Date().toISOString(),
      emailsSent: false,
    };

    await storePlan(storedPlan);

    // Store organizer
    await storeAttendees(planId, [{ name: state.organizerName, email: state.organizerEmail }]);

    return NextResponse.json({ planId, plan });
  } catch (err) {
    console.error("Plan generation error:", err);
    return NextResponse.json(
      { error: "Failed to generate plan. Please try again." },
      { status: 500 }
    );
  }
}
