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

type SlotMode = "golf" | "activity" | "rest";

interface DaySelections {
  round1: string;
  round1Mode: SlotMode;
  round1Activity: string;
  round2: string;
  round2IsActivity: boolean;
  round2Mode: SlotMode;
  activity: string;
  dinner: string;
  bar: string;
}

const ACTIVITIES = ["ATV", "Fishing", "Spa", "Brewery Tour", "Shooting", "Casino", "Hiking", "Top Golf"];

// ── Helpers ──

/** Parse a dollar string like "$89" or "$2,450" into a number.
 *  For ranges like "$800-$1,200", returns the midpoint. */
function parseDollars(s: string | undefined): number {
  if (!s) return 0;
  // Handle ranges like "$800-$1,200" or "$800 - $1,200"
  const rangeMatch = s.match(/\$?\s*([\d,]+(?:\.\d+)?)\s*[-–—]\s*\$?\s*([\d,]+(?:\.\d+)?)/);
  if (rangeMatch) {
    const lo = parseFloat(rangeMatch[1].replace(/,/g, "")) || 0;
    const hi = parseFloat(rangeMatch[2].replace(/,/g, "")) || 0;
    return Math.round((lo + hi) / 2);
  }
  const m = s.replace(/[^0-9.]/g, "");
  return parseFloat(m) || 0;
}

