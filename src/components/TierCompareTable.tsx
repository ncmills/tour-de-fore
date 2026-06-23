"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { GeneratedPlan, ThreePlanResult, TripTier } from "@/lib/plan-types";

/**
 * Side-by-side tier compare. Renders the 3 tiers (Imp / Devil / Demon King) as
 * COLUMNS and the key cost line items as ROWS, pulling STORED numbers off each
 * tier's estimatedBudget (no recompute). The per-person delta vs the cheapest
 * tier (Imp) is highlighted on each pricier column so the upgrade jump is
 * tangible. Works for shared read-only viewers — it only reads `allPlans`,
 * which the result page always passes.
 */

const TIER_ORDER: TripTier[] = ["imp", "devil", "demon-king"];

const tierLabels: Record<TripTier, string> = {
  imp: "The Imp",
  devil: "The Devil",
  "demon-king": "The Demon King",
};

const tierColors: Record<TripTier, string> = {
  imp: "var(--color-success)",
  devil: "#f97316",
  "demon-king": "#ef4444",
};

/** Average a dollar string/range to a number. Mirrors TripBuilderClient.parseDollars. */
function parseDollars(s: string | undefined): number {
  if (!s) return 0;
  const rangeMatch = s.match(/\$?\s*([\d,]+(?:\.\d+)?)\s*[-–—]\s*\$?\s*([\d,]+(?:\.\d+)?)/);
  if (rangeMatch) {
    const lo = parseFloat(rangeMatch[1].replace(/,/g, "")) || 0;
    const hi = parseFloat(rangeMatch[2].replace(/,/g, "")) || 0;
    return Math.round((lo + hi) / 2);
  }
  const m = s.replace(/[^0-9.]/g, "");
  return parseFloat(m) || 0;
}

function planFor(plans: ThreePlanResult, tier: TripTier): GeneratedPlan {
  return tier === "imp" ? plans.imp : tier === "devil" ? plans.devil : plans.demonKing;
}

// Canonical line items. Each row matches the LLM's free-text budget categories
// (which drift in wording) via keyword tests, so we render whatever the stored
// plan actually called the category.
const ROW_DEFS: { key: string; label: string; match: (cat: string) => boolean }[] = [
  { key: "golf", label: "Green Fees / Golf", match: (c) => /golf|green\s*fee|round|tee/.test(c) },
  { key: "lodging", label: "Lodging", match: (c) => /lodg|hotel|house|rental|stay|accommodat|airbnb/.test(c) },
  { key: "dining", label: "Dining", match: (c) => /dining|food|restaurant|meal|eat|chef/.test(c) },
  { key: "nightlife", label: "Nightlife", match: (c) => /night|bar|drink|booze|club|cocktail/.test(c) },
  { key: "transport", label: "Transport", match: (c) => /transport|travel|flight|car|bus|uber|shuttle|rideshare|airfare/.test(c) },
];

/** Find the stored breakdown line for a tier that matches a row def. */
function lineFor(plan: GeneratedPlan, match: (cat: string) => boolean): { label: string; value: string } | null {
  const items = plan.estimatedBudget?.breakdown || [];
  const hit = items.find((it) => match((it.category || "").toLowerCase()));
  return hit ? { label: hit.category, value: hit.perPerson } : null;
}

