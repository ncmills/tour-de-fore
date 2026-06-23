"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import type { GeneratedPlan, TripTier, PlanCourse, PlanDining, PlanBar, PlanScheduleItem } from "@/lib/plan-types";
import MulliganButton from "./MulliganButton";
import HomeButton from "./HomeButton";
import PlanBreadcrumb from "./PlanBreadcrumb";
import { buildBookingLink, bookingLabel, type BookingKind } from "@/lib/booking-links";
import { resolveTripStart, type TripTiming } from "@/lib/trip-dates";

const FALLBACK_GOLF_IMAGES = [
  "https://www.troonnorthgolf.com/wp-content/uploads/sites/8934/2023/06/home-main.jpg",
  "https://balihaigolfclub.com/wp-content/uploads/2024/07/bali-hai-og.jpg",
  "https://chambersbaygolf.com/wp-content/uploads/2025/05/cb-homescreen.jpg",
  "https://tamarackidaho.com/wp-content/uploads/2024/04/SH.2023.6.29_Golfing-157-scaled.jpg",
  "https://falconridgegolfclub.com/wp-content/uploads/HOLE-18-FALCON-RIDGE-0098.jpg",
  "https://www.wolfrungolfclub.com/wp-content/uploads/sites/8583/2022/09/home-full-1.jpg",
  "https://www.sandiagolf.com/wp-content/uploads/sites/8959/2023/06/21.jpg",
  "https://tetherow.com/wp-content/uploads/2018/12/tetherow-lodge-hero-3000.jpg",
  "https://www.reservegolf.com/wp-content/uploads/sites/9325/2024/01/IMG_5043.jpg",
  "https://newcastlegolf.com/wp-content/uploads/2024/01/DJI_0055-Enhanced-NR.jpg",
  "https://casablanca.playmesquite.com/wp-content/uploads/2025/01/200808_nevada_palmsgolf_033.jpg",
  "https://azhideawaycollection.com/wp-content/uploads/2024/12/sedona_home_hero-1024x728.webp",
];

function getFallbackImage(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
  return FALLBACK_GOLF_IMAGES[Math.abs(hash) % FALLBACK_GOLF_IMAGES.length];
}

// ── Helpers ──

/** Parse a dollar string like "$89" or "$2,450" into a number.
 *  For ranges like "$800-$1,200", returns the midpoint. */
function parseDollars(s: string | undefined): number {
  if (!s) return 0;
  // Handle ranges like "$800-$1,200" or "$800 - $1,200"
  const rangeMatch = s.match(/\$?\s*([\d,]+(?:\.\d+)?)\s*[-–—]\s*\$?\s*([\d,]+(?:\.\d+)?)/);
  if (rangeMatch) {
    const lo = parseFloat(rangeMatch[1].replace(/,/g, "")) || 0;
    const hi = parseFloat(rangeMatch[2].replace(/,/g, "")) || 0;
    return Math.round((lo + hi) / 2);
  }
  const m = s.replace(/[^0-9.]/g, "");
  return parseFloat(m) || 0;
}

