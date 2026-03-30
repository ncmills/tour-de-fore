"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { useState, useCallback, useRef, useEffect } from "react";
import { trips } from "@/lib/trips";
import FireBackground from "./FireBackground";
import MulliganButton from "./MulliganButton";

const PAST_TRIPS_VIDEO = "/past-trips-hype.mp4";

const YEAR_HERO: Record<number, string> = {
  2021: "/photos/2021/IMG_0789.jpeg",
  2022: "/photos/2022/IMG_1762.jpeg",
  2023: "/photos/2023/DSC01476.jpeg",
  2024: "/photos/2024/IMG_6034.jpeg",
  2025: "/photos/2025/IMG_5751.jpeg",
};

export default function PastTripsClient() {
  const past = trips.filter((t) => !t.upcoming).sort((a, b) => b.year - a.year);
  const [isMuted, setIsMuted] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const screenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  }, []);

  useEffect(() => {
    const container = screenRef.current;
    if (!container) return;
    const v = document.createElement("video");
    v.muted = true;
    v.setAttribute("muted", "");
    v.setAttribute("autoplay", "");
    v.setAttribute("playsinline", "");
    v.autoplay = true;
    v.playsInline = true;
    v.loop = true;
    v.style.cssText = "width:100%;height:100%;object-fit:cover;display:block;position:absolute;inset:0;";
    v.src = PAST_TRIPS_VIDEO;
    v.load();
    videoRef.current = v;
    container.appendChild(v);
    v.play().catch(() => {});
    return () => { v.pause(); if (container.contains(v)) container.removeChild(v); videoRef.current = null; };
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        fontFamily: "var(--font-body), sans-serif",
      }}
    >
      <FireBackground />

      <MulliganButton right="clamp(1.5rem, 6vw, 4rem)" />

      {/* TV Video — sticky at top */}
      <div style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(1.5rem, 3vw, 3rem) 1.5rem clamp(1rem, 2vw, 2rem)",
        background: "linear-gradient(180deg, #000 70%, transparent 100%)",
      }}>
        <div style={{ position: "relative", width: "min(clamp(220px, 38vh, 380px), 85vw)" }}>
          {/* TV Housing */}
          <div style={{
            background: "linear-gradient(160deg, #4a4a4a 0%, #2a2a2a 40%, #1a1a1a 100%)",
            borderRadius: "clamp(12px, 2vw, 22px) clamp(12px, 2vw, 22px) clamp(6px, 1vw, 10px) clamp(6px, 1vw, 10px)",
            padding: "clamp(16px, 2.2vw, 28px) clamp(16px, 2.2vw, 28px) clamp(10px, 1.4vw, 16px)",
            boxShadow: "inset 4px 4px 0 rgba(255,255,255,0.09), inset -4px -4px 0 rgba(0,0,0,0.6), inset 0 0 60px rgba(0,0,0,0.2), 0 30px 100px rgba(0,0,0,0.95), 0 10px 30px rgba(0,0,0,0.7)",
            position: "relative",
          }}>
            {/* Screen bezel */}
            <div style={{
              background: "linear-gradient(145deg, #111, #0a0a0a)",
              borderRadius: "clamp(8px, 1.2vw, 14px)",
              padding: "clamp(8px, 1vw, 13px)",
              boxShadow: "inset 0 0 0 2px rgba(0,0,0,0.8), inset 4px 4px 10px rgba(0,0,0,0.9), inset -4px -4px 10px rgba(0,0,0,0.7)",
            }}>
              {/* Screen */}
              <div style={{
                position: "relative",
                borderRadius: "clamp(6px, 0.9vw, 12px)",
                overflow: "hidden",
                aspectRatio: "1/1",
                background: "#000",
                boxShadow: "inset 0 0 0 2px rgba(0,0,0,0.9), inset 8px 8px 20px rgba(0,0,0,0.7), inset -8px -8px 20px rgba(0,0,0,0.5), inset 0 0 40px rgba(0,0,0,0.4)",
              }}>
                <div ref={screenRef} style={{ position: "absolute", inset: 0 }} />
                {/* Scanlines */}
                <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0,0,0,0.22) 2px, rgba(0,0,0,0.22) 4px)" }} />
                {/* CRT vignette */}
                <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 80% 75% at 50% 50%, transparent 35%, rgba(0,0,0,0.7) 100%)" }} />
                {/* Unmute button */}
                {isMuted && (
                  <button
                    onClick={toggleMute}
                    style={{
                      position: "absolute", bottom: "clamp(8px, 2vh, 16px)", right: "clamp(8px, 2vw, 16px)", zIndex: 20,
                      background: "rgba(0,0,0,0.7)", border: "1px solid rgba(255,255,255,0.4)", borderRadius: "6px",
                      padding: "6px 12px", cursor: "pointer", color: "#fff", display: "flex", alignItems: "center", gap: "6px",
                      backdropFilter: "blur(4px)", transition: "background 0.2s, border-color 0.2s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,0,0,0.9)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,0,0,0.7)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                    <span style={{ fontFamily: "monospace", fontSize: "clamp(9px, 1.2vw, 12px)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Unmute</span>
                  </button>
                )}
              </div>
            </div>
            {/* Control panel */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "clamp(8px, 1.1vw, 14px)", padding: "0 clamp(2px, 0.4vw, 6px)" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontFamily: "monospace", fontSize: "clamp(7px, 0.75vw, 10px)", letterSpacing: "0.3em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>TDF</span>
                <span style={{ fontFamily: "monospace", fontSize: "clamp(6px, 0.6vw, 8px)", color: "rgba(255,255,255,0.12)" }}>CH 03</span>
              </div>
              <div style={{ width: "clamp(5px, 0.55vw, 7px)", height: "clamp(5px, 0.55vw, 7px)", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e, 0 0 14px rgba(34,197,94,0.5)" }} />
              <div style={{ display: "flex", gap: "clamp(6px, 0.8vw, 11px)", alignItems: "center" }}>
                <div style={{ width: "clamp(16px, 1.9vw, 24px)", height: "clamp(16px, 1.9vw, 24px)", borderRadius: "50%", background: "radial-gradient(circle at 30% 30%, #555, #1a1a1a)", boxShadow: "0 3px 6px rgba(0,0,0,0.95), inset 0 1px 0 rgba(255,255,255,0.07)" }} />
                {[11, 9].map((size, i) => (
                  <div key={i} style={{ width: size, height: size, borderRadius: "50%", background: "radial-gradient(circle at 32% 32%, #444, #1a1a1a)", boxShadow: "0 2px 4px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.05)" }} />
                ))}
              </div>
            </div>
          </div>
          {/* Stand */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "clamp(50px, 6.5vw, 80px)", height: "clamp(8px, 0.9vw, 12px)", background: "linear-gradient(180deg, #2a2a2a, #1a1a1a)", borderRadius: "0 0 5px 5px", boxShadow: "0 4px 12px rgba(0,0,0,0.6)" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "clamp(30px, 4vw, 50px)", marginTop: "1px" }}>
            {[0, 1].map(i => (
              <div key={i} style={{ width: "clamp(24px, 2.8vw, 36px)", height: "clamp(6px, 0.7vw, 9px)", background: "#181818", borderRadius: "0 0 5px 5px" }} />
            ))}
          </div>
        </div>
      </div>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{ textAlign: "center", padding: "1.5rem clamp(1.5rem, 6vw, 6rem) 0" }}
      >
        <h1 style={{
          fontFamily: "var(--font-scrawl), cursive",
          fontSize: "clamp(2rem, 6vw, 4rem)",
          fontWeight: 400,
          color: "#fff",
          textShadow: "0 0 7px rgba(255,60,20,0.6), 0 0 20px rgba(255,60,20,0.3)",
          marginBottom: "0.3rem",
        }}>
          The Archives
        </h1>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "monospace" }}>
          {past.length} trips · {past.reduce((s, t) => s + t.courses.length, 0)} courses · countless beers
        </p>
      </motion.div>

      {/* Year grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        style={{ padding: "1.5rem clamp(1.5rem, 6vw, 6rem) 6rem" }}
      >
        {past.map((trip, i) => (
          <Link
            key={trip.slug}
            href={`/past-trips/${trip.year}`}
            style={{ textDecoration: "none", color: "inherit", display: "block" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + i * 0.12 }}
              className="trip-card"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.08)",
                paddingTop: "3rem",
                paddingBottom: "3rem",
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: isMobile ? "1.5rem" : "clamp(2rem, 5vw, 5rem)",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <div
                className="trip-img"
                style={{
                  display: "block",
                  aspectRatio: "4/3",
                  position: "relative",
                  borderRadius: "4px",
                  overflow: "hidden",
                  order: isMobile ? 0 : (i % 2 === 0 ? 0 : 1),
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
              </div>

              <div className="trip-text" style={{ order: isMobile ? 1 : (i % 2 === 0 ? 1 : 0) }}>
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "0.8rem", fontFamily: "monospace" }}>
                  {trip.dates}
                </p>
                <h2 style={{
                  fontFamily: "var(--font-scrawl), cursive",
                  fontSize: "clamp(2.5rem, 6vw, 5rem)",
                  fontWeight: 400,
                  lineHeight: 0.95,
                  letterSpacing: "0.02em",
                  marginBottom: "0.6rem",
                  color: "#fff",
                  textShadow: "0 0 7px rgba(255,60,20,0.6), 0 0 20px rgba(255,60,20,0.3), 0 0 40px rgba(255,30,10,0.15)",
                }}>
                  {trip.year}
                </h2>
                <p style={{
                  fontFamily: "var(--font-scrawl), cursive",
                  fontSize: "clamp(1rem, 2vw, 1.4rem)",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.85)",
                  marginBottom: "0.5rem",
                }}>
                  {trip.location}, {trip.state}
                </p>
                {trip.courses.length > 0 && (
                  <p style={{ fontSize: "0.75rem", letterSpacing: "0.06em", color: "rgba(255,255,255,0.25)", lineHeight: 1.8, fontFamily: "monospace" }}>
                    {trip.courses.map((c) => c.name).join("  ·  ")}
                  </p>
                )}
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </main>
  );
}
