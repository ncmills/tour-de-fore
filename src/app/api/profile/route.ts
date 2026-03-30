import { NextRequest, NextResponse } from "next/server";
import { getSessionEmail, setUserName, setUserPastTrips } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const email = await getSessionEmail();
    if (!email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { name, attendedYears } = await req.json();

    if (name) {
      await setUserName(email, name);
    }
    if (attendedYears && Array.isArray(attendedYears)) {
      await setUserPastTrips(email, attendedYears);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