/** Map a dining price-range string to a per-person cost estimate */
function diningPricePerPerson(priceRange: string | undefined): number {
  const raw = (priceRange || "").replace(/["\s]/g, "");
  if (raw === "$$$$") return 150;
  if (raw === "$$$") return 100;
  if (raw === "$$") return 60;
  if (raw === "$") return 30;
  return 50;
}

function formatDollars(n: number): string {
  return "$" + n.toLocaleString();
}


interface IcsDay {
  /** 1-based day number */
  day: number;
  /** Short human label, e.g. "Day 1 — Arrival + Pronghorn (AM)" */
  summary: string;
  /** Multi-line description (round / tee-time guidance) */
  description: string;
}

// Escape RFC 5545 special chars in TEXT values.
function icsEscape(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/[;,]/g, (m) => "\\" + m).replace(/\n/g, "\\n");
}

function generateICSFile(
  tripName: string,
  destination: string,
  numDays: number,
  days: IcsDay[],
  timing?: TripTiming | null
) {
  const { start, suggested } = resolveTripStart(timing);
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  // All-day events use DATE values (YYYYMMDD), DTEND is exclusive (next day).
  const fmtDate = (d: Date) =>
    `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;

  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Tour de Fore//Golf Trip Planner//EN",
    "CALSCALE:GREGORIAN",
  ];

  const suggestedNote = suggested
    ? "Suggested dates — pick the exact week that works for the crew, then shift these events to match."
    : "";

  // One all-day event per trip day, anchored to the chosen timing.
  for (let i = 0; i < numDays; i++) {
    const dayDate = new Date(start.getTime() + i * 24 * 60 * 60 * 1000);
    const nextDate = new Date(dayDate.getTime() + 24 * 60 * 60 * 1000);
    const info = days[i];
    const summaryBase = info?.summary || `Day ${i + 1}`;
    const summary = suggested ? `${summaryBase} (suggested)` : summaryBase;
    const descParts = [info?.description || `Golf trip to ${destination}.`];
    if (suggestedNote) descParts.push(suggestedNote);
    descParts.push("Plan your trip at tourdefore.com");

    lines.push(
      "BEGIN:VEVENT",
      `UID:tdf-${Date.now()}-d${i + 1}@tourdefore.com`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${fmtDate(dayDate)}`,
      `DTEND;VALUE=DATE:${fmtDate(nextDate)}`,
      `SUMMARY:${icsEscape(`${tripName || "Golf Trip"} — ${summary}`)}`,
      `DESCRIPTION:${icsEscape(descParts.join("\n\n"))}`,
      `LOCATION:${icsEscape(destination)}`,
      "STATUS:TENTATIVE",
      "END:VEVENT"
    );
  }

  lines.push("END:VCALENDAR");
  const ics = lines.join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${(tripName || "golf-trip").replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ── Types ──

interface DayItinerary {
  day: number;
  morning: PlanCourse | null;
  afternoon: PlanCourse | null;
  afternoonActivity: string | null;
  dinner: PlanDining | null;
  bar: PlanBar | null;
}

// ── Card Components ──

function ExternalLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        fontSize: "0.72rem",
        color: "#EA580C",
        textDecoration: "none",
        marginTop: "0.4rem",
        letterSpacing: "0.03em",
        transition: "opacity 0.2s",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.7"; }}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
    >
      {label}
      <svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  );
}

const scheduleIcons: Record<string, string> = {
  golf: "⛳",
  dining: "🍽️",
  activity: "🎯",
  nightlife: "🍺",
  travel: "🚗",
  lodging: "🏠",
};

// Map a schedule item type to a bookable-link category. Travel/lodging items
// get no booking CTA (you don't "reserve" an airport transfer from here).
const BOOKABLE_KIND: Partial<Record<PlanScheduleItem["type"], BookingKind>> = {
  golf: "golf",
  dining: "dining",
  nightlife: "nightlife",
  activity: "activity",
};

function ScheduleItemCard({ item, plan }: { item: PlanScheduleItem; plan: GeneratedPlan }) {
  // Try to find the matching course/dining/bar so we can use its REAL url when
  // the data carries one. The matched venue's name is also a cleaner search
  // key than the schedule line (which may read "Round 1 at Pronghorn").
  const courseMatch = item.type === "golf" ? plan.courses.find((c) => item.activity.includes(c.name)) : null;
  const diningMatch = item.type === "dining" ? plan.dining.find((d) => item.activity.includes(d.name)) : null;
  const barMatch = item.type === "nightlife" ? plan.bars.find((b) => item.activity.includes(b.name)) : null;

  const kind = BOOKABLE_KIND[item.type];
  const matchedUrl = courseMatch?.url || diningMatch?.url || barMatch?.url;
  const venueName = courseMatch?.name || diningMatch?.name || barMatch?.name || item.activity;
  // Always produce a direct link for bookable items — buildBookingLink falls
  // back to a course-scoped GolfNow / OpenTable / Maps place link, never a bare
  // keyword web search and never an empty href.
  const href = kind ? buildBookingLink(kind, venueName, matchedUrl, plan.destination) : null;

  return (
    <ItineraryCard icon={scheduleIcons[item.type] || "📌"} label={item.time}>
      <p style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: "0.2rem" }}>{item.activity}</p>
      {item.detail && (
        <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>{item.detail}</p>
      )}
      {item.proTip && (
        <p style={{ fontSize: "0.75rem", color: "rgba(249,115,22,0.7)", fontStyle: "italic", marginTop: "0.3rem" }}>
          💡 {item.proTip}
        </p>
      )}
      {href && kind && <ExternalLink href={href} label={bookingLabel(kind)} />}
    </ItineraryCard>
  );
}

