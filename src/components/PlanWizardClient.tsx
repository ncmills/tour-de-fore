"use client";

import { useReducer, useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { WizardState, initialWizardState } from "@/lib/plan-types";
import SelectionCard from "./SelectionCard";
import Logo from "./Logo";
import Link from "next/link";
import MulliganButton from "./MulliganButton";
import HomeButton from "./HomeButton";
import RegionMapThumb from "./RegionMap";
import { addAnonPlanId, claimAnonPlans } from "@/lib/anon-plans";
import { logSelection, logAcquisition } from "@/lib/signals-client";

// Leadgen A3 — wizard fields whose changes are meaningful "selections" worth
// logging. Free-text + PII fields (destination text, organizer, attendees,
// special requests) are intentionally excluded — they're not categorical
// picks and may carry identity. Array fields diff to add/remove below.
const LOGGED_SELECTION_FIELDS = new Set<keyof WizardState>([
  "destinationType", "region", "states", "flexible", "preferredSeason",
  "tripMonth", "numberOfDays", "groupSize", "skillMix", "ageRange",
  "roundsPerDay", "courseQuality", "walkingOrRiding", "lodging", "dining",
  "nightlife", "budget",
]);

type Action =
  | { type: "SET_FIELD"; field: keyof WizardState; value: unknown }
  | { type: "RESTORE_STATE"; state: WizardState }
  | { type: "TOGGLE_ACTIVITY"; activity: string }
  | { type: "TOGGLE_PRIORITY"; priority: string }
  | { type: "SET_ATTENDEE"; index: number; field: "name" | "email"; value: string }
  | { type: "ADD_ATTENDEE" }
  | { type: "REMOVE_ATTENDEE"; index: number };

function reducer(state: WizardState, action: Action): WizardState {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESTORE_STATE":
      return { ...initialWizardState, ...action.state };
    case "TOGGLE_ACTIVITY": {
      const activities = state.activities.includes(action.activity)
        ? state.activities.filter((a) => a !== action.activity)
        : [...state.activities, action.activity];
      return { ...state, activities };
    }
    case "TOGGLE_PRIORITY": {
      const budgetPriorities = state.budgetPriorities.includes(action.priority)
        ? state.budgetPriorities.filter((p) => p !== action.priority)
        : state.budgetPriorities.length < 2
          ? [...state.budgetPriorities, action.priority]
          : state.budgetPriorities;
      return { ...state, budgetPriorities };
    }
    case "SET_ATTENDEE": {
      const attendees = [...state.attendees];
      attendees[action.index] = {
        ...attendees[action.index],
        [action.field]: action.value,
      };
      return { ...state, attendees };
    }
    case "ADD_ATTENDEE":
      return { ...state, attendees: [...state.attendees, { name: "", email: "" }] };
    case "REMOVE_ATTENDEE": {
      const attendees = state.attendees.filter((_, i) => i !== action.index);
      return { ...state, attendees };
    }
    default:
      return state;
  }
}

const REGION_NAMES = [
  "Southwest",
  "Pacific NW",
  "Mountain West",
  "Midwest",
  "Southeast",
  "Northeast",
  "South Central",
];

