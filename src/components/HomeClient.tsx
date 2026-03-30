"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import TubeTv from "./TubeTv";

const VIDEO_HD = "/bg.mp4";
const HYPE_VIDEO = "/hype-audio.mp4"; // has audio; TubeTv starts muted, user can unmute

const textStyle: React.CSSProperties = {
  fontFamily: "var(--font-scrawl), cursive",
  fontSize: "clamp(1.3rem, 3.5vw, 3.5rem)",
  color: "rgba(255,255,255,0.9)",
  lineHeight: 1,
  margin: 0,
  padding: 0,
  textAlign: "center",
  textShadow: "0 0 8px rgba(255,60,20,0.4), 0 0 20px rgba(255,60,20,0.15)",
};

type Phase = "text" | "tv" | "done";

export default function HomeClient() {
  const params = useSearchParams();
  const skip = params.get("skip") === "1";

  const [phase, setPhase] = useState<Phase>(skip ? "done" : "text");
  const [showLinks, setShowLinks] = useState(skip);
  const [logoVisible, setLogoVisible] = useState(skip);
  const [logoUninverted, setLogoUninverted] = useState(skip);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredSubtitle, setHoveredSubtitle] = useState<string | null>(null);
  const [typedText, setTypedText] = useState("");
  const [ambientOn, setAmbientOn] = useState(false);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const ambientAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const container = bgVideoRef.current as unknown as HTMLDivElement;
    if (!container) return;
    const v = document.createElement("video");
    // CRITICAL: set muted BEFORE src — iOS Safari requirement
    v.muted = true;
    v.setAttribute("muted", "");
    v.setAttribute("autoplay", "");
    v.setAttribute("playsinline", "");
    v.setAttribute("loop", "");
    v.autoplay = true;
    v.playsInline = true;
    v.loop = true;
    v.style.cssText = "position:absolute;inset:0;width:100%;height:100%;object-fit:cover;";
    v.src = VIDEO_HD;
    v.load();
    container.appendChild(v);
    v.play().catch(() => {});
    return () => { v.pause(); if (container.contains(v)) container.removeChild(v); };
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // After text animations finish, show TV
  useEffect(() => {
    if (skip) return;
    const t = setTimeout(() => setPhase("tv"), 3500);
    return () => clearTimeout(t);
  }, [skip]);

  // After logo is visible as white for a moment, start bg + uninversion concurrently
  useEffect(() => {
    if (!logoVisible || logoUninverted) return;
    const t = setTimeout(() => setLogoUninverted(true), 1000);
    return () => clearTimeout(t);
  }, [logoVisible, logoUninverted]);

  const toggleAmbient = useCallback(() => {
    if (!ambientAudioRef.current) {
      const audio = new Audio("/ambient.mp3");
      audio.loop = true;
      audio.volume = 0.5;
      ambientAudioRef.current = audio;
    }
    if (!ambientOn) {
      ambientAudioRef.current.play().catch(() => {});
      setAmbientOn(true);
    } else {
      ambientAudioRef.current.pause();
      setAmbientOn(false);
    }
  }, [ambientOn]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => { ambientAudioRef.current?.pause(); };
  }, []);

  // Typewriter effect for hovered subtitle
  useEffect(() => {
    if (!hoveredSubtitle) { setTypedText(""); return; }
    setTypedText("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTypedText(hoveredSubtitle.slice(0, i));
      if (i >= hoveredSubtitle.length) clearInterval(id);
    }, 45);
    return () => clearInterval(id);
  }, [hoveredSubtitle]);

  const handleExplodeStart = useCallback(() => {}, []);

  const handleTvDone = useCallback(() => {
    setPhase("done");
  }, []);

  // Show logo only after text exit animation completes (triggered by onExitComplete)
  const handleTextExitComplete = useCallback(() => {
    setLogoVisible(true);
  }, []);

  // Show links after logo becomes visible
  useEffect(() => {
    if (!logoVisible) return;
    const t = setTimeout(() => setShowLinks(true), 2500);
    return () => clearTimeout(t);
  }, [logoVisible]);

  return (
    <main style={{ height: "100vh", overflow: "hidden", position: "relative", background: "#000" }}>

      {/* Background video — fades in concurrently with logo going to black */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: logoUninverted ? 1 : 0 }}
        transition={{ duration: 1.8 }}
        style={{ position: "absolute", inset: 0 }}
      >
        {/* Video injected imperatively (iOS autoplay fix — muted must be set before src) */}
        <div ref={bgVideoRef as unknown as React.RefObject<HTMLDivElement>} style={{ position: "absolute", inset: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)" }} />
      </motion.div>

      {/* ── FULL-HEIGHT FLEX: TV + text in one column ── */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "clamp(12px, 2vh, 24px)",
        padding: "3vh 1.5rem",
      }}>
        {/* TV + Text — fade out together as one unit */}
        <AnimatePresence onExitComplete={handleTextExitComplete}>
          {phase !== "done" && (
            <motion.div
              key="tv-and-text"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "clamp(12px, 2vh, 24px)",
              }}
            >
              {/* TV — only during tv phase */}
              {phase === "tv" && (
                <TubeTv
                  videoSrc={HYPE_VIDEO}
                  onExplodeStart={handleExplodeStart}
                  onComplete={handleTvDone}
                />
              )}

              {/* Text lines */}
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0,
              }}>
                <motion.p
                  style={{ ...textStyle, clipPath: "inset(0 105% 0 -5px)" }}
                  animate={{ clipPath: "inset(0 -5px 0 -5px)" }}
                  transition={{ duration: 1.4, delay: 0.3, ease: [0.25, 0.0, 0.35, 1.0] }}
                >
                  hell is empty
                </motion.p>
                <motion.p
                  style={{ ...textStyle, clipPath: "inset(0 105% 0 -5px)" }}
                  animate={{ clipPath: "inset(0 -5px 0 -5px)" }}
                  transition={{ duration: 1.6, delay: 1.2, ease: [0.25, 0.0, 0.35, 1.0] }}
                >
                  all the devils are here
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Logo + subtitle above it — always in DOM, visibility controlled by animation */}
        <motion.div
          style={{ position: "absolute", display: "flex", flexDirection: "column", alignItems: "center" }}
          initial={skip
            ? { opacity: 1, scale: 1, filter: "invert(0)" }
            : { opacity: 0, scale: 1.1, filter: "invert(1)" }
          }
          animate={
            skip ? {}
            : logoUninverted ? { opacity: 1, scale: 1, filter: "invert(0)" }
            : logoVisible ? { opacity: 1, scale: 1, filter: "invert(1)" }
            : { opacity: 0, scale: 1.1, filter: "invert(1)" }
          }
          transition={
            logoUninverted
              ? { duration: 1.8 }
              : logoVisible
              ? { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
              : {}
          }
        >
          {/* Hovered subtitle — typewriter in sandtrap */}
          <span
            style={{
              fontFamily: "var(--font-scrawl), cursive",
              fontSize: "clamp(1.4rem, 2.4vw, 2rem)",
              color: "#d4a843",
              fontWeight: 400,
              letterSpacing: "0.06em",
              opacity: hoveredSubtitle ? 1 : 0,
              transition: "opacity 0.25s",
              whiteSpace: "nowrap",
              marginBottom: "0.5rem",
              minHeight: "2rem",
              padding: "0.2em 0.8em",
              background: hoveredSubtitle ? "rgba(194,160,80,0.15)" : "transparent",
              borderRadius: "6px",
              textShadow: "0 0 12px rgba(212,168,67,0.4)",
            }}
          >
            {typedText || "\u00A0"}
          </span>
          <Image
            src="/logo-full.png"
            alt="Tour de Fore"
            width={4504}
            height={3776}
            priority
            style={{ width: isMobile ? "clamp(150px, 45vw, 220px)" : "clamp(200px, 22vw, 340px)", height: "auto", filter: "brightness(0)" }}
          />
        </motion.div>
      </div>

      {/* ── CENTER: links (same position as original) ── */}
      <AnimatePresence>
        {showLinks && (
          <motion.div
            key="links"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0 }}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 20,
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              flexWrap: isMobile ? "nowrap" : "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: isMobile ? "0.8rem" : "1rem 2.5rem",
              paddingTop: isMobile ? "clamp(240px, 50vh, 360px)" : "clamp(300px, 42vh, 400px)",
              paddingLeft: "1.5rem",
              paddingRight: "1.5rem",
            }}
          >
            {[
              { label: "Shop", href: "/shop", subtitle: "devils gotta eat", blood: false },
              { label: "Then", href: "/past-trips", subtitle: "devils were here", blood: false },
              { label: "Now", href: "/trip/2026", subtitle: "devils are here", blood: false },
              { label: "Plan a Trip", href: "/plan-a-trip", subtitle: "so you wanna be a devil?", blood: true },
            ].map(({ label, href, subtitle, blood }) => (
              <Link
                key={label}
                href={href}
                onClick={() => { try { sessionStorage.setItem("tdf-explode", "1"); } catch {} }}
                style={{
                  fontFamily: "var(--font-scrawl), cursive",
                  fontSize: isMobile ? "clamp(1.4rem, 6vw, 2rem)" : "clamp(1.8rem, 3.5vw, 3.5rem)",
                  color: blood ? "#fff" : "rgba(255,255,255,0.7)",
                  textDecoration: "none",
                  transition: "color 0.2s, background 0.3s, text-shadow 0.3s",
                  textShadow: "0 0 8px rgba(255,60,20,0.3), 0 0 20px rgba(255,60,20,0.15)",
                  ...(blood ? {
                    background: "radial-gradient(ellipse at 50% 60%, rgba(139,0,0,0.7) 0%, rgba(180,20,20,0.45) 40%, rgba(120,0,0,0.2) 70%, transparent 100%)",
                    padding: "0.3em 1em",
                    borderRadius: "50% / 40%",
                    textShadow: "0 0 20px rgba(200,0,0,0.5), 0 2px 4px rgba(0,0,0,0.5)",
                  } : {}),
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = "rgba(255,255,255,1)";
                  e.currentTarget.style.textShadow = "0 0 12px rgba(255,60,20,0.6), 0 0 30px rgba(255,60,20,0.3)";
                  setHoveredSubtitle(subtitle);
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = blood ? "#fff" : "rgba(255,255,255,0.7)";
                  e.currentTarget.style.textShadow = blood ? "0 0 20px rgba(200,0,0,0.5), 0 2px 4px rgba(0,0,0,0.5)" : "0 0 8px rgba(255,60,20,0.3), 0 0 20px rgba(255,60,20,0.15)";
                  setHoveredSubtitle(null);
                }}
              >
                {label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Ambient sound toggle — always in DOM, visible only when done ── */}
      <button
        onClick={toggleAmbient}
        title={ambientOn ? "Mute ambient sound" : "Play ambient sound"}
        style={{
          position: "fixed",
          top: "1.2rem",
          left: "1.4rem",
          zIndex: 9999,
          background: "rgba(255,255,255,0.22)",
          border: "2px solid rgba(255,255,255,0.6)",
          borderRadius: "50%",
          width: 48,
          height: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "#fff",
          backdropFilter: "blur(8px)",
          opacity: phase === "done" ? 1 : 0,
          pointerEvents: phase === "done" ? "auto" : "none",
          transition: "opacity 1s ease",
        }}
      >
        {ambientOn ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <line x1="23" y1="9" x2="17" y2="15"/>
            <line x1="17" y1="9" x2="23" y2="15"/>
          </svg>
        )}
      </button>

    </main>
  );
}
