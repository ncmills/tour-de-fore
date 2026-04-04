"use client";

import { useState, useEffect } from "react";
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
      height: isMobile ? "auto" : "clamp(2.4rem, 4vw, 4rem)",
      minHeight: isMobile ? "clamp(2.4rem, 10vw, 3.6rem)" : undefined,
      marginBottom: isMobile ? "clamp(0.8rem, 2.4vw, 1.2rem)" : "clamp(1rem, 2vw, 1.6rem)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      padding: isMobile ? "0 0.5rem" : undefined,
      maxWidth: isMobile ? "95vw" : undefined,
    }}>
      <AnimatePresence mode="wait">
        <motion.p
          key={idx}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5 }}
          className="neon-tagline-text"
          style={{
            fontFamily: "var(--font-plan-block), sans-serif",
            fontSize: isMobile ? "clamp(1.1rem, 4.5vw, 1.6rem)" : "clamp(1.8rem, 3.5vw, 3.5rem)",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: isMobile ? "0.05em" : "0.1em",
            color: isMobile ? "#ffb088" : "var(--color-neon, #ff6a28)",
            textShadow: isMobile
              ? "0 0 5px rgba(255,106,40,0.56), 0 0 11px rgba(255,60,20,0.32), 0 0 22px rgba(255,40,10,0.16)"
              : "0 0 7px rgba(255,106,40,0.9), 0 0 20px rgba(255,60,20,0.6), 0 0 40px rgba(255,40,10,0.3), 0 0 80px rgba(200,40,10,0.15)",
            WebkitTextStroke: isMobile ? undefined : "0.3px rgba(255,140,60,0.4)",
            whiteSpace: isMobile ? "normal" : "nowrap",
            textAlign: "center" as const,
            lineHeight: isMobile ? 1.3 : undefined,
            margin: 0,
          }}
        >
          <span style={!isMobile && tagline.scale < 1 ? { fontSize: `${tagline.scale}em` } : undefined}>
            {tagline.text}
          </span>
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
