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
        compact ? "px-4 py-3" : "px-6 py-5"
      } ${
        selected
          ? "bg-[#e85d26]/10 border-[#e85d26] shadow-md"
          : "bg-[#1f1f1f] border-[#2a2a2a] hover:border-[#e85d26]/30 hover:shadow-sm"
      }`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <span
        className={`font-body text-sm font-medium transition-colors duration-300 ${
          selected ? "text-[#e85d26]" : "text-text"
        }`}
      >
        {label}
      </span>
      {sublabel && (
        <span className="block text-[11px] text-[#5a5550] font-body mt-1">
          {sublabel}
        </span>
      )}
    </motion.button>
  );
}