function ItineraryCard({ icon, label, children }: { icon: string; label: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      style={{
        background: "#111",
        border: "1px solid #222",
        borderRadius: 10,
        padding: "1rem 1.25rem",
        marginBottom: "0.75rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}>
        <span style={{ fontSize: "1.1rem" }}>{icon}</span>
        <span style={{
          fontSize: "0.65rem",
          color: "rgba(255,255,255,0.35)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          fontFamily: "var(--font-plan-block), sans-serif",
        }}>
          {label}
        </span>
      </div>
      {children}
    </motion.div>
  );
}

function PriceRow({ label, amount, bold }: { label: string; amount: string; bold?: boolean }) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0.5rem 0",
      borderBottom: bold ? "none" : "1px solid rgba(255,255,255,0.06)",
    }}>
      <span style={{
        color: bold ? "#fff" : "rgba(255,255,255,0.6)",
        fontSize: bold ? "1rem" : "0.85rem",
        fontWeight: bold ? 700 : 400,
        fontFamily: bold ? "var(--font-plan-block), sans-serif" : undefined,
      }}>
        {label}
      </span>
      <span style={{
        color: bold ? "#EA580C" : "#fff",
        fontSize: bold ? "1.15rem" : "0.85rem",
        fontWeight: bold ? 700 : 500,
        fontFamily: "var(--font-plan-block), sans-serif",
      }}>
        {amount}
      </span>
    </div>
  );
}

// ── Main Component ──

