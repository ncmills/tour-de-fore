"use client";

import { useEffect, useRef, useState } from "react";

/* Collapsible editorial prose for destination heroes. The full text always renders
   into the DOM (SEO-safe) — we only clamp it visually so the course data surfaces
   faster, especially on mobile. */

const COLLAPSED_PX = 168; // ~6 lines at 1rem / line-height 1.8

export default function ProseOverview({ paragraphs }: { paragraphs: string[] }) {
  const [expanded, setExpanded] = useState(false);
  const [overflows, setOverflows] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el) setOverflows(el.scrollHeight > COLLAPSED_PX + 24);
  }, [paragraphs]);

  const clamped = overflows && !expanded;

  return (
    <div style={{ maxWidth: 760, marginBottom: "2rem" }}>
      <div
        ref={ref}
        style={{
          position: "relative",
          fontSize: "1rem",
          color: "#C9C9CF",
          lineHeight: 1.8,
          borderLeft: "3px solid var(--color-accent)",
          paddingLeft: "1.25rem",
          maxHeight: clamped ? COLLAPSED_PX : 4000,
          overflow: "hidden",
          transition: "max-height 0.45s ease",
        }}
      >
        {paragraphs.map((para, i) => (
          <p key={i} style={{ marginBottom: "1rem" }}>
            {para.trim()}
          </p>
        ))}
        {clamped && (
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: "4rem",
              background: "linear-gradient(to bottom, transparent, var(--color-bg))",
              pointerEvents: "none",
            }}
          />
        )}
      </div>
      {overflows && (
        <button
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          style={{
            marginTop: "0.75rem",
            background: "none",
            border: "none",
            color: "var(--color-accent)",
            fontWeight: 600,
            fontSize: "0.9rem",
            cursor: "pointer",
            padding: 0,
            fontFamily: "var(--font-body), sans-serif",
          }}
        >
          {expanded ? "Show less ↑" : "Read more ↓"}
        </button>
      )}
    </div>
  );
}
