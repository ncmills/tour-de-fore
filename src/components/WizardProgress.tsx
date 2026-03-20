"use client";

import { motion } from "motion/react";

const TOTAL_STEPS = 6;

export default function WizardProgress({ currentStep }: { currentStep: number }) {
  const progress = ((currentStep + 1) / TOTAL_STEPS) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-border">
      <motion.div
        className="h-full bg-gradient-to-r from-accent to-accent-light"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      />
    </div>
  );
}
