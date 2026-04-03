"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

const TAGLINES = [
  { text: "108 HOLES. THREE DAYS. 0 PARS.", scale: 1 },
  { text: "WHERE LEGENDS ARE CREATED AND HANDICAPS ARE LIES", scale: 1 },
  { text: "FORGET MORE MEMORIES IN A WEEK THAN MOST PEOPLE MAKE IN THEIR LIVES", scale: 0.55 },
];

const CYCLE_INTERVAL = 5000;

interface RotatingTaglineProps {
  isMobile: boolean;
}

// Each character gets its own random flicker timing
function NeonChar({ char, index }: { char: string; index: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (char === " " || !ref.current) return;

    // Each character flickers on its own random schedule
    const baseDelay = 400 + Math.random() * 1200;
    let timeout: NodeJS.Timeout;

    const flicker = () => {
      const el = ref.current;
      if (!el) return;

      // Random flicker pattern: quick blinks
      const blinks = 1 + Math.floor(Math.random() * 3);
      let step = 0;

      const doBlink = () => {
        if (!el) return;
        if (step < blinks * 2) {
          if (step % 2 === 0) {
            // Off
            el.style.opacity = (Math.random() * 0.15).toFixed(2);
            el.style.textShadow = "none";
          } else {
            // On (sometimes dim)
            const brightness = 0.5 + Math.random() * 0.5;
            el.style.opacity = brightness.toFixed(2);
            el.style.textShadow = "";
          }
          step++;
          setTimeout(doBlink, 30 + Math.random() * 80);
        } else {
          // Fully back on
          el.style.opacity = "1";
          el.style.textShadow = "";
          // Schedule next flicker
          timeout = setTimeout(flicker, baseDelay + Math.random() * 2000);
        }
      };

      doBlink();
    };

    // Stagger start per character
    timeout = setTimeout(flicker, index * 80 + Math.random() * 1500);

    return () => clearTimeout(timeout);
  }, [char, index]);

  if (char === " ") return <span>{"\u00A0"}</span>;

  return (
    <span
      ref={ref}
      style={{
        display: "inline-block",
        transition: "none",
      }}
    >
      {char}
    </span>
  );
}

export default function RotatingTagline({ isMobile }: RotatingTaglineProps) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIdx((prev: number) => (prev + 1) % TAGLINES.length);
    }, CYCLE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const tagline = TAGLINES[idx];

  return (
    <div style={{
      height: isMobile ? "clamp(2rem, 7vw, 2.6rem)" : "clamp(2.4rem, 4vw, 4rem)",
      marginBottom: isMobile ? "clamp(0.8rem, 2.4vw, 1.2rem)" : "clamp(1rem, 2vw, 1.6rem)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    }}>
      <AnimatePresence mode="wait">
        <motion.p
          key={idx}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: "var(--font-plan-block), sans-serif",
            fontSize: isMobile ? "clamp(1.4rem, 6vw, 2rem)" : "clamp(1.8rem, 3.5vw, 3.5rem)",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: isMobile ? "#60a5fa" : "#3b82f6",
            textShadow: isMobile
              ? "0 0 4px rgba(59,130,246,0.5), 0 0 10px rgba(30,64,175,0.25)"
              : "0 0 7px rgba(59,130,246,0.9), 0 0 20px rgba(30,64,175,0.6), 0 0 40px rgba(20,40,140,0.3), 0 0 80px rgba(10,20,100,0.15)",
            WebkitTextStroke: isMobile ? undefined : "0.3px rgba(96,165,250,0.4)",
            whiteSpace: "nowrap",
            margin: 0,
          }}
        >
          <span style={tagline.scale < 1 ? { fontSize: `${tagline.scale}em` } : undefined}>
            {tagline.text.split("").map((char, i) => (
              <NeonChar key={`${idx}-${i}`} char={char} index={i} />
            ))}
          </span>
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
