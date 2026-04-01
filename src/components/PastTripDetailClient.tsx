"use client";

import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useMemo, useCallback } from "react";
import type { Trip } from "@/lib/trips";
import USMap from "./USMap";
import FireBackground from "./FireBackground";
import MulliganButton from "./MulliganButton";
import HomeButton from "./HomeButton";

const sectionHeadingStyle: React.CSSProperties = {
  fontFamily: "var(--font-slab-cold), serif",
  fontSize: "clamp(2rem, 5vw, 3.5rem)",
  color: "#fff",
  marginBottom: "2rem",
  textAlign: "center",
  textTransform: "uppercase",
  textShadow: "0 0 7px rgba(255,60,20,0.5), 0 0 20px rgba(255,60,20,0.25), 0 0 40px rgba(255,30,10,0.1)",
};

export default function PastTripDetailClient({ trip, isLive }: { trip: Trip; isLive?: boolean }) {
  const [isMobile, setIsMobile] = useState(false);
  const [activeDay, setActiveDay] = useState(0);

  // 3-panel gallery: each panel cycles at a different cadence
  const galleryImages = useMemo(() => trip.gallery.filter((s) => !/\.(mp4|mov|webm)$/i.test(s)), [trip.gallery]);
  const panelIntervals = [3400, 4700, 6100]; // staggered ms per panel
  const [panelIndices, setPanelIndices] = useState([0, Math.floor(galleryImages.length / 3), Math.floor((galleryImages.length * 2) / 3)]);

  useEffect(() => {
    if (galleryImages.length < 3) return;
    const timers = panelIntervals.map((ms, panel) =>
      setInterval(() => {
        setPanelIndices((prev) => {
          const next = [...prev];
          next[panel] = (prev[panel] + 1) % galleryImages.length;
          return next;
        });
      }, ms)
    );
    return () => timers.forEach(clearInterval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [galleryImages.length]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Build a lookup map: activity name → image URL from courses and restaurants
  const imageMap = useMemo(() => {
    const map: Record<string, string> = {};
    for (const c of trip.courses) {
      if (c.image) map[c.name] = c.image;
    }
    for (const r of trip.restaurants) {
      if (r.image) map[r.name] = r.image;
    }
    return map;
  }, [trip.courses, trip.restaurants]);

  // Resolve lodging image
  const lodgingImage = trip.lodgingImage || trip.photoSections?.[0]?.images?.[0] || null;

  return (
    <main style={{ minHeight: "100vh", background: "#000", color: "#fff", position: "relative" }}>
      <FireBackground />

      <MulliganButton href={isLive ? "/?skip=1" : "/past-trips"} />
      <HomeButton />

      {/* Page header */}
      <div style={{ position: "relative", zIndex: 1, padding: "clamp(3rem, 8vw, 5rem) clamp(1.5rem, 6vw, 6rem) 0", textAlign: "center" }}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            fontFamily: "var(--font-scrawl), cursive",
            fontSize: "clamp(4rem, 12vw, 8rem)",
            fontWeight: 400,
            lineHeight: 0.9,
            letterSpacing: "0.02em",
            color: "#fff",
            textShadow: "0 0 10px rgba(255,80,20,0.8), 0 0 30px rgba(255,60,10,0.5), 0 0 60px rgba(255,40,0,0.3), 0 0 100px rgba(255,30,0,0.15)",
          }}
        >
          {trip.year}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{ fontFamily: "var(--font-scrawl), cursive", fontSize: "clamp(1rem, 2.5vw, 1.4rem)", color: "rgba(255,255,255,0.6)", marginTop: "0.5rem" }}
        >
          {trip.location}, {trip.state}
        </motion.p>
      </div>

      {/* Day pills — sticky top nav */}
      {trip.schedule.length > 0 && (
        <div style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(0,0,0,0.85)",
          backdropFilter: "blur(10px)",
          padding: "0.75rem clamp(1.5rem, 6vw, 6rem)",
          display: "flex",
          justifyContent: "center",
          gap: "0.5rem",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          {trip.schedule.map((day, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveDay(i);
                document.getElementById(`day-${i}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              style={{
                fontFamily: "monospace",
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "0.65rem 1rem",
                minHeight: "44px",
                borderRadius: "4px",
                border: activeDay === i ? "1px solid rgba(220,38,38,0.6)" : "1px solid rgba(255,255,255,0.15)",
                background: activeDay === i ? "rgba(220,38,38,0.15)" : "transparent",
                color: activeDay === i ? "#fff" : "rgba(255,255,255,0.5)",
                cursor: "pointer",
                transition: "all 0.2s",
                flexShrink: 0,
                whiteSpace: "nowrap",
              }}
            >
              {day.day}
            </button>
          ))}
        </div>
      )}

      {/* Section 1: US Map */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ position: "relative", zIndex: 1, padding: "2rem clamp(1.5rem, 6vw, 6rem)", maxWidth: "700px", margin: "0 auto" }}
      >
        <USMap singleTrip={trip.year} compact />
      </motion.section>

      {/* Section 2: Lads on Tour — 3-panel dissolving gallery */}
      {galleryImages.length >= 3 && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ position: "relative", zIndex: 1, padding: "3rem clamp(1.5rem, 6vw, 6rem)" }}
        >
          <h2 style={sectionHeadingStyle}>Lads on Tour</h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: "0.75rem",
          }}>
            {panelIndices.map((imgIdx, panel) => (
              <div
                key={panel}
                style={{
                  position: "relative",
                  aspectRatio: "4/3",
                  borderRadius: "8px",
                  overflow: "hidden",
                  background: "#111",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={imgIdx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2 }}
                    style={{ position: "absolute", inset: 0 }}
                  >
                    <Image
                      src={galleryImages[imgIdx]}
                      alt={`Gallery ${imgIdx + 1}`}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes={isMobile ? "90vw" : "33vw"}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Section 3: Devils in the Details — Itinerary with inline images */}
      {trip.schedule.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ position: "relative", zIndex: 1, padding: "3rem clamp(1.5rem, 6vw, 6rem)" }}
        >
          <h2 style={sectionHeadingStyle}>Devils&apos; Details</h2>

          {/* Day sections */}
          {trip.schedule.map((day, i) => (
            <div key={i} id={`day-${i}`} style={{ marginBottom: "2.5rem", scrollMarginTop: "80px" }}>
              <h3 style={{
                fontFamily: "var(--font-plan-block), sans-serif",
                fontSize: "1.1rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "#ff6a28",
                marginBottom: "0.5rem",
                textShadow: "0 0 7px rgba(255,106,40,0.9), 0 0 20px rgba(255,60,20,0.6), 0 0 40px rgba(255,40,10,0.3)",
              }}>
                {day.day} — {day.date}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {day.items.map((item, j) => {
                  const resolvedImage = item.image || imageMap[item.activity] || null;
                  return (
                    <div
                      key={j}
                      style={{
                        display: "flex",
                        flexDirection: isMobile && resolvedImage ? "column" : "row",
                        alignItems: isMobile ? "stretch" : "center",
                        gap: "1rem",
                        padding: "0.75rem 1rem",
                        background: "rgba(255,255,255,0.03)",
                        borderRadius: "6px",
                        borderLeft: `3px solid ${item.type === "golf" ? "rgba(34,197,94,0.6)" : item.type === "dining" ? "rgba(234,179,8,0.6)" : item.type === "nightlife" ? "rgba(168,85,247,0.6)" : "rgba(59,130,246,0.6)"}`,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem", flex: 1, minWidth: 0 }}>
                        <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>
                          {item.type === "golf" ? "⛳" : item.type === "dining" ? "🍽️" : item.type === "nightlife" ? "🌙" : "🏌️"}
                        </span>
                        <div>
                          <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", fontFamily: "monospace", marginRight: "0.75rem" }}>
                            {item.time}
                          </span>
                          <span style={{ fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>
                            {item.activity}
                          </span>
                          {item.detail && (
                            <span style={{ color: "rgba(255,255,255,0.4)", marginLeft: "0.5rem", fontSize: "0.85rem" }}>
                              — {item.detail}
                            </span>
                          )}
                        </div>
                      </div>
                      {resolvedImage && (
                        <div style={{
                          position: "relative",
                          width: isMobile ? "100%" : "120px",
                          aspectRatio: "3/2",
                          borderRadius: "4px",
                          overflow: "hidden",
                          flexShrink: 0,
                        }}>
                          <Image
                            src={resolvedImage}
                            alt={item.activity}
                            fill
                            style={{ objectFit: "cover" }}
                            sizes={isMobile ? "90vw" : "120px"}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </motion.section>
      )}

      {/* Section 4: Lodging — single front-of-house image */}
      {lodgingImage && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ position: "relative", zIndex: 1, padding: "3rem clamp(1.5rem, 6vw, 6rem)" }}
        >
          <h2 style={sectionHeadingStyle}>Home is Where Hell is</h2>

          {trip.lodgingBookingUrl ? (
            <a href={trip.lodgingBookingUrl} target="_blank" rel="noopener noreferrer" style={{ display: "block", maxWidth: "800px", margin: "0 auto" }}>
              <div style={{
                position: "relative",
                aspectRatio: "16/9",
                borderRadius: "8px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.08)",
                transition: "border-color 0.3s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
              >
                <Image
                  src={lodgingImage}
                  alt="Trip lodging"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 90vw, 800px"
                />
                <div style={{
                  position: "absolute",
                  bottom: "1rem",
                  right: "1rem",
                  background: "rgba(0,0,0,0.7)",
                  borderRadius: "4px",
                  padding: "0.4rem 0.75rem",
                  fontSize: "0.75rem",
                  color: "#EA580C",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                }}>
                  🏠 View on Airbnb
                </div>
              </div>
            </a>
          ) : (
            <div style={{
              position: "relative",
              aspectRatio: "16/9",
              borderRadius: "8px",
              overflow: "hidden",
              maxWidth: "800px",
              margin: "0 auto",
              border: "1px solid rgba(255,255,255,0.08)",
            }}>
              <Image
                src={lodgingImage}
                alt="Trip lodging"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 90vw, 800px"
              />
            </div>
          )}
        </motion.section>
      )}
    </main>
  );
}
