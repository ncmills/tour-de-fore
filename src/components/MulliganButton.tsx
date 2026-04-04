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
    const t = setTimeout(() => setDrawn(true), 800);
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
        zIndex: 300,
        pointerEvents: "auto",
      }}
    >
      <button
        onClick={handleClick}
        aria-label="Go back"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "14px 18px",
          margin: "-14px -18px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          minWidth: 64,
          minHeight: 64,
        }}
      >
        {/* Small golf flag as back arrow — draws on page load */}
        <svg
          width="22"
          height="28"
          viewBox="0 0 22 28"
          className="mulligan-svg"
          style={{
            opacity: drawn ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        >
          {/* Flag pole */}
          <line
            x1="4" y1="2" x2="4" y2="26"
            stroke="rgba(212,168,67,0.7)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="24"
            strokeDashoffset={drawn ? "0" : "24"}
            style={{ transition: "stroke-dashoffset 0.6s ease" }}
          />
          {/* Flag triangle */}
          <path
            d="M4 2 L 20 7 L 4 12 Z"
            fill="rgba(139,0,0,0.7)"
            stroke="rgba(212,168,67,0.5)"
            strokeWidth="1"
            strokeLinejoin="round"
            strokeDasharray="50"
            strokeDashoffset={drawn ? "0" : "50"}
            style={{ transition: "stroke-dashoffset 0.7s ease 0.2s" }}
          />
          {/* Ground dot */}
          <circle
            cx="4" cy="26" r="2"
            fill="none"
            stroke="rgba(212,168,67,0.3)"
            strokeWidth="1"
            style={{ opacity: drawn ? 1 : 0, transition: "opacity 0.3s ease 0.5s" }}
          />
        </svg>

        {/* Bold "mulligan" text */}
        <span
          className="mulligan-text"
          style={{
            fontFamily: "var(--font-scrawl), cursive",
            fontSize: "1.15rem",
            fontWeight: 700,
            color: "rgba(255,255,255,0.85)",
            textShadow: "0 1px 4px rgba(0,0,0,0.7)",
            whiteSpace: "nowrap",
            opacity: drawn ? 1 : 0,
            transition: "opacity 0.4s ease 0.4s",
          }}
        >
          mulligan
        </span>
      </button>
    </div>
  );
}
