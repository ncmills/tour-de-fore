"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

// Fires on the success page to ensure the order made it to Printful.
// This is a safety net — the webhook should handle it, but if it doesn't,
// this call will create the Printful order directly.
export default function OrderVerifier() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) return;

    // Small delay to give the webhook a chance to process first
    const timer = setTimeout(() => {
      fetch("/api/verify-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      }).catch(() => {
        // Silent — the cron will catch it anyway
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, [sessionId]);

  return null;
}
