"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

// Fires on the success page to create the Printful order for this session.
// This is the primary fulfillment trigger (the Stripe webhook no longer
// handles shop orders). The 5-minute cron is the safety net if the user
// closes their browser before this runs.
export default function OrderVerifier() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) return;
    fetch("/api/verify-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    }).catch(() => {
      // Silent — the 5-min cron will catch it anyway
    });
  }, [sessionId]);

  return null;
}
