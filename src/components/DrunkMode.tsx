"use client";

import { useEffect, useState } from "react";

/**
 * Drunk mode: page gets a subtle blur/sway and the real cursor
 * moves with heavy CSS transition delay so it feels sluggish.
 * No fake cursor dot — just the normal arrow, but laggy.
 * Activated via sessionStorage("tdf-drunk"), cleared on tab refresh.
 */
export default function DrunkMode() {
  const [drunk, setDrunk] = useState(false);

  useEffect(() => {
    const check = () => {
      if (sessionStorage.getItem("tdf-drunk") === "1") setDrunk(true);
    };
    check();
    window.addEventListener("tdf-drunk", check);
    return () => window.removeEventListener("tdf-drunk", check);
  }, []);

  useEffect(() => {
    if (!drunk) return;

    const style = document.createElement("style");
    style.id = "tdf-drunk-style";
    style.textContent = `
      /* Fuzzy page — gentle blur + slow sway */
      @keyframes tdf-sway {
        0%   { filter: blur(1.2px) brightness(0.98); transform: translateX(0px) rotate(0deg); }
        20%  { filter: blur(1.8px) brightness(0.97); transform: translateX(1.5px) rotate(0.15deg); }
        40%  { filter: blur(1.4px) brightness(0.98); transform: translateX(-1px) rotate(-0.1deg); }
        60%  { filter: blur(2px) brightness(0.96); transform: translateX(2px) rotate(0.2deg); }
        80%  { filter: blur(1.5px) brightness(0.97); transform: translateX(-0.5px) rotate(-0.15deg); }
        100% { filter: blur(1.2px) brightness(0.98); transform: translateX(0px) rotate(0deg); }
      }
      html {
        animation: tdf-sway 6s ease-in-out infinite !important;
      }

      /* Sluggish cursor via a full-screen overlay that tracks mouse with heavy delay */
      body {
        cursor: none !important;
      }
      * {
        cursor: none !important;
      }
      #tdf-drunk-cursor-layer {
        position: fixed !important;
        inset: 0 !important;
        z-index: 999999 !important;
        pointer-events: none !important;
        overflow: hidden !important;
      }
      #tdf-drunk-fake-cursor {
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        width: 20px !important;
        height: 28px !important;
        pointer-events: none !important;
        z-index: 999999 !important;
        filter: drop-shadow(0 1px 2px rgba(0,0,0,0.5)) !important;
        transition: none !important;
      }
    `;
    document.head.appendChild(style);

    // Create cursor layer + fake arrow cursor
    const layer = document.createElement("div");
    layer.id = "tdf-drunk-cursor-layer";

    const cursor = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    cursor.id = "tdf-drunk-fake-cursor";
    cursor.setAttribute("viewBox", "0 0 20 28");
    cursor.setAttribute("fill", "none");
    cursor.innerHTML = `
      <path d="M1 1 L1 21 L5.5 16.5 L9.5 25 L12.5 23.5 L8.5 14.5 L14.5 14.5 Z"
            fill="white" stroke="black" stroke-width="1.2" stroke-linejoin="round"/>
    `;
    layer.appendChild(cursor);
    document.body.appendChild(layer);

    // Track real mouse, move fake cursor with heavy lerp
    let realX = 0, realY = 0;
    let fakeX = 0, fakeY = 0;
    const LERP = 0.045; // very sluggish

    const onMove = (e: MouseEvent) => {
      realX = e.clientX;
      realY = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const tick = () => {
      fakeX += (realX - fakeX) * LERP;
      fakeY += (realY - fakeY) * LERP;
      cursor.style.transform = `translate(${fakeX}px, ${fakeY}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.getElementById("tdf-drunk-style")?.remove();
      document.getElementById("tdf-drunk-cursor-layer")?.remove();
    };
  }, [drunk]);

  return null; // no React DOM — everything injected imperatively
}