// Derived 2026-04-22 from allDestinations (scripts/audit-data-integrity.ts).
// Lets users narrow a region pick to a state subset without loading all 133
// destinations client-side. Regenerate if destinations data changes regions.
const REGION_STATES: Record<string, string[]> = {
  "Southwest": ["AZ", "NM", "NV", "UT"],
  "Pacific NW": ["ID", "OR", "WA"],
  "Mountain West": ["CO", "ID", "MT", "SD", "UT", "WY"],
  "Midwest": ["IA", "IL", "IN", "MI", "MN", "MO", "NE", "OH", "WI"],
  "Southeast": ["AL", "FL", "GA", "KY", "MS", "NC", "SC", "TN", "VA"],
  "Northeast": ["CT", "MA", "MD", "ME", "NH", "NJ", "NY", "PA", "RI", "VA", "VT"],
  "South Central": ["AR", "KY", "LA", "MO", "OK", "TX"],
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const SEASONS = ["Spring", "Summer", "Fall"];

const ACTIVITIES = [
  "Fishing", "ATV", "Casino", "Spa", "Brewery", "Shooting", "Water Sports", "None",
];

// ── Option pools for the inline-rendered wizard fields ──
// Mirrors the literal option arrays used in each step's JSX so the one-click
// "Plan it all for me" auto-pick can only ever produce values that clear
// validateWizardState + every per-step canAdvance gate. Keep in sync with the
// rendered <SelectionCard> labels below.
const SKILL_MIX_OPTIONS = ["All similar", "Wide range", "Mostly beginners", "Here for the vibes"];
const AGE_RANGE_OPTIONS = ["20s", "30s", "40s", "Mixed"];
const ROUNDS_PER_DAY_OPTIONS = ["One (18)", "Two (36)", "Let AI decide"];
const COURSE_QUALITY_OPTIONS = ["Cheap & fun", "Mix of public & resort", "Bucket list only", "Whatever fits budget"];
const WALKING_OPTIONS = ["Walking", "Riding", "Mix / Don't care"];
const HANDICAP_OPTIONS = ["Scratch–10", "10–20", "20+", "Mixed bag"];
const LODGING_OPTIONS = ["One big house", "Hotel / Resort", "Split houses", "Don't care"];
const DINING_OPTIONS = ["Steakhouses", "Casual & local", "Private chef", "Mix"];
const NIGHTLIFE_OPTIONS = ["Going out every night", "Couple nights", "In bed by 10", "Point us to a bar"];
const BUDGET_OPTIONS = ["$2K per person", "$4K per person", "$6K per person", "Fat pockets"];
const BUDGET_PRIORITY_OPTIONS = ["Best courses", "Best lodging", "Best dining", "Keep balanced"];
const NUMBER_OF_DAYS_OPTIONS = [3, 4, 5];
// US-state catalog by region (mirrors REGION_STATES, used only for region picks).

function pickOne<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

// Pick `min`..`max` unique items (count varies run-to-run) from a pool.
function pickSome<T>(arr: readonly T[], min: number, max: number): T[] {
  const pool = [...arr];
  const hi = Math.min(max, pool.length);
  const lo = Math.min(min, hi);
  const count = lo + Math.floor(Math.random() * (hi - lo + 1));
  const out: T[] = [];
  for (let i = 0; i < count && pool.length > 0; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    out.push(pool.splice(idx, 1)[0]!);
  }
  return out;
}

// Build a complete, VARIED, always-valid wizard payload in one shot. Every
// value is drawn from the option pools above (the same ones the per-step
// pickers render), so the result clears validateWizardState AND every
// canAdvance gate. Activities exclude "None" so the trio reads coherent.
// handicap stays optional (sometimes empty). Picks vary run-to-run.
function buildGlobalAutoPick(): Partial<WizardState> {
  const flexible = Math.random() < 0.5;
  // Lead with a specific destination so step 0 always validates without a
  // region/state round-trip; vary across a small pool of golf-trip towns.
  const SPECIFIC_DESTINATIONS = [
    "Scottsdale, AZ", "Pinehurst, NC", "Bandon, OR", "Myrtle Beach, SC",
    "Palm Springs, CA", "Austin, TX", "Sea Island, GA", "Scottsdale, AZ",
    "Kohler, WI", "Streamsong, FL", "Pebble Beach, CA", "Las Vegas, NV",
  ];
  const realActivities = ACTIVITIES.filter((a) => a !== "None");

  return {
    destinationType: "specific",
    destination: pickOne(SPECIFIC_DESTINATIONS),
    region: "",
    states: [],
    flexible,
    preferredSeason: flexible ? pickOne(SEASONS) : "",
    tripMonth: flexible ? "" : pickOne(MONTHS),
    numberOfDays: pickOne(NUMBER_OF_DAYS_OPTIONS),
    groupSize: 8 + Math.floor(Math.random() * 9), // 8–16
    skillMix: pickOne(SKILL_MIX_OPTIONS),
    ageRange: pickOne(AGE_RANGE_OPTIONS),
    roundsPerDay: pickOne(ROUNDS_PER_DAY_OPTIONS),
    courseQuality: pickOne(COURSE_QUALITY_OPTIONS),
    walkingOrRiding: pickOne(WALKING_OPTIONS),
    // Optional — leave empty ~40% of runs so it reads as genuinely optional.
    handicap: Math.random() < 0.6 ? pickOne(HANDICAP_OPTIONS) : "",
    mustPlayCourses: "",
    lodging: pickOne(LODGING_OPTIONS),
    dining: pickSome(DINING_OPTIONS, 1, 2),
    nightlife: pickOne(NIGHTLIFE_OPTIONS),
    activities: pickSome(realActivities, 1, 3),
    budget: pickOne(BUDGET_OPTIONS),
    budgetPriorities: pickSome(BUDGET_PRIORITY_OPTIONS, 1, 2),
    specialRequests: "",
  };
}

const LOADING_MESSAGES = [
  "Burning the corpses...",
  "Deleting the text thread...",
  "Sharpening the stakes...",
  "Shotgunning 19 double airplane bottles...",
  "Bribing the starter...",
  "Hiding the receipts...",
  "Forging handicap cards...",
  "Burying the evidence...",
  "Blaming it on the caddie...",
  "Pawning the backup putter...",
  "Laundering the bar tab...",
  "Negotiating with the devil...",
  "Losing your deposit...",
  "Telling your wife it's a work trip...",
];

const PINATA_ITEMS: { emoji: string; color: string }[][] = [
  [{ emoji: "⛳", color: "#fff" }, { emoji: "🏌️", color: "#22c55e" }, { emoji: "⛳", color: "#fff" }],
  [{ emoji: "🥃", color: "#d97706" }, { emoji: "🍸", color: "#ec4899" }, { emoji: "🥃", color: "#d97706" }],
  [{ emoji: "🍺", color: "#f59e0b" }, { emoji: "🍻", color: "#f59e0b" }, { emoji: "🍺", color: "#f59e0b" }],
  [{ emoji: "🔥", color: "#ef4444" }, { emoji: "😈", color: "#ef4444" }, { emoji: "🔥", color: "#ef4444" }],
  [{ emoji: "🫧", color: "#22c55e" }, { emoji: "🫧", color: "#4ade80" }, { emoji: "🫧", color: "#22c55e" }],
  [{ emoji: "💰", color: "#22c55e" }, { emoji: "💵", color: "#22c55e" }, { emoji: "💸", color: "#22c55e" }],
  [{ emoji: "💃", color: "#ec4899" }, { emoji: "👯", color: "#f472b6" }, { emoji: "💃", color: "#ec4899" }],
  [{ emoji: "🏌️", color: "#D4A843" }, { emoji: "⛳", color: "#22c55e" }, { emoji: "🏌️", color: "#D4A843" }],
];
const PINATA_COLORS = ["#f59e0b", "#ef4444", "#22c55e", "#a855f7", "#3b82f6", "#ec4899", "#f97316", "#14b8a6"];

function DevilPinataScene() {
  const [pinataIndex, setPinataIndex] = useState(0);
  const [phase, setPhase] = useState<"swing" | "stab" | "burst">("swing");
  const burstItems = PINATA_ITEMS[pinataIndex % PINATA_ITEMS.length];
  const pinataColor = PINATA_COLORS[pinataIndex % PINATA_COLORS.length];

  useEffect(() => {
    // Cycle: swing 1.2s → stab 0.4s → burst 1.4s → next
    const timers: ReturnType<typeof setTimeout>[] = [];
    const run = () => {
      setPhase("swing");
      timers.push(setTimeout(() => setPhase("stab"), 1200));
      timers.push(setTimeout(() => setPhase("burst"), 1600));
      timers.push(setTimeout(() => {
        setPinataIndex(i => (i + 1) % PINATA_ITEMS.length);
        run();
      }, 3000));
    };
    run();
    return () => timers.forEach(clearTimeout);
  }, []);

  // Generate burst particles with random trajectories — stable across re-renders
  const particles = useMemo(() => Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2 + Math.random() * 0.5;
    const dist = 60 + Math.random() * 80;
    return {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist - 40,
      rot: Math.random() * 360,
      item: burstItems[i % burstItems.length],
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), []);

  return (
    <div style={{ position: "relative", width: "min(300px, 80vw)", height: "220px", marginBottom: "2rem", overflow: "hidden" }}>
      {/* Ground */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "6px", background: "repeating-linear-gradient(90deg, #5a3a1a 0px, #5a3a1a 20px, #3a2a10 20px, #3a2a10 40px)" }} />

      {/* Piñata — only visible during swing and stab */}
      {phase !== "burst" && (
        <motion.div
          animate={phase === "swing" ? { rotate: [-8, 8, -8] } : { scale: [1, 1.3, 0], rotate: [0, -5, 15] }}
          transition={phase === "swing" ? { repeat: Infinity, duration: 1, ease: "easeInOut" } : { duration: 0.35, ease: "easeIn" }}
          style={{ position: "absolute", top: 0, left: "62%", transformOrigin: "top center" }}
        >
          <div style={{ width: "2px", height: "40px", background: "#D4A843", margin: "0 auto" }} />
          <svg width="56" height="56" viewBox="0 0 60 60" style={{ display: "block", margin: "-2px auto 0" }}>
            <polygon points="30,2 36,22 58,22 40,35 47,55 30,43 13,55 20,35 2,22 24,22" fill={pinataColor} stroke={pinataColor} strokeWidth="2" opacity="0.9" />
            <polygon points="30,8 34,22 50,22 38,32 42,46 30,38 18,46 22,32 10,22 26,22" fill="#fff" opacity="0.15" />
            {/* Streamers */}
            <line x1="20" y1="45" x2="14" y2="58" stroke={pinataColor} strokeWidth="2" opacity="0.6" />
            <line x1="30" y1="48" x2="30" y2="60" stroke="#fff" strokeWidth="2" opacity="0.3" />
            <line x1="40" y1="45" x2="46" y2="58" stroke={pinataColor} strokeWidth="2" opacity="0.6" />
          </svg>
        </motion.div>
      )}

      {/* Burst particles */}
      <AnimatePresence>
        {phase === "burst" && particles.map((p, i) => (
          <motion.div
            key={`${pinataIndex}-${i}`}
            initial={{ x: 186, y: 60, scale: 0, opacity: 1 }}
            animate={{ x: 186 + p.x, y: 60 + p.y, scale: 1, opacity: 0, rotate: p.rot }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ position: "absolute", fontSize: "clamp(1.7rem, 4.2vw, 2.5rem)", pointerEvents: "none" }}
          >
            {p.item.emoji}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Burst flash */}
      <AnimatePresence>
        {phase === "burst" && (
          <motion.div
            key={`flash-${pinataIndex}`}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ position: "absolute", top: "50px", left: "178px", width: "20px", height: "20px", borderRadius: "50%", background: pinataColor, filter: `blur(8px)` }}
          />
        )}
      </AnimatePresence>

      {/* Devil character */}
      <motion.div
        animate={
          phase === "stab"
            ? { x: [0, 15, 0] }
            : phase === "swing"
            ? { x: [0, 3, 0] }
            : { x: 0 }
        }
        transition={{ duration: phase === "stab" ? 0.3 : 0.8, ease: "easeInOut", repeat: phase === "swing" ? Infinity : 0 }}
        style={{ position: "absolute", bottom: "6px", left: "18%" }}
      >
        <svg width="50" height="70" viewBox="0 0 50 70">
          {/* Horns */}
          <polygon points="12,12 8,0 16,8" fill="#DC2626" />
          <polygon points="38,12 42,0 34,8" fill="#DC2626" />
          {/* Head */}
          <rect x="12" y="10" width="26" height="22" rx="4" fill="#DC2626" />
          {/* Eyes */}
          <rect x="17" y="17" width="5" height="5" rx="1" fill="#fff" />
          <rect x="28" y="17" width="5" height="5" rx="1" fill="#fff" />
          <rect x="19" y="19" width="2" height="2" fill="#000" />
          <rect x="30" y="19" width="2" height="2" fill="#000" />
          {/* Evil grin */}
          <path d="M17 27 Q25 33 33 27" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
          {/* Body */}
          <rect x="14" y="32" width="22" height="20" rx="3" fill="#DC2626" />
          {/* Belt */}
          <rect x="14" y="40" width="22" height="4" fill="#1a1a1a" />
          <rect x="23" y="39" width="4" height="6" rx="1" fill="#D4A843" />
          {/* Legs */}
          <rect x="16" y="52" width="8" height="14" rx="2" fill="#DC2626" />
          <rect x="26" y="52" width="8" height="14" rx="2" fill="#DC2626" />
          {/* Boots */}
          <rect x="14" y="62" width="12" height="6" rx="2" fill="#1a1a1a" />
          <rect x="24" y="62" width="12" height="6" rx="2" fill="#1a1a1a" />
          {/* Tail */}
          <path d="M14 45 Q4 42 6 35 Q8 30 10 33" fill="none" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
          <polygon points="6,35 3,31 9,33" fill="#DC2626" />
        </svg>

        {/* Pitchfork */}
        <motion.div
          animate={
            phase === "stab"
              ? { rotate: [-30, -70, -30], y: [0, -8, 0] }
              : { rotate: [-25, -35, -25], y: [0, -2, 0] }
          }
          transition={{ duration: phase === "stab" ? 0.3 : 0.8, ease: "easeInOut", repeat: phase === "swing" ? Infinity : 0 }}
          style={{ position: "absolute", top: "-10px", right: "-30px", transformOrigin: "bottom left" }}
        >
          <svg width="50" height="60" viewBox="0 0 50 60">
            <line x1="25" y1="20" x2="25" y2="58" stroke="#8B4513" strokeWidth="4" strokeLinecap="round" />
            <line x1="25" y1="20" x2="25" y2="4" stroke="#EA580C" strokeWidth="3" />
            <line x1="25" y1="20" x2="15" y2="8" stroke="#EA580C" strokeWidth="3" />
            <line x1="25" y1="20" x2="35" y2="8" stroke="#EA580C" strokeWidth="3" />
            <polygon points="25,0 23,6 27,6" fill="#EA580C" />
            <polygon points="13,4 14,10 18,8" fill="#EA580C" />
            <polygon points="37,4 36,10 32,8" fill="#EA580C" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}

