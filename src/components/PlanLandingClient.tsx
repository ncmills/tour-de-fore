"use client";

import { useState } from "react";
import { motion } from "motion/react";
import MulliganButton from "./MulliganButton";

export default function PlanLandingClient({ onFirstTime }: { onFirstTime: () => void }) {
  const [mode, setMode] = useState<"choose" | "login">("choose");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [sendingReset, setSendingReset] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Enter your email and password.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase().trim(), password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Login failed");
      }
      window.location.href = "/my-trips";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  };

  const handleForgot = async () => {
    if (!email || !email.includes("@")) {
      setError("Enter your email first.");
      return;
    }
    setError("");
    setSendingReset(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase().trim() }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send reset email");
      }
      setForgotSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSendingReset(false);
    }
  };

  return (
    <main style={{ minHeight: "100vh", background: "#000", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", textAlign: "center" }}>
      <MulliganButton onClick={() => (window.location.href = "/?skip=1")} />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: 500, width: "100%" }}>
        <img src="/logo-est2021.png" alt="Tour de Fore Est. 2021" style={{ width: 240, height: 240, margin: "0 auto 1.5rem", objectFit: "contain" }} />
        <h1 style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "1.5rem" }}>
          Plan a Trip
        </h1>

        {mode === "choose" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 360, margin: "0 auto" }}>
            <motion.button
              onClick={() => setMode("login")}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: "1.5rem 2rem",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 4,
                color: "#fff",
                cursor: "pointer",
                textAlign: "center",
              }}
            >
              <span style={{ display: "block", fontFamily: "var(--font-plan-block), sans-serif", fontSize: "1.3rem", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.3rem" }}>Login</span>
              <span style={{ display: "block", fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>View your planned trips</span>
            </motion.button>

            <motion.button
              onClick={onFirstTime}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: "1.5rem 2rem",
                background: "rgba(220,38,38,0.15)",
                border: "1px solid rgba(220,38,38,0.4)",
                borderRadius: 4,
                color: "#fff",
                cursor: "pointer",
                textAlign: "center",
              }}
            >
              <span style={{ display: "block", fontFamily: "var(--font-plan-block), sans-serif", fontSize: "1.3rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "#EA580C", marginBottom: "0.3rem" }}>First Time Planner</span>
              <span style={{ display: "block", fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>Plan your first golf trip</span>
            </motion.button>
          </motion.div>
        )}

        {mode === "login" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: 360, margin: "0 auto" }}>
            {forgotSent ? (
              <div>
                <p style={{ color: "#EA580C", fontFamily: "var(--font-plan-block), sans-serif", textTransform: "uppercase", marginBottom: "0.75rem" }}>Check your email</p>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                  We sent a password reset link to <strong style={{ color: "rgba(255,255,255,0.7)" }}>{email}</strong>.
                </p>
                <button onClick={() => { setForgotSent(false); setError(""); }} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer", textDecoration: "underline", fontSize: "0.85rem" }}>
                  Back to login
                </button>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                    style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: "0.75rem 0", color: "#fff", fontSize: "1rem", outline: "none", textAlign: "center" }}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") handleLogin(); }}
                    style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: "0.75rem 0", color: "#fff", fontSize: "1rem", outline: "none", textAlign: "center" }}
                  />
                </div>

                {error && <p style={{ color: "#f87171", fontSize: "0.8rem", marginBottom: "1rem" }}>{error}</p>}

                <motion.button
                  onClick={handleLogin}
                  disabled={loading}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  style={{ width: "100%", padding: "1rem", background: "rgba(220,38,38,0.9)", color: "#fff", border: "none", borderRadius: 4, fontSize: "1rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1, fontFamily: "var(--font-plan-block), sans-serif", marginBottom: "1rem" }}
                >
                  {loading ? "Logging in..." : "Login"}
                </motion.button>

                <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem" }}>
                  <button
                    onClick={handleForgot}
                    disabled={sendingReset}
                    style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer", fontSize: "0.8rem", textDecoration: "underline" }}
                  >
                    {sendingReset ? "Sending..." : "Forgot password?"}
                  </button>
                  <button
                    onClick={() => { setMode("choose"); setError(""); }}
                    style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer", fontSize: "0.8rem", textDecoration: "underline" }}
                  >
                    Back
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}
