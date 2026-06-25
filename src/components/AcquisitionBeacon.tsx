"use client";

/**
 * Leadgen A3 — first-pageview acquisition beacon.
 *
 * Fires `logAcquisition` once per browser session (guarded by a sessionStorage
 * flag) with the referrer, any UTM params, a coarse device class, and the
 * landing path. Fire-and-forget: the emit auto-attaches the `vid` cookie and
 * never blocks or throws. Mounted high in the tree (root layout) so it runs on
 * every entry point. Mirrors the BMHQ/MOH AcquisitionBeacon; TDF uses its
 * local signals-client port instead of shared-engine.
 */

import { useEffect } from "react";
import { logAcquisition } from "@/lib/signals-client";

const ACQ_SENT_KEY = "wp_acq_sent";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export default function AcquisitionBeacon() {
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      if (sessionStorage.getItem(ACQ_SENT_KEY)) return;
      sessionStorage.setItem(ACQ_SENT_KEY, "1");

      const params = new URLSearchParams(window.location.search);
      const utm: Record<string, string> = {};
      for (const k of UTM_KEYS) {
        const v = params.get(k);
        if (v) utm[k] = v;
      }

      const ua = navigator.userAgent || "";
      const device = /Mobi|Android|iPhone|iPad|iPod/i.test(ua) ? "mobile" : "desktop";

      logAcquisition("tdf", {
        ref: document.referrer || undefined,
        utm: Object.keys(utm).length ? utm : undefined,
        device,
        landing: window.location.pathname,
      });
    } catch {
      // Never break the app for an analytics beacon.
    }
  }, []);

  return null;
}
