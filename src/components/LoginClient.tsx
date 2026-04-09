"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

type Mode = "signin" | "register";

export default function LoginClient({ returnTo = "/my-trips" }: { returnTo?: string }) {
  const [mode, setMode] = useState<Mode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [sendingReset, setSendingReset] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(255,255,255,0.2)",
    padding: "0.875rem 0.5rem",
    color: "#fff",
    fontSize: "1rem",
    outline: "none",
    textAlign: "center" as const,
    minHeight: 44,
    boxSizing: "border-box" as const,
  };

  const handleSignIn = async () => {
    if (!email || !password) { setError("Enter your email and password."); return; }
    setError(""); setLoading(true);
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
      window.location.href = returnTo;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!name.trim()) { setError("Enter your name."); return; }
    if (!email || !email.includes("@")) { setError("Enter a valid email."); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (password !== confirm) { setError("Passwords don't match."); return; }
    setError(""); setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase().trim(), password, name: name.trim() }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Registration failed");
      }
      window.location.href = returnTo;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  };

  const handleForgot = async () => {
    if (!email || !email.includes("@")) { setError("Enter your email first."); return; }
    setError(""); setSendingReset(true);
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

  const switchMode = (m: Mode) => {
    setMode(m);
    setError("");
    setPassword("");
    setConfirm("");
    setShowForgot(false);
    setForgotSent(false);
  };

  return (
    <main style={{ minHeight: "100vh", background: "#000", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: 400, width: "100%", textAlign: "center" }}>

        <a href="/?skip=1">
          <Image src="/tdf-logo.png" alt="Tour de Fore" width={256} height={256} style={{ margin: "0 auto 1.5rem", display: "block" }} />
        </a>

        <h1 style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.5rem" }}>
          {mode === "signin" ? "Welcome Back" : "Create Account"}
        </h1>
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.85rem", marginBottom: "2rem" }}>
          {mode === "signin" ? "Sign in to view your planned trips." : "Set up your account to save and access your trips."}
        </p>

        {/* Tab switcher */}
        <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: "2rem" }}>
          {(["signin", "register"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              style={{
                flex: 1,
                background: "none",
                border: "none",
                borderBottom: mode === m ? "2px solid #EA580C" : "2px solid transparent",
                color: mode === m ? "#fff" : "rgba(255,255,255,0.35)",
                fontFamily: "var(--font-plan-block), sans-serif",
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                padding: "0.75rem",
                cursor: "pointer",
                transition: "all 0.2s",
                minHeight: 44,
                marginBottom: "-1px",
              }}
            >
              {m === "signin" ? "Sign In" : "Create Account"}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {mode === "signin" && (
            <motion.div key="signin" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
              {forgotSent ? (
                <div>
                  <p style={{ color: "#EA580C", fontFamily: "var(--font-plan-block), sans-serif", textTransform: "uppercase", marginBottom: "0.75rem" }}>Check your email</p>
                  <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                    We sent a reset link to <strong style={{ color: "rgba(255,255,255,0.7)" }}>{email}</strong>.
                  </p>
                  <button onClick={() => { setForgotSent(false); setShowForgot(false); setError(""); }} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.35)", cursor: "pointer", textDecoration: "underline", fontSize: "0.85rem", minHeight: 44, padding: "0.5rem" }}>
                    Back to sign in
                  </button>
                </div>
              ) : (
                <>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.5rem" }}>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus autoComplete="email" style={inputStyle} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") handleSignIn(); }} autoComplete="current-password" style={inputStyle} />
                  </div>

                  {error && <p style={{ color: "#f87171", fontSize: "0.8rem", marginBottom: "1rem" }}>{error}</p>}

                  <motion.button
                    onClick={handleSignIn}
                    disabled={loading}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    style={{ width: "100%", padding: "1rem", background: "rgba(220,38,38,0.9)", color: "#fff", border: "none", borderRadius: 4, fontSize: "1rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1, fontFamily: "var(--font-plan-block), sans-serif", marginBottom: "1rem" }}
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </motion.button>

                  <button
                    onClick={handleForgot}
                    disabled={sendingReset}
                    style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer", fontSize: "0.8rem", textDecoration: "underline", minHeight: 44, padding: "0.5rem" }}
                  >
                    {sendingReset ? "Sending..." : "Forgot password?"}
                  </button>
                </>
              )}
            </motion.div>
          )}

          {mode === "register" && (
            <motion.div key="register" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.5rem" }}>
                <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} autoFocus autoComplete="name" style={inputStyle} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" style={inputStyle} />
                <input type="password" placeholder="Password (min 8 characters)" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" style={inputStyle} />
                <input type="password" placeholder="Confirm password" value={confirm} onChange={(e) => setConfirm(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") handleRegister(); }} autoComplete="new-password" style={inputStyle} />
              </div>

              {error && <p style={{ color: "#f87171", fontSize: "0.8rem", marginBottom: "1rem" }}>{error}</p>}

              <motion.button
                onClick={handleRegister}
                disabled={loading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                style={{ width: "100%", padding: "1rem", background: "rgba(220,38,38,0.9)", color: "#fff", border: "none", borderRadius: 4, fontSize: "1rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1, fontFamily: "var(--font-plan-block), sans-serif" }}
              >
                {loading ? "Creating account..." : "Create Account"}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <p style={{ marginTop: "3rem", color: "rgba(255,255,255,0.2)", fontSize: "0.75rem" }}>
          <a href="/plan-a-trip" style={{ color: "rgba(255,255,255,0.25)", textDecoration: "underline" }}>Plan a trip without an account</a>
        </p>
      </motion.div>
    </main>
  );
}
