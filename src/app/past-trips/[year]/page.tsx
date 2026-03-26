import Link from "next/link";
import Image from "next/image";
import { trips } from "@/lib/trips";
import { notFound } from "next/navigation";

const PHOTOS_BY_YEAR: Record<number, string[]> = {
  2021: [
    "IMG_0097.jpeg","IMG_0104.jpeg","IMG_0119.jpeg","IMG_0520.jpeg","IMG_0533.jpeg",
    "IMG_0789.jpeg","IMG_2239.jpeg","IMG_3602.jpeg","IMG_7044.jpeg",
  ],
  2022: [
    "IMG_0880.jpeg","IMG_0915.jpeg","IMG_0924.jpeg","IMG_1442.jpeg","IMG_1463.jpeg",
    "IMG_1577.jpeg","IMG_1634.jpeg","IMG_1692.jpeg","IMG_1754.jpeg","IMG_1762.jpeg",
    "IMG_1895.jpeg","IMG_2031.jpeg","IMG_2058.jpeg","IMG_2076.jpeg","IMG_5526.jpeg",
    "IMG_5533.jpeg","IMG_5536.jpeg","IMG_5539.jpeg","IMG_6383.jpeg","IMG_9078.jpeg",
  ],
  2023: [
    "DSC01440.jpeg","DSC01442.jpeg","DSC01476.jpeg","DSC01482.jpeg","DSC01502.jpeg",
    "DSC01503.jpeg","DSC01504.jpeg","DSC01558.jpeg","DSC01578.jpeg","DSC01586.jpeg",
    "DSC01598.jpeg","DSC01627.jpeg","IMG_1916.jpeg","IMG_2041.jpeg","IMG_2044.jpeg",
    "IMG_2065.jpeg","IMG_2076.jpeg","IMG_2084.jpeg","IMG_2635.jpeg","IMG_2667.jpeg",
    "IMG_3996.jpeg","IMG_4105.jpeg","IMG_4120.jpeg","IMG_4137.jpeg","IMG_4150.jpeg",
    "IMG_4161.jpeg","IMG_4162.jpeg","IMG_4164.jpeg","IMG_4195.jpeg","IMG_4198.jpeg",
    "IMG_4208.jpeg","IMG_4228.jpeg","IMG_4238.jpeg","IMG_4258.jpeg","IMG_4260.jpeg",
    "IMG_4261.jpeg","IMG_4292.jpeg","IMG_6460.jpeg",
  ],
  2024: [
    "IMG_0209.jpeg","IMG_0244.jpeg","IMG_0375.jpeg","IMG_0406.jpeg","IMG_0477.jpeg",
    "IMG_0492.jpeg","IMG_1594.jpeg","IMG_1664.jpeg","IMG_3667.jpeg","IMG_3707.jpeg",
    "IMG_6034.jpeg","IMG_6039.jpeg","IMG_6042.jpeg","IMG_7771.jpeg","IMG_9721.jpeg",
  ],
  2025: [
    "IMG_1450.jpeg","IMG_2089.jpeg","IMG_2101.jpeg","IMG_2101b.jpeg","IMG_2119.jpeg",
    "IMG_2134.jpeg","IMG_2207.jpeg","IMG_2247.jpeg","IMG_4610.jpeg","IMG_4617.jpeg",
    "IMG_4672.jpeg","IMG_4746.jpeg","IMG_4789.jpeg","IMG_4804.jpeg","IMG_4805.jpeg",
    "IMG_4808.jpeg","IMG_5171.jpeg","IMG_5277.jpeg","IMG_5288.jpeg","IMG_5294.jpeg",
    "IMG_5301.jpeg","IMG_5332.jpeg","IMG_5381.jpeg","IMG_5415.jpeg","IMG_5751.jpeg",
    "IMG_5806.jpeg","IMG_5808.jpeg","IMG_6044.jpeg","IMG_9706.jpeg",
  ],
};

export function generateStaticParams() {
  return Object.keys(PHOTOS_BY_YEAR).map((y) => ({ year: y }));
}

export default async function YearGalleryPage({ params }: { params: Promise<{ year: string }> }) {
  const { year: yearStr } = await params;
  const year = parseInt(yearStr);
  const files = PHOTOS_BY_YEAR[year];
  if (!files) notFound();

  const trip = trips.find((t) => t.year === year);

  return (
    <main style={{ minHeight: "100vh", background: "#000", color: "#fff", fontFamily: "var(--font-space-grotesk), sans-serif" }}>
      {/* Back */}
      <div style={{ position: "fixed", top: "1.2rem", left: "clamp(1.5rem, 6vw, 6rem)", zIndex: 100 }}>
        <Link
          href="/past-trips?skip=1"
          style={{ fontFamily: "var(--font-script), cursive", fontSize: "1.1rem", color: "rgba(255,255,255,0.35)", textDecoration: "none" }}
        >
          ← back
        </Link>
      </div>

      {/* Header */}
      <div style={{ padding: "clamp(3rem, 8vw, 6rem) clamp(1.5rem, 6vw, 6rem) 2rem", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <p style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "0.6rem" }}>
          {trip?.dates}
        </p>
        <h1 style={{ fontSize: "clamp(3rem, 8vw, 7rem)", fontWeight: 800, lineHeight: 0.9, letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>
          {year}
        </h1>
        {trip && (
          <p style={{ fontSize: "clamp(1rem, 2vw, 1.3rem)", color: "rgba(255,255,255,0.5)" }}>
            {trip.location}, {trip.state}
          </p>
        )}
      </div>

      {/* Photo grid */}
      <div style={{
        padding: "2rem clamp(1.5rem, 6vw, 6rem) 6rem",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "4px",
      }}>
        {files.map((file) => (
          <div
            key={file}
            style={{ aspectRatio: "4/3", position: "relative", overflow: "hidden", borderRadius: "2px" }}
          >
            <Image
              src={`/photos/${year}/${file}`}
              alt={`${year}`}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
    </main>
  );
}
