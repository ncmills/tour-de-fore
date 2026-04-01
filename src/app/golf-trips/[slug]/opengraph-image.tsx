import { ImageResponse } from "next/og";
import { allDestinations } from "@/data";

export const alt = "Golf Trip Destination — Tour de Fore";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return allDestinations.map((d) => ({ slug: d.id }));
}

function formatSlug(slug: string): string {
  const dest = allDestinations.find((d) => d.id === slug);
  if (dest) return `${dest.city}, ${dest.state}`;
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const label = formatSlug(slug);

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
            background:
              "linear-gradient(90deg, transparent, #EA580C, transparent)",
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
            background:
              "linear-gradient(90deg, transparent, #EA580C, transparent)",
            display: "flex",
          }}
        />
        <img
          src="https://tourdefore.com/icon-fancy.png"
          alt=""
          width={100}
          height={100}
          style={{ marginBottom: 20 }}
        />
        <div
          style={{
            fontSize: 40,
            fontWeight: 800,
            color: "#EA580C",
            letterSpacing: "0.06em",
            marginBottom: 8,
            display: "flex",
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
            textAlign: "center",
            paddingLeft: 40,
            paddingRight: 40,
            display: "flex",
          }}
        >
          {label} Golf Trip
        </div>
        <div
          style={{
            fontSize: 20,
            color: "rgba(255,255,255,0.45)",
            letterSpacing: "0.08em",
            display: "flex",
          }}
        >
          COURSES · LODGING · NIGHTLIFE · ACTIVITIES
        </div>
      </div>
    ),
    { ...size }
  );
}
