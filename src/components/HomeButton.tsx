"use client";

export default function HomeButton({ side = "right" }: { side?: "left" | "right" }) {
  return (
    <a
      href="/?skip=1"
      style={{
        position: "fixed",
        top: "1.2rem",
        ...(side === "left"
          ? { left: "clamp(1rem, 4vw, 2rem)" }
          : { right: "clamp(1rem, 4vw, 2rem)" }),
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        gap: "6px",
        textDecoration: "none",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-scrawl), cursive",
          fontSize: "1.15rem",
          fontWeight: 700,
          color: "rgba(255,255,255,0.85)",
          textShadow: "0 1px 4px rgba(0,0,0,0.7)",
          whiteSpace: "nowrap",
        }}
      >
        home
      </span>
      {/* Golf flag icon — mirrored to point left (toward center) */}
      <svg
        width="22"
        height="28"
        viewBox="0 0 22 28"
        style={{ opacity: 0.85 }}
      >
        {/* Flag pole */}
        <line x1="18" y1="2" x2="18" y2="26" stroke="rgba(212,168,67,0.7)" strokeWidth="1.5" strokeLinecap="round" />
        {/* Flag triangle — points left */}
        <path d="M18 2 L 2 7 L 18 12 Z" fill="rgba(139,0,0,0.7)" stroke="rgba(212,168,67,0.5)" strokeWidth="1" strokeLinejoin="round" />
        {/* Ground dot */}
        <circle cx="18" cy="26" r="2" fill="none" stroke="rgba(212,168,67,0.3)" strokeWidth="1" />
      </svg>
    </a>
  );
}
