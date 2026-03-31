import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Tour de Fore — AI Golf Trip Planner";
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
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 800, color: "#EA580C", letterSpacing: "0.08em", marginBottom: 16 }}>
          TOUR DE FORE
        </div>
        <div style={{ fontSize: 28, color: "rgba(255,255,255,0.6)", letterSpacing: "0.12em" }}>
          AI-POWERED GOLF TRIP PLANNER
        </div>
        <div style={{ fontSize: 18, color: "rgba(255,255,255,0.3)", marginTop: 24, letterSpacing: "0.1em" }}>
          133 DESTINATIONS · COURSES · LODGING · NIGHTLIFE
        </div>
      </div>
    ),
    { ...size }
  );
}
