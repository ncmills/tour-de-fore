"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import MulliganButton from "./MulliganButton";

interface Props {
  onShop: () => void;
  onDrink: () => void;
  isDrunk?: boolean;
}

export default function BarScene({ onShop, onDrink, isDrunk }: Props) {
  // If already drunk (coming back from shop), skip straight to drunk phase with shop bubble
  const [phase, setPhase] = useState<"arrive" | "bubbles" | "drinking" | "drunk" | "shopping">(
    isDrunk ? "drunk" : "arrive"
  );

  useEffect(() => {
    if (isDrunk) return; // skip intro if already drunk
    const t = setTimeout(() => setPhase("bubbles"), 1600);
    return () => clearTimeout(t);
  }, [isDrunk]);

  const handleDrink = () => {
    setPhase("drinking");
    onDrink();
    // After "Cheers" message, show the shop bubble again (beer one is gone)
    setTimeout(() => setPhase("drunk"), 2000);
  };

  const handleShop = () => {
    setPhase("shopping");
    setTimeout(onShop, 1000);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 300,
        background: "#1a1610",
        overflow: "hidden",
      }}
    >
      <MulliganButton />

      {/* Bar scene — photo background */}
      <img
        src="/bar-photo.png"
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          display: "block",
        }}
      />

      {/* === SPEECH BUBBLES === */}
      <AnimatePresence>
        {phase === "bubbles" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
            }}
          >
            {/* 🥃 Shot = drink feature (left hand) */}
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: [1, 1.06, 1] }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDrink}
              style={{
                pointerEvents: "auto",
                position: "absolute",
                top: "58%",
                left: "30%",
                transform: "translate(-50%, -50%)",
                background: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(4px)",
                border: "3px solid rgba(245,200,66,0.7)",
                borderRadius: "50%",
                width: "clamp(65px, 11vw, 95px)",
                height: "clamp(65px, 11vw, 95px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "2px",
                cursor: "pointer",
                boxShadow: "0 0 20px rgba(245,200,66,0.3), 0 4px 20px rgba(0,0,0,0.5)",
                userSelect: "none",
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                lineHeight: 1,
              }}
            >
              🥃
              <span style={{ fontSize: "clamp(0.7rem, 1.5vw, 0.75rem)", color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-script), cursive", letterSpacing: "0.05em" }}>drink</span>
            </motion.button>

            {/* 🍺 Beer = shop feature (right hand) */}
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: [1, 1.06, 1] }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleShop}
              style={{
                pointerEvents: "auto",
                position: "absolute",
                top: "55%",
                left: "72%",
                transform: "translate(-50%, -50%)",
                background: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(4px)",
                border: "3px solid rgba(234,88,12,0.7)",
                borderRadius: "50%",
                width: "clamp(65px, 11vw, 95px)",
                height: "clamp(65px, 11vw, 95px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "2px",
                cursor: "pointer",
                boxShadow: "0 0 20px rgba(234,88,12,0.3), 0 4px 20px rgba(0,0,0,0.5)",
                userSelect: "none",
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                lineHeight: 1,
              }}
            >
              🍺
              <span style={{ fontSize: "clamp(0.7rem, 1.5vw, 0.75rem)", color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-script), cursive", letterSpacing: "0.05em" }}>shop</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drunk phase — only shop bubble */}
      <AnimatePresence>
        {phase === "drunk" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
            }}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: [1, 1.06, 1] }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleShop}
              style={{
                pointerEvents: "auto",
                position: "absolute",
                top: "55%",
                left: "72%",
                transform: "translate(-50%, -50%)",
                background: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(4px)",
                border: "3px solid rgba(234,88,12,0.7)",
                borderRadius: "50%",
                width: "clamp(65px, 11vw, 95px)",
                height: "clamp(65px, 11vw, 95px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "2px",
                cursor: "pointer",
                boxShadow: "0 0 20px rgba(234,88,12,0.3), 0 4px 20px rgba(0,0,0,0.5)",
                userSelect: "none",
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                lineHeight: 1,
              }}
            >
              🍺
              <span style={{ fontSize: "clamp(0.7rem, 1.5vw, 0.75rem)", color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-script), cursive", letterSpacing: "0.05em" }}>shop</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drinking overlay */}
      <AnimatePresence>
        {phase === "drinking" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              pointerEvents: "none",
              background: "rgba(0,0,0,0.4)",
            }}
          >
            <motion.p
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              style={{
                fontFamily: "var(--font-scrawl), cursive",
                fontSize: "clamp(2.5rem, 7vw, 5rem)",
                color: "#f5c842",
                textShadow: "0 0 30px rgba(245,200,66,0.5), 0 0 60px rgba(245,200,66,0.2)",
              }}
            >
              Cheers 🍻
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{ fontFamily: "var(--font-script), cursive", fontSize: "clamp(0.9rem, 2vw, 1.2rem)", color: "rgba(255,255,255,0.4)" }}
            >
              now get to the pro shop
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shopping overlay */}
      <AnimatePresence>
        {phase === "shopping" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              pointerEvents: "none",
              background: "rgba(0,0,0,0.5)",
            }}
          >
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 150 }}
              style={{
                fontFamily: "var(--font-scrawl), cursive",
                fontSize: "clamp(2.5rem, 7vw, 5rem)",
                color: "#EA580C",
                textShadow: "0 0 30px rgba(234,88,12,0.5), 0 0 60px rgba(234,88,12,0.2)",
              }}
            >
              Right this way...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
