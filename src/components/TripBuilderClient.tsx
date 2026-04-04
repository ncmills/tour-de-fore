"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import type { GeneratedPlan, ThreePlanResult, TripTier } from "@/lib/plan-types";
import type { InsightsContext } from "@/lib/insights";
import { lookupCourse, lookupDining, lookupBar, formatReviewCount, estimateDriveBetween, getDayHints, computeTdfPicks, isTdfPick, type TdfPicks, type DayHint } from "@/lib/insights";
import MulliganButton from "./MulliganButton";
import HomeButton from "./HomeButton";

// ── Types ──

interface Option {
  id: string;
  name: string;
  price?: string;
  rating?: number;
  reviewCount?: number;
  detail?: string;
  tier?: string;
  recommended?: boolean;
  driveMinutes?: number;
  imageUrl?: string;
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
  purple: { bg: "rgba(147,51,234,0.15)", text: "#c084fc" },
};

// ── Fallback golf course images (from courses with known good OG images) ──

const FALLBACK_GOLF_IMAGES = [
  "https://www.troonnorthgolf.com/wp-content/uploads/sites/8934/2023/06/home-main.jpg",
  "https://balihaigolfclub.com/wp-content/uploads/2024/07/bali-hai-og.jpg",
  "https://chambersbaygolf.com/wp-content/uploads/2025/05/cb-homescreen.jpg",
  "https://tamarackidaho.com/wp-content/uploads/2024/04/SH.2023.6.29_Golfing-157-scaled.jpg",
  "https://falconridgegolfclub.com/wp-content/uploads/HOLE-18-FALCON-RIDGE-0098.jpg",
  "https://www.wolfrungolfclub.com/wp-content/uploads/sites/8583/2022/09/home-full-1.jpg",
  "https://www.sandiagolf.com/wp-content/uploads/sites/8959/2023/06/21.jpg",
  "https://tetherow.com/wp-content/uploads/2018/12/tetherow-lodge-hero-3000.jpg",
  "https://www.reservegolf.com/wp-content/uploads/sites/9325/2024/01/IMG_5043.jpg",
  "https://newcastlegolf.com/wp-content/uploads/2024/01/DJI_0055-Enhanced-NR.jpg",
  "https://casablanca.playmesquite.com/wp-content/uploads/2025/01/200808_nevada_palmsgolf_033.jpg",
  "https://azhideawaycollection.com/wp-content/uploads/2024/12/sedona_home_hero-1024x728.webp",
];

/** Deterministic fallback image based on course name */
function getFallbackImage(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
  return FALLBACK_GOLF_IMAGES[Math.abs(hash) % FALLBACK_GOLF_IMAGES.length];
}

// ── Small Option Card ──

