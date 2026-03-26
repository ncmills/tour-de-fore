"use client";

import { useReducer, useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { WizardState, initialWizardState } from "@/lib/plan-types";
import SelectionCard from "./SelectionCard";
import Logo from "./Logo";
import Link from "next/link";

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
  { label: "Midwest", sublabel: "MI, WI, MN, OH" },
  { label: "Southeast", sublabel: "SC, GA, NC, FL" },
  { label: "Northeast", sublabel: "NY, VT, ME, MA" },
  { label: "Mountain West", sublabel: "CO, MT, WY, SD" },
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
  "Scouting courses...",
  "Checking tee time availability...",
  "Finding the perfect rental house...",
  "Plotting the schedule...",
  "Reserving steakhouse tables...",
  "Calculating damages...",
  "Optimizing the route...",
  "Finalizing the game plan...",
];

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
      initial={{ opacity: 0, y: 48 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "6rem 2rem", textAlign: "center" }}
    >
      <div style={{ maxWidth: 560, margin: "0 auto", width: "100%" }}>
        {/* Counter + category */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginBottom: "2rem" }}>
          <span style={{ fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-inter), sans-serif" }}>
            {String(number).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          {subtitle && (
            <>
              <span style={{ width: 20, height: 1, background: "rgba(255,255,255,0.12)", display: "inline-block" }} />
              <span style={{ fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(234,88,12,0.8)", fontFamily: "var(--font-inter), sans-serif" }}>
                {subtitle}
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <h2 style={{ fontFamily: "var(--font-space), sans-serif", fontSize: "clamp(1.9rem, 4.5vw, 3.2rem)", fontWeight: 700, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.025em", marginBottom: "3rem" }}>
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
  const [isGenerating, setIsGenerating] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(0);
  const [error, setError] = useState("");
  const isScrolling = useRef(false);

  const set = (field: keyof WizardState, value: unknown) =>
    dispatch({ type: "SET_FIELD", field, value });

  const questionIds = [
    "q-destination-type",
    state.destinationType === "specific" ? "q-destination" : "q-region",
    "q-when",
    state.flexible ? "q-season" : "q-month-year",
    "q-days",
    "q-group-size",
    "q-skill-mix",
    "q-age-range",
    "q-rounds",
    "q-course-quality",
    "q-walking",
    "q-must-play",
    "q-lodging",
    "q-dining",
    "q-nightlife",
    "q-activities",
    "q-budget",
    "q-priorities",
    "q-special",
    "q-roster",
  ];

  const totalQuestions = questionIds.length;

  const scrollToQuestion = useCallback((index: number) => {
    if (isScrolling.current) return;
    const id = questionIds[index];
    if (!id) return;
    const el = document.getElementById(id);
    if (el) {
      isScrolling.current = true;
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => { isScrolling.current = false; }, 800);
    }
  }, [questionIds]);

  const advance = useCallback((toIndex: number) => {
    if (toIndex + 1 > revealedCount) {
      setRevealedCount(toIndex + 1);
      setTimeout(() => scrollToQuestion(toIndex), 100);
    } else {
      scrollToQuestion(toIndex);
    }
  }, [revealedCount, scrollToQuestion]);

  const setAndAdvance = (field: keyof WizardState, value: unknown) => {
    set(field, value);
    setTimeout(() => advance(revealedCount), 350);
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

      await res.json();
      setConfirmed(true);
      setTimeout(() => { window.location.href = "/?skip=1"; }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
      setIsGenerating(false);
    } finally {
      clearInterval(interval);
    }
  };

  // ── Loading / Confirmation overlay ──
  if (isGenerating || confirmed) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center text-center px-6" style={{ background: "#000" }}>
        <AnimatePresence mode="wait">
          {confirmed ? (
            <motion.div
              key="confirmed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-8"
            >
              <Logo className="w-16 h-16 opacity-80" />
              <div>
                <p style={{ fontFamily: "var(--font-script), cursive", fontSize: "clamp(1.6rem, 4vw, 2.8rem)", color: "rgba(255,255,255,0.9)", marginBottom: "1rem" }}>
                  We&rsquo;ve got your plan.
                </p>
                <p className="font-body text-text-muted text-base">
                  We&rsquo;ll be in touch soon. Taking you home&hellip;
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div key="loading" className="flex flex-col items-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                className="mb-10"
              >
                <Logo className="w-16 h-16 opacity-60" />
              </motion.div>
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
              <div className="mt-10 w-48 h-px bg-border overflow-hidden">
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
  let qIndex = 0;

  const inputClass = "w-full bg-transparent border-b border-white/20 px-0 py-4 text-white font-body text-xl placeholder:text-white/25 focus:border-white/60 focus:outline-none transition-colors text-center";
  const selectClass = "bg-transparent border-b border-white/20 px-0 py-4 text-white font-body text-base focus:border-white/60 focus:outline-none transition-colors appearance-none text-center w-full";

  const ContinueBtn = ({ onClick, label = "Continue" }: { onClick: () => void; label?: string }) => (
    <button
      onClick={onClick}
      style={{
        marginTop: "3rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        width: "100%",
        background: "none",
        border: "none",
        cursor: "pointer",
        color: "rgba(255,255,255,0.5)",
        fontSize: "0.72rem",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        fontFamily: "var(--font-inter), sans-serif",
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
    <div id="main-content" style={{ background: "#000" }}>
      {/* Fixed progress bar — thin white line */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, height: 2, background: "rgba(255,255,255,0.08)" }}>
        <motion.div
          style={{ height: "100%", background: "#fff", transformOrigin: "left" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>

      {/* Back link — fixed top-left, matching other pages */}
      <div style={{ position: "fixed", top: "1.2rem", left: "clamp(1.5rem, 6vw, 6rem)", zIndex: 100 }}>
        <Link
          href="/?skip=1"
          style={{ fontFamily: "var(--font-script), cursive", fontSize: "1.1rem", color: "rgba(255,255,255,0.35)", textDecoration: "none" }}
        >
          ← back
        </Link>
      </div>

      {/* Q1: Destination Type */}
      <Question
        number={qIndex + 1}
        total={totalQuestions}
        title="Where's the crew headed?"
        subtitle="Destination"
        id={questionIds[qIndex]}
      >
        <div className="grid grid-cols-2 gap-4">
          <SelectionCard
            label="Specific place"
            sublabel="I know where we're going"
            selected={state.destinationType === "specific"}
            onClick={() => setAndAdvance("destinationType", "specific")}
          />
          <SelectionCard
            label="Pick a region"
            sublabel="Let AI suggest a spot"
            selected={state.destinationType === "region"}
            onClick={() => setAndAdvance("destinationType", "region")}
          />
        </div>
      </Question>

      {/* Q2: Destination / Region */}
      {(qIndex = 1, revealedCount > 1) && (
        state.destinationType === "specific" ? (
          <Question
            number={qIndex + 1}
            total={totalQuestions}
            title="What's the destination?"
            id={questionIds[qIndex]}
          >
            <input
              type="text"
              placeholder="e.g. Scottsdale, AZ or Pinehurst, NC"
              value={state.destination}
              onChange={(e) => set("destination", e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && state.destination) advance(revealedCount);
              }}
              autoFocus
              className={inputClass}
            />
            {state.destination && <ContinueBtn onClick={() => advance(revealedCount)} />}
          </Question>
        ) : (
          <Question
            number={qIndex + 1}
            total={totalQuestions}
            title="What region sounds good?"
            id={questionIds[qIndex]}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {REGIONS.map((r) => (
                <SelectionCard
                  key={r.label}
                  label={r.label}
                  sublabel={r.sublabel}
                  selected={state.region === r.label}
                  onClick={() => setAndAdvance("region", r.label)}
                />
              ))}
            </div>
          </Question>
        )
      )}

      {/* Q3: When */}
      {(qIndex = 2, revealedCount > 2) && (
        <Question
          number={qIndex + 1}
          total={totalQuestions}
          title="Got specific dates in mind?"
          subtitle="When"
          id={questionIds[qIndex]}
        >
          <div className="grid grid-cols-2 gap-4">
            <SelectionCard
              label="Specific month"
              sublabel="I know when"
              selected={!state.flexible}
              onClick={() => setAndAdvance("flexible", false)}
            />
            <SelectionCard
              label="Flexible"
              sublabel="Pick a season"
              selected={state.flexible}
              onClick={() => setAndAdvance("flexible", true)}
            />
          </div>
        </Question>
      )}

      {/* Q4: Season or Month/Year */}
      {(qIndex = 3, revealedCount > 3) && (
        state.flexible ? (
          <Question
            number={qIndex + 1}
            total={totalQuestions}
            title="What season works best?"
            id={questionIds[qIndex]}
          >
            <div className="grid grid-cols-3 gap-4">
              {SEASONS.map((s) => (
                <SelectionCard
                  key={s}
                  label={s}
                  selected={state.preferredSeason === s}
                  onClick={() => setAndAdvance("preferredSeason", s)}
                />
              ))}
            </div>
          </Question>
        ) : (
          <Question
            number={qIndex + 1}
            total={totalQuestions}
            title="What month and year?"
            id={questionIds[qIndex]}
          >
            <div className="grid grid-cols-2 gap-4">
              <select
                value={state.tripMonth}
                onChange={(e) => set("tripMonth", e.target.value)}
                className={selectClass}
              >
                <option value="">Month</option>
                {MONTHS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <select
                value={state.tripYear}
                onChange={(e) => set("tripYear", e.target.value)}
                className={selectClass}
              >
                <option value="">Year</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
              </select>
            </div>
            {state.tripMonth && state.tripYear && (
              <ContinueBtn onClick={() => advance(revealedCount)} />
            )}
          </Question>
        )
      )}

      {/* Q5: Number of days */}
      {(qIndex = 4, revealedCount > 4) && (
        <Question number={qIndex + 1} total={totalQuestions} title="How many days?" id={questionIds[qIndex]}>
          <div className="grid grid-cols-3 gap-4">
            {[3, 4, 5].map((d) => (
              <SelectionCard
                key={d}
                label={`${d} days`}
                sublabel={d === 3 ? "The TDF standard" : undefined}
                selected={state.numberOfDays === d}
                onClick={() => setAndAdvance("numberOfDays", d)}
              />
            ))}
          </div>
        </Question>
      )}

      {/* Q6: Group size */}
      {(qIndex = 5, revealedCount > 5) && (
        <Question number={qIndex + 1} total={totalQuestions} title="How many devils are coming?" subtitle="The Crew" id={questionIds[qIndex]}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem" }}>
            <button
              onClick={() => set("groupSize", Math.max(4, state.groupSize - 1))}
              style={{ width: 52, height: 52, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)", background: "transparent", color: "#fff", fontSize: "1.5rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 0.2s" }}
            >
              −
            </button>
            <span style={{ fontFamily: "var(--font-space), sans-serif", fontSize: "6rem", fontWeight: 700, color: "#fff", lineHeight: 1, minWidth: "5rem", textAlign: "center" }}>
              {state.groupSize}
            </span>
            <button
              onClick={() => set("groupSize", Math.min(32, state.groupSize + 1))}
              style={{ width: 52, height: 52, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)", background: "transparent", color: "#fff", fontSize: "1.5rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 0.2s" }}
            >
              +
            </button>
          </div>
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.8rem", marginTop: "1rem", letterSpacing: "0.05em" }}>
            12–16 is the sweet spot. Min 4, max 32.
          </p>
          <ContinueBtn onClick={() => advance(revealedCount)} />
        </Question>
      )}

      {/* Q7: Skill mix */}
      {(qIndex = 6, revealedCount > 6) && (
        <Question number={qIndex + 1} total={totalQuestions} title="What's the skill mix?" id={questionIds[qIndex]}>
          <div className="grid grid-cols-2 gap-4">
            {["All similar", "Wide range", "Mostly beginners", "Here for the vibes"].map((s) => (
              <SelectionCard
                key={s}
                label={s}
                selected={state.skillMix === s}
                onClick={() => setAndAdvance("skillMix", s)}
                compact
              />
            ))}
          </div>
        </Question>
      )}

      {/* Q8: Age range */}
      {(qIndex = 7, revealedCount > 7) && (
        <Question number={qIndex + 1} total={totalQuestions} title="Average age range?" id={questionIds[qIndex]}>
          <div className="grid grid-cols-4 gap-4">
            {["20s", "30s", "40s", "Mixed"].map((a) => (
              <SelectionCard
                key={a}
                label={a}
                selected={state.ageRange === a}
                onClick={() => setAndAdvance("ageRange", a)}
                compact
              />
            ))}
          </div>
        </Question>
      )}

      {/* Q9: Rounds per day */}
      {(qIndex = 8, revealedCount > 8) && (
        <Question number={qIndex + 1} total={totalQuestions} title="How much golf can you handle?" subtitle="The Golf" id={questionIds[qIndex]}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "One (18)", sublabel: "Casual pace" },
              { label: "Two (36)", sublabel: "The TDF way" },
              { label: "Let AI decide", sublabel: "Based on vibe" },
            ].map((r) => (
              <SelectionCard
                key={r.label}
                label={r.label}
                sublabel={r.sublabel}
                selected={state.roundsPerDay === r.label}
                onClick={() => setAndAdvance("roundsPerDay", r.label)}
              />
            ))}
          </div>
        </Question>
      )}

      {/* Q10: Course quality */}
      {(qIndex = 9, revealedCount > 9) && (
        <Question number={qIndex + 1} total={totalQuestions} title="What kind of courses?" id={questionIds[qIndex]}>
          <div className="grid grid-cols-2 gap-4">
            {["Cheap & fun", "Mix of public & resort", "Bucket list only", "Whatever fits budget"].map((q) => (
              <SelectionCard
                key={q}
                label={q}
                selected={state.courseQuality === q}
                onClick={() => setAndAdvance("courseQuality", q)}
                compact
              />
            ))}
          </div>
        </Question>
      )}

      {/* Q11: Walking or riding */}
      {(qIndex = 10, revealedCount > 10) && (
        <Question number={qIndex + 1} total={totalQuestions} title="Walking or riding?" id={questionIds[qIndex]}>
          <div className="grid grid-cols-3 gap-4">
            {["Walking", "Riding", "Mix / Don't care"].map((w) => (
              <SelectionCard
                key={w}
                label={w}
                selected={state.walkingOrRiding === w}
                onClick={() => setAndAdvance("walkingOrRiding", w)}
                compact
              />
            ))}
          </div>
        </Question>
      )}

      {/* Q12: Must-play courses */}
      {(qIndex = 11, revealedCount > 11) && (
        <Question number={qIndex + 1} total={totalQuestions} title="Any must-play courses?" id={questionIds[qIndex]}>
          <input
            type="text"
            placeholder="e.g. Bandon Dunes, Pebble Beach (or leave blank)"
            value={state.mustPlayCourses}
            onChange={(e) => set("mustPlayCourses", e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") advance(revealedCount); }}
            className={inputClass}
          />
          <ContinueBtn onClick={() => advance(revealedCount)} label={state.mustPlayCourses ? "Continue" : "Skip"} />
        </Question>
      )}

      {/* Q13: Lodging */}
      {(qIndex = 12, revealedCount > 12) && (
        <Question number={qIndex + 1} total={totalQuestions} title="Where's everyone sleeping?" subtitle="Off-Course" id={questionIds[qIndex]}>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "One big house", sublabel: "The TDF way" },
              { label: "Hotel / Resort", sublabel: "Separate rooms" },
              { label: "Split houses", sublabel: "Smaller groups" },
              { label: "Don't care", sublabel: "AI decides" },
            ].map((l) => (
              <SelectionCard
                key={l.label}
                label={l.label}
                sublabel={l.sublabel}
                selected={state.lodging === l.label}
                onClick={() => setAndAdvance("lodging", l.label)}
              />
            ))}
          </div>
        </Question>
      )}

      {/* Q14: Dining */}
      {(qIndex = 13, revealedCount > 13) && (
        <Question number={qIndex + 1} total={totalQuestions} title="How are you eating?" id={questionIds[qIndex]}>
          <div className="grid grid-cols-2 gap-4">
            {["Steakhouses", "Casual & local", "Private chef", "Mix"].map((d) => (
              <SelectionCard
                key={d}
                label={d}
                selected={state.dining === d}
                onClick={() => setAndAdvance("dining", d)}
                compact
              />
            ))}
          </div>
        </Question>
      )}

      {/* Q15: Nightlife */}
      {(qIndex = 14, revealedCount > 14) && (
        <Question number={qIndex + 1} total={totalQuestions} title="What's the nightlife situation?" id={questionIds[qIndex]}>
          <div className="grid grid-cols-2 gap-4">
            {["Going out every night", "Couple nights", "In bed by 10", "Point us to a bar"].map((n) => (
              <SelectionCard
                key={n}
                label={n}
                selected={state.nightlife === n}
                onClick={() => setAndAdvance("nightlife", n)}
                compact
              />
            ))}
          </div>
        </Question>
      )}

      {/* Q16: Activities */}
      {(qIndex = 15, revealedCount > 15) && (
        <Question number={qIndex + 1} total={totalQuestions} title="Any off-course activities?" id={questionIds[qIndex]}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}>
            {ACTIVITIES.map((a) => (
              <button
                key={a}
                onClick={() => dispatch({ type: "TOGGLE_ACTIVITY", activity: a })}
                style={{
                  padding: "0.6rem 1.4rem",
                  borderRadius: 4,
                  border: state.activities.includes(a) ? "1px solid #fff" : "1px solid rgba(255,255,255,0.15)",
                  background: state.activities.includes(a) ? "#fff" : "transparent",
                  color: state.activities.includes(a) ? "#000" : "rgba(255,255,255,0.6)",
                  fontSize: "0.8rem",
                  letterSpacing: "0.06em",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  fontFamily: "var(--font-inter), sans-serif",
                }}
              >
                {a}
              </button>
            ))}
          </div>
          <ContinueBtn onClick={() => advance(revealedCount)} />
        </Question>
      )}

      {/* Q17: Budget */}
      {(qIndex = 16, revealedCount > 16) && (
        <Question number={qIndex + 1} total={totalQuestions} title="What's the per-person budget?" subtitle="Budget" id={questionIds[qIndex]}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {["Under $500", "$500\u2013$1K", "$1K\u2013$2K", "$2K+", "Money is no object"].map((b) => (
              <SelectionCard
                key={b}
                label={b}
                selected={state.budget === b}
                onClick={() => setAndAdvance("budget", b)}
                compact
              />
            ))}
          </div>
        </Question>
      )}

      {/* Q18: Budget priorities */}
      {(qIndex = 17, revealedCount > 17) && (
        <Question number={qIndex + 1} total={totalQuestions} title="Where should the money go?" id={questionIds[qIndex]}>
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.75rem", letterSpacing: "0.08em", marginBottom: "2rem", marginTop: "-1.5rem" }}>Pick up to 2</p>
          <div className="grid grid-cols-2 gap-4">
            {["Best courses", "Best lodging", "Best dining", "Keep balanced"].map((p) => (
              <SelectionCard
                key={p}
                label={p}
                selected={state.budgetPriorities.includes(p)}
                onClick={() => dispatch({ type: "TOGGLE_PRIORITY", priority: p })}
                compact
              />
            ))}
          </div>
          {state.budgetPriorities.length > 0 && (
            <ContinueBtn onClick={() => advance(revealedCount)} />
          )}
        </Question>
      )}

      {/* Q19: Special requests */}
      {(qIndex = 18, revealedCount > 18) && (
        <Question number={qIndex + 1} total={totalQuestions} title="Anything else we should know?" id={questionIds[qIndex]}>
          <textarea
            placeholder="Bachelor party, someone's 40th, accessibility needs, allergies..."
            value={state.specialRequests}
            onChange={(e) => set("specialRequests", e.target.value)}
            rows={4}
            style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: "1rem 0", color: "#fff", fontFamily: "var(--font-inter), sans-serif", fontSize: "1rem", resize: "none", outline: "none", textAlign: "center" }}
            className="placeholder:text-white/25"
          />
          <ContinueBtn onClick={() => advance(revealedCount)} label={state.specialRequests ? "Continue" : "Skip"} />
        </Question>
      )}

      {/* Q20: Roster */}
      {(qIndex = 19, revealedCount > 19) && (
        <motion.section
          id={questionIds[qIndex]}
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "6rem 2rem", textAlign: "center" }}
        >
          <div style={{ maxWidth: 560, margin: "0 auto", width: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginBottom: "2rem" }}>
              <span style={{ fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-inter), sans-serif" }}>
                {String(qIndex + 1).padStart(2, "0")} / {String(totalQuestions).padStart(2, "0")}
              </span>
              <span style={{ width: 20, height: 1, background: "rgba(255,255,255,0.12)", display: "inline-block" }} />
              <span style={{ fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(234,88,12,0.8)", fontFamily: "var(--font-inter), sans-serif" }}>
                The Roster
              </span>
            </div>
            <h2 style={{ fontFamily: "var(--font-space), sans-serif", fontSize: "clamp(1.9rem, 4.5vw, 3.2rem)", fontWeight: 700, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.025em", marginBottom: "3rem" }}>
              Who&rsquo;s organizing?
            </h2>

            <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ color: "#f87171", fontSize: "0.8rem", fontFamily: "var(--font-inter), sans-serif" }}
                >
                  {error}
                </motion.p>
              )}

              <motion.button
                onClick={handleGenerate}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                style={{ width: "100%", padding: "1.1rem", background: "#fff", color: "#000", border: "none", borderRadius: 4, fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: "var(--font-inter), sans-serif" }}
              >
                Generate My Trip Plan
              </motion.button>
            </div>
          </div>
        </motion.section>
      )}

      {/* Bottom spacer */}
      <div style={{ height: "20vh" }} />
    </div>
  );
}
