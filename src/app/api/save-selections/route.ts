import { NextRequest, NextResponse } from "next/server";
import { getPlan, storePlan } from "@/lib/kv";
import { getSessionEmail } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const email = await getSessionEmail();
    if (!email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { planId, selectedOptions } = await req.json();
    if (!planId) {
      return NextResponse.json({ error: "Missing planId" }, { status: 400 });
    }

    const stored = await getPlan(planId);
    if (!stored) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    // Verify ownership
    if (stored.inputs?.organizerEmail && stored.inputs.organizerEmail !== email) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    // Save user's selected options
    stored.selectedOptions = selectedOptions;
    await storePlan(stored);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
