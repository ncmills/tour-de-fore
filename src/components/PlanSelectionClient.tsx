"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ThreeDestinationResult, ThreeFreePreview, PriceLevel, FreePreview, WizardState } from "@/lib/plan-types";
import MulliganButton from "./MulliganButton";
import HomeButton from "./HomeButton";
import { getAnonPlanIds, claimAnonPlans } from "@/lib/anon-plans";

const destinationTiers: { key: PriceLevel; icon: string; label: string; subtitle: string; badge?: string }[] = [
  { key: "budget", icon: "", label: "The Bargain", subtitle: "Budget" },
  { key: "mid", icon: "", label: "The Sweet Spot", subtitle: "Mid-Range", badge: "RECOMMENDED" },
  { key: "premium", icon: "", label: "The Splurge", subtitle: "Premium" },
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
  index,
  isOwner,
}: {
  planId: string;
  priceKey: PriceLevel;
  icon: string;
  label: string;
  subtitle: string;
  badge?: string;
  preview: FreePreview | null;
  legacyDest?: { city?: string; state?: string; tagline?: string; destinationId?: string; plans?: { devil?: { estimatedBudget?: { perPerson?: string }; courses?: { name: string }[]; lodging?: { type?: string } } } };
  index: number;
  isOwner?: boolean;
}) {
  const city = preview?.city || legacyDest?.city || "";
  const state = preview?.state || legacyDest?.state || "";
  const tagline = preview?.tagline || legacyDest?.tagline || "";
  const budget = preview?.estimatedBudgetPerPerson || legacyDest?.plans?.devil?.estimatedBudget?.perPerson || "";
  const lockedCounts = preview?.lockedCounts;

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

  const accentColor = priceKey === "budget" ? "var(--color-success)" : priceKey === "premium" ? "#ef4444" : "#f97316";
  const isMid = priceKey === "mid";

  // Owners go to the gallery (browse + build their trip — login-gated, which is
  // fine for them). Forwarded crew members (non-owners) get the read-only plan
  // view instead, since /plan/gallery would bounce them to /login. Both land on
  // the same destination; recipients just can't enter the edit/build flow.
  const ctaHref = isOwner
    ? `/plan/gallery?planId=${planId}&dest=${priceKey}&tier=devil`
    : `/plan/result/${planId}?dest=${priceKey}&tier=devil`;
  const ctaLabel = isOwner ? "View All Options →" : "View This Plan →";

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
        {/* Badge */}
        {badge && (
          <div style={{ position: "absolute", top: "1rem", right: "1rem" }}>
            <div style={{ background: "rgba(220,38,38,0.9)", borderRadius: 4, padding: "3px 10px", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.15em", color: "#fff" }}>
              {badge}
            </div>
          </div>
        )}

        {/* Tier + Icon + City */}
        <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: accentColor, marginBottom: "0.15rem" }}>
          {label}
        </div>
        <div style={{ fontSize: "0.65rem", fontWeight: 500, color: "rgba(255,255,255,0.35)", marginBottom: "0.5rem", letterSpacing: "0.08em" }}>
          {subtitle}
        </div>
        {icon && <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{icon}</div>}
        <h2 style={{ fontFamily: "var(--font-plan-script), cursive", fontSize: "clamp(1.6rem, 4vw, 2.2rem)", color: "#fff", marginBottom: "0.6rem", lineHeight: 1.3 }}>
          {city}, {state}
        </h2>
        <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", marginBottom: "1rem", lineHeight: 1.4 }}>
          {tagline}
        </p>
        <div style={{ fontSize: "clamp(1.2rem, 3vw, 1.6rem)", fontWeight: 800, color: isMid ? "rgba(220,38,38,0.9)" : "rgba(255,255,255,0.85)", marginBottom: "1rem" }}>
          {budget}
          <span style={{ fontSize: "0.65rem", fontWeight: 400, color: "rgba(255,255,255,0.3)", marginLeft: "0.4rem" }}>per person</span>
        </div>

        {/* Why we picked this */}
        {preview?.reasons && preview.reasons.length > 0 && (
          <div style={{ marginBottom: "1rem", padding: "0.6rem 0.75rem", background: "rgba(255,255,255,0.03)", borderRadius: 8, borderLeft: `2px solid ${accentColor}` }}>
            {preview.reasons.map((reason, ri) => (
              <div key={ri} style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.5, display: "flex", alignItems: "flex-start", gap: "0.4rem" }}>
                <span style={{ color: accentColor, flexShrink: 0 }}>✦</span>
                <span>{reason}</span>
              </div>
            ))}
          </div>
        )}

        {/* Inline preview — lodging + courses */}
        {preview && (
          <div style={{ marginBottom: "1rem" }}>
            {/* Lodging */}
            <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", marginBottom: "0.75rem", display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
              <span>🏠 {preview.lodgingPreview.type}</span>
              <span>· sleeps {preview.lodgingPreview.sleeps[0]}-{preview.lodgingPreview.sleeps[1]}</span>
              {preview.lodgingPreview.avgRating && <span>· ⭐ {preview.lodgingPreview.avgRating}</span>}
              <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.6rem" }}>(est. pricing)</span>
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

            {/* Teasers — activity, bar, party bus, chef */}
            <div style={{ marginTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
              {preview.activityTeaser && (
                <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)" }}>
                  🎯 {preview.activityTeaser.name} — {preview.activityTeaser.priceRange}/person
                </div>
              )}
              {preview.barTeaser && (
                <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)" }}>
                  🌙 {preview.barTeaser.name} ({preview.barTeaser.vibe})
                </div>
              )}
              {preview.partyBusAvailable && (
                <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)" }}>
                  🚌 Party bus — ${preview.partyBusAvailable.hourlyRange[0]}-${preview.partyBusAvailable.hourlyRange[1]}/hr
                </div>
              )}
              {preview.privateChefAvailable && (
                <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)" }}>
                  👨‍🍳 Private chef — ${preview.privateChefAvailable.pricePerPersonRange[0]}-${preview.privateChefAvailable.pricePerPersonRange[1]}/person
                </div>
              )}
            </div>
          </div>
        )}

        {/* What's included teaser */}
        {lockedCounts && (
          <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", marginBottom: "0.75rem" }}>
            {lockedCounts.restaurants} restaurants · {lockedCounts.bars} bars · {lockedCounts.activities} activities
            {lockedCounts.partyBusOptions > 0 && ` · party bus`}
          </div>
        )}

        <Link
          href={ctaHref}
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
          {ctaLabel}
        </Link>
      </div>
    </motion.div>
  );
}