function OptionCard({ option, selected, onSelect, disabled, tags, useFallbackImage }: { option: Option; selected: boolean; onSelect: () => void; disabled?: boolean; tags?: Tag[]; useFallbackImage?: boolean }) {
  const hasFlame = tags?.some((t) => t.label === "TDF PICK");
  const imgSrc = option.imageUrl || (useFallbackImage ? getFallbackImage(option.name) : null);
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
      <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
        {/* Thumbnail */}
        {imgSrc && (
          <div style={{ flexShrink: 0, width: 56, height: 56, borderRadius: 6, overflow: "hidden", position: "relative", border: "1px solid rgba(255,255,255,0.1)" }}>
            <Image
              src={imgSrc}
              alt={option.name}
              fill
              sizes="56px"
              style={{ objectFit: "cover" }}
              unoptimized
            />
          </div>
        )}
        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 600, fontSize: "0.9rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{option.name}</span>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexShrink: 0 }}>
              {option.rating && <span style={{ color: "#D4A843", fontSize: "0.75rem" }}>{option.rating}★{option.reviewCount ? ` (${formatReviewCount(option.reviewCount)})` : ""}</span>}
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
        </div>
      </div>
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
  insights,
}: {
  plan: GeneratedPlan;
  allPlans?: ThreePlanResult;
  planId: string;
  tier: TripTier;
  dest: string;
  insights?: InsightsContext | null;
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

  // Merge courses from all tiers (deduped) + enrich with insight data
  const allCourses = useMemo(() => {
    const courses: Option[] = [];
    const seen = new Set<string>();
    const enrich = (name: string) => {
      if (!insights) return {};
      const ci = lookupCourse(insights, name);
      return ci ? { rating: ci.googleRating, reviewCount: ci.reviewCount, driveMinutes: ci.driveMinutes, imageUrl: ci.imageUrl } : {};
    };
    for (const c of (plan.courses || [])) {
      seen.add(c.name);
      courses.push({ id: c.name, name: c.name, price: c.greenFee + "/pp", detail: c.whyThisCourse, recommended: true, ...enrich(c.name) });
    }
    for (const { key, plan: p } of otherPlans) {
      for (const c of (p.courses || [])) {
        if (!seen.has(c.name)) {
          seen.add(c.name);
          courses.push({ id: c.name, name: c.name, price: c.greenFee + "/pp", detail: c.whyThisCourse, tier: tierLabel[key] || key, ...enrich(c.name) });
        }
      }
    }
    return courses;
  }, [plan, otherPlans, tierLabel, insights]);

  // Merge dining + enrich
  const allDining = useMemo(() => {
    const opts: Option[] = [];
    const seen = new Set<string>();
    const enrich = (name: string) => {
      if (!insights) return {};
      const di = lookupDining(insights, name);
      return di ? { rating: di.googleRating, reviewCount: di.reviewCount, imageUrl: di.imageUrl } : {};
    };
    for (const d of (plan.dining || [])) {
      seen.add(d.name);
      opts.push({ id: d.name, name: d.name, price: d.priceRange, detail: `${d.type}`, recommended: true, ...enrich(d.name) });
    }
    for (const { key, plan: p } of otherPlans) {
      for (const d of (p.dining || [])) {
        if (!seen.has(d.name)) {
          seen.add(d.name);
          opts.push({ id: d.name, name: d.name, price: d.priceRange, detail: `${d.type}`, tier: tierLabel[key] || key, ...enrich(d.name) });
        }
      }
    }
    return opts;
  }, [plan, otherPlans, tierLabel, insights]);

  // Merge bars + enrich
  const allBars = useMemo(() => {
    const opts: Option[] = [];
    const seen = new Set<string>();
    const enrich = (name: string) => {
      if (!insights) return {};
      const bi = lookupBar(insights, name);
      return bi ? { rating: bi.googleRating, imageUrl: bi.imageUrl } : {};
    };
    for (const b of (plan.bars || [])) {
      seen.add(b.name);
      opts.push({ id: b.name, name: b.name, detail: b.vibe, recommended: true, ...enrich(b.name) });
    }
    for (const { key, plan: p } of otherPlans) {
      for (const b of (p.bars || [])) {
        if (!seen.has(b.name)) {
          seen.add(b.name);
          opts.push({ id: b.name, name: b.name, detail: b.vibe, tier: tierLabel[key] || key, ...enrich(b.name) });
        }
      }
    }
    return opts;
  }, [plan, otherPlans, tierLabel, insights]);

  // Merge lodging
  const safeLodging = plan.lodging || { name: "Lodging TBD", type: "House", costPerNight: "$0" };
  const allLodging = useMemo(() => {
    const opts: Option[] = [{
      id: safeLodging.name,
      name: safeLodging.name,
      price: safeLodging.costPerNight + "/night",
      detail: safeLodging.type,
      recommended: true,
    }];
    const seen = new Set([safeLodging.name]);
    for (const { key, plan: p } of otherPlans) {
      if (p.lodging && !seen.has(p.lodging.name)) {
        seen.add(p.lodging.name);
        opts.push({ id: p.lodging.name, name: p.lodging.name, price: p.lodging.costPerNight + "/night", detail: p.lodging.type, tier: tierLabel[key] || key });
      }
    }
    return opts;
  }, [safeLodging, otherPlans, tierLabel]);

  // Activity options
  const activityOptions: Option[] = ACTIVITIES.map((a) => ({ id: a, name: a }));



  // Number of days and nights (3 activity days = 5 nights: arrive day before, depart day after)
  const numDays = plan.schedule?.length || plan.numberOfDays || 3;
  const numNights = numDays + 2;

  // Initialize day selections
  const [lodging, setLodging] = useState(safeLodging.name);
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
  // Track which slots user manually touched (for TDF Build partial auto-fill)
  const [touchedSlots, setTouchedSlots] = useState<Set<string>>(new Set());
  const markTouched = useCallback((slot: string) => {
    setTouchedSlots((prev) => new Set(prev).add(slot));
  }, []);
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoSaveFadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateDay = useCallback((dayIndex: number, field: keyof DaySelections, value: string | boolean) => {
    setDays((prev) => prev.map((d, i) => i === dayIndex ? { ...d, [field]: value } : d));
    markTouched(`day${dayIndex}-${field}`);
  }, [markTouched]);

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
  const aiEstimate = useMemo(() => parseDollars(plan.estimatedBudget?.perPerson || ""), [plan]);

  // Build a map of course name → green fee (number)
  const courseFeeMap = useMemo(() => {
    const m: Record<string, number> = {};
    for (const c of (plan.courses || [])) m[c.name] = parseDollars(c.greenFee);
    for (const { plan: p } of otherPlans) {
      for (const c of (p.courses || [])) {
        if (!(c.name in m)) m[c.name] = parseDollars(c.greenFee);
      }
    }
    return m;
  }, [plan, otherPlans]);

  // Build a map of dining name → per-person cost
  const diningFeeMap = useMemo(() => {
    const m: Record<string, number> = {};
    for (const d of (plan.dining || [])) m[d.name] = diningPricePerPerson(d.priceRange);
    for (const { plan: p } of otherPlans) {
      for (const d of (p.dining || [])) {
        if (!(d.name in m)) m[d.name] = diningPricePerPerson(d.priceRange);
      }
    }
    return m;
  }, [plan, otherPlans]);

  // Default lodging cost per night
  const defaultLodgingCost = useMemo(() => parseDollars(safeLodging.costPerNight), [safeLodging]);

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
    const defaultGolfTotal = (plan.courses || []).reduce((sum, c) => sum + parseDollars(c.greenFee), 0);
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

  // ── TDF Picks (data-driven best options) ──

  const tdfPicks = useMemo<TdfPicks | null>(() => {
    if (!insights) return null;
    return computeTdfPicks(insights, allCourses, allDining, allBars, allLodging, numDays);
  }, [insights, allCourses, allDining, allBars, allLodging, numDays]);

  // ── Smart recommendation tags ──

  // Determine if user picked expensive lodging (above median)
  const lodgingIsExpensive = useMemo(() => {
    const costs = allLodging.map((o) => parseDollars(o.price));
    const median = costs.sort((a, b) => a - b)[Math.floor(costs.length / 2)] || 0;
    return currentLodgingCost > median;
  }, [allLodging, currentLodgingCost]);

  // Cap tags at 3, with priority ordering
  const capTags = (t: Tag[]): Tag[] => {
    // Priority: TDF PICK > hype/rank > quality > info
    const priority: Record<string, number> = { "TDF PICK": 0, "BUCKET LIST": 1, "TOP 100 PUBLIC": 1, "HIDDEN GEM": 1, "TOURNAMENT HOST": 1, "DESIGNER CLASSIC": 1, "LOCALS' FAVORITE": 1, "BEST VALUE": 1, "BEST RATED": 2, "BUDGET PICK": 3, "BALANCES BUDGET": 4, "LATE NIGHT": 5, "WALKABLE": 5, "RESERVATION": 5, "GROUPS 16+": 5, "CLOSE TO ROUND 1": 6 };
    return [...t].sort((a, b) => (priority[a.label] ?? 9) - (priority[b.label] ?? 9)).slice(0, 3);
  };

  const courseTagMap = useMemo(() => {
    const tags: Record<string, Tag[]> = {};
    if (allCourses.length === 0) return tags;

    let cheapest = allCourses[0];
    let bestRated = allCourses[0];
    for (const c of allCourses) {
      const fee = parseDollars(c.price);
      if (fee > 0 && fee < (parseDollars(cheapest.price) || Infinity)) cheapest = c;
      if ((c.rating || 0) > (bestRated.rating || 0)) bestRated = c;
    }

    for (const c of allCourses) {
      const t: Tag[] = [];
      // TDF PICK from data-driven scoring (or fallback to Claude's recommended)
      const isTdf = tdfPicks ? isTdfPick(tdfPicks, "course", c.id) : c.recommended;
      if (isTdf) t.push({ label: "TDF PICK", color: "red" });
      // Insight-driven tags
      if (insights) {
        const ci = lookupCourse(insights, c.name);
        if (ci?.hypeTag) t.push({ label: ci.hypeTag, color: "purple" });
        if (ci?.rankNote) t.push({ label: "TOP 100 PUBLIC", color: "purple" });
        if (ci?.walkable) t.push({ label: "WALKABLE", color: "green" });
      }
      if (c.id === cheapest.id && parseDollars(c.price) > 0) t.push({ label: "BUDGET PICK", color: "green" });
      if (c.id === bestRated.id && (bestRated.rating || 0) > 0) t.push({ label: "BEST RATED", color: "gold" });
      if (lodgingIsExpensive && parseDollars(c.price) > 0) {
        const fee = parseDollars(c.price);
        const avg = allCourses.reduce((s, x) => s + parseDollars(x.price), 0) / allCourses.length;
        if (fee < avg * 0.85) t.push({ label: "BALANCES BUDGET", color: "blue" });
      }
      if (t.length > 0) tags[c.id] = capTags(t);
    }
    return tags;
  }, [allCourses, lodgingIsExpensive, insights, tdfPicks]);

  const lodgingTagMap = useMemo(() => {
    const tags: Record<string, Tag[]> = {};
    if (allLodging.length === 0) return tags;

    let cheapest = allLodging[0];
    for (const l of allLodging) {
      if (parseDollars(l.price) > 0 && parseDollars(l.price) < (parseDollars(cheapest.price) || Infinity)) cheapest = l;
    }

    for (const l of allLodging) {
      const t: Tag[] = [];
      const isTdf = tdfPicks ? tdfPicks.lodging === l.id : l.recommended;
      if (isTdf) t.push({ label: "TDF PICK", color: "red" });
      if (l.id === cheapest.id && parseDollars(l.price) > 0) t.push({ label: "BUDGET PICK", color: "green" });
      if (t.length > 0) tags[l.id] = capTags(t);
    }
    return tags;
  }, [allLodging, tdfPicks]);

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
      const isTdf = tdfPicks ? isTdfPick(tdfPicks, "dining", d.id) : d.recommended;
      if (isTdf) t.push({ label: "TDF PICK", color: "red" });
      // Insight-driven tags
      if (insights) {
        const di = lookupDining(insights, d.name);
        if (di?.reservationNeeded) t.push({ label: "RESERVATION", color: "orange" });
        if (di?.capacity === "large-group") t.push({ label: "GROUPS 16+", color: "green" });
        if (di?.capacity === "small" && insights.groupSize > 8) t.push({ label: "SEATS ≤8", color: "orange" });
      }
      if (d.id === cheapest.id) t.push({ label: "BUDGET PICK", color: "green" });
      if (d.id === bestRated.id && (bestRated.rating || 0) > 0) t.push({ label: "BEST RATED", color: "gold" });
      if (t.length > 0) tags[d.id] = capTags(t);
    }
    return tags;
  }, [allDining, insights, tdfPicks]);

  const barTagMap = useMemo(() => {
    const tags: Record<string, Tag[]> = {};
    for (const b of allBars) {
      const t: Tag[] = [];
      const isTdf = tdfPicks ? isTdfPick(tdfPicks, "bar", b.id) : b.recommended;
      if (isTdf) t.push({ label: "TDF PICK", color: "red" });
      if (insights) {
        const bi = lookupBar(insights, b.name);
        if (bi?.lateNight) t.push({ label: "LATE NIGHT", color: "purple" });
        if (bi?.walkableFromDowntown) t.push({ label: "WALKABLE", color: "green" });
      }
      if (t.length > 0) tags[b.id] = capTags(t);
    }
    return tags;
  }, [allBars, insights, tdfPicks]);

  // Build per-day Round 2 tag maps that add "CLOSE TO ROUND 1" hints
  const getRound2TagMap = useCallback((round1Id: string) => {
    const tags: Record<string, Tag[]> = {};
    for (const [id, base] of Object.entries(courseTagMap)) {
      tags[id] = [...base];
    }
    if (round1Id) {
      if (!tags[round1Id]) tags[round1Id] = [];
      if (!tags[round1Id].some((t) => t.label === "CLOSE TO ROUND 1")) {
        tags[round1Id] = capTags([...(tags[round1Id] || []), { label: "CLOSE TO ROUND 1", color: "orange" }]);
      }
    }
    return tags;
  }, [courseTagMap]);

  // Data-driven travel hint between courses
  const getTravelHint = useCallback((day: DaySelections): string | null => {
    if (day.round2Mode !== "golf" || !day.round1 || !day.round2 || day.round1 === day.round2) return null;
    if (insights) {
      const est = estimateDriveBetween(insights, day.round1, day.round2);
      if (est != null) {
        return est > 30
          ? `~${est}min between courses — consider party bus`
          : `~${est}min drive between courses`;
      }
    }
    return "Different courses — check drive time between them";
  }, [insights]);

  // Inline day hints from insights
  const getDayHintsMemo = useCallback((day: DaySelections, dayIndex: number): DayHint[] => {
    if (!insights) return [];
    return getDayHints(insights, day.round1Mode === "golf" ? day.round1 : null, day.round2Mode === "golf" ? day.round2 : null, day.dinner, day.bar, dayIndex === 0);
  }, [insights]);

  // ── TDF Build: auto-select best options ──

  const handleTdfBuild = useCallback(() => {
    if (!tdfPicks) return;
    setLodging(tdfPicks.lodging || lodging);
    setTransport(tdfPicks.transport || transport);
    setDays((prev) => prev.map((d, i) => {
      const pick = tdfPicks.days[i];
      if (!pick) return d;
      return {
        ...d,
        round1: touchedSlots.has(`day${i}-round1`) ? d.round1 : (pick.round1 || d.round1),
        round2: touchedSlots.has(`day${i}-round2`) ? d.round2 : (pick.round2 || d.round2),
        dinner: touchedSlots.has(`day${i}-dinner`) ? d.dinner : (pick.dinner || d.dinner),
        bar: touchedSlots.has(`day${i}-bar`) ? d.bar : (pick.bar || d.bar),
      };
    }));
  }, [tdfPicks, touchedSlots, lodging, transport]);

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

      {/* TDF Build button */}
      {tdfPicks && (
        <div style={{ maxWidth: 700, margin: "0 auto 2rem", textAlign: "center" }}>
          <button
            onClick={handleTdfBuild}
            className="flame-glow"
            style={{
              background: "linear-gradient(135deg, rgba(220,38,38,0.9), rgba(234,88,12,0.9))",
              border: "none",
              borderRadius: 8,
              padding: "0.85rem 2rem",
              fontSize: "0.85rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            🔥 TDF Build — Let the Devils Pick
          </button>
          <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", marginTop: "0.4rem" }}>
            Auto-selects the best options based on ratings, reviews & group fit. Your picks are kept.
          </p>
        </div>
      )}

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
                          <OptionCard key={o.id} option={o} selected={day.round1 === o.id} onSelect={() => updateDay(di, "round1", o.id)} tags={courseTagMap[o.id]} useFallbackImage />
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
                              <OptionCard key={o.id} option={o} selected={day.round2 === o.id} onSelect={() => updateDay(di, "round2", o.id)} tags={r2Tags[o.id]} useFallbackImage />
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

                  {/* Inline insight hints for this day */}
                  {insights && (() => {
                    const hints = getDayHintsMemo(day, di);
                    if (hints.length === 0) return null;
                    return (
                      <div style={{ marginTop: "0.5rem", marginBottom: "1rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                        {hints.map((h, hi) => (
                          <p key={hi} style={{
                            fontSize: "0.7rem",
                            fontStyle: "italic",
                            color: h.type === "warning" ? "rgba(251,146,60,0.8)" : h.type === "positive" ? "rgba(110,231,183,0.7)" : h.type === "tip" ? "rgba(147,51,234,0.6)" : "rgba(255,255,255,0.4)",
                          }}>
                            {h.type === "warning" ? "⚠️ " : h.type === "positive" ? "✓ " : h.type === "tip" ? "💡 " : "📍 "}{h.text}
                          </p>
                        ))}
                      </div>
                    );
                  })()}
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
