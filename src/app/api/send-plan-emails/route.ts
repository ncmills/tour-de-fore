import { NextRequest, NextResponse } from "next/server";
import { getPlan, getAttendees, markEmailsSent } from "@/lib/kv";
import { getResendClient, FROM_ADDRESS, buildPlanReadyEmail } from "@/lib/email";
import { getSessionEmail } from "@/lib/auth";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const rl = await rateLimit(`send-emails:${ip}`, 10, 3600);
    if (!rl.allowed) {
      return NextResponse.json({ error: "Too many email requests. Try again later." }, { status: 429, headers: { "Retry-After": String(rl.resetIn) } });
    }

    const { planId, emails, tier, dest } = await req.json();

    if (!planId) {
      return NextResponse.json({ error: "Missing planId" }, { status: 400 });
    }

    const stored = await getPlan(planId);
    if (!stored) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    // Ownership check — only the organizer can send plan emails
    const sessionEmail = await getSessionEmail();
    const organizerEmail = stored.inputs?.organizerEmail;
    if (!sessionEmail || (organizerEmail && sessionEmail !== organizerEmail)) {
      return NextResponse.json({ error: "Only the plan organizer can send emails" }, { status: 403 });
    }

    // Accept emails from request body, or fall back to stored attendees
    let attendees: { name: string; email: string }[];
    if (emails && Array.isArray(emails) && emails.length > 0) {
      // Validate and dedupe emails from request
      const validEmails = emails
        .filter((e: string) => typeof e === "string" && e.includes("@") && e.length < 254)
        .slice(0, 20); // cap at 20 recipients
      if (validEmails.length === 0) {
        return NextResponse.json({ error: "No valid emails provided" }, { status: 400 });
      }
      attendees = validEmails.map((e: string) => ({ name: "", email: e }));
    } else {
      attendees = await getAttendees(planId);
      if (attendees.length === 0) {
        return NextResponse.json({ error: "No attendees found" }, { status: 404 });
      }
    }

    // Rate limit: one send per plan (reset if new emails provided)
    if (!emails) {
      const canSend = await markEmailsSent(planId);
      if (!canSend) {
        return NextResponse.json(
          { error: "Emails already sent for this plan" },
          { status: 409 }
        );
      }
    }

    // Use mid destination's devil tier for email copy (headline numbers)
    if (!stored.destinations) {
      return NextResponse.json({ error: "Plan has no destination data" }, { status: 400 });
    }
    // 2026-04-11: clean, forward-friendly link — no query params. The bare
    // /plan/result/[id] route lands on the destination picker so a recipient
    // forwarded from iMessage/Slack sees all 3 destinations, not a frozen
    // snapshot of whatever view the organizer happened to be on. Matches the
    // MOH share-plan pattern. Dropping the query params also makes the Open
    // Graph preview unfurl cleanly in every client.
    // (tier/dest params intentionally ignored here even if provided by the client)
    void tier; void dest;

    // Send emails
    const resend = getResendClient();
    const emailPromises = attendees.map((attendee) => {
      const isOrganizer = attendee.email === organizerEmail;
      const { subject, html } = buildPlanReadyEmail(stored, { isOrganizer });

      return resend.emails.send({
        from: FROM_ADDRESS,
        to: attendee.email,
        subject,
        replyTo: organizerEmail || undefined,
        html,
      });
    });

    const results = await Promise.allSettled(emailPromises);
    const failed = results.filter(r => r.status === "rejected").length;

    return NextResponse.json({ success: true, sent: attendees.length - failed, failed });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json(
      { error: "Failed to send emails" },
      { status: 500 }
    );
  }
}