export default function PlanSelectionClient({
  planId,
  freePreviews,
  legacyDestinations,
  inputs,
  isOwner,
  isLoggedIn,
}: {
  planId: string;
  freePreviews: ThreeFreePreview | null;
  paid?: boolean;
  legacyDestinations?: ThreeDestinationResult;
  inputs?: WizardState;
  isOwner?: boolean;
  isLoggedIn?: boolean;
}) {
  const router = useRouter();

  // Default the nested picker: lead with ONE recommended hero (the mid "Sweet
  // Spot" destination, devil tier) and tuck the other two destinations behind
  // an expander so the upfront choice is 1 clear default + drill-down, not a
  // 9-way (3 dest × 3 tier) decision.
  const [showOtherDests, setShowOtherDests] = useState(false);

  // Generate-first: the anon creator of this plan (it's in their localStorage)
  // gets a save prompt; a logged-in non-owner who holds it locally is
  // auto-claimed on arrival.
  const [holdsLocally, setHoldsLocally] = useState(false);
  useEffect(() => { setHoldsLocally(getAnonPlanIds().includes(planId)); }, [planId]);
  useEffect(() => {
    if (!isLoggedIn || isOwner) return;
    if (!getAnonPlanIds().includes(planId)) return;
    claimAnonPlans().catch(() => {});
  }, [isLoggedIn, isOwner, planId]);
  const showSavePrompt = !isLoggedIn && !isOwner && holdsLocally;

  const promptAuthToSave = () => {
    window.location.href = `/login?returnTo=${encodeURIComponent(`/plan/result/${planId}`)}`;
  };

  const handleEditSelections = () => {
    // Restore the wizard's sessionStorage from the stored inputs, then
    // navigate back to /plan-a-trip. The wizard's mount-effect reads
    // "tdf-wizard-state" and rehydrates every field. Pattern mirrors
    // MOH ff82652 "Edit your selections" flow.
    if (inputs) {
      try {
        sessionStorage.setItem("tdf-wizard-state", JSON.stringify(inputs));
      } catch { /* ignore — storage may be full or blocked */ }
    }
    router.push("/plan-a-trip");
  };

  return (
    <main style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "clamp(2rem, 6vw, 4rem) clamp(1rem, 4vw, 3rem)" }}>
      <MulliganButton />
      <HomeButton />

      <div style={{ textAlign: "center", marginBottom: "clamp(2rem, 5vw, 4rem)" }}>
        {isOwner && inputs && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={handleEditSelections}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.45)",
              fontSize: "0.78rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontFamily: "var(--font-inter), sans-serif",
              cursor: "pointer",
              marginBottom: "1.25rem",
              padding: "0.4rem 0.6rem",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.85)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
            aria-label="Return to the wizard with your existing selections pre-filled"
          >
            ← Edit your selections
          </motion.button>
        )}
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
          Here&apos;s Our Pick
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)", color: "rgba(255,255,255,0.5)", maxWidth: 600, margin: "0 auto" }}
        >
          The sweet spot for your crew — full AI-generated trip plan. Want to compare? Two more destinations below.
        </motion.p>

        {showSavePrompt && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={promptAuthToSave}
            style={{
              marginTop: "1.5rem",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 22px",
              background: "rgba(220,38,38,0.9)",
              border: "none",
              borderRadius: 8,
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "var(--font-inter), sans-serif",
            }}
          >
            Save this trip &amp; email the crew →
          </motion.button>
        )}
      </div>

      {/* Hero — the recommended "Sweet Spot" (mid) destination, devil tier. */}
      {(() => {
        const hero = destinationTiers.find((t) => t.key === "mid")!;
        const others = destinationTiers.filter((t) => t.key !== "mid");
        return (
          <>
            <div style={{ maxWidth: 460, margin: "0 auto" }}>
              <DestinationCard
                planId={planId}
                priceKey={hero.key}
                icon={hero.icon}
                label={hero.label}
                subtitle={hero.subtitle}
                badge={hero.badge}
                preview={freePreviews?.[hero.key] || null}
                legacyDest={legacyDestinations?.[hero.key]}
                index={0}
                isOwner={isOwner}
              />
            </div>

            {/* Drill-down — the other two destinations / price tiers. */}
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              {!showOtherDests ? (
                <button
                  onClick={() => setShowOtherDests(true)}
                  aria-expanded={false}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.7rem 1.5rem",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 8,
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    cursor: "pointer",
                    fontFamily: "var(--font-inter), sans-serif",
                  }}
                >
                  See other destinations &amp; tiers ↓
                </button>
              ) : (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))",
                      gap: "1.5rem",
                      maxWidth: "1200px",
                      margin: "0 auto",
                    }}
                  >
                    {others.map(({ key, icon, label, subtitle, badge }, i) => (
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
                        index={i}
                        isOwner={isOwner}
                      />
                    ))}
                  </motion.div>
                  <p style={{ marginTop: "1rem", fontSize: "0.78rem", color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-inter), sans-serif" }}>
                    Each destination has Imp, Devil &amp; Demon King tiers — pick one to see all three.
                  </p>
                </>
              )}
            </div>
          </>
        );
      })()}
    </main>
  );
}
