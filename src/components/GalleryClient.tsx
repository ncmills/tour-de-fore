"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import type {
  GeneratedPlan,
  ThreePlanResult,
  TripTier,
} from "@/lib/plan-types";
import MulliganButton from "./MulliganButton";
import HomeButton from "./HomeButton";

/* ── Types ── */

interface GalleryCard {
  id: string;
  type: "lodging" | "course" | "dining" | "bar" | "transport";
  name: string;
  line1: string;
  line2?: string;
  line3?: string;
  badge?: string;
  isSelectedTier: boolean;
}

const typeIcons: Record<GalleryCard["type"], string> = {
  lodging: "\ud83c\udfe0",
  course: "\u26f3",
  dining: "\ud83c\udf7d\ufe0f",
  bar: "\ud83c\udf7a",
  transport: "\ud83d\ude90",
};

const typeLabels: Record<GalleryCard["type"], string> = {
  lodging: "Lodging",
  course: "Course",
  dining: "Dining",
  bar: "Bar",
  transport: "Transport",
};

const tierLabels: Record<string, string> = {
  imp: "The Imp",
  devil: "The Devil",
  demonKing: "The Demon King",
};

/* ── Component ── */

export default function GalleryClient({
  plan,
  allPlans,
  planId,
  tier,
  dest,
}: {
  plan: GeneratedPlan;
  allPlans: ThreePlanResult;
  planId: string;
  tier: TripTier;
  dest: string;
}) {
  const selectedTierKey = tier === "demon-king" ? "demonKing" : tier;

  /* Category display order */
  const categoryOrder: GalleryCard["type"][] = ["lodging", "course", "dining", "bar", "transport"];

  /* Plural labels for category headers */
  const categoryHeaders: Record<GalleryCard["type"], string> = {
    lodging: "Lodging",
    course: "Golf Courses",
    dining: "Dining",
    bar: "Nightlife",
    transport: "Transportation",
  };

  /* Build cards grouped by type */
  const cardsByType = useMemo(() => {
    const seen = new Set<string>();
    const tiers = Object.entries(allPlans) as [string, GeneratedPlan][];
    const groups: Record<GalleryCard["type"], GalleryCard[]> = {
      lodging: [],
      course: [],
      dining: [],
      bar: [],
      transport: [],
    };

    // Collect lodging
    for (const [key, p] of tiers) {
      if (!p?.lodging || seen.has(p.lodging.name)) continue;
      seen.add(p.lodging.name);
      groups.lodging.push({
        id: `lodging-${p.lodging.name}`,
        type: "lodging",
        name: p.lodging.name,
        line1: p.lodging.type,
        line2: p.lodging.costPerNight ? `${p.lodging.costPerNight}/night` : undefined,
        line3: p.lodging.rationale,
        badge: key !== selectedTierKey ? tierLabels[key] : undefined,
        isSelectedTier: key === selectedTierKey,
      });
    }

    // Collect courses
    for (const [key, p] of tiers) {
      for (const c of p?.courses || []) {
        if (seen.has(c.name)) continue;
        seen.add(c.name);
        groups.course.push({
          id: `course-${c.name}`,
          type: "course",
          name: c.name,
          line1: c.greenFee ? `Green fee: ${c.greenFee}` : "",
          line2: c.whyThisCourse,
          badge: key !== selectedTierKey ? tierLabels[key] : undefined,
          isSelectedTier: key === selectedTierKey,
        });
      }
    }

    // Collect dining
    for (const [key, p] of tiers) {
      for (const d of p?.dining || []) {
        if (seen.has(d.name)) continue;
        seen.add(d.name);
        groups.dining.push({
          id: `dining-${d.name}`,
          type: "dining",
          name: d.name,
          line1: d.type,
          line2: d.priceRange,
          line3: d.description,
          badge: key !== selectedTierKey ? tierLabels[key] : undefined,
          isSelectedTier: key === selectedTierKey,
        });
      }
    }

    // Collect bars
    for (const [key, p] of tiers) {
      for (const b of p?.bars || []) {
        if (seen.has(b.name)) continue;
        seen.add(b.name);
        groups.bar.push({
          id: `bar-${b.name}`,
          type: "bar",
          name: b.name,
          line1: b.vibe,
          line2: b.description,
          badge: key !== selectedTierKey ? tierLabels[key] : undefined,
          isSelectedTier: key === selectedTierKey,
        });
      }
    }

    // Collect transport — static options since plans use a single transport string
    const transportOptions = [
      { id: "transport-rental-car", name: "Rental Car", line1: "~$50/day per person", line2: "Split across the crew", line3: "Most flexible option — great for groups that want to come and go on their own schedule." },
      { id: "transport-party-bus", name: "Party Bus", line1: "~$200/day total", line2: "Fits 12-20", line3: "The ultimate crew mover. Handles golf shuttles, bar crawls, and everything in between." },
      { id: "transport-limo-service", name: "Limo Service", line1: "~$300/day total", line2: "Premium experience", line3: "Roll up to the course in style. Great for special occasions or the Demon King tier." },
      { id: "transport-airport-shuttle", name: "Airport Shuttle", line1: "~$25/person", line2: "One-way to/from airport", line3: "Simple airport transfers. Book in advance for group rates." },
    ];
    for (const t of transportOptions) {
      groups.transport.push({
        ...t,
        type: "transport",
        isSelectedTier: true,
      });
    }

    // Sort each group: selected tier first
    for (const arr of Object.values(groups)) {
      arr.sort((a, b) => (a.isSelectedTier === b.isSelectedTier ? 0 : a.isSelectedTier ? -1 : 1));
    }

    return groups;
  }, [allPlans, selectedTierKey]);

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "#000",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Navigation */}
      <MulliganButton href={`/plan/result/${planId}`} />
      <HomeButton />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          padding: "5rem clamp(1.5rem, 6vw, 6rem) 1rem",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-plan-block), sans-serif",
            fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
            fontWeight: 700,
            color: "#fff",
            margin: 0,
            letterSpacing: "0.02em",
          }}
        >
          {plan.destination}
        </h1>
        <p
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "0.95rem",
            color: "rgba(255,255,255,0.45)",
            marginTop: "0.5rem",
          }}
        >
          Swipe through everything this destination has to offer
        </p>
      </motion.div>

      {/* Category sections */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2rem", paddingBottom: "1rem" }}>
        {categoryOrder.map((catType) => {
          const cards = cardsByType[catType];
          if (cards.length === 0) return null;
          return (
            <div key={catType}>
              {/* Category header */}
              <div
                style={{
                  padding: "0 clamp(1.5rem, 6vw, 6rem)",
                  marginBottom: "0.75rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span style={{ fontSize: "1.3rem" }}>{typeIcons[catType]}</span>
                <h2
                  style={{
                    fontFamily: "var(--font-plan-block), sans-serif",
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    color: "#fff",
                    margin: 0,
                    letterSpacing: "0.02em",
                  }}
                >
                  {categoryHeaders[catType]}
                </h2>
                <span
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "0.75rem",
                    color: "rgba(255,255,255,0.3)",
                    marginLeft: "0.25rem",
                  }}
                >
                  {cards.length}
                </span>
              </div>

              {/* Horizontal scroll row */}
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  overflowX: "auto",
                  scrollSnapType: "x mandatory",
                  WebkitOverflowScrolling: "touch",
                  padding: "0.5rem clamp(1.5rem, 6vw, 6rem)",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
                className="gallery-carousel"
              >
                {cards.map((card, i) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.5) }}
                    style={{
                      flex: "0 0 300px",
                      minHeight: 380,
                      scrollSnapAlign: "center",
                      background: "#111",
                      border: card.isSelectedTier
                        ? "1px solid rgba(234,88,12,0.4)"
                        : "1px solid #222",
                      borderRadius: 12,
                      padding: "1.5rem",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      position: "relative",
                      boxShadow: card.isSelectedTier
                        ? "0 0 12px rgba(234,88,12,0.2)"
                        : "0 2px 12px rgba(0,0,0,0.4)",
                      transition: "border-color 0.3s, box-shadow 0.3s",
                    }}
                  >
                    {/* Type icon top-right */}
                    <span
                      style={{
                        position: "absolute",
                        top: 12,
                        right: 14,
                        fontSize: "1.4rem",
                        opacity: 0.7,
                      }}
                      title={typeLabels[card.type]}
                    >
                      {typeIcons[card.type]}
                    </span>

                    {/* Tier badge if not selected tier */}
                    {card.badge && (
                      <span
                        style={{
                          position: "absolute",
                          top: 12,
                          left: 14,
                          fontSize: "0.6rem",
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,0.4)",
                          background: "rgba(255,255,255,0.06)",
                          padding: "3px 8px",
                          borderRadius: 4,
                        }}
                      >
                        {card.badge}
                      </span>
                    )}

                    {/* Card content */}
                    <div style={{ marginTop: card.badge ? 36 : 8 }}>
                      {/* Type label */}
                      <p
                        style={{
                          fontSize: "0.65rem",
                          fontWeight: 700,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: card.isSelectedTier ? "rgba(234,88,12,0.7)" : "rgba(255,255,255,0.25)",
                          marginBottom: "0.4rem",
                          fontFamily: "var(--font-inter), sans-serif",
                        }}
                      >
                        {typeLabels[card.type]}
                      </p>

                      {/* Name */}
                      <h3
                        style={{
                          fontFamily: "var(--font-plan-block), sans-serif",
                          fontSize: "1.25rem",
                          fontWeight: 700,
                          color: "#fff",
                          margin: "0 0 0.6rem 0",
                          lineHeight: 1.2,
                          paddingRight: "2rem",
                        }}
                      >
                        {card.name}
                      </h3>

                      {/* Line 1 — primary detail */}
                      {card.line1 && (
                        <p
                          style={{
                            fontSize: "0.85rem",
                            color: "rgba(255,255,255,0.6)",
                            margin: "0 0 0.3rem 0",
                            fontFamily: "var(--font-inter), sans-serif",
                          }}
                        >
                          {card.line1}
                        </p>
                      )}

                      {/* Line 2 — secondary */}
                      {card.line2 && (
                        <p
                          style={{
                            fontSize: "0.8rem",
                            color: "rgba(255,255,255,0.4)",
                            margin: "0 0 0.3rem 0",
                            fontFamily: "var(--font-inter), sans-serif",
                          }}
                        >
                          {card.line2}
                        </p>
                      )}
                    </div>

                    {/* Line 3 — description at bottom */}
                    {card.line3 && (
                      <p
                        style={{
                          fontSize: "0.75rem",
                          color: "rgba(255,255,255,0.3)",
                          margin: 0,
                          lineHeight: 1.5,
                          fontFamily: "var(--font-inter), sans-serif",
                          display: "-webkit-box",
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {card.line3}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{
          padding: "1.5rem clamp(1.5rem, 6vw, 6rem) 2.5rem",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <Link
          href={`/plan/build?planId=${planId}&dest=${dest}&tier=${tier}`}
          style={{
            display: "inline-block",
            background: "rgba(220,38,38,0.9)",
            borderRadius: 8,
            padding: "14px 36px",
            color: "#fff",
            fontSize: 17,
            fontWeight: 700,
            letterSpacing: "0.06em",
            textDecoration: "none",
            transition: "all 0.2s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(220,38,38,1)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(220,38,38,0.9)"; }}
        >
          Build Your Trip &rarr;
        </Link>
        <Link
          href={`/plan/itinerary?planId=${planId}&dest=${dest}&tier=${tier}`}
          style={{
            display: "inline-block",
            background: "transparent",
            border: "1px solid rgba(220,38,38,0.6)",
            borderRadius: 8,
            padding: "14px 36px",
            color: "rgba(220,38,38,0.9)",
            fontSize: 17,
            fontWeight: 700,
            letterSpacing: "0.06em",
            textDecoration: "none",
            transition: "all 0.2s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(220,38,38,1)"; e.currentTarget.style.color = "rgba(220,38,38,1)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(220,38,38,0.6)"; e.currentTarget.style.color = "rgba(220,38,38,0.9)"; }}
        >
          Quick Build &mdash; Let TDF Pick &rarr;
        </Link>
      </motion.div>

      {/* Hide scrollbar */}
      <style>{`
        .gallery-carousel::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
