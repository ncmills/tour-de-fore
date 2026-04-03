"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "motion/react";
import { homepageClips, shuffleClips } from "@/data/homepage-clips";

// Layout configurations for CSS grid
const LAYOUTS = [
  // Layout A: 2x2 equal
  { cols: "1fr 1fr", rows: "1fr 1fr", cells: 4, name: "2x2" },
  // Layout B: 1 hero left + 3 stacked right
  { cols: "3fr 2fr", rows: "1fr 1fr 1fr", cells: 4, name: "hero-left",
    areas: `"a b" "a c" "a d"` },
  // Layout C: horizontal strips
  { cols: "1fr 1fr", rows: "2fr 1fr 2fr", cells: 4, name: "strips",
    areas: `"a a" "b c" "d d"` },
  // Layout D: full bleed single
  { cols: "1fr", rows: "1fr", cells: 1, name: "full-bleed" },
  // Layout E: mobile stacked (2 videos top/bottom)
  { cols: "1fr", rows: "1fr 1fr", cells: 2, name: "mobile-stack" },
];

const CYCLE_INTERVAL = 12000; // 12s between layout changes

interface VideoGridProps {
  active: boolean; // true when phase === "done"
}

export default function VideoGrid({ active }: VideoGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const clipQueue = useRef<string[]>(shuffleClips(homepageClips));
  const clipIndex = useRef(0);
  const [isMobile, setIsMobile] = useState(false);
  const [layoutIdx, setLayoutIdx] = useState(0);

  // Track mobile + set initial layout
  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth <= 640;
      setIsMobile(mobile);
    };
    check();
    // Set correct initial layout for mobile (full-bleed)
    if (window.innerWidth <= 640) setLayoutIdx(3);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Get next clip from shuffled queue
  const getNextClip = useCallback(() => {
    const clip = clipQueue.current[clipIndex.current % clipQueue.current.length];
    clipIndex.current++;
    // Reshuffle when we cycle through all
    if (clipIndex.current >= clipQueue.current.length) {
      clipQueue.current = shuffleClips(homepageClips);
      clipIndex.current = 0;
    }
    return clip;
  }, []);

  // Create a video element imperatively (iOS Safari safe)
  const createVideo = useCallback((src: string): HTMLVideoElement => {
    const v = document.createElement("video");
    v.muted = true;
    v.setAttribute("muted", "");
    v.setAttribute("autoplay", "");
    v.setAttribute("playsinline", "");
    v.setAttribute("loop", "");
    v.autoplay = true;
    v.playsInline = true;
    v.loop = true;
    v.preload = "metadata";
    v.style.cssText = "position:absolute;inset:0;width:100%;height:100%;object-fit:cover;will-change:opacity;";
    v.src = src;
    v.load();
    v.play().catch(() => {});
    return v;
  }, []);

  // Initialize grid cells with videos
  useEffect(() => {
    if (!active || !containerRef.current) return;

    const cells = containerRef.current.querySelectorAll<HTMLDivElement>("[data-cell]");
    const maxCells = isMobile ? 2 : 4;

    cells.forEach((cell, i) => {
      if (i >= maxCells) return;
      // Clear existing
      const existing = cell.querySelector("video");
      if (existing) return; // Already has video

      const clip = getNextClip();
      const v = createVideo(clip);
      cell.appendChild(v);
      videoRefs.current[i] = v;
    });

    return () => {
      videoRefs.current.forEach(v => { v?.pause(); v?.remove(); });
      videoRefs.current = [];
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  // Layout cycling timer
  useEffect(() => {
    if (!active) return;

    const layouts = isMobile ? [3, 4] : [0, 1, 2, 3]; // Mobile: full-bleed + stacked only
    let currentIdx = 0;

    const interval = setInterval(() => {
      currentIdx = (currentIdx + 1) % layouts.length;
      setLayoutIdx(layouts[currentIdx]);

      // Swap 1-2 videos on layout change
      const cells = containerRef.current?.querySelectorAll<HTMLDivElement>("[data-cell]");
      if (cells) {
        const swapCount = layouts[currentIdx] === 3 ? 1 : 2;
        const cellArr = Array.from(cells);
        const toSwap = cellArr
          .sort(() => Math.random() - 0.5)
          .slice(0, swapCount);

        toSwap.forEach(cell => {
          const oldVideo = cell.querySelector("video");
          if (oldVideo) {
            const newClip = getNextClip();
            const newVideo = createVideo(newClip);
            newVideo.style.opacity = "0";
            newVideo.style.transition = "opacity 0.8s ease";
            cell.appendChild(newVideo);

            requestAnimationFrame(() => {
              newVideo.style.opacity = "1";
              oldVideo.style.transition = "opacity 0.8s ease";
              oldVideo.style.opacity = "0";
            });

            setTimeout(() => {
              oldVideo.pause();
              oldVideo.remove();
            }, 900);
          }
        });
      }
    }, CYCLE_INTERVAL);

    return () => clearInterval(interval);
  }, [active, isMobile, getNextClip, createVideo]);


  const layout = LAYOUTS[layoutIdx];
  const cellCount = layout.cells;

  // Build grid style
  const gridStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    display: "grid",
    gridTemplateColumns: layout.cols,
    gridTemplateRows: layout.rows,
    ...(layout.areas ? { gridTemplateAreas: layout.areas } : {}),
    gap: "2px",
    transition: "grid-template-columns 0.8s cubic-bezier(0.4,0,0.2,1), grid-template-rows 0.8s cubic-bezier(0.4,0,0.2,1)",
  };

  const cellNames = ["a", "b", "c", "d"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 1.8 }}
      style={{ position: "absolute", inset: 0 }}
    >
      {/* Video grid */}
      <div ref={containerRef} style={gridStyle}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            data-cell
            style={{
              position: "relative",
              overflow: "hidden",
              ...(layout.areas ? { gridArea: cellNames[i] } : {}),
              display: i >= cellCount ? "none" : "block",
            }}
          />
        ))}
      </div>

      {/* Neon orange grid lines glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          boxShadow: "inset 0 0 0 1px rgba(255,106,40,0.3)",
        }}
      />

      {/* Dark overlay for legibility */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", pointerEvents: "none" }} />

      {/* CRT scanline overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)",
          opacity: 0.5,
        }}
      />

    </motion.div>
  );
}
