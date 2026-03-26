"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import {
  GeneratedPlan,
  TripTier,
  SectionAlternative,
  PlanCourse,
  PlanDining,
  PlanBar,
} from "@/lib/plan-types";

/* ── helpers ── */

const typeIcons: Record<string, string> = {
  golf: "\u26f3",
  dining: "\ud83c\udf7d\ufe0f",
  activity: "\ud83c\udfaf",
  nightlife: "\ud83c\udf19",
  travel: "\u2708\ufe0f",
  lodging: "\ud83c\udfe0",
};

const tierLabels: Record<TripTier, string> = {
  imp: "The Imp",
  devil: "The Devil",
  "demon-king": "The Demon King",
};

const tierColors: Record<TripTier, string> = {
  imp: "#4ade80",
  devil: "#f97316",
  "demon-king": "#ef4444",
};

const sectionPadding: React.CSSProperties = {
  padding: "5rem clamp(1.5rem, 6vw, 6rem)",
};

const headingFont: React.CSSProperties = {
  fontFamily: "var(--font-script), cursive",
};

const cardStyle: React.CSSProperties = {
  background: "#111",
  border: "1px solid #222",
  borderRadius: 12,
  transition: "transform 0.25s ease, border-color 0.25s ease",
};

const cardHover = {
  transform: "translateY(-4px)",
  borderColor: "rgba(255,255,255,0.15)",
};

const fadeVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as [number, number, number, number] } },
};

/* ── sub-components ── */

