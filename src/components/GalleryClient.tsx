"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import type {
  GeneratedPlan,
  ThreePlanResult,
  TripTier,
  PlanCourse,
  PlanDining,
  PlanBar,
  PlanLodging,
} from "@/lib/plan-types";
import MulliganButton from "./MulliganButton";
import HomeButton from "./HomeButton";

/* ── Types ── */

interface GalleryCard {
  id: string;
  type: "lodging" | "course" | "dining" | "bar";
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
};

const typeLabels: Record<GalleryCard["type"], string> = {
  lodging: "Lodging",
  course: "Course",
  dining: "Dining",
  bar: "Bar",
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const selectedTierKey = tier === "demon-king" ? "demonKing" : tier;

  /* Build a single deduped array of cards across all tiers, interleaved by type */
  const cards = useMemo(() => {
    const all: GalleryCard[] = [];
    const seen = new Set<string>();

    const tiers = Object.entries(allPlans) as [string, GeneratedPlan][];

    // Collect lodging
    for (const [key, p] of tiers) {
      if (!p?.lodging || seen.has(p.lodging.name)) continue;
      seen.add(p.lodging.name);
      all.push({
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
        all.push({
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
        all.push({
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
        all.push({
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

    // Interleave: sort so selected-tier items come first within each type, then shuffle types together
    const byType: Record<string, GalleryCard[]> = { lodging: [], course: [], dining: [], bar: [] };
    for (const c of all) byType[c.type].push(c);

    // Sort each bucket: selected tier first
    for (const arr of Object.values(byType)) {
      arr.sort((a, b) => (a.isSelectedTier === b.isSelectedTier ? 0 : a.isSelectedTier ? -1 : 1));
    }

    // Interleave round-robin
    const result: GalleryCard[] = [];
    const buckets = [byType.lodging, byType.course, byType.dining, byType.bar];
    let idx = 0;
    let added = true;
    while (added) {
      added = false;
      for (const bucket of buckets) {
        if (idx < bucket.length) {
          result.push(bucket[idx]);
          added = true;
        }
      }
      idx++;
    }

    return result;
  }, [allPlans, selectedTierKey]);

  /* Track scroll position for dots */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const cardW = 316; // 300 + 16 gap
      const idx = Math.round(el.scrollLeft / cardW);
      setActiveIdx(Math.min(idx, cards.length - 1));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [cards.length]);

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

      {/* Carousel */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div
          ref={scrollRef}
          style={{
            display: "flex",
            gap: 16,
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            padding: "1rem clamp(1.5rem, 6vw, 6rem)",
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

        {/* Prev / Counter / Next */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            padding: "1rem 0",
          }}
        >
          <button
            onClick={() => {
              const el = scrollRef.current;
              if (!el) return;
              const prev = Math.max(0, activeIdx - 1);
              el.scrollTo({ left: prev * 316, behavior: "smooth" });
            }}
            aria-label="Previous card"
            style={{
              minWidth: 44,
              minHeight: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 8,
              color: activeIdx > 0 ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.2)",
              fontSize: "1.1rem",
              cursor: activeIdx > 0 ? "pointer" : "default",
              transition: "all 0.2s",
            }}
          >
            &#9664;
          </button>
          <span
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "0.85rem",
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.06em",
              minWidth: 60,
              textAlign: "center",
            }}
          >
            {activeIdx + 1} of {cards.length}
          </span>
          <button
            onClick={() => {
              const el = scrollRef.current;
              if (!el) return;
              const next = Math.min(cards.length - 1, activeIdx + 1);
              el.scrollTo({ left: next * 316, behavior: "smooth" });
            }}
            aria-label="Next card"
            style={{
              minWidth: 44,
              minHeight: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 8,
              color: activeIdx < cards.length - 1 ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.2)",
              fontSize: "1.1rem",
              cursor: activeIdx < cards.length - 1 ? "pointer" : "default",
              transition: "all 0.2s",
            }}
          >
            &#9654;
          </button>
        </div>
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