function Question({
  number,
  total,
  title,
  subtitle,
  children,
  id,
  typedSteps,
}: {
  number: number;
  total: number;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  id: string;
  typedSteps: React.MutableRefObject<Set<string>>;
}) {
  const alreadyTyped = typedSteps.current.has(id);
  const [displayedTitle, setDisplayedTitle] = useState(alreadyTyped ? title : "");
  const [hasTyped, setHasTyped] = useState(alreadyTyped);

  useEffect(() => {
    if (hasTyped) { setDisplayedTitle(title); return; }
    setDisplayedTitle("");
    let i = 0;
    const cleanupRef = { current: () => {} };
    const delay = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayedTitle(title.slice(0, i));
        if (i >= title.length) { clearInterval(interval); setHasTyped(true); typedSteps.current.add(id); }
      }, 35);
      cleanupRef.current = () => clearInterval(interval);
    }, 500);
    return () => { clearTimeout(delay); cleanupRef.current(); };
  }, [title, hasTyped, id, typedSteps]);

  return (
    <motion.section
      id={id}
      key={id}
      initial={{ opacity: 0, scale: 0.6, rotate: 8 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      exit={{ opacity: 0, scale: 0.3, rotate: -15, transition: { duration: 0.35, ease: "easeIn" } }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-start", padding: "clamp(3rem, 8vh, 5rem) clamp(1rem, 5vw, 2.5rem) 4.5rem", textAlign: "center", overflow: "auto" }}
    >
      <div style={{ maxWidth: 620, margin: "0 auto", width: "100%" }}>
        {/* Step counter — clear numeric position in the flow */}
        <div style={{ marginBottom: subtitle ? "0.7rem" : "2.4rem", textAlign: "center" }}>
          <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
            Step {number} of {total}
          </span>
        </div>
        {/* Category label */}
        {subtitle && (
          <div style={{ marginBottom: "2.4rem", textAlign: "center" }}>
            <span className="neon-stats neon-stats-text" style={{ fontSize: "1.1rem", letterSpacing: "0.22em" }}>
              {subtitle}
            </span>
          </div>
        )}

        {/* Title — ICE COLD blocky slab */}
        <h2 style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "clamp(2.6rem, 6vw, 4.2rem)", fontWeight: 700, color: "#fff", lineHeight: 1.1, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: "3rem", minHeight: "1.1em" }}>
          {displayedTitle}
          {!hasTyped && <span style={{ opacity: 0.6 }}>|</span>}
        </h2>

        {children}
      </div>
    </motion.section>
  );
}

