"use client";

import { motion } from "motion/react";
import MulliganButton from "./MulliganButton";

export default function BlackPage({ children, heading }: { children: React.ReactNode; heading: string }) {
  return (
    <main style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "0 clamp(1.5rem, 6vw, 6rem)" }}>

      <MulliganButton />

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
