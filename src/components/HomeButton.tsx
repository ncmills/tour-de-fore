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
        textDecoration: "none",
      }}
    >
      <img
        src="/icon-fancy.png"
        alt="Tour de Fore Home"
        className="home-btn-img"
        style={{ width: 48, height: 48, opacity: 0.7, transition: "opacity 0.2s" }}
        onMouseEnter={(e) => { (e.target as HTMLImageElement).style.opacity = "1"; }}
        onMouseLeave={(e) => { (e.target as HTMLImageElement).style.opacity = "0.7"; }}
      />
    </a>
  );
}