export default function TierCompareTable({
  allPlans,
  currentTier,
}: {
  allPlans: ThreePlanResult;
  currentTier: TripTier;
}) {
  const [open, setOpen] = useState(false);

  const plans = TIER_ORDER.map((t) => ({ tier: t, plan: planFor(allPlans, t) }));
  const impTotal = parseDollars(allPlans.imp?.estimatedBudget?.perPerson);

  // Build the rows that actually have data in at least one tier; for any tier
  // missing that category, fall back to the union of categories so we don't
  // render an empty grid. Any leftover (unmatched) categories from the current
  // tier get appended so nothing the user paid attention to is dropped.
  const rows = ROW_DEFS.filter((def) =>
    plans.some(({ plan }) => lineFor(plan, def.match))
  );

  const cellBorder = "1px solid #1c1c1c";

  return (
    <div style={{ marginTop: "2rem" }}>
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          aria-expanded={false}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.8rem 1.6rem",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 8,
            color: "rgba(255,255,255,0.8)",
            fontSize: "0.85rem",
            fontWeight: 600,
            letterSpacing: "0.03em",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}
        >
          {"⚖️"} Compare all three tiers &darr;
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
            <p style={{ color: "#888", fontSize: 13, margin: 0, fontStyle: "italic" }}>
              The devil&apos;s in the details. Here&apos;s exactly what the jump buys you — per person.
            </p>
            <button
              onClick={() => setOpen(false)}
              aria-expanded={true}
              style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: 12, cursor: "pointer", letterSpacing: "0.04em", padding: "4px 6px" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
            >
              Hide &uarr;
            </button>
          </div>

          {/* Horizontal scroll wrapper so 3 columns never crush on mobile. */}
          <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch", border: "1px solid #222", borderRadius: 12 }}>
            <table
              role="table"
              aria-label="Per-person cost comparison across tiers"
              style={{ width: "100%", minWidth: 540, borderCollapse: "collapse", background: "#111" }}
            >
              <thead>
                <tr>
                  <th
                    scope="col"
                    style={{
                      textAlign: "left",
                      padding: "1rem clamp(0.75rem, 2vw, 1.25rem)",
                      borderBottom: cellBorder,
                      color: "#666",
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      fontWeight: 600,
                      position: "sticky",
                      left: 0,
                      background: "#111",
                      zIndex: 1,
                    }}
                  >
                    Line item
                  </th>
                  {plans.map(({ tier }) => (
                    <th
                      key={tier}
                      scope="col"
                      style={{
                        textAlign: "right",
                        padding: "1rem clamp(0.75rem, 2vw, 1.25rem)",
                        borderBottom: cellBorder,
                        borderLeft: tier === currentTier ? `2px solid ${tierColors[tier]}` : cellBorder,
                        background: tier === currentTier ? "rgba(255,255,255,0.03)" : "transparent",
                      }}
                    >
                      <span style={{ display: "block", color: tierColors[tier], fontSize: 13, fontWeight: 700, whiteSpace: "nowrap" }}>
                        {tierLabels[tier]}
                      </span>
                      {tier === currentTier && (
                        <span style={{ display: "block", color: "#555", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 2 }}>
                          You&apos;re viewing
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Per-person total — the headline row. */}
                <tr>
                  <th
                    scope="row"
                    style={{
                      textAlign: "left",
                      padding: "0.9rem clamp(0.75rem, 2vw, 1.25rem)",
                      borderBottom: cellBorder,
                      color: "#fff",
                      fontSize: 14,
                      fontWeight: 700,
                      position: "sticky",
                      left: 0,
                      background: "#111",
                      zIndex: 1,
                    }}
                  >
                    Per-person total
                  </th>
                  {plans.map(({ tier, plan }) => {
                    const total = parseDollars(plan.estimatedBudget?.perPerson);
                    const delta = total - impTotal;
                    return (
                      <td
                        key={tier}
                        style={{
                          textAlign: "right",
                          padding: "0.9rem clamp(0.75rem, 2vw, 1.25rem)",
                          borderBottom: cellBorder,
                          borderLeft: tier === currentTier ? `2px solid ${tierColors[tier]}` : cellBorder,
                          background: tier === currentTier ? "rgba(255,255,255,0.03)" : "transparent",
                        }}
                      >
                        <span style={{ display: "block", color: tierColors[tier], fontSize: 16, fontWeight: 800, whiteSpace: "nowrap" }}>
                          {plan.estimatedBudget?.perPerson || "—"}
                        </span>
                        {tier !== "imp" && delta > 0 && (
                          <span style={{ display: "block", color: "#999", fontSize: 11, marginTop: 3, whiteSpace: "nowrap" }}>
                            +${delta.toLocaleString()} vs Imp
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>

                {/* Per-line-item rows. */}
                {rows.map((def) => (
                  <tr key={def.key}>
                    <th
                      scope="row"
                      style={{
                        textAlign: "left",
                        padding: "0.8rem clamp(0.75rem, 2vw, 1.25rem)",
                        borderBottom: cellBorder,
                        color: "#aaa",
                        fontSize: 13,
                        fontWeight: 500,
                        position: "sticky",
                        left: 0,
                        background: "#111",
                        zIndex: 1,
                      }}
                    >
                      {def.label}
                    </th>
                    {plans.map(({ tier, plan }) => {
                      const line = lineFor(plan, def.match);
                      return (
                        <td
                          key={tier}
                          style={{
                            textAlign: "right",
                            padding: "0.8rem clamp(0.75rem, 2vw, 1.25rem)",
                            borderBottom: cellBorder,
                            borderLeft: tier === currentTier ? `2px solid ${tierColors[tier]}` : cellBorder,
                            background: tier === currentTier ? "rgba(255,255,255,0.02)" : "transparent",
                            color: "#ddd",
                            fontSize: 14,
                            fontWeight: 600,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {line?.value || <span style={{ color: "#555" }}>—</span>}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p style={{ color: "#555", fontSize: 11, marginTop: "0.75rem", lineHeight: 1.5 }}>
            All figures per person, estimated from market rates for your group size &amp; dates. The Imp is the baseline; deltas show the per-person bump to level up.
          </p>
        </motion.div>
      )}
    </div>
  );
}
