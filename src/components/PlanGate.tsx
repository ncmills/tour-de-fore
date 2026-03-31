"use client";

import { useState } from "react";
import { motion } from "motion/react";
import MulliganButton from "./MulliganButton";

export default function PlanGate({ planId, city, state: st, prefillEmail = "" }: { planId: string; city: string; state: string; prefillEmail?: string }) {
  const [email, setEmail] = useState(prefillEmail);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async () => {
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSending(true);
    try {
      const res = await fetch("/api/auth/send-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, returnTo: `/plan/result/${planId}` }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send email");
      }
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSending(false);
    }
  };

  return (
    <main style={{ minHeight: "100vh", background: "#000", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", textAlign: "center" }}>
      <MulliganButton onClick={() => (window.location.href = "/?skip=1")} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ maxWidth: 480, width: "100%" }}
      >
        <img src="/icon-fancy.png" alt="TDF" style={{ width: 80, height: 80, margin: "0 auto 1.5rem" }} />

        <h1 style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "clamp(2rem, 5vw, 3rem)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.75rem" }}>
          Your plan is ready
        </h1>

        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1rem", marginBottom: "2.5rem", lineHeight: 1.6 }}>
          Your {city}{st ? `, ${st}` : ""} trip plan has been generated. Create a free account to unlock it.
        </p>

        {sent ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p style={{ fontSize: "1.1rem", color: "#EA580C", fontFamily: "var(--font-plan-block), sans-serif", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Check your email
            </p>
            <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.45)", marginBottom: "1.5rem" }}>
              We sent a verification link to <strong style={{ color: "rgba(255,255,255,0.7)" }}>{email}</strong>. Click it to see your plan.
            </p>
            <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button
                onClick={() => { setSent(false); handleSend(); }}
                style={{ background: "none", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", cursor: "pointer", padding: "0.75rem 1.2rem", borderRadius: 4, minHeight: 44 }}
              >
                Resend email
              </button>
              <button
                onClick={() => setSent(false)}
                style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", fontSize: "0.85rem", cursor: "pointer", textDecoration: "underline", minHeight: 44, padding: "0.5rem 0.5rem" }}
              >
                Use a different email
              </button>
            </div>
          </motion.div>
        ) : (
          <>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
              autoFocus
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                borderBottom: "1px solid rgba(255,255,255,0.2)",
                padding: "0.75rem 0",
                color: "#fff",
                fontSize: "1.1rem",
                outline: "none",
                textAlign: "center",
                marginBottom: "1.5rem",
              }}
            />

            {error && (
              <p style={{ color: "#f87171", fontSize: "0.8rem", marginBottom: "1rem" }}>{error}</p>
            )}

            <motion.button
              onClick={handleSend}
              disabled={sending}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              style={{
                width: "auto",
                padding: "1.1rem 2.5rem",
                background: "rgba(220,38,38,0.9)",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                fontSize: "1rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: sending ? "not-allowed" : "pointer",
                opacity: sending ? 0.6 : 1,
                fontFamily: "var(--font-plan-block), sans-serif",
              }}
            >
              {sending ? "Sending..." : "Create Account"}
            </motion.button>

            <p style={{ fontSize: "0.84rem", color: "rgba(255,255,255,0.2)", marginTop: "1rem" }}>
              Free forever. We&apos;ll send a verification link.
            </p>
          </>
        )}
      </motion.div>
    </main>
  );
}
