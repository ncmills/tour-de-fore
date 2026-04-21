import { ImageResponse } from "next/og";
import { getPlan } from "@/lib/kv";

// Tour de Fore — per-plan Open Graph image
//
// 2026-04-11: dynamic 1200x630 preview card rendered on demand when a plan
// link is unfurled in iMessage / Slack / WhatsApp / email clients. Keeps the
// shared link looking like it came from the website instead of the bare
// default site OG. Ported from the MOH plan-result OG unfurl pattern.
//
// Uses the Node runtime (not edge) so we can hit the same Redis/KV client
// everything else uses without a second code path. Plan fetches are <50ms
// and the result is cached by every social client that requests it.

export const alt = "Your Tour de Fore golf trip plan";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PlanOGImage({ params }: Props) {
  const { id } = await params;
  const stored = await getPlan(id).catch(() => null);

  const firstDest =
    stored?.destinations?.mid ??
    stored?.destinations?.budget ??
    stored?.destinations?.premium;
  const headline =
    firstDest?.plans?.devil ??
    firstDest?.plans?.imp ??
    firstDest?.plans?.demonKing;
  const preview = stored?.freePreviews?.mid ?? stored?.freePreviews?.budget;

  const tripName = headline?.tripName || "Your Golf Trip Plan";
  const destination =
    headline?.destination ||
    (preview ? `${preview.city}${preview.state ? `, ${preview.state}` : ""}` : "");
  const dates = headline?.dates || "";
  const groupSize = headline?.groupSize ?? preview?.groupSize ?? 0;
  const tagline = headline?.tagline || "Hell is empty, all the devils are here.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          padding: "72px 80px",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* subtle orange seam along the top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "#c87941",
            display: "flex",
          }}
        />

        {/* header row — brand mark + url */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 30,
              fontWeight: 400,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#c87941",
              fontFamily: "serif",
            }}
          >
            Tour de Fore
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#5a5550",
              fontFamily: "sans-serif",
              fontWeight: 500,
            }}
          >
            tourdefore.com
          </div>
        </div>

        {/* hero block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#c9a96e",
              fontWeight: 600,
              fontFamily: "sans-serif",
            }}
          >
            A Trip Plan Has Been Dropped
          </div>
          <div
            style={{
              fontSize: tripName.length > 24 ? 84 : 104,
              fontWeight: 500,
              color: "#ece8e1",
              lineHeight: 0.98,
              letterSpacing: "-0.02em",
              fontFamily: "serif",
              display: "flex",
              flexWrap: "wrap",
              maxWidth: 1040,
            }}
          >
            {tripName}
          </div>
          {destination ? (
            <div
              style={{
                display: "flex",
                fontSize: 36,
                fontStyle: "italic",
                color: "#c87941",
                fontFamily: "serif",
                letterSpacing: "-0.01em",
              }}
            >
              {destination}
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                fontSize: 30,
                fontStyle: "italic",
                color: "#9a9590",
                fontFamily: "serif",
              }}
            >
              &ldquo;{tagline}&rdquo;
            </div>
          )}
        </div>

        {/* meta strip — dates + group size + CTA */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {(dates || groupSize > 0) && (
              <div
                style={{
                  display: "flex",
                  gap: 28,
                  fontSize: 24,
                  color: "#9a9590",
                  fontFamily: "sans-serif",
                }}
              >
                {dates && <span style={{ display: "flex" }}>{dates}</span>}
                {groupSize > 0 && (
                  <span style={{ display: "flex" }}>{groupSize} golfers</span>
                )}
              </div>
            )}
            <div
              style={{
                display: "flex",
                fontSize: 22,
                color: "#c87941",
                fontFamily: "sans-serif",
                fontWeight: 600,
                letterSpacing: "0.04em",
                marginTop: 8,
              }}
            >
              Tap to view the full itinerary →
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 4,
            }}
          >
            <div
              style={{
                display: "flex",
                width: 80,
                height: 4,
                background: "#c87941",
              }}
            />
            <div
              style={{
                display: "flex",
                fontSize: 18,
                color: "#5a5550",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontFamily: "sans-serif",
              }}
            >
              Tour de Fore
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
