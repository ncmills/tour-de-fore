"use client";

import Link from "next/link";
import { useState } from "react";
import { trips } from "@/lib/trips";
import { motion, AnimatePresence } from "motion/react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
      <div className="flex items-center justify-between px-6 md:px-12 py-5">
        <Link
          href="/"
          className="font-display text-2xl md:text-3xl font-semibold text-white tracking-wide hover:opacity-70 transition-opacity"
        >
          Tour de Fore
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {trips.map((trip) => (
            <Link
              key={trip.year}
              href={`/trip/${trip.slug}`}
              className={`font-body text-sm tracking-widest uppercase transition-opacity hover:opacity-100 ${
                trip.upcoming ? "text-white opacity-100" : "text-white opacity-50"
              }`}
            >
              {trip.upcoming ? `${trip.year}` : `'${String(trip.year).slice(2)}`}
            </Link>
          ))}
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white z-[60] relative w-8 h-8 flex flex-col justify-center items-center gap-1.5"
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-px bg-white transition-all duration-300 ${
              open ? "rotate-45 translate-y-[3.5px]" : ""
            }`}
          />
          <span
            className={`w-6 h-px bg-white transition-all duration-300 ${
              open ? "-rotate-45 -translate-y-[3.5px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center mix-blend-normal"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-5 right-6 text-white w-8 h-8 flex flex-col justify-center items-center gap-1.5"
              aria-label="Close menu"
            >
              <span className="w-6 h-px bg-white rotate-45 translate-y-[3.5px]" />
              <span className="w-6 h-px bg-white -rotate-45 -translate-y-[3.5px]" />
            </button>

            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="font-display text-4xl text-white mb-12 tracking-wide"
            >
              Tour de Fore
            </Link>
            {trips.map((trip, i) => (
              <motion.div
                key={trip.year}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
              >
                <Link
                  href={`/trip/${trip.slug}`}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-center"
                >
                  <span className="font-display text-5xl text-white/90 hover:text-gold transition-colors">
                    {trip.year}
                  </span>
                  <span className="block text-sm text-white/40 tracking-widest uppercase mt-1">
                    {trip.location}, {trip.state}
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
