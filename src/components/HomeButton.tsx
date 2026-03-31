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
      <img
        src="/icon-fancy.png"
        alt="Tour de Fore Home"
        className="home-btn-img"
        style={{ width: 22, height: 28, opacity: 0.7, transition: "opacity 0.2s" }}
        onMouseEnter={(e) => { (e.target as HTMLImageElement).style.opacity = "1"; }}
        onMouseLeave={(e) => { (e.target as HTMLImageElement).style.opacity = "0.7"; }}
      />
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
