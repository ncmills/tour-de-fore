"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trips } from "@/lib/trips";
import { motion, AnimatePresence } from "motion/react";
import Logo from "./Logo";

function NavDropdown({
  label,
  children,
  isOpen,
  onToggle,
}: {
  label: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        if (isOpen) onToggle();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, onToggle]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={onToggle}
        className="font-body text-sm text-white/60 hover:text-white transition-colors duration-300 flex items-center gap-1.5"
      >
        {label}
        <svg
          className={`w-3 h-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute top-full right-0 mt-4 min-w-[260px] bg-bg-card rounded-lg shadow-lg shadow-black/30 border border-border overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const upcomingTrips = trips.filter((t) => t.upcoming);
  const pastTrips = trips.filter((t) => !t.upcoming);

  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    return () => document.body.classList.remove("menu-open");
  }, [mobileOpen]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const isActive = (href: string) => pathname === href;

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "nav-glass" : ""
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-12 py-5">
        <Link
          href="/"
          className="flex items-center gap-3 group"
        >
          <Logo className="w-8 h-8" />
          <span className="font-display text-2xl md:text-3xl text-white tracking-wide group-hover:opacity-80 transition-opacity">
            Tour de Fore
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <NavDropdown
            label="Upcoming"
            isOpen={activeDropdown === "upcoming"}
            onToggle={() => toggleDropdown("upcoming")}
          >
            <div className="p-2">
              {upcomingTrips.map((trip) => (
                <Link
                  key={trip.year}
                  href={`/trip/${trip.slug}`}
                  onClick={() => setActiveDropdown(null)}
                  className="flex items-center justify-between px-5 py-4 rounded-lg hover:bg-bg-alt transition-colors group"
                >
                  <div>
                    <span className="font-display text-2xl text-gold group-hover:text-accent transition-colors">
                      {trip.year}
                    </span>
                    <span className="block text-xs text-text-muted tracking-[0.1em] uppercase font-body mt-0.5">
                      {trip.location}, {trip.state}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  </div>
                </Link>
              ))}
              {upcomingTrips.length === 0 && (
                <div className="px-5 py-4 text-text-dim text-sm font-body">
                  No upcoming trips
                </div>
              )}
            </div>
          </NavDropdown>

          <NavDropdown
            label="Past Trips"
            isOpen={activeDropdown === "past"}
            onToggle={() => toggleDropdown("past")}
          >
            <div className="p-2">
              {pastTrips.map((trip) => (
                <Link
                  key={trip.year}
                  href={`/trip/${trip.slug}`}
                  onClick={() => setActiveDropdown(null)}
                  className="flex items-center justify-between px-5 py-4 rounded-lg hover:bg-bg-alt transition-colors group"
                >
                  <div>
                    <span className="font-display text-2xl text-gold group-hover:text-accent transition-colors">
                      {trip.year}
                    </span>
                    <span className="block text-xs text-text-muted tracking-[0.1em] uppercase font-body mt-0.5">
                      {trip.location}, {trip.state}
                    </span>
                  </div>
                  <svg
                    className="w-4 h-4 text-border group-hover:text-accent group-hover:translate-x-1 transition-all"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </NavDropdown>

          <Link
            href="/shop"
            className={`font-body text-sm transition-colors duration-300 ${
              isActive("/shop") ? "text-accent" : "text-white/60 hover:text-white"
            }`}
          >
            Shop
          </Link>

          <Link
            href="/plan"
            className={`font-body text-sm px-6 py-2.5 rounded-lg transition-all duration-300 ${
              isActive("/plan")
                ? "bg-accent text-white shadow-md"
                : "bg-accent text-white hover:bg-accent-hover shadow-md hover:shadow-lg"
            }`}
          >
            Plan a Trip
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white z-[60] relative w-8 h-8 flex flex-col justify-center items-center gap-1.5"
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-px bg-white transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""
            }`}
          />
          <span
            className={`w-6 h-px bg-white transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
            }`}
          />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-bg z-50 flex flex-col items-center justify-center overflow-y-auto py-20"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-5 right-6 text-white w-8 h-8 flex flex-col justify-center items-center gap-1.5"
              aria-label="Close menu"
            >
              <span className="w-6 h-px bg-white rotate-45 translate-y-[3.5px]" />
              <span className="w-6 h-px bg-white -rotate-45 -translate-y-[3.5px]" />
            </button>

            <Logo className="w-12 h-12 mb-4" />
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="font-display text-3xl text-white mb-2 tracking-wide"
            >
              Tour de Fore
            </Link>
            <p className="font-accent text-base text-text-muted italic mb-12">
              Hell is empty, and all the devils are here
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0, duration: 0.4 }}
              className="mb-8"
            >
              <Link
                href="/plan"
                onClick={() => setMobileOpen(false)}
                className="inline-block font-body text-sm text-white bg-accent hover:bg-accent-hover px-8 py-3 rounded-lg transition-all duration-300 shadow-md"
              >
                Plan a Trip
              </Link>
            </motion.div>

            <div className="text-xs tracking-[0.2em] uppercase text-accent font-body font-medium mb-4">
              Upcoming
            </div>
            {upcomingTrips.map((trip, i) => (
              <motion.div
                key={trip.year}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
              >
                <Link
                  href={`/trip/${trip.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 text-center group"
                >
                  <span className="font-display text-5xl text-gold group-hover:text-accent transition-colors duration-300">
                    {trip.year}
                  </span>
                  <span className="block text-xs text-text-muted tracking-[0.2em] uppercase mt-1 font-body">
                    {trip.location}, {trip.state}
                  </span>
                </Link>
              </motion.div>
            ))}

            <div className="w-12 h-px bg-accent/30 my-6" />

            <div className="text-xs tracking-[0.2em] uppercase text-text-muted font-body font-medium mb-4">
              Past Trips
            </div>
            {pastTrips.map((trip, i) => (
              <motion.div
                key={trip.year}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
              >
                <Link
                  href={`/trip/${trip.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 text-center group"
                >
                  <span className="font-display text-4xl text-text-dim group-hover:text-accent transition-colors duration-300">
                    {trip.year}
                  </span>
                  <span className="block text-xs text-text-dim tracking-[0.2em] uppercase mt-1 font-body">
                    {trip.location}, {trip.state}
                  </span>
                </Link>
              </motion.div>
            ))}

            <div className="w-12 h-px bg-accent/30 my-6" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <Link
                href="/shop"
                onClick={() => setMobileOpen(false)}
                className="font-body text-sm text-accent hover:text-accent-hover transition-colors"
              >
                Shop
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
