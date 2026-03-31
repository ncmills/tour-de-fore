"use client";

const STEPS = [
  { key: "destinations", label: "Destinations" },
  { key: "gallery", label: "Browse" },
  { key: "build", label: "Build" },
  { key: "itinerary", label: "Itinerary" },
] as const;

type StepKey = (typeof STEPS)[number]["key"];

interface Props {
  planId: string;
  dest: string;
  tier: string;
  current: StepKey;
}

function getHref(step: StepKey, planId: string, dest: string, tier: string) {
  switch (step) {
    case "destinations":
      return `/plan/result/${planId}`;
    case "gallery":
      return `/plan/gallery?planId=${planId}&dest=${dest}&tier=${tier}`;
    case "build":
      return `/plan/build?planId=${planId}&dest=${dest}&tier=${tier}`;
    case "itinerary":
      return `/plan/itinerary?planId=${planId}&dest=${dest}&tier=${tier}`;
  }
}

export default function PlanBreadcrumb({ planId, dest, tier, current }: Props) {
  const currentIndex = STEPS.findIndex((s) => s.key === current);

  return (
    <nav
      aria-label="Plan progress"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.35rem",
        fontSize: "0.7rem",
        letterSpacing: "0.04em",
        padding: "0.5rem 0 0",
      }}
    >
      {STEPS.map((step, i) => {
        const isCurrent = step.key === current;
        const isPast = i < currentIndex;
        const isFuture = i > currentIndex;

        const color = isCurrent
          ? "#EA580C"
          : isPast
          ? "rgba(255,255,255,0.45)"
          : "rgba(255,255,255,0.18)";

        return (
          <span key={step.key} style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            {i > 0 && (
              <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "0.6rem" }}>→</span>
            )}
            {isCurrent ? (
              <span
                style={{
                  color,
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                {step.label}
              </span>
            ) : (
              <a
                href={getHref(step.key, planId, dest, tier)}
                style={{
                  color,
                  textDecoration: "none",
                  textTransform: "uppercase",
                  fontWeight: isPast ? 500 : 400,
                  transition: "color 0.15s",
                  cursor: isFuture ? "default" : "pointer",
                  pointerEvents: isFuture ? "none" : "auto",
                }}
                tabIndex={isFuture ? -1 : 0}
              >
                {step.label}
              </a>
            )}
          </span>
        );
      })}
    </nav>
  );
}
