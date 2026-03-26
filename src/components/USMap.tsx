"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

const tripLocations: {
  year: number;
  city: string;
  state: string;
  slug: string;
  upcoming?: boolean;
  x: number;
  y: number;
}[] = [
  { year: 2021, city: "St. George", state: "Utah", slug: "2021", x: 225, y: 330 },
  { year: 2022, city: "Boise", state: "Idaho", slug: "2022", x: 215, y: 195 },
  { year: 2023, city: "Lexington", state: "Kentucky", slug: "2023", x: 650, y: 305 },
  { year: 2024, city: "Bend", state: "Oregon", slug: "2024", x: 160, y: 175 },
  { year: 2025, city: "Deadwood", state: "South Dakota", slug: "2025", x: 410, y: 195 },
  { year: 2026, city: "Kohler", state: "Wisconsin", slug: "2026", upcoming: true, x: 560, y: 195 },
];

export default function USMap({ compact, singleTrip }: { compact?: boolean; singleTrip?: number }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const highlightedTrip = singleTrip ? tripLocations.find((l) => l.year === singleTrip) : null;

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <svg
        viewBox="0 0 960 600"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Simplified US outline */}
        <path
          d="M 130 120 L 160 100 L 200 95 L 250 90 L 310 85 L 350 90 L 400 85 L 450 80 L 500 82 L 550 85 L 600 90 L 650 95 L 700 100 L 750 110 L 790 130 L 820 150 L 840 180 L 850 210 L 855 250 L 850 280 L 840 310 L 830 340 L 810 360 L 780 380 L 750 395 L 720 400 L 700 410 L 680 430 L 660 450 L 640 460 L 610 465 L 580 460 L 560 450 L 540 440 L 520 450 L 490 460 L 460 465 L 430 460 L 400 450 L 370 440 L 340 435 L 310 430 L 280 420 L 260 410 L 240 395 L 220 380 L 200 370 L 180 360 L 160 345 L 140 320 L 125 290 L 115 260 L 110 230 L 112 200 L 118 170 L 125 140 Z"
          fill="rgba(234, 88, 12, 0.03)"
          stroke="rgba(234, 88, 12, 0.15)"
          strokeWidth="1.5"
        />

        {/* State boundary suggestion lines */}
        <line x1="305" y1="85" x2="300" y2="440" stroke="rgba(234, 88, 12, 0.06)" strokeWidth="0.5" />
        <line x1="450" y1="80" x2="450" y2="465" stroke="rgba(234, 88, 12, 0.06)" strokeWidth="0.5" />
        <line x1="600" y1="90" x2="600" y2="465" stroke="rgba(234, 88, 12, 0.06)" strokeWidth="0.5" />
        <line x1="115" y1="250" x2="855" y2="250" stroke="rgba(234, 88, 12, 0.06)" strokeWidth="0.5" />
        <line x1="115" y1="350" x2="830" y2="350" stroke="rgba(234, 88, 12, 0.06)" strokeWidth="0.5" />

        {/* Single-trip highlight — large red glow */}
        {highlightedTrip && (
          <>
            <motion.circle
              cx={highlightedTrip.x}
              cy={highlightedTrip.y}
              r="60"
              fill="rgba(220,38,38,0.12)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
            <motion.circle
              cx={highlightedTrip.x}
              cy={highlightedTrip.y}
              r="35"
              fill="rgba(220,38,38,0.2)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <motion.circle
              cx={highlightedTrip.x}
              cy={highlightedTrip.y}
              r="45"
              fill="none"
              stroke="rgba(220,38,38,0.4)"
              strokeWidth="1.5"
              animate={{ r: [35, 55, 35], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </>
        )}

        {/* Connection lines */}
        {!singleTrip && tripLocations.slice(0, -1).map((loc, i) => {
          const next = tripLocations[i + 1];
          return (
            <motion.line
              key={`line-${i}`}
              x1={loc.x}
              y1={loc.y}
              x2={next.x}
              y2={next.y}
              stroke="rgba(234, 88, 12, 0.25)"
              strokeWidth="1"
              strokeDasharray="4 4"
              initial={compact ? { pathLength: 1 } : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 + i * 0.2 }}
            />
          );
        })}

        {/* Trip location markers */}
        {(singleTrip ? tripLocations.filter((l) => l.year === singleTrip) : tripLocations).map((loc, i) => (
          <g key={loc.year}>
            {loc.upcoming && !compact && (
              <motion.circle
                cx={loc.x}
                cy={loc.y}
                r="20"
                fill="none"
                stroke="rgba(234, 88, 12, 0.3)"
                strokeWidth="1"
                animate={{ r: [14, 24, 14], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}

            <motion.circle
              cx={loc.x}
              cy={loc.y}
              r="12"
              fill={loc.upcoming ? "rgba(234, 88, 12, 0.08)" : "rgba(212, 168, 67, 0.1)"}
              initial={compact ? { scale: 1 } : { scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
            />

            <motion.circle
              cx={loc.x}
              cy={loc.y}
              r={singleTrip ? 10 : (!compact && hovered === loc.year ? 8 : 5)}
              fill={singleTrip ? "#DC2626" : loc.upcoming ? "#EA580C" : "#D4A843"}
              className={compact ? "" : "cursor-pointer"}
              onMouseEnter={() => !compact && setHovered(loc.year)}
              onMouseLeave={() => !compact && setHovered(null)}
              initial={compact ? { scale: 1 } : { scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 300, delay: 0.3 + i * 0.15 }}
              style={{ filter: !compact && hovered === loc.year ? "drop-shadow(0 0 8px rgba(234, 88, 12, 0.4))" : "none" }}
            />

            <motion.text
              x={loc.x}
              y={loc.y - 16}
              textAnchor="middle"
              fill={!compact && hovered === loc.year ? "#EA580C" : "rgba(161, 161, 170, 0.5)"}
              fontSize="11"
              fontFamily="var(--font-display)"
              fontWeight="400"
              className="pointer-events-none select-none"
              initial={compact ? { opacity: 1 } : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
            >
              {loc.year}
            </motion.text>
          </g>
        ))}
      </svg>

      {/* Hover tooltip */}
      {!compact && (
        <AnimatePresence>
          {hovered && (() => {
            const loc = tripLocations.find((l) => l.year === hovered);
            if (!loc) return null;
            return (
              <motion.div
                key={hovered}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.2 }}
                className="absolute top-4 left-1/2 -translate-x-1/2 bg-bg-card border border-border px-5 py-3 rounded-lg shadow-lg z-10"
              >
                <Link href={`/trip/${loc.slug}`} className="group">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-2xl text-gold group-hover:text-accent transition-colors">
                      {loc.year}
                    </span>
                    <span className="text-xs tracking-[0.15em] uppercase text-text-dim font-body">
                      {loc.city}, {loc.state}
                    </span>
                    {loc.upcoming && (
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      )}
    </div>
  );
}
