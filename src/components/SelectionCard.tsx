"use client";

import { motion } from "motion/react";

interface SelectionCardProps {
  label: string;
  sublabel?: string;
  selected: boolean;
  onClick: () => void;
  compact?: boolean;
}

export default function SelectionCard({
  label,
  sublabel,
  selected,
  onClick,
  compact,
}: SelectionCardProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`text-left rounded-lg border transition-all duration-300 ${
        compact ? "px-5 py-4" : "px-7 py-6"
      } ${
        selected
          ? "bg-accent/10 border-accent shadow-md"
          : "bg-bg-card border-border hover:border-accent/30 hover:shadow-sm"
      }`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <span
        className={`font-body text-sm font-medium transition-colors duration-300 ${
          selected ? "text-accent" : "text-text"
        }`}
      >
        {label}
      </span>
      {sublabel && (
        <span className="block text-xs text-text-dim font-body mt-1">
          {sublabel}
        </span>
      )}
    </motion.button>
  );
}
