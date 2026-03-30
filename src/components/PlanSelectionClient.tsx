"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ThreeDestinationResult, PriceLevel } from "@/lib/plan-types";
import MulliganButton from "./MulliganButton";

const destinationTiers: { key: PriceLevel; icon: string; label: string; badge?: string }[] = [
  { key: "budget", icon: "👿", label: "The Bargain" },
  { key: "mid", icon: "😈", label: "The Sweet Spot", badge: "RECOMMENDED" },
  { key: "premium", icon: "👹", label: "The Splurge" },
];

export default function PlanSelectionClient({
  planId,
  destinations,
}: {
  planId: string;
  destinations: ThreeDestinationResult;
}) {
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
          Your Destinations Are Ready
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
          Pick Your Battleground
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)", color: "rgba(255,255,255,0.5)", maxWidth: "600px", margin: "0 auto" }}
        >
          Three destinations, three vibes, three price points. Each one comes with full Imp / Devil / Demon King plans inside.
        </motion.p>
      </div>

      {/* 3 Destination Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))",
        gap: "1.5rem",
        maxWidth: "1200px",
        margin: "0 auto",
      }}>
        {destinationTiers.map(({ key, icon, label, badge }, i) => {
          const rec = destinations[key];
          const devilPlan = rec.plans.devil; // use devil tier for preview info

          // Track selection on click
          const trackClick = () => {
            fetch("/api/track-selection", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ destinationId: rec.destinationId, tier: key }),
            }).catch(() => {});
          };

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
            >
              <Link
                href={`/plan/result/${planId}?dest=${key}`}
                onClick={trackClick}
                style={{ textDecoration: "none", color: "inherit", display: "block" }}
              >
                <div
                  style={{
                    position: "relative",
                    background: key === "mid" ? "rgba(220,38,38,0.08)" : "rgba(255,255,255,0.03)",
                    border: key === "mid" ? "2px solid rgba(220,38,38,0.4)" : "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    padding: "2rem 1.75rem",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    overflow: "hidden",
                    minHeight: "420px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.borderColor = key === "mid" ? "rgba(220,38,38,0.7)" : "rgba(255,255,255,0.3)";
                    e.currentTarget.style.boxShadow = key === "mid" ? "0 20px 60px rgba(220,38,38,0.2)" : "0 20px 60px rgba(0,0,0,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = key === "mid" ? "rgba(220,38,38,0.4)" : "rgba(255,255,255,0.1)";
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

                  {/* Price Tier Label */}
                  <div style={{
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: key === "budget" ? "#4ade80" : key === "premium" ? "#ef4444" : "#f97316",
                    marginBottom: "0.5rem",
                  }}>
                    {label}
                  </div>

                  {/* Icon */}
                  <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>{icon}</div>

                  {/* Destination Name */}
                  <h2 style={{
                    fontFamily: "var(--font-plan-script), cursive",
                    fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                    color: "#fff",
                    marginBottom: "0.25rem",
                    lineHeight: 1.1,
                  }}>
                    {rec.city}, {rec.state}
                  </h2>

                  {/* Tagline */}
                  <p style={{
                    fontSize: "0.85rem",
                    color: "rgba(255,255,255,0.5)",
                    marginBottom: "1.25rem",
                    lineHeight: 1.4,
                  }}>
                    {rec.tagline}
                  </p>

                  {/* Price Range (Devil tier as reference) */}
                  <div style={{
                    fontSize: "clamp(1.3rem, 3vw, 1.8rem)",
                    fontWeight: 800,
                    color: key === "mid" ? "rgba(220,38,38,0.9)" : "rgba(255,255,255,0.85)",
                    marginBottom: "1.25rem",
                  }}>
                    {devilPlan.estimatedBudget.perPerson}
                    <span style={{ fontSize: "0.7rem", fontWeight: 400, color: "rgba(255,255,255,0.35)", marginLeft: "0.5rem" }}>per person (Devil tier)</span>
                  </div>

                  {/* Highlights */}
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>
                      ⛳ {devilPlan.courses.length} rounds — {devilPlan.courses.map(c => c.name).slice(0, 2).join(", ")}{devilPlan.courses.length > 2 ? "..." : ""}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>
                      🏠 {devilPlan.lodging.type}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>
                      🍽️ {devilPlan.dining.length} dining spots
                    </div>
                    {devilPlan.bars && devilPlan.bars.length > 0 && (
                      <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>
                        🌙 {devilPlan.bars.length} bars
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <div style={{
                    marginTop: "1.5rem",
                    padding: "0.75rem",
                    background: key === "mid" ? "rgba(220,38,38,0.15)" : "rgba(255,255,255,0.05)",
                    borderRadius: "8px",
                    textAlign: "center",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: key === "mid" ? "#fff" : "rgba(255,255,255,0.7)",
                    letterSpacing: "0.05em",
                  }}>
                    Unleash the Plans →
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
