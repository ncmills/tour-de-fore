"use client";

import { useState } from "react";

/**
 * C2 — Do Not Sell or Share My Personal Information form (Tour de Fore).
 * POSTs the email to /api/privacy/do-not-sell, which sets do_not_sell=true and
 * consent_share=false on every wp_leads row for that email.
 */
export default function DoNotSellClient() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/privacy/do-not-sell", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Request failed");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg p-5 border border-border bg-card/40">
        <p className="text-accent font-semibold text-base">Your opt-out is recorded.</p>
        <p className="text-white/60 text-sm mt-2">
          We&rsquo;ve flagged any record tied to that email as do-not-sell and
          do-not-share. We won&rsquo;t sell or share your personal information
          with vendors or partners.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md">
      <label htmlFor="dns-email" className="sr-only">
        Email address
      </label>
      <input
        id="dns-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="px-4 py-3 rounded-lg bg-black/40 border border-border text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-accent text-sm"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-6 py-3 rounded-lg bg-accent text-bg font-semibold text-sm disabled:opacity-50 hover:opacity-90 transition-opacity"
      >
        {status === "loading" ? "Submitting…" : "Submit my opt-out"}
      </button>
      {status === "error" && <p className="text-xs text-red-400">{errorMsg}</p>}
    </form>
  );
}
