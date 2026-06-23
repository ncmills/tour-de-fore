"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import type { GeneratedPlan } from "@/lib/plan-types";
import { formatTripDates, type TripTiming } from "@/lib/trip-dates";

export default function ShareableTripClient({
  plan,
  planId,
  selectedOptions,
  timing,
}: {
  plan: GeneratedPlan;
  planId: string;
  selectedOptions?: Record<string, string[]>;
  /** Structured timing — drives the dates string (same source as the .ics). */
  timing?: TripTiming | null;
}) {
  const [rsvp, setRsvp] = useState<"none" | "in" | "out" | "maybe">("none");
  const [rsvpName, setRsvpName] = useState("");

  const handleRsvp = async (status: "in" | "out" | "maybe") => {
    setRsvp(status);
    await fetch("/api/track-selection", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ destinationId: `rsvp:${planId}`, tier: `${status}:${rsvpName}` }),
    }).catch(() => {});
  };

  return (
    <main style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "clamp(2rem, 6vw, 4rem) clamp(1rem, 4vw, 3rem)" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        {/* Shared-with-you banner — this is the read-only crew viewer. Nudges
            recipients to sign in so they can weigh in (suggest a swap / vote). */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.6rem 1rem",
            marginBottom: "2rem",
            padding: "0.75rem 1rem",
            borderRadius: 10,
            background: "rgba(234,88,12,0.08)",
            border: "1px solid rgba(234,88,12,0.3)",
            textAlign: "center",
          }}
        >
          <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.65)" }}>
            🔥 Shared with you
          </span>
          <Link
            href={`/login?returnTo=${encodeURIComponent(`/trip/plan/${planId}`)}`}
            style={{ fontSize: "0.85rem", fontWeight: 600, color: "#EA580C", textDecoration: "underline" }}
          >
            Sign in to suggest a swap or vote →
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "0.75rem" }}>
            You&apos;re Invited
          </p>
          <h1 style={{
            fontFamily: "var(--font-plan-groovy), cursive",
            fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
            marginBottom: "0.5rem",
          }}>
            {plan.tripName || plan.destination}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1rem", fontStyle: "italic" }}>
            &ldquo;{plan.tagline}&rdquo;
          </p>
          <div style={{ marginTop: "1rem", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem 2rem", fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>
            <span>📍 {plan.destination}</span>
            <span>📅 {formatTripDates(timing)}</span>
            <span>👥 {plan.groupSize} people</span>
          </div>
          <div style={{ marginTop: "0.5rem", fontSize: "1.2rem", fontWeight: 700, color: "rgba(220,38,38,0.9)" }}>
            {plan.estimatedBudget.perPerson} per person
          </div>
        </motion.div>

        {/* Schedule */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "var(--font-plan-script), cursive", fontSize: "1.8rem", marginBottom: "1.5rem" }}>
            The Itinerary
          </h2>
          {plan.schedule.map((day) => (
            <div key={day.day} style={{ marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", marginBottom: "0.75rem", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                {day.label}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {day.items.map((item, j) => (
                  <div key={j} style={{ display: "flex", gap: "1rem", fontSize: "0.85rem" }}>
                    <span style={{ color: "rgba(255,255,255,0.3)", minWidth: 65 }}>{item.time}</span>
                    <span style={{ color: "rgba(255,255,255,0.7)" }}>{item.activity}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Courses */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "var(--font-plan-script), cursive", fontSize: "1.8rem", marginBottom: "1rem" }}>
            The Courses
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {plan.courses.map((c, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "1rem 1.25rem" }}>
                <div style={{ fontWeight: 600, marginBottom: "0.25rem" }}>{c.name}</div>
                <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>
                  Day {c.day} {c.session} · {c.greenFee}/person
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Lodging */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "var(--font-plan-script), cursive", fontSize: "1.8rem", marginBottom: "1rem" }}>
            The Lodging
          </h2>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "1.25rem" }}>
            <div style={{ fontWeight: 600, marginBottom: "0.25rem" }}>{plan.lodging.name}</div>
            <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>{plan.lodging.type} · {plan.lodging.costPerNight}/night</div>
            <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.35)", marginTop: "0.5rem" }}>{plan.lodging.rationale}</div>
          </div>
        </section>

        {/* Budget */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "var(--font-plan-script), cursive", fontSize: "1.8rem", marginBottom: "1rem" }}>
            The Damage
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
            {plan.estimatedBudget.breakdown.map((item) => (
              <div key={item.category} style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: "0.85rem" }}>
                <span style={{ color: "rgba(255,255,255,0.5)" }}>{item.category}</span>
                <span style={{ color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>{item.perPerson}</span>
              </div>
            ))}
          </div>
        </section>

        {/* RSVP */}
        <section style={{
          textAlign: "center",
          background: "rgba(220,38,38,0.06)",
          border: "2px solid rgba(220,38,38,0.3)",
          borderRadius: 16,
          padding: "2.5rem 2rem",
          marginBottom: "4rem",
        }}>
          <h2 style={{ fontFamily: "var(--font-plan-groovy), cursive", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", marginBottom: "1rem" }}>
            Are You In?
          </h2>

          {rsvp === "none" ? (
            <>
              <input
                type="text"
                placeholder="Your name"
                value={rsvpName}
                onChange={(e) => setRsvpName(e.target.value)}
                style={{
                  width: "100%",
                  maxWidth: 300,
                  padding: "10px 16px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 8,
                  color: "#fff",
                  fontSize: "1rem",
                  textAlign: "center",
                  marginBottom: "1.5rem",
                  outline: "none",
                }}
              />
              <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                {[
                  { label: "I'm In 🔥", status: "in" as const, bg: "rgba(220,38,38,0.9)" },
                  { label: "Maybe 🤔", status: "maybe" as const, bg: "rgba(234,88,12,0.7)" },
                  { label: "Can't Make It 💀", status: "out" as const, bg: "rgba(255,255,255,0.1)" },
                ].map(({ label, status, bg }) => (
                  <button
                    key={status}
                    onClick={() => handleRsvp(status)}
                    disabled={!rsvpName.trim()}
                    style={{
                      padding: "10px 24px",
                      background: bg,
                      border: "none",
                      borderRadius: 6,
                      color: "#fff",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      cursor: rsvpName.trim() ? "pointer" : "not-allowed",
                      opacity: rsvpName.trim() ? 1 : 0.4,
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ fontSize: "1.2rem", color: rsvp === "in" ? "var(--color-success)" : rsvp === "maybe" ? "#f97316" : "rgba(255,255,255,0.5)" }}
            >
              {rsvp === "in" ? "You're in! See you on the course." : rsvp === "maybe" ? "We'll keep your spot warm." : "Next time, devil."}
            </motion.p>
          )}
        </section>

        {/* Acquisition loop — turn each shared itinerary into top-of-funnel:
            a recipient who likes this can spin up their own trip for free. */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            textAlign: "center",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "2.5rem",
            marginBottom: "2rem",
          }}
        >
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.6)", marginBottom: "1.25rem" }}>
            Planning your own golf trip?
          </p>
          <Link
            href="/plan-a-trip"
            style={{
              display: "inline-block",
              padding: "0.9rem 2rem",
              background: "rgba(220,38,38,0.9)",
              color: "#fff",
              borderRadius: 8,
              fontFamily: "var(--font-plan-block), sans-serif",
              fontSize: "0.95rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Start free →
          </Link>
          <p style={{ marginTop: "0.85rem", fontSize: "0.78rem", color: "rgba(255,255,255,0.3)" }}>
            133 destinations · 3 price tiers · ~2 minutes · no card.
          </p>
        </motion.section>
      </div>
    </main>
  );
}
