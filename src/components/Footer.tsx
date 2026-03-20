"use client";

import Link from "next/link";
import { trips } from "@/lib/trips";
import Logo from "./Logo";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const upcomingTrips = trips.filter((t) => t.upcoming);
  const pastTrips = trips.filter((t) => !t.upcoming);

  return (
    <footer className="bg-[#1a322b] mt-0">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Logo className="w-7 h-7 brightness-0 invert" />
              <h3 className="font-display text-3xl font-semibold text-white">
                Tour de Fore
              </h3>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs font-light italic font-display">
              Hell is empty, and all the devils are here.
            </p>
          </div>

          {/* Upcoming */}
          <div>
            <h4 className="text-[10px] tracking-[0.4em] uppercase text-[#cf8018] mb-6 font-body font-medium">
              Upcoming
            </h4>
            <div className="space-y-3">
              {upcomingTrips.map((trip) => (
                <Link
                  key={trip.year}
                  href={`/trip/${trip.slug}`}
                  className="flex items-baseline gap-3 group"
                >
                  <span className="font-display text-lg text-white group-hover:text-[#cf8018] transition-colors duration-300">
                    {trip.year}
                  </span>
                  <span className="text-[10px] text-white/40 tracking-[0.25em] uppercase font-body group-hover:text-white/60 transition-colors duration-300">
                    {trip.location}
                  </span>
                </Link>
              ))}
            </div>

            <h4 className="text-[10px] tracking-[0.4em] uppercase text-[#cf8018] mb-6 mt-10 font-body font-medium">
              Past Trips
            </h4>
            <div className="space-y-3">
              {pastTrips.map((trip) => (
                <Link
                  key={trip.year}
                  href={`/trip/${trip.slug}`}
                  className="flex items-baseline gap-3 group"
                >
                  <span className="font-display text-lg text-white/70 group-hover:text-[#cf8018] transition-colors duration-300">
                    {trip.year}
                  </span>
                  <span className="text-[10px] text-white/30 tracking-[0.25em] uppercase font-body group-hover:text-white/50 transition-colors duration-300">
                    {trip.location}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Plan & Shop */}
          <div>
            <h4 className="text-[10px] tracking-[0.4em] uppercase text-[#cf8018] mb-6 font-body font-medium">
              Plan
            </h4>
            <Link
              href="/plan"
              className="text-white/60 hover:text-[#cf8018] transition-colors duration-300 text-sm font-light block mb-8"
            >
              Plan a Trip
            </Link>

            <h4 className="text-[10px] tracking-[0.4em] uppercase text-[#cf8018] mb-6 font-body font-medium">
              Shop
            </h4>
            <Link
              href="/shop"
              className="text-white/60 hover:text-[#cf8018] transition-colors duration-300 text-sm font-light"
            >
              View Pro Shop
            </Link>
          </div>

        </div>

        <div className="h-px bg-[#cf8018]/30 mt-20 mb-10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-[10px] tracking-[0.4em] uppercase font-body">
            knickolaus & co
          </p>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-white/50 text-[10px] tracking-[0.3em] uppercase font-body hover:text-[#cf8018] transition-colors"
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
          <p className="text-white/30 text-[10px] tracking-[0.2em] font-body">
            Est. 2021 &mdash; Present
          </p>
        </div>
      </div>
    </footer>
  );
}
