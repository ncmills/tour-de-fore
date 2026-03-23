"use client";

import { useReducer, useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { WizardState, initialWizardState } from "@/lib/plan-types";
import SelectionCard from "./SelectionCard";
import AttendeeForm from "./AttendeeForm";
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
    <section
      id={id}
      className="min-h-screen flex flex-col justify-center py-20 md:py-28"
    >
      <div className="max-w-2xl mx-auto w-full px-6 md:px-12">
        <div className="flex items-center gap-4 mb-8">
          <span className="text-[11px] tracking-[0.15em] uppercase text-[#e85d26] font-body font-medium">
            {String(number).padStart(2, "0")}
          </span>
          <div className="w-8 h-px bg-[#e85d26]" />
          <span className="text-[11px] tracking-[0.15em] uppercase text-[#5a5550] font-body">
            of {total}
          </span>
        </div>
        {subtitle && (
          <p className="text-[11px] tracking-[0.15em] uppercase text-[#e85d26] font-body font-medium mb-4">
            {subtitle}
          </p>
        )}
        <h2 className="font-display text-3xl md:text-5xl text-text leading-snug mb-12">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

export default function PlanWizardClient() {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialWizardState);
  const [revealedCount, setRevealedCount] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(0);
  const [error, setError] = useState("");
  const [consent, setConsent] = useState(false);
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

  const setAndAdvance = (field: keyof WizardState, value: unknown, qIndex: number) => {
    set(field, value);
    setTimeout(() => advance(qIndex + 1), 350);
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
    const filledAttendees = state.attendees.filter((a) => a.name && a.email);
    const totalFilled = (state.organizerName && state.organizerEmail ? 1 : 0) + filledAttendees.length;
    if (totalFilled < 8) {
      setError("You need at least 8 people total (including yourself).");
      return;
    }
    if (!state.organizerName || !state.organizerEmail) {
      setError("Please fill in your name and email.");
      return;
    }
    if (!consent) {
      setError("Please agree to share attendee emails.");
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

      const { planId } = await res.json();
      router.push(`/plan/result/${planId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
      setIsGenerating(false);
    } finally {
      clearInterval(interval);
    }
  };

  // ── Loading Screen ──
  if (isGenerating) {
    return (
      <div className="fixed inset-0 bg-[#0f0f0f] z-50 flex flex-col items-center justify-center">
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
            className="font-body text-xl md:text-2xl text-[#8a8580]"
          >
            {LOADING_MESSAGES[loadingMsg]}
          </motion.p>
        </AnimatePresence>
        <div className="mt-10 w-48 h-px bg-[#2a2a2a] overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#e85d26] to-[#c9a84c]"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
        </div>
      </div>
    );
  }

  const progress = Math.min((revealedCount / totalQuestions) * 100, 100);
  let qIndex = 0;

  const inputClass = "w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-6 py-5 text-text font-body text-lg placeholder:text-[#5a5550]/50 focus:border-[#e85d26]/50 focus:outline-none transition-colors";
  const selectClass = "bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-5 py-4 text-text font-body text-base focus:border-[#e85d26]/50 focus:outline-none transition-colors appearance-none";
  const continueClass = "mt-6 text-[11px] tracking-[0.15em] uppercase font-body text-[#e85d26] hover:text-[#d14a18] transition-colors flex items-center gap-2";
  const continueArrow = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  );

  return (
    <div id="main-content" className="bg-[#0f0f0f]">
      {/* Fixed progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-[#2a2a2a]">
        <motion.div
          className="h-full bg-gradient-to-r from-[#e85d26] to-[#c9a84c]"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>

      {/* Fixed header */}
      <div className="fixed top-1 left-0 right-0 z-40">
        <div className="pt-6 pb-4 px-6 md:px-12 flex items-center justify-between max-w-5xl mx-auto bg-[#0f0f0f]/80 backdrop-blur-sm rounded-b-lg">
          <Link href="/" className="flex items-center gap-3 group">
            <Logo className="w-7 h-7" />
            <span className="font-display text-xl text-text/60 group-hover:text-text transition-colors">
              TOUR DE FORE
            </span>
          </Link>
          <span className="text-[11px] tracking-[0.15em] uppercase text-[#5a5550] font-body">
            {revealedCount} / {totalQuestions}
          </span>
        </div>
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
            onClick={() => setAndAdvance("destinationType", "specific", qIndex)}
          />
          <SelectionCard
            label="Pick a region"
            sublabel="Let AI suggest a spot"
            selected={state.destinationType === "region"}
            onClick={() => setAndAdvance("destinationType", "region", qIndex)}
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
                if (e.key === "Enter" && state.destination) advance(qIndex + 1);
              }}
              autoFocus
              className={inputClass}
            />
            {state.destination && (
              <button onClick={() => advance(qIndex + 1)} className={continueClass}>
                Continue {continueArrow}
              </button>
            )}
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
                  onClick={() => setAndAdvance("region", r.label, qIndex)}
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
              onClick={() => setAndAdvance("flexible", false, qIndex)}
            />
            <SelectionCard
              label="Flexible"
              sublabel="Pick a season"
              selected={state.flexible}
              onClick={() => setAndAdvance("flexible", true, qIndex)}
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
                  onClick={() => setAndAdvance("preferredSeason", s, qIndex)}
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
              <button onClick={() => advance(qIndex + 1)} className={continueClass}>
                Continue {continueArrow}
              </button>
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
                onClick={() => setAndAdvance("numberOfDays", d, qIndex)}
              />
            ))}
          </div>
        </Question>
      )}

      {/* Q6: Group size */}
      {(qIndex = 5, revealedCount > 5) && (
        <Question number={qIndex + 1} total={totalQuestions} title="How many devils are coming?" subtitle="The Crew" id={questionIds[qIndex]}>
          <div className="flex items-center gap-6">
            <button
              onClick={() => set("groupSize", Math.max(4, state.groupSize - 1))}
              className="w-14 h-14 rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] text-text hover:border-[#e85d26]/30 transition-colors flex items-center justify-center text-2xl"
            >
              −
            </button>
            <span className="font-display text-7xl text-[#e85d26] w-24 text-center">
              {state.groupSize}
            </span>
            <button
              onClick={() => set("groupSize", Math.min(32, state.groupSize + 1))}
              className="w-14 h-14 rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] text-text hover:border-[#e85d26]/30 transition-colors flex items-center justify-center text-2xl"
            >
              +
            </button>
          </div>
          <p className="text-[#5a5550] text-sm font-body mt-4">
            12–16 is the sweet spot. Min 4, max 32.
          </p>
          <button onClick={() => advance(qIndex + 1)} className={`mt-8 ${continueClass}`}>
            Continue {continueArrow}
          </button>
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
                onClick={() => setAndAdvance("skillMix", s, qIndex)}
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
                onClick={() => setAndAdvance("ageRange", a, qIndex)}
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
                onClick={() => setAndAdvance("roundsPerDay", r.label, qIndex)}
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
                onClick={() => setAndAdvance("courseQuality", q, qIndex)}
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
                onClick={() => setAndAdvance("walkingOrRiding", w, qIndex)}
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
            onKeyDown={(e) => { if (e.key === "Enter") advance(qIndex + 1); }}
            className={inputClass}
          />
          <button onClick={() => advance(qIndex + 1)} className={continueClass}>
            {state.mustPlayCourses ? "Continue" : "Skip"} {continueArrow}
          </button>
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
                onClick={() => setAndAdvance("lodging", l.label, qIndex)}
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
                onClick={() => setAndAdvance("dining", d, qIndex)}
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
                onClick={() => setAndAdvance("nightlife", n, qIndex)}
                compact
              />
            ))}
          </div>
        </Question>
      )}

      {/* Q16: Activities */}
      {(qIndex = 15, revealedCount > 15) && (
        <Question number={qIndex + 1} total={totalQuestions} title="Any off-course activities?" id={questionIds[qIndex]}>
          <div className="flex flex-wrap gap-3">
            {ACTIVITIES.map((a) => (
              <button
                key={a}
                onClick={() => dispatch({ type: "TOGGLE_ACTIVITY", activity: a })}
                className={`px-5 py-3 rounded-lg border text-sm font-body transition-all duration-300 ${
                  state.activities.includes(a)
                    ? "bg-[#e85d26]/10 border-[#e85d26] text-[#e85d26]"
                    : "bg-[#1f1f1f] border-[#2a2a2a] text-[#8a8580] hover:border-[#e85d26]/30"
                }`}
              >
                {a}
              </button>
            ))}
          </div>
          <button onClick={() => advance(qIndex + 1)} className={`mt-8 ${continueClass}`}>
            Continue {continueArrow}
          </button>
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
                onClick={() => setAndAdvance("budget", b, qIndex)}
                compact
              />
            ))}
          </div>
        </Question>
      )}

      {/* Q18: Budget priorities */}
      {(qIndex = 17, revealedCount > 17) && (
        <Question number={qIndex + 1} total={totalQuestions} title="Where should the money go?" id={questionIds[qIndex]}>
          <p className="text-[#5a5550] text-sm font-body mb-6 -mt-6">Pick up to 2</p>
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
            <button onClick={() => advance(qIndex + 1)} className={`mt-8 ${continueClass}`}>
              Continue {continueArrow}
            </button>
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
            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-6 py-5 text-text font-body text-base placeholder:text-[#5a5550]/50 focus:border-[#e85d26]/50 focus:outline-none transition-colors resize-none"
          />
          <button onClick={() => advance(qIndex + 1)} className={continueClass}>
            {state.specialRequests ? "Continue" : "Skip"} {continueArrow}
          </button>
        </Question>
      )}

      {/* Q20: Roster */}
      {(qIndex = 19, revealedCount > 19) && (
        <section id={questionIds[qIndex]} className="min-h-screen flex flex-col justify-center py-20 md:py-28">
          <div className="max-w-2xl mx-auto w-full px-6 md:px-12">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[11px] tracking-[0.15em] uppercase text-[#e85d26] font-body font-medium">
                {String(qIndex + 1).padStart(2, "0")}
              </span>
              <div className="w-8 h-px bg-[#e85d26]" />
              <span className="text-[11px] tracking-[0.15em] uppercase text-[#5a5550] font-body">
                of {totalQuestions}
              </span>
            </div>
            <p className="text-[11px] tracking-[0.15em] uppercase text-[#e85d26] font-body font-medium mb-4">
              The Roster
            </p>
            <h2 className="font-display text-3xl md:text-5xl text-text leading-snug mb-12">
              WHO&rsquo;S COMING?
            </h2>

            <div className="space-y-10">
              <AttendeeForm
                organizerName={state.organizerName}
                organizerEmail={state.organizerEmail}
                attendees={state.attendees}
                onOrganizerChange={(field, value) => set(field, value)}
                onAttendeeChange={(index, field, value) =>
                  dispatch({ type: "SET_ATTENDEE", index, field, value })
                }
                onAddAttendee={() => dispatch({ type: "ADD_ATTENDEE" })}
                onRemoveAttendee={(index) => dispatch({ type: "REMOVE_ATTENDEE", index })}
              />

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 accent-[#e85d26]"
                />
                <span className="text-[#5a5550] text-sm font-body leading-relaxed">
                  I have permission to share these email addresses. Tour de Fore will only use them to send the generated trip plan.
                </span>
              </label>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm font-body"
                >
                  {error}
                </motion.p>
              )}

              <motion.button
                onClick={handleGenerate}
                className="btn-primary w-full py-5 font-body text-sm tracking-[0.15em] uppercase font-medium"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                Generate My Trip Plan
              </motion.button>
            </div>
          </div>
        </section>
      )}

      {/* Bottom spacer */}
      <div className="h-[20vh]" />
    </div>
  );
}
