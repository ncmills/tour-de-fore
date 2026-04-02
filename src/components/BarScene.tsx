"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import MulliganButton from "./MulliganButton";
import HomeButton from "./HomeButton";

interface Props {
  onShop: () => void;
  onDrink: () => void;
  isDrunk?: boolean;
}

export default function BarScene({ onShop, onDrink, isDrunk }: Props) {
  // If already drunk (coming back from shop), skip straight to drunk phase with shop bubble
  const [phase, setPhase] = useState<"arrive" | "bubbles" | "drinking" | "drunk" | "sobering" | "shopping">(
    isDrunk ? "drunk" : "arrive"
  );

  const handleSober = () => {
    setPhase("sobering");
    // Dispatch event to undo drunk mode
    window.dispatchEvent(new CustomEvent("tdf-sober"));
    setTimeout(() => setPhase("bubbles"), 1500);
  };

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
      <HomeButton />


      {/* Bar scene — photo background */}
      <img
        src="/bar-photo.png"
        alt="Tour de Fore bar scene background"
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
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "clamp(2rem, 8vw, 6rem)",
              pointerEvents: "none",
            }}
          >
            {/* 🥃 Shot = drink feature */}
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: [1, 1.06, 1] }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDrink}
              className="bar-btn-left"
              style={{
                pointerEvents: "auto",
                background: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(4px)",
                border: "3px solid rgba(245,200,66,0.7)",
                borderRadius: "50%",
                width: "clamp(98px, 16vw, 143px)",
                height: "clamp(98px, 16vw, 143px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "2px",
                cursor: "pointer",
                boxShadow: "0 0 20px rgba(245,200,66,0.3), 0 4px 20px rgba(0,0,0,0.5)",
                userSelect: "none",
                fontSize: "clamp(2.4rem, 4.5vw, 3.6rem)",
                lineHeight: 1,
              }}
            >
              🥃
              <span style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)", color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-script), cursive", letterSpacing: "0.05em" }}>drink</span>
            </motion.button>

            {/* 🍺 Beer = shop feature */}
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: [1, 1.06, 1] }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleShop}
              className="bar-btn-right"
              style={{
                pointerEvents: "auto",
                background: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(4px)",
                border: "3px solid rgba(234,88,12,0.7)",
                borderRadius: "50%",
                width: "clamp(98px, 16vw, 143px)",
                height: "clamp(98px, 16vw, 143px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "2px",
                cursor: "pointer",
                boxShadow: "0 0 20px rgba(234,88,12,0.3), 0 4px 20px rgba(0,0,0,0.5)",
                userSelect: "none",
                fontSize: "clamp(2.4rem, 4.5vw, 3.6rem)",
                lineHeight: 1,
              }}
            >
              🍺
              <span style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)", color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-script), cursive", letterSpacing: "0.05em" }}>shop</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drunk phase — water button (sober up) + shop bubble */}
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
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "clamp(2rem, 8vw, 6rem)",
              pointerEvents: "none",
            }}
          >
            {/* 💧 Water = sober up */}
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: [1, 1.06, 1] }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSober}
              className="bar-btn-left"
              style={{
                pointerEvents: "auto",
                background: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(4px)",
                border: "3px solid rgba(59,130,246,0.7)",
                borderRadius: "50%",
                width: "clamp(98px, 16vw, 143px)",
                height: "clamp(98px, 16vw, 143px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "2px",
                cursor: "pointer",
                boxShadow: "0 0 20px rgba(59,130,246,0.3), 0 4px 20px rgba(0,0,0,0.5)",
                userSelect: "none",
                fontSize: "clamp(2.4rem, 4.5vw, 3.6rem)",
                lineHeight: 1,
              }}
            >
              💧
              <span style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)", color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-script), cursive", letterSpacing: "0.05em" }}>sober up</span>
            </motion.button>

            {/* 🍺 Shop */}
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: [1, 1.06, 1] }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleShop}
              className="bar-btn-right"
              style={{
                pointerEvents: "auto",
                background: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(4px)",
                border: "3px solid rgba(234,88,12,0.7)",
                borderRadius: "50%",
                width: "clamp(98px, 16vw, 143px)",
                height: "clamp(98px, 16vw, 143px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "2px",
                cursor: "pointer",
                boxShadow: "0 0 20px rgba(234,88,12,0.3), 0 4px 20px rgba(0,0,0,0.5)",
                userSelect: "none",
                fontSize: "clamp(2.4rem, 4.5vw, 3.6rem)",
                lineHeight: 1,
              }}
            >
              🍺
              <span style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)", color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-script), cursive", letterSpacing: "0.05em" }}>shop</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sobering up overlay */}
      <AnimatePresence>
        {phase === "sobering" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
                fontSize: "clamp(2rem, 6vw, 4rem)",
                color: "#3b82f6",
                textShadow: "0 0 30px rgba(59,130,246,0.5)",
              }}
            >
              Hydrating... 💧
            </motion.p>
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
