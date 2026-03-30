"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import type { Trip } from "@/lib/trips";
import USMap from "./USMap";
import PhotoSlideshow from "./PhotoSlideshow";
import FireBackground from "./FireBackground";
import MulliganButton from "./MulliganButton";

const sectionHeadingStyle: React.CSSProperties = {
  fontFamily: "var(--font-scrawl), cursive",
  fontSize: "clamp(2rem, 5vw, 3.5rem)",
  color: "#fff",
  marginBottom: "2rem",
  textShadow: "0 0 7px rgba(255,60,20,0.5), 0 0 20px rgba(255,60,20,0.25), 0 0 40px rgba(255,30,10,0.1)",
};

const cardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  borderRadius: "8px",
  overflow: "hidden",
  border: "1px solid rgba(255,255,255,0.08)",
  transition: "transform 0.3s, border-color 0.3s",
};

export default function PastTripDetailClient({ trip, isLive }: { trip: Trip; isLive?: boolean }) {
  const [isMobile, setIsMobile] = useState(false);
  const [activeDay, setActiveDay] = useState(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const hasLodging = trip.photoSections.length > 0 && trip.photoSections[0].images.length > 0;
  const hasRestaurants = trip.restaurants && trip.restaurants.length > 0;
  const restaurants = trip.restaurants;

  // Calculate total holes played per course from schedule data
  const holesPerCourse: Record<string, number> = {};
  for (const day of trip.schedule) {
    for (const item of day.items) {
      if (item.type === "golf") {
        const holes = item.detail?.match(/(\d+)\s*holes/i);
        const count = holes ? parseInt(holes[1]) : 18;
        holesPerCourse[item.activity] = (holesPerCourse[item.activity] || 0) + count;
      }
    }
  }

  return (
    <main style={{ minHeight: "100vh", background: "#000", color: "#fff", position: "relative" }}>
      <FireBackground />

      <MulliganButton href={isLive ? "/?skip=1" : "/past-trips"} top="3.5rem" />

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

      {/* Section 2: Devils in the Details — Interactive Itinerary */}
      {trip.schedule.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ position: "relative", zIndex: 1, padding: "3rem clamp(1.5rem, 6vw, 6rem)" }}
        >
          <h2 style={sectionHeadingStyle}>
            {isLive ? "Devils in the Details" : "Devils in the Details"}
          </h2>

          {/* Day pills */}
          <div style={{
            display: "flex",
            flexWrap: "nowrap",
            gap: "0.5rem",
            marginBottom: "2rem",
            position: "sticky",
            top: 0,
            zIndex: 50,
            background: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(8px)",
            padding: "0.75rem 0",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
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

          {/* Day sections */}
          {trip.schedule.map((day, i) => (
            <div key={i} id={`day-${i}`} style={{ marginBottom: "2.5rem", scrollMarginTop: "80px" }}>
              <h3 style={{
                fontFamily: "var(--font-scrawl), cursive",
                fontSize: "1.3rem",
                fontWeight: 400,
                color: "#fff",
                marginBottom: "0.5rem",
                textShadow: "0 0 5px rgba(255,60,20,0.3)",
              }}>
                {day.day} — {day.date}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {day.items.map((item, j) => (
                  <div
                    key={j}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      padding: "0.75rem 1rem",
                      background: "rgba(255,255,255,0.03)",
                      borderRadius: "6px",
                      borderLeft: `3px solid ${item.type === "golf" ? "rgba(34,197,94,0.6)" : item.type === "dining" ? "rgba(234,179,8,0.6)" : item.type === "nightlife" ? "rgba(168,85,247,0.6)" : "rgba(59,130,246,0.6)"}`,
                    }}
                  >
                    <span style={{ fontSize: "1.2rem" }}>
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
                ))}
              </div>
            </div>
          ))}
        </motion.section>
      )}

      {/* Section 3: 108 Chances to Bogey — Courses */}
      {trip.courses.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ position: "relative", zIndex: 1, padding: "3rem clamp(1.5rem, 6vw, 6rem)" }}
        >
          <h2 style={sectionHeadingStyle}>
            {isLive ? "108 Chances to Bogey" : "108 Chances to Bogey"}
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}>
            {trip.courses.map((course, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                style={cardStyle}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
              >
                {course.image && (
                  <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden" }}>
                    <Image src={course.image} alt={course.name} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 90vw, 33vw" />
                    {(holesPerCourse[course.name] || course.holes) && (
                      <div style={{
                        position: "absolute", top: "0.75rem", right: "0.75rem",
                        background: "rgba(0,0,0,0.7)", borderRadius: "4px",
                        padding: "2px 8px", fontFamily: "monospace", fontSize: "0.7rem",
                        color: "rgba(255,255,255,0.7)",
                      }}>
                        {holesPerCourse[course.name] || course.holes} holes
                      </div>
                    )}
                  </div>
                )}
                <div style={{ padding: "1rem 1.25rem" }}>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.4rem" }}>{course.name}</h3>
                  {course.description && (
                    <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.5, marginBottom: "0.75rem" }}>
                      {course.description}
                    </p>
                  )}
                  {course.url && (
                    <a
                      href={course.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: "0.75rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "rgba(220,38,38,0.8)",
                        textDecoration: "none",
                        fontWeight: 600,
                        display: "inline-block",
                        padding: "0.5rem 0",
                        minHeight: "44px",
                        lineHeight: "44px",
                      }}
                    >
                      Visit Course →
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Section 4: Devils' Lodging */}
      {hasLodging && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ position: "relative", zIndex: 1, padding: "3rem clamp(1.5rem, 6vw, 6rem)" }}
        >
          <h2 style={sectionHeadingStyle}>Home is Where Hell is</h2>

          {/* Hero lodging image */}
          <div style={{ position: "relative", aspectRatio: "16/9", borderRadius: "8px", overflow: "hidden", marginBottom: "1.5rem" }}>
            <Image
              src={trip.photoSections[0].images[0]}
              alt={trip.photoSections[0].label}
              fill
              style={{ objectFit: "cover" }}
              sizes="90vw"
            />
          </div>

          {/* Additional lodging images */}
          {trip.photoSections[0].images.length > 1 && (
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "0.75rem",
              marginBottom: "1.5rem",
            }}>
              {trip.photoSections[0].images.slice(1).map((img, i) => (
                <div key={i} style={{ position: "relative", aspectRatio: "4/3", borderRadius: "6px", overflow: "hidden" }}>
                  <Image src={img} alt={`Lodging ${i + 2}`} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 45vw, 25vw" />
                </div>
              ))}
            </div>
          )}

          {/* Address + booking link */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
            {trip.lodgingAddress && (
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(trip.lodgingAddress)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", textDecoration: "underline", textUnderlineOffset: "3px" }}
              >
                📍 {trip.lodgingAddress}
              </a>
            )}
          </div>
        </motion.section>
      )}

      {/* Section 5: Devils' Lettuce — Restaurants */}
      {hasRestaurants && restaurants && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ position: "relative", zIndex: 1, padding: "3rem clamp(1.5rem, 6vw, 6rem)" }}
        >
          <h2 style={sectionHeadingStyle}>Devils&apos; Lettuce</h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}>
            {restaurants.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                style={{
                  ...cardStyle,
                  padding: "1.25rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
              >
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>{r.name}</h3>
                {r.cuisine && (
                  <span style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
                    {r.cuisine}
                  </span>
                )}
                {r.note && (
                  <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", fontStyle: "italic" }}>{r.note}</p>
                )}
                {r.url && (
                  <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.75rem", color: "rgba(220,38,38,0.8)", textDecoration: "none", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", display: "inline-block", padding: "0.5rem 0", minHeight: "44px" }}>
                    Visit →
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Section 6: Lads on Tour — Photo Slideshow */}
      {trip.gallery.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ position: "relative", zIndex: 1, padding: "3rem clamp(1.5rem, 6vw, 6rem) 6rem" }}
        >
          <h2 style={sectionHeadingStyle}>Lads on Tour</h2>
          <PhotoSlideshow images={trip.gallery} />
        </motion.section>
      )}
    </main>
  );
}