export default function PlanWizardClient() {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialWizardState);
  const [revealedCount, setRevealedCount] = useState(1);
  const [currentQ, setCurrentQ] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [overlayError, setOverlayError] = useState("");
  const [overlayLimitReached, setOverlayLimitReached] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(0);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResumed, setShowResumed] = useState(false);
  const [quota, setQuota] = useState<{ plansRemaining: number; plansLimit: number; plansUsed: number; resetsAt?: string; unlimited: boolean } | null>(null);
  // null = unknown (profile fetch in flight), true/false once resolved.
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  // Generate-first: logged-out users can optionally attach an account on the
  // final step. Closed by default so the primary path is "just generate".
  const [showAccount, setShowAccount] = useState(false);
  const [progressPct, setProgressPct] = useState(0);
  // "Email me the plan when it's done" opt-in (final step). Kept OUT of
  // WizardState so it never lands in the stored plan inputs / learning signals
  // — it's a transient delivery preference, not trip data. Sent to the server
  // alongside the generate payload as `notifyEmail`.
  const [notifyMe, setNotifyMe] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState("");
  const isScrolling = useRef(false);
  const typedSteps = useRef<Set<string>>(new Set());
  // Leadgen A3 — per-step dwell. Reset on each forward transition.
  const stepEnteredAtRef = useRef<number>(Date.now());

  // "Plan it all for me" — one-click full auto-pick. When fired, fills every
  // required field with valid varied picks, shows a recap of the headline
  // choices, then jumps to the final step (never skips the account/generate
  // gate). Pattern ported from BMHQ/MOH PartyWizardClient.
  const [globalPickSummary, setGlobalPickSummary] = useState<string[]>([]);
  const [autoPicked, setAutoPicked] = useState(false);

  // Fetch the user's remaining monthly plan quota so the wizard can surface
  // "X of 3 trips remaining · resets Apr 30" up front — avoids the nasty
  // surprise of hitting the cap mid-submit. Pattern ported from MOH/BESTMAN
  // weekly-pill. Silent 401 (unauth) → no pill (fresh signup path).
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/profile");
        if (cancelled) return;
        if (!res.ok) {
          // 401 → anonymous (the generate-first default path).
          setIsLoggedIn(false);
          return;
        }
        const data = await res.json();
        if (cancelled) return;
        setIsLoggedIn(true);
        if (data.email) {
          dispatch({ type: "SET_FIELD", field: "organizerEmail", value: data.email });
          setNotifyEmail(data.email); // prefill the "email me when ready" opt-in
        }
        setQuota({
          plansRemaining: data.plansRemaining ?? Math.max(0, (data.plansLimit ?? 3) - (data.plansUsed ?? 0)),
          plansLimit: data.plansLimit ?? 3,
          plansUsed: data.plansUsed ?? 0,
          resetsAt: data.resetsAt,
          unlimited: !!data.unlimited,
        });
      } catch { /* ignore */ }
    })();
    return () => { cancelled = true; };
  }, []);

  // Restore wizard state from sessionStorage on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("tdf-wizard-state");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") {
          dispatch({ type: "RESTORE_STATE", state: parsed });
          setShowResumed(true);
          setTimeout(() => setShowResumed(false), 2000);
        }
      }
    } catch { /* ignore */ }
  }, []);

  const saveToSession = useCallback((newState: WizardState) => {
    try {
      sessionStorage.setItem("tdf-wizard-state", JSON.stringify(newState));
    } catch { /* ignore */ }
  }, []);

  const set = (field: keyof WizardState, value: unknown) => {
    dispatch({ type: "SET_FIELD", field, value });
    const updated = { ...state, [field]: value };
    saveToSession(updated);
    // Leadgen A3 — fire-and-forget behavioral signal for categorical picks.
    if (LOGGED_SELECTION_FIELDS.has(field)) {
      const prev = state[field];
      if (Array.isArray(value) && Array.isArray(prev)) {
        // Array field (states, dining) — diff to detect the single add/remove.
        const added = (value as string[]).filter((x) => !(prev as string[]).includes(x));
        const removed = (prev as string[]).filter((x) => !(value as string[]).includes(x));
        for (const id of added) logSelection("tdf", { slot: field, optionId: id, action: "add" });
        for (const id of removed) logSelection("tdf", { slot: field, optionId: id, action: "remove" });
      } else if (value !== prev) {
        logSelection("tdf", { slot: field, optionId: String(value), action: "add" });
      }
    }
  };

  const tdfRec = "tdf-endorsed";

  const questionIds = [
    "q-where",          // 0: destination type + region/city
    "q-when",           // 1: flexible/season or month/year + days
    "q-crew",           // 2: group size + skill mix + age range
    "q-golf",           // 3: rounds + course quality + walking
    "q-offcourse",      // 4: lodging + dining + nightlife + activities
    "q-budget",         // 5: budget + priorities + special requests
    "q-roster",         // 6: organizer info + generate
  ];

  const totalQuestions = questionIds.length;

  const scrollToQuestion = useCallback((_index: number) => {}, []);

  // Per-step validation gates. Returns { ok, hint } — ok=false disables the
  // Continue button + blocks advance. Pattern ported from MOH/BESTMAN
  // canAdvance() — prevents users passing through empty steps and hitting
  // server validation errors later.
  const canAdvance = useCallback((step: number): { ok: boolean; hint?: string } => {
    switch (step) {
      case 0: // Where
        if (!state.destinationType) return { ok: false, hint: "Pick a destination or region" };
        if (state.destinationType === "specific" && !state.destination.trim())
          return { ok: false, hint: "Enter a specific destination" };
        if (state.destinationType === "region" && !state.region)
          return { ok: false, hint: "Pick a region" };
        return { ok: true };
      case 1: // When
        if (state.flexible && !state.preferredSeason)
          return { ok: false, hint: "Pick a preferred season" };
        if (!state.flexible && !state.tripMonth)
          return { ok: false, hint: "Pick a month" };
        if (!state.numberOfDays) return { ok: false, hint: "Pick a trip length" };
        return { ok: true };
      case 2: // Crew
        if (!state.skillMix) return { ok: false, hint: "Pick a skill mix" };
        if (!state.ageRange) return { ok: false, hint: "Pick an age range" };
        return { ok: true };
      case 3: // Golf
        if (!state.roundsPerDay) return { ok: false, hint: "Pick rounds per day" };
        if (!state.courseQuality) return { ok: false, hint: "Pick course quality" };
        if (!state.walkingOrRiding) return { ok: false, hint: "Walking or riding?" };
        return { ok: true };
      case 4: // Off-course
        if (!state.lodging) return { ok: false, hint: "Pick lodging" };
        if (!state.dining || state.dining.length === 0) return { ok: false, hint: "Pick a dining style" };
        if (!state.nightlife) return { ok: false, hint: "Pick a nightlife vibe" };
        return { ok: true };
      case 5: // Budget
        if (!state.budget) return { ok: false, hint: "Pick a budget" };
        return { ok: true };
      case 6: // Roster — validated on submit (handleGenerate)
        return { ok: true };
      default:
        return { ok: true };
    }
  }, [state]);

  const advance = useCallback((toIndex: number) => {
    // Gate: don't advance past a step that fails its validation. The Continue
    // button also consults canAdvance for its disabled state, but this guard
    // catches auto-advance-on-pick flows too.
    if (toIndex > currentQ) {
      const gate = canAdvance(currentQ);
      if (!gate.ok) return;
      // Leadgen A3 — co-emit per-step dwell on the completed step, then reset.
      logSelection("tdf", {
        slot: `step-${currentQ}`,
        action: "add",
        dwellMs: Date.now() - stepEnteredAtRef.current,
      });
      stepEnteredAtRef.current = Date.now();
    }
    if (toIndex + 1 > revealedCount) {
      setRevealedCount(toIndex + 1);
    }
    setCurrentQ(toIndex);
  }, [revealedCount, currentQ, canAdvance]);

  const setAndAdvance = (field: keyof WizardState, value: unknown) => {
    set(field, value);
    setTimeout(() => advance(revealedCount), 200);
  };

  // ── "Plan it all for me" — one-click full auto-pick ──
  // Fills every required field with valid, varied, on-brand picks (drawn from
  // the wizard's own option pools so they always clear validateWizardState),
  // surfaces a recap of the headline choices, reveals all steps, and jumps to
  // the final roster/generate step. Never skips the account/generate gate —
  // anonymous users still see the "See My Trip" CTA there.
  const planItAllForMe = useCallback(() => {
    const picks = buildGlobalAutoPick();
    const merged: WizardState = { ...state, ...picks };
    dispatch({ type: "RESTORE_STATE", state: merged });
    saveToSession(merged);
    setAutoPicked(true);

    // Human-readable recap of the headline choices for the banner.
    const timing = picks.flexible
      ? `${picks.preferredSeason} trip`
      : `${picks.tripMonth} trip`;
    setGlobalPickSummary([
      picks.destination ? String(picks.destination) : "",
      `${picks.numberOfDays} days`,
      `${picks.groupSize} golfers`,
      timing,
      picks.roundsPerDay ? String(picks.roundsPerDay) : "",
      picks.budget ? String(picks.budget) : "",
    ].filter(Boolean));

    // Reveal all steps so the progress bar is full, then land on the final
    // step. Defer one tick so the merged state commits before the step swap.
    setRevealedCount(totalQuestions);
    setTimeout(() => setCurrentQ(totalQuestions - 1), 0);
  }, [state, saveToSession, totalQuestions]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (isGenerating) return;
      const target = e.target as HTMLElement;
      const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT";
      if (e.key === "Enter" && !isInput) {
        e.preventDefault();
        const nextIndex = Math.min(revealedCount, totalQuestions - 1);
        advance(nextIndex);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isGenerating, revealedCount, totalQuestions, advance]);

  // Whether the user is attaching/using an account for this generation:
  // already logged in, OR a logged-out user who opened the optional account
  // panel. Anonymous "generate-first" = logged out AND panel closed.
  const usingAccount = isLoggedIn === true || (isLoggedIn === false && showAccount);
  const anonymous = !usingAccount;

  const handleGenerate = async () => {
    setError("");

    // ── Optional account step (logged-out users who chose to attach one) ──
    // Logged-in users skip this entirely; their session is already valid.
    if (isLoggedIn === false && showAccount) {
      const authMode = state.authMode;
      const password = state.authPassword;

      if (!state.organizerEmail) {
        setError("Please enter your email.");
        return;
      }
      if (authMode !== "login" && !state.organizerName) {
        setError("Please enter your name.");
        return;
      }
      if (!password || password.length < 8) {
        setError("Password must be at least 8 characters.");
        return;
      }

      try {
        const endpoint = authMode === "login" ? "/api/auth/login" : "/api/auth/register";
        const body = authMode === "login"
          ? { email: state.organizerEmail.toLowerCase().trim(), password }
          : { email: state.organizerEmail.toLowerCase().trim(), password, name: state.organizerName };

        const authRes = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (!authRes.ok) {
          const data = await authRes.json().catch(() => ({}));
          setError(data.error || (authMode === "login" ? "Invalid email or password." : "Failed to create account."));
          return;
        }
        // Now signed in — claim any plans this person generated anonymously
        // earlier in the session before generating the new one.
        await claimAnonPlans().catch(() => {});
      } catch {
        setError("Authentication failed. Please try again.");
        return;
      }
    }

    // ── Build the generation payload ──
    // Anonymous path: never send an organizerEmail so the plan is stored
    // unowned (claimable later). Account/logged-in path: keep it.
    const genState: WizardState = anonymous
      ? { ...state, organizerEmail: "", authPassword: "" }
      : { ...state, authPassword: "" };

    // "Email me the plan when it's ready" — only attach when the user opted in
    // and gave a plausible address. Server re-validates & ignores bad values;
    // this is just to avoid sending an empty field. Logged-in users default to
    // their account email; anon users get the small inline input below.
    const trimmedNotify = notifyEmail.trim();
    const wantsNotify =
      notifyMe && trimmedNotify.includes("@") && trimmedNotify.includes(".");
    const genPayload = wantsNotify
      ? { ...genState, notifyEmail: trimmedNotify }
      : genState;

    setIsGenerating(true);
    setIsLoading(true);
    setLoadingMsg(0);
    setProgressPct(0);

    const interval = setInterval(() => {
      setLoadingMsg((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2500);

    // ── Smooth, always-moving progress ramp ──
    // The server only emits four milestones (8 → 18 → 82 → 94) with a long
    // Claude-generation gap (30–90s, P95 >90s) between 18 and 82. The old
    // exponential-decay creep (prev + (95-prev)*0.02) slowed to a crawl near
    // the top — from ~85% at 30s it took another ~60s to reach ~95%, which
    // reads as "stuck" exactly during the longest wait.
    //
    // Replacement: a time-anchored linear ramp. Each tick we compute the
    // floor the bar should be at for the elapsed time (steady ~0.9%/tick =
    // ~3%/s up to a soft 92% knee, then a slow linear crawl 92→95). We take
    // the max of (current, time-floor, +minStep) so the bar ALWAYS advances
    // by at least a visible amount every tick and never decelerates to a
    // visual halt. Server milestones still snap it forward via the stream
    // handler's Math.max; this only governs motion *between* milestones.
    const rampStart = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = (Date.now() - rampStart) / 1000; // seconds
      setProgressPct((prev) => {
        if (prev >= 95) return prev;
        // Linear ~3%/s to a 92% knee (reaches 92% at ~30s — the typical
        // completion window), then a slow 0.05%/s crawl 92 → 95 so it keeps
        // inching up during the long tail without ever sitting flat.
        const timeFloor =
          elapsed <= 30
            ? Math.min(92, elapsed * 3)
            : Math.min(95, 92 + (elapsed - 30) * 0.05);
        // Guarantee a minimum forward step every tick so the bar is never
        // visually frozen, even past the 95% ceiling approach.
        const minStep = Math.min(95, prev + 0.25);
        return Math.min(95, Math.max(prev, timeFloor, minStep));
      });
    }, 200);

    try {
      const controller = new AbortController();
      // Client abort must NOT fire before the server's maxDuration (300s).
      // Parallel tiers typically land at ~60-90s but P95 can exceed 90s under
      // Claude load — a 90s client abort would orphan an otherwise-successful
      // generation server-side (plan lands in Redis, user sees failure).
      // 305s gives the server its full window plus a small buffer.
      const timeoutId = setTimeout(() => controller.abort(), 305_000);

      let res: Response;
      try {
        res = await fetch("/api/generate-plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(genPayload),
          signal: controller.signal,
        });
      } catch (fetchErr) {
        clearTimeout(timeoutId);
        if (fetchErr instanceof DOMException && fetchErr.name === "AbortError") {
          throw new Error("Generation is taking longer than expected. Please try again.");
        }
        throw fetchErr;
      }

      // Non-OK responses are always plain JSON (rate limit, validation, etc.)
      if (!res.ok) {
        const text = await res.text();
        let data: Record<string, unknown> = {};
        try { data = JSON.parse(text); } catch { /* not JSON */ }
        if (data.limitReached) {
          setOverlayLimitReached(true);
          setOverlayError((data.error as string) || "You've used your 3 free plans this month.");
          return;
        }
        throw new Error((data.error as string) || "Failed to generate plan");
      }

      // Stream the response — read NDJSON lines
      if (!res.body) throw new Error("No response body");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let result: { planId?: string } | null = null;

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          // Flush any remaining data in the buffer (final line may lack trailing \n)
          buffer += decoder.decode();
        } else {
          buffer += decoder.decode(value, { stream: true });
        }
        const lines = buffer.split("\n");
        buffer = done ? "" : (lines.pop() || "");
        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const msg = JSON.parse(line);
            if (msg.type === "done") {
              result = msg;
              setProgressPct(100);
            } else if (msg.type === "error") {
              throw new Error(msg.error || "Failed to generate plan");
            } else if (msg.type === "progress" && typeof msg.pct === "number") {
              // Server milestone — snap forward to it but never backward.
              // Between milestones, a client-side interval creeps toward
              // 95% to keep motion alive during long Claude waits.
              setProgressPct((prev) => Math.max(prev, Math.min(99, msg.pct)));
            }
            // ping and status messages are ignored (keepalive)
          } catch (parseErr) {
            if (parseErr instanceof SyntaxError) continue;
            throw parseErr;
          }
        }
        if (done) break;
      }

      clearTimeout(timeoutId);

      if (!result?.planId) {
        throw new Error("Failed to generate plan. Please try again.");
      }

      // Anonymous plans have no server-side owner — remember the planId
      // locally so it can be claimed into My Trips if the user signs up later.
      if (anonymous) {
        addAnonPlanId(result.planId);
      }

      try { sessionStorage.removeItem("tdf-wizard-state"); } catch { /* ignore */ }
      setConfirmed(true);
      setTimeout(() => { window.location.href = `/plan/result/${result!.planId}`; }, 3000);
    } catch (err) {
      // Show error inside the overlay — never drop back to the wizard
      setOverlayError(err instanceof Error ? err.message : "Something went wrong. Try again.");
    } finally {
      clearInterval(interval);
      clearInterval(progressInterval);
      setIsLoading(false);
    }
  };

  // ── Loading / Confirmation / Error overlay ──
  if (isGenerating || confirmed || overlayError) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center text-center px-6" role="status" aria-live="polite" style={{ background: "rgba(0,0,0,0.85)" }}>
        <AnimatePresence mode="wait">
          {overlayError ? (
            <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-6">
              <Logo className="w-12 h-12 opacity-40" />
              {overlayLimitReached ? (
                <>
                  <p className="font-body text-base max-w-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                    You&apos;ve used all 3 of your free plans this month.
                  </p>
                  <p className="font-body text-sm max-w-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
                    Your plans reset on the 1st of the month. Check back then to build more trips.
                  </p>
                  <button
                    onClick={() => { window.location.href = "/?skip=1"; }}
                    style={{
                      padding: "12px 28px",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      fontFamily: "var(--font-inter), sans-serif",
                      background: "rgba(220,38,38,0.15)",
                      border: "1px solid rgba(220,38,38,0.35)",
                      borderRadius: 8,
                      color: "rgba(255,255,255,0.7)",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      letterSpacing: "0.02em",
                    }}
                  >
                    Go Home
                  </button>
                </>
              ) : (
                <>
                  <p className="font-body text-red-400 text-base max-w-sm">{overlayError}</p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <button
                      onClick={() => { setOverlayError(""); setIsGenerating(false); }}
                      className="font-body text-sm text-text-muted underline py-3 px-4"
                    >
                      Try again
                    </button>
                    <button
                      onClick={() => { window.location.href = "/?skip=1"; }}
                      className="font-body text-sm text-text-muted underline py-3 px-4"
                    >
                      Go home
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          ) : confirmed ? (
            <motion.div
              key="confirmed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-8"
            >
              <Logo className="w-16 h-16 opacity-80" />
              <div>
                <p style={{ fontFamily: "var(--font-plan-groovy), cursive", fontSize: "clamp(1.6rem, 4vw, 2.8rem)", color: "rgba(255,255,255,0.9)", marginBottom: "1rem" }}>
                  The devils are building your trip.
                </p>
                <p className="font-body text-text-muted text-base">
                  Redirecting to your plans&hellip;
                </p>
              </div>
              <button
                onClick={() => { window.location.href = "/?skip=1"; }}
                className="font-body text-xs text-text-dim underline mt-2"
              >
                take me home now
              </button>
            </motion.div>
          ) : (
            <motion.div key="loading" className="flex flex-col items-center">
              <DevilPinataScene />

              <AnimatePresence mode="wait">
                <motion.p
                  key={loadingMsg}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="font-body text-xl md:text-2xl text-text-muted"
                >
                  {LOADING_MESSAGES[loadingMsg]}
                </motion.p>
              </AnimatePresence>
              <p className="mt-4 text-sm text-text-muted opacity-40 text-center">
                Usually about 1–2 minutes
              </p>
              <p className="mt-3 text-xs text-text-dim opacity-50 text-center max-w-[280px]">
                Building 9 itineraries — 3 destinations × 3 tiers — custom for your crew. Good golf takes a minute.
              </p>
              {/* Progress bar — snaps to server milestones, creeps between them.
                  Real progress signal replaces the pre-progress infinite shimmer. */}
              <div
                className="mt-4 w-56 h-1 bg-border overflow-hidden rounded-full"
                role="progressbar"
                aria-valuenow={Math.round(progressPct)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-live="polite"
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-accent to-gold"
                  animate={{ width: `${progressPct}%` }}
                  // Linear transition slightly longer than the 200ms ramp tick
                  // so each step blends into the next as continuous motion —
                  // ease-out made every increment look like it was braking,
                  // reinforcing the "stuck" impression. The 100% snap on done
                  // gets a quick linear close-out too.
                  transition={{ duration: 0.25, ease: "linear" }}
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <p className="mt-2 text-[10px] text-text-dim opacity-60 tabular-nums tracking-widest">
                {Math.round(progressPct)}%
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  const progress = Math.min((revealedCount / totalQuestions) * 100, 100);

  const inputClass = "wizard-input w-full bg-transparent border-b border-white/20 px-0 py-5 text-white font-body text-2xl placeholder:text-white/25 focus:border-white/60 focus:outline-none focus:ring-0 outline-none transition-colors text-center";
  const selectClass = "wizard-input bg-transparent border-b border-white/20 px-0 py-5 text-white font-body text-lg focus:border-white/60 focus:outline-none transition-colors appearance-none text-center w-full";

  const ContinueBtn = ({ onClick, label = "Continue" }: { onClick: () => void; label?: string }) => {
    const gate = canAdvance(currentQ);
    const disabled = !gate.ok;
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem", marginTop: "3.5rem" }}>
        <button
          onClick={disabled ? undefined : onClick}
          disabled={disabled}
          aria-disabled={disabled}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.6rem",
            width: "auto",
            background: "none",
            border: disabled ? "2px solid rgba(255,255,255,0.12)" : "2px solid rgba(255,255,255,0.3)",
            borderRadius: "4px",
            cursor: disabled ? "not-allowed" : "pointer",
            color: disabled ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.5)",
            fontSize: "0.86rem",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontFamily: "var(--font-inter), sans-serif",
            padding: "1rem 2.5rem",
            transition: "color 0.2s, border-color 0.2s",
          }}
          onMouseEnter={(e) => { if (!disabled) { e.currentTarget.style.color = "rgba(255,255,255,0.9)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)"; } }}
          onMouseLeave={(e) => { if (!disabled) { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; } }}
        >
          {label}
          <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
        {disabled && gate.hint && (
          <p style={{ color: "rgba(255,255,255,0.32)", fontSize: "0.78rem", letterSpacing: "0.05em", margin: 0 }}>{gate.hint}</p>
        )}
      </div>
    );
  };

  return (
    <div id="main-content" style={{ background: "transparent", height: "100vh", overflow: "hidden", position: "relative" }}>
      {/* Fixed progress bar — thin white line */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, height: 2, background: "rgba(255,255,255,0.08)" }}>
        <motion.div
          style={{ height: "100%", background: "#fff", transformOrigin: "left" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>
      {/* Home button — top right */}
      <HomeButton />

      {/* Session restore banner */}
      <AnimatePresence>
        {showResumed && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{ position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)", zIndex: 52, padding: "8px 20px", borderRadius: 6, background: "rgba(234,88,12,0.15)", border: "1px solid rgba(234,88,12,0.3)", color: "rgba(255,255,255,0.7)", fontSize: "0.78rem", letterSpacing: "0.06em", fontFamily: "var(--font-inter), sans-serif", whiteSpace: "nowrap" }}
          >
            Resuming your plan
          </motion.div>
        )}
      </AnimatePresence>

      {/* Monthly quota pill — hidden for unlimited accounts + unauthed users.
          Pre-generation (plansUsed === 0) shows positive "first plan free"
          framing instead of a "3 of 3 remaining" count, which read as a
          paywall before the user got any value. The count only appears once
          the user has at least one generation under their belt. */}
      {quota && !quota.unlimited && !showResumed && (
        quota.plansUsed === 0 ? (
          <div
            style={{
              position: "fixed",
              top: 16,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 51,
              padding: "6px 16px",
              borderRadius: 999,
              background: "rgba(234,88,12,0.12)",
              border: "1px solid rgba(234,88,12,0.25)",
              color: "rgba(255,255,255,0.62)",
              fontSize: "0.72rem",
              letterSpacing: "0.04em",
              fontFamily: "var(--font-inter), sans-serif",
              whiteSpace: "nowrap",
            }}
            aria-live="polite"
          >
            Your first plan is free — no card needed
          </div>
        ) : (
          <div
            style={{
              position: "fixed",
              top: 16,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 51,
              padding: "6px 16px",
              borderRadius: 999,
              background: quota.plansRemaining > 0 ? "rgba(234,88,12,0.12)" : "rgba(220,38,38,0.18)",
              border: quota.plansRemaining > 0 ? "1px solid rgba(234,88,12,0.25)" : "1px solid rgba(220,38,38,0.45)",
              color: quota.plansRemaining > 0 ? "rgba(255,255,255,0.62)" : "rgba(255,200,200,0.82)",
              fontSize: "0.72rem",
              letterSpacing: "0.04em",
              fontFamily: "var(--font-inter), sans-serif",
              whiteSpace: "nowrap",
            }}
            aria-live="polite"
          >
            {quota.plansRemaining} of {quota.plansLimit} trips remaining this month
            {quota.resetsAt && ` · resets ${new Date(quota.resetsAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
          </div>
        )
      )}

      <MulliganButton onClick={() => {
        if (currentQ > 0) {
          setCurrentQ(currentQ - 1);
        } else {
          window.location.href = "/?skip=1";
        }
      }} />

      <AnimatePresence mode="wait">

      {/* STEP 1: WHERE — Destination + Region/City */}
      {currentQ === 0 && (
        <Question number={1} total={totalQuestions} title="Where's the crew headed?" subtitle="Destination" id={questionIds[0]} typedSteps={typedSteps}>
          {/* ── "Plan it all for me" — one-click full auto-pick ──
              Short-on-time escape hatch: fills the whole wizard with valid,
              varied picks and jumps to the final step where the generate gate
              takes over. Primary, prominent, but clearly an alternative to the
              step-by-step flow below. */}
          <motion.button
            type="button"
            onClick={planItAllForMe}
            whileHover={{ scale: 1.01, y: -2 }}
            whileTap={{ scale: 0.99 }}
            aria-label="Plan it all for me — auto-pick every choice and skip to the end"
            style={{
              display: "block",
              width: "100%",
              marginBottom: "1rem",
              padding: "1.2rem 1.5rem",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              background: "linear-gradient(135deg, #EA580C, #DC2626)",
              color: "#fff",
              boxShadow: "0 6px 24px rgba(234,88,12,0.35)",
              textAlign: "center",
            }}
          >
            <span style={{ display: "block", fontFamily: "var(--font-plan-block), sans-serif", fontSize: "1.15rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              ⚡ Plan it all for me
            </span>
            <span style={{ display: "block", marginTop: "0.35rem", fontSize: "0.82rem", opacity: 0.92, fontFamily: "var(--font-inter), sans-serif", lineHeight: 1.35 }}>
              No time? One tap picks a killer trip — review &amp; tweak before we build it.
            </span>
          </motion.button>
          <p style={{ textAlign: "center", marginBottom: "2.5rem", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter), sans-serif" }}>
            Or build it step by step
          </p>
          <div className="grid grid-cols-2 gap-5" style={{ marginBottom: "3rem" }}>
            <SelectionCard
              label="Specific place"
              sublabel="I know where we're going"
              selected={state.destinationType === "specific"}
              onClick={() => set("destinationType", "specific")}
            />
            <SelectionCard
              label="Pick a region"
              sublabel="Let AI suggest a spot"
              selected={state.destinationType === "region"}
              onClick={() => set("destinationType", "region")}
            />
          </div>
          {state.destinationType === "specific" ? (
            <>
              <input
                type="text"
                placeholder="e.g. Scottsdale, AZ or Pinehurst, NC"
                value={state.destination}
                onChange={(e) => set("destination", e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && state.destination) advance(revealedCount); }}
                autoFocus
                className={inputClass}
              />
              {state.destination && <ContinueBtn onClick={() => advance(revealedCount)} />}
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {REGION_NAMES.map((r) => (
                  <SelectionCard
                    key={r}
                    label={r}
                    sublabel={<RegionMapThumb region={r} selected={state.region === r} />}
                    selected={state.region === r}
                    onClick={() => {
                      set("region", r);
                      // Clear states when region changes — different regions
                      // have different state lists. User can opt into a subset
                      // via the pills below (or keep empty = whole region).
                      set("states", []);
                    }}
                  />
                ))}
              </div>
              {state.region && REGION_STATES[state.region] && (
                <div style={{ marginTop: "2rem" }}>
                  <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.82rem", letterSpacing: "0.05em", marginBottom: "0.6rem", textAlign: "center" }}>
                    Narrow it down? (optional — leave empty for the whole region)
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center", marginBottom: "1.5rem" }}>
                    {REGION_STATES[state.region].map((st) => {
                      const active = state.states.includes(st);
                      return (
                        <button
                          key={st}
                          onClick={() => {
                            const next = active
                              ? state.states.filter((x) => x !== st)
                              : [...state.states, st];
                            set("states", next);
                          }}
                          style={{
                            padding: "0.5rem 0.9rem",
                            borderRadius: 999,
                            minHeight: 36,
                            border: active ? "1px solid rgba(234,88,12,0.7)" : "1px solid rgba(255,255,255,0.18)",
                            background: active ? "rgba(234,88,12,0.2)" : "transparent",
                            color: active ? "#fff" : "rgba(255,255,255,0.55)",
                            fontSize: "0.82rem",
                            letterSpacing: "0.05em",
                            cursor: "pointer",
                            fontFamily: "var(--font-inter), sans-serif",
                            transition: "all 0.2s",
                          }}
                          aria-pressed={active}
                        >
                          {st}
                        </button>
                      );
                    })}
                  </div>
                  <ContinueBtn onClick={() => advance(revealedCount)} />
                </div>
              )}
            </>
          )}
        </Question>
      )}

      {/* STEP 2: WHEN — Timing + Days */}
      {currentQ === 1 && (
        <Question number={2} total={totalQuestions} title="When and how long?" subtitle="Timing" id={questionIds[1]} typedSteps={typedSteps}>
          <div className="grid grid-cols-2 gap-5" style={{ marginBottom: "3rem" }}>
            <SelectionCard
              label="Flexible"
              sublabel="Pick a season"
              selected={state.flexible}
              onClick={() => set("flexible", true)}
              compact
            />
            <SelectionCard
              label="Specific month"
              sublabel="I know when"
              selected={!state.flexible}
              onClick={() => set("flexible", false)}
              compact
            />
          </div>
          {state.flexible ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5" style={{ marginBottom: "3rem" }}>
              {SEASONS.map((s) => (
                <SelectionCard key={s} label={s} selected={state.preferredSeason === s} onClick={() => set("preferredSeason", s)} compact />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5" style={{ marginBottom: "3rem" }}>
              <select value={state.tripMonth} onChange={(e) => set("tripMonth", e.target.value)} className={selectClass}>
                <option value="">Month</option>
                {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          )}
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.9rem", letterSpacing: "0.08em", marginBottom: "0.4rem" }}>How many days?</p>
          <p style={{ color: "rgba(255,255,255,0.18)", fontSize: "0.75rem", letterSpacing: "0.06em", marginBottom: "1.2rem" }}>Days of activities — excludes arrival &amp; departure</p>
          <div className="grid grid-cols-3 gap-4">
            {[3, 4, 5].map((d) => (
              <SelectionCard key={d} label={`${d} days`} sublabel={d === 4 ? tdfRec : undefined} selected={state.numberOfDays === d} onClick={() => { set("numberOfDays", d); advance(revealedCount); }} />
            ))}
          </div>
        </Question>
      )}

      {/* STEP 3: THE CREW — Group size + Skill + Age */}
      {currentQ === 2 && (
        <Question number={3} total={totalQuestions} title="Tell us about the crew" subtitle="The Crew" id={questionIds[2]} typedSteps={typedSteps}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem", marginBottom: "2rem" }}>
            <button onClick={() => set("groupSize", Math.max(4, state.groupSize - 1))} style={{ width: 48, height: 48, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)", background: "transparent", color: "#fff", fontSize: "1.5rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
            <span style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "4.8rem", fontWeight: 700, color: "#fff", lineHeight: 1, minWidth: "3.5rem", textAlign: "center" }}>{state.groupSize}</span>
            <button onClick={() => set("groupSize", Math.min(20, state.groupSize + 1))} style={{ width: 48, height: 48, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)", background: "transparent", color: "#fff", fontSize: "1.5rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
          </div>
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.84rem", marginBottom: "1.8rem" }}>12–16 is the sweet spot</p>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.9rem", letterSpacing: "0.08em", marginBottom: "1.5rem" }}>Skill mix</p>
          <div className="grid grid-cols-2 gap-5" style={{ marginBottom: "3rem" }}>
            {["All similar", "Wide range", "Mostly beginners", "Here for the vibes"].map((s) => (
              <SelectionCard key={s} label={s} selected={state.skillMix === s} onClick={() => set("skillMix", s)} compact />
            ))}
          </div>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.9rem", letterSpacing: "0.08em", marginBottom: "1.5rem" }}>Age range</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {["20s", "30s", "40s", "Mixed"].map((a) => (
              <SelectionCard key={a} label={a} selected={state.ageRange === a} onClick={() => { set("ageRange", a); advance(revealedCount); }} compact />
            ))}
          </div>
        </Question>
      )}

      {/* STEP 4: THE GOLF — Rounds + Quality + Walking + Must-play */}
      {currentQ === 3 && (
        <Question number={4} total={totalQuestions} title="How much golf can you handle?" subtitle="The Golf" id={questionIds[3]} typedSteps={typedSteps}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5" style={{ marginBottom: "3rem" }}>
            {[
              { label: "One (18)", sublabel: "Casual" },
              { label: "Two (36)", sublabel: tdfRec },
              { label: "Let AI decide", sublabel: "Based on vibe" },
            ].map((r) => (
              <SelectionCard key={r.label} label={r.label} sublabel={r.sublabel} selected={state.roundsPerDay === r.label} onClick={() => set("roundsPerDay", r.label)} compact />
            ))}
          </div>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.9rem", letterSpacing: "0.08em", marginBottom: "1.5rem" }}>Course quality</p>
          <div className="grid grid-cols-2 gap-5" style={{ marginBottom: "3rem" }}>
            {["Cheap & fun", "Mix of public & resort", "Bucket list only", "Whatever fits budget"].map((q) => (
              <SelectionCard key={q} label={q} selected={state.courseQuality === q} onClick={() => set("courseQuality", q)} compact />
            ))}
          </div>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.9rem", letterSpacing: "0.08em", marginBottom: "1.5rem" }}>Walking or riding?</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5" style={{ marginBottom: "3rem" }}>
            {["Walking", "Riding", "Mix / Don't care"].map((w) => (
              <SelectionCard key={w} label={w} selected={state.walkingOrRiding === w} onClick={() => set("walkingOrRiding", w)} compact />
            ))}
          </div>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.9rem", letterSpacing: "0.08em", marginBottom: "0.4rem" }}>Group handicap range <span style={{ color: "rgba(255,255,255,0.18)" }}>(optional)</span></p>
          <p style={{ color: "rgba(255,255,255,0.18)", fontSize: "0.75rem", letterSpacing: "0.05em", marginBottom: "1.2rem" }}>Helps us pick tee boxes, set pairings, and dial course difficulty</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5" style={{ marginBottom: "3rem" }}>
            {[
              { label: "Scratch–10", sublabel: "Sticks" },
              { label: "10–20", sublabel: "Solid" },
              { label: "20+", sublabel: "Bogey golf" },
              { label: "Mixed bag", sublabel: "All levels" },
            ].map((h) => (
              <SelectionCard
                key={h.label}
                label={h.label}
                sublabel={h.sublabel}
                selected={state.handicap === h.label}
                // Toggle off if re-tapped so it stays truly optional
                onClick={() => set("handicap", state.handicap === h.label ? "" : h.label)}
                compact
              />
            ))}
          </div>
          <input
            type="text"
            placeholder="Must-play courses? (e.g. Bandon Dunes — or leave blank)"
            value={state.mustPlayCourses}
            onChange={(e) => set("mustPlayCourses", e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") advance(revealedCount); }}
            className={inputClass}
          />
          <ContinueBtn onClick={() => advance(revealedCount)} />
        </Question>
      )}

      {/* STEP 5: OFF-COURSE — Lodging + Dining + Nightlife + Activities */}
      {currentQ === 4 && (
        <Question number={5} total={totalQuestions} title="What happens off the course?" subtitle="Off-Course" id={questionIds[4]} typedSteps={typedSteps}>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.9rem", letterSpacing: "0.08em", marginBottom: "1.5rem" }}>Lodging</p>
          <div className="grid grid-cols-2 gap-5" style={{ marginBottom: "3rem" }}>
            {[
              { label: "One big house", sublabel: tdfRec },
              { label: "Hotel / Resort", sublabel: "Separate rooms" },
              { label: "Split houses", sublabel: "Smaller groups" },
              { label: "Don't care", sublabel: "AI decides" },
            ].map((l) => (
              <SelectionCard key={l.label} label={l.label} sublabel={l.sublabel} selected={state.lodging === l.label} onClick={() => set("lodging", l.label)} compact />
            ))}
          </div>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.9rem", letterSpacing: "0.08em", marginBottom: "0.4rem" }}>Dining</p>
          <p style={{ color: "rgba(255,255,255,0.18)", fontSize: "0.75rem", letterSpacing: "0.05em", marginBottom: "1.2rem" }}>Pick any — combos welcome (cook one night, splurge another)</p>
          <div className="grid grid-cols-2 gap-5" style={{ marginBottom: "3rem" }}>
            {[{ label: "Steakhouses" }, { label: "Casual & local" }, { label: "Private chef", sublabel: tdfRec }, { label: "Mix" }].map((d) => (
              <SelectionCard
                key={d.label}
                label={d.label}
                sublabel={d.sublabel}
                selected={state.dining.includes(d.label)}
                onClick={() => {
                  const next = state.dining.includes(d.label)
                    ? state.dining.filter((x) => x !== d.label)
                    : [...state.dining, d.label];
                  set("dining", next);
                }}
                compact
              />
            ))}
          </div>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.9rem", letterSpacing: "0.08em", marginBottom: "1.5rem" }}>Nightlife</p>
          <div className="grid grid-cols-2 gap-5" style={{ marginBottom: "3rem" }}>
            {["Going out every night", "Couple nights", "In bed by 10", "Point us to a bar"].map((n) => (
              <SelectionCard key={n} label={n} selected={state.nightlife === n} onClick={() => set("nightlife", n)} compact />
            ))}
          </div>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.9rem", letterSpacing: "0.08em", marginBottom: "1.5rem" }}>Activities (pick any)</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", justifyContent: "center" }}>
            {ACTIVITIES.map((a) => (
              <button
                key={a}
                onClick={() => {
                  const had = state.activities.includes(a);
                  dispatch({ type: "TOGGLE_ACTIVITY", activity: a });
                  const activities = had
                    ? state.activities.filter((x) => x !== a)
                    : [...state.activities, a];
                  saveToSession({ ...state, activities });
                  logSelection("tdf", { slot: "activities", optionId: a, action: had ? "remove" : "add" });
                }}
                style={{
                  padding: "0.85rem 1.5rem", borderRadius: 4, minHeight: 48,
                  border: state.activities.includes(a) ? "1px solid #fff" : "1px solid rgba(255,255,255,0.15)",
                  background: state.activities.includes(a) ? "#fff" : "transparent",
                  color: state.activities.includes(a) ? "#000" : "rgba(255,255,255,0.6)",
                  fontSize: "0.9rem", letterSpacing: "0.06em", cursor: "pointer", transition: "all 0.2s",
                  fontFamily: "var(--font-inter), sans-serif",
                }}
              >{a}</button>
            ))}
          </div>
          <ContinueBtn onClick={() => advance(revealedCount)} />
        </Question>
      )}

      {/* STEP 6: BUDGET — Budget + Priorities + Special requests */}
      {currentQ === 5 && (
        <Question number={6} total={totalQuestions} title="What's the budget?" subtitle="Budget" id={questionIds[5]} typedSteps={typedSteps}>
          <div className="grid grid-cols-2 gap-5" style={{ marginBottom: "3rem" }}>
            {["$2K per person", "$4K per person", "$6K per person", "Fat pockets"].map((b) => (
              <SelectionCard key={b} label={b} selected={state.budget === b} onClick={() => set("budget", b)} compact />
            ))}
          </div>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.9rem", letterSpacing: "0.08em", marginBottom: "1.5rem" }}>Where should the money go? (pick up to 2)</p>
          <div className="grid grid-cols-2 gap-5" style={{ marginBottom: "3rem" }}>
            {["Best courses", "Best lodging", "Best dining", "Keep balanced"].map((p) => (
              <SelectionCard key={p} label={p} selected={state.budgetPriorities.includes(p)} onClick={() => {
                const had = state.budgetPriorities.includes(p);
                dispatch({ type: "TOGGLE_PRIORITY", priority: p });
                const budgetPriorities = had
                  ? state.budgetPriorities.filter((x) => x !== p)
                  : state.budgetPriorities.length < 2
                    ? [...state.budgetPriorities, p]
                    : state.budgetPriorities;
                saveToSession({ ...state, budgetPriorities });
                // Only emit when the toggle actually changed state (cap respected).
                if (budgetPriorities.length !== state.budgetPriorities.length) {
                  logSelection("tdf", { slot: "budget_priority", optionId: p, action: had ? "remove" : "add" });
                }
              }} compact />
            ))}
          </div>
          <textarea
            placeholder="Anything else? Bachelor party, someone's 40th, accessibility needs..."
            value={state.specialRequests}
            onChange={(e) => set("specialRequests", e.target.value)}
            rows={3}
            style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: "0.75rem 0", color: "#fff", fontFamily: "var(--font-inter), sans-serif", fontSize: "0.9rem", resize: "none", outline: "none", textAlign: "center" }}
            className="wizard-input placeholder:text-white/25"
          />
          <ContinueBtn onClick={() => advance(revealedCount)} />
        </Question>
      )}

      {/* STEP 7: Account + Generate */}
      {currentQ === 6 && (
        <Question number={7} total={totalQuestions} title="Your annual tradition starts now" subtitle="Let's Plan" id={questionIds[6]} typedSteps={typedSteps}>
          {/* "Plan it all for me" recap — shows what was auto-picked so the
              user can see the choices before generating (or back up to edit). */}
          {autoPicked && globalPickSummary.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ maxWidth: 460, margin: "0 auto 1.75rem", padding: "0.9rem 1rem", borderRadius: 10, background: "rgba(234,88,12,0.08)", border: "1px solid rgba(234,88,12,0.3)", textAlign: "center" }}
            >
              <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.82rem", fontWeight: 600, color: "rgba(255,255,255,0.7)", marginBottom: "0.6rem" }}>
                We picked the fun stuff. Back up to tweak anything, or build it.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.4rem" }}>
                {globalPickSummary.map((chip) => (
                  <span
                    key={chip}
                    style={{ display: "inline-flex", alignItems: "center", padding: "0.2rem 0.6rem", borderRadius: 999, fontSize: "0.72rem", fontWeight: 600, fontFamily: "var(--font-inter), sans-serif", color: "rgba(255,255,255,0.75)", background: "rgba(234,88,12,0.14)", border: "1px solid rgba(234,88,12,0.35)" }}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
          {/* ── Generate-first ──
              Primary CTA generates immediately and shows the full trip. No
              account required. Logged-out users can optionally open the account
              panel to save & share; logged-in users skip it entirely. */}

          {/* Optional account panel — only for logged-out users who opt in */}
          {isLoggedIn === false && showAccount && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} style={{ overflow: "hidden", marginBottom: "1.5rem" }}>
              {/* Toggle: New Account vs Sign In */}
              <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
                <button
                  onClick={() => set("authMode", "new")}
                  style={{
                    padding: "8px 20px", borderRadius: 4, fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.04em",
                    background: state.authMode !== "login" ? "#EA580C" : "rgba(255,255,255,0.05)",
                    color: state.authMode !== "login" ? "#fff" : "rgba(255,255,255,0.4)",
                    border: state.authMode !== "login" ? "none" : "1px solid rgba(255,255,255,0.1)",
                    cursor: "pointer",
                  }}
                >
                  New Account
                </button>
                <button
                  onClick={() => set("authMode", "login")}
                  style={{
                    padding: "8px 20px", borderRadius: 4, fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.04em",
                    background: state.authMode === "login" ? "#EA580C" : "rgba(255,255,255,0.05)",
                    color: state.authMode === "login" ? "#fff" : "rgba(255,255,255,0.4)",
                    border: state.authMode === "login" ? "none" : "1px solid rgba(255,255,255,0.1)",
                    cursor: "pointer",
                  }}
                >
                  Sign In
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 400, margin: "0 auto" }}>
                {state.authMode !== "login" && (
                  <input
                    className="wizard-input"
                    type="text"
                    placeholder="Your name"
                    aria-label="Your name"
                    value={state.organizerName}
                    onChange={(e) => set("organizerName", e.target.value)}
                    autoComplete="name"
                    style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: "0.75rem 0", color: "#fff", fontSize: "1.1rem", outline: "none", textAlign: "center" }}
                  />
                )}
                <input
                  className="wizard-input"
                  type="email"
                  placeholder="Email"
                  aria-label="Email address"
                  value={state.organizerEmail}
                  onChange={(e) => set("organizerEmail", e.target.value)}
                  autoComplete="email"
                  style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: "0.75rem 0", color: "#fff", fontSize: "1.1rem", outline: "none", textAlign: "center" }}
                />
                <input
                  className="wizard-input"
                  type="password"
                  placeholder={state.authMode === "login" ? "Password" : "Create password (min 8 chars)"}
                  aria-label={state.authMode === "login" ? "Password" : "Create password"}
                  value={state.authPassword}
                  onChange={(e) => set("authPassword", e.target.value)}
                  autoComplete={state.authMode === "login" ? "current-password" : "new-password"}
                  onKeyDown={(e) => { if (e.key === "Enter") handleGenerate(); }}
                  style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: "0.75rem 0", color: "#fff", fontSize: "1.1rem", outline: "none", textAlign: "center" }}
                />
              </div>
            </motion.div>
          )}

          {/* "Email me the plan when it's done" — optional, unobtrusive.
              Generation runs 60-250s; this lets the user wander off and still
              get the link. Logged-in: one-tap (prefilled account email). Anon:
              checkbox reveals a small email input. */}
          <div style={{ maxWidth: 400, margin: "0 auto 1.25rem", textAlign: "center" }}>
            <label
              htmlFor="tdf-notify-me"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.55rem", cursor: "pointer", fontFamily: "var(--font-inter), sans-serif", fontSize: "0.88rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.3, textAlign: "left" }}
            >
              <input
                id="tdf-notify-me"
                type="checkbox"
                checked={notifyMe}
                onChange={(e) => setNotifyMe(e.target.checked)}
                style={{ accentColor: "#EA580C", width: 16, height: 16, flexShrink: 0, cursor: "pointer" }}
              />
              <span>Email me the plan when it&apos;s done &mdash; no need to babysit the screen.</span>
            </label>

            {notifyMe && isLoggedIn !== true && (
              <motion.input
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="wizard-input"
                type="email"
                placeholder="your@email.com"
                aria-label="Email address for plan notification"
                value={notifyEmail}
                onChange={(e) => setNotifyEmail(e.target.value)}
                autoComplete="email"
                onKeyDown={(e) => { if (e.key === "Enter") handleGenerate(); }}
                style={{ width: "100%", marginTop: "0.85rem", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: "0.6rem 0", color: "#fff", fontSize: "1rem", outline: "none", textAlign: "center" }}
              />
            )}

            {notifyMe && isLoggedIn === true && notifyEmail && (
              <p style={{ marginTop: "0.55rem", fontSize: "0.8rem", color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter), sans-serif" }}>
                We&apos;ll send it to {notifyEmail}.
              </p>
            )}
          </div>

          {error && (
            <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} role="alert" style={{ color: "#f87171", fontSize: "0.95rem", fontFamily: "var(--font-inter), sans-serif", marginBottom: "1rem", textAlign: "center" }}>
              ⚠ {error}
            </motion.p>
          )}

          {/* Primary CTA — generates immediately, account or not */}
          <motion.button
            onClick={handleGenerate}
            disabled={isLoading || isLoggedIn === null}
            whileHover={(isLoading || isLoggedIn === null) ? {} : { scale: 1.01 }}
            whileTap={(isLoading || isLoggedIn === null) ? {} : { scale: 0.99 }}
            style={{ width: "auto", padding: "1.3rem 3rem", background: (isLoading || isLoggedIn === null) ? "rgba(220,38,38,0.4)" : "rgba(220,38,38,0.9)", color: "#fff", border: "none", borderRadius: 4, fontSize: "1rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: (isLoading || isLoggedIn === null) ? "not-allowed" : "pointer", fontFamily: "var(--font-plan-block), sans-serif", margin: "0 auto", display: "block", opacity: (isLoading || isLoggedIn === null) ? 0.6 : 1, transition: "opacity 0.3s, background 0.3s" }}
          >
            {isLoading
              ? "Generating..."
              : (isLoggedIn === false && showAccount)
                ? (state.authMode === "login" ? "Sign In & See My Trip" : "Create Account & See My Trip")
                : "See My Trip"}
          </motion.button>

          {/* Secondary, clearly-subordinate account path (logged-out only) */}
          {isLoggedIn === false && (
            <div style={{ textAlign: "center", marginTop: "1.1rem" }}>
              {!showAccount ? (
                <button
                  onClick={() => setShowAccount(true)}
                  style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", textDecoration: "underline", cursor: "pointer", fontFamily: "var(--font-inter), sans-serif", padding: "0.4rem" }}
                >
                  or create an account to save &amp; share
                </button>
              ) : (
                <button
                  onClick={() => { setShowAccount(false); setError(""); }}
                  style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", textDecoration: "underline", cursor: "pointer", fontFamily: "var(--font-inter), sans-serif", padding: "0.4rem" }}
                >
                  skip — just show my trip
                </button>
              )}
            </div>
          )}

          <p style={{ fontSize: "0.84rem", color: "rgba(255,255,255,0.25)", textAlign: "center", marginTop: "1rem" }}>
            {isLoggedIn === true
              ? "Saved to your trips when it's done."
              : showAccount
                ? "Save your trip and email it to the crew."
                : "No account needed. Save &amp; share later."}
          </p>
        </Question>
      )}

      </AnimatePresence>
    </div>
  );
}
