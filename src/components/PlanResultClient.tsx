"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import {
  GeneratedPlan,
  ThreePlanResult,
  TripTier,
  SectionAlternative,
  PlanCourse,
  PlanDining,
  PlanBar,
} from "@/lib/plan-types";
import MulliganButton from "./MulliganButton";
import HomeButton from "./HomeButton";

const FALLBACK_GOLF_IMAGES = [
  "https://www.troonnorthgolf.com/wp-content/uploads/sites/8934/2023/06/home-main.jpg",
  "https://balihaigolfclub.com/wp-content/uploads/2024/07/bali-hai-og.jpg",
  "https://chambersbaygolf.com/wp-content/uploads/2025/05/cb-homescreen.jpg",
  "https://tamarackidaho.com/wp-content/uploads/2024/04/SH.2023.6.29_Golfing-157-scaled.jpg",
  "https://falconridgegolfclub.com/wp-content/uploads/HOLE-18-FALCON-RIDGE-0098.jpg",
  "https://www.wolfrungolfclub.com/wp-content/uploads/sites/8583/2022/09/home-full-1.jpg",
  "https://www.sandiagolf.com/wp-content/uploads/sites/8959/2023/06/21.jpg",
  "https://tetherow.com/wp-content/uploads/2018/12/tetherow-lodge-hero-3000.jpg",
  "https://www.reservegolf.com/wp-content/uploads/sites/9325/2024/01/IMG_5043.jpg",
  "https://newcastlegolf.com/wp-content/uploads/2024/01/DJI_0055-Enhanced-NR.jpg",
  "https://casablanca.playmesquite.com/wp-content/uploads/2025/01/200808_nevada_palmsgolf_033.jpg",
  "https://azhideawaycollection.com/wp-content/uploads/2024/12/sedona_home_hero-1024x728.webp",
];

function getFallbackImage(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
  return FALLBACK_GOLF_IMAGES[Math.abs(hash) % FALLBACK_GOLF_IMAGES.length];
}

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
  imp: "var(--color-success)",
  devil: "#f97316",
  "demon-king": "#ef4444",
};

const sectionPadding: React.CSSProperties = {
  padding: "3.5rem clamp(1.5rem, 6vw, 6rem)",
};

const headingFont: React.CSSProperties = {
  fontFamily: "var(--font-plan-script), cursive",
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

function ConciergeCTA({ planId, tier, dest }: { planId: string; tier: TripTier; dest?: string }) {
  return (
    <div style={{ marginTop: "2.5rem", textAlign: "center" }}>
      <Link
        href={`/concierge?planId=${planId}&tier=${tier}${dest ? `&dest=${dest}` : ""}`}
        style={{
          color: "#ccc",
          fontSize: 14,
          textDecoration: "none",
          borderBottom: "1px solid rgba(255,255,255,0.2)",
          paddingBottom: 2,
          padding: "12px 0",
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#ccc")}
      >
        Too much work? Let the devils handle it &rarr;
      </Link>
    </div>
  );
}

function AlternativeCards({ items, isEstimate }: { items?: SectionAlternative[]; isEstimate?: boolean }) {
  if (!items || items.length === 0) return null;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))",
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
                  color: isUpgrade ? "#f97316" : "var(--color-success)",
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
                color: alt.costDelta.startsWith("-") ? "var(--color-success)" : "#f97316",
              }}
            >
              {alt.costDelta}
              {isEstimate && <span style={{ color: "#666", fontSize: 11, fontWeight: 400, marginLeft: 4 }}>(est.)</span>}
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
  const safeHref = href.startsWith("http") ? href : `https://${href}`;
  return (
    <a
      href={safeHref}
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
        minHeight: 44,
        padding: "12px 0",
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
  allPlans?: ThreePlanResult;
  planId: string;
  tier: TripTier;
  dest?: string;
  paid?: boolean;
  subscribed?: boolean;
  /**
   * True only when the viewer's session email matches the plan's organizer.
   * Forwarded viewers (anon or a different signed-in user) see a read-only
   * itinerary — the "Send to the Crew" button is hidden so they don't run
   * into a 403 from /api/send-plan-emails. They can still copy/forward the
   * link manually. See project_tdf_share_links_0411 memory.
   */
  isOwner?: boolean;
}

