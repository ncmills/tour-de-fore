"use client";

import { motion } from "motion/react";
import Link from "next/link";

export default function BlackPage({ children, heading }: { children: React.ReactNode; heading: string }) {
  return (
    <main style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "0 clamp(1.5rem, 6vw, 6rem)" }}>

      {/* Back link — fixed top-left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        style={{ position: "fixed", top: "1.2rem", left: "clamp(1.5rem, 6vw, 6rem)", zIndex: 100 }}
      >
        <Link href="/?skip=1" style={{ fontFamily: "var(--font-script), cursive", fontSize: "1.1rem", color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>
          ← back
        </Link>
      </motion.div>

      {/* Section heading writes in — padded below the fixed back button */}
      <div style={{ overflow: "hidden", paddingTop: "4rem" }}>
        <motion.p
          style={{
            fontFamily: "var(--font-script), cursive",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            color: "rgba(255,255,255,0.9)",
            margin: "0 0 3rem",
            clipPath: "inset(0 105% 0 -5px)",
            lineHeight: 1,
          }}
          animate={{ clipPath: "inset(0 -5px 0 -5px)" }}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.25, 0.0, 0.35, 1.0] }}
        >
          {heading}
        </motion.p>
      </div>

      {/* Page content fades in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, delay: 2.2 }}
      >
        {children}
      </motion.div>

    </main>
  );
}
