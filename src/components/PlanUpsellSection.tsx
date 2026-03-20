"use client";

import { motion } from "motion/react";

export default function PlanUpsellSection({ planId }: { planId: string }) {
  return (
    <section className="py-24 md:py-32 bg-bg-warm relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 md:px-12 text-center relative z-10">
        <div className="w-12 h-px bg-accent mx-auto mb-6" />
        <span className="text-[10px] tracking-[0.4em] uppercase text-accent font-body font-medium">
          Premium
        </span>

        <h2 className="font-display text-4xl md:text-5xl font-bold text-text mt-6 mb-4 leading-snug">
          Love the plan?
        </h2>
        <p className="font-display text-2xl md:text-3xl italic text-text-muted font-light mb-6">
          Let us book it all for you.
        </p>
        <p className="text-text-muted font-body font-light text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10">
          Our concierge team handles every reservation, tee time, and dinner booking
          so you can focus on what matters — getting the crew together.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a
            href={`mailto:trips@tourdefore.com?subject=Concierge Quote — Plan ${planId.slice(0, 8)}`}
            className="btn-primary inline-flex items-center gap-3 px-8 py-4 rounded-full font-body text-sm tracking-[0.2em] uppercase font-medium"
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
