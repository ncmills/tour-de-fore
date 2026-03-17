import Link from "next/link";
import { trips } from "@/lib/trips";
import Logo from "./Logo";

export default function Footer() {
  const upcomingTrips = trips.filter((t) => t.upcoming);
  const pastTrips = trips.filter((t) => !t.upcoming);

  return (
    <footer className="border-t border-border/40 mt-0">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Logo className="w-7 h-7" />
              <h3 className="font-display text-3xl font-semibold text-text">
                Tour de Fore
              </h3>
            </div>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs font-light italic font-display">
              Hell is empty, and all the devils are here.
            </p>
          </div>

          {/* Upcoming */}
          <div>
            <h4 className="text-[10px] tracking-[0.4em] uppercase text-text-dim mb-6 font-body font-medium">
              Upcoming
            </h4>
            <div className="space-y-3">
              {upcomingTrips.map((trip) => (
                <Link
                  key={trip.year}
                  href={`/trip/${trip.slug}`}
                  className="flex items-baseline gap-3 group"
                >
                  <span className="font-display text-lg text-text group-hover:text-ember transition-colors duration-300">
                    {trip.year}
                  </span>
                  <span className="text-[10px] text-text-dim tracking-[0.25em] uppercase font-body">
                    {trip.location}
                  </span>
                </Link>
              ))}
            </div>

            <h4 className="text-[10px] tracking-[0.4em] uppercase text-text-dim mb-6 mt-8 font-body font-medium">
              Past Trips
            </h4>
            <div className="space-y-3">
              {pastTrips.map((trip) => (
                <Link
                  key={trip.year}
                  href={`/trip/${trip.slug}`}
                  className="flex items-baseline gap-3 group"
                >
                  <span className="font-display text-lg text-text group-hover:text-ember transition-colors duration-300">
                    {trip.year}
                  </span>
                  <span className="text-[10px] text-text-dim tracking-[0.25em] uppercase font-body">
                    {trip.location}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-[10px] tracking-[0.4em] uppercase text-text-dim mb-6 font-body font-medium">
              Shop
            </h4>
            <Link
              href="/shop"
              className="text-text-muted hover:text-ember transition-colors duration-300 text-sm font-light"
            >
              View Pro Shop
            </Link>
          </div>

        </div>

        <div className="rule-ember mt-16 mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-dim text-[10px] tracking-[0.4em] uppercase font-body">
            knickolaus & co
          </p>
          <p className="text-text-dim text-[10px] tracking-[0.2em] font-body">
            Est. 2021 &mdash; Present
          </p>
        </div>
      </div>
    </footer>
  );
}
