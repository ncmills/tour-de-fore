import { NextRequest, NextResponse } from "next/server";
import { getAnthropicClient } from "@/lib/anthropic";
import { getStripe } from "@/lib/stripe";

export const maxDuration = 120;
import { getPlan, storePlan } from "@/lib/kv";
import { allDestinations } from "@/data/index";
import { buildDestinationContext } from "@/data/query";
import { buildSystemPrompt, buildUserMessage } from "@/lib/planner-prompt";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import type {
  PriceLevel,
  ThreePlanResult,
  DestinationRecommendation,
  StoredPlan,
} from "@/lib/plan-types";

const stripe = getStripe();

// Create Stripe checkout session for $99
export async function POST(req: NextRequest) {
  try {
    const { planId, dest } = await req.json();

    if (!planId || !dest) {
      return NextResponse.json({ error: "Missing planId or dest" }, { status: 400 });
    }

    const stored = await getPlan(planId);
    if (!stored) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    // Get the destination info from the free preview
    const preview = stored.freePreviews?.[dest as PriceLevel];
    if (!preview) {
      return NextResponse.json({ error: "Invalid destination" }, { status: 400 });
    }

    const origin = req.headers.get("origin") || "https://tourdefore.com";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Tour de Fore Full Trip Plan`,
              description: `Complete trip plan for ${preview.city}, ${preview.state} — ${preview.groupSize} people, ${preview.numberOfDays} days. Includes lodging options, all courses, restaurants, bars, party bus, schedule, and pro tips.`,
            },
            unit_amount: 9900, // $99
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/plan/unlock-success?planId=${planId}&dest=${dest}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/plan/result/${planId}`,
      metadata: { planId, dest },
    });

    // Store session ID so PUT can verify payment directly (no list+filter)
    stored.stripeSessionId = session.id;
    await storePlan(stored);

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Unlock plan checkout error:", err);
    return NextResponse.json({ error: "Failed to create checkout" }, { status: 500 });
  }
}

// Generate the full paid plan after successful payment
export async function PUT(req: NextRequest) {
  try {
    // Rate limit: 5 paid plan generations per IP per hour
    const ip = getClientIp(req);
    const rl = await rateLimit(`unlock:${ip}`, 5, 3600);
    if (!rl.allowed) {
      return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
    }

    const { planId, dest } = await req.json();

    if (!planId || !dest) {
      return NextResponse.json({ error: "Missing planId or dest" }, { status: 400 });
    }

    const stored = await getPlan(planId);
    if (!stored) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    // Verify payment — check if webhook marked it as paid, or verify with Stripe
    if (!stored.paid) {
      const sessionId = stored.stripeSessionId;
      if (!sessionId) {
        return NextResponse.json({ error: "No payment session found" }, { status: 402 });
      }
      // Retry a few times to give webhook time to process
      let verified = false;
      for (let attempt = 0; attempt < 3; attempt++) {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if (session.payment_status === "paid") {
          verified = true;
          break;
        }
        if (attempt < 2) await new Promise((r) => setTimeout(r, 1500));
      }
      if (!verified) {
        return NextResponse.json({ error: "Payment not verified" }, { status: 402 });
      }
      // Mark as paid since we confirmed with Stripe
      stored.paid = true;
      stored.paidAt = new Date().toISOString();
      stored.paidDestination = dest as PriceLevel;
      await storePlan(stored);
    }

    // Already generated? Don't re-generate
    if (stored.destinations?.[dest as PriceLevel]) {
      return NextResponse.json({ success: true, planId, dest });
    }

    // Find the destination in our database
    const preview = stored.freePreviews?.[dest as PriceLevel];
    if (!preview) {
      return NextResponse.json({ error: "Invalid destination" }, { status: 400 });
    }

    const destination = allDestinations.find((d) => d.id === preview.destinationId);
    if (!destination) {
      return NextResponse.json({ error: "Destination not found in database" }, { status: 404 });
    }

    // NOW call Claude — this is the paid value ($99 worth)
    const client = getAnthropicClient();
    const context = buildDestinationContext(destination);
    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 16384,
      system: buildSystemPrompt(context),
      messages: [{ role: "user", content: buildUserMessage(stored.inputs) }],
    });

    const textBlock = message.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      throw new Error("No text response from Claude");
    }

    let jsonStr = textBlock.text.trim();
    if (jsonStr.startsWith("```")) {
      jsonStr = jsonStr.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
    }

    const plans: ThreePlanResult = JSON.parse(jsonStr);

    // Build the destination recommendation
    const recommendation: DestinationRecommendation = {
      destinationId: destination.id,
      city: destination.city,
      state: destination.state,
      tagline: destination.tagline,
      priceLevel: dest as PriceLevel,
      plans,
    };

    // Update the stored plan with the paid data
    const updated: StoredPlan = {
      ...stored,
      destinations: {
        ...(stored.destinations || { budget: recommendation, mid: recommendation, premium: recommendation }),
        [dest]: recommendation,
      },
      paid: true,
      paidAt: new Date().toISOString(),
      paidDestination: dest as PriceLevel,
    };

    await storePlan(updated);

    return NextResponse.json({ success: true, planId, dest });
  } catch (err) {
    console.error("Paid plan generation error:", err);
    return NextResponse.json({ error: "Failed to generate paid plan" }, { status: 500 });
  }
}
