"use client";

/**
 * GeneratorShowcase — the homepage "product shot".
 *
 * Renders the golf-wizard UI as an illustration wrapped around a REAL result:
 * a real destination + real marquee course + real lodging/dining/nightlife and
 * an honestly-derived per-person price (see showcase-plan.ts). No invented
 * course/venue/price — this is a genuine sample of what /plan-a-trip produces.
 *
 * The three-way tier toggle (👿 The Imp / 😈 The Devil / 👹 The Demon King) is
 * a REAL control: clicking it swaps the WHOLE result to a different real
 * destination spanning price. The surrounding field chrome ("12 golfers · 4
 * days", "Build the trip") is illustrative only — aria-hidden so assistive
 * tech isn't told these are functioning inputs. Brand: TDF dark/ember.
 */
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  pickShowcasePlans,
  SHOWCASE_GROUP,
  SHOWCASE_DAYS,
  type ShowcaseTier,
} from "./showcase-plan";

const money = (n: number) => `$${n.toLocaleString()}`;

function titleCase(s: string): string {
  return s.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

const label: React.CSSProperties = {
  display: "block",
  color: "rgba(255,255,255,0.4)",
  fontSize: "0.56rem",
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  fontFamily: "var(--font-plan-block), sans-serif",
  fontWeight: 600,
};

const field: React.CSSProperties = {
  marginTop: "0.35rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "0.5rem",
  borderRadius: 10,
  border: "1px solid var(--color-border)",
  background: "rgba(255,255,255,0.04)",
  padding: "0.7rem 0.85rem",
  fontSize: "0.88rem",
  color: "rgba(255,255,255,0.9)",
};

export default function GeneratorShowcase({
  plans,
}: {
  /** Precomputed on the server (page.tsx). Falls back to a local pick. */
  plans?: [ShowcaseTier, ShowcaseTier, ShowcaseTier];
}) {
  const tiers = plans ?? pickShowcasePlans();
  const [active, setActive] = useState(1); // devil (recommended) by default
  const plan = tiers[active];

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 20,
        border: "1px solid rgba(234,88,12,0.35)",
        background: "linear-gradient(168deg, #1c1a16 0%, #121215 100%)",
        boxShadow: "0 44px 90px -34px rgba(0,0,0,0.75)",
        padding: "1.25rem",
        width: "100%",
        maxWidth: 440,
        boxSizing: "border-box",
      }}
    >
      {/* Ember corner glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(130% 90% at 84% -6%, rgba(234,88,12,0.20), transparent 58%)",
        }}
      />

      <div style={{ position: "relative" }}>
        {/* ── Header + REAL tier toggle ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-plan-block), sans-serif",
              fontSize: "0.62rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#EA580C",
              fontWeight: 600,
            }}
          >
            The Wizard
          </span>
        </div>

        <div
          role="group"
          aria-label="Choose a trip tier"
          style={{
            marginTop: "0.7rem",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0.4rem",
          }}
        >
          {tiers.map((t, i) => {
            const on = i === active;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={on}
                aria-label={`${t.tierName} — ${money(t.perPerson)} per person`}
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.15rem",
                  borderRadius: 10,
                  cursor: "pointer",
                  padding: "0.55rem 0.3rem",
                  border: on
                    ? `1.5px solid ${t.accent}`
                    : "1px solid var(--color-border)",
                  background: on
                    ? `linear-gradient(180deg, ${t.accent}22, ${t.accent}0d)`
                    : "rgba(255,255,255,0.03)",
                  color: on ? "#fff" : "rgba(255,255,255,0.6)",
                  transition:
                    "border-color 0.2s, background 0.2s, color 0.2s",
                  minWidth: 0,
                }}
              >
                <span style={{ fontSize: "1.05rem", lineHeight: 1 }} aria-hidden>
                  {t.icon}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-plan-block), sans-serif",
                    fontSize: "0.6rem",
                    letterSpacing: "0.04em",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100%",
                  }}
                >
                  {t.tierName.replace(/^The\s+/, "")}
                </span>
                {t.recommended && (
                  <span
                    aria-hidden
                    style={{
                      position: "absolute",
                      top: -7,
                      right: -5,
                      background: t.accent,
                      color: "#111",
                      fontSize: "0.44rem",
                      fontWeight: 800,
                      letterSpacing: "0.08em",
                      padding: "1px 5px",
                      borderRadius: 4,
                      textTransform: "uppercase",
                    }}
                  >
                    Pick
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ── Illustrative field chrome (not real inputs) ── */}
        <div aria-hidden="true">
          <div style={{ marginTop: "0.9rem" }}>
            <span style={label}>The crew</span>
            <div style={field}>
              <span>
                {SHOWCASE_GROUP} golfers · {SHOWCASE_DAYS} days
              </span>
              <span style={{ color: "rgba(255,255,255,0.4)" }}>▾</span>
            </div>
          </div>
          <div style={{ marginTop: "0.6rem" }}>
            <span style={label}>The play</span>
            <div style={field}>
              <span>2 rounds/day · mixed bags</span>
              <span style={{ color: "rgba(255,255,255,0.4)" }}>▾</span>
            </div>
          </div>
        </div>

        {/* ── The REAL result (swaps with the tier toggle) ── */}
        <div
          style={{
            marginTop: "0.9rem",
            borderRadius: 12,
            border: `1px solid ${plan.accent}55`,
            background: "rgba(255,255,255,0.035)",
            padding: "0.9rem",
            minHeight: 250,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
            {plan.imageUrl ? (
              <div
                style={{
                  position: "relative",
                  height: 54,
                  width: 54,
                  flexShrink: 0,
                  overflow: "hidden",
                  borderRadius: 9,
                  border: "1px solid var(--color-border)",
                }}
              >
                <Image
                  src={plan.imageUrl}
                  alt={plan.imageAlt}
                  fill
                  sizes="54px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            ) : null}
            <div style={{ minWidth: 0, flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  gap: "0.5rem",
                  flexWrap: "wrap",
                }}
              >
                <b
                  style={{
                    fontFamily: "var(--font-display), sans-serif",
                    fontSize: "1rem",
                    color: "#fff",
                    minWidth: 0,
                  }}
                >
                  {plan.dest.city}, {plan.dest.state}
                </b>
                <span
                  style={{
                    flexShrink: 0,
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    color: plan.accent,
                  }}
                >
                  {money(plan.perPerson)}/person
                </span>
              </div>
              <p
                style={{
                  marginTop: 2,
                  fontSize: "0.72rem",
                  color: "rgba(255,255,255,0.5)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {titleCase(plan.dest.region)} · {plan.lodging.type} · {SHOWCASE_GROUP}{" "}
                guys
              </p>
            </div>
          </div>

          <div
            style={{
              margin: "0.75rem 0",
              height: 1,
              background: "var(--color-border)",
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.4rem",
              fontSize: "0.76rem",
              color: "rgba(255,255,255,0.72)",
            }}
          >
            <Dot accent={plan.accent} strong>
              Marquee — {plan.course.name}
            </Dot>
            <Dot accent={plan.accent}>Fri · Welcome dinner at {plan.dining.name}</Dot>
            <Dot accent={plan.accent}>
              Sat · 36 holes
              {plan.bar ? ` + late night at ${plan.bar.name}` : ""}
            </Dot>
            <Dot accent={plan.accent}>
              Sun · {plan.activity ? `${plan.activity.name}, then ` : ""}recovery
              brunch
            </Dot>
          </div>

          <div
            style={{
              marginTop: "0.85rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "0.5rem",
            }}
          >
            <Link
              href={`/golf-trips/${plan.dest.id}`}
              style={{
                fontSize: "0.8rem",
                fontWeight: 700,
                color: plan.accent,
                textDecoration: "none",
              }}
            >
              See the trip →
            </Link>
            <span
              style={{
                fontFamily: "var(--font-plan-block), sans-serif",
                fontSize: "0.52rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              Est. / person
            </span>
          </div>
        </div>

        {/* ── Build affordance → real wizard entry ── */}
        <Link
          href="/plan-a-trip"
          style={{
            marginTop: "0.9rem",
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.4rem",
            borderRadius: 10,
            background: "#EA580C",
            color: "#111",
            padding: "0.8rem 1rem",
            fontSize: "0.92rem",
            fontWeight: 800,
            textDecoration: "none",
            boxSizing: "border-box",
          }}
        >
          Build the trip →
        </Link>
      </div>
    </div>
  );
}

function Dot({
  accent,
  strong,
  children,
}: {
  accent: string;
  strong?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", gap: "0.6rem" }}>
      <span
        aria-hidden
        style={{
          marginTop: 5,
          height: 6,
          width: 6,
          flexShrink: 0,
          borderRadius: "50%",
          background: strong ? accent : `${accent}66`,
        }}
      />
      <span style={strong ? { color: accent, fontWeight: 600 } : undefined}>
        {children}
      </span>
    </div>
  );
}
