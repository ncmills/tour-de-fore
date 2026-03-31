"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import Logo from "./Logo";

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

export default function AutoGenerateClient() {
  const searchParams = useSearchParams();
  const [loadingMsg, setLoadingMsg] = useState(0);
  const [error, setError] = useState("");
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const wid = searchParams.get("wid");
    if (!wid) {
      setError("Missing plan data. Please try planning again.");
      return;
    }

    const interval = setInterval(() => {
      setLoadingMsg((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2500);

    (async () => {
      try {
        // Fetch wizard state from Redis
        const stateRes = await fetch(`/api/wizard-state?wid=${wid}`);
        if (!stateRes.ok) {
          throw new Error("Could not retrieve your plan selections. Please try again.");
        }
        const { state } = await stateRes.json();

        // Generate the plan
        const res = await fetch("/api/generate-plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(state),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || "Failed to generate plan. Please try again.");
        }

        const data = await res.json();
        window.location.href = `/plan/result/${data.planId}`;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        clearInterval(interval);
      }
    })();

    return () => clearInterval(interval);
  }, [searchParams]);

  if (error) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center text-center px-6" style={{ background: "#000" }}>
        <Logo className="w-12 h-12 opacity-40 mb-6" />
        <p className="text-red-400 text-base max-w-sm mb-6">{error}</p>
        <a
          href="/plan-a-trip"
          style={{
            padding: "0.8rem 2rem",
            background: "rgba(220,38,38,0.9)",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            fontSize: "0.9rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            textDecoration: "none",
            fontFamily: "var(--font-plan-block), sans-serif",
          }}
        >
          Try Again
        </a>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center text-center px-6" style={{ background: "#000" }}>
      <Logo className="w-16 h-16 opacity-80 mb-4" />
      <p style={{ fontFamily: "var(--font-plan-groovy), cursive", fontSize: "clamp(1.6rem, 4vw, 2.8rem)", color: "rgba(255,255,255,0.9)", marginBottom: "1rem" }}>
        The devils are building your trip.
      </p>
      <AnimatePresence mode="wait">
        <motion.p
          key={loadingMsg}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="text-xl md:text-2xl"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          {LOADING_MESSAGES[loadingMsg]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
