import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getPlan, getAttendees, markEmailsSent } from "@/lib/kv";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

export async function POST(req: NextRequest) {
  try {
    const { planId } = await req.json();

    if (!planId) {
      return NextResponse.json({ error: "Missing planId" }, { status: 400 });
    }

    // Rate limit: one send per plan
    const canSend = await markEmailsSent(planId);
    if (!canSend) {
      return NextResponse.json(
        { error: "Emails already sent for this plan" },
        { status: 409 }
      );
    }

    const stored = await getPlan(planId);
    if (!stored) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    const attendees = await getAttendees(planId);
    if (attendees.length === 0) {
      return NextResponse.json(
        { error: "No attendees found" },
        { status: 404 }
      );
    }

    const plan = stored.plans.devil; // Use the recommended tier for emails
    const planUrl = `https://tourdefore.com/plan/result/${planId}`;
    const organizerEmail = stored.inputs.organizerEmail;

    // Send emails
    const resend = getResend();
    const emailPromises = attendees.map((attendee) => {
      const isOrganizer = attendee.email === organizerEmail;

      return resend.emails.send({
        from: "Tour de Fore <noreply@tourdefore.com>",
        to: attendee.email,
        subject: `${plan.tripName} — Your Golf Trip Plan is Ready`,
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

            <p style="color: #5a5550; font-size: 12px; text-align: center; margin-top: 40px;">
              Sent via Tour de Fore AI Trip Planner &mdash; tourdefore.com
            </p>
          </div>
        `,
      });
    });

    await Promise.all(emailPromises);

    return NextResponse.json({ success: true, sent: attendees.length });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json(
      { error: "Failed to send emails" },
      { status: 500 }
    );
  }
}
