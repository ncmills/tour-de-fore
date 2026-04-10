import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";
import { rateLimit } from "@/lib/rate-limit";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface LeadBody {
  email?: string;
  source?: string;
  groupSize?: number;
  tripState?: string;
}

export async function POST(request: Request) {
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headersList.get("x-real-ip") ||
    "unknown";

  const rl = await rateLimit(`tdf-lead:${ip}`, 5, 60 * 60);
  if (!rl.allowed) {
    return NextResponse.json({ error: "Too many submissions. Try again later." }, { status: 429 });
  }

  let body: LeadBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  if (!EMAIL_REGEX.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const source = body.source?.slice(0, 60) || null;
  const groupSize = typeof body.groupSize === "number" ? Math.min(body.groupSize, 1000) : null;
  const tripState = body.tripState?.slice(0, 2)?.toUpperCase() || null;

  console.log("[tdf-lead]", JSON.stringify({ email, source, groupSize, tripState, ip }));

  if (supabase) {
    try {
      const { error } = await supabase.from("tdf_subscribers").upsert(
        { email, source, group_size: groupSize, trip_state: tripState, ip },
        { onConflict: "email" }
      );
      if (error) {
        console.error("[tdf-lead] supabase error:", error.message);
      }
    } catch (err) {
      console.error("[tdf-lead] supabase exception:", err);
    }
  }

  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY.trim());
      await resend.emails.send({
        from: "Tour de Fore <info@tourdefore.com>",
        to: "info@tourdefore.com",
        subject: `New Tour de Fore lead: ${email}`,
        html: `
          <h2>New trip-planner lead</h2>
          <table style="border-collapse:collapse;font-family:sans-serif;">
            <tr><td style="padding:4px 12px;font-weight:bold;">Email</td><td style="padding:4px 12px;">${email}</td></tr>
            <tr><td style="padding:4px 12px;font-weight:bold;">Source</td><td style="padding:4px 12px;">${source || "—"}</td></tr>
            <tr><td style="padding:4px 12px;font-weight:bold;">Group size</td><td style="padding:4px 12px;">${groupSize ?? "—"}</td></tr>
            <tr><td style="padding:4px 12px;font-weight:bold;">Trip state</td><td style="padding:4px 12px;">${tripState || "—"}</td></tr>
          </table>
        `,
      });
    } catch (err) {
      console.error("[tdf-lead] Resend notification failed:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
