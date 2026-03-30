import { NextRequest, NextResponse } from "next/server";
import { getPlan, storePlan } from "@/lib/kv";

export async function POST(req: NextRequest) {
  try {
    const { planId, selectedOptions } = await req.json();
    if (!planId) {
      return NextResponse.json({ error: "Missing planId" }, { status: 400 });
    }

    const stored = await getPlan(planId);
    if (!stored) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    // Save user's selected options
    stored.selectedOptions = selectedOptions;
    await storePlan(stored);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
