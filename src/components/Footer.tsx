"use client";

import Link from "next/link";
import { trips } from "@/lib/trips";
import Logo from "./Logo";
import USMap from "./USMap";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const upcomingTrips = trips.filter((t) => t.upcoming);
  const pastTrips = trips.filter((t) => !t.upcoming);

  return (
    <footer className="bg-bg border-t border-border mt-0">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Logo className="w-7 h-7 brightness-0 invert" />
              <h3 className="font-display text-3xl text-white">
                Tour de Fore
              </h3>
            </div>
            <p className="neon-stats" style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#ff6a28", textShadow: "0 0 7px rgba(255,106,40,0.9), 0 0 20px rgba(255,60,20,0.6), 0 0 40px rgba(255,40,10,0.3)", maxWidth: "20rem" }}>
              6 years. 7 trips. 600+ beers. Now it&apos;s your turn.
            </p>
          </div>

          {/* Upcoming + Past */}
          <div>
            <h4 className="text-xs tracking-[0.15em] uppercase text-accent mb-6 font-body font-medium">
              Upcoming
            </h4>
            <div className="space-y-3">
              {upcomingTrips.map((trip) => (
                <Link
                  key={trip.year}
                  href={`/trip/${trip.slug}`}
                  className="flex items-baseline gap-3 group"
                >
                  <span className="font-display text-lg text-white group-hover:text-accent transition-colors duration-300">
                    {trip.year}
                  </span>
                  <span className="text-xs text-text-dim tracking-[0.15em] uppercase font-body group-hover:text-text-muted transition-colors duration-300">
                    {trip.location}
                  </span>
                </Link>
              ))}
            </div>

            <h4 className="text-xs tracking-[0.15em] uppercase text-accent mb-6 mt-10 font-body font-medium">
              Past Trips
            </h4>
            <div className="space-y-3">
              {pastTrips.map((trip) => (
                <Link
                  key={trip.year}
                  href={`/trip/${trip.slug}`}
                  className="flex items-baseline gap-3 group"
                >
                  <span className="font-display text-lg text-white/50 group-hover:text-accent transition-colors duration-300">
                    {trip.year}
                  </span>
                  <span className="text-xs text-text-dim tracking-[0.15em] uppercase font-body group-hover:text-text-muted transition-colors duration-300">
                    {trip.location}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Plan & Shop + Map */}
          <div>
            <h4 className="text-xs tracking-[0.15em] uppercase text-accent mb-6 font-body font-medium">
              Plan
            </h4>
            <div className="space-y-3 mb-8">
              <Link href="/plan" className="text-text-muted hover:text-accent transition-colors duration-300 text-sm font-body block">
                Plan a Trip
              </Link>
              <Link href="/my-trips" className="text-text-muted hover:text-accent transition-colors duration-300 text-sm font-body block">
                My Trips
              </Link>
            </div>

            <h4 className="text-xs tracking-[0.15em] uppercase text-accent mb-6 font-body font-medium">
              Shop
            </h4>
            <Link
              href="/shop"
              className="text-text-muted hover:text-accent transition-colors duration-300 text-sm font-body block mb-10"
            >
              View Pro Shop
            </Link>

            <div className="opacity-30 hover:opacity-50 transition-opacity duration-500">
              <USMap compact />
            </div>
          </div>
        </div>

        <div className="h-px bg-border mt-16 mb-10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-dim text-xs tracking-[0.2em] uppercase font-body">
            knickolaus & co
          </p>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-text-dim text-xs tracking-[0.2em] uppercase font-body hover:text-accent transition-colors"
            aria-label="Back to top"
          >
            Back to Top
            <svg
              className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <div className="flex items-center gap-4">
            <p className="text-text-dim text-xs tracking-[0.15em] font-body">Est. 2021 &mdash; Present</p>
            <Link href="/privacy" className="text-text-dim text-xs tracking-[0.15em] font-body hover:text-accent transition-colors">Privacy</Link>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-[10px] text-text-dim/20 font-body">
            <a href="https://whatpeptidesdo.com" className="hover:text-text-dim/40 transition-colors">whatpeptidesdo.com</a>
            {" · "}
            <a href="https://idonthaveawill.com" className="hover:text-text-dim/40 transition-colors">idonthaveawill.com</a>
            {" · "}
            <a href="https://doppelwriter.com" className="hover:text-text-dim/40 transition-colors">doppelwriter.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
