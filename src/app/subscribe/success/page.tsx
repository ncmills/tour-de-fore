"use client";

import { useEffect } from "react";
import { motion } from "motion/react";

export default function SubscribeSuccessPage() {
  useEffect(() => {
    // Redirect to my-trips after a moment
    const t = setTimeout(() => {
      window.location.href = "/my-trips";
    }, 4000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#000",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "2rem",
    }}>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
        <div style={{ fontSize: "5rem", marginBottom: "1.5rem" }}>😈</div>
        <h1 style={{
          fontFamily: "var(--font-plan-groovy), cursive",
          fontSize: "clamp(2.5rem, 6vw, 4rem)",
          marginBottom: "0.75rem",
        }}>
          Welcome to the Devils
        </h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1.1rem", marginBottom: "0.5rem" }}>
          You now have unlimited trip plans with full details for the next year.
        </p>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.85rem" }}>
          Redirecting to your trips...
        </p>
      </motion.div>
    </div>
  );
}
