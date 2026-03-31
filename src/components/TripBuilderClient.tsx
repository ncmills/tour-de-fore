"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { motion } from "motion/react";
import type { GeneratedPlan, ThreePlanResult, TripTier } from "@/lib/plan-types";
import MulliganButton from "./MulliganButton";
import HomeButton from "./HomeButton";

// ── Types ──

interface Option {
  id: string;
  name: string;
  price?: string;
  rating?: number;
  detail?: string;
  tier?: string;
  recommended?: boolean;
  driveMinutes?: number;
}

interface Tag {
  label: string;
  color: string;
}

interface DaySelections {
  round1: string;
  round2: string;
  round2IsActivity: boolean;
  activity: string;
  dinner: string;
  bar: string;
}

const ACTIVITIES = ["ATV", "Fishing", "Spa", "Brewery Tour", "Shooting", "Casino", "Hiking", "Top Golf"];

// ── Helpers ──

/** Parse a dollar string like "$89" or "$2,450" into a number */
function parseDollars(s: string | undefined): number {
  if (!s) return 0;
  const m = s.replace(/[^0-9.]/g, "");
  return parseFloat(m) || 0;
}

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  green:  { bg: "rgba(45,90,63,0.35)", text: "#6ee7b7" },
  gold:   { bg: "rgba(212,168,67,0.2)", text: "#D4A843" },
  orange: { bg: "rgba(234,88,12,0.15)", text: "#fb923c" },
  blue:   { bg: "rgba(59,130,246,0.15)", text: "#93c5fd" },
  red:    { bg: "rgba(220,38,38,0.18)", text: "#EA580C" },
};

// ── Small Option Card ──

function OptionCard({ option, selected, onSelect, disabled, tags }: { option: Option; selected: boolean; onSelect: () => void; disabled?: boolean; tags?: Tag[] }) {
  const hasFlame = tags?.some((t) => t.label === "TDF PICK");
  return (
    <button
      onClick={disabled ? undefined : onSelect}
      className={hasFlame ? "flame-glow" : undefined}
      style={{
        textAlign: "left",
        padding: "0.75rem 1rem",
        background: selected ? "rgba(220,38,38,0.12)" : "rgba(255,255,255,0.03)",
        border: selected ? "1px solid rgba(220,38,38,0.5)" : "1px solid rgba(255,255,255,0.08)",
        borderRadius: 8,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        color: "#fff",
        width: "100%",
        transition: "all 0.15s",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>{option.name}</span>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          {option.rating && <span style={{ color: "#D4A843", fontSize: "0.75rem" }}>{option.rating}★</span>}
          {option.price && <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>{option.price}</span>}
          {selected && <span style={{ color: "#EA580C", fontSize: "0.9rem" }}>✓</span>}
        </div>
      </div>
      {/* Tags row */}
      {tags && tags.length > 0 && (
        <div style={{ display: "flex", gap: "0.35rem", marginTop: "0.35rem", flexWrap: "wrap" }}>
          {tags.map((t) => {
            const c = TAG_COLORS[t.color] || TAG_COLORS.orange;
            return (
              <span
                key={t.label}
                style={{
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  padding: "2px 6px",
                  borderRadius: 4,
                  background: c.bg,
                  color: c.text,
                  lineHeight: 1.4,
                }}
              >
                {t.label === "TDF PICK" ? "🔥 " + t.label : t.label}
              </span>
            );
          })}
        </div>
      )}
      {(option.detail || option.tier) && (
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.25rem", flexWrap: "wrap" }}>
          {option.tier && !option.recommended && <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>{option.tier}</span>}
          {option.detail && <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.35)" }}>{option.detail}</span>}
        </div>
      )}
    </button>
  );
}

// ── Slot Section ──

function SlotSection({ label, options, selectedId, onSelect, tagMap }: { label: string; options: Option[]; selectedId: string; onSelect: (id: string) => void; tagMap?: Record<string, Tag[]> }) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.5rem", fontFamily: "var(--font-plan-block), sans-serif" }}>
        {label}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {options.map((o) => (
          <OptionCard key={o.id} option={o} selected={selectedId === o.id} onSelect={() => onSelect(o.id)} tags={tagMap?.[o.id]} />
        ))}
      </div>
    </div>
  );
}

