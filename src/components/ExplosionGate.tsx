"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

const SWATCH_COLORS = [
  "#ff2020","#ff6a00","#ffcc00","#b8ff00","#00ff88",
  "#00cfff","#0055ff","#7b2fff","#ff2d78","#ffffff",
  "#ff9500","#ff0099","#44eeff","#ffee00","#aa00ff",
  "#ff4444","#00ff44","#ff66cc","#33ddff","#ffaa33",
  "#cc00ff","#00ffcc","#ff3300","#99ff00","#0099ff",
];

const FLASH_COLORS = [
  "#ff2020","#ff9500","#ffcc00","#00ff88","#00cfff",
  "#7b2fff","#ff2d78","#ff6a00","#0055ff","#ff0099",
  "#ffffff","#b8ff00","#44eeff","#aa00ff","#ff4444",
];

function sr(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

interface Swatch {
  color: string;
  animName: string;
  delay: string;
  duration: string;
  style: React.CSSProperties;
}

function buildSwatches(vw: number, vh: number): { swatches: Swatch[]; keyframes: string } {
  const TOTAL = 55;
  const keyframesArr: string[] = [];
  const swatches: Swatch[] = [];

  for (let i = 0; i < TOTAL; i++) {
    const r = (n: number) => sr(i * 23 + n);
    const pad = 300;
    const edge = Math.floor(r(1) * 4);
    let sx = 0, sy = 0;
    if (edge === 0) { sx = (r(2) * 1.6 - 0.3) * vw; sy = -pad; }
    else if (edge === 1) { sx = vw + pad; sy = (r(2) * 1.6 - 0.3) * vh; }
    else if (edge === 2) { sx = (r(2) * 1.6 - 0.3) * vw; sy = vh + pad; }
    else { sx = -pad; sy = (r(2) * 1.6 - 0.3) * vh; }

    const exitAngle = Math.atan2(vh / 2 - sy, vw / 2 - sx) + (r(3) - 0.5) * 1.0;
    const dist = Math.max(vw, vh) * 0.9 + pad;
    const ex = Math.cos(exitAngle) * dist;
    const ey = Math.sin(exitAngle) * dist;

    const rot0 = (r(4) - 0.5) * 80;
    const rot1 = (r(5) - 0.5) * 40;
    const scale = 0.4 + r(6) * 0.9;
    const shapeR = r(13);
    const w = shapeR < 0.33 ? Math.round(60 + r(7) * 60) : shapeR < 0.66 ? Math.round(160 + r(7) * 120) : Math.round(80 + r(7) * 80);
    const h = shapeR < 0.33 ? Math.round(60 + r(8) * 60) : shapeR < 0.66 ? Math.round(80 + r(8) * 60) : Math.round(130 + r(8) * 100);
    const color = SWATCH_COLORS[Math.floor(r(9) * SWATCH_COLORS.length)];
    const animName = `sw${i}`;

    keyframesArr.push(`
      @keyframes ${animName} {
        0%   { transform: translate(calc(-50% + ${Math.round(sx)}px), calc(-50% + ${Math.round(sy)}px)) rotate(${rot0.toFixed(1)}deg) scale(0.1); opacity: 0; }
        10%  { opacity: 1; }
        90%  { opacity: 1; }
        100% { transform: translate(calc(-50% + ${Math.round(ex)}px), calc(-50% + ${Math.round(ey)}px)) rotate(${rot1.toFixed(1)}deg) scale(${scale.toFixed(2)}); opacity: 0; }
      }
    `);

    swatches.push({
      color,
      animName,
      delay: `${(r(10) * 2.4).toFixed(2)}s`,
      duration: `${(0.6 + r(11) * 0.8).toFixed(2)}s`,
      style: {
        position: "absolute",
        top: "50%",
        left: "50%",
        width: w,
        height: h,
        borderRadius: r(12) > 0.7 ? "50%" : "2px",
        zIndex: Math.floor(r(13) * 30) + 5,
        pointerEvents: "none",
        willChange: "transform, opacity",
        background: color,
        boxShadow: `0 0 30px ${color}88, 0 0 60px ${color}44`,
      },
    });
  }

  keyframesArr.push(`
    @keyframes bgflash {
      0%   { background: #000; }
      8%   { background: ${FLASH_COLORS[0]}22; }
      16%  { background: #000; }
      24%  { background: ${FLASH_COLORS[1]}33; }
      32%  { background: #000; }
      40%  { background: ${FLASH_COLORS[2]}22; }
      48%  { background: #000; }
      56%  { background: ${FLASH_COLORS[3]}33; }
      64%  { background: #000; }
      72%  { background: ${FLASH_COLORS[4]}22; }
      80%  { background: #000; }
      88%  { background: ${FLASH_COLORS[5]}33; }
      100% { background: #000; }
    }
    @keyframes tdfpulse {
      0%   { opacity: 0; transform: translate(-50%, -50%) scale(0.4); }
      15%  { opacity: 0.9; transform: translate(-50%, -50%) scale(1.1); }
      40%  { opacity: 0.5; transform: translate(-50%, -50%) scale(1.3); }
      65%  { opacity: 0.95; transform: translate(-50%, -50%) scale(1.0); }
      85%  { opacity: 0.3; transform: translate(-50%, -50%) scale(1.4); }
      100% { opacity: 0; transform: translate(-50%, -50%) scale(0.6); }
    }
  `);

  return { swatches, keyframes: keyframesArr.join("\n") };
}

interface Props {
  pageKey: string;
  children: React.ReactNode;
}

export default function ExplosionGate({ pageKey: _pageKey, children }: Props) {
  const params = useSearchParams();
  const skipParam = params.get("skip") === "1";
  // Only show explosion when navigating from homepage (flag set by homepage links)
  const [skip] = useState(() => {
    if (skipParam) return true;
    if (typeof window === "undefined") return true;
    const flag = sessionStorage.getItem("tdf-explode");
    if (flag === "1") {
      sessionStorage.removeItem("tdf-explode");
      return false; // show the explosion
    }
    return true; // skip by default (mulligan, direct nav, sub-sub nav)
  });
  const [phase, setPhase] = useState<"explosion" | "content">(skip ? "content" : "explosion");
  const [swatchData, setSwatchData] = useState<{ swatches: Swatch[]; keyframes: string } | null>(null);
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    if (skip) return;

    const built = buildSwatches(window.innerWidth, window.innerHeight);
    setSwatchData(built);

    const el = document.createElement("style");
    el.textContent = built.keyframes;
    document.head.appendChild(el);
    styleRef.current = el;

    const timer = setTimeout(() => {
      setPhase("content");
      styleRef.current?.remove();
    }, 4000);

    return () => {
      clearTimeout(timer);
      styleRef.current?.remove();
    };
  }, [skip]);

  return (
    <>
      <AnimatePresence>
        {phase === "explosion" && swatchData && (
          <motion.div
            key="explosion"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              position: "fixed",
              inset: 0,
              overflow: "hidden",
              zIndex: 200,
              animation: "bgflash 4.0s ease-in-out forwards",
            }}
          >
            {swatchData.swatches.map((s, i) => (
              <div
                key={i}
                style={{
                  ...s.style,
                  animation: `${s.animName} ${s.duration} ${s.delay} linear forwards`,
                  opacity: 0,
                }}
              />
            ))}
            <div
              style={{
                position: "absolute",
                top: "50%", left: "50%",
                fontSize: "clamp(8rem, 22vw, 18rem)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                color: "#fff",
                zIndex: 60,
                pointerEvents: "none",
                mixBlendMode: "difference",
                userSelect: "none",
                animation: "tdfpulse 4.0s ease-in-out forwards",
                opacity: 0,
              }}
            >
              TDF
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {phase === "content" && <>{children}</>}
    </>
  );
}
