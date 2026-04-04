"use client";

import Image from "next/image";
import { motion } from "motion/react";

interface SelectionCardProps {
  label: string;
  sublabel?: React.ReactNode;
  selected: boolean;
  onClick: () => void;
  compact?: boolean;
}

export default function SelectionCard({ label, sublabel, selected, onClick, compact }: SelectionCardProps) {
  const isTdfEndorsed = sublabel === "tdf-endorsed";

  return (
    <motion.button
      onClick={onClick}
      aria-label={label}
      aria-pressed={selected}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{
        textAlign: "center",
        borderRadius: 4,
        border: selected ? "1px solid #fff" : "1px solid rgba(255,255,255,0.12)",
        background: selected ? "#fff" : "transparent",
        padding: compact ? "1rem 1.2rem" : "1.4rem 1.7rem",
        cursor: "pointer",
        transition: "background 0.2s, border-color 0.2s",
        width: "100%",
        minHeight: 48,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      {isTdfEndorsed && (
        <Image src="/icon-fancy.png" alt="Tour de Fore endorsed selection" width={72} height={72} style={{ marginBottom: "0.4rem" }} />
      )}
      <span style={{
        display: "block",
        fontFamily: "var(--font-inter), sans-serif",
        fontSize: compact ? "0.96rem" : "1.05rem",
        fontWeight: 500,
        letterSpacing: "0.02em",
        color: selected ? "#000" : "rgba(255,255,255,0.75)",
        transition: "color 0.2s",
      }}>
        {label}
      </span>
      {sublabel && !isTdfEndorsed && (
        <span style={{
          display: "block",
          fontSize: "0.84rem",
          color: selected ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.5)",
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
