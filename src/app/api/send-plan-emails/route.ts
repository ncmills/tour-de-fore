import { NextRequest, NextResponse } from "next/server";
import { getPlan, getAttendees, markEmailsSent } from "@/lib/kv";
import { getResendClient, FROM_ADDRESS } from "@/lib/email";
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
    const plan = stored.destinations.mid.plans.devil;
    // 2026-04-11: clean, forward-friendly link — no query params. The bare
    // /plan/result/[id] route lands on the destination picker so a recipient
    // forwarded from iMessage/Slack sees all 3 destinations, not a frozen
    // snapshot of whatever view the organizer happened to be on. Matches the
    // MOH share-plan pattern. Dropping the query params also makes the Open
    // Graph preview unfurl cleanly in every client.
    // (tier/dest params intentionally ignored here even if provided by the client)
    void tier; void dest;
    const planUrl = `https://tourdefore.com/plan/result/${planId}`;

    // Send emails
    const resend = getResendClient();
    const emailPromises = attendees.map((attendee) => {
      const isOrganizer = attendee.email === organizerEmail;

      return resend.emails.send({
        from: FROM_ADDRESS,
        to: attendee.email,
        subject: `${plan.tripName} — Your Golf Trip Plan is Ready`,
        replyTo: organizerEmail || undefined,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ece8e1; padding: 40px 30px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="font-size: 28px; font-weight: 300; color: #c87941; margin: 0;">Tour de Fore</h1>
            </div>

            <h2 style="font-size: 24px; font-weight: 600; margin: 0 0 8px;">
              ${plan.tripName}
            </h2>
            <p style="color: #9a9590; font-style: italic; margin: 0 0 24px;">
              "${plan.tagline}"
            </p>

            <div style="background: #111111; border: 1px solid #1e1e1e; border-radius: 4px; padding: 20px; margin-bottom: 24px;">
              <p style="margin: 0 0 8px;"><strong style="color: #c87941;">Destination:</strong> ${plan.destination}</p>
              <p style="margin: 0 0 8px;"><strong style="color: #c87941;">Dates:</strong> ${plan.dates}</p>
              <p style="margin: 0 0 8px;"><strong style="color: #c87941;">Group:</strong> ${plan.groupSize} people</p>
              <p style="margin: 0;"><strong style="color: #c87941;">Budget:</strong> ${plan.estimatedBudget.perPerson} per person</p>
            </div>

            ${isOrganizer ? '<p style="background: #1a1510; border-left: 3px solid #c87941; padding: 12px 16px; color: #c9a96e; font-size: 14px;">You\'re the organizer for this trip. Rally the crew!</p>' : ""}

            <div style="text-align: center; margin: 32px 0;">
              <a href="${planUrl}" style="display: inline-block; background: #c87941; color: #fff; text-decoration: none; padding: 14px 32px; border-radius: 4px; font-size: 14px; letter-spacing: 0.1em; text-transform: uppercase;">
                View Full Plan
              </a>
            </div>

            <p style="color: #9a9590; font-size: 13px; text-align: center; margin: 24px 0 4px;">
              Forward this email or drop the link in the group chat &mdash; anyone with it can view the plan.
            </p>
            <p style="word-break: break-all; text-align: center; margin: 0 0 32px;">
              <a href="${planUrl}" style="color: #c87941; font-size: 12px; text-decoration: none;">${planUrl}</a>
            </p>

            <p style="color: #5a5550; font-size: 12px; text-align: center; margin-top: 40px;">
              Sent via Tour de Fore &mdash; tourdefore.com
            </p>
          </div>
        `,
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
