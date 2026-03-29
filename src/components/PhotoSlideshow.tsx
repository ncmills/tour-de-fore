"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

function isVideo(src: string) {
  return /\.(mp4|mov|webm)$/i.test(src);
}

interface PhotoSlideshowProps {
  images: string[];
  interval?: number;
}

export default function PhotoSlideshow({ images, interval = 4500 }: PhotoSlideshowProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    // For videos, don't auto-advance — let the video play through
    if (paused || images.length <= 1) return;
    if (isVideo(images[current])) return;
    const t = setInterval(next, interval);
    return () => clearInterval(t);
  }, [paused, next, interval, images.length, current, images]);

  // Auto-advance when a video ends
  const handleVideoEnded = useCallback(() => {
    next();
  }, [next]);

  if (images.length === 0) return null;

  const src = images[current];

  return (
    <div
      style={{ position: "relative", width: "100%", aspectRatio: "16/9", borderRadius: "8px", overflow: "hidden", background: "#111" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{ position: "absolute", inset: 0 }}
        >
          {isVideo(src) ? (
            <video
              ref={videoRef}
              src={src}
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnded}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <Image
              src={src}
              alt={`Photo ${current + 1} of ${images.length}`}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 95vw, 80vw"
              priority={current === 0}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Prev/Next buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            style={{
              position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", zIndex: 10,
              background: "rgba(0,0,0,0.5)", border: "none", borderRadius: "50%",
              width: 44, height: 44, cursor: "pointer", color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.2rem", transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.8)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.5)")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button
            onClick={next}
            style={{
              position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", zIndex: 10,
              background: "rgba(0,0,0,0.5)", border: "none", borderRadius: "50%",
              width: 44, height: 44, cursor: "pointer", color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.2rem", transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.8)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.5)")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </>
      )}

      {/* Counter */}
      <div style={{
        position: "absolute", bottom: "1rem", right: "1rem", zIndex: 10,
        background: "rgba(0,0,0,0.6)", borderRadius: "4px",
        padding: "4px 10px", fontFamily: "monospace", fontSize: "0.75rem",
        color: "rgba(255,255,255,0.7)", letterSpacing: "0.05em",
      }}>
        {current + 1} / {images.length}
      </div>

      {/* Progress dots */}
      {images.length <= 30 && (
        <div style={{
          position: "absolute", bottom: "1rem", left: "50%", transform: "translateX(-50%)", zIndex: 10,
          display: "flex", gap: "6px",
        }}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? 10 : 6,
                height: 6,
                borderRadius: "3px",
                background: i === current ? "#fff" : "rgba(255,255,255,0.35)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.2s",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
