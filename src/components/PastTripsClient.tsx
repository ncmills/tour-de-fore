"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { trips } from "@/lib/trips";

const YEAR_HERO: Record<number, string> = {
  2021: "/photos/2021/IMG_0789.jpeg",
  2022: "/photos/2022/IMG_1762.jpeg",
  2023: "/photos/2023/DSC01476.jpeg",
  2024: "/photos/2024/IMG_6034.jpeg",
  2025: "/photos/2025/IMG_5751.jpeg",
};

export default function PastTripsClient() {
  const past = trips.filter((t) => !t.upcoming).sort((a, b) => b.year - a.year);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        fontFamily: "var(--font-space-grotesk), sans-serif",
      }}
    >
      {/* Back link */}
      <div style={{ position: "fixed", top: "1.2rem", left: "clamp(1.5rem, 6vw, 6rem)", zIndex: 500 }}>
        <Link
          href="/?skip=1"
          style={{ fontFamily: "var(--font-script), cursive", fontSize: "1.1rem", color: "rgba(255,255,255,0.35)", textDecoration: "none" }}
        >
          ← back
        </Link>
      </div>

      {/* Good Choice write-in */}
      <div style={{ padding: "clamp(3rem, 8vw, 6rem) clamp(1.5rem, 6vw, 6rem) 0", overflow: "hidden" }}>
        <motion.p
          initial={{ clipPath: "inset(0 105% 0 -5px)" }}
          animate={{ clipPath: "inset(0 -5px 0 -5px)" }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            fontFamily: "var(--font-script), cursive",
            fontSize: "clamp(1.6rem, 4vw, 3rem)",
            color: "rgba(255,255,255,0.25)",
            marginBottom: "0.25rem",
            whiteSpace: "nowrap",
          }}
        >
          Past Trips
        </motion.p>
      </div>

      {/* Year grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        style={{ padding: "3rem clamp(1.5rem, 6vw, 6rem) 6rem" }}
      >
        {past.map((trip, i) => (
          <motion.div
            key={trip.slug}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 + i * 0.12 }}
            className="trip-card"
            style={{
              borderTop: "1px solid rgba(255,255,255,0.08)",
              paddingTop: "3rem",
              paddingBottom: "3rem",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(2rem, 5vw, 5rem)",
              alignItems: "center",
            }}
          >
            <Link
              href={`/past-trips/${trip.year}`}
              className="trip-img"
              style={{
                display: "block",
                aspectRatio: "4/3",
                position: "relative",
                borderRadius: "4px",
                overflow: "hidden",
                order: i % 2 === 0 ? 0 : 1,
                cursor: "pointer",
              }}
            >
              <Image
                src={YEAR_HERO[trip.year] ?? ""}
                alt={`${trip.year} — ${trip.location}`}
                fill
                style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
                sizes="(max-width: 768px) 90vw, 45vw"
                onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
              />
            </Link>

            <div className="trip-text" style={{ order: i % 2 === 0 ? 1 : 0 }}>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "0.8rem" }}>
                {trip.dates}
              </p>
              <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.02em", marginBottom: "0.6rem" }}>
                {trip.year}
              </h2>
              <p style={{ fontSize: "clamp(1rem, 2vw, 1.4rem)", fontWeight: 600, color: "rgba(255,255,255,0.85)", marginBottom: "0.5rem" }}>
                {trip.location}, {trip.state}
              </p>
              <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.4)", fontStyle: "italic", lineHeight: 1.5, marginBottom: trip.courses.length > 0 ? "1rem" : "0" }}>
                &ldquo;{trip.tagline}&rdquo;
              </p>
              {trip.courses.length > 0 && (
                <p style={{ fontSize: "0.75rem", letterSpacing: "0.06em", color: "rgba(255,255,255,0.25)", lineHeight: 1.8 }}>
                  {trip.courses.map((c) => c.name).join("  ·  ")}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
}
