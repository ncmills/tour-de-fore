"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import type { GeneratedPlan, TripTier } from "@/lib/plan-types";
import MulliganButton from "./MulliganButton";

// ── Types ──

interface BuilderOption {
  id: string;
  name: string;
  category: string;
  details: Record<string, string>;
  tdfRecommended?: boolean;
  tdfReason?: string;
  rating?: number;
  hypeTag?: string;
  price?: string;
}

interface SelectedOptions {
  [category: string]: string[]; // category → list of selected option IDs
}

// ── Option Card ──

function OptionCard({
  option,
  selected,
  onToggle,
  expanded,
  onExpand,
}: {
  option: BuilderOption;
  selected: boolean;
  onToggle: () => void;
  expanded: boolean;
  onExpand: () => void;
}) {
  return (
    <motion.div
      layout
      style={{
        position: "relative",
        background: selected
          ? "rgba(220,38,38,0.08)"
          : "rgba(255,255,255,0.03)",
        border: option.tdfRecommended
          ? "2px solid rgba(220,38,38,0.5)"
          : selected
          ? "1px solid rgba(220,38,38,0.3)"
          : "1px solid rgba(255,255,255,0.08)",
        borderRadius: 12,
        padding: "1.25rem 1.5rem",
        cursor: "pointer",
        transition: "all 0.2s",
        overflow: "hidden",
      }}
      onClick={onExpand}
    >
      {/* TDF Recommended badge */}
      {option.tdfRecommended && (
        <div style={{
          position: "absolute",
          top: "0.75rem",
          right: "0.75rem",
          background: "rgba(220,38,38,0.9)",
          borderRadius: 4,
          padding: "3px 8px",
          fontSize: "0.55rem",
          fontWeight: 700,
          letterSpacing: "0.12em",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}>
          😈 TDF PICK
        </div>
      )}

      {/* Hype tag */}
      {option.hypeTag && (
        <div style={{
          fontSize: "0.55rem",
          fontWeight: 700,
          letterSpacing: "0.12em",
          padding: "2px 6px",
          background: "rgba(234,88,12,0.15)",
          border: "1px solid rgba(234,88,12,0.3)",
          borderRadius: 3,
          color: "rgba(234,88,12,0.9)",
          display: "inline-flex",
          alignItems: "center",
          gap: 3,
          marginBottom: "0.5rem",
        }}>
          🏆 {option.hypeTag}
        </div>
      )}

      {/* Name + Rating */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "0.5rem" }}>
        <h4 style={{ fontSize: "1rem", fontWeight: 600, color: "#fff", paddingRight: option.tdfRecommended ? "5rem" : 0 }}>
          {option.name}
        </h4>
        {option.rating && (
          <span style={{ fontSize: "0.8rem", color: "rgba(234,88,12,0.9)", whiteSpace: "nowrap" }}>
            ⭐ {option.rating}
          </span>
        )}
      </div>

      {/* Price */}
      {option.price && (
        <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,255,255,0.6)", marginBottom: "0.5rem" }}>
          {option.price}
        </p>
      )}

      {/* Expanded details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              {Object.entries(option.details).map(([key, val]) => (
                <div key={key} style={{ display: "flex", gap: "0.75rem", fontSize: "0.8rem" }}>
                  <span style={{ color: "rgba(255,255,255,0.35)", minWidth: 80 }}>{key}</span>
                  <span style={{ color: "rgba(255,255,255,0.6)" }}>{val}</span>
                </div>
              ))}
            </div>

            {/* TDF Recommendation reason */}
            {option.tdfRecommended && option.tdfReason && (
              <div style={{
                marginTop: "0.75rem",
                padding: "0.75rem",
                background: "rgba(220,38,38,0.08)",
                borderRadius: 8,
                borderLeft: "3px solid rgba(220,38,38,0.5)",
              }}>
                <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "rgba(220,38,38,0.9)", marginBottom: "0.25rem" }}>
                  Why we recommend this
                </p>
                <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>
                  {option.tdfReason}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add/Remove button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        style={{
          marginTop: "0.75rem",
          padding: "12px 20px",
          minHeight: 44,
          background: selected ? "rgba(255,255,255,0.1)" : "rgba(220,38,38,0.15)",
          border: selected ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(220,38,38,0.3)",
          borderRadius: 6,
          color: selected ? "rgba(255,255,255,0.6)" : "rgba(220,38,38,0.9)",
          fontSize: "0.75rem",
          fontWeight: 600,
          cursor: "pointer",
          transition: "all 0.2s",
          letterSpacing: "0.05em",
        }}
      >
        {selected ? "✓ Added to Trip" : "Add to Trip"}
      </button>
    </motion.div>
  );
}

// ── Main Trip Builder ──

