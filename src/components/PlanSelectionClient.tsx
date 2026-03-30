"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ThreeDestinationResult, ThreeFreePreview, PriceLevel, FreePreview } from "@/lib/plan-types";
import MulliganButton from "./MulliganButton";

const destinationTiers: { key: PriceLevel; icon: string; label: string; badge?: string }[] = [
  { key: "budget", icon: "👿", label: "The Bargain" },
  { key: "mid", icon: "😈", label: "The Sweet Spot", badge: "RECOMMENDED" },
  { key: "premium", icon: "👹", label: "The Splurge" },
];

export default function PlanSelectionClient({
  planId,
  freePreviews,
  paid,
  legacyDestinations,
}: {
  planId: string;
  freePreviews: ThreeFreePreview | null;
  paid?: boolean;
  legacyDestinations?: ThreeDestinationResult;
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
          Three destinations, three vibes, three price points. {!paid && "Each includes a free preview — unlock the full plan for $99."}
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
          // Support both free previews and legacy paid destinations
          const preview: FreePreview | null = freePreviews?.[key] || null;
          const legacyDest = legacyDestinations?.[key];

          const city = preview?.city || legacyDest?.city || "";
          const state = preview?.state || legacyDest?.state || "";
          const tagline = preview?.tagline || legacyDest?.tagline || "";
          const budget = preview?.estimatedBudgetPerPerson || legacyDest?.plans?.devil?.estimatedBudget?.perPerson || "";
          const courseNames = preview
            ? preview.coursePreview.map((c) => c.name)
            : legacyDest?.plans?.devil?.courses?.map((c) => c.name) || [];
          const lodgingType = preview
            ? preview.lodgingPreview.type
            : legacyDest?.plans?.devil?.lodging?.type || "";
          const lockedCounts = preview?.lockedCounts;

          const trackClick = () => {
            const destId = preview?.destinationId || legacyDest?.destinationId;
            if (destId) {
              fetch("/api/track-selection", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ destinationId: destId, tier: key }),
              }).catch(() => {});
            }
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

                  <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>{icon}</div>

                  <h2 style={{
                    fontFamily: "var(--font-plan-script), cursive",
                    fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                    color: "#fff",
                    marginBottom: "0.25rem",
                    lineHeight: 1.1,
                  }}>
                    {city}, {state}
                  </h2>

                  <p style={{
                    fontSize: "0.85rem",
                    color: "rgba(255,255,255,0.5)",
                    marginBottom: "1.25rem",
                    lineHeight: 1.4,
                  }}>
                    {tagline}
                  </p>

                  <div style={{
                    fontSize: "clamp(1.3rem, 3vw, 1.8rem)",
                    fontWeight: 800,
                    color: key === "mid" ? "rgba(220,38,38,0.9)" : "rgba(255,255,255,0.85)",
                    marginBottom: "1.25rem",
                  }}>
                    {budget}
                    <span style={{ fontSize: "0.7rem", fontWeight: 400, color: "rgba(255,255,255,0.35)", marginLeft: "0.5rem" }}>per person</span>
                  </div>

                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>
                      ⛳ {courseNames.slice(0, 2).join(", ")}{courseNames.length > 2 ? ` +${courseNames.length - 2} more` : ""}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>
                      🏠 {lodgingType}
                    </div>
                    {lockedCounts && (
                      <>
                        <div style={{ fontSize: "0.75rem", color: "rgba(234,88,12,0.6)", marginTop: "0.5rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                          🏆 {lockedCounts.restaurants} restaurants · {lockedCounts.bars} bars · {lockedCounts.activities} activities
                        </div>
                      </>
                    )}
                  </div>

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
                    {paid ? "View Full Plan →" : "See Free Preview →"}
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
