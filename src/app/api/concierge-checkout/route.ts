import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getPlan } from "@/lib/kv";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "sk_test_placeholder", {
  apiVersion: "2025-03-31.basil" as Stripe.LatestApiVersion,
});

function parseBudgetToNumber(budget: string): number {
  // Extract numbers from strings like "$1,200-$1,800" and use midpoint
  const cleaned = budget.replace(/,/g, "");
  const matches = cleaned.match(/\d+/g);
  if (!matches || matches.length === 0) return 1000;
  if (matches.length === 1) return parseInt(matches[0]);
  // Use midpoint of range
  const low = parseInt(matches[0]);
  const high = parseInt(matches[1]);
  return Math.round((low + high) / 2);
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const planId = formData.get("planId") as string;
    const tier = formData.get("tier") as string;
    const dest = formData.get("dest") as string;

    if (!planId || !tier) {
      return NextResponse.json({ error: "Missing planId or tier" }, { status: 400 });
    }

    const stored = await getPlan(planId);
    if (!stored) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    // Get the selected plan: new format (destinations) or legacy (plans)
    const tierKey = tier === "demon-king" ? "demonKing" : tier;
    let plan;
    if (stored.destinations && dest) {
      const destLevel = dest as "budget" | "mid" | "premium";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      plan = (stored.destinations[destLevel]?.plans as any)?.[tierKey];
    }
    if (!plan && stored.plans) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      plan = (stored.plans as any)[tierKey];
    }
    if (!plan) {
      return NextResponse.json({ error: "Invalid tier or destination" }, { status: 400 });
    }

    // Calculate 20% fee
    const perPerson = parseBudgetToNumber(plan.estimatedBudget.perPerson);
    const groupSize = plan.groupSize || 12;
    const totalTripCost = perPerson * groupSize;
    const conciergeFee = Math.round(totalTripCost * 0.20);
    const conciergeFeeInCents = conciergeFee * 100;

    const origin = req.headers.get("origin") || "https://tourdefore.com";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Tour de Fore Concierge — ${plan.tierName}`,
              description: `Full-service trip planning for ${plan.destination}. ${groupSize} people, ${plan.numberOfDays} days. Includes all bookings, custom gear, website, and mobile app.`,
            },
            unit_amount: conciergeFeeInCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/concierge/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/plan/result/${planId}?dest=${dest || "mid"}&tier=${tier}`,
      metadata: {
        planId,
        tier,
        destination: plan.destination,
        groupSize: String(groupSize),
      },
    });

    return NextResponse.redirect(session.url!, 303);
  } catch (err) {
    console.error("Concierge checkout error:", err);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
