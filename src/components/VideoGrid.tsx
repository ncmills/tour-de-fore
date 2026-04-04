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

const LAYOUT_MIN_MS = 6000;
const LAYOUT_MAX_MS = 10000;
const VIDEO_MAX_MS = 10000; // Hard cap: 10s per video
const VIDEO_MAX_LOOPS = 2;
const FADE_MS = 400;
const INIT_STAGGER_MS = 300;

interface VideoGridProps {
  active: boolean;
}

// Per-cell state for independent lifetime tracking
interface CellState {
  video: HTMLVideoElement;
  timer: ReturnType<typeof setTimeout> | null;
  loopCount: number;
  swapped: boolean; // guard against double-swap
  onEnded: () => void; // stored for cleanup
}

export default function VideoGrid({ active }: VideoGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cellStates = useRef<(CellState | null)[]>([null, null, null, null]);
  const clipQueue = useRef<string[]>(shuffleClips(homepageClips));
  const clipIndex = useRef(0);
  const prefetchEl = useRef<HTMLVideoElement | null>(null);
  const layoutTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);
  const [layoutIdx, setLayoutIdx] = useState(0);

  // Track mobile + set initial layout
  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth <= 640;
      setIsMobile(mobile);
    };
    check();
    if (window.innerWidth <= 640) setLayoutIdx(3);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Get next clip from shuffled queue
  const getNextClip = useCallback(() => {
    const clip = clipQueue.current[clipIndex.current % clipQueue.current.length];
    clipIndex.current++;
    if (clipIndex.current >= clipQueue.current.length) {
      clipQueue.current = shuffleClips(homepageClips);
      clipIndex.current = 0;
    }
    return clip;
  }, []);

  // Prefetch the next video so it's buffered and ready
  const prefetchNext = useCallback(() => {
    const src = getNextClip();
    const v = document.createElement("video");
    v.muted = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    v.playsInline = true;
    v.preload = "auto";
    v.src = src;
    v.load();
    prefetchEl.current = v;
  }, [getNextClip]);

  // Create a video element (iOS Safari safe)
  const createVideo = useCallback((src?: string): HTMLVideoElement => {
    // Use prefetched video if available and no specific src requested
    if (!src && prefetchEl.current) {
      const v = prefetchEl.current;
      prefetchEl.current = null;
      v.autoplay = true;
      v.setAttribute("autoplay", "");
      v.loop = false;
      v.style.cssText = "position:absolute;inset:0;width:100%;height:100%;object-fit:cover;will-change:opacity;";
      return v;
    }
    const videoSrc = src || getNextClip();
    const v = document.createElement("video");
    v.muted = true;
    v.setAttribute("muted", "");
    v.setAttribute("autoplay", "");
    v.setAttribute("playsinline", "");
    v.autoplay = true;
    v.playsInline = true;
    v.loop = false;
    v.preload = "auto";
    v.style.cssText = "position:absolute;inset:0;width:100%;height:100%;object-fit:cover;will-change:opacity;";
    v.src = videoSrc;
    v.load();
    return v;
  }, [getNextClip]);

  // Swap a single cell's video with fade transition
  const swapCell = useCallback((cellIdx: number) => {
    if (!activeRef.current) return;
    const container = containerRef.current;
    if (!container) return;
    const cells = container.querySelectorAll<HTMLDivElement>("[data-cell]");
    const cell = cells[cellIdx];
    if (!cell) return;

    const state = cellStates.current[cellIdx];
    if (state) {
      if (state.timer) clearTimeout(state.timer);
      state.swapped = true;
      const oldVideo = state.video;
      oldVideo.removeEventListener("ended", state.onEnded);
      oldVideo.style.transition = `opacity ${FADE_MS}ms ease`;
      oldVideo.style.opacity = "0";
      setTimeout(() => { oldVideo.pause(); oldVideo.remove(); }, FADE_MS + 100);
    }

    const newVideo = createVideo();
    newVideo.style.opacity = "0";
    newVideo.style.transition = `opacity ${FADE_MS}ms ease`;
    cell.appendChild(newVideo);
    newVideo.play().catch(() => {});

    // Start prefetching the next one
    prefetchNext();

    requestAnimationFrame(() => {
      newVideo.style.opacity = "1";
    });

    // Set up independent lifetime tracking for this cell
    const guard = { done: false };

    const doSwap = () => {
      if (guard.done) return;
      guard.done = true;
      const s = cellStates.current[cellIdx];
      if (s?.timer) clearTimeout(s.timer);
      cellStates.current[cellIdx] = null;
      swapCell(cellIdx);
    };

    // Hard timeout: 10s max
    const timer = setTimeout(doSwap, VIDEO_MAX_MS);

    // Loop counting via ended event (named handler for cleanup)
    let loopCount = 0;
    const onEnded = () => {
      loopCount++;
      if (loopCount >= VIDEO_MAX_LOOPS) {
        doSwap();
      } else {
        newVideo.currentTime = 0;
        newVideo.play().catch(() => {});
      }
    };
    newVideo.addEventListener("ended", onEnded);

    cellStates.current[cellIdx] = {
      video: newVideo,
      timer,
      loopCount: 0,
      swapped: false,
      onEnded,
    };
  }, [createVideo, prefetchNext]);

  // Initialize grid with staggered video loads
  useEffect(() => {
    if (!active || !containerRef.current) return;
    activeRef.current = true;

    const maxCells = isMobile ? 2 : 4;

    // Prefetch first video immediately
    prefetchNext();

    // Stagger cell initialization
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < maxCells; i++) {
      const t = setTimeout(() => {
        swapCell(i);
        // Prefetch for next swap
        prefetchNext();
      }, i * INIT_STAGGER_MS + Math.random() * 200);
      timers.push(t);
    }

    return () => {
      activeRef.current = false;
      timers.forEach(clearTimeout);
      cellStates.current.forEach(s => {
        if (s) {
          if (s.timer) clearTimeout(s.timer);
          s.video.removeEventListener("ended", s.onEnded);
          s.video.pause();
          s.video.remove();
        }
      });
      cellStates.current = [null, null, null, null];
      if (prefetchEl.current) {
        prefetchEl.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  // Randomized layout cycling (decoupled from video swaps)
  useEffect(() => {
    if (!active) return;

    const desktopLayouts = [0, 1, 2, 3];
    const mobileLayouts = [3, 4];

    const scheduleNext = () => {
      const jitter = LAYOUT_MIN_MS + Math.random() * (LAYOUT_MAX_MS - LAYOUT_MIN_MS);
      layoutTimer.current = setTimeout(() => {
        const layouts = isMobile ? mobileLayouts : desktopLayouts;
        // Pick a random DIFFERENT layout
        setLayoutIdx(prev => {
          const options = layouts.filter(l => l !== prev);
          return options[Math.floor(Math.random() * options.length)];
        });
        scheduleNext();
      }, jitter);
    };

    scheduleNext();

    return () => {
      if (layoutTimer.current) clearTimeout(layoutTimer.current);
    };
  }, [active, isMobile]);

  const layout = LAYOUTS[layoutIdx];
  const cellCount = layout.cells;

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
