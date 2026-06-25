"use client";

import { useState } from "react";
import posthog from "posthog-js";
import { getVid } from "@/lib/vid";

const CONSENT_LABEL =
  "I agree Tour de Fore may share my trip details and contact info with relevant vendors and partners. See our Privacy Policy.";

interface Props {
  source: string;
  headline?: string;
  subtext?: string;
}

export default function EmailCapture({
  source,
  headline = "Plan your trip later",
  subtext = "Get the Tour de Fore destination guide + early-bird pricing on our next group trip drop.",
}: Props) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source,
          vid: getVid(),
          consent,
          consentText: CONSENT_LABEL,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Subscribe failed");
      }
      try {
        posthog.capture("lead_submitted", { source });
      } catch {}
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg p-5 border border-emerald-700/40 bg-emerald-900/20 text-center">
        <p className="text-emerald-300 font-semibold text-base">You&apos;re on the list.</p>
        <p className="text-emerald-200/70 text-sm mt-1">
          We&apos;ll send the destination guide and ping you when the next trip drops.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg p-5 border border-border bg-card/40">
      <h3 className="font-display text-xl text-white mb-1">{headline}</h3>
      <p className="text-sm text-white/60 mb-4">{subtext}</p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 px-4 py-3 rounded-lg bg-black/40 border border-border text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-accent text-sm"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-6 py-3 rounded-lg bg-accent text-bg font-semibold text-sm disabled:opacity-50 hover:opacity-90 transition-opacity"
        >
          {status === "loading" ? "Sending…" : "Send It"}
        </button>
      </form>
      <label className="mt-3 flex items-start gap-2.5 cursor-pointer text-xs leading-snug text-white/50">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 shrink-0 h-4 w-4 accent-accent"
        />
        <span>
          I agree Tour de Fore may share my trip details and contact info with
          relevant vendors and partners.{" "}
          <a href="/privacy" className="underline text-accent hover:opacity-80">
            See our Privacy Policy
          </a>
          .
        </span>
      </label>
      {status === "error" && <p className="mt-2 text-xs text-red-400">{errorMsg}</p>}
    </div>
  );
}