// ── Main Component ──

export default function TripBuilderClient({
  plan,
  allPlans,
  planId,
  tier,
  dest,
}: {
  plan: GeneratedPlan;
  allPlans?: ThreePlanResult;
  planId: string;
  tier: TripTier;
  dest: string;
}) {
  const tierLabel: Record<string, string> = { imp: "Imp", devil: "Devil", demonKing: "Demon King" };
  const selectedTierKey = tier === "demon-king" ? "demonKing" : tier;
  const [prevPrice, setPrevPrice] = useState<number | null>(null);

  // Collect other tier plans
  const otherPlans = useMemo(() => {
    const others: { key: string; plan: GeneratedPlan }[] = [];
    if (allPlans) {
      for (const [k, p] of Object.entries(allPlans)) {
        if (p && k !== selectedTierKey) others.push({ key: k, plan: p });
      }
    }
    return others;
  }, [allPlans, selectedTierKey]);

  // Merge courses from all tiers (deduped)
  const allCourses = useMemo(() => {
    const courses: Option[] = [];
    const seen = new Set<string>();
    for (const c of plan.courses) {
      seen.add(c.name);
      courses.push({ id: c.name, name: c.name, price: c.greenFee + "/pp", detail: c.whyThisCourse, recommended: true, driveMinutes: undefined });
    }
    for (const { key, plan: p } of otherPlans) {
      for (const c of p.courses) {
        if (!seen.has(c.name)) {
          seen.add(c.name);
          courses.push({ id: c.name, name: c.name, price: c.greenFee + "/pp", detail: c.whyThisCourse, tier: tierLabel[key] || key });
        }
      }
    }
    return courses;
  }, [plan, otherPlans, tierLabel]);

  // Merge dining
  const allDining = useMemo(() => {
    const opts: Option[] = [];
    const seen = new Set<string>();
    for (const d of plan.dining) {
      seen.add(d.name);
      opts.push({ id: d.name, name: d.name, price: d.priceRange, detail: `${d.type}`, recommended: true });
    }
    for (const { key, plan: p } of otherPlans) {
      for (const d of p.dining) {
        if (!seen.has(d.name)) {
          seen.add(d.name);
          opts.push({ id: d.name, name: d.name, price: d.priceRange, detail: `${d.type}`, tier: tierLabel[key] || key });
        }
      }
    }
    return opts;
  }, [plan, otherPlans, tierLabel]);

  // Merge bars
  const allBars = useMemo(() => {
    const opts: Option[] = [];
    const seen = new Set<string>();
    for (const b of (plan.bars || [])) {
      seen.add(b.name);
      opts.push({ id: b.name, name: b.name, detail: b.vibe, recommended: true });
    }
    for (const { key, plan: p } of otherPlans) {
      for (const b of (p.bars || [])) {
        if (!seen.has(b.name)) {
          seen.add(b.name);
          opts.push({ id: b.name, name: b.name, detail: b.vibe, tier: tierLabel[key] || key });
        }
      }
    }
    return opts;
  }, [plan, otherPlans, tierLabel]);

  // Merge lodging
  const allLodging = useMemo(() => {
    const opts: Option[] = [{
      id: plan.lodging.name,
      name: plan.lodging.name,
      price: plan.lodging.costPerNight + "/night",
      detail: plan.lodging.type,
      recommended: true,
    }];
    const seen = new Set([plan.lodging.name]);
    for (const { key, plan: p } of otherPlans) {
      if (p.lodging && !seen.has(p.lodging.name)) {
        seen.add(p.lodging.name);
        opts.push({ id: p.lodging.name, name: p.lodging.name, price: p.lodging.costPerNight + "/night", detail: p.lodging.type, tier: tierLabel[key] || key });
      }
    }
    return opts;
  }, [plan, otherPlans, tierLabel]);

  // Activity options
  const activityOptions: Option[] = ACTIVITIES.map((a) => ({ id: a, name: a }));

  // Number of days
  const numDays = plan.schedule?.length || plan.numberOfDays || 3;

  // Initialize day selections
  const [lodging, setLodging] = useState(plan.lodging.name);
  const [days, setDays] = useState<DaySelections[]>(() => {
    const init: DaySelections[] = [];
    for (let d = 0; d < numDays; d++) {
      const dayNum = d + 1;
      const r1 = plan.courses.find((c) => c.day === dayNum && c.session === "AM");
      const r2 = plan.courses.find((c) => c.day === dayNum && c.session === "PM");
      init.push({
        round1: r1?.name || allCourses[d % allCourses.length]?.id || "",
        round2: r2?.name || r1?.name || allCourses[(d + 1) % allCourses.length]?.id || "",
        round2IsActivity: false,
        activity: "",
        dinner: allDining[d % allDining.length]?.id || "",
        bar: allBars[d % allBars.length]?.id || "",
      });
    }
    return init;
  });

  const [saving, setSaving] = useState(false);

  const updateDay = useCallback((dayIndex: number, field: keyof DaySelections, value: string | boolean) => {
    setDays((prev) => prev.map((d, i) => i === dayIndex ? { ...d, [field]: value } : d));
  }, []);

  const saveAndView = async () => {
    setSaving(true);
    const selectedOptions: Record<string, string[]> = {
      lodging: [lodging],
      courses: [...new Set(days.flatMap((d) => d.round2IsActivity ? [d.round1] : [d.round1, d.round2]).filter(Boolean))],
      dining: days.map((d) => d.dinner).filter(Boolean),
      bars: days.map((d) => d.bar).filter(Boolean),
      activities: days.filter((d) => d.round2IsActivity && d.activity).map((d) => d.activity),
    };
    try {
      await fetch("/api/save-selections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, dest, tier, selectedOptions }),
      });
    } catch { /* silent */ }
    window.location.href = `/plan/result/${planId}?dest=${dest}&tier=${tier}`;
  };

  // ── Price calculation ──
  const basePrice = useMemo(() => parseDollars(plan.estimatedBudget?.perPerson), [plan]);

  // Build a map of course name → green fee (number)
  const courseFeeMap = useMemo(() => {
    const m: Record<string, number> = {};
    // From the selected tier plan
    for (const c of plan.courses) m[c.name] = parseDollars(c.greenFee);
    // From other tiers
    for (const { plan: p } of otherPlans) {
      for (const c of p.courses) {
        if (!(c.name in m)) m[c.name] = parseDollars(c.greenFee);
      }
    }
    return m;
  }, [plan, otherPlans]);

  // Sum of default (recommended) course fees
  const defaultCourseFeeTotal = useMemo(() => {
    return plan.courses.reduce((sum, c) => sum + parseDollars(c.greenFee), 0);
  }, [plan]);

  // Default lodging cost per night
  const defaultLodgingCost = useMemo(() => parseDollars(plan.lodging.costPerNight), [plan]);

  // Current lodging cost
  const currentLodgingCost = useMemo(() => {
    const sel = allLodging.find((o) => o.id === lodging);
    return sel ? parseDollars(sel.price) : defaultLodgingCost;
  }, [lodging, allLodging, defaultLodgingCost]);

  // Current course fee total (all selected rounds across all days)
  const currentCourseFeeTotal = useMemo(() => {
    let total = 0;
    for (const d of days) {
      total += courseFeeMap[d.round1] || 0;
      if (!d.round2IsActivity) total += courseFeeMap[d.round2] || 0;
    }
    return total;
  }, [days, courseFeeMap]);

  const groupSize = plan.groupSize || 12;

  // Price per person: base + delta from courses + delta from lodging
  const currentPricePerPerson = useMemo(() => {
    const courseDelta = currentCourseFeeTotal - defaultCourseFeeTotal;
    const lodgingDeltaPerNight = currentLodgingCost - defaultLodgingCost;
    const lodgingDelta = (lodgingDeltaPerNight * numDays) / groupSize;
    return Math.round(basePrice + courseDelta + lodgingDelta);
  }, [basePrice, currentCourseFeeTotal, defaultCourseFeeTotal, currentLodgingCost, defaultLodgingCost, numDays, groupSize]);

  const priceDelta = currentPricePerPerson - basePrice;

  // Track previous price for directional arrow
  const prevPriceRef = useRef(currentPricePerPerson);
  useEffect(() => {
    const timer = setTimeout(() => {
      setPrevPrice(prevPriceRef.current);
      prevPriceRef.current = currentPricePerPerson;
    }, 100);
    return () => clearTimeout(timer);
  }, [currentPricePerPerson]);

  const priceDirection = prevPrice === null ? null : currentPricePerPerson > prevPrice ? "up" : currentPricePerPerson < prevPrice ? "down" : null;

  // ── Smart recommendation tags ──

  // Determine if user picked expensive lodging (above median)
  const lodgingIsExpensive = useMemo(() => {
    const costs = allLodging.map((o) => parseDollars(o.price));
    const median = costs.sort((a, b) => a - b)[Math.floor(costs.length / 2)] || 0;
    return currentLodgingCost > median;
  }, [allLodging, currentLodgingCost]);

  const courseTagMap = useMemo(() => {
    const tags: Record<string, Tag[]> = {};
    if (allCourses.length === 0) return tags;

    // Find cheapest + best rated
    let cheapest = allCourses[0];
    let bestRated = allCourses[0];
    for (const c of allCourses) {
      const fee = parseDollars(c.price);
      if (fee > 0 && fee < (parseDollars(cheapest.price) || Infinity)) cheapest = c;
      if ((c.rating || 0) > (bestRated.rating || 0)) bestRated = c;
    }

    for (const c of allCourses) {
      const t: Tag[] = [];
      if (c.recommended) t.push({ label: "TDF PICK", color: "red" });
      if (c.id === cheapest.id && parseDollars(c.price) > 0) t.push({ label: "BUDGET PICK", color: "green" });
      if (c.id === bestRated.id && (bestRated.rating || 0) > 0) t.push({ label: "BEST RATED", color: "gold" });
      if (lodgingIsExpensive && parseDollars(c.price) > 0) {
        const fee = parseDollars(c.price);
        const avg = allCourses.reduce((s, x) => s + parseDollars(x.price), 0) / allCourses.length;
        if (fee < avg * 0.85) t.push({ label: "BALANCES BUDGET", color: "blue" });
      }
      if (t.length > 0) tags[c.id] = t;
    }
    return tags;
  }, [allCourses, lodgingIsExpensive]);

  const lodgingTagMap = useMemo(() => {
    const tags: Record<string, Tag[]> = {};
    if (allLodging.length === 0) return tags;

    let cheapest = allLodging[0];
    for (const l of allLodging) {
      if (parseDollars(l.price) > 0 && parseDollars(l.price) < (parseDollars(cheapest.price) || Infinity)) cheapest = l;
    }

    for (const l of allLodging) {
      const t: Tag[] = [];
      if (l.recommended) t.push({ label: "TDF PICK", color: "red" });
      if (l.id === cheapest.id && parseDollars(l.price) > 0) t.push({ label: "BUDGET PICK", color: "green" });
      if (t.length > 0) tags[l.id] = t;
    }
    return tags;
  }, [allLodging]);

  const diningTagMap = useMemo(() => {
    const tags: Record<string, Tag[]> = {};
    if (allDining.length === 0) return tags;

    let cheapest = allDining[0];
    let bestRated = allDining[0];
    for (const d of allDining) {
      if (parseDollars(d.price) > 0 && parseDollars(d.price) < (parseDollars(cheapest.price) || Infinity)) cheapest = d;
      if ((d.rating || 0) > (bestRated.rating || 0)) bestRated = d;
    }

    for (const d of allDining) {
      const t: Tag[] = [];
      if (d.recommended) t.push({ label: "TDF PICK", color: "red" });
      if (d.id === cheapest.id && parseDollars(d.price) > 0) t.push({ label: "BUDGET PICK", color: "green" });
      if (d.id === bestRated.id && (bestRated.rating || 0) > 0) t.push({ label: "BEST RATED", color: "gold" });
      if (t.length > 0) tags[d.id] = t;
    }
    return tags;
  }, [allDining]);

  const barTagMap = useMemo(() => {
    const tags: Record<string, Tag[]> = {};
    for (const b of allBars) {
      if (b.recommended) tags[b.id] = [{ label: "TDF PICK", color: "red" }];
    }
    return tags;
  }, [allBars]);

  // Build per-day Round 2 tag maps that add "CLOSE TO ROUND 1" hints
  const getRound2TagMap = useCallback((round1Id: string) => {
    const tags: Record<string, Tag[]> = {};
    for (const [id, base] of Object.entries(courseTagMap)) {
      tags[id] = [...base];
    }
    // If round 1 is selected, mark same course as "close"
    if (round1Id) {
      if (!tags[round1Id]) tags[round1Id] = [];
      // Only add if not already present
      if (!tags[round1Id].some((t) => t.label === "CLOSE TO ROUND 1")) {
        tags[round1Id] = [...(tags[round1Id] || []), { label: "CLOSE TO ROUND 1", color: "orange" }];
      }
    }
    return tags;
  }, [courseTagMap]);

  // Check if two courses on the same day are different (show travel hint)
  const getTravelHint = (day: DaySelections) => {
    if (day.round2IsActivity || !day.round1 || !day.round2 || day.round1 === day.round2) return null;
    return "Different courses — check drive time between them";
  };

  return (
    <>
    {/* ── Sticky Price Bar ── */}
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        height: 48,
        background: "rgba(10,10,12,0.88)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.75rem",
        padding: "0 1rem",
      }}
    >
      <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Est.</span>
      <span style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "1.25rem", fontWeight: 700, color: "#fff", letterSpacing: "0.02em" }}>
        ${currentPricePerPerson.toLocaleString()}
      </span>
      <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>/ person</span>
      {priceDelta !== 0 && (
        <span style={{
          fontSize: "0.7rem",
          fontWeight: 600,
          color: priceDelta > 0 ? "#f87171" : "#6ee7b7",
          display: "flex",
          alignItems: "center",
          gap: "2px",
        }}>
          {priceDelta > 0 ? "▲" : "▼"} ${Math.abs(priceDelta).toLocaleString()}
        </span>
      )}
      {priceDirection === "up" && (
        <span style={{ fontSize: "0.65rem", color: "#f87171", opacity: 0.7 }}>↑</span>
      )}
      {priceDirection === "down" && (
        <span style={{ fontSize: "0.65rem", color: "#6ee7b7", opacity: 0.7 }}>↓</span>
      )}
    </div>

    <main style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "clamp(2rem, 6vw, 4rem) clamp(1rem, 4vw, 3rem)", paddingTop: "calc(48px + clamp(2rem, 6vw, 4rem))" }}>
      <MulliganButton href={`/plan/result/${planId}?dest=${dest}`} />
      <HomeButton />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "3rem", maxWidth: 700, margin: "0 auto 3rem" }}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "clamp(2rem, 6vw, 4rem)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.5rem" }}
        >
          Build Your Trip
        </motion.h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem" }}>{plan.destination} · {numDays} Days</p>
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto" }}>

        {/* ── Lodging (whole trip) ── */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "1.5rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "#fff", marginBottom: "1rem" }}>
            Lodging
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {allLodging.map((o) => (
              <OptionCard key={o.id} option={o} selected={lodging === o.id} onSelect={() => setLodging(o.id)} tags={lodgingTagMap[o.id]} />
            ))}
          </div>
        </section>

        {/* ── Day-by-Day ── */}
        {days.map((day, di) => (
          <section key={di} style={{ marginBottom: "3rem", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "2rem" }}>
            <h2 style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", textTransform: "uppercase", letterSpacing: "0.08em", color: "#EA580C", marginBottom: "1.5rem" }}>
              Day {di + 1}
            </h2>

            {/* Round 1 — Morning */}
            <SlotSection
              label="Round 1 — Morning"
              options={allCourses}
              selectedId={day.round1}
              onSelect={(id) => updateDay(di, "round1", id)}
              tagMap={courseTagMap}
            />

            {/* Round 2 — Afternoon (or Activity) */}
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-plan-block), sans-serif" }}>
                  {day.round2IsActivity ? "Activity — Afternoon" : "Round 2 — Afternoon"}
                </p>
                <button
                  onClick={() => updateDay(di, "round2IsActivity", !day.round2IsActivity)}
                  style={{
                    background: "none",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.45)",
                    fontSize: "0.65rem",
                    padding: "8px 12px",
                    borderRadius: 4,
                    cursor: "pointer",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    minHeight: 44,
                  }}
                >
                  {day.round2IsActivity ? "Back to Golf" : "Swap for Activity"}
                </button>
              </div>

              {day.round2IsActivity ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {activityOptions.map((o) => (
                    <OptionCard key={o.id} option={o} selected={day.activity === o.id} onSelect={() => updateDay(di, "activity", o.id)} />
                  ))}
                </div>
              ) : (
                <>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {allCourses.map((o) => {
                      const r2Tags = getRound2TagMap(day.round1);
                      return (
                        <OptionCard key={o.id} option={o} selected={day.round2 === o.id} onSelect={() => updateDay(di, "round2", o.id)} tags={r2Tags[o.id]} />
                      );
                    })}
                  </div>
                  {getTravelHint(day) && (
                    <p style={{ fontSize: "0.7rem", color: "#D4A843", marginTop: "0.5rem", fontStyle: "italic" }}>
                      ⚠ {getTravelHint(day)}
                    </p>
                  )}
                </>
              )}
            </div>

            {/* Dinner */}
            <SlotSection
              label={`Dinner — Day ${di + 1}`}
              options={allDining}
              selectedId={day.dinner}
              onSelect={(id) => updateDay(di, "dinner", id)}
              tagMap={diningTagMap}
            />

            {/* Bar */}
            <SlotSection
              label={`Nightlife — Day ${di + 1}`}
              options={allBars}
              selectedId={day.bar}
              onSelect={(id) => updateDay(di, "bar", id)}
              tagMap={barTagMap}
            />
          </section>
        ))}

        {/* ── Bottom CTA ── */}
        <div style={{
          position: "sticky",
          bottom: "1rem",
          background: "rgba(0,0,0,0.9)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 12,
          padding: "1rem 1.5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <button
            onClick={saveAndView}
            disabled={saving}
            style={{
              padding: "12px 32px",
              background: "rgba(220,38,38,0.9)",
              border: "none",
              borderRadius: 6,
              color: "#fff",
              fontSize: "0.95rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontFamily: "var(--font-plan-block), sans-serif",
              cursor: saving ? "wait" : "pointer",
              opacity: saving ? 0.6 : 1,
            }}
          >
            {saving ? "Saving..." : "View Itinerary & Pricing"}
          </button>
        </div>
      </div>
    </main>
    </>
  );
}
