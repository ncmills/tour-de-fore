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
        className="font-body text-[12px] tracking-[0.15em] uppercase text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-1.5"
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
            className="absolute top-full right-0 mt-4 min-w-[260px] bg-white rounded-xl shadow-lg shadow-black/8 border border-[#e0dbd3] overflow-hidden"
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

  // Lock body scroll when mobile menu is open
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
  const isTripActive = (upcoming: boolean) =>
    pathname.startsWith("/trip/") &&
    trips.some((t) => t.upcoming === upcoming && pathname === `/trip/${t.slug}`);

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
        {/* Logo + Brand */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
        >
          <Logo className="w-8 h-8" />
          <span className="font-display text-2xl md:text-3xl font-semibold text-white tracking-wide group-hover:opacity-80 transition-opacity">
            Tour de Fore
          </span>
        </Link>

        {/* Desktop nav */}
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
                  className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-[#f8f6f2] transition-colors group"
                >
                  <div>
                    <span className="font-display text-2xl text-[#212121] group-hover:text-[#cf8018] transition-colors">
                      {trip.year}
                    </span>
                    <span className="block text-[10px] text-[#8a8a8a] tracking-[0.2em] uppercase font-body mt-0.5">
                      {trip.location}, {trip.state}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#cf8018] animate-pulse" />
                  </div>
                </Link>
              ))}
              {upcomingTrips.length === 0 && (
                <div className="px-4 py-3 text-[#8a8a8a] text-sm font-body">
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
                  className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-[#f8f6f2] transition-colors group"
                >
                  <div>
                    <span className="font-display text-2xl text-[#212121] group-hover:text-[#cf8018] transition-colors">
                      {trip.year}
                    </span>
                    <span className="block text-[10px] text-[#8a8a8a] tracking-[0.2em] uppercase font-body mt-0.5">
                      {trip.location}, {trip.state}
                    </span>
                  </div>
                  <svg
                    className="w-4 h-4 text-[#e0dbd3] group-hover:text-[#cf8018] group-hover:translate-x-1 transition-all"
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
            className={`font-body text-[12px] tracking-[0.15em] uppercase transition-colors duration-300 ${
              isActive("/shop") ? "text-[#cf8018]" : "text-white/70 hover:text-white"
            }`}
          >
            Shop
          </Link>

          <Link
            href="/plan"
            className={`font-body text-[12px] tracking-[0.15em] uppercase px-6 py-2.5 rounded-full transition-all duration-300 ${
              isActive("/plan")
                ? "bg-[#cf8018] text-white shadow-md"
                : "bg-[#cf8018] text-white hover:bg-[#b8710f] shadow-md hover:shadow-lg"
            }`}
          >
            Plan a Trip
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white z-[60] relative w-8 h-8 flex flex-col justify-center items-center gap-1.5"
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-px bg-white transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-[3.5px] !bg-[#212121]" : ""
            }`}
          />
          <span
            className={`w-6 h-px bg-white transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-[3.5px] !bg-[#212121]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center overflow-y-auto py-20"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-5 right-6 text-[#212121] w-8 h-8 flex flex-col justify-center items-center gap-1.5"
              aria-label="Close menu"
            >
              <span className="w-6 h-px bg-[#212121] rotate-45 translate-y-[3.5px]" />
              <span className="w-6 h-px bg-[#212121] -rotate-45 -translate-y-[3.5px]" />
            </button>

            <Logo className="w-12 h-12 mb-4" />
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="font-display text-3xl text-[#212121] mb-2 tracking-wide"
            >
              Tour de Fore
            </Link>
            <p className="text-[10px] text-[#8a8a8a] tracking-[0.3em] uppercase font-body mb-12 italic">
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
                className="inline-block font-body text-[12px] tracking-[0.15em] uppercase text-white bg-[#cf8018] hover:bg-[#b8710f] px-8 py-3 rounded-full transition-all duration-300 shadow-md"
              >
                Plan a Trip
              </Link>
            </motion.div>

            {/* Upcoming */}
            <div className="text-[10px] tracking-[0.4em] uppercase text-[#cf8018] font-body mb-4">
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
                  <span className="font-display text-5xl text-[#212121] group-hover:text-[#cf8018] transition-colors duration-300">
                    {trip.year}
                  </span>
                  <span className="block text-[11px] text-[#8a8a8a] tracking-[0.3em] uppercase mt-1 font-body">
                    {trip.location}, {trip.state}
                  </span>
                </Link>
              </motion.div>
            ))}

            <div className="w-12 h-px bg-[#cf8018]/30 my-6" />

            {/* Past */}
            <div className="text-[10px] tracking-[0.4em] uppercase text-[#8a8a8a] font-body mb-4">
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
                  <span className="font-display text-4xl text-[#5a5a5a] group-hover:text-[#cf8018] transition-colors duration-300">
                    {trip.year}
                  </span>
                  <span className="block text-[11px] text-[#8a8a8a] tracking-[0.3em] uppercase mt-1 font-body">
                    {trip.location}, {trip.state}
                  </span>
                </Link>
              </motion.div>
            ))}

            <div className="w-12 h-px bg-[#cf8018]/30 my-6" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <Link
                href="/shop"
                onClick={() => setMobileOpen(false)}
                className="font-body text-[12px] tracking-[0.15em] uppercase text-[#cf8018] hover:text-[#b8710f] transition-colors"
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
