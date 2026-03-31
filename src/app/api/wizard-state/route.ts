import { NextRequest, NextResponse } from "next/server";
import { getStoredWizardState } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const wid = req.nextUrl.searchParams.get("wid");
  if (!wid) {
    return NextResponse.json({ error: "Missing wizard ID" }, { status: 400 });
  }

  const data = await getStoredWizardState(wid);
  if (!data) {
    return NextResponse.json({ error: "Wizard state not found or expired" }, { status: 404 });
  }

  return NextResponse.json({ state: data.state });
}
