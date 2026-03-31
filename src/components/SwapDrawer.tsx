"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface SwapDrawerProps {
  planId: string;
  destLevel: string;
  category: "courses" | "lodging" | "dining" | "bars";
  currentName: string;
  open: boolean;
  onClose: () => void;
  onSwap: (item: Record<string, unknown>) => void;
}

export default function SwapDrawer({ planId, destLevel, category, currentName, open, onClose, onSwap }: SwapDrawerProps) {
  const [alternatives, setAlternatives] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    setError("");
    fetch("/api/swap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planId, destLevel }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        const items = (data.alternatives?.[category] || []) as Record<string, unknown>[];
        // Filter out the current item
        setAlternatives(items.filter((item) => item.name !== currentName));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [open, planId, destLevel, category, currentName]);

  const categoryLabels: Record<string, string> = {
    courses: "Courses",
    lodging: "Lodging",
    dining: "Restaurants",
    bars: "Bars",
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 200 }}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              position: "fixed", top: 0, right: 0, bottom: 0,
              width: "min(450px, 100vw)",
              background: "#111",
              borderLeft: "1px solid rgba(255,255,255,0.1)",
              zIndex: 201,
              display: "flex", flexDirection: "column",
              padding: "2rem",
              overflowY: "auto",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h3 style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "1.2rem", color: "#EA580C", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Swap {categoryLabels[category]}
              </h3>
              <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: "1.2rem" }}>
                ✕
              </button>
            </div>

            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", marginBottom: "1.5rem" }}>
              Currently: <strong style={{ color: "rgba(255,255,255,0.6)" }}>{currentName}</strong>
            </p>

            {loading && <p style={{ color: "rgba(255,255,255,0.3)" }}>Loading alternatives...</p>}
            {error && <p style={{ color: "#f87171", fontSize: "0.85rem" }}>{error}</p>}

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {alternatives.map((item, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => { onSwap(item); onClose(); }}
                  style={{
                    textAlign: "left",
                    padding: "1rem 1.2rem",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 6,
                    cursor: "pointer",
                    color: "#fff",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.3rem" }}>
                    <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                      {(item.name || item.type || `Option ${i + 1}`) as string}
                    </span>
                    {item.googleRating ? (
                      <span style={{ color: "#D4A843", fontSize: "0.8rem" }}>
                        {String(item.googleRating)}★
                      </span>
                    ) : null}
                  </div>
                  {item.highlight ? (
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", lineHeight: 1.4, marginBottom: "0.3rem" }}>
                      {String(item.highlight)}
                    </p>
                  ) : null}
                  <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                    {item.tier ? <span style={{ fontSize: "0.7rem", color: "#EA580C", textTransform: "uppercase", letterSpacing: "0.05em" }}>{String(item.tier)}</span> : null}
                    {item.greenFeeRange ? <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)" }}>${(item.greenFeeRange as number[])[0]}–${(item.greenFeeRange as number[])[1]}</span> : null}
                    {item.priceRange ? <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)" }}>{String(item.priceRange)}</span> : null}
                    {item.nightlyRange ? <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)" }}>${(item.nightlyRange as number[])[0]}–${(item.nightlyRange as number[])[1]}/night</span> : null}
                    {item.vibe ? <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)" }}>{String(item.vibe)}</span> : null}
                  </div>
                </motion.button>
              ))}
              {!loading && alternatives.length === 0 && !error && (
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.85rem" }}>No other options available for this destination.</p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
