"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import type { GeneratedPlan, TripTier, PlanCourse, PlanDining, PlanBar } from "@/lib/plan-types";
import MulliganButton from "./MulliganButton";
import HomeButton from "./HomeButton";
import PlanBreadcrumb from "./PlanBreadcrumb";

// ── Helpers ──

function parseDollars(s: string | undefined): number {
  if (!s) return 0;
  const m = s.replace(/[^0-9.]/g, "");
  return parseFloat(m) || 0;
}

function formatDollars(n: number): string {
  return "$" + n.toLocaleString();
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
}: {
  plan: GeneratedPlan;
  selectedOptions: Record<string, string[]> | null;
  planId: string;
  tier: TripTier;
  dest: string;
}) {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [senderName, setSenderName] = useState("");
  const [sendingEmails, setSendingEmails] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState("");

  const numDays = plan.schedule?.length || plan.numberOfDays || 3;
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
      const hasActivity = selectedOptions?.activities && selectedOptions.activities.length > 0;
      const activityForDay = hasActivity ? selectedOptions!.activities[d % selectedOptions!.activities.length] : null;

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

  // Lodging info
  const lodgingName = selectedLodgingName;
  const lodgingCostPerNight = parseDollars(plan.lodging.costPerNight);
  const lodgingTotal = lodgingCostPerNight * numDays;
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

  // Dining estimate from budget breakdown
  const diningEstimate = useMemo(() => {
    const item = plan.estimatedBudget?.breakdown?.find(
      (b) => b.category.toLowerCase().includes("dining") || b.category.toLowerCase().includes("food")
    );
    return item ? parseDollars(item.perPerson) : Math.round(numDays * 65);
  }, [plan, numDays]);

  const grandTotal = lodgingPerPerson + golfTotal + diningEstimate;

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

        {/* ── Day-by-Day Breakdown ── */}
        {dayItineraries.map((day, di) => (
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
            {/* Day header */}
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

            {/* Morning */}
            {day.morning && (
              <ItineraryCard icon="⛳" label="Morning — Round 1">
                <p style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: "0.2rem" }}>{day.morning.name}</p>
                <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>
                  Green fee: {day.morning.greenFee}/pp
                </p>
                {day.morning.whyThisCourse && (
                  <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", marginTop: "0.3rem", fontStyle: "italic" }}>
                    {day.morning.whyThisCourse}
                  </p>
                )}
              </ItineraryCard>
            )}

            {/* Afternoon */}
            {day.afternoon && (
              <ItineraryCard icon="⛳" label="Afternoon — Round 2">
                <p style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: "0.2rem" }}>{day.afternoon.name}</p>
                <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>
                  Green fee: {day.afternoon.greenFee}/pp
                </p>
                {day.afternoon.whyThisCourse && (
                  <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", marginTop: "0.3rem", fontStyle: "italic" }}>
                    {day.afternoon.whyThisCourse}
                  </p>
                )}
              </ItineraryCard>
            )}

            {day.afternoonActivity && (
              <ItineraryCard icon="🎯" label="Afternoon — Activity">
                <p style={{ fontSize: "1.05rem", fontWeight: 600 }}>{day.afternoonActivity}</p>
              </ItineraryCard>
            )}

            {/* Travel note */}
            {day.morning && day.afternoon && day.morning.name !== day.afternoon.name && (
              <div style={{
                padding: "0.5rem 1rem",
                background: "rgba(212,168,67,0.08)",
                border: "1px solid rgba(212,168,67,0.15)",
                borderRadius: 8,
                marginBottom: "0.75rem",
                fontSize: "0.75rem",
                color: "#D4A843",
              }}>
                🚗 Check drive time between {day.morning.name} and {day.afternoon.name}
              </div>
            )}

            {/* Dinner */}
            {day.dinner && (
              <ItineraryCard icon="🍽️" label="Dinner">
                <p style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: "0.2rem" }}>{day.dinner.name}</p>
                <div style={{ display: "flex", gap: "0.75rem", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>
                  <span>{day.dinner.type}</span>
                  {day.dinner.priceRange && <span>· {day.dinner.priceRange}</span>}
                </div>
                {day.dinner.description && (
                  <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", marginTop: "0.3rem" }}>
                    {day.dinner.description}
                  </p>
                )}
              </ItineraryCard>
            )}

            {/* Nightlife */}
            {day.bar && (
              <ItineraryCard icon="🍺" label="Nightlife">
                <p style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: "0.2rem" }}>{day.bar.name}</p>
                <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>{day.bar.vibe}</p>
                {day.bar.description && (
                  <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", marginTop: "0.3rem" }}>
                    {day.bar.description}
                  </p>
                )}
              </ItineraryCard>
            )}
          </motion.section>
        ))}

        {/* ── Lodging Section ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * numDays + 0.4 }}
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
                <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block" }}>Total ({numDays} nights)</span>
                <span style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "1rem", color: "#fff" }}>{formatDollars(lodgingTotal)}</span>
              </div>
            </div>
            {plan.lodging.rationale && (
              <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", marginTop: "0.6rem", fontStyle: "italic" }}>
                {plan.lodging.rationale}
              </p>
            )}
          </div>
        </motion.section>

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
            <div style={{ marginTop: "0.5rem", paddingTop: "0.75rem", borderTop: "1px solid rgba(255,255,255,0.12)" }}>
              <PriceRow label="Grand Total" amount={`${formatDollars(grandTotal)}/pp`} bold />
            </div>
          </div>
        </motion.section>

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
          {/* Share with Crew */}
          {!showEmailForm ? (
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
          )}

          {/* Edit Selections */}
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
        </motion.div>
      </div>
    </main>
  );
}
