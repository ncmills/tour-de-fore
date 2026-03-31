"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { ThreeDestinationResult, ThreeFreePreview, PriceLevel, FreePreview } from "@/lib/plan-types";
import MulliganButton from "./MulliganButton";

const destinationTiers: { key: PriceLevel; icon: string; label: string; subtitle: string; badge?: string }[] = [
  { key: "budget", icon: "👿", label: "The Bargain", subtitle: "Budget" },
  { key: "mid", icon: "😈", label: "The Sweet Spot", subtitle: "Mid-Range", badge: "RECOMMENDED" },
  { key: "premium", icon: "👹", label: "The Splurge", subtitle: "Premium" },
];

function DestinationCard({
  planId,
  priceKey,
  icon,
  label,
  subtitle,
  badge,
  preview,
  legacyDest,
  isUnlocked,
  index,
}: {
  planId: string;
  priceKey: PriceLevel;
  icon: string;
  label: string;
  subtitle: string;
  badge?: string;
  preview: FreePreview | null;
  legacyDest?: { city?: string; state?: string; tagline?: string; destinationId?: string; plans?: { devil?: { estimatedBudget?: { perPerson?: string }; courses?: { name: string }[]; lodging?: { type?: string } } } };
  isUnlocked: boolean;
  index: number;
}) {
  const [unlocking, setUnlocking] = useState(false);

  const city = preview?.city || legacyDest?.city || "";
  const state = preview?.state || legacyDest?.state || "";
  const tagline = preview?.tagline || legacyDest?.tagline || "";
  const budget = preview?.estimatedBudgetPerPerson || legacyDest?.plans?.devil?.estimatedBudget?.perPerson || "";
  const lockedCounts = preview?.lockedCounts;

  const handleUnlock = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setUnlocking(true);
    try {
      const res = await fetch("/api/unlock-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, dest: priceKey }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setUnlocking(false);
    } catch { setUnlocking(false); }
  };

  const trackClick = () => {
    const destId = preview?.destinationId || legacyDest?.destinationId;
    if (destId) {
      fetch("/api/track-selection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destinationId: destId, tier: priceKey }),
      }).catch(() => {});
    }
  };

  const accentColor = priceKey === "budget" ? "#4ade80" : priceKey === "premium" ? "#ef4444" : "#f97316";
  const isMid = priceKey === "mid";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
    >
      <div style={{
        position: "relative",
        background: isMid ? "rgba(220,38,38,0.08)" : "rgba(255,255,255,0.03)",
        border: isMid ? "2px solid rgba(220,38,38,0.4)" : "1px solid rgba(255,255,255,0.1)",
        borderRadius: 12,
        padding: "2rem 1.75rem",
        overflow: "hidden",
      }}>
        {/* Badges */}
        <div style={{ display: "flex", gap: "0.5rem", position: "absolute", top: "1rem", right: "1rem" }}>
          {isUnlocked && (
            <div style={{ background: "rgba(74,222,128,0.9)", borderRadius: 4, padding: "3px 10px", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", color: "#000" }}>
              ✓ UNLOCKED
            </div>
          )}
          {badge && !isUnlocked && (
            <div style={{ background: "rgba(220,38,38,0.9)", borderRadius: 4, padding: "3px 10px", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.15em", color: "#fff" }}>
              {badge}
            </div>
          )}
        </div>

        {/* Tier + Icon + City */}
        <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: accentColor, marginBottom: "0.15rem" }}>
          {label}
        </div>
        <div style={{ fontSize: "0.65rem", fontWeight: 500, color: "rgba(255,255,255,0.35)", marginBottom: "0.5rem", letterSpacing: "0.08em" }}>
          {subtitle}
        </div>
        <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{icon}</div>
        <h2 style={{ fontFamily: "var(--font-plan-script), cursive", fontSize: "clamp(1.6rem, 4vw, 2.2rem)", color: "#fff", marginBottom: "0.25rem", lineHeight: 1.1 }}>
          {city}, {state}
        </h2>
        <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", marginBottom: "1rem", lineHeight: 1.4 }}>
          {tagline}
        </p>
        <div style={{ fontSize: "clamp(1.2rem, 3vw, 1.6rem)", fontWeight: 800, color: isMid ? "rgba(220,38,38,0.9)" : "rgba(255,255,255,0.85)", marginBottom: "1rem" }}>
          {budget}
          <span style={{ fontSize: "0.65rem", fontWeight: 400, color: "rgba(255,255,255,0.3)", marginLeft: "0.4rem" }}>per person</span>
        </div>

        {/* Inline preview — lodging + courses */}
        {preview && (
          <div style={{ marginBottom: "1rem" }}>
            {/* Lodging */}
            <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", marginBottom: "0.75rem", display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
              <span>🏠 {preview.lodgingPreview.type}</span>
              <span>· sleeps {preview.lodgingPreview.sleeps[0]}-{preview.lodgingPreview.sleeps[1]}</span>
              {preview.lodgingPreview.avgRating && <span>· ⭐ {preview.lodgingPreview.avgRating}</span>}
            </div>

            {/* Courses */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {preview.coursePreview.map((c, ci) => (
                <div key={ci} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.75rem", padding: "0.4rem 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "rgba(255,255,255,0.6)" }}>
                    <span>⛳</span>
                    <span>{c.name}</span>
                    {c.hypeTag && <span style={{ fontSize: "0.5rem", padding: "1px 4px", background: "rgba(234,88,12,0.15)", border: "1px solid rgba(234,88,12,0.3)", borderRadius: 3, color: "rgba(234,88,12,0.8)" }}>🏆</span>}
                  </div>
                  <span style={{ color: "rgba(255,255,255,0.3)", whiteSpace: "nowrap" }}>${c.greenFeeRange[0]}-${c.greenFeeRange[1]}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Locked teaser OR View Plan CTA */}
        {/* What's included teaser */}
        {lockedCounts && (
          <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", marginBottom: "0.75rem" }}>
            {lockedCounts.restaurants} restaurants · {lockedCounts.bars} bars · {lockedCounts.activities} activities
            {lockedCounts.partyBusOptions > 0 && ` · party bus`}
          </div>
        )}

        <Link
          href={`/plan/gallery?planId=${planId}&dest=${priceKey}&tier=devil`}
          onClick={trackClick}
          style={{
            display: "block",
            padding: "0.85rem",
            background: isMid ? "rgba(220,38,38,0.9)" : "rgba(255,255,255,0.08)",
            border: isMid ? "none" : "1px solid rgba(255,255,255,0.15)",
            borderRadius: 8,
            textAlign: "center",
            fontSize: "0.85rem",
            fontWeight: 700,
            color: isMid ? "#fff" : "rgba(255,255,255,0.7)",
            textDecoration: "none",
            letterSpacing: "0.03em",
          }}
        >
          View Full Plan →
        </Link>
      </div>
    </motion.div>
  );
}

export default function PlanSelectionClient({
  planId,
  freePreviews,
  paid,
  paidDestination,
  legacyDestinations,
}: {
  planId: string;
  freePreviews: ThreeFreePreview | null;
  paid?: boolean;
  paidDestination?: PriceLevel;
  legacyDestinations?: ThreeDestinationResult;
}) {
  return (
    <main style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "clamp(2rem, 6vw, 4rem) clamp(1rem, 4vw, 3rem)" }}>
      <MulliganButton />

      <div style={{ textAlign: "center", marginBottom: "clamp(2rem, 5vw, 4rem)" }}>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "0.85rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "0.75rem" }}
        >
          Your Destinations Are Ready
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ fontFamily: "var(--font-plan-groovy), cursive", fontSize: "clamp(2.5rem, 7vw, 5rem)", color: "#fff", marginBottom: "0.5rem" }}
        >
          Pick Your Battleground
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)", color: "rgba(255,255,255,0.5)", maxWidth: 600, margin: "0 auto" }}
        >
          Three destinations at three price points — each with a full AI-generated trip plan.
        </motion.p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))",
        gap: "1.5rem",
        maxWidth: "1200px",
        margin: "0 auto",
      }}>
        {destinationTiers.map(({ key, icon, label, subtitle, badge }, i) => (
          <DestinationCard
            key={key}
            planId={planId}
            priceKey={key}
            icon={icon}
            label={label}
            subtitle={subtitle}
            badge={badge}
            preview={freePreviews?.[key] || null}
            legacyDest={legacyDestinations?.[key]}
            isUnlocked={paid ? (paidDestination ? paidDestination === key : true) : false}
            index={i}
          />
        ))}
      </div>
    </main>
  );
}
