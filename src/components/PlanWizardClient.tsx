"use client";

import { useReducer, useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { WizardState, initialWizardState } from "@/lib/plan-types";
import SelectionCard from "./SelectionCard";
import Logo from "./Logo";
import Link from "next/link";
import MulliganButton from "./MulliganButton";

type Action =
  | { type: "SET_FIELD"; field: keyof WizardState; value: unknown }
  | { type: "TOGGLE_ACTIVITY"; activity: string }
  | { type: "TOGGLE_PRIORITY"; priority: string }
  | { type: "SET_ATTENDEE"; index: number; field: "name" | "email"; value: string }
  | { type: "ADD_ATTENDEE" }
  | { type: "REMOVE_ATTENDEE"; index: number };

function reducer(state: WizardState, action: Action): WizardState {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
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

const REGIONS = [
  { label: "Southwest", sublabel: "AZ, NM, UT, NV" },
  { label: "Pacific NW", sublabel: "OR, WA, ID" },
  { label: "Mountain West", sublabel: "CO, MT, WY, SD" },
  { label: "Midwest", sublabel: "MI, WI, MN, OH, IN, IL" },
  { label: "Southeast", sublabel: "SC, GA, NC, FL, TN, VA, AL" },
  { label: "Northeast", sublabel: "NY, VT, ME, MA, PA, NJ, CT" },
  { label: "South Central", sublabel: "TX, OK, AR, LA, KY" },
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const SEASONS = ["Spring", "Summer", "Fall"];

const ACTIVITIES = [
  "Fishing", "ATV", "Casino", "Spa", "Brewery", "Shooting", "Water Sports", "None",
];

const LOADING_MESSAGES = [
  "Burning the corpses...",
  "Deleting the text thread...",
  "Sharpening the stakes...",
  "Calling my guy...",
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

  // Generate burst particles with random trajectories
  const particles = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2 + Math.random() * 0.5;
    const dist = 60 + Math.random() * 80;
    return {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist - 40,
      rot: Math.random() * 360,
      item: burstItems[i % burstItems.length],
    };
  });

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
}: {
  number: number;
  total: number;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  id: string;
}) {
  return (
    <motion.section
      id={id}
      key={id}
      initial={{ opacity: 0, scale: 0.6, rotate: 8 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      exit={{ opacity: 0, scale: 0.3, rotate: -15, transition: { duration: 0.35, ease: "easeIn" } }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "4.5rem 2.5rem", textAlign: "center", overflow: "auto" }}
    >
      <div style={{ maxWidth: 620, margin: "0 auto", width: "100%" }}>
        {/* Counter + category */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.9rem", marginBottom: "2.4rem" }}>
          <span style={{ fontSize: "0.84rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-plan-script), cursive" }}>
            {String(number).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          {subtitle && (
            <>
              <span style={{ width: 24, height: 1, background: "rgba(255,255,255,0.12)", display: "inline-block" }} />
              <span style={{ fontSize: "0.84rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(234,88,12,0.8)", fontFamily: "var(--font-plan-script), cursive" }}>
                {subtitle}
              </span>
            </>
          )}
        </div>

        {/* Title — ICE COLD blocky slab */}
        <h2 style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "clamp(2.6rem, 6vw, 4.2rem)", fontWeight: 700, color: "#fff", lineHeight: 1.1, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: "3rem" }}>
          {title}
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
  const [loadingMsg, setLoadingMsg] = useState(0);
  const [error, setError] = useState("");
  const isScrolling = useRef(false);

  const set = (field: keyof WizardState, value: unknown) =>
    dispatch({ type: "SET_FIELD", field, value });

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

  const advance = useCallback((toIndex: number) => {
    if (toIndex + 1 > revealedCount) {
      setRevealedCount(toIndex + 1);
    }
    setCurrentQ(toIndex);
  }, [revealedCount]);

  const setAndAdvance = (field: keyof WizardState, value: unknown) => {
    set(field, value);
    setTimeout(() => advance(revealedCount), 200);
  };

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

  const handleGenerate = async () => {
    if (!state.organizerName || !state.organizerEmail) {
      setError("Please fill in your name and email.");
      return;
    }

    setError("");
    setIsGenerating(true);
    setLoadingMsg(0);

    const interval = setInterval(() => {
      setLoadingMsg((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2500);

    try {
      const res = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to generate plan");
      }

      const data = await res.json();
      setConfirmed(true);
      setTimeout(() => { window.location.href = `/plan/result/${data.planId}`; }, 3000);
    } catch (err) {
      // Show error inside the overlay — never drop back to the wizard
      setOverlayError(err instanceof Error ? err.message : "Something went wrong. Try again.");
    } finally {
      clearInterval(interval);
    }
  };

  // ── Loading / Confirmation / Error overlay ──
  if (isGenerating || confirmed || overlayError) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center text-center px-6" style={{ background: "#000" }}>
        <AnimatePresence mode="wait">
          {overlayError ? (
            <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-6">
              <Logo className="w-12 h-12 opacity-40" />
              <p className="font-body text-red-400 text-base max-w-sm">{overlayError}</p>
              <div className="flex flex-wrap gap-4 justify-center">
                {overlayError.includes("Become a Devil") ? (
                  <a
                    href="/subscribe"
                    style={{
                      padding: "12px 28px",
                      background: "rgba(220,38,38,0.9)",
                      borderRadius: 8,
                      color: "#fff",
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      textDecoration: "none",
                      fontFamily: "var(--font-plan-script), cursive",
                    }}
                  >
                    😈 Become a Devil — $199/yr
                  </a>
                ) : (
                  <button
                    onClick={() => { setOverlayError(""); setIsGenerating(false); }}
                    className="font-body text-sm text-text-muted underline py-3 px-4"
                  >
                    Try again
                  </button>
                )}
                <button
                  onClick={() => { window.location.href = "/?skip=1"; }}
                  className="font-body text-sm text-text-muted underline py-3 px-4"
                >
                  Go home
                </button>
              </div>
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
              <p className="mt-6 text-xs text-text-dim opacity-50 text-center max-w-[280px]">
                Building 3 destinations × 3 plans each — 9 custom itineraries just for your crew
              </p>
              <div className="mt-4 w-48 h-px bg-border overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-accent to-gold"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  const progress = Math.min((revealedCount / totalQuestions) * 100, 100);

  const inputClass = "w-full bg-transparent border-b border-white/20 px-0 py-5 text-white font-body text-2xl placeholder:text-white/25 focus:border-white/60 focus:outline-none transition-colors text-center";
  const selectClass = "bg-transparent border-b border-white/20 px-0 py-5 text-white font-body text-lg focus:border-white/60 focus:outline-none transition-colors appearance-none text-center w-full";

  const ContinueBtn = ({ onClick, label = "Continue" }: { onClick: () => void; label?: string }) => (
    <button
      onClick={onClick}
      style={{
        marginTop: "3.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.6rem",
        width: "100%",
        background: "none",
        border: "none",
        cursor: "pointer",
        color: "rgba(255,255,255,0.5)",
        fontSize: "0.86rem",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        fontFamily: "var(--font-plan-script), cursive",
        padding: "0.5rem 0",
        transition: "color 0.2s",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.9)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.5)"; }}
    >
      {label}
      <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </button>
  );

  return (
    <div id="main-content" style={{ background: "#000", height: "100vh", overflow: "hidden", position: "relative" }}>
      {/* Fixed progress bar — thin white line */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, height: 2, background: "rgba(255,255,255,0.08)" }}>
        <motion.div
          style={{ height: "100%", background: "#fff", transformOrigin: "left" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>

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
        <Question number={1} total={totalQuestions} title="Where's the crew headed?" subtitle="Destination" id={questionIds[0]}>
          <div className="grid grid-cols-2 gap-5 mb-7">
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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {REGIONS.map((r) => (
                <SelectionCard
                  key={r.label}
                  label={r.label}
                  sublabel={r.sublabel}
                  selected={state.region === r.label}
                  onClick={() => { set("region", r.label); advance(revealedCount); }}
                />
              ))}
            </div>
          )}
        </Question>
      )}

      {/* STEP 2: WHEN — Timing + Days */}
      {currentQ === 1 && (
        <Question number={2} total={totalQuestions} title="When and how long?" subtitle="When" id={questionIds[1]}>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", letterSpacing: "0.08em", marginBottom: "1.5rem", marginTop: "-1.5rem" }}>Timing</p>
          <div className="grid grid-cols-2 gap-5 mb-7">
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
            <div className="grid grid-cols-3 gap-5 mb-7">
              {SEASONS.map((s) => (
                <SelectionCard key={s} label={s} selected={state.preferredSeason === s} onClick={() => set("preferredSeason", s)} compact />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5 mb-7">
              <select value={state.tripMonth} onChange={(e) => set("tripMonth", e.target.value)} className={selectClass}>
                <option value="">Month</option>
                {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
              <select value={state.tripYear} onChange={(e) => set("tripYear", e.target.value)} className={selectClass}>
                <option value="">Year</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
              </select>
            </div>
          )}
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.9rem", letterSpacing: "0.08em", marginBottom: "1.2rem" }}>How many days?</p>
          <div className="grid grid-cols-3 gap-4">
            {[3, 4, 5].map((d) => (
              <SelectionCard key={d} label={`${d} days`} sublabel={d === 3 ? "The TDF standard" : undefined} selected={state.numberOfDays === d} onClick={() => { set("numberOfDays", d); advance(revealedCount); }} />
            ))}
          </div>
        </Question>
      )}

      {/* STEP 3: THE CREW — Group size + Skill + Age */}
      {currentQ === 2 && (
        <Question number={3} total={totalQuestions} title="Tell us about the crew" subtitle="The Crew" id={questionIds[2]}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem", marginBottom: "2rem" }}>
            <button onClick={() => set("groupSize", Math.max(4, state.groupSize - 1))} style={{ width: 48, height: 48, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)", background: "transparent", color: "#fff", fontSize: "1.5rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
            <span style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "4.8rem", fontWeight: 700, color: "#fff", lineHeight: 1, minWidth: "3.5rem", textAlign: "center" }}>{state.groupSize}</span>
            <button onClick={() => set("groupSize", Math.min(32, state.groupSize + 1))} style={{ width: 48, height: 48, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)", background: "transparent", color: "#fff", fontSize: "1.5rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
          </div>
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.84rem", marginBottom: "1.8rem" }}>12–16 is the sweet spot</p>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.9rem", letterSpacing: "0.08em", marginBottom: "1rem" }}>Skill mix</p>
          <div className="grid grid-cols-2 gap-5 mb-7">
            {["All similar", "Wide range", "Mostly beginners", "Here for the vibes"].map((s) => (
              <SelectionCard key={s} label={s} selected={state.skillMix === s} onClick={() => set("skillMix", s)} compact />
            ))}
          </div>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.9rem", letterSpacing: "0.08em", marginBottom: "1rem" }}>Age range</p>
          <div className="grid grid-cols-4 gap-4">
            {["20s", "30s", "40s", "Mixed"].map((a) => (
              <SelectionCard key={a} label={a} selected={state.ageRange === a} onClick={() => { set("ageRange", a); advance(revealedCount); }} compact />
            ))}
          </div>
        </Question>
      )}

      {/* STEP 4: THE GOLF — Rounds + Quality + Walking + Must-play */}
      {currentQ === 3 && (
        <Question number={4} total={totalQuestions} title="How much golf can you handle?" subtitle="The Golf" id={questionIds[3]}>
          <div className="grid grid-cols-3 gap-5 mb-7">
            {[
              { label: "One (18)", sublabel: "Casual" },
              { label: "Two (36)", sublabel: "The TDF way" },
              { label: "Let AI decide", sublabel: "Based on vibe" },
            ].map((r) => (
              <SelectionCard key={r.label} label={r.label} sublabel={r.sublabel} selected={state.roundsPerDay === r.label} onClick={() => set("roundsPerDay", r.label)} compact />
            ))}
          </div>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.9rem", letterSpacing: "0.08em", marginBottom: "1rem" }}>Course quality</p>
          <div className="grid grid-cols-2 gap-5 mb-7">
            {["Cheap & fun", "Mix of public & resort", "Bucket list only", "Whatever fits budget"].map((q) => (
              <SelectionCard key={q} label={q} selected={state.courseQuality === q} onClick={() => set("courseQuality", q)} compact />
            ))}
          </div>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.9rem", letterSpacing: "0.08em", marginBottom: "1rem" }}>Walking or riding?</p>
          <div className="grid grid-cols-3 gap-5 mb-7">
            {["Walking", "Riding", "Mix / Don't care"].map((w) => (
              <SelectionCard key={w} label={w} selected={state.walkingOrRiding === w} onClick={() => set("walkingOrRiding", w)} compact />
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
          <ContinueBtn onClick={() => advance(revealedCount)} label={state.courseQuality ? "Continue" : "Skip"} />
        </Question>
      )}

      {/* STEP 5: OFF-COURSE — Lodging + Dining + Nightlife + Activities */}
      {currentQ === 4 && (
        <Question number={5} total={totalQuestions} title="What happens off the course?" subtitle="Off-Course" id={questionIds[4]}>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.9rem", letterSpacing: "0.08em", marginBottom: "1rem" }}>Lodging</p>
          <div className="grid grid-cols-2 gap-5 mb-7">
            {[
              { label: "One big house", sublabel: "The TDF way" },
              { label: "Hotel / Resort", sublabel: "Separate rooms" },
              { label: "Split houses", sublabel: "Smaller groups" },
              { label: "Don't care", sublabel: "AI decides" },
            ].map((l) => (
              <SelectionCard key={l.label} label={l.label} sublabel={l.sublabel} selected={state.lodging === l.label} onClick={() => set("lodging", l.label)} compact />
            ))}
          </div>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.9rem", letterSpacing: "0.08em", marginBottom: "1rem" }}>Dining</p>
          <div className="grid grid-cols-2 gap-5 mb-7">
            {["Steakhouses", "Casual & local", "Private chef", "Mix"].map((d) => (
              <SelectionCard key={d} label={d} selected={state.dining === d} onClick={() => set("dining", d)} compact />
            ))}
          </div>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.9rem", letterSpacing: "0.08em", marginBottom: "1rem" }}>Nightlife</p>
          <div className="grid grid-cols-2 gap-5 mb-7">
            {["Going out every night", "Couple nights", "In bed by 10", "Point us to a bar"].map((n) => (
              <SelectionCard key={n} label={n} selected={state.nightlife === n} onClick={() => set("nightlife", n)} compact />
            ))}
          </div>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.9rem", letterSpacing: "0.08em", marginBottom: "1rem" }}>Activities (pick any)</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", justifyContent: "center" }}>
            {ACTIVITIES.map((a) => (
              <button
                key={a}
                onClick={() => dispatch({ type: "TOGGLE_ACTIVITY", activity: a })}
                style={{
                  padding: "0.85rem 1.5rem", borderRadius: 4, minHeight: 48,
                  border: state.activities.includes(a) ? "1px solid #fff" : "1px solid rgba(255,255,255,0.15)",
                  background: state.activities.includes(a) ? "#fff" : "transparent",
                  color: state.activities.includes(a) ? "#000" : "rgba(255,255,255,0.6)",
                  fontSize: "0.9rem", letterSpacing: "0.06em", cursor: "pointer", transition: "all 0.2s",
                  fontFamily: "var(--font-plan-script), cursive",
                }}
              >{a}</button>
            ))}
          </div>
          <ContinueBtn onClick={() => advance(revealedCount)} />
        </Question>
      )}

      {/* STEP 6: BUDGET — Budget + Priorities + Special requests */}
      {currentQ === 5 && (
        <Question number={6} total={totalQuestions} title="What's the budget?" subtitle="Budget" id={questionIds[5]}>
          <div className="grid grid-cols-2 gap-5 mb-7">
            {["$2K per person", "$4K per person", "$6K per person", "Fuck it we ball"].map((b) => (
              <SelectionCard key={b} label={b} selected={state.budget === b} onClick={() => set("budget", b)} compact />
            ))}
          </div>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.9rem", letterSpacing: "0.08em", marginBottom: "1rem" }}>Where should the money go? (pick up to 2)</p>
          <div className="grid grid-cols-2 gap-5 mb-7">
            {["Best courses", "Best lodging", "Best dining", "Keep balanced"].map((p) => (
              <SelectionCard key={p} label={p} selected={state.budgetPriorities.includes(p)} onClick={() => dispatch({ type: "TOGGLE_PRIORITY", priority: p })} compact />
            ))}
          </div>
          <textarea
            placeholder="Anything else? Bachelor party, someone's 40th, accessibility needs..."
            value={state.specialRequests}
            onChange={(e) => set("specialRequests", e.target.value)}
            rows={3}
            style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: "0.75rem 0", color: "#fff", fontFamily: "var(--font-plan-script), cursive", fontSize: "0.9rem", resize: "none", outline: "none", textAlign: "center" }}
            className="placeholder:text-white/25"
          />
          <ContinueBtn onClick={() => advance(revealedCount)} />
        </Question>
      )}

      {/* STEP 7: THE ROSTER — Organizer info + Generate */}
      {currentQ === 6 && (
        <Question number={7} total={totalQuestions} title="Who's organizing?" subtitle="The Roster" id={questionIds[6]}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-7">
            <input
              type="text"
              placeholder="Your name"
              value={state.organizerName}
              onChange={(e) => set("organizerName", e.target.value)}
              className="bg-bg-alt border border-border rounded-lg px-5 py-3.5 text-text font-body text-sm placeholder:text-text-dim focus:border-accent focus:outline-none transition-colors"
            />
            <input
              type="email"
              placeholder="Your email"
              value={state.organizerEmail}
              onChange={(e) => set("organizerEmail", e.target.value)}
              className="bg-bg-alt border border-border rounded-lg px-5 py-3.5 text-text font-body text-sm placeholder:text-text-dim focus:border-accent focus:outline-none transition-colors"
            />
          </div>

          {/* Free plan indicator */}
          <p style={{ fontSize: "0.84rem", color: "rgba(255,255,255,0.25)", textAlign: "center", marginBottom: "1rem" }}>
            Free plan — venue names masked. <a href="/subscribe" style={{ color: "rgba(220,38,38,0.7)", textDecoration: "underline" }}>Become a Devil</a> for full details + unlimited plans.
          </p>

          {error && (
            <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} style={{ color: "#f87171", fontSize: "0.8rem", fontFamily: "var(--font-plan-script), cursive", marginBottom: "1rem" }}>
              {error}
            </motion.p>
          )}

          <motion.button
            onClick={handleGenerate}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            style={{ width: "100%", padding: "1.3rem", background: "rgba(220,38,38,0.9)", color: "#fff", border: "none", borderRadius: 4, fontSize: "1rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: "var(--font-plan-script), cursive" }}
          >
            Unleash the Devils
          </motion.button>
        </Question>
      )}

      </AnimatePresence>
    </div>
  );
}