export default function TripBuilderClient({
  plan,
  planId,
  tier,
  dest,
}: {
  plan: GeneratedPlan;
  planId: string;
  tier: TripTier;
  dest: string;
}) {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>(() => {
    // Pre-select TDF recommended options
    const initial: SelectedOptions = {};
    // Auto-select the lodging
    initial.lodging = [plan.lodging.name];
    // Auto-select all courses
    initial.courses = plan.courses.map((c) => c.name);
    return initial;
  });
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const toggle = useCallback((category: string, id: string) => {
    setSelectedOptions((prev) => {
      const current = prev[category] || [];
      const next = current.includes(id)
        ? current.filter((x) => x !== id)
        : [...current, id];
      return { ...prev, [category]: next };
    });
  }, []);

  const saveSelections = async () => {
    setSaving(true);
    try {
      await fetch("/api/save-selections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, dest, tier, selectedOptions }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      // silent fail
    } finally {
      setSaving(false);
    }
  };

  // Build option lists from the plan data
  const lodgingOptions: BuilderOption[] = [
    {
      id: plan.lodging.name,
      name: plan.lodging.name,
      category: "lodging",
      tdfRecommended: true,
      tdfReason: plan.lodging.rationale,
      price: plan.lodging.costPerNight + "/night",
      details: {
        Type: plan.lodging.type,
        Area: plan.lodging.address,
      },
    },
    ...(plan.lodgingAlternatives || []).map((alt) => ({
      id: alt.name,
      name: alt.name,
      category: "lodging",
      price: alt.costDelta,
      details: {
        Description: alt.description,
        "vs. Pick": alt.direction === "upgrade" ? "Upgrade" : "Budget option",
      },
    })),
  ];

  const courseOptions: BuilderOption[] = plan.courses.map((c, i) => ({
    id: c.name,
    name: c.name,
    category: "courses",
    tdfRecommended: i === 0,
    tdfReason: i === 0 ? c.whyThisCourse : undefined,
    price: c.greenFee + "/person",
    details: {
      Day: `Day ${c.day} ${c.session}`,
      "Why this course": c.whyThisCourse,
    },
  }));

  const diningOptions: BuilderOption[] = plan.dining.map((d, i) => ({
    id: d.name,
    name: d.name,
    category: "dining",
    tdfRecommended: i === 0,
    tdfReason: i === 0 ? d.description : undefined,
    price: d.priceRange,
    details: {
      Type: d.type,
      Description: d.description,
    },
  }));

  const barOptions: BuilderOption[] = (plan.bars || []).map((b) => ({
    id: b.name,
    name: b.name,
    category: "bars",
    details: {
      Vibe: b.vibe,
      Description: b.description,
    },
  }));

  const sections: { title: string; category: string; options: BuilderOption[] }[] = [
    { title: "The Lodging", category: "lodging", options: lodgingOptions },
    { title: "The Courses", category: "courses", options: courseOptions },
    { title: "The Feast", category: "dining", options: diningOptions },
    { title: "The 19th Hole", category: "bars", options: barOptions },
  ];

  return (
    <main style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "clamp(2rem, 6vw, 4rem) clamp(1rem, 4vw, 3rem)" }}>
      <MulliganButton href={`/plan/result/${planId}?dest=${dest}`} />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "3rem", maxWidth: 700, margin: "0 auto 3rem" }}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontFamily: "var(--font-plan-groovy), cursive",
            fontSize: "clamp(2rem, 6vw, 4rem)",
            marginBottom: "0.5rem",
          }}
        >
          Build Your Trip
        </motion.h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem" }}>
          {plan.destination} · {plan.tierName}
        </p>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", marginTop: "0.5rem" }}>
          Click any option to see pros, cons, and our recommendation. Add or remove to customize your trip.
        </p>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        {sections.map((section) => (
          <section key={section.category} style={{ marginBottom: "2.5rem" }}>
            <h2 style={{
              fontFamily: "var(--font-plan-script), cursive",
              fontSize: "1.8rem",
              marginBottom: "1rem",
              color: "#fff",
            }}>
              {section.title}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {section.options.map((option) => (
                <OptionCard
                  key={option.id}
                  option={option}
                  selected={(selectedOptions[section.category] || []).includes(option.id)}
                  onToggle={() => toggle(section.category, option.id)}
                  expanded={expandedId === `${section.category}-${option.id}`}
                  onExpand={() =>
                    setExpandedId(
                      expandedId === `${section.category}-${option.id}`
                        ? null
                        : `${section.category}-${option.id}`
                    )
                  }
                />
              ))}
            </div>
          </section>
        ))}

        {/* Save + Share Bar */}
        <div style={{
          position: "sticky",
          bottom: "1rem",
          background: "rgba(0,0,0,0.9)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 12,
          padding: "1rem 1.5rem",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "0.75rem",
        }}>
          <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>
            {Object.values(selectedOptions).flat().length} items selected
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            <button
              onClick={saveSelections}
              disabled={saving}
              style={{
                padding: "10px 24px",
                background: "rgba(220,38,38,0.9)",
                border: "none",
                borderRadius: 6,
                color: "#fff",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: saving ? "wait" : "pointer",
                opacity: saving ? 0.6 : 1,
              }}
            >
              {saving ? "Saving..." : saved ? "Saved!" : "Save My Trip"}
            </button>
            <Link
              href={`/plan/result/${planId}?dest=${dest}&tier=${tier}`}
              style={{
                padding: "10px 24px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 6,
                color: "rgba(255,255,255,0.7)",
                fontSize: "0.8rem",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              View Full Plan
            </Link>
            <Link
              href={`/trip/plan/${planId}`}
              style={{
                padding: "10px 24px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 6,
                color: "rgba(255,255,255,0.7)",
                fontSize: "0.8rem",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Share with Crew
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
