"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import type {
  GeneratedPlan,
  ThreePlanResult,
  TripTier,
  PlanCourse,
  PlanDining,
  PlanBar,
} from "@/lib/plan-types";
import MulliganButton from "./MulliganButton";
import HomeButton from "./HomeButton";

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
  tierLabel?: string;
}

/** Tracks what the user picked for each day-slot */
interface DaySelections {
  round1: string | null;
  round2: string | null;
  round2IsActivity: boolean;
  activity: string | null;
  dinner: string | null;
  bar: string | null;
}

interface TripSelections {
  lodging: string | null;
  days: DaySelections[];
}

// ── Activities ──

const ACTIVITIES = [
  { id: "atv", name: "ATV / Off-Road", icon: "🏍️" },
  { id: "fishing", name: "Fishing", icon: "🎣" },
  { id: "spa", name: "Spa Day", icon: "🧖" },
  { id: "brewery", name: "Brewery Tour", icon: "🍺" },
  { id: "shooting", name: "Shooting Range", icon: "🎯" },
  { id: "casino", name: "Casino", icon: "🎰" },
  { id: "hiking", name: "Hiking", icon: "🥾" },
  { id: "topgolf", name: "Top Golf", icon: "⛳" },
];

// ── Helpers ──

const tierLabel: Record<string, string> = {
  imp: "Imp",
  devil: "Devil",
  demonKing: "Demon King",
};

function dedupByName<T extends { name: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.name)) return false;
    seen.add(item.name);
    return true;
  });
}

// ── Option Card (adapted) ──