function ConciergeCTA({ planId, tier }: { planId: string; tier: TripTier }) {
  return (
    <div style={{ marginTop: "2.5rem", textAlign: "center" }}>
      <Link
        href={`/concierge?planId=${planId}&tier=${tier}`}
        style={{
          color: "#ccc",
          fontSize: 14,
          textDecoration: "none",
          borderBottom: "1px solid rgba(255,255,255,0.2)",
          paddingBottom: 2,
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#ccc")}
      >
        Want us to do all the work? Try our concierge service &rarr;
      </Link>
    </div>
  );
}

function AlternativeCards({ items }: { items?: SectionAlternative[] }) {
  if (!items || items.length === 0) return null;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "1rem",
        marginTop: "2rem",
      }}
    >
      {items.map((alt) => {
        const isUpgrade = alt.direction === "upgrade";
        return (
          <motion.div
            key={alt.name}
            variants={fadeVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            style={{
              ...cardStyle,
              padding: "1.25rem 1.5rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 18 }}>{isUpgrade ? "\u2191" : "\u2193"}</span>
              <span
                style={{
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: isUpgrade ? "#f97316" : "#4ade80",
                }}
              >
                {isUpgrade ? "Upgrade" : "Downgrade"}
              </span>
            </div>
            <h4 style={{ color: "#fff", fontSize: 16, fontWeight: 600, margin: "0 0 6px" }}>
              {alt.name}
            </h4>
            <p style={{ color: "#999", fontSize: 13, lineHeight: 1.6, margin: "0 0 8px" }}>
              {alt.description}
            </p>
            <span
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: alt.costDelta.startsWith("-") ? "#4ade80" : "#f97316",
              }}
            >
              {alt.costDelta}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

function HoverCard({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        ...cardStyle,
        ...(hovered ? cardHover : {}),
        ...style,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </div>
  );
}

function ExternalLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        color: "#aaa",
        fontSize: 12,
        textTransform: "uppercase",
        letterSpacing: "0.12em",
        textDecoration: "none",
        marginTop: 12,
        transition: "color 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "#aaa")}
    >
      {label}
      <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    </a>
  );
}

/* ── main component ── */

interface PlanResultClientProps {
  plan: GeneratedPlan;
  planId: string;
  tier: TripTier;
}

export default function PlanResultClient({ plan, planId, tier }: PlanResultClientProps) {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sendToAttendees = () => {
    /* placeholder — wire to API */
  };

  return (
    <div style={{ background: "#000", color: "#fff", minHeight: "100vh" }}>
      {/* ─── 1. Summary Bar ─── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(0,0,0,0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #222",
          padding: "0.75rem clamp(1rem, 4vw, 3rem)",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <Link
              href={`/plan/result/${planId}`}
              style={{
                color: "#888",
                fontSize: 13,
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}
            >
              &larr; All Tiers
            </Link>
            <span
              style={{
                display: "inline-block",
                padding: "3px 12px",
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                background: tierColors[tier],
                color: "#000",
              }}
            >
              {tierLabels[tier]}
            </span>
            <span style={{ color: "#ccc", fontSize: 14 }}>{plan.destination}</span>
            <span style={{ color: "#666", fontSize: 13 }}>{plan.dates}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ color: "#888", fontSize: 13 }}>
              {plan.groupSize} golfers
            </span>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>
              {plan.estimatedBudget.perPerson}/pp
            </span>
          </div>
        </div>
      </div>

      {/* ─── 2. City Overview ─── */}
      <motion.section
        variants={fadeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{
          ...sectionPadding,
          maxWidth: 1100,
          margin: "0 auto",
          textAlign: "center",
          paddingTop: "6rem",
        }}
      >
        <h1
          style={{
            ...headingFont,
            fontSize: "clamp(3rem, 8vw, 6rem)",
            lineHeight: 1.1,
            margin: "0 0 1rem",
          }}
        >
          {plan.destination}
        </h1>
        <p style={{ color: "#999", fontSize: 18, margin: "0 0 0.5rem" }}>{plan.dates}</p>
        <p
          style={{
            ...headingFont,
            color: "#bbb",
            fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
            fontStyle: "italic",
            marginTop: "1rem",
          }}
        >
          &ldquo;{plan.tagline}&rdquo;
        </p>
      </motion.section>

      {/* ─── 3. Lodging ─── */}
      <motion.section
        variants={fadeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ ...sectionPadding, maxWidth: 1100, margin: "0 auto" }}
      >
        <h2
          style={{
            ...headingFont,
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            marginBottom: "2.5rem",
          }}
        >
          The Lodging
        </h2>
        <HoverCard style={{ padding: "2rem 2.5rem" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: "1rem",
              marginBottom: "1rem",
            }}
          >
            <div>
              <h3 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 6px" }}>
                {plan.lodging.name}
              </h3>
              <p
                style={{
                  color: "#777",
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  margin: 0,
                }}
              >
                {plan.lodging.type} &mdash; {plan.lodging.address}
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <span style={{ fontSize: 26, fontWeight: 700, color: tierColors[tier] }}>
                {plan.lodging.costPerNight}
              </span>
              <span style={{ display: "block", color: "#666", fontSize: 13 }}>/night</span>
            </div>
          </div>
          <p style={{ color: "#aaa", lineHeight: 1.7, margin: 0, fontSize: 15 }}>
            {plan.lodging.rationale}
          </p>
          {plan.lodging.url && <ExternalLink href={plan.lodging.url} label="View Listing" />}
        </HoverCard>

        <AlternativeCards items={plan.lodgingAlternatives} />
        <ConciergeCTA planId={planId} tier={tier} />
      </motion.section>

      {/* ─── 4. Golf Courses ─── */}
      <motion.section
        variants={fadeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ ...sectionPadding, maxWidth: 1100, margin: "0 auto" }}
      >
        <h2
          style={{
            ...headingFont,
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            marginBottom: "2.5rem",
          }}
        >
          The Courses
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {plan.courses.map((course: PlanCourse, i: number) => (
            <motion.div
              key={course.name}
              variants={fadeVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.06 }}
            >
              <HoverCard style={{ padding: "1.75rem 2rem", height: "100%", display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: tierColors[tier],
                    }}
                  >
                    Day {course.day} &mdash; {course.session}
                  </span>
                  <span style={{ color: tierColors[tier], fontSize: 14, fontWeight: 600 }}>
                    {course.greenFee}
                  </span>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 10px" }}>
                  {course.name}
                </h3>
                <p style={{ color: "#888", fontSize: 13, lineHeight: 1.6, margin: 0, flex: 1 }}>
                  {course.whyThisCourse}
                </p>
                {course.url && <ExternalLink href={course.url} label="Tee Times & Info" />}
              </HoverCard>
            </motion.div>
          ))}
        </div>

        <AlternativeCards items={plan.courseAlternatives} />
        <ConciergeCTA planId={planId} tier={tier} />
      </motion.section>

      {/* ─── 5. Bars & Nightlife ─── */}
      {plan.bars && plan.bars.length > 0 && (
        <motion.section
          variants={fadeVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ ...sectionPadding, maxWidth: 1100, margin: "0 auto" }}
        >
          <h2
            style={{
              ...headingFont,
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              marginBottom: "2.5rem",
            }}
          >
            Bars & Nightlife
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {plan.bars.map((bar: PlanBar, i: number) => (
              <motion.div
                key={bar.name}
                variants={fadeVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.06 }}
              >
                <HoverCard style={{ padding: "1.75rem 2rem", height: "100%" }}>
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: tierColors[tier],
                      marginBottom: 10,
                    }}
                  >
                    {bar.vibe}
                  </span>
                  <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 10px" }}>
                    {bar.name}
                  </h3>
                  <p style={{ color: "#888", fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                    {bar.description}
                  </p>
                  {bar.url && <ExternalLink href={bar.url} label="Check it Out" />}
                </HoverCard>
              </motion.div>
            ))}
          </div>
          <ConciergeCTA planId={planId} tier={tier} />
        </motion.section>
      )}

      {/* ─── 6. Dining ─── */}
      {plan.dining && plan.dining.length > 0 && (
        <motion.section
          variants={fadeVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ ...sectionPadding, maxWidth: 1100, margin: "0 auto" }}
        >
          <h2
            style={{
              ...headingFont,
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              marginBottom: "2.5rem",
            }}
          >
            Dining
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {plan.dining.map((spot: PlanDining, i: number) => (
              <motion.div
                key={spot.name}
                variants={fadeVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.06 }}
              >
                <HoverCard style={{ padding: "1.75rem 2rem", height: "100%" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: tierColors[tier],
                      }}
                    >
                      {spot.type}
                    </span>
                    <span style={{ color: "#666", fontSize: 13 }}>{spot.priceRange}</span>
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 10px" }}>
                    {spot.name}
                  </h3>
                  <p style={{ color: "#888", fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                    {spot.description}
                  </p>
                  {spot.url && <ExternalLink href={spot.url} label="View Menu" />}
                </HoverCard>
              </motion.div>
            ))}
          </div>

          <AlternativeCards items={plan.diningAlternatives} />
          <ConciergeCTA planId={planId} tier={tier} />
        </motion.section>
      )}

      {/* ─── 7. Itinerary ─── */}
      <motion.section
        variants={fadeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ ...sectionPadding, maxWidth: 1100, margin: "0 auto" }}
      >
        <h2
          style={{
            ...headingFont,
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            marginBottom: "2.5rem",
          }}
        >
          The Itinerary
        </h2>
        <div>
          {plan.schedule.map((day, i) => (
            <motion.div
              key={day.day}
              variants={fadeVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: i * 0.06 }}
              style={{
                borderTop: "1px solid #222",
                padding: "2rem 0",
                display: "grid",
                gridTemplateColumns: "180px 1fr",
                gap: "2rem",
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 17 }}>{day.label}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {day.items.map((item, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <span style={{ fontSize: 18, marginTop: -2 }}>
                      {typeIcons[item.type] || "\ud83d\udccc"}
                    </span>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          alignItems: "baseline",
                          gap: "0.75rem",
                        }}
                      >
                        <span
                          style={{
                            fontSize: 11,
                            color: tierColors[tier],
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                          }}
                        >
                          {item.time}
                        </span>
                        <span style={{ fontSize: 15, fontWeight: 500 }}>{item.activity}</span>
                      </div>
                      {item.detail && (
                        <p style={{ color: "#777", fontSize: 13, margin: "4px 0 0", lineHeight: 1.5 }}>
                          {item.detail}
                        </p>
                      )}
                      {item.proTip && (
                        <p
                          style={{
                            color: "rgba(249,115,22,0.7)",
                            fontSize: 13,
                            fontStyle: "italic",
                            margin: "4px 0 0",
                          }}
                        >
                          {"\ud83d\udca1"} {item.proTip}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
          <div style={{ borderTop: "1px solid #222" }} />
        </div>
        <ConciergeCTA planId={planId} tier={tier} />
      </motion.section>

      {/* ─── 8. Budget Breakdown ─── */}
      <motion.section
        variants={fadeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ ...sectionPadding, maxWidth: 1100, margin: "0 auto" }}
      >
        <h2
          style={{
            ...headingFont,
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            marginBottom: "2.5rem",
          }}
        >
          Budget Breakdown
        </h2>
        <div style={{ ...cardStyle, overflow: "hidden" }}>
          <div
            style={{
              padding: "1.75rem 2rem",
              borderBottom: "1px solid #222",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 18, fontWeight: 600 }}>Total Per Person</span>
            <span style={{ fontSize: 28, fontWeight: 700, color: tierColors[tier] }}>
              {plan.estimatedBudget.perPerson}
            </span>
          </div>
          {plan.estimatedBudget.breakdown.map((item) => (
            <div
              key={item.category}
              style={{
                padding: "1rem 2rem",
                borderBottom: "1px solid #181818",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#111")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <span style={{ color: "#999", fontSize: 14 }}>{item.category}</span>
              <span style={{ fontWeight: 600, fontSize: 15 }}>{item.perPerson}</span>
            </div>
          ))}
        </div>
        <ConciergeCTA planId={planId} tier={tier} />
      </motion.section>

      {/* ─── 9. Pro Tips ─── */}
      {plan.proTips && plan.proTips.length > 0 && (
        <motion.section
          variants={fadeVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ ...sectionPadding, maxWidth: 1100, margin: "0 auto" }}
        >
          <h2
            style={{
              ...headingFont,
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              marginBottom: "2.5rem",
            }}
          >
            Pro Tips
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {plan.proTips.map((tip, i) => (
              <motion.div
                key={i}
                variants={fadeVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.04 }}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1.5rem",
                  borderLeft: `2px solid ${tierColors[tier]}`,
                  paddingLeft: "1.5rem",
                  paddingTop: 4,
                  paddingBottom: 4,
                }}
              >
                <span
                  style={{
                    ...headingFont,
                    fontSize: 24,
                    color: tierColors[tier],
                    lineHeight: 1,
                    marginTop: 2,
                    flexShrink: 0,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p style={{ color: "#aaa", lineHeight: 1.7, margin: 0, fontSize: 15 }}>{tip}</p>
              </motion.div>
            ))}
          </div>
          <ConciergeCTA planId={planId} tier={tier} />
        </motion.section>
      )}

      {/* ─── 10. Group Logistics ─── */}
      <motion.section
        variants={fadeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ ...sectionPadding, maxWidth: 1100, margin: "0 auto" }}
      >
        <h2
          style={{
            ...headingFont,
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            marginBottom: "2.5rem",
          }}
        >
          Group Logistics
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.25rem",
          }}
        >
          <HoverCard style={{ padding: "1.75rem 2rem" }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, margin: "0 0 12px" }}>
              Tee Time Strategy
            </h3>
            <p style={{ color: "#999", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
              {plan.groupLogistics.teeTimeStrategy}
            </p>
          </HoverCard>
          <HoverCard style={{ padding: "1.75rem 2rem" }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, margin: "0 0 12px" }}>Transport</h3>
            <p style={{ color: "#999", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
              {plan.groupLogistics.transport}
            </p>
          </HoverCard>
        </div>

        <motion.div
          variants={fadeVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ marginTop: "1.25rem" }}
        >
          <HoverCard style={{ padding: "1.75rem 2rem" }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, margin: "0 0 16px" }}>Packing List</h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                gap: "0.75rem",
              }}
            >
              {plan.groupLogistics.packingList.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: tierColors[tier],
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ color: "#aaa", fontSize: 14 }}>{item}</span>
                </div>
              ))}
            </div>
          </HoverCard>
        </motion.div>

        <ConciergeCTA planId={planId} tier={tier} />
      </motion.section>

      {/* ─── Share Bar ─── */}
      <div
        style={{
          borderTop: "1px solid #222",
          padding: "2.5rem clamp(1rem, 4vw, 3rem)",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <button
            onClick={copyLink}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 24px",
              background: "transparent",
              border: "1px solid #333",
              borderRadius: 8,
              color: "#ccc",
              fontSize: 14,
              cursor: "pointer",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#666";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#333";
              e.currentTarget.style.color = "#ccc";
            }}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
            {copied ? "Copied!" : "Copy Link"}
          </button>

          <button
            onClick={sendToAttendees}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 24px",
              background: tierColors[tier],
              border: "none",
              borderRadius: 8,
              color: "#000",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Send to Attendees
          </button>
        </div>
      </div>
    </div>
  );
}
