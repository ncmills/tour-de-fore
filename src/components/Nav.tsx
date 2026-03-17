"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { trips } from "@/lib/trips";
import { motion, AnimatePresence } from "motion/react";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "nav-glass" : ""
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-12 py-5">
        <Link
          href="/"
          className="font-display text-2xl md:text-3xl font-semibold text-white tracking-wide hover:opacity-70 transition-opacity"
        >
          Tour de Fore
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {trips.map((trip) => (
            <Link
              key={trip.year}
              href={`/trip/${trip.slug}`}
              className={`font-body text-[11px] tracking-[0.25em] uppercase transition-all hover:text-ember ${
                trip.upcoming
                  ? "text-white font-medium"
                  : "text-white/40 hover:text-white/80"
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
            className="fixed inset-0 bg-black/97 z-50 flex flex-col items-center justify-center"
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
              className="font-display text-4xl text-white mb-16 tracking-wide"
            >
              Tour de Fore
            </Link>
            {trips.map((trip, i) => (
              <motion.div
                key={trip.year}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
              >
                <Link
                  href={`/trip/${trip.slug}`}
                  onClick={() => setOpen(false)}
                  className="block py-4 text-center group"
                >
                  <span className="font-display text-6xl text-white/90 group-hover:text-ember transition-colors duration-300">
                    {trip.year}
                  </span>
                  <span className="block text-[11px] text-white/30 tracking-[0.3em] uppercase mt-2 font-body">
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
