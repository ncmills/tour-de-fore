"use client";

import { useEffect, useState } from "react";

type Tally = {
  total: number;
  votesByTier: Record<string, number>;
  rsvpCounts: { in: number; maybe: number; out: number };
  attendees: { name: string }[];
};

const TIER_LABELS: Record<string, string> = {
  imp: "Imp",
  devil: "Devil",
  "demon-king": "Demon King",
};

/**
 * Owner-only crew tally. Fetches the aggregate from GET /api/crew-response
 * (owner-gated server-side via tdf-session). Renders nothing until there's at
 * least one response, so a plan with no votes stays clean.
 */
export default function CrewTally({ planId }: { planId: string }) {
  const [tally, setTally] = useState<Tally | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/crew-response?planId=${encodeURIComponent(planId)}`);
        if (!res.ok) return; // 403 (not owner) / 404 → silently render nothing
        const data = (await res.json()) as Tally;
        if (!cancelled) setTally(data);
      } catch {
        /* ignore */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [planId]);

  if (!tally || tally.total === 0) return null;

  const topTier = Object.entries(tally.votesByTier).sort((a, b) => b[1] - a[1])[0];
  const topLabel = topTier && topTier[1] > 0 ? TIER_LABELS[topTier[0]] : null;

  return (
    <div
      style={{
        marginTop: "2rem",
        padding: "1.5rem 1.75rem",
        borderRadius: 14,
        background: "rgba(234,88,12,0.07)",
        border: "1px solid rgba(234,88,12,0.3)",
      }}
    >
      <p
        style={{
          fontSize: "0.7rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "rgba(234,88,12,0.9)",
          marginBottom: "0.85rem",
          fontWeight: 700,
        }}
      >
        Crew check-in
      </p>

      <p style={{ fontSize: "1.05rem", color: "#fff", marginBottom: "1rem" }}>
        <strong>{tally.rsvpCounts.in} in</strong>
        <span style={{ color: "rgba(255,255,255,0.3)" }}> · </span>
        <strong style={{ color: "#f97316" }}>{tally.rsvpCounts.maybe} maybe</strong>
        <span style={{ color: "rgba(255,255,255,0.3)" }}> · </span>
        <strong style={{ color: "rgba(255,255,255,0.5)" }}>{tally.rsvpCounts.out} out</strong>
        {topLabel && (
          <>
            <span style={{ color: "rgba(255,255,255,0.3)" }}> · </span>
            Top pick:{" "}
            <strong style={{ color: "#EA580C" }}>
              {topLabel} ({topTier[1]})
            </strong>
          </>
        )}
      </p>

      {/* Per-tier vote bars */}
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: tally.attendees.length ? "1rem" : 0 }}>
        {(["imp", "devil", "demon-king"] as const).map((t) => (
          <span
            key={t}
            style={{
              fontSize: "0.78rem",
              color: "rgba(255,255,255,0.65)",
              padding: "3px 10px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {TIER_LABELS[t]}: {tally.votesByTier[t] || 0}
          </span>
        ))}
      </div>

      {tally.attendees.length > 0 && (
        <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)" }}>
          <span style={{ color: "rgba(255,255,255,0.35)" }}>Who&apos;s in: </span>
          {tally.attendees.map((a) => a.name).join(", ")}
        </p>
      )}
    </div>
  );
}
