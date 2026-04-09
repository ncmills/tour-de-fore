"use client";

import { useState } from "react";
import { motion } from "motion/react";
import MulliganButton from "@/components/MulliganButton";
import HomeButton from "@/components/HomeButton";

const perks = [
  { icon: "♾️", label: "Unlimited trip plans", desc: "No more waiting — plan as many trips as you want, every month" },
  { icon: "🏌️", label: "Every destination", desc: "Budget, mid-range, and premium options for any crew size" },
  { icon: "📅", label: "Full itineraries", desc: "Day-by-day schedules with pro tips from 6 years of TDF trips" },
  { icon: "🛠️", label: "Trip builder", desc: "Customize every detail — swap courses, lodging, restaurants" },
  { icon: "📤", label: "Share with the crew", desc: "Shareable trip page with RSVP for your whole group" },
  { icon: "🔥", label: "Always first", desc: "First access to new features and destinations as we add them" },
];

export default function SubscribePage() {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ returnUrl: window.location.href }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else if (data.error === "Sign in first") {
        // Need to sign in first — could prompt for email
        alert("Sign in first to subscribe. Go to My Trips to sign in.");
      } else setLoading(false);
    } catch { setLoading(false); }
  };

  return (
    <main style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "clamp(2rem, 6vw, 4rem) clamp(1rem, 4vw, 3rem)" }}>
      <MulliganButton />
      <HomeButton />

      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ fontSize: "5rem", marginBottom: "1rem" }}>😈</div>
          <h1 style={{
            fontFamily: "var(--font-plan-groovy), cursive",
            fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
            marginBottom: "0.5rem",
          }}>
            Become a Devil
          </h1>
          <p className="neon-stats neon-stats-text" style={{ fontSize: "clamp(0.85rem, 2.5vw, 1.05rem)", maxWidth: 500, margin: "0 auto 2rem" }}>
            3 free plans a month. Devils get unlimited.
          </p>
        </motion.div>

        {/* Price */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            background: "rgba(220,38,38,0.06)",
            border: "2px solid rgba(220,38,38,0.3)",
            borderRadius: 16,
            padding: "2.5rem 2rem",
            marginBottom: "2.5rem",
          }}
        >
          <div style={{ fontSize: "clamp(3rem, 8vw, 5rem)", fontWeight: 800, color: "#fff" }}>$19.99<span style={{ fontSize: "0.35em", fontWeight: 400, color: "rgba(255,255,255,0.4)" }}>/mo</span></div>
          <p className="neon-stats neon-stats-text" style={{ fontSize: "clamp(0.75rem, 2vw, 0.9rem)", marginBottom: "2rem" }}>Unlimited trips. Unlimited excuses to your wife.</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(250px, 100%), 1fr))", gap: "1rem", textAlign: "left", marginBottom: "2rem" }}>
            {perks.map(({ icon, label, desc }) => (
              <div key={label} style={{ display: "flex", gap: "0.75rem", alignItems: "start" }}>
                <span style={{ fontSize: "1.3rem", lineHeight: 1 }}>{icon}</span>
                <div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#fff" }}>{label}</div>
                  <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleSubscribe}
            disabled={loading}
            style={{
              padding: "1rem 3rem",
              background: "rgba(220,38,38,0.9)",
              border: "none",
              borderRadius: 8,
              color: "#fff",
              fontSize: "1.1rem",
              fontWeight: 700,
              cursor: loading ? "wait" : "pointer",
              opacity: loading ? 0.6 : 1,
              fontFamily: "var(--font-plan-script), cursive",
              letterSpacing: "0.03em",
            }}
          >
            {loading ? "Redirecting..." : "Become a Devil — $19.99/mo"}
          </button>

          <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.2)", marginTop: "1rem" }}>
            Cancel anytime. Secure payment via Stripe.
          </p>
        </motion.div>

        {/* Free vs Devil comparison */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <h3 style={{ fontSize: "1rem", color: "rgba(255,255,255,0.3)", marginBottom: "1rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Free vs Devil
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 0, fontSize: "clamp(0.65rem, 2vw, 0.8rem)", textAlign: "left" }}>
            {[
              ["", "Free", "Devil"],
              ["Plans/mo", "3", "Unlimited"],
              ["Full details", "✓", "✓"],
              ["Real venues", "✓", "✓"],
              ["Booking links", "✓", "✓"],
              ["Trip builder", "✓", "✓"],
              ["Share + RSVP", "✓", "✓"],
            ].map(([feature, free, devil], i) => (
              <div key={i} style={{ display: "contents" }}>
                <div style={{ padding: "0.5rem 0.25rem", color: "rgba(255,255,255,0.5)", borderBottom: "1px solid rgba(255,255,255,0.05)", fontWeight: i === 0 ? 600 : 400 }}>{feature}</div>
                <div style={{ padding: "0.5rem 0.25rem", color: "rgba(255,255,255,0.3)", borderBottom: "1px solid rgba(255,255,255,0.05)", textAlign: "center", fontWeight: i === 0 ? 600 : 400 }}>{free}</div>
                <div style={{ padding: "0.5rem 0.25rem", color: i === 0 ? "rgba(255,255,255,0.5)" : "rgba(220,38,38,0.9)", borderBottom: "1px solid rgba(255,255,255,0.05)", textAlign: "center", fontWeight: 600 }}>{devil}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