export default function PlanResultClient({ plan, allPlans, planId, tier, dest, paid, subscribed, isOwner }: PlanResultClientProps) {
  const [copied, setCopied] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [sendingEmails, setSendingEmails] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState("");

  const copyLink = () => {
    // 2026-04-11: copy the clean, shareable /plan/result/[id] URL — no
    // ?dest=&tier= query params. A forwarded recipient should land on the
    // destination picker (all 3 options) and pick for themselves, and the
    // bare URL is what unfurls cleanly in iMessage/Slack/WhatsApp previews.
    // Mirrors the email link produced by /api/send-plan-emails.
    const url = `${window.location.origin}/plan/result/${planId}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sendToAttendees = async () => {
    if (!emailInput.trim()) return;
    const emails = emailInput.split(/[,\s]+/).filter((e) => e.includes("@"));
    if (emails.length === 0) { setEmailError("Enter at least one valid email"); return; }

    setSendingEmails(true);
    setEmailError("");
    try {
      const res = await fetch("/api/send-plan-emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, emails, tier, dest }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send");
      }
      setEmailSent(true);
      setEmailInput("");
      setTimeout(() => { setEmailSent(false); setShowEmailForm(false); }, 3000);
    } catch (err) {
      setEmailError(err instanceof Error ? err.message : "Failed to send emails");
    } finally {
      setSendingEmails(false);
    }
  };

  return (
    <div style={{ background: "#000", color: "#fff", minHeight: "100vh" }}>
      {/* ─── Header ─── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(0,0,0,0.9)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #222",
        }}
      >
        <div style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0.6rem clamp(1rem, 4vw, 3rem)",
          gap: "0.4rem",
        }}>
          <span style={{
            fontFamily: "var(--font-plan-block), sans-serif",
            fontSize: "0.9rem",
            fontWeight: 700,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: "#fff",
          }}>
            {plan.tripName || plan.destination}
          </span>
          <Link
            href={`/plan/result/${planId}`}
            style={{
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#fff",
              textDecoration: "none",
              padding: "5px 14px",
              background: "rgba(220,38,38,0.8)",
              borderRadius: 4,
              whiteSpace: "nowrap",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(220,38,38,1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(220,38,38,0.8)"; }}
          >
            &larr; All Plans
          </Link>
        </div>
      </div>

      {/* Mulligan — below header */}
      <MulliganButton href={`/plan/result/${planId}`} />
      <HomeButton />


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
            lineHeight: 1.3,
            margin: "0 0 1rem",
          }}
        >
          {plan.destination}
        </h1>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
          <span style={{ display: "inline-block", padding: "3px 12px", borderRadius: 999, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", background: tierColors[tier], color: "#000" }}>
            {tierLabels[tier]}
          </span>
          <span style={{ color: "#ccc", fontSize: 15 }}>{plan.estimatedBudget.perPerson}/pp</span>
        </div>
        <p style={{ color: "#999", fontSize: 18, margin: 0 }}>{plan.dates}</p>
      </motion.section>

      {/* ─── 3. Lodging ─── */}
      <motion.section
        variants={fadeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ ...sectionPadding, maxWidth: 1100, margin: "0 auto" }}
      >
        <h2 style={{ ...headingFont, fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "2.5rem" }}>The Lodging</h2>
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
              <span style={{ display: "block", color: "#666", fontSize: 13 }}>/night <span style={{ fontSize: 11 }}>(est.)</span></span>
            </div>
          </div>
          <p style={{ color: "#aaa", lineHeight: 1.7, margin: 0, fontSize: 15 }}>
            {plan.lodging.rationale}
          </p>
          <div
            style={{
              marginTop: 16,
              padding: "10px 14px",
              background: "rgba(249,115,22,0.08)",
              border: "1px solid rgba(249,115,22,0.2)",
              borderRadius: 8,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 14 }}>&#9432;</span>
            <span style={{ color: "#b0b0b0", fontSize: 12, lineHeight: 1.5 }}>
              Pricing based on estimated market rates for this area &amp; group size. Actual rates vary by dates and availability.
            </span>
          </div>
        </HoverCard>

        <AlternativeCards items={plan.lodgingAlternatives} isEstimate />

      </motion.section>

      {/* ─── 4. Golf Courses ─── */}
      <motion.section
        variants={fadeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ ...sectionPadding, maxWidth: 1100, margin: "0 auto" }}
      >
        <h2 style={{ ...headingFont, fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "2.5rem" }}>The Courses</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))",
            gap: "1.25rem",
          }}
        >
          {plan.courses.map((course: PlanCourse, i: number) => (
            <motion.div
              // Multi-round trips legitimately repeat a course on different
              // days (e.g. Pinehurst No. 2 twice), so course.name alone is a
              // non-unique React key — triggered "two children with the same
              // key" warnings + risked dropped/duplicated cards. Suffix index.
              key={`${course.name}-${i}`}
              variants={fadeVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.06 }}
            >
              <HoverCard style={{ padding: 0, height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                {/* Course hero image */}
                <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", overflow: "hidden" }}>
                  <Image
                    src={course.imageUrl || getFallbackImage(course.name)}
                    alt={course.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 350px"
                    style={{ objectFit: "cover" }}
                    unoptimized
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)" }} />
                </div>
                <div style={{ padding: "1.25rem 1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
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
                </div>
              </HoverCard>
            </motion.div>
          ))}
        </div>

        <AlternativeCards items={plan.courseAlternatives} />

      </motion.section>

      {/* ─── 5. The 19th Hole ─── */}
      {plan.bars && plan.bars.length > 0 && (
        <motion.section
          variants={fadeVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ ...sectionPadding, maxWidth: 1100, margin: "0 auto" }}
        >
          <h2 style={{ ...headingFont, fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "2.5rem" }}>The 19th Hole</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))",
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
          <h2 style={{ ...headingFont, fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "2.5rem" }}>Dining</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))",
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
              className="plan-itinerary-row"
              style={{
                borderTop: "1px solid #222",
                padding: "2rem 0",
                display: "grid",
                gridTemplateColumns: "clamp(100px, 30vw, 180px) 1fr",
                gap: "clamp(1rem, 3vw, 2rem)",
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

      </motion.section>

      {/* ─── 8. The Damage ─── */}
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
          The Damage
        </h2>
        <div style={{ ...cardStyle, overflow: "hidden" }}>
          <div
            style={{
              padding: "1.25rem clamp(1rem, 4vw, 2rem)",
              borderBottom: "1px solid #222",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span style={{ fontSize: "clamp(0.9rem, 3vw, 1.1rem)", fontWeight: 600 }}>Total Per Person</span>
            <span style={{ fontSize: "clamp(1.4rem, 5vw, 1.75rem)", fontWeight: 700, color: tierColors[tier] }}>
              {plan.estimatedBudget.perPerson}
            </span>
          </div>
          {plan.estimatedBudget.breakdown.map((item) => (
            <div
              key={item.category}
              style={{
                padding: "0.75rem clamp(1rem, 4vw, 2rem)",
                borderBottom: "1px solid #181818",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "0.25rem",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#111")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <span style={{ color: "#999", fontSize: 14 }}>
                {item.category}
                {item.category.toLowerCase().includes("lodging") && (
                  <span style={{ color: "#666", fontSize: 11, marginLeft: 6 }}>(est.)</span>
                )}
              </span>
              <span style={{ fontWeight: 600, fontSize: 15 }}>{item.perPerson}</span>
            </div>
          ))}
        </div>

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
            gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))",
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
                gridTemplateColumns: "repeat(auto-fill, minmax(min(180px, 100%), 1fr))",
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

          {isOwner && (
            <button
              onClick={() => setShowEmailForm(!showEmailForm)}
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
              Send to the Crew
            </button>
          )}

          {/* Email input form */}
          {isOwner && showEmailForm && (
            <div style={{ width: "100%", maxWidth: 500, marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <input
                type="text"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter emails separated by commas..."
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 8,
                  color: "#fff",
                  fontSize: 14,
                  outline: "none",
                }}
                onKeyDown={(e) => { if (e.key === "Enter") sendToAttendees(); }}
              />
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <button
                  onClick={sendToAttendees}
                  disabled={sendingEmails}
                  style={{
                    padding: "10px 20px",
                    background: "rgba(220,38,38,0.9)",
                    border: "none",
                    borderRadius: 6,
                    color: "#fff",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: sendingEmails ? "wait" : "pointer",
                    opacity: sendingEmails ? 0.6 : 1,
                  }}
                >
                  {sendingEmails ? "Sending..." : emailSent ? "Sent!" : "Send Plans"}
                </button>
                {emailError && (
                  <span style={{ color: "rgba(239,68,68,0.8)", fontSize: 12 }}>{emailError}</span>
                )}
                {emailSent && (
                  <span style={{ color: "color-mix(in srgb, var(--color-success) 80%, transparent)", fontSize: 12 }}>Plans sent to the crew!</span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Change Itinerary CTA */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
          paddingTop: "1.5rem",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}>
          <Link
            href={`/plan/build?planId=${planId}&dest=${dest || "mid"}&tier=${tier}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 28px",
              background: "transparent",
              border: "2px solid rgba(255,255,255,0.3)",
              borderRadius: 8,
              color: "rgba(255,255,255,0.7)",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.04em",
              textDecoration: "none",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
          >
            Change Itinerary
          </Link>
        </div>

        {/* Subscription CTA removed — plans are fully free */}
      </div>

    </div>
  );
}
