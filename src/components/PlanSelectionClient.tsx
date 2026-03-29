"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ThreePlanResult, TripTier } from "@/lib/plan-types";
import MulliganButton from "./MulliganButton";

const tiers: { key: TripTier; planKey: keyof ThreePlanResult; icon: string; badge?: string }[] = [
  { key: "imp", planKey: "imp", icon: "👿" },
  { key: "devil", planKey: "devil", icon: "😈", badge: "RECOMMENDED" },
  { key: "demon-king", planKey: "demonKing", icon: "👹" },
];

export default function PlanSelectionClient({ planId, plans }: { planId: string; plans: ThreePlanResult }) {
  return (
    <main style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "clamp(2rem, 6vw, 4rem) clamp(1rem, 4vw, 3rem)" }}>
      <MulliganButton />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "clamp(2rem, 5vw, 4rem)" }}>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "0.85rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "0.75rem" }}
        >
          Your Trip Plans Are Ready
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontFamily: "var(--font-plan-groovy), cursive",
            fontSize: "clamp(2.5rem, 7vw, 5rem)",
            color: "#fff",
            marginBottom: "0.5rem",
          }}
        >
          Choose Your Poison
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)", color: "rgba(255,255,255,0.5)", maxWidth: "500px", margin: "0 auto" }}
        >
          {plans.devil.destination} — {plans.devil.numberOfDays} days, {plans.devil.groupSize} people
        </motion.p>
      </div>

      {/* 3 Tier Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "1.5rem",
        maxWidth: "1100px",
        margin: "0 auto",
      }}>
        {tiers.map(({ key, planKey, icon, badge }, i) => {
          const plan = plans[planKey];
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
            >
              <Link
                href={`/plan/result/${planId}?tier=${key}`}
                style={{ textDecoration: "none", color: "inherit", display: "block" }}
              >
                <div
                  style={{
                    position: "relative",
                    background: key === "devil" ? "rgba(220,38,38,0.08)" : "rgba(255,255,255,0.03)",
                    border: key === "devil" ? "2px solid rgba(220,38,38,0.4)" : "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    padding: "2rem 1.75rem",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    overflow: "hidden",
                    minHeight: "380px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.borderColor = key === "devil" ? "rgba(220,38,38,0.7)" : "rgba(255,255,255,0.3)";
                    e.currentTarget.style.boxShadow = key === "devil" ? "0 20px 60px rgba(220,38,38,0.2)" : "0 20px 60px rgba(0,0,0,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = key === "devil" ? "rgba(220,38,38,0.4)" : "rgba(255,255,255,0.1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Badge */}
                  {badge && (
                    <div style={{
                      position: "absolute", top: "1rem", right: "1rem",
                      background: "rgba(220,38,38,0.9)", borderRadius: "4px",
                      padding: "3px 10px", fontSize: "0.6rem", fontWeight: 700,
                      letterSpacing: "0.15em", color: "#fff",
                    }}>
                      {badge}
                    </div>
                  )}

                  {/* Icon */}
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{icon}</div>

                  {/* Tier Name */}
                  <h2 style={{
                    fontFamily: "var(--font-plan-script), cursive",
                    fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                    color: "#fff",
                    marginBottom: "0.25rem",
                  }}>
                    {plan.tierName}
                  </h2>

                  {/* Price */}
                  <div style={{
                    fontSize: "clamp(1.5rem, 3vw, 2rem)",
                    fontWeight: 800,
                    color: key === "devil" ? "rgba(220,38,38,0.9)" : "rgba(255,255,255,0.85)",
                    marginBottom: "1.5rem",
                  }}>
                    {plan.estimatedBudget.perPerson}
                    <span style={{ fontSize: "0.75rem", fontWeight: 400, color: "rgba(255,255,255,0.35)", marginLeft: "0.5rem" }}>per person</span>
                  </div>

                  {/* Highlights */}
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>
                      ⛳ {plan.courses.length} rounds — {plan.courses.map(c => c.name).slice(0, 2).join(", ")}{plan.courses.length > 2 ? "..." : ""}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>
                      🏠 {plan.lodging.type}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>
                      🍽️ {plan.dining.length} dining spots
                    </div>
                    {plan.bars && plan.bars.length > 0 && (
                      <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>
                        🌙 {plan.bars.length} bars
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <div style={{
                    marginTop: "1.5rem",
                    padding: "0.75rem",
                    background: key === "devil" ? "rgba(220,38,38,0.15)" : "rgba(255,255,255,0.05)",
                    borderRadius: "8px",
                    textAlign: "center",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: key === "devil" ? "#fff" : "rgba(255,255,255,0.7)",
                    letterSpacing: "0.05em",
                  }}>
                    View Full Plan →
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </main>
  );
}
