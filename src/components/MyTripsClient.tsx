"use client";

import { motion } from "motion/react";
import Link from "next/link";
import MulliganButton from "./MulliganButton";

interface TripSummary {
  id: string;
  city: string;
  state: string;
  createdAt: string;
  paid: boolean;
  groupSize: number;
  numberOfDays: number;
}

export default function MyTripsClient({
  email,
  plans,
}: {
  email: string;
  plans: TripSummary[];
}) {
  return (
    <main style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "clamp(2rem, 6vw, 4rem) clamp(1rem, 4vw, 3rem)" }}>
      <MulliganButton />

      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <h1 style={{
            fontFamily: "var(--font-plan-groovy), cursive",
            fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
            marginBottom: "0.5rem",
          }}>
            My Trips
          </h1>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.85rem" }}>
            {email}
          </p>
        </motion.div>

        {/* Trip Cards */}
        {plans.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: "center", padding: "4rem 2rem" }}
          >
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "1.1rem", marginBottom: "2rem" }}>
              No trips yet. Time to plan one.
            </p>
            <Link
              href="/plan"
              style={{
                display: "inline-block",
                padding: "12px 32px",
                background: "rgba(220,38,38,0.9)",
                borderRadius: 6,
                color: "#fff",
                fontWeight: 600,
                textDecoration: "none",
                fontSize: "0.9rem",
              }}
            >
              Plan a Trip
            </Link>
          </motion.div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {plans.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={`/plan/result/${plan.id}`}
                  style={{ textDecoration: "none", color: "inherit", display: "block" }}
                >
                  <div style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 12,
                    padding: "1.5rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    <div>
                      <h3 style={{ fontSize: "1.2rem", fontWeight: 600, marginBottom: "0.25rem" }}>
                        {plan.city}, {plan.state}
                      </h3>
                      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>
                        {plan.groupSize} people · {plan.numberOfDays} days · {new Date(plan.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      {plan.paid && (
                        <span style={{
                          fontSize: "0.6rem",
                          fontWeight: 700,
                          letterSpacing: "0.12em",
                          padding: "3px 8px",
                          background: "rgba(74,222,128,0.15)",
                          border: "1px solid rgba(74,222,128,0.3)",
                          borderRadius: 4,
                          color: "rgba(74,222,128,0.9)",
                        }}>
                          UNLOCKED
                        </span>
                      )}
                      <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "1.2rem" }}>→</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
