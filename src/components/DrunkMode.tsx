"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function DrunkMode() {
  const [drunk, setDrunk] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const goDrunk = () => setDrunk(true);
    const goSober = () => setDrunk(false);
    window.addEventListener("tdf-drunk", goDrunk);
    window.addEventListener("tdf-sober", goSober);
    return () => {
      window.removeEventListener("tdf-drunk", goDrunk);
      window.removeEventListener("tdf-sober", goSober);
    };
  }, []);

  // Sober up on route change or browser back
  useEffect(() => {
    if (!drunk) return;
    // Route changed — sober up
    setDrunk(false);
    window.dispatchEvent(new CustomEvent("tdf-sober"));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!drunk) return;

    const handlePopState = () => {
      setDrunk(false);
      window.dispatchEvent(new CustomEvent("tdf-sober"));
    };
    window.addEventListener("popstate", handlePopState);

    // Create a fixed overlay that applies blur + sway via backdrop-filter
    // This doesn't break position:fixed on anything underneath
    const overlay = document.createElement("div");
    overlay.id = "tdf-drunk-overlay";
    document.body.appendChild(overlay);

    const style = document.createElement("style");
    style.id = "tdf-drunk-style";
    style.textContent = `
      @keyframes tdf-wobble {
        0%   { backdrop-filter: blur(1.5px); transform: translateX(0px) rotate(0deg) scale(1); }
        20%  { backdrop-filter: blur(2.5px); transform: translateX(3px) rotate(0.3deg) scale(1.002); }
        40%  { backdrop-filter: blur(1.8px); transform: translateX(-2px) rotate(-0.2deg) scale(0.999); }
        60%  { backdrop-filter: blur(3px); transform: translateX(3px) rotate(0.35deg) scale(1.003); }
        80%  { backdrop-filter: blur(2px); transform: translateX(-1.5px) rotate(-0.25deg) scale(1.001); }
        100% { backdrop-filter: blur(1.5px); transform: translateX(0px) rotate(0deg) scale(1); }
      }
      #tdf-drunk-overlay {
        position: fixed;
        inset: -20px;
        z-index: 999998;
        pointer-events: none;
        animation: tdf-wobble 5s ease-in-out infinite;
        backdrop-filter: blur(1.5px);
        -webkit-backdrop-filter: blur(1.5px);
      }
      body { cursor: none !important; }
      * { cursor: none !important; }
    `;
    document.head.appendChild(style);

    // Fake arrow cursor — appended to documentElement so overlay doesn't blur it
    const layer = document.createElement("div");
    layer.id = "tdf-drunk-cursor-layer";
    Object.assign(layer.style, {
      position: "fixed",
      inset: "0",
      zIndex: "9999999",
      pointerEvents: "none",
      overflow: "hidden",
    });

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 20 28");
    svg.setAttribute("fill", "none");
    Object.assign(svg.style, {
      position: "absolute",
      top: "0",
      left: "0",
      width: "20px",
      height: "28px",
      pointerEvents: "none",
      filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.5))",
    });
    svg.innerHTML = `<path d="M1 1 L1 21 L5.5 16.5 L9.5 25 L12.5 23.5 L8.5 14.5 L14.5 14.5 Z" fill="white" stroke="black" stroke-width="1.2" stroke-linejoin="round"/>`;
    layer.appendChild(svg);
    document.documentElement.appendChild(layer);

    let realX = 0, realY = 0;
    let fakeX = 0, fakeY = 0;
    const onMove = (e: MouseEvent) => { realX = e.clientX; realY = e.clientY; };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    let lastWriteX = 0, lastWriteY = 0;
    const tick = () => {
      fakeX += (realX - fakeX) * 0.04;
      fakeY += (realY - fakeY) * 0.04;
      // Only write to DOM when position changed meaningfully (>0.5px)
      if (Math.abs(fakeX - lastWriteX) > 0.5 || Math.abs(fakeY - lastWriteY) > 0.5) {
        svg.style.transform = `translate(${fakeX}px, ${fakeY}px)`;
        lastWriteX = fakeX;
        lastWriteY = fakeY;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("popstate", handlePopState);
      document.getElementById("tdf-drunk-style")?.remove();
      document.getElementById("tdf-drunk-overlay")?.remove();
      document.getElementById("tdf-drunk-cursor-layer")?.remove();
    };
  }, [drunk]);

  if (!drunk) return null;

  // Global floating "drink water" button — always visible when drunk
  return (
    <button
      onClick={() => {
        setDrunk(false);
        window.dispatchEvent(new CustomEvent("tdf-sober"));
      }}
      style={{
        position: "fixed",
        bottom: "clamp(1.2rem, 3vw, 2rem)",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999999,
        pointerEvents: "auto",
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(8px)",
        border: "2px solid rgba(59,130,246,0.7)",
        borderRadius: 30,
        padding: "10px 24px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        boxShadow: "0 0 20px rgba(59,130,246,0.4), 0 4px 20px rgba(0,0,0,0.5)",
        transition: "transform 0.2s",
      }}
    >
      <span style={{ fontSize: "1.3rem" }}>💧</span>
      <span style={{
        fontFamily: "var(--font-scrawl), cursive",
        fontSize: "1rem",
        color: "rgba(255,255,255,0.85)",
        letterSpacing: "0.05em",
      }}>
        drink water
      </span>
    </button>
  );
}
