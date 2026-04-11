import { NextRequest, NextResponse } from "next/server";
import { fulfillShopOrder } from "@/lib/shop-fulfillment";
import { getStripe } from "@/lib/stripe";

// Called by the success page to ensure this specific order made it to Printful.
// Idempotent — safe to call multiple times; dedups at Redis and Printful levels.
export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();
    if (!sessionId || typeof sessionId !== "string") {
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
    }
    const result = await fulfillShopOrder(sessionId, getStripe(), "verify");
    const httpStatus =
      result.status === "failed" || result.status === "needs_attention" ? 500 : 200;
    return NextResponse.json(result, { status: httpStatus });
  } catch (err) {
    console.error("verify-order error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed" },
      { status: 500 }
    );
  }
}
