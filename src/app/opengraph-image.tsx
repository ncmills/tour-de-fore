import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Tour de Fore — Hell is empty, all the devils are here.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#000",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle top/bottom border accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, transparent, #EA580C, transparent)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, transparent, #EA580C, transparent)",
            display: "flex",
          }}
        />

        {/* Logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://tourdefore.com/icon-fancy.png"
          alt=""
          width={120}
          height={120}
          style={{ marginBottom: 24 }}
        />

        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#EA580C",
            letterSpacing: "0.08em",
            marginBottom: 12,
          }}
        >
          TOUR DE FORE
        </div>

        {/* Subtitle — the line */}
        <div
          style={{
            fontSize: 26,
            color: "rgba(255,255,255,0.78)",
            letterSpacing: "0.08em",
            fontStyle: "italic",
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          HELL IS EMPTY, ALL THE DEVILS ARE HERE.
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 18,
            color: "rgba(255,255,255,0.35)",
            marginTop: 20,
            letterSpacing: "0.1em",
          }}
        >
          133 DESTINATIONS · COURSES · LODGING · NIGHTLIFE
        </div>
      </div>
    ),
    { ...size }
  );
}
