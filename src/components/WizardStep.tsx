"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface WizardStepProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function WizardStep({ title, subtitle, children }: WizardStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full"
    >
      <div className="mb-12">
        <div className="flex items-center gap-5 mb-5">
          <div className="w-12 h-px bg-[#e85d26]" />
          {subtitle && (
            <span className="text-[11px] tracking-[0.15em] uppercase text-[#e85d26] font-body font-medium">
              {subtitle}
            </span>
          )}
        </div>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-text leading-snug">
          {title}
        </h2>
      </div>
      {children}
    </motion.div>
  );
}
