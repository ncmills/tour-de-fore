"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const STORAGE_KEY = (planId: string) => `tdf-crew-vote:${planId}`;

const TIERS = [
  { id: "imp", label: "The Imp", blurb: "Keep it tight" },
  { id: "devil", label: "The Devil", blurb: "The sweet spot" },
  { id: "demon-king", label: "The Demon King", blurb: "Send it" },
] as const;

const RSVPS = [
  { id: "in", label: "I'm in 🔥", bg: "rgba(220,38,38,0.9)" },
  { id: "maybe", label: "Maybe 🤔", bg: "rgba(234,88,12,0.75)" },
  { id: "out", label: "Can't make it 💀", bg: "rgba(255,255,255,0.1)" },
] as const;

type Tier = (typeof TIERS)[number]["id"];
type Rsvp = (typeof RSVPS)[number]["id"];

type Saved = { name: string; tier: Tier; rsvp: Rsvp; email: string };

const tierLabel = (t: string) => TIERS.find((x) => x.id === t)?.label || t;
const rsvpPhrase = (r: string) =>
  r === "in" ? "you're in" : r === "maybe" ? "you're a maybe" : "you're out";

export default function CrewVotePanel({
  planId,
  defaultTier = "devil",
}: {
  planId: string;
  defaultTier?: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tier, setTier] = useState<Tier>(
    (TIERS.find((t) => t.id === defaultTier)?.id as Tier) || "devil"
  );
  const [rsvp, setRsvp] = useState<Rsvp | "">("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState<Saved | null>(null);
  const [editing, setEditing] = useState(false);

  // Remember a prior vote via localStorage so returning crew see the
  // confirmation, not a fresh form.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY(planId));
      if (raw) {
        const parsed = JSON.parse(raw) as Saved;
        setSaved(parsed);
        setName(parsed.name || "");
        setEmail(parsed.email || "");
        if (parsed.tier) setTier(parsed.tier);
        if (parsed.rsvp) setRsvp(parsed.rsvp);
      }
    } catch {
      /* ignore */
    }
  }, [planId]);

  const submit = async () => {
    setError("");
    if (!name.trim()) return setError("Drop your name.");
    if (!email.trim() || !email.includes("@")) return setError("Need a real email.");
    if (!rsvp) return setError("Are you in or out?");

    setSubmitting(true);
    try {
      const res = await fetch("/api/crew-response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, email: email.trim(), name: name.trim(), voteTier: tier, rsvp }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error || "Couldn't save. Try again.");
        return;
      }
      const record: Saved = { name: name.trim(), tier, rsvp, email: email.trim() };
      try {
        localStorage.setItem(STORAGE_KEY(planId), JSON.stringify(record));
      } catch {
        /* ignore */
      }
      setSaved(record);
      setEditing(false);
    } catch {
      setError("Network hiccup. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const showForm = !saved || editing;

  return (
    <section
      style={{
        background: "rgba(220,38,38,0.06)",
        border: "2px solid rgba(220,38,38,0.3)",
        borderRadius: 16,
        padding: "2.5rem 2rem",
        marginBottom: "4rem",
      }}
    >
      <h2
        style={{
          fontFamily: "var(--font-plan-groovy), cursive",
          fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
          marginBottom: "0.5rem",
          textAlign: "center",
        }}
      >
        Vote on the trip & RSVP
      </h2>
      <p
        style={{
          textAlign: "center",
          color: "rgba(255,255,255,0.45)",
          fontSize: "0.9rem",
          marginBottom: "2rem",
        }}
      >
        Pick your poison, tell us if you&apos;re in. No account, no login — just speak up.
      </p>

      {showForm ? (
        <div style={{ maxWidth: 460, margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Tier vote */}
          <div>
            <label style={labelStyle}>Which trip should we run?</label>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {TIERS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTier(t.id)}
                  style={{
                    flex: "1 1 120px",
                    padding: "0.7rem 0.5rem",
                    borderRadius: 10,
                    border: tier === t.id ? "2px solid #EA580C" : "1px solid rgba(255,255,255,0.15)",
                    background: tier === t.id ? "rgba(234,88,12,0.15)" : "rgba(255,255,255,0.04)",
                    color: "#fff",
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "all 0.15s",
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{t.label}</div>
                  <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.45)", marginTop: 2 }}>{t.blurb}</div>
                </button>
              ))}
            </div>
          </div>

          {/* RSVP */}
          <div>
            <label style={labelStyle}>You coming?</label>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {RSVPS.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRsvp(r.id)}
                  style={{
                    flex: "1 1 110px",
                    padding: "0.65rem 0.5rem",
                    borderRadius: 8,
                    border: rsvp === r.id ? "2px solid #fff" : "1px solid rgba(255,255,255,0.15)",
                    background: rsvp === r.id ? r.bg : "rgba(255,255,255,0.04)",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: "0.82rem",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Identity */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
            />
            <input
              type="email"
              placeholder="Your email (so the organizer can reach you)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />
          </div>

          {error && (
            <p style={{ color: "rgba(239,68,68,0.9)", fontSize: "0.82rem", textAlign: "center" }}>{error}</p>
          )}

          <button
            onClick={submit}
            disabled={submitting}
            style={{
              padding: "0.9rem 1.5rem",
              background: "rgba(220,38,38,0.9)",
              border: "none",
              borderRadius: 8,
              color: "#fff",
              fontFamily: "var(--font-plan-block), sans-serif",
              fontSize: "0.95rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              cursor: submitting ? "wait" : "pointer",
              opacity: submitting ? 0.6 : 1,
            }}
          >
            {submitting ? "Locking it in…" : saved ? "Update my vote" : "Cast my vote"}
          </button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ textAlign: "center", maxWidth: 460, margin: "0 auto" }}
        >
          <p style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
            Thanks {saved!.name} — you voted{" "}
            <strong style={{ color: "#EA580C" }}>{tierLabel(saved!.tier)}</strong>,{" "}
            <strong
              style={{
                color: saved!.rsvp === "in" ? "var(--color-success)" : saved!.rsvp === "maybe" ? "#f97316" : "rgba(255,255,255,0.5)",
              }}
            >
              {rsvpPhrase(saved!.rsvp)}
            </strong>
            .
          </p>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", marginBottom: "1.25rem" }}>
            Changed your mind, devil?
          </p>
          <button
            onClick={() => setEditing(true)}
            style={{
              padding: "0.6rem 1.4rem",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: 8,
              color: "#fff",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Change my vote
          </button>
        </motion.div>
      )}
    </section>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.7rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.4)",
  marginBottom: "0.6rem",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 16px",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: 8,
  color: "#fff",
  fontSize: "1rem",
  outline: "none",
};
