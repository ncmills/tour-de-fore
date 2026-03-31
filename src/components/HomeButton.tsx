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
      {/* Golf club icon — matches mulligan flag style */}
      <svg
        width="22"
        height="28"
        viewBox="0 0 22 28"
        style={{ opacity: 0.85 }}
      >
        {/* Club shaft */}
        <line x1="11" y1="2" x2="11" y2="22" stroke="rgba(212,168,67,0.7)" strokeWidth="1.5" strokeLinecap="round" />
        {/* Club head */}
        <path d="M11 2 Q 18 4, 16 8 Q 14 11, 11 9" fill="rgba(139,0,0,0.7)" stroke="rgba(212,168,67,0.5)" strokeWidth="1" strokeLinejoin="round" />
        {/* Grip */}
        <line x1="11" y1="20" x2="11" y2="26" stroke="rgba(212,168,67,0.4)" strokeWidth="3" strokeLinecap="round" />
      </svg>
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
    </a>
  );
}
