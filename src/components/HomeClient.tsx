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
  fontFamily: "var(--font-script), cursive",
  fontSize: "clamp(1.3rem, 3.5vw, 3.5rem)",
  color: "rgba(255,255,255,0.9)",
  lineHeight: 1,
  margin: 0,
  padding: 0,
  textAlign: "center",
};

type Phase = "text" | "tv" | "done";

function scheduleChirp(ctx: AudioContext) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const baseFreq = 2200 + Math.random() * 1800;
  osc.type = "sine";
  osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.6, ctx.currentTime + 0.07);
  osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.85, ctx.currentTime + 0.18);
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.045, ctx.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.25);
  const next = 3500 + Math.random() * 9000;
  setTimeout(() => { if (ctx.state !== "closed") scheduleChirp(ctx); }, next);
}

function initAmbientAudio(): AudioContext {
  const ctx = new AudioContext();

  // Brown noise (wind) — random buffer filtered low
  const bufferSize = 2 * ctx.sampleRate;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let lastOut = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    data[i] = (lastOut + 0.02 * white) / 1.02;
    lastOut = data[i];
    data[i] *= 3.5;
  }
  const windSrc = ctx.createBufferSource();
  windSrc.buffer = buffer;
  windSrc.loop = true;
  const lpf = ctx.createBiquadFilter();
  lpf.type = "lowpass";
  lpf.frequency.value = 350;
  const windGain = ctx.createGain();
  windGain.gain.value = 0.18;
  windSrc.connect(lpf);
  lpf.connect(windGain);
  windGain.connect(ctx.destination);
  windSrc.start();

  // Bird chirps
  setTimeout(() => { if (ctx.state !== "closed") scheduleChirp(ctx); }, 1500 + Math.random() * 2500);

  return ctx;
}

export default function HomeClient() {
  const params = useSearchParams();
  const skip = params.get("skip") === "1";

  const [phase, setPhase] = useState<Phase>(skip ? "done" : "text");
  const [showLinks, setShowLinks] = useState(skip);
  const [logoVisible, setLogoVisible] = useState(skip);
  const [logoUninverted, setLogoUninverted] = useState(skip);
  const [isMobile, setIsMobile] = useState(false);
  const [ambientOn, setAmbientOn] = useState(false);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

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

  // Uninvert logo shortly after it appears
  useEffect(() => {
    if (!logoVisible || logoUninverted) return;
    const t = setTimeout(() => setLogoUninverted(true), 600);
    return () => clearTimeout(t);
  }, [logoVisible, logoUninverted]);

  const toggleAmbient = useCallback(() => {
    if (!ambientOn) {
      if (!audioCtxRef.current) {
        audioCtxRef.current = initAmbientAudio();
      } else {
        audioCtxRef.current.resume();
      }
      setAmbientOn(true);
    } else {
      audioCtxRef.current?.suspend();
      setAmbientOn(false);
    }
  }, [ambientOn]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => { audioCtxRef.current?.close(); };
  }, []);

  const handleExplodeStart = useCallback(() => {}, []);

  const handleTvDone = useCallback(() => {
    setLogoVisible(true);
    setPhase("done");
    setTimeout(() => setShowLinks(true), 2500);
  }, []);

  return (
    <main style={{ height: "100vh", overflow: "hidden", position: "relative", background: "#000" }}>

      {/* Background video */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "done" ? 1 : 0 }}
        transition={{ duration: 1.8, delay: phase === "done" ? 0.4 : 0 }}
        style={{ position: "absolute", inset: 0 }}
      >
        {/* Video injected imperatively (iOS autoplay fix — muted must be set before src) */}
        <div ref={bgVideoRef as unknown as React.RefObject<HTMLDivElement>} style={{ position: "absolute", inset: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)" }} />
      </motion.div>

      {/* ── CENTER: TV or Logo ── */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: "18vh", // leave room for text at bottom
      }}>
        {/* TV */}
        <AnimatePresence>
          {phase === "tv" && (
            <motion.div
              key="tv"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0 } }}
              transition={{ duration: 0.4 }}
              style={{ position: "absolute" }}
            >
              <TubeTv
                videoSrc={HYPE_VIDEO}
                onExplodeStart={handleExplodeStart}
                onComplete={handleTvDone}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Logo */}
        <motion.div
          style={{ position: "absolute" }}
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
          <Image
            src="/logo-full.png"
            alt="Tour de Fore"
            width={4504}
            height={3776}
            priority
            style={{ width: "clamp(200px, 22vw, 340px)", height: "auto", filter: "brightness(0)" }}
          />
        </motion.div>
      </div>

      {/* ── BOTTOM: text lines ── */}
      <AnimatePresence>
        {!showLinks && phase !== "done" && (
          <motion.div
            key="text"
            className="home-text"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            style={{
              position: "absolute",
              bottom: isMobile ? "calc(50vh - 1.5in)" : "8vh",
              left: 0, right: 0,
              zIndex: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0,
              padding: "0 1.5rem",
            }}
          >
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
          </motion.div>
        )}
      </AnimatePresence>

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
              alignItems: "center",
              justifyContent: "center",
              gap: "2.5rem",
              paddingTop: "2in",
            }}
          >
            {["Shop", "Past Trips", "Plan a Trip"].map((label) => (
              <Link
                key={label}
                href={`/${label.toLowerCase().replace(/ /g, "-")}`}
                style={{
                  fontFamily: "var(--font-script), cursive",
                  fontSize: "clamp(1.8rem, 3.5vw, 3.5rem)",
                  color: "rgba(255,255,255,0.7)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,1)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
              >
                {label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Ambient sound toggle (bottom-right, appears when done) ── */}
      <AnimatePresence>
        {phase === "done" && (
          <motion.button
            key="ambient"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            onClick={toggleAmbient}
            title={ambientOn ? "Mute ambient sound" : "Play ambient sound"}
            style={{
              position: "absolute",
              top: "1.2rem",
              left: "1.4rem",
              zIndex: 30,
              background: "rgba(255,255,255,0.2)",
              border: "1px solid rgba(255,255,255,0.5)",
              borderRadius: "50%",
              width: 44,
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(6px)",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.35)";
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,1)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.2)";
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.9)";
            }}
          >
            {ambientOn ? (
              // Speaker with waves
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
              </svg>
            ) : (
              // Speaker muted (X)
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <line x1="23" y1="9" x2="17" y2="15"/>
                <line x1="17" y1="9" x2="23" y2="15"/>
              </svg>
            )}
          </motion.button>
        )}
      </AnimatePresence>

    </main>
  );
}