function OptionCard({
  option,
  selected,
  onSelect,
  expanded,
  onExpand,
  compact,
}: {
  option: BuilderOption;
  selected: boolean;
  onSelect: () => void;
  expanded: boolean;
  onExpand: () => void;
  compact?: boolean;
}) {
  return (
    <motion.div
      layout
      style={{
        position: "relative",
        background: selected
          ? "rgba(234,88,12,0.1)"
          : "rgba(255,255,255,0.03)",
        border: selected
          ? "2px solid rgba(234,88,12,0.6)"
          : option.tdfRecommended
          ? "1px solid rgba(234,88,12,0.3)"
          : "1px solid rgba(255,255,255,0.08)",
        borderRadius: 10,
        padding: compact ? "0.75rem 1rem" : "1rem 1.25rem",
        cursor: "pointer",
        transition: "all 0.2s",
        overflow: "hidden",
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      {/* TDF Recommended badge */}
      {option.tdfRecommended && (
        <div
          style={{
            position: "absolute",
            top: compact ? "0.5rem" : "0.75rem",
            right: compact ? "0.5rem" : "0.75rem",
            background: "rgba(234,88,12,0.9)",
            borderRadius: 4,
            padding: "2px 6px",
            fontSize: "0.5rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            gap: 3,
          }}
        >
          RECOMMENDED
        </div>
      )}

      {/* Tier label for cross-tier options */}
      {option.tierLabel && !option.tdfRecommended && (
        <div
          style={{
            position: "absolute",
            top: compact ? "0.5rem" : "0.75rem",
            right: compact ? "0.5rem" : "0.75rem",
            background: "rgba(255,255,255,0.08)",
            borderRadius: 4,
            padding: "2px 6px",
            fontSize: "0.5rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            color: "rgba(255,255,255,0.4)",
          }}
        >
          {option.tierLabel.toUpperCase()}
        </div>
      )}

      {/* Name + Price row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          paddingRight:
            option.tdfRecommended || option.tierLabel ? "5rem" : 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {selected && (
            <span
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: "#EA580C",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.65rem",
                flexShrink: 0,
              }}
            >
              ✓
            </span>
          )}
          <h4
            style={{
              fontSize: compact ? "0.9rem" : "1rem",
              fontWeight: 600,
              color: "#fff",
              margin: 0,
            }}
          >
            {option.name}
          </h4>
        </div>
        {option.price && (
          <span
            style={{
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "rgba(255,255,255,0.5)",
              whiteSpace: "nowrap",
            }}
          >
            {option.price}
          </span>
        )}
      </div>

      {/* Quick detail line */}
      {!expanded && Object.keys(option.details).length > 0 && (
        <p
          style={{
            fontSize: "0.75rem",
            color: "rgba(255,255,255,0.35)",
            marginTop: "0.35rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {Object.values(option.details).slice(0, 2).join(" · ")}
        </p>
      )}

      {/* Expand toggle */}
      {Object.keys(option.details).length > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onExpand();
          }}
          style={{
            background: "none",
            border: "none",
            color: "rgba(234,88,12,0.7)",
            fontSize: "0.7rem",
            cursor: "pointer",
            padding: "0.25rem 0 0",
            fontWeight: 600,
          }}
        >
          {expanded ? "Less" : "Details"}
        </button>
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.3rem",
                marginTop: "0.5rem",
                paddingTop: "0.5rem",
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {Object.entries(option.details).map(([key, val]) => (
                <div
                  key={key}
                  style={{
                    display: "flex",
                    gap: "0.75rem",
                    fontSize: "0.78rem",
                  }}
                >
                  <span
                    style={{
                      color: "rgba(255,255,255,0.35)",
                      minWidth: 70,
                    }}
                  >
                    {key}
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.6)" }}>{val}</span>
                </div>
              ))}
            </div>

            {option.tdfRecommended && option.tdfReason && (
              <div
                style={{
                  marginTop: "0.5rem",
                  padding: "0.6rem",
                  background: "rgba(234,88,12,0.08)",
                  borderRadius: 6,
                  borderLeft: "3px solid rgba(234,88,12,0.5)",
                }}
              >
                <p
                  style={{
                    fontSize: "0.72rem",
                    color: "rgba(255,255,255,0.5)",
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {option.tdfReason}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Activity Card ──

function ActivityCard({
  activity,
  selected,
  onSelect,
}: {
  activity: { id: string; name: string; icon: string };
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onSelect}
      style={{
        background: selected
          ? "rgba(234,88,12,0.15)"
          : "rgba(255,255,255,0.03)",
        border: selected
          ? "2px solid rgba(234,88,12,0.6)"
          : "1px solid rgba(255,255,255,0.08)",
        borderRadius: 10,
        padding: "0.75rem 1rem",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        color: "#fff",
        fontSize: "0.85rem",
        fontWeight: 500,
        transition: "all 0.2s",
        minWidth: 0,
      }}
    >
      <span style={{ fontSize: "1.1rem" }}>{activity.icon}</span>
      <span>{activity.name}</span>
      {selected && (
        <span
          style={{
            marginLeft: "auto",
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: "#EA580C",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.6rem",
            flexShrink: 0,
          }}
        >
          ✓
        </span>
      )}
    </motion.button>
  );
}

// ── Slot Section ──

function SlotSection({
  label,
  sublabel,
  children,
}: {
  label: string;
  sublabel?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "0.5rem",
          marginBottom: "0.6rem",
        }}
      >
        <h4
          style={{
            fontFamily: "var(--font-plan-block), sans-serif",
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            color: "rgba(234,88,12,0.8)",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          {label}
        </h4>
        {sublabel && (
          <span
            style={{
              fontSize: "0.7rem",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            {sublabel}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

// ── Main Trip Builder ──

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
  const numberOfDays = plan.schedule?.length || plan.numberOfDays || 3;

  // ── Merge all options across tiers (deduped) ──

  const currentTierKey = tier === "demon-king" ? "demonKing" : tier;

  const allCourses = useMemo(() => {
    const courses: (PlanCourse & { tierKey: string })[] = [];
    if (allPlans) {
      for (const [k, p] of Object.entries(allPlans)) {
        if (p?.courses) {
          for (const c of p.courses) {
            courses.push({ ...c, tierKey: k });
          }
        }
      }
    } else {
      for (const c of plan.courses) {
        courses.push({ ...c, tierKey: currentTierKey });
      }
    }
    return dedupByName(courses);
  }, [allPlans, plan.courses, currentTierKey]);

  const allDining = useMemo(() => {
    const items: (PlanDining & { tierKey: string })[] = [];
    if (allPlans) {
      for (const [k, p] of Object.entries(allPlans)) {
        if (p?.dining) {
          for (const d of p.dining) {
            items.push({ ...d, tierKey: k });
          }
        }
      }
    } else {
      for (const d of plan.dining) {
        items.push({ ...d, tierKey: currentTierKey });
      }
    }
    return dedupByName(items);
  }, [allPlans, plan.dining, currentTierKey]);

  const allBars = useMemo(() => {
    const items: (PlanBar & { tierKey: string })[] = [];
    if (allPlans) {
      for (const [k, p] of Object.entries(allPlans)) {
        if (p?.bars) {
          for (const b of p.bars) {
            items.push({ ...b, tierKey: k });
          }
        }
      }
    } else {
      for (const b of plan.bars || []) {
        items.push({ ...b, tierKey: currentTierKey });
      }
    }
    return dedupByName(items);
  }, [allPlans, plan.bars, currentTierKey]);

  // Build BuilderOption arrays
  const courseOptionsList: BuilderOption[] = useMemo(
    () =>
      allCourses.map((c) => ({
        id: c.name,
        name: c.name,
        category: "courses",
        tdfRecommended: c.tierKey === currentTierKey,
        tdfReason: c.tierKey === currentTierKey ? c.whyThisCourse : undefined,
        price: c.greenFee ? c.greenFee + "/person" : undefined,
        tierLabel:
          c.tierKey !== currentTierKey ? tierLabel[c.tierKey] : undefined,
        details: {
          ...(c.whyThisCourse ? { Why: c.whyThisCourse } : {}),
          ...(c.tierKey !== currentTierKey
            ? { Tier: tierLabel[c.tierKey] || c.tierKey }
            : {}),
        },
      })),
    [allCourses, currentTierKey]
  );

  const diningOptionsList: BuilderOption[] = useMemo(
    () =>
      allDining.map((d) => ({
        id: d.name,
        name: d.name,
        category: "dining",
        tdfRecommended: d.tierKey === currentTierKey,
        tdfReason:
          d.tierKey === currentTierKey ? d.description : undefined,
        price: d.priceRange || undefined,
        tierLabel:
          d.tierKey !== currentTierKey ? tierLabel[d.tierKey] : undefined,
        details: {
          Style: d.type,
          ...(d.description ? { About: d.description } : {}),
          ...(d.tierKey !== currentTierKey
            ? { Tier: tierLabel[d.tierKey] || d.tierKey }
            : {}),
        },
      })),
    [allDining, currentTierKey]
  );

  const barOptionsList: BuilderOption[] = useMemo(
    () =>
      allBars.map((b) => ({
        id: b.name,
        name: b.name,
        category: "bars",
        tdfRecommended: b.tierKey === currentTierKey,
        tdfReason:
          b.tierKey === currentTierKey ? b.description : undefined,
        tierLabel:
          b.tierKey !== currentTierKey ? tierLabel[b.tierKey] : undefined,
        details: {
          Vibe: b.vibe,
          ...(b.description ? { About: b.description } : {}),
          ...(b.tierKey !== currentTierKey
            ? { Tier: tierLabel[b.tierKey] || b.tierKey }
            : {}),
        },
      })),
    [allBars, currentTierKey]
  );

  // Lodging options (whole trip, not per day)
  const lodgingOptions: BuilderOption[] = useMemo(() => {
    const opts: BuilderOption[] = [
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

    const seen = new Set(opts.map((o) => o.id));
    if (allPlans) {
      for (const [k, p] of Object.entries(allPlans)) {
        if (p?.lodging && !seen.has(p.lodging.name) && k !== currentTierKey) {
          seen.add(p.lodging.name);
          opts.push({
            id: p.lodging.name,
            name: p.lodging.name,
            category: "lodging",
            price: p.lodging.costPerNight + "/night",
            tierLabel: tierLabel[k],
            details: {
              Type: p.lodging.type,
              Area: p.lodging.address,
              Tier: tierLabel[k] || k,
            },
          });
        }
      }
    }
    return opts;
  }, [plan, allPlans, currentTierKey]);

  // ── State ──

  const buildInitialDays = useCallback((): DaySelections[] => {
    return Array.from({ length: numberOfDays }, (_, i) => {
      const dayNum = i + 1;
      // Try to pre-select from the plan's course assignments
      const amCourse = plan.courses.find(
        (c) => c.day === dayNum && c.session === "AM"
      );
      const pmCourse = plan.courses.find(
        (c) => c.day === dayNum && c.session === "PM"
      );
      const dinner =
        plan.dining[i] || plan.dining[Math.min(i, plan.dining.length - 1)];
      const bar =
        plan.bars?.[i] ||
        plan.bars?.[Math.min(i, (plan.bars?.length || 1) - 1)];

      return {
        round1: amCourse?.name || null,
        round2: pmCourse?.name || null,
        round2IsActivity: false,
        activity: null,
        dinner: dinner?.name || null,
        bar: bar?.name || null,
      };
    });
  }, [numberOfDays, plan]);

  const [tripSelections, setTripSelections] = useState<TripSelections>(() => ({
    lodging: plan.lodging.name,
    days: buildInitialDays(),
  }));

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // ── Selection handlers ──

  const selectLodging = useCallback((name: string) => {
    setTripSelections((prev) => ({
      ...prev,
      lodging: prev.lodging === name ? null : name,
    }));
  }, []);

  const updateDay = useCallback(
    (
      dayIndex: number,
      field: keyof DaySelections,
      value: string | boolean | null
    ) => {
      setTripSelections((prev) => {
        const newDays = [...prev.days];
        newDays[dayIndex] = { ...newDays[dayIndex], [field]: value };
        return { ...prev, days: newDays };
      });
    },
    []
  );

  const toggleRound2Activity = useCallback((dayIndex: number) => {
    setTripSelections((prev) => {
      const newDays = [...prev.days];
      const day = { ...newDays[dayIndex] };
      day.round2IsActivity = !day.round2IsActivity;
      if (day.round2IsActivity) {
        day.round2 = null;
      } else {
        day.activity = null;
      }
      newDays[dayIndex] = day;
      return { ...prev, days: newDays };
    });
  }, []);

  // ── Convert to legacy selectedOptions format for save ──

  const selectedOptionsLegacy = useMemo(() => {
    const result: Record<string, string[]> = {
      lodging: tripSelections.lodging ? [tripSelections.lodging] : [],
      courses: [],
      dining: [],
      bars: [],
      activities: [],
    };
    for (const day of tripSelections.days) {
      if (day.round1) result.courses.push(day.round1);
      if (!day.round2IsActivity && day.round2) result.courses.push(day.round2);
      if (day.round2IsActivity && day.activity)
        result.activities.push(day.activity);
      if (day.dinner) result.dining.push(day.dinner);
      if (day.bar) result.bars.push(day.bar);
    }
    return result;
  }, [tripSelections]);

  const totalSelections = Object.values(selectedOptionsLegacy).flat().length;

  // ── Save ──

  const saveSelections = async () => {
    setSaving(true);
    try {
      await fetch("/api/save-selections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId,
          dest,
          tier,
          selectedOptions: selectedOptionsLegacy,
        }),
      });
    } catch {
      // silent fail
    } finally {
      setSaving(false);
    }
  };

  // ── Render ──

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        padding: "clamp(2rem, 6vw, 4rem) clamp(1rem, 4vw, 3rem)",
      }}
    >
      <MulliganButton href={`/plan/result/${planId}?dest=${dest}`} />
      <HomeButton />

      {/* Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "3rem",
          maxWidth: 700,
          margin: "0 auto 3rem",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontFamily: "var(--font-plan-groovy), cursive",
            fontSize: "clamp(2rem, 6vw, 3.5rem)",
            marginBottom: "0.5rem",
          }}
        >
          Build Your Trip
        </motion.h1>
        <p
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "0.95rem",
            fontFamily: "var(--font-inter), sans-serif",
          }}
        >
          {plan.destination} · {plan.tierName} · {numberOfDays} Days
        </p>
        <p
          style={{
            color: "rgba(255,255,255,0.3)",
            fontSize: "0.8rem",
            marginTop: "0.5rem",
            fontFamily: "var(--font-inter), sans-serif",
          }}
        >
          Pick your lodging, then customize each day with courses, dining, and
          nightlife.
        </p>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        {/* ════════════════════ LODGING (whole trip) ════════════════════ */}
        <section style={{ marginBottom: "3rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: "rgba(234,88,12,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.1rem",
              }}
            >
              🏠
            </div>
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-plan-block), sans-serif",
                  fontSize: "1.3rem",
                  fontWeight: 800,
                  letterSpacing: "0.05em",
                  color: "#fff",
                  margin: 0,
                  textTransform: "uppercase",
                }}
              >
                Lodging
              </h2>
              <p
                style={{
                  fontSize: "0.7rem",
                  color: "rgba(255,255,255,0.3)",
                  margin: 0,
                }}
              >
                Select one for your whole trip
              </p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
            }}
          >
            {lodgingOptions.map((option) => (
              <OptionCard
                key={option.id}
                option={option}
                selected={tripSelections.lodging === option.id}
                onSelect={() => selectLodging(option.id)}
                expanded={expandedId === `lodging-${option.id}`}
                onExpand={() =>
                  setExpandedId(
                    expandedId === `lodging-${option.id}`
                      ? null
                      : `lodging-${option.id}`
                  )
                }
              />
            ))}
          </div>
        </section>

        {/* ════════════════════ DAY-BY-DAY ════════════════════ */}
        {tripSelections.days.map((dayState, dayIndex) => {
          const dayNum = dayIndex + 1;
          const dayLabel =
            plan.schedule?.[dayIndex]?.label || `Day ${dayNum}`;

          return (
            <motion.section
              key={dayIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: dayIndex * 0.1 }}
              style={{
                marginBottom: "2.5rem",
                paddingBottom: "2.5rem",
                borderBottom:
                  dayIndex < numberOfDays - 1
                    ? "1px solid rgba(255,255,255,0.06)"
                    : "none",
              }}
            >
              {/* Day Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "0.75rem",
                  marginBottom: "1.5rem",
                }}
              >
                <h2
                  style={{
                    fontFamily: "var(--font-plan-block), sans-serif",
                    fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
                    fontWeight: 900,
                    letterSpacing: "0.08em",
                    color: "#EA580C",
                    margin: 0,
                    lineHeight: 1,
                  }}
                >
                  DAY {dayNum}
                </h2>
                <span
                  style={{
                    fontSize: "0.85rem",
                    color: "rgba(255,255,255,0.35)",
                    fontFamily: "var(--font-inter), sans-serif",
                  }}
                >
                  {dayLabel}
                </span>
              </div>

              {/* ── Round 1 (Morning) ── */}
              <SlotSection label="Round 1" sublabel="Morning">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  {courseOptionsList.map((option) => (
                    <OptionCard
                      key={option.id}
                      option={option}
                      selected={dayState.round1 === option.id}
                      onSelect={() =>
                        updateDay(
                          dayIndex,
                          "round1",
                          dayState.round1 === option.id ? null : option.id
                        )
                      }
                      expanded={
                        expandedId ===
                        `day${dayNum}-round1-${option.id}`
                      }
                      onExpand={() =>
                        setExpandedId(
                          expandedId ===
                            `day${dayNum}-round1-${option.id}`
                            ? null
                            : `day${dayNum}-round1-${option.id}`
                        )
                      }
                      compact
                    />
                  ))}
                </div>
              </SlotSection>

              {/* ── Round 2 (Afternoon) or Activity ── */}
              <SlotSection
                label={dayState.round2IsActivity ? "Activity" : "Round 2"}
                sublabel="Afternoon"
              >
                {/* Toggle button */}
                <div style={{ marginBottom: "0.6rem" }}>
                  <button
                    onClick={() => toggleRound2Activity(dayIndex)}
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 6,
                      padding: "6px 14px",
                      color: "rgba(234,88,12,0.8)",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      letterSpacing: "0.04em",
                      transition: "all 0.2s",
                    }}
                  >
                    {dayState.round2IsActivity
                      ? "Back to Golf"
                      : "Swap for Activity"}
                  </button>
                </div>

                {dayState.round2IsActivity ? (
                  /* Activity grid */
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(160px, 1fr))",
                      gap: "0.5rem",
                    }}
                  >
                    {ACTIVITIES.map((act) => (
                      <ActivityCard
                        key={act.id}
                        activity={act}
                        selected={dayState.activity === act.id}
                        onSelect={() =>
                          updateDay(
                            dayIndex,
                            "activity",
                            dayState.activity === act.id ? null : act.id
                          )
                        }
                      />
                    ))}
                  </div>
                ) : (
                  /* Course selector */
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    }}
                  >
                    {courseOptionsList.map((option) => {
                      // If different from round1, show travel hint
                      const showTravelHint =
                        dayState.round1 &&
                        dayState.round2 === option.id &&
                        dayState.round1 !== option.id;

                      return (
                        <div key={option.id}>
                          <OptionCard
                            option={option}
                            selected={dayState.round2 === option.id}
                            onSelect={() =>
                              updateDay(
                                dayIndex,
                                "round2",
                                dayState.round2 === option.id
                                  ? null
                                  : option.id
                              )
                            }
                            expanded={
                              expandedId ===
                              `day${dayNum}-round2-${option.id}`
                            }
                            onExpand={() =>
                              setExpandedId(
                                expandedId ===
                                  `day${dayNum}-round2-${option.id}`
                                  ? null
                                  : `day${dayNum}-round2-${option.id}`
                              )
                            }
                            compact
                          />
                          {showTravelHint && (
                            <p
                              style={{
                                fontSize: "0.7rem",
                                color: "rgba(234,88,12,0.6)",
                                marginTop: "0.25rem",
                                paddingLeft: "0.5rem",
                                fontStyle: "italic",
                              }}
                            >
                              Different course — allow ~20-30 min travel between
                              rounds
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </SlotSection>

              {/* ── Dinner ── */}
              <SlotSection label="Dinner" sublabel="Evening">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  {diningOptionsList.map((option) => (
                    <OptionCard
                      key={option.id}
                      option={option}
                      selected={dayState.dinner === option.id}
                      onSelect={() =>
                        updateDay(
                          dayIndex,
                          "dinner",
                          dayState.dinner === option.id ? null : option.id
                        )
                      }
                      expanded={
                        expandedId ===
                        `day${dayNum}-dinner-${option.id}`
                      }
                      onExpand={() =>
                        setExpandedId(
                          expandedId ===
                            `day${dayNum}-dinner-${option.id}`
                            ? null
                            : `day${dayNum}-dinner-${option.id}`
                        )
                      }
                      compact
                    />
                  ))}
                </div>
              </SlotSection>

              {/* ── Bar / Nightlife ── */}
              <SlotSection label="Bar / Nightlife" sublabel="Late Night">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  {barOptionsList.map((option) => (
                    <OptionCard
                      key={option.id}
                      option={option}
                      selected={dayState.bar === option.id}
                      onSelect={() =>
                        updateDay(
                          dayIndex,
                          "bar",
                          dayState.bar === option.id ? null : option.id
                        )
                      }
                      expanded={
                        expandedId ===
                        `day${dayNum}-bar-${option.id}`
                      }
                      onExpand={() =>
                        setExpandedId(
                          expandedId ===
                            `day${dayNum}-bar-${option.id}`
                            ? null
                            : `day${dayNum}-bar-${option.id}`
                        )
                      }
                      compact
                    />
                  ))}
                </div>
              </SlotSection>
            </motion.section>
          );
        })}

        {/* ════════════════════ BOTTOM CTA ════════════════════ */}
        <div
          style={{
            position: "sticky",
            bottom: "1rem",
            background: "rgba(0,0,0,0.92)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 12,
            padding: "1rem 1.5rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.75rem",
            zIndex: 50,
          }}
        >
          <div
            style={{
              fontSize: "0.8rem",
              color: "rgba(255,255,255,0.4)",
              fontFamily: "var(--font-inter), sans-serif",
            }}
          >
            {totalSelections} item{totalSelections !== 1 ? "s" : ""} selected
            across {numberOfDays} days
          </div>
          <button
            onClick={async () => {
              await saveSelections();
              window.location.href = `/plan/result/${planId}?dest=${dest}&tier=${tier}`;
            }}
            disabled={saving}
            style={{
              padding: "12px 32px",
              background: "rgba(234,88,12,0.9)",
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
              transition: "all 0.2s",
              minHeight: 44,
            }}
          >
            {saving ? "Saving..." : "View Itinerary & Pricing"}
          </button>
        </div>
      </div>
    </main>
  );
}
