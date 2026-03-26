"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import TubeTv from "./TubeTv";

const VIDEO_HD =
  "https://videos.pexels.com/video-files/4784177/4784177-hd_1920_1080_30fps.mp4";
const HYPE_VIDEO = "/hype.mov";

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

export default function HomeClient() {
  const params = useSearchParams();
  const skip = params.get("skip") === "1";

  const [phase, setPhase] = useState<Phase>(skip ? "done" : "text");
  const [showLinks, setShowLinks] = useState(skip);
  const [logoVisible, setLogoVisible] = useState(skip);
  const [logoUninverted, setLogoUninverted] = useState(skip);
  const [isMobile, setIsMobile] = useState(false);
  const bgVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = bgVideoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
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
    const t = setTimeout(() => setPhase("tv"), 4500);
    return () => clearTimeout(t);
  }, [skip]);

  // Uninvert logo shortly after it appears
  useEffect(() => {
    if (!logoVisible || logoUninverted) return;
    const t = setTimeout(() => setLogoUninverted(true), 600);
    return () => clearTimeout(t);
  }, [logoVisible, logoUninverted]);

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
        <video ref={bgVideoRef} autoPlay muted loop playsInline
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        >
          <source src={VIDEO_HD} type="video/mp4" />
        </video>
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
              transition={{ duration: 1.6, delay: 2.2, ease: [0.25, 0.0, 0.35, 1.0] }}
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

    </main>
  );
}
