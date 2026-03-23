"use client";

import { motion } from "motion/react";

export default function PlanUpsellSection({ planId }: { planId: string }) {
  return (
    <section className="py-16 md:py-28 bg-[#1a1a1a] relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 md:px-12 text-center relative z-10">
        <div className="w-12 h-px bg-[#e85d26] mx-auto mb-6" />
        <span className="text-[11px] tracking-[0.15em] uppercase text-[#e85d26] font-body font-medium">
          Premium
        </span>

        <h2 className="font-display text-4xl md:text-5xl text-text mt-6 mb-4 leading-snug">
          LOVE THE PLAN?
        </h2>
        <p className="font-body text-xl md:text-2xl text-[#8a8580] mb-6">
          Let us book it all for you.
        </p>
        <p className="text-[#5a5550] font-body text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10">
          Our concierge team handles every reservation, tee time, and dinner booking
          so you can focus on what matters — getting the crew together.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a
            href={`mailto:trips@tourdefore.com?subject=Concierge Quote — Plan ${planId.slice(0, 8)}`}
            className="btn-primary inline-flex items-center gap-3 px-8 py-4 font-body text-sm tracking-[0.15em] uppercase font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Get a Concierge Quote
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
