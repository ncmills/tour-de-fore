"use client";

import { useState, useEffect } from "react";

interface Props {
  href?: string;
  onClick?: () => void;
  top?: string;
  left?: string;
  right?: string;
  zIndex?: number;
}

export default function MulliganButton({
  href = "/?skip=1",
  onClick,
  top = "1.2rem",
  left = "clamp(1.5rem, 6vw, 4rem)",
  right,
  zIndex = 600,
}: Props) {
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      window.location.href = href;
    }
  };

  return (
    <div
      className="mulligan-wrap"
      style={{
        position: "fixed",
        top,
        left: right ? undefined : left,
        right: right || undefined,
        zIndex,
        pointerEvents: "auto",
      }}
    >
      <button
        onClick={handleClick}
        aria-label="Go back"
        style={{
          position: "relative",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "10px 14px",
          margin: "-10px -14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: 56,
          minHeight: 56,
        }}
      >
        {/* Golf flag SVG */}
        <svg
          width="120"
          height="48"
          viewBox="0 0 120 48"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        >
          {/* Flag pole — draws in */}
          <line
            x1="10" y1="4" x2="10" y2="44"
            stroke="rgba(212,168,67,0.6)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="40"
            strokeDashoffset={drawn ? "0" : "40"}
            style={{ transition: "stroke-dashoffset 0.8s ease" }}
          />

          {/* Flag triangle — draws and fills */}
          <path
            d="M10 4 L 100 16 L 10 28 Z"
            fill={drawn ? "rgba(139, 0, 0, 0.5)" : "rgba(0,0,0,0.2)"}
            stroke="rgba(212,168,67,0.4)"
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeDasharray="200"
            strokeDashoffset={drawn ? "0" : "200"}
            style={{ transition: "stroke-dashoffset 1s ease 0.3s, fill 0.6s ease 0.8s" }}
          />

          {/* Subtle wave lines on flag */}
          <path
            d="M20 12 Q 50 10 80 14"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.5"
            style={{ opacity: drawn ? 1 : 0, transition: "opacity 0.5s ease 1s" }}
          />
          <path
            d="M20 19 Q 50 17 80 21"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="0.5"
            style={{ opacity: drawn ? 1 : 0, transition: "opacity 0.5s ease 1.1s" }}
          />

          {/* Ground line */}
          <line
            x1="4" y1="44" x2="16" y2="44"
            stroke="rgba(212,168,67,0.3)"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ opacity: drawn ? 1 : 0, transition: "opacity 0.4s ease 0.6s" }}
          />

          {/* Hole circle */}
          <circle
            cx="10" cy="44" r="3"
            fill="none"
            stroke="rgba(212,168,67,0.25)"
            strokeWidth="1"
            style={{ opacity: drawn ? 1 : 0, transition: "opacity 0.4s ease 0.8s" }}
          />
        </svg>

        {/* Text on the flag */}
        <span
          style={{
            position: "relative",
            zIndex: 1,
            fontFamily: "var(--font-script), cursive",
            fontSize: "1.1rem",
            color: "rgba(255,255,255,0.9)",
            textShadow: "0 1px 4px rgba(0,0,0,0.7)",
            padding: "0.2em 0.6em 0.2em 1.2em",
            whiteSpace: "nowrap",
            opacity: drawn ? 1 : 0,
            transition: "opacity 0.4s ease 0.8s",
          }}
        >
          ← mulligan
        </span>
      </button>
    </div>
  );
}
