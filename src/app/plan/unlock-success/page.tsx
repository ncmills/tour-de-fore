"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { motion } from "motion/react";

function UnlockSuccessContent() {
  const params = useSearchParams();
  const planId = params.get("planId") || "";
  const dest = params.get("dest") || "";
  const [status, setStatus] = useState<"generating" | "done" | "error">("generating");

  useEffect(() => {
    if (!planId || !dest) return;

    // Trigger paid plan generation
    fetch("/api/unlock-plan", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planId, dest }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Generation failed");
        return res.json();
      })
      .then(() => {
        setStatus("done");
        setTimeout(() => {
          window.location.href = `/plan/result/${planId}?dest=${dest}&tier=devil`;
        }, 2000);
      })
      .catch(() => setStatus("error"));
  }, [planId, dest]);

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
      {status === "generating" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div style={{ fontSize: "4rem", marginBottom: "1.5rem" }}>😈</div>
          <h1 style={{
            fontFamily: "var(--font-plan-groovy), cursive",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            marginBottom: "1rem",
          }}>
            Payment Received
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1.1rem", marginBottom: "2rem" }}>
            The devils are building your full trip plan...
          </p>
          <div style={{ width: 200, height: 2, background: "rgba(255,255,255,0.1)", margin: "0 auto", overflow: "hidden" }}>
            <motion.div
              style={{ height: "100%", background: "linear-gradient(90deg, #EA580C, #DC2626)" }}
              animate={{ x: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}

      {status === "done" && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <div style={{ fontSize: "4rem", marginBottom: "1.5rem" }}>🔥</div>
          <h1 style={{
            fontFamily: "var(--font-plan-groovy), cursive",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            marginBottom: "1rem",
          }}>
            Your Plan is Ready
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)" }}>Redirecting to your full trip plan...</p>
        </motion.div>
      )}

      {status === "error" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div style={{ fontSize: "4rem", marginBottom: "1.5rem" }}>💀</div>
          <h1 style={{
            fontFamily: "var(--font-plan-groovy), cursive",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            marginBottom: "1rem",
          }}>
            Something Went Wrong
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "2rem" }}>
            Don&apos;t worry — your payment went through. We&apos;ll have your plan ready shortly.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "12px 32px",
              background: "rgba(220,38,38,0.9)",
              border: "none",
              borderRadius: 6,
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        </motion.div>
      )}
    </div>
  );
}

export default function UnlockSuccessPage() {
  return (
    <Suspense>
      <UnlockSuccessContent />
    </Suspense>
  );
}
