import { NextRequest, NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";
import { optoutKey } from "@/lib/reengage";

// ── Re-engagement opt-out ──
//
// Linked from every re-engagement nudge (buildReengageEmail). Sets
// reengage-optout:{email} in Redis, which the trip-reminders cron checks before
// sending. GET handles the one-click link from the email and returns a small
// confirmation page; POST is available for programmatic / form unsubscribes.
//
// Opt-out is per-email and effectively permanent (long TTL — re-armed on any
// future opt-out). Only suppresses re-engagement nudges; it does not affect
// transactional plan/crew emails the organizer explicitly triggers.

export const dynamic = "force-dynamic";

// ~5 years. Long enough to be "permanent" in practice; bounded so a typo'd
// address can't pin a key forever in the shared Redis.
const OPTOUT_TTL = 60 * 60 * 24 * 365 * 5;

function isValidEmail(email: string): boolean {
  return (
    typeof email === "string" &&
    email.includes("@") &&
    email.length >= 3 &&
    email.length < 254
  );
}

async function optOut(email: string): Promise<void> {
  await getRedis().set(optoutKey(email), "1", "EX", OPTOUT_TTL);
}

function confirmationPage(email: string): string {
  const safe = email.replace(/[<>&"]/g, "");
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <title>Unsubscribed — Tour de Fore</title>
  </head>
  <body style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0a0a0a;color:#ece8e1;">
    <div style="max-width:520px;margin:0 auto;padding:64px 30px;text-align:center;">
      <h1 style="font-size:28px;font-weight:300;color:#c87941;margin:0 0 24px;">Tour de Fore</h1>
      <h2 style="font-size:22px;font-weight:600;margin:0 0 12px;">You're off the list.</h2>
      <p style="color:#cfc9c1;font-size:15px;line-height:1.6;margin:0 0 8px;">
        We won't send any more trip reminders to <strong>${safe}</strong>.
      </p>
      <p style="color:#9a9590;font-size:13px;line-height:1.6;margin:0 0 32px;">
        Your saved plans are untouched — you can still view and share them anytime.
      </p>
      <a href="https://tourdefore.com" style="display:inline-block;background:#c87941;color:#fff;text-decoration:none;padding:14px 32px;border-radius:4px;font-size:14px;letter-spacing:0.1em;text-transform:uppercase;">Back to Tour de Fore</a>
    </div>
  </body>
</html>`;
}

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email")?.trim() || "";
  if (!isValidEmail(email)) {
    return new NextResponse("Invalid or missing email.", {
      status: 400,
      headers: { "Content-Type": "text/plain" },
    });
  }
  await optOut(email);
  return new NextResponse(confirmationPage(email), {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

export async function POST(req: NextRequest) {
  let email = "";
  try {
    const body = await req.json();
    email = (body?.email ?? "").toString().trim();
  } catch {
    email = req.nextUrl.searchParams.get("email")?.trim() || "";
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid or missing email" }, { status: 400 });
  }
  await optOut(email);
  return NextResponse.json({ ok: true, unsubscribed: email });
}
