import { NextResponse } from "next/server";
import { getSessionEmail, setPassword } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const email = await getSessionEmail();
    if (!email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { password } = await req.json();
    if (!password || password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

    await setPassword(email, password);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Set password error:", err);
    return NextResponse.json({ error: "Failed to set password" }, { status: 500 });
  }
}
