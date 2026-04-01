import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Past Tours — Tour de Fore";
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

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://tourdefore.com/icon-fancy.png"
          alt=""
          width={100}
          height={100}
          style={{ marginBottom: 20 }}
        />

        <div
          style={{
            fontSize: 44,
            fontWeight: 800,
            color: "#EA580C",
            letterSpacing: "0.06em",
            marginBottom: 8,
          }}
        >
          TOUR DE FORE
        </div>

        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: "#fff",
            marginBottom: 12,
          }}
        >
          Past Tours
        </div>

        <div
          style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.45)",
            letterSpacing: "0.08em",
          }}
        >
          SIX YEARS OF LEGENDARY GROUP GOLF TRIPS
        </div>
      </div>
    ),
    { ...size }
  );
}
