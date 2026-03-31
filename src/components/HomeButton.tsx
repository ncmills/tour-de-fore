"use client";

export default function HomeButton({ side = "right" }: { side?: "left" | "right" }) {
  return (
    <a
      href="/?skip=1"
      style={{
        position: "absolute",
        top: "1.2rem",
        ...(side === "left"
          ? { left: "clamp(1rem, 4vw, 2rem)" }
          : { right: "clamp(1rem, 4vw, 2rem)" }),
        zIndex: 90,
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
      }}
    >
      <img
        src="/icon-fancy.png"
        alt="Tour de Fore Home"
        className="home-btn-img"
        style={{ width: 108, height: 108, opacity: 0.7, transition: "opacity 0.2s" }}
        onMouseEnter={(e) => { (e.target as HTMLImageElement).style.opacity = "1"; }}
        onMouseLeave={(e) => { (e.target as HTMLImageElement).style.opacity = "0.7"; }}
      />
    </a>
  );
}
