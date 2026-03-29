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
    const t = setTimeout(() => setDrawn(true), 3000);
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
        style={{
          position: "relative",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Animated hand-drawn beer can SVG */}
        <svg
          width="110"
          height="52"
          viewBox="0 0 110 52"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        >
          {/* Can body — draws over 3s then fills red */}
          <rect
            x="4"
            y="6"
            width="94"
            height="40"
            rx="8"
            ry="8"
            fill={drawn ? "rgba(139, 0, 0, 0.55)" : "rgba(0,0,0,0.35)"}
            style={{ transition: "fill 0.6s ease" }}
          />
          <rect
            x="4"
            y="6"
            width="94"
            height="40"
            rx="8"
            ry="8"
            fill="none"
            stroke="rgba(212,168,67,0.5)"
            strokeWidth="2"
            strokeDasharray="280"
            strokeDashoffset="0"
            style={{
              animation: "beerCanDraw 3s ease forwards",
            }}
          />
          {/* Top rim */}
          <line
            x1="8" y1="12" x2="94" y2="12"
            stroke="rgba(212,168,67,0.35)"
            strokeWidth="1.5"
            strokeDasharray="86"
            style={{ animation: "beerCanDraw 3s ease forwards", animationDelay: "0.5s" }}
          />
          {/* Bottom rim */}
          <line
            x1="8" y1="40" x2="94" y2="40"
            stroke="rgba(212,168,67,0.35)"
            strokeWidth="1.5"
            strokeDasharray="86"
            style={{ animation: "beerCanDraw 3s ease forwards", animationDelay: "0.8s" }}
          />
          {/* Pull tab */}
          <ellipse
            cx="98"
            cy="10"
            rx="7"
            ry="5"
            fill={drawn ? "rgba(139, 0, 0, 0.4)" : "rgba(0,0,0,0.2)"}
            stroke="rgba(212,168,67,0.45)"
            strokeWidth="1.5"
            strokeDasharray="30"
            style={{
              animation: "beerCanDraw 3s ease forwards",
              animationDelay: "1.5s",
              transition: "fill 0.6s ease",
            }}
          />
          {/* Tab rivet */}
          <circle
            cx="93"
            cy="10"
            r="2"
            fill="rgba(212,168,67,0.3)"
            style={{ opacity: drawn ? 1 : 0, transition: "opacity 0.6s ease 3s" }}
          />
          {/* Scratchy texture lines — appear as it draws */}
          <line x1="20" y1="18" x2="80" y2="18" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"
            strokeDasharray="60" style={{ animation: "beerCanDraw 3s ease forwards", animationDelay: "2s" }} />
          <line x1="20" y1="24" x2="80" y2="24" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"
            strokeDasharray="60" style={{ animation: "beerCanDraw 3s ease forwards", animationDelay: "2.2s" }} />
          <line x1="20" y1="30" x2="80" y2="30" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"
            strokeDasharray="60" style={{ animation: "beerCanDraw 3s ease forwards", animationDelay: "2.4s" }} />
        </svg>

        {/* Text */}
        <span
          style={{
            position: "relative",
            zIndex: 1,
            fontFamily: "var(--font-script), cursive",
            fontSize: "1.25rem",
            color: "rgba(255,255,255,0.9)",
            textShadow: "0 1px 4px rgba(0,0,0,0.7)",
            padding: "0.4em 1em",
            whiteSpace: "nowrap",
          }}
        >
          ← mulligan
        </span>
      </button>
    </div>
  );
}