/** Map a dining price-range string to a per-person cost estimate */
function diningPricePerPerson(priceRange: string | undefined): number {
  const raw = (priceRange || "").replace(/["\s]/g, "");
  if (raw === "$$$$") return 150;
  if (raw === "$$$") return 100;
  if (raw === "$$") return 60;
  if (raw === "$") return 30;
  return 50;
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

function SlotModeToggle({ mode, onChange }: { mode: SlotMode; onChange: (m: SlotMode) => void }) {
  const modes: { value: SlotMode; label: string }[] = [
    { value: "golf", label: "Golf" },
    { value: "activity", label: "Activity" },
    { value: "rest", label: "Rest" },
  ];
  return (
    <div style={{ display: "flex", gap: 0, borderRadius: 4, overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)" }}>
      {modes.map((m) => (
        <button
          key={m.value}
          onClick={() => onChange(m.value)}
          style={{
            background: mode === m.value ? "rgba(220,38,38,0.8)" : "transparent",
            color: mode === m.value ? "#fff" : "rgba(255,255,255,0.4)",
            border: "none",
            fontSize: "0.65rem",
            fontWeight: 600,
            padding: "6px 12px",
            cursor: "pointer",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            minHeight: 32,
            transition: "background 0.15s, color 0.15s",
          }}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}

function SlotSection({ label, options, selectedId, onSelect, tagMap }: { label: string; options: Option[]; selectedId: string; onSelect: (id: string) => void; tagMap?: Record<string, Tag[]> }) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <p style={{ fontSize: "1.125rem", color: "#fff", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.5rem", fontFamily: "var(--font-plan-block), sans-serif" }}>
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



  // Number of days and nights (3 activity days = 5 nights: arrive day before, depart day after)
  const numDays = plan.schedule?.length || plan.numberOfDays || 3;
  const numNights = numDays + 2;

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
        round1Mode: "golf",
        round1Activity: "",
        round2: r2?.name || r1?.name || allCourses[(d + 1) % allCourses.length]?.id || "",
        round2IsActivity: false,
        round2Mode: "golf",
        activity: "",
        dinner: allDining[d % allDining.length]?.id || "",
        bar: allBars[d % allBars.length]?.id || "",
      });
    }
    return init;
  });

  const [transport, setTransport] = useState("rental-car");
  const [saving, setSaving] = useState(false);
  const [expandedDay, setExpandedDay] = useState<number | null>(0);
  const [autoSaved, setAutoSaved] = useState(false);
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoSaveFadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateDay = useCallback((dayIndex: number, field: keyof DaySelections, value: string | boolean) => {
    setDays((prev) => prev.map((d, i) => i === dayIndex ? { ...d, [field]: value } : d));
  }, []);

  // Auto-save selections with 2s debounce
  useEffect(() => {
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(() => {
      const selectedOptions: Record<string, string[]> = {
        lodging: [lodging],
        courses: [...new Set(days.flatMap((d) => {
          const r: string[] = [];
          if (d.round1Mode === "golf") r.push(d.round1);
          if (d.round2Mode === "golf") r.push(d.round2);
          return r;
        }).filter(Boolean))],
        dining: days.map((d) => d.dinner).filter(Boolean),
        bars: days.map((d) => d.bar).filter(Boolean),
        activities: [...new Set(days.flatMap((d) => {
          const a: string[] = [];
          if (d.round1Mode === "activity" && d.round1Activity) a.push(d.round1Activity);
          if (d.round2Mode === "activity" && d.activity) a.push(d.activity);
          return a;
        }))],
        transport: [transport],
      };
      fetch("/api/save-selections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, dest, tier, selectedOptions }),
      }).then(() => {
        setAutoSaved(true);
        if (autoSaveFadeTimer.current) clearTimeout(autoSaveFadeTimer.current);
        autoSaveFadeTimer.current = setTimeout(() => setAutoSaved(false), 2000);
      }).catch(() => {});
    }, 2000);
    return () => { if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current); };
  }, [days, lodging, transport, planId, dest, tier]);

  const saveAndView = async () => {
    setSaving(true);
    const selectedOptions: Record<string, string[]> = {
      lodging: [lodging],
      courses: [...new Set(days.flatMap((d) => {
        const r: string[] = [];
        if (d.round1Mode === "golf") r.push(d.round1);
        if (d.round2Mode === "golf") r.push(d.round2);
        return r;
      }).filter(Boolean))],
      dining: days.map((d) => d.dinner).filter(Boolean),
      bars: days.map((d) => d.bar).filter(Boolean),
      activities: [...new Set(days.flatMap((d) => {
        const a: string[] = [];
        if (d.round1Mode === "activity" && d.round1Activity) a.push(d.round1Activity);
        if (d.round2Mode === "activity" && d.activity) a.push(d.activity);
        return a;
      }))],
      transport: [transport],
    };
    try {
      await fetch("/api/save-selections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, dest, tier, selectedOptions }),
      });
    } catch (err) {
      console.error("Failed to save selections:", err);
    }
    window.location.href = `/plan/itinerary?planId=${planId}&dest=${dest}&tier=${tier}`;
  };

  // ── Price calculation ──
  const aiEstimate = useMemo(() => parseDollars(plan.estimatedBudget?.perPerson), [plan]);

  // Build a map of course name → green fee (number)
  const courseFeeMap = useMemo(() => {
    const m: Record<string, number> = {};
    for (const c of plan.courses) m[c.name] = parseDollars(c.greenFee);
    for (const { plan: p } of otherPlans) {
      for (const c of p.courses) {
        if (!(c.name in m)) m[c.name] = parseDollars(c.greenFee);
      }
    }
    return m;
  }, [plan, otherPlans]);

  // Build a map of dining name → per-person cost
  const diningFeeMap = useMemo(() => {
    const m: Record<string, number> = {};
    for (const d of plan.dining) m[d.name] = diningPricePerPerson(d.priceRange);
    for (const { plan: p } of otherPlans) {
      for (const d of p.dining) {
        if (!(d.name in m)) m[d.name] = diningPricePerPerson(d.priceRange);
      }
    }
    return m;
  }, [plan, otherPlans]);

  // Default lodging cost per night
  const defaultLodgingCost = useMemo(() => parseDollars(plan.lodging.costPerNight), [plan]);

  // Current lodging cost per night
  const currentLodgingCost = useMemo(() => {
    const sel = allLodging.find((o) => o.id === lodging);
    return sel ? parseDollars(sel.price) : defaultLodgingCost;
  }, [lodging, allLodging, defaultLodgingCost]);

  // Current course fee total (all selected rounds across all days)
  const currentCourseFeeTotal = useMemo(() => {
    let total = 0;
    for (const d of days) {
      if (d.round1Mode === "golf") total += courseFeeMap[d.round1] || 0;
      if (d.round2Mode === "golf") total += courseFeeMap[d.round2] || 0;
    }
    return total;
  }, [days, courseFeeMap]);

  // Current dining total (sum of per-person cost for each day's dinner)
  const currentDiningTotal = useMemo(() => {
    let total = 0;
    for (const d of days) {
      total += diningFeeMap[d.dinner] || 50; // fallback $50 if unknown
    }
    return total;
  }, [days, diningFeeMap]);

  const groupSize = plan.groupSize || 12;

  // Transport options
  const transportOptions: Option[] = useMemo(() => [
    { id: "rental-car", name: "Rental Car", price: `~$${50 * numDays}/pp`, detail: "Most flexible — split across crew" },
    { id: "party-bus", name: "Party Bus", price: `~$${Math.round((200 * numDays) / groupSize)}/pp`, detail: "Golf shuttles + bar crawls covered" },
    { id: "limo-service", name: "Limo Service", price: `~$${Math.round((300 * numDays) / groupSize)}/pp`, detail: "Premium transport for the crew" },
    { id: "airport-shuttle", name: "Airport Shuttle", price: "~$25/pp", detail: "One-way airport transfer" },
    { id: "none", name: "No Transport Needed", price: "$0", detail: "We have our own rides" },
  ], [numDays, groupSize]);

  // Transport cost per person
  const transportCostPerPerson = useMemo(() => {
    if (transport === "rental-car") return 50 * numDays;
    if (transport === "party-bus") return Math.round((200 * numDays) / groupSize);
    if (transport === "limo-service") return Math.round((300 * numDays) / groupSize);
    if (transport === "airport-shuttle") return 25;
    return 0; // "none"
  }, [transport, numDays, groupSize]);

  // Default transport is rental-car
  const defaultTransportCostPerPerson = 50 * numDays;

  // Bottom-up price: lodging + golf + dining + transport
  const currentPricePerPerson = useMemo(() => {
    const lodgingPerPerson = (currentLodgingCost * numNights) / groupSize;
    return Math.round(lodgingPerPerson + currentCourseFeeTotal + currentDiningTotal + transportCostPerPerson);
  }, [currentLodgingCost, numNights, groupSize, currentCourseFeeTotal, currentDiningTotal, transportCostPerPerson]);

  // Initial price from default selections (for delta arrow)
  const initialPricePerPerson = useMemo(() => {
    const lodgingPerPerson = (defaultLodgingCost * numNights) / groupSize;
    const defaultGolfTotal = plan.courses.reduce((sum, c) => sum + parseDollars(c.greenFee), 0);
    // Default dining: use the initial day selections (first N dining options)
    let defaultDiningTotal = 0;
    for (let d = 0; d < numDays; d++) {
      const diningId = allDining[d % allDining.length]?.id || "";
      defaultDiningTotal += diningFeeMap[diningId] || 50;
    }
    return Math.round(lodgingPerPerson + defaultGolfTotal + defaultDiningTotal + defaultTransportCostPerPerson);
  }, [defaultLodgingCost, numNights, groupSize, plan.courses, numDays, allDining, diningFeeMap, defaultTransportCostPerPerson]);

  const priceDelta = currentPricePerPerson - initialPricePerPerson;

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
      const cost = diningPricePerPerson(d.price);
      const cheapCost = diningPricePerPerson(cheapest.price);
      if (cost > 0 && cost < cheapCost) cheapest = d;
      if ((d.rating || 0) > (bestRated.rating || 0)) bestRated = d;
    }

    for (const d of allDining) {
      const t: Tag[] = [];
      if (d.recommended) t.push({ label: "TDF PICK", color: "red" });
      if (d.id === cheapest.id) t.push({ label: "BUDGET PICK", color: "green" });
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
    <main style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "clamp(2rem, 6vw, 4rem) clamp(1rem, 4vw, 3rem)" }}>
      <MulliganButton href={`/plan/result/${planId}?dest=${dest}`} />
      <HomeButton />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "1.5rem", maxWidth: 700, margin: "0 auto 1.5rem" }}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "clamp(2rem, 6vw, 4rem)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.5rem" }}
        >
          Build Your Trip
        </motion.h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem" }}>{plan.destination} · {numDays} Days</p>
      </div>

      {/* Price estimate */}
      <div style={{
        maxWidth: 700,
        margin: "0 auto 3rem",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: 8,
        padding: "1.2rem 1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        background: "rgba(255,255,255,0.03)",
      }}>
        <span style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Est.</span>
        <span style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "1.625rem", fontWeight: 700, color: "#fff", letterSpacing: "0.02em" }}>
          ${currentPricePerPerson.toLocaleString()}
        </span>
        <span style={{ fontSize: "0.975rem", color: "rgba(255,255,255,0.4)" }}>/ person</span>
        {priceDelta !== 0 && (
          <span style={{
            fontSize: "0.9rem",
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
          <span style={{ fontSize: "0.85rem", color: "#f87171", opacity: 0.7 }}>↑</span>
        )}
        {priceDirection === "down" && (
          <span style={{ fontSize: "0.85rem", color: "#6ee7b7", opacity: 0.7 }}>↓</span>
        )}
        {aiEstimate > 0 && (
          <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.3)", marginLeft: "0.25rem", whiteSpace: "nowrap" }}>
            AI est: ${aiEstimate.toLocaleString()}
          </span>
        )}
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

        {/* ── Transportation ── */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "1.5rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "#fff", marginBottom: "1rem" }}>
            Transportation
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {transportOptions.map((o) => (
              <OptionCard key={o.id} option={o} selected={transport === o.id} onSelect={() => setTransport(o.id)} />
            ))}
          </div>
        </section>

        {/* ── Arrival Day ── */}
        <section style={{ marginBottom: "1rem", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1.5rem" }}>
          <div style={{ padding: "0.5rem 0", marginBottom: "0.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", textTransform: "uppercase", letterSpacing: "0.08em", color: "#EA580C", margin: 0 }}>
              Day 1 — Arrival
            </h2>
          </div>
          <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginBottom: "1rem", lineHeight: 1.6 }}>
            Fly in, check into lodging, and settle in. Kick off the trip with a group dinner.
          </p>
          <SlotSection
            label="Welcome Dinner"
            options={allDining}
            selectedId={days[0]?.dinner || ""}
            onSelect={(id) => updateDay(0, "dinner", id)}
            tagMap={diningTagMap}
          />
          <SlotSection
            label="First Night Out"
            options={allBars}
            selectedId={days[0]?.bar || ""}
            onSelect={(id) => updateDay(0, "bar", id)}
          />
        </section>

        {/* ── Activity Days ── */}
        {days.map((day, di) => {
          const isExpanded = expandedDay === di;
          const daySummary = [
            day.round1Mode === "golf" ? day.round1 : day.round1Mode === "activity" ? day.round1Activity : "Rest",
            day.round2Mode === "golf" ? day.round2 : day.round2Mode === "activity" ? day.activity : "Rest",
            day.dinner,
          ].filter(Boolean).join(" · ");

          return (
            <section key={di} style={{ marginBottom: "1rem", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1.5rem" }}>
              <button
                onClick={() => setExpandedDay(isExpanded ? null : di)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  width: "100%",
                  textAlign: "left",
                  padding: "0.5rem 0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: isExpanded ? "1.5rem" : "0",
                }}
              >
                <h2 style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", textTransform: "uppercase", letterSpacing: "0.08em", color: "#EA580C", margin: 0 }}>
                  Day {di + 2}
                </h2>
                <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "1.2rem", transition: "transform 0.2s", transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}>
                  &#9660;
                </span>
              </button>

              {!isExpanded && daySummary && (
                <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.35)", marginTop: "0.25rem", lineHeight: 1.6, fontFamily: "var(--font-inter), sans-serif" }}>
                  {daySummary}
                </p>
              )}

              {isExpanded && (
                <>
                  {/* Round 1 — Morning */}
                  <div style={{ marginBottom: "1.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                      <p style={{ fontSize: "1.125rem", color: "#fff", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-plan-block), sans-serif" }}>
                        {day.round1Mode === "golf" ? "Round 1 — Morning" : day.round1Mode === "activity" ? "Activity — Morning" : "Rest — Morning"}
                      </p>
                      <SlotModeToggle mode={day.round1Mode} onChange={(m) => updateDay(di, "round1Mode", m)} />
                    </div>
                    {day.round1Mode === "golf" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        {allCourses.map((o) => (
                          <OptionCard key={o.id} option={o} selected={day.round1 === o.id} onSelect={() => updateDay(di, "round1", o.id)} tags={courseTagMap[o.id]} />
                        ))}
                      </div>
                    )}
                    {day.round1Mode === "activity" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        {activityOptions.map((o) => (
                          <OptionCard key={o.id} option={o} selected={day.round1Activity === o.id} onSelect={() => updateDay(di, "round1Activity", o.id)} />
                        ))}
                      </div>
                    )}
                    {day.round1Mode === "rest" && (
                      <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.3)", fontStyle: "italic", padding: "1rem 0" }}>
                        Sleep in, hit the pool, or just chill.
                      </p>
                    )}
                  </div>

                  {/* Round 2 — Afternoon */}
                  <div style={{ marginBottom: "1.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                      <p style={{ fontSize: "1.125rem", color: "#fff", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-plan-block), sans-serif" }}>
                        {day.round2Mode === "golf" ? "Round 2 — Afternoon" : day.round2Mode === "activity" ? "Activity — Afternoon" : "Rest — Afternoon"}
                      </p>
                      <SlotModeToggle mode={day.round2Mode} onChange={(m) => { updateDay(di, "round2Mode", m); updateDay(di, "round2IsActivity", m === "activity"); }} />
                    </div>
                    {day.round2Mode === "golf" && (
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
                            {getTravelHint(day)}
                          </p>
                        )}
                      </>
                    )}
                    {day.round2Mode === "activity" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        {activityOptions.map((o) => (
                          <OptionCard key={o.id} option={o} selected={day.activity === o.id} onSelect={() => updateDay(di, "activity", o.id)} />
                        ))}
                      </div>
                    )}
                    {day.round2Mode === "rest" && (
                      <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.3)", fontStyle: "italic", padding: "1rem 0" }}>
                        Take the afternoon off — recharge for tonight.
                      </p>
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
                </>
              )}
            </section>
          );
        })}

        {/* ── Departure Day ── */}
        <section style={{ marginBottom: "2rem", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1.5rem" }}>
          <div style={{ padding: "0.5rem 0", marginBottom: "0.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", textTransform: "uppercase", letterSpacing: "0.08em", color: "#EA580C", margin: 0 }}>
              Day {numDays + 2} — Departure
            </h2>
          </div>
          <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>
            Check out, grab brunch, and head to the airport. Trip complete.
          </p>
        </section>

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
          gap: "1rem",
        }}>
          {autoSaved && (
            <span style={{ fontSize: "0.75rem", color: "rgba(74,222,128,0.8)", fontFamily: "var(--font-inter), sans-serif", transition: "opacity 0.3s", whiteSpace: "nowrap" }}>
              Saved &#10003;
            </span>
          )}
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
