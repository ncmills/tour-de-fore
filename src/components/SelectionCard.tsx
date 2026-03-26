"use client";

import { motion } from "motion/react";

interface SelectionCardProps {
  label: string;
  sublabel?: string;
  selected: boolean;
  onClick: () => void;
  compact?: boolean;
}

export default function SelectionCard({ label, sublabel, selected, onClick, compact }: SelectionCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{
        textAlign: "center",
        borderRadius: 4,
        border: selected ? "1px solid #fff" : "1px solid rgba(255,255,255,0.12)",
        background: selected ? "#fff" : "transparent",
        padding: compact ? "0.8rem 1rem" : "1.2rem 1.4rem",
        cursor: "pointer",
        transition: "background 0.2s, border-color 0.2s",
        width: "100%",
      }}
    >
      <span style={{
        display: "block",
        fontFamily: "var(--font-inter), sans-serif",
        fontSize: compact ? "0.8rem" : "0.875rem",
        fontWeight: 500,
        letterSpacing: "0.02em",
        color: selected ? "#000" : "rgba(255,255,255,0.75)",
        transition: "color 0.2s",
      }}>
        {label}
      </span>
      {sublabel && (
        <span style={{
          display: "block",
          fontSize: "0.7rem",
          color: selected ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.3)",
          marginTop: "0.25rem",
          fontFamily: "var(--font-inter), sans-serif",
          transition: "color 0.2s",
        }}>
          {sublabel}
        </span>
      )}
    </motion.button>
  );
}
