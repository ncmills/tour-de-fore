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
            {/* Beer bubble — LEFT of bartender's mouth, tail points right toward mouth */}
            <motion.button
              initial={{ opacity: 0, x: -15, scale: 0.5 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDrink}
              style={{
                pointerEvents: "auto",
                position: "absolute",
                top: "30%",
                left: "calc(50% - clamp(70px, 10vw, 120px))",
                transform: "translate(-100%, -50%)",
                background: "#fff",
                padding: "clamp(12px, 2vw, 22px)",
                borderRadius: "20px 20px 4px 20px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 8px 40px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)",
                userSelect: "none",
                fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
                lineHeight: 1,
              }}
            >
              🍺
            </motion.button>

            {/* Money bubble — RIGHT of bartender's mouth, tail points left toward mouth */}
            <motion.button
              initial={{ opacity: 0, x: 15, scale: 0.5 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShop}
              style={{
                pointerEvents: "auto",
                position: "absolute",
                top: "30%",
                left: "calc(50% + clamp(70px, 10vw, 120px))",
                transform: "translateY(-50%)",
                background: "#fff",
                padding: "clamp(12px, 2vw, 22px)",
                borderRadius: "20px 20px 20px 4px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 8px 40px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)",
                userSelect: "none",
                fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
                lineHeight: 1,
              }}
            >
              💰
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
              initial={{ opacity: 0, x: 15, scale: 0.5 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShop}
              style={{
                pointerEvents: "auto",
                position: "absolute",
                top: "30%",
                left: "calc(50% + clamp(70px, 10vw, 120px))",
                transform: "translateY(-50%)",
                background: "#fff",
                padding: "clamp(12px, 2vw, 22px)",
                borderRadius: "20px 20px 20px 4px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 8px 40px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)",
                userSelect: "none",
                fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
                lineHeight: 1,
              }}
            >
              💰
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
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              background: "rgba(0,0,0,0.3)",
            }}
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                fontFamily: "var(--font-script), cursive",
                fontSize: "clamp(2rem, 5vw, 4rem)",
                color: "#f5c842",
                textShadow: "0 0 30px rgba(245,200,66,0.3)",
              }}
            >
              Cheers... 🍻
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
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              background: "rgba(0,0,0,0.4)",
            }}
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                fontFamily: "var(--font-script), cursive",
                fontSize: "clamp(2rem, 5vw, 4rem)",
                color: "rgba(255,255,255,0.8)",
                textShadow: "0 0 30px rgba(234,88,12,0.3)",
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
