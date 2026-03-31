"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import MulliganButton from "./MulliganButton";

interface PlannedTrip {
  id: string;
  city: string;
  state: string;
  createdAt: string;
  paid: boolean;
  groupSize: number;
  numberOfDays: number;
}

interface PastTrip {
  year: number;
  location: string;
  state: string;
  tagline: string;
  dates: string;
  heroImage: string;
  slug: string;
  attended: boolean;
}

export default function MyTripsClient({
  email,
  name: initialName,
  plannedTrips,
  pastTrips,
}: {
  email: string;
  name: string;
  plannedTrips: PlannedTrip[];
  pastTrips: PastTrip[];
}) {
  const [name, setName] = useState(initialName);
  const [editingName, setEditingName] = useState(false);
  const [attended, setAttended] = useState<Set<number>>(
    new Set(pastTrips.filter((t) => t.attended).map((t) => t.year))
  );
  const [saving, setSaving] = useState(false);

  const toggleAttendance = async (year: number) => {
    const next = new Set(attended);
    if (next.has(year)) {
      next.delete(year);
    } else {
      next.add(year);
    }
    setAttended(next);

    // Save immediately
    await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ attendedYears: Array.from(next) }),
    }).catch(() => {});
  };

  const saveName = async () => {
    setSaving(true);
    await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    }).catch(() => {});
    setEditingName(false);
    setSaving(false);
  };

  const attendedTrips = pastTrips.filter((t) => attended.has(t.year));
  const stats = {
    trips: attendedTrips.length,
    rounds: attendedTrips.length * 6, // ~6 rounds per trip
    years: attendedTrips.length > 0
      ? `${Math.min(...attendedTrips.map((t) => t.year))}–${Math.max(...attendedTrips.map((t) => t.year))}`
      : "—",
  };

  return (
    <main style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "clamp(2rem, 6vw, 4rem) clamp(1rem, 4vw, 3rem)" }}>
      <MulliganButton />

      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>😈</div>

          {editingName ? (
            <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") saveName(); }}
                autoFocus
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 6,
                  padding: "8px 16px",
                  color: "#fff",
                  fontSize: "1.2rem",
                  textAlign: "center",
                  outline: "none",
                  fontFamily: "var(--font-plan-groovy), cursive",
                }}
              />
              <button onClick={saveName} disabled={saving} style={{ padding: "8px 16px", background: "rgba(220,38,38,0.9)", border: "none", borderRadius: 6, color: "#fff", fontSize: "0.8rem", cursor: "pointer" }}>
                {saving ? "..." : "Save"}
              </button>
            </div>
          ) : (
            <h1
              onClick={() => setEditingName(true)}
              style={{
                fontFamily: "var(--font-plan-groovy), cursive",
                fontSize: "clamp(2rem, 6vw, 3.5rem)",
                marginBottom: "0.25rem",
                cursor: "pointer",
              }}
              title="Click to edit name"
            >
              {name || "Set Your Name"}
            </h1>
          )}

          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.85rem" }}>{email}</p>

          {/* Stats */}
          {attendedTrips.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1.5rem 2rem", marginTop: "1.5rem" }}>
              {[
                { label: "Trips", value: stats.trips },
                { label: "Rounds", value: `~${stats.rounds}` },
                { label: "Years", value: stats.years },
              ].map(({ label, value }) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff" }}>{value}</div>
                  <div style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>{label}</div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* ── Planned Trips ── */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{
            fontFamily: "var(--font-plan-script), cursive",
            fontSize: "1.8rem",
            marginBottom: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            My Planned Trips
            <Link href="/plan-a-trip" style={{ fontSize: "0.8rem", color: "rgba(220,38,38,0.8)", textDecoration: "none", fontFamily: "var(--font-space), sans-serif" }}>
              + Plan a Trip
            </Link>
          </h2>

          {plannedTrips.length === 0 ? (
            <div style={{
              textAlign: "center",
              padding: "3rem 2rem",
              background: "rgba(255,255,255,0.02)",
              border: "1px dashed rgba(255,255,255,0.1)",
              borderRadius: 12,
            }}>
              <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: "1rem" }}>No planned trips yet.</p>
              <Link href="/plan-a-trip" style={{ color: "rgba(220,38,38,0.9)", textDecoration: "none", fontWeight: 600, fontSize: "0.9rem" }}>
                Plan your first trip →
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {plannedTrips.map((trip, i) => (
                <motion.div key={trip.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Link href={`/plan/result/${trip.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <div style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 10,
                      padding: "1.25rem 1.25rem",
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "0.5rem",
                      cursor: "pointer",
                      transition: "border-color 0.2s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                    >
                      <div>
                        <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.2rem" }}>
                          {trip.city}, {trip.state}
                        </h3>
                        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8rem" }}>
                          {trip.groupSize} people · {trip.numberOfDays} days · {new Date(trip.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        {trip.paid && (
                          <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", padding: "3px 8px", background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 4, color: "rgba(74,222,128,0.9)" }}>
                            UNLOCKED
                          </span>
                        )}
                        <span style={{ color: "rgba(255,255,255,0.2)" }}>→</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* ── Past TDF Trips ── */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "var(--font-plan-script), cursive", fontSize: "1.8rem", marginBottom: "0.5rem" }}>
            TDF History
          </h2>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", marginBottom: "1.5rem" }}>
            Tap the trips you were on to build your TDF record.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {pastTrips.map((trip, i) => {
              const isAttended = attended.has(trip.year);
              return (
                <motion.div key={trip.year} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}>
                  <div style={{
                    background: isAttended ? "rgba(220,38,38,0.06)" : "rgba(255,255,255,0.02)",
                    border: isAttended ? "1px solid rgba(220,38,38,0.3)" : "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 10,
                    padding: "1rem 1.25rem",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "0.5rem",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onClick={() => toggleAttendance(trip.year)}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <span style={{
                        fontFamily: "var(--font-plan-block), sans-serif",
                        fontSize: "1.8rem",
                        color: isAttended ? "rgba(220,38,38,0.9)" : "rgba(255,255,255,0.15)",
                        minWidth: "3.5rem",
                      }}>
                        {trip.year}
                      </span>
                      <div>
                        <h3 style={{ fontSize: "1rem", fontWeight: 600, color: isAttended ? "#fff" : "rgba(255,255,255,0.5)" }}>
                          {trip.location}, {trip.state}
                        </h3>
                        <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>
                          {trip.dates}
                        </p>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      {isAttended && (
                        <Link
                          href={`/trip/${trip.slug}`}
                          onClick={(e) => e.stopPropagation()}
                          style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", textDecoration: "none" }}
                        >
                          View →
                        </Link>
                      )}
                      <div style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        border: isAttended ? "2px solid rgba(220,38,38,0.8)" : "2px solid rgba(255,255,255,0.15)",
                        background: isAttended ? "rgba(220,38,38,0.9)" : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.75rem",
                        color: "#fff",
                        transition: "all 0.2s",
                      }}>
                        {isAttended && "✓"}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