export default function ItineraryClient({
  plan,
  selectedOptions,
  planId,
  tier,
  dest,
  timing,
  isOwner = false,
}: {
  plan: GeneratedPlan;
  selectedOptions: Record<string, string[]> | null;
  planId: string;
  tier: TripTier;
  dest: string;
  timing?: TripTiming | null;
  /**
   * True only when the viewer's session matches the plan organizer. Forwarded
   * crew members get a read-only itinerary: the content, print, and add-to-
   * calendar all work, but the owner-only "Share with Crew" (send-emails) and
   * "Edit Selections" (→ /plan/build, login-gated) controls are hidden so they
   * never bounce to /login. Owner mutations stay gated server-side regardless.
   */
  isOwner?: boolean;
}) {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [senderName, setSenderName] = useState("");
  const [sendingEmails, setSendingEmails] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState("");

  const numDays = plan.schedule?.length || plan.numberOfDays || 3;
  const numNights = numDays + 2; // arrival night + activity days + departure night
  const groupSize = plan.groupSize || 12;

  // Build selected course/dining/bar lists from selectedOptions or fall back to plan defaults
  const selectedCourseNames = selectedOptions?.courses || plan.courses.map((c) => c.name);
  const selectedDiningNames = selectedOptions?.dining || plan.dining.map((d) => d.name);
  const selectedBarNames = selectedOptions?.bars || plan.bars.map((b) => b.name);
  const selectedLodgingName = selectedOptions?.lodging?.[0] || plan.lodging.name;

  // Build day-by-day itinerary
  const dayItineraries: DayItinerary[] = useMemo(() => {
    const days: DayItinerary[] = [];

    for (let d = 0; d < numDays; d++) {
      const dayNum = d + 1;

      // Morning course: prefer selected course for this day's AM slot
      const amCourse = plan.courses.find(
        (c) => c.day === dayNum && c.session === "AM" && selectedCourseNames.includes(c.name)
      ) || plan.courses.find((c) => c.day === dayNum && c.session === "AM");

      // Afternoon: check if there's an activity selected for this day
      const activities = selectedOptions?.activities ?? [];
      const hasActivity = activities.length > 0;
      const activityForDay = hasActivity ? activities[d % activities.length] : null;

      // PM course
      const pmCourse = activityForDay
        ? null
        : plan.courses.find(
            (c) => c.day === dayNum && c.session === "PM" && selectedCourseNames.includes(c.name)
          ) || plan.courses.find((c) => c.day === dayNum && c.session === "PM");

      // Dinner for this day
      const dinnerName = selectedDiningNames[d % selectedDiningNames.length];
      const dinner = plan.dining.find((r) => r.name === dinnerName) || plan.dining[d % plan.dining.length] || null;

      // Bar for this day
      const barName = selectedBarNames[d % selectedBarNames.length];
      const bar = plan.bars.find((b) => b.name === barName) || plan.bars[d % plan.bars.length] || null;

      days.push({
        day: dayNum,
        morning: amCourse || null,
        afternoon: pmCourse || null,
        afternoonActivity: activityForDay,
        dinner,
        bar,
      });
    }
    return days;
  }, [plan, numDays, selectedCourseNames, selectedDiningNames, selectedBarNames, selectedOptions]);

  // Per-day events for the .ics export — round + tee-time guidance baked in.
  const icsDays: IcsDay[] = useMemo(() => {
    const teeTip = plan.groupLogistics?.teeTimeStrategy || "";
    return dayItineraries.map((day) => {
      const rounds: string[] = [];
      if (day.morning) rounds.push(`AM round: ${day.morning.name}${day.morning.greenFee ? ` (${day.morning.greenFee})` : ""}`);
      if (day.afternoon) rounds.push(`PM round: ${day.afternoon.name}${day.afternoon.greenFee ? ` (${day.afternoon.greenFee})` : ""}`);
      if (day.afternoonActivity) rounds.push(`PM: ${day.afternoonActivity}`);

      const headline =
        day.morning?.name ||
        day.afternoon?.name ||
        day.afternoonActivity ||
        "Free day";
      const summary = `Day ${day.day} — ${headline}`;

      const descLines: string[] = [];
      if (rounds.length) descLines.push(rounds.join("\n"));
      if (day.dinner) descLines.push(`Dinner: ${day.dinner.name}`);
      if (day.bar) descLines.push(`Drinks: ${day.bar.name}`);
      if (day.morning || day.afternoon) {
        descLines.push(
          teeTip
            ? `Tee times: ${teeTip}`
            : "Tee times: book group tee times well ahead — large groups fill blocks fast."
        );
      }
      return { day: day.day, summary, description: descLines.join("\n\n") || `Golf trip to ${plan.destination}.` };
    });
  }, [dayItineraries, plan.groupLogistics, plan.destination]);

  // Lodging info
  const lodgingName = selectedLodgingName;
  const lodgingCostPerNight = parseDollars(plan.lodging.costPerNight);
  const lodgingTotal = lodgingCostPerNight * numNights;
  const lodgingPerPerson = Math.round(lodgingTotal / groupSize);

  // Golf total
  const golfTotal = useMemo(() => {
    let total = 0;
    for (const day of dayItineraries) {
      if (day.morning) total += parseDollars(day.morning.greenFee);
      if (day.afternoon) total += parseDollars(day.afternoon.greenFee);
    }
    return total;
  }, [dayItineraries]);

  // Dining estimate: sum per-person cost for each day's selected restaurant
  const diningEstimate = useMemo(() => {
    let total = 0;
    for (const day of dayItineraries) {
      total += day.dinner ? diningPricePerPerson(day.dinner.priceRange) : 50;
    }
    return total;
  }, [dayItineraries]);

  // Nightlife estimate: ~$40/person/night for bar costs
  const nightlifeEstimate = useMemo(() => {
    let total = 0;
    for (const day of dayItineraries) {
      total += day.bar ? 40 : 0;
    }
    return total;
  }, [dayItineraries]);

  // Transport cost
  const selectedTransport = selectedOptions?.transport?.[0] || "rental-car";
  const transportCost = useMemo(() => {
    if (selectedTransport === "rental-car") return 50 * numDays;
    if (selectedTransport === "party-bus") return Math.round((200 * numDays) / groupSize);
    if (selectedTransport === "limo-service") return Math.round((300 * numDays) / groupSize);
    if (selectedTransport === "airport-shuttle") return 25;
    return 0; // "none"
  }, [selectedTransport, numDays, groupSize]);

  const transportLabel = useMemo(() => {
    if (selectedTransport === "rental-car") return "Transport (Rental Car)";
    if (selectedTransport === "party-bus") return "Transport (Party Bus)";
    if (selectedTransport === "limo-service") return "Transport (Limo Service)";
    if (selectedTransport === "airport-shuttle") return "Transport (Airport Shuttle)";
    return "Transport";
  }, [selectedTransport]);

  const grandTotal = lodgingPerPerson + golfTotal + diningEstimate + nightlifeEstimate + transportCost;

  // Email sending
  const sendToCrewEmails = async () => {
    if (!emailInput.trim()) return;
    const emails = emailInput.split(/[,\s]+/).filter((e) => e.includes("@"));
    if (emails.length === 0) {
      setEmailError("Enter at least one valid email");
      return;
    }

    setSendingEmails(true);
    setEmailError("");
    try {
      const res = await fetch("/api/send-plan-emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, emails, senderName: senderName || undefined }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send");
      }
      setEmailSent(true);
      setEmailInput("");
      setSenderName("");
      setTimeout(() => {
        setEmailSent(false);
        setShowEmailForm(false);
      }, 3000);
    } catch (err) {
      setEmailError(err instanceof Error ? err.message : "Failed to send emails");
    } finally {
      setSendingEmails(false);
    }
  };

  return (
    <main style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "clamp(2rem, 6vw, 4rem) clamp(1rem, 4vw, 3rem)" }}>
      <MulliganButton href={`/plan/build?planId=${planId}&dest=${dest}&tier=${tier}`} />
      <HomeButton />

      {/* Breadcrumb */}
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <PlanBreadcrumb planId={planId} dest={dest} tier={tier} current="itinerary" />
      </div>

      {/* ── Trip Summary Header ── */}
      <div style={{ textAlign: "center", maxWidth: 700, margin: "1.5rem auto 2.5rem" }}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontFamily: "var(--font-plan-block), sans-serif",
            fontSize: "clamp(2rem, 6vw, 3.5rem)",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            marginBottom: "0.5rem",
            lineHeight: 1.1,
          }}
        >
          {plan.tripName || "Your Itinerary"}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem", marginBottom: "1rem" }}
        >
          {plan.destination} · {groupSize} Golfers · {numDays} Days
        </motion.p>

        {/* Big price */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, type: "spring", stiffness: 200 }}
          style={{
            display: "inline-block",
            background: "#111",
            border: "1px solid #222",
            borderRadius: 12,
            padding: "1rem 2rem",
          }}
        >
          <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "0.25rem" }}>
            Estimated Total
          </span>
          <span style={{
            fontFamily: "var(--font-plan-block), sans-serif",
            fontSize: "clamp(2rem, 5vw, 2.8rem)",
            fontWeight: 700,
            color: "#EA580C",
            letterSpacing: "0.02em",
          }}>
            {formatDollars(grandTotal)}
          </span>
          <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginLeft: "0.35rem" }}>/ person</span>
        </motion.div>
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto" }}>

        {/* ── Lodging Section ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            marginBottom: "2.5rem",
          }}
        >
          <h2 style={{
            fontFamily: "var(--font-plan-block), sans-serif",
            fontSize: "1.5rem",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "#fff",
            marginBottom: "1rem",
          }}>
            Lodging
          </h2>
          <div style={{
            background: "#111",
            border: "1px solid #222",
            borderRadius: 10,
            padding: "1.25rem",
          }}>
            <p style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.35rem" }}>{lodgingName}</p>
            <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", marginBottom: "0.15rem" }}>{plan.lodging.type}</p>
            {plan.lodging.address && (
              <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", marginBottom: "0.5rem" }}>{plan.lodging.address}</p>
            )}
            <div style={{ display: "flex", gap: "1.5rem", marginTop: "0.5rem" }}>
              <div>
                <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block" }}>Per Night</span>
                <span style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "1rem", color: "#fff" }}>{plan.lodging.costPerNight}</span>
              </div>
              <div>
                <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block" }}>Total ({numNights} night{numNights !== 1 ? "s" : ""})</span>
                <span style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "1rem", color: "#fff" }}>{formatDollars(lodgingTotal)}</span>
              </div>
            </div>
            {plan.lodging.rationale && (
              <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", marginTop: "0.6rem", fontStyle: "italic" }}>
                {plan.lodging.rationale}
              </p>
            )}
            {/* lodging.url intentionally NOT rendered — prices are estimated,
                Claude-emitted URLs often 404 or point to wrong listings.
                Server also strips plan.lodging.url post-parse. */}
          </div>
        </motion.section>

        {/* ── Full Schedule (all days from AI) ── */}
        {plan.schedule?.length > 0 ? (
          plan.schedule.map((day, di) => (
            <motion.section
              key={day.day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * di + 0.3 }}
              style={{
                marginBottom: "2.5rem",
                borderTop: di > 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                paddingTop: di > 0 ? "2rem" : 0,
              }}
            >
              <h2 style={{
                fontFamily: "var(--font-plan-block), sans-serif",
                fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#EA580C",
                marginBottom: "1.25rem",
              }}>
                {day.label}
              </h2>

              {day.items.map((item, j) => (
                <ScheduleItemCard key={j} item={item} plan={plan} />
              ))}
            </motion.section>
          ))
        ) : (
          /* Fallback: use constructed dayItineraries if no schedule */
          dayItineraries.map((day, di) => (
            <motion.section
              key={day.day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * di + 0.3 }}
              style={{
                marginBottom: "2.5rem",
                borderTop: di > 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                paddingTop: di > 0 ? "2rem" : 0,
              }}
            >
              <h2 style={{
                fontFamily: "var(--font-plan-block), sans-serif",
                fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#EA580C",
                marginBottom: "1.25rem",
              }}>
                Day {day.day}
              </h2>
              {day.morning && (
                <ItineraryCard icon="⛳" label="Morning — Round 1">
                  <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <div style={{ flexShrink: 0, width: 48, height: 48, borderRadius: 6, overflow: "hidden", position: "relative", border: "1px solid rgba(255,255,255,0.1)" }}>
                      <Image src={day.morning.imageUrl || getFallbackImage(day.morning.name)} alt={day.morning.name} fill sizes="48px" style={{ objectFit: "cover" }} unoptimized />
                    </div>
                    <div>
                      <p style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: "0.2rem" }}>{day.morning.name}</p>
                      <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>Green fee: {day.morning.greenFee}/pp</p>
                      {day.morning.whyThisCourse && <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", marginTop: "0.3rem", fontStyle: "italic" }}>{day.morning.whyThisCourse}</p>}
                    </div>
                  </div>
                </ItineraryCard>
              )}
              {day.afternoon && (
                <ItineraryCard icon="⛳" label="Afternoon — Round 2">
                  <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <div style={{ flexShrink: 0, width: 48, height: 48, borderRadius: 6, overflow: "hidden", position: "relative", border: "1px solid rgba(255,255,255,0.1)" }}>
                      <Image src={day.afternoon.imageUrl || getFallbackImage(day.afternoon.name)} alt={day.afternoon.name} fill sizes="48px" style={{ objectFit: "cover" }} unoptimized />
                    </div>
                    <div>
                      <p style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: "0.2rem" }}>{day.afternoon.name}</p>
                      <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>Green fee: {day.afternoon.greenFee}/pp</p>
                    </div>
                  </div>
                </ItineraryCard>
              )}
              {day.afternoonActivity && (
                <ItineraryCard icon="🎯" label="Afternoon — Activity">
                  <p style={{ fontSize: "1.05rem", fontWeight: 600 }}>{day.afternoonActivity}</p>
                </ItineraryCard>
              )}
              {day.dinner && (
                <ItineraryCard icon="🍽️" label="Dinner">
                  <p style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: "0.2rem" }}>{day.dinner.name}</p>
                  <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>{day.dinner.type}</p>
                </ItineraryCard>
              )}
              {day.bar && (
                <ItineraryCard icon="🍺" label="Nightlife">
                  <p style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: "0.2rem" }}>{day.bar.name}</p>
                  <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>{day.bar.vibe}</p>
                </ItineraryCard>
              )}
            </motion.section>
          ))
        )}

        {/* ── Pricing Breakdown ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * numDays + 0.55 }}
          style={{
            marginBottom: "2.5rem",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "2rem",
          }}
        >
          <h2 style={{
            fontFamily: "var(--font-plan-block), sans-serif",
            fontSize: "1.5rem",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "#fff",
            marginBottom: "1rem",
          }}>
            Price Breakdown
          </h2>
          <div style={{
            background: "#111",
            border: "1px solid #222",
            borderRadius: 10,
            padding: "1.25rem",
          }}>
            <PriceRow label="Lodging" amount={`${formatDollars(lodgingPerPerson)}/pp`} />
            <PriceRow label="Golf" amount={`${formatDollars(golfTotal)}/pp`} />
            <PriceRow label="Dining (est.)" amount={`${formatDollars(diningEstimate)}/pp`} />
            {nightlifeEstimate > 0 && (
              <PriceRow label="Nightlife (est.)" amount={`${formatDollars(nightlifeEstimate)}/pp`} />
            )}
            {transportCost > 0 && (
              <PriceRow label={transportLabel} amount={`${formatDollars(transportCost)}/pp`} />
            )}
            <div style={{ marginTop: "0.5rem", paddingTop: "0.75rem", borderTop: "1px solid rgba(255,255,255,0.12)" }}>
              <PriceRow label="Grand Total" amount={`${formatDollars(grandTotal)}/pp`} bold />
            </div>
          </div>
        </motion.section>

        {/* ── Pro Tips & Logistics (collapsed) ── */}
        {(plan.proTips?.length > 0 || plan.groupLogistics) && (
          <ProTipsSection plan={plan} />
        )}

        {/* ── Bottom Actions ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * numDays + 0.7 }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            marginBottom: "3rem",
          }}
        >
          {/* Share with Crew — owner only (send-plan-emails is 403 for non-owners) */}
          {isOwner && (!showEmailForm ? (
            <button
              onClick={() => setShowEmailForm(true)}
              style={{
                padding: "14px 32px",
                background: "rgba(220,38,38,0.9)",
                border: "none",
                borderRadius: 8,
                color: "#fff",
                fontSize: "0.95rem",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                fontFamily: "var(--font-plan-block), sans-serif",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Share with Crew
            </button>
          ) : (
            <div style={{
              background: "#111",
              border: "1px solid #222",
              borderRadius: 10,
              padding: "1.25rem",
            }}>
              {emailSent ? (
                <p style={{ textAlign: "center", color: "#6ee7b7", fontWeight: 600 }}>Sent! Your crew is in the loop.</p>
              ) : (
                <>
                  <p style={{
                    fontSize: "0.8rem",
                    color: "rgba(255,255,255,0.5)",
                    marginBottom: "0.75rem",
                    fontFamily: "var(--font-plan-block), sans-serif",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}>
                    Send itinerary to the crew
                  </p>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 6,
                      color: "#fff",
                      fontSize: "0.85rem",
                      marginBottom: "0.5rem",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Enter emails (comma-separated)"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 6,
                      color: "#fff",
                      fontSize: "0.85rem",
                      marginBottom: "0.75rem",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                  {emailError && (
                    <p style={{ fontSize: "0.75rem", color: "#f87171", marginBottom: "0.5rem" }}>{emailError}</p>
                  )}
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      onClick={sendToCrewEmails}
                      disabled={sendingEmails}
                      style={{
                        flex: 1,
                        padding: "10px",
                        background: "rgba(220,38,38,0.9)",
                        border: "none",
                        borderRadius: 6,
                        color: "#fff",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        cursor: sendingEmails ? "wait" : "pointer",
                        opacity: sendingEmails ? 0.6 : 1,
                        fontFamily: "var(--font-plan-block), sans-serif",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {sendingEmails ? "Sending..." : "Send"}
                    </button>
                    <button
                      onClick={() => { setShowEmailForm(false); setEmailError(""); }}
                      style={{
                        padding: "10px 16px",
                        background: "none",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: 6,
                        color: "rgba(255,255,255,0.5)",
                        fontSize: "0.85rem",
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}


          {/* Print Itinerary */}
          <button
            data-print-hide
            onClick={() => window.print()}
            style={{
              padding: "14px 32px",
              background: "#111",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 8,
              color: "rgba(255,255,255,0.7)",
              fontSize: "0.9rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              fontFamily: "var(--font-plan-block), sans-serif",
              cursor: "pointer",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              transition: "border-color 0.15s, color 0.15s",
            }}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4H7v4a2 2 0 002 2zm0-16h6a2 2 0 012 2v2H7V5a2 2 0 012-2z" />
            </svg>
            Print Itinerary
          </button>

          {/* Add to Calendar */}
          <button
            data-print-hide
            onClick={() => generateICSFile(plan.tripName || "Golf Trip", plan.destination, numDays, icsDays, timing)}
            style={{
              padding: "14px 32px",
              background: "#111",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 8,
              color: "rgba(255,255,255,0.7)",
              fontSize: "0.9rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              fontFamily: "var(--font-plan-block), sans-serif",
              cursor: "pointer",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              transition: "border-color 0.15s, color 0.15s",
            }}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Add to Calendar
          </button>

          {/* Edit Selections — owner only (build flow is login + ownership gated) */}
          {isOwner && (
          <a
            href={`/plan/build?planId=${planId}&dest=${dest}&tier=${tier}`}
            style={{
              display: "block",
              textAlign: "center",
              padding: "14px 32px",
              background: "none",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 8,
              color: "rgba(255,255,255,0.7)",
              fontSize: "0.9rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              fontFamily: "var(--font-plan-block), sans-serif",
              textDecoration: "none",
              transition: "border-color 0.15s, color 0.15s",
            }}
          >
            Edit Selections
          </a>
          )}
        </motion.div>

      </div>
    </main>
  );
}

function ProTipsSection({ plan }: { plan: GeneratedPlan }) {
  const [open, setOpen] = useState(false);
  const hasLogistics = plan.groupLogistics && (plan.groupLogistics.teeTimeStrategy || plan.groupLogistics.transport || plan.groupLogistics.packingList?.length > 0);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      style={{ marginTop: "2rem", marginBottom: "3rem" }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: "none",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 10,
          cursor: "pointer",
          width: "100%",
          textAlign: "left",
          padding: "1.25rem 1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          transition: "border-color 0.2s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
      >
        <span style={{
          fontFamily: "var(--font-plan-block), sans-serif",
          fontSize: "1.2rem",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: "#fff",
        }}>
          Pro Tips & Logistics
        </span>
        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "1.2rem", transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
          ▾
        </span>
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          style={{
            background: "#111",
            border: "1px solid rgba(255,255,255,0.1)",
            borderTop: "none",
            borderRadius: "0 0 10px 10px",
            padding: "1.5rem",
          }}
        >
          {plan.proTips?.length > 0 && (
            <div style={{ marginBottom: hasLogistics ? "1.5rem" : 0 }}>
              <h3 style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#EA580C", marginBottom: "0.75rem" }}>
                Pro Tips
              </h3>
              <ul style={{ margin: 0, paddingLeft: "1.2rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {plan.proTips.map((tip, i) => (
                  <li key={i} style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {hasLogistics && (
            <div>
              <h3 style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#EA580C", marginBottom: "0.75rem" }}>
                Logistics
              </h3>
              {plan.groupLogistics.teeTimeStrategy && (
                <div style={{ marginBottom: "0.75rem" }}>
                  <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.25rem" }}>Tee Time Strategy</p>
                  <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{plan.groupLogistics.teeTimeStrategy}</p>
                </div>
              )}
              {plan.groupLogistics.transport && (
                <div style={{ marginBottom: "0.75rem" }}>
                  <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.25rem" }}>Transport</p>
                  <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{plan.groupLogistics.transport}</p>
                </div>
              )}
              {plan.groupLogistics.packingList?.length > 0 && (
                <div>
                  <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.25rem" }}>Packing List</p>
                  <ul style={{ margin: 0, paddingLeft: "1.2rem", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                    {plan.groupLogistics.packingList.map((item, i) => (
                      <li key={i} style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.4 }}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </motion.div>
      )}
    </motion.section>
  );
}
