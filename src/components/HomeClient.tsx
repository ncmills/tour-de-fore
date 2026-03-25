"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Logo, { LogoFull } from "./Logo";

const VIDEO_HD = "https://videos.pexels.com/video-files/4784177/4784177-hd_1920_1080_30fps.mp4";
const VIDEO_POSTER = "https://images.squarespace-cdn.com/content/v1/62cb87cca6b36f353a2575d5/d0910eb3-ce7f-4395-8e75-06414a70a916/DSC01441.JPG";

function VideoBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={VIDEO_POSTER}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source src={VIDEO_HD} type="video/mp4" />
      </video>

      {/* Lighter center, dark edges + strong bottom fade */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.05) 25%, rgba(0,0,0,0.15) 55%, rgba(24,24,27,0.96) 100%)",
        }}
      />
    </div>
  );
}

function DoorCard({
  href,
  label,
  sublabel,
  variant,
  delay,
}: {
  href: string;
  label: string;
  sublabel: string;
  variant: "explore" | "yours";
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ flex: 1 }}
    >
      <motion.div
        whileHover="hover"
        initial="rest"
        animate="rest"
        className={`door-card door-card-${variant}`}
      >
        <Link href={href} style={{ display: "contents" }}>
          <span className="door-label">{label}</span>
          <span className="door-sublabel">{sublabel}</span>
          <motion.div
            className="door-bottom-line"
            variants={{
              rest: { scaleX: 0 },
              hover: { scaleX: 1, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
            }}
          />
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default function HomeClient() {
  return (
    <main
      data-lenis-prevent
      style={{ height: "100vh", overflow: "hidden", position: "relative" }}
    >
      <VideoBackground />

      {/* Logo mark — top left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        style={{ position: "absolute", top: "28px", left: "32px", zIndex: 20 }}
      >
        <Logo className="w-7 h-7" />
      </motion.div>

      {/* Est. — top right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        style={{ position: "absolute", top: "34px", right: "36px", zIndex: 20 }}
      >
        <span
          className="font-body"
          style={{
            fontSize: "0.55rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          Est. 2021
        </span>
      </motion.div>

      {/* Center — logo + tagline */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translateX(-50%) translateY(-58%)",
          textAlign: "center",
          width: "100%",
          zIndex: 10,
          padding: "0 32px",
        }}
      >
        {/* Black logo */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <LogoFull
            style={{
              width: "clamp(180px, 28vw, 320px)",
              height: "auto",
              filter: "brightness(0)",
            }}
          />
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            height: "1px",
            background: "linear-gradient(to right, transparent, rgba(234,88,12,0.8), transparent)",
            margin: "26px auto",
            width: "72px",
            transformOrigin: "center",
          }}
        />

        {/* Tagline — two lines, cinematic stagger */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", alignItems: "center" }}>
          <div style={{ overflow: "hidden" }}>
            <motion.p
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.9, delay: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-accent"
              style={{
                fontSize: "clamp(0.85rem, 1.6vw, 1.15rem)",
                fontStyle: "italic",
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.01em",
                lineHeight: 1,
              }}
            >
              hell is empty
            </motion.p>
          </div>
          <div style={{ overflow: "hidden" }}>
            <motion.p
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.9, delay: 1.75, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-accent"
              style={{
                fontSize: "clamp(0.85rem, 1.6vw, 1.15rem)",
                fontStyle: "italic",
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.01em",
                lineHeight: 1,
              }}
            >
              and all the devils are here
            </motion.p>
          </div>
        </div>
      </div>

      {/* Door cards */}
      <div
        style={{
          position: "absolute",
          bottom: "44px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "12px",
          zIndex: 10,
          width: "100%",
          maxWidth: "640px",
          padding: "0 24px",
        }}
      >
        <DoorCard
          href="/explore"
          label="Explore Tour De Fore"
          sublabel="All Trips · The Story · Photos"
          variant="explore"
          delay={2.1}
        />
        <DoorCard
          href="/yours"
          label="Your Tour De Fore"
          sublabel="Plan a Trip · Pro Shop"
          variant="yours"
          delay={2.3}
        />
      </div>
    </main>
  );
}
