"use client";

import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useMemo, useCallback } from "react";
import type { Trip } from "@/lib/trips";
import USMap from "./USMap";
import MulliganButton from "./MulliganButton";
import HomeButton from "./HomeButton";

const sectionHeadingStyle: React.CSSProperties = {
  fontFamily: "var(--font-slab-cold), serif",
  fontSize: "clamp(2rem, 5vw, 3.5rem)",
  // Alfa Slab One's glyph ink overflows its default `line-height: normal` (1.2)
  // box, so the bottom serifs + glow get clipped at the line box. Give it room.
  lineHeight: 1.4,
  color: "#fff",
  marginBottom: "2rem",
  textAlign: "center",
  textTransform: "uppercase",
  textShadow: "0 0 7px rgba(255,60,20,0.5), 0 0 20px rgba(255,60,20,0.25), 0 0 40px rgba(255,30,10,0.1)",
};

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden="true"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s", color: "#EA580C", flexShrink: 0 }}
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AccordionSection({
  title,
  order,
  isOpen,
  onToggle,
  anchorId,
  children,
}: {
  title: string;
  order: number;
  isOpen: boolean;
  onToggle: () => void;
  anchorId?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={anchorId} style={{ order, position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.1)", scrollMarginTop: "70px" }}>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          background: isOpen ? "rgba(255,255,255,0.02)" : "transparent",
          border: "none",
          cursor: "pointer",
          padding: "clamp(1.3rem, 3.5vw, 2.1rem) clamp(2.75rem, 8vw, 6rem)",
          position: "relative",
          transition: "background 0.3s",
        }}
      >
        <h2 style={{ ...sectionHeadingStyle, marginBottom: 0 }}>{title}</h2>
        <span style={{ position: "absolute", right: "clamp(1.1rem, 5vw, 3rem)", display: "inline-flex" }}>
          <ChevronIcon open={isOpen} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ padding: "0 clamp(1.5rem, 6vw, 6rem) clamp(2.5rem, 5vw, 3.5rem)" }}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function SummaryFact({ label, value, sub, mono }: { label: string; value: string; sub?: string; mono?: boolean }) {
  return (
    <div style={{ padding: "0.95rem 1.1rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)" }}>
      <div style={{ fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", fontWeight: 700, marginBottom: "0.3rem" }}>{label}</div>
      <div style={{ color: "#fff", fontSize: mono ? "1.3rem" : "0.9rem", fontWeight: mono ? 700 : 500, lineHeight: 1.45, fontFamily: mono ? "var(--font-mono, monospace)" : undefined, letterSpacing: mono ? "0.15em" : undefined }}>{value}</div>
      {sub && <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.78rem", marginTop: "0.2rem" }}>{sub}</div>}
    </div>
  );
}

export default function PastTripDetailClient({ trip, isLive }: { trip: Trip; isLive?: boolean }) {
  const [isMobile, setIsMobile] = useState(false);
  const [activeDay, setActiveDay] = useState(0);
  // Accordion: every section collapsed on first load except the Summary.
  const [open, setOpen] = useState<Set<string>>(() => new Set(["summary"]));
  const isOpen = (k: string) => open.has(k);
  const toggle = (k: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });
  const openSection = (k: string) =>
    setOpen((prev) => (prev.has(k) ? prev : new Set(prev).add(k)));
  const jumpTo = (k: string, anchorId: string) => {
    const wasOpen = open.has(k);
    openSection(k);
    setTimeout(() => {
      document.getElementById(anchorId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, wasOpen ? 0 : 380);
  };

  // 3-panel gallery: each panel cycles at a different cadence
  const galleryImages = useMemo(() => trip.gallery.filter((s) => !/\.(mp4|mov|webm)$/i.test(s)), [trip.gallery]);
  const panelIntervals = [3400, 4700, 6100]; // staggered ms per panel
  const [panelIndices, setPanelIndices] = useState([0, Math.floor(galleryImages.length / 3), Math.floor((galleryImages.length * 2) / 3)]);

  useEffect(() => {
    if (galleryImages.length < 3) return;
    const timers = panelIntervals.map((ms, panel) =>
      setInterval(() => {
        setPanelIndices((prev) => {
          const next = [...prev];
          next[panel] = (prev[panel] + 1) % galleryImages.length;
          return next;
        });
      }, ms)
    );
    return () => timers.forEach(clearInterval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [galleryImages.length]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Build a lookup map: activity name → image URL from courses and restaurants
  const imageMap = useMemo(() => {
    const map: Record<string, string> = {};
    for (const c of trip.courses) {
      if (c.image) map[c.name] = c.image;
    }
    for (const r of trip.restaurants) {
      if (r.image) map[r.name] = r.image;
    }
    return map;
  }, [trip.courses, trip.restaurants]);

  // Resolve lodging image
  const lodgingImage = trip.lodgingImage || trip.photoSections?.[0]?.images?.[0] || null;

  // Sections available for the Summary "jump to" links (in display order).
  const jumpTargets = [
    lodgingImage && { key: "command", anchor: "sec-command", label: "Command Center" },
    trip.courses.length > 0 && { key: "courses", anchor: "sec-courses", label: "The Courses" },
    trip.schedule.length > 0 && { key: "schedule", anchor: "sec-schedule", label: "Itinerary" },
    trip.privateDining && trip.privateDining.length > 0 && { key: "chef", anchor: "sec-chef", label: "The Chef's Table" },
    trip.bars && trip.bars.length > 0 && { key: "bars", anchor: "sec-bars", label: "Last Call" },
    galleryImages.length >= 3 && { key: "gallery", anchor: "sec-gallery", label: "Lads on Tour" },
  ].filter(Boolean) as { key: string; anchor: string; label: string }[];

  return (
    <main style={{ minHeight: "100vh", background: "#000", color: "#fff", position: "relative" }}>
      <MulliganButton href={isLive ? "/?skip=1" : "/past-trips"} />
      <HomeButton />

      {/* Page header with map background */}
      <div style={{ position: "relative", zIndex: 1, padding: "clamp(3rem, 8vw, 5rem) clamp(1.5rem, 6vw, 6rem) 0", textAlign: "center" }}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            fontFamily: "var(--font-scrawl), cursive",
            fontSize: "clamp(4rem, 12vw, 8rem)",
            fontWeight: 400,
            lineHeight: 0.9,
            letterSpacing: "0.02em",
            color: "#fff",
            textShadow: "0 0 10px rgba(255,80,20,0.8), 0 0 30px rgba(255,60,10,0.5), 0 0 60px rgba(255,40,0,0.3), 0 0 100px rgba(255,30,0,0.15)",
          }}
        >
          {trip.year}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{ fontFamily: "var(--font-scrawl), cursive", fontSize: "clamp(1rem, 2.5vw, 1.4rem)", color: "rgba(255,255,255,0.6)", marginTop: "0.5rem" }}
        >
          {trip.location}, {trip.state}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{ fontFamily: "monospace", fontSize: "clamp(0.75rem, 1.5vw, 0.9rem)", color: "rgba(255,255,255,0.35)", marginTop: "0.5rem", letterSpacing: "0.1em" }}
        >
          {trip.dates.replace(/,?\s*\d{4}$/, "")}
        </motion.p>

      </div>

      {/* Day pills — sticky top nav */}
      {trip.schedule.length > 0 && (
        <div style={{
          position: "sticky",
          // On mobile the fixed mulligan/home buttons occupy the very top corners,
          // so pin the day-pills bar just below them to avoid overlap.
          top: isMobile ? "3.75rem" : 0,
          zIndex: 50,
          background: "rgba(0,0,0,0.85)",
          backdropFilter: "blur(10px)",
          padding: isMobile ? "0.5rem 0.75rem" : "0.75rem clamp(1.5rem, 6vw, 6rem)",
          display: "flex",
          justifyContent: isMobile ? "flex-start" : "center",
          gap: isMobile ? "0.35rem" : "0.5rem",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}>
          {trip.schedule.map((day, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveDay(i);
                openSection("schedule");
                // Wait for the accordion expand animation before scrolling to the day.
                setTimeout(() => {
                  document.getElementById(`day-${i}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }, isOpen("schedule") ? 0 : 380);
              }}
              style={{
                fontFamily: "monospace",
                fontSize: isMobile ? "0.65rem" : "0.75rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: isMobile ? "0.5rem 0.6rem" : "0.65rem 1rem",
                minHeight: "44px",
                borderRadius: "4px",
                border: activeDay === i ? "1px solid rgba(220,38,38,0.6)" : "1px solid rgba(255,255,255,0.15)",
                background: activeDay === i ? "rgba(220,38,38,0.15)" : "transparent",
                color: activeDay === i ? "#fff" : "rgba(255,255,255,0.5)",
                cursor: "pointer",
                transition: "all 0.2s",
                flexShrink: 0,
                whiteSpace: "nowrap",
              }}
            >
              {day.day}
            </button>
          ))}
        </div>
      )}

      {/* US Map */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ position: "relative", zIndex: 1, padding: isMobile ? "0.75rem 1.5rem 0" : "1.4rem clamp(1.5rem, 6vw, 6rem) 0.014rem", maxWidth: isMobile ? "300px" : "700px", margin: "0 auto" }}
      >
        <USMap singleTrip={trip.year} compact />
      </motion.section>

      {/* ── Collapsible accordion sections (CSS `order` controls display order) ── */}
      <div style={{ display: "flex", flexDirection: "column", position: "relative", zIndex: 1 }}>

      {/* Summary — open by default; everything else collapsed */}
      <AccordionSection title="Summary" order={0} anchorId="sec-summary" isOpen={isOpen("summary")} onToggle={() => toggle("summary")}>
        {trip.tagline && (
          <p style={{ textAlign: "center", fontFamily: "var(--font-scrawl), cursive", fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", color: "rgba(255,255,255,0.7)", margin: "-0.25rem auto 1.75rem", maxWidth: "640px" }}>
            {trip.tagline}
          </p>
        )}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(240px, 1fr))", gap: "0.85rem", maxWidth: "1000px", margin: "0 auto" }}>
          <SummaryFact label="📅 Dates" value={trip.dates} />
          <SummaryFact label="📍 Where" value={`${trip.location}, ${trip.state}`} />
          {(trip.lodgingName || trip.lodgingAddress) && (
            <SummaryFact label="🏠 Lodging" value={trip.lodgingName || trip.lodgingAddress || "—"} sub={trip.lodgingName ? trip.lodgingAddress : undefined} />
          )}
          {trip.lodgingDoorCode && <SummaryFact label="🔢 Door Code" value={trip.lodgingDoorCode} mono />}
          {trip.lodgingWifiNetwork && <SummaryFact label="📶 WiFi" value={trip.lodgingWifiNetwork} sub={trip.lodgingWifiPassword ? `pw: ${trip.lodgingWifiPassword}` : undefined} />}
          {trip.courses.length > 0 && <SummaryFact label={`⛳ Golf · ${trip.courses.length} courses`} value={trip.courses.map((c) => c.name).join(" · ")} />}
          {(trip.restaurants.length > 0 || (trip.privateDining && trip.privateDining.length > 0)) && (
            <SummaryFact label="🍽️ Dining" value={[...(trip.privateDining?.map((m) => m.title) || []), ...trip.restaurants.map((r) => r.name)].join(" · ")} />
          )}
          {trip.bars && trip.bars.length > 0 && <SummaryFact label={`🌙 Nightlife · ${trip.bars.length}`} value={trip.bars.map((b) => b.name).join(" · ")} />}
          {trip.transport && <SummaryFact label="🚐 Ride" value={trip.transport.name} sub={trip.transport.phones?.[0]} />}
        </div>
        {jumpTargets.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.5rem", marginTop: "1.75rem" }}>
            <span style={{ width: "100%", textAlign: "center", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.4rem" }}>Jump to detail</span>
            {jumpTargets.map((t) => (
              <button
                key={t.key}
                onClick={() => jumpTo(t.key, t.anchor)}
                style={{ fontFamily: "monospace", fontSize: "0.72rem", letterSpacing: "0.05em", textTransform: "uppercase", padding: "0.5rem 0.85rem", minHeight: "40px", borderRadius: "4px", border: "1px solid rgba(234,88,12,0.4)", background: "transparent", color: "rgba(253,186,116,0.95)", cursor: "pointer", transition: "background 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(234,88,12,0.12)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                {t.label} →
              </button>
            ))}
          </div>
        )}
      </AccordionSection>

      {/* Section 2: Lads on Tour — 3-panel dissolving gallery */}
      {galleryImages.length >= 3 && (
        <AccordionSection title="Lads on Tour" order={6} anchorId="sec-gallery" isOpen={isOpen("gallery")} onToggle={() => toggle("gallery")}>
          <div style={{
            position: "relative",
            height: isMobile ? "auto" : "clamp(320px, 40vw, 500px)",
            display: isMobile ? "flex" : "block",
            flexDirection: "column",
            gap: isMobile ? "0" : undefined,
          }}>
            {panelIndices.map((imgIdx, panel) => {
              const layouts = [
                { width: "52%", top: "0%", left: "0%", rotate: -2, zIndex: 3, aspectRatio: "4/3" },
                { width: "44%", top: "8%", left: "32%", rotate: 1.5, zIndex: 2, aspectRatio: "3/2" },
                { width: "48%", top: "15%", left: "50%", rotate: -1, zIndex: 1, aspectRatio: "4/3" },
              ];
              const mobileLayouts = [
                { width: "92%", rotate: -1, aspectRatio: "16/10", marginLeft: "0%" },
                { width: "85%", rotate: 1.2, aspectRatio: "3/2", marginLeft: "15%", marginTop: "-1.5rem" },
                { width: "88%", rotate: -0.5, aspectRatio: "16/10", marginLeft: "4%", marginTop: "-1rem" },
              ];
              const l = isMobile ? mobileLayouts[panel] : layouts[panel];
              return (
                <div
                  key={panel}
                  style={{
                    position: isMobile ? "relative" : "absolute",
                    width: l.width,
                    ...(isMobile ? {} : { top: (l as typeof layouts[0]).top, left: (l as typeof layouts[0]).left }),
                    ...(isMobile && "marginLeft" in l ? { marginLeft: (l as typeof mobileLayouts[1]).marginLeft, marginTop: (l as typeof mobileLayouts[1]).marginTop } : {}),
                    aspectRatio: l.aspectRatio,
                    borderRadius: "6px",
                    overflow: "hidden",
                    background: "#111",
                    transform: `rotate(${l.rotate}deg)`,
                    zIndex: isMobile ? undefined : (l as typeof layouts[0]).zIndex,
                    boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
                    border: "2px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={imgIdx}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 2 }}
                      style={{ position: "absolute", inset: 0 }}
                    >
                      <Image
                        src={galleryImages[imgIdx]}
                        alt={`Gallery ${imgIdx + 1}`}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes={isMobile ? "90vw" : "50vw"}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </AccordionSection>
      )}

      {/* Section: Courses — full course details with images */}
      {trip.courses.length > 0 && (
        <AccordionSection title="The Courses" order={2} anchorId="sec-courses" isOpen={isOpen("courses")} onToggle={() => toggle("courses")}>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(360px, 1fr))",
            gap: isMobile ? "1.25rem" : "1.75rem",
            maxWidth: "1200px",
            margin: "0 auto",
          }}>
            {trip.courses.map((course, i) => {
              const card = (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "8px",
                    overflow: "hidden",
                    height: "100%",
                    transition: "border-color 0.3s, transform 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(220,38,38,0.5)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {course.image && (
                    <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", background: "#111" }}>
                      <Image
                        src={course.image}
                        alt={course.name}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes={isMobile ? "90vw" : "(max-width: 1200px) 50vw, 400px"}
                      />
                    </div>
                  )}
                  <div style={{ padding: "1.25rem 1.25rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.6rem", flex: 1 }}>
                    <h3 className="neon-stats-text" style={{
                      fontSize: "1.15rem",
                      letterSpacing: "0.04em",
                      lineHeight: 1.25,
                      margin: 0,
                    }}>
                      {course.name}
                    </h3>
                    {course.location && (
                      <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", fontFamily: "monospace" }}>
                        📍 {course.location}
                      </div>
                    )}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.1rem" }}>
                      {typeof course.holes === "number" && (
                        <span style={{
                          fontSize: "0.7rem",
                          padding: "0.25rem 0.55rem",
                          borderRadius: "3px",
                          background: "rgba(34,197,94,0.12)",
                          border: "1px solid rgba(34,197,94,0.35)",
                          color: "rgba(134,239,172,0.95)",
                          fontFamily: "monospace",
                          letterSpacing: "0.05em",
                        }}>
                          {course.holes} HOLES
                        </span>
                      )}
                      {course.designer && (
                        <span style={{
                          fontSize: "0.7rem",
                          padding: "0.25rem 0.55rem",
                          borderRadius: "3px",
                          background: "rgba(234,88,12,0.12)",
                          border: "1px solid rgba(234,88,12,0.35)",
                          color: "rgba(253,186,116,0.95)",
                          fontFamily: "monospace",
                          letterSpacing: "0.05em",
                        }}>
                          {course.designer}
                        </span>
                      )}
                      {course.greenFee && (
                        <span style={{
                          fontSize: "0.7rem",
                          padding: "0.25rem 0.55rem",
                          borderRadius: "3px",
                          background: "rgba(234,179,8,0.12)",
                          border: "1px solid rgba(234,179,8,0.35)",
                          color: "rgba(253,224,71,0.95)",
                          fontFamily: "monospace",
                          letterSpacing: "0.05em",
                        }}>
                          {course.greenFee}
                        </span>
                      )}
                    </div>
                    {course.description && (
                      <p style={{
                        fontSize: "0.88rem",
                        lineHeight: 1.55,
                        color: "rgba(255,255,255,0.72)",
                        margin: "0.25rem 0 0",
                      }}>
                        {course.description}
                      </p>
                    )}
                    {(course.amenities || course.notes) && (
                      <div style={{
                        fontSize: "0.78rem",
                        color: "rgba(255,255,255,0.55)",
                        marginTop: "0.15rem",
                        lineHeight: 1.5,
                      }}>
                        {course.amenities && <div>✨ {course.amenities}</div>}
                        {course.notes && <div>📝 {course.notes}</div>}
                      </div>
                    )}
                    {course.phone && (
                      <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", fontFamily: "monospace" }}>
                        📞 {course.phone}
                      </div>
                    )}
                  </div>
                </div>
              );
              return course.url ? (
                <a
                  key={i}
                  href={course.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "inherit", display: "block" }}
                >
                  {card}
                </a>
              ) : (
                <div key={i}>{card}</div>
              );
            })}
          </div>
        </AccordionSection>
      )}

      {/* Section 3: Devils in the Details — Itinerary with inline images */}
      {trip.schedule.length > 0 && (
        <AccordionSection title="Devils&apos; Details" order={3} anchorId="sec-schedule" isOpen={isOpen("schedule")} onToggle={() => toggle("schedule")}>

          {/* Day sections */}
          {trip.schedule.map((day, i) => (
            <div key={i} id={`day-${i}`} style={{ marginBottom: "2.5rem", scrollMarginTop: "80px" }}>
              <h3 className="neon-stats-text" style={{
                fontSize: "1.1rem",
                letterSpacing: "0.06em",
                marginBottom: day.subtitle ? "0.25rem" : "0.5rem",
              }}>
                {day.day} — {day.date}
              </h3>
              {day.subtitle && (
                <div style={{
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.5)",
                  fontStyle: "italic",
                  marginBottom: "0.75rem",
                }}>
                  {day.subtitle}
                </div>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {day.items.map((item, j) => {
                  const resolvedImage = item.image || imageMap[item.activity] || null;
                  const activity = item.activity.toLowerCase();
                  const detail = item.detail?.toLowerCase() || "";
                  const isTravel = activity.includes("arrive") || activity.includes("depart") || detail.includes("fly");
                  const isFishing = activity.includes("fish") || detail.includes("fish");
                  const isATV = activity.includes("atv");
                  const emoji = item.type === "golf" ? "⛳"
                    : item.type === "dining" ? "🍽️"
                    : item.type === "nightlife" ? "🌙"
                    : isTravel ? "✈️"
                    : isFishing ? "🎣"
                    : isATV ? "🏎️"
                    : "🏌️";
                  const displayDetail = item.detail?.replace(/✈️\s*/g, "").trim() || null;
                  const hasRichDetail = !!(item.description || item.cost || item.architect || item.driveTime || item.location || (item.facts && item.facts.length));
                  return (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0.85, scale: 1 }}
                      whileInView={{ opacity: 1, scale: 1.02 }}
                      viewport={{ once: false, margin: "-30% 0px -30% 0px" }}
                      transition={{ duration: 0.3 }}
                      style={{
                        display: "flex",
                        flexDirection: isMobile && resolvedImage ? "column" : "row",
                        alignItems: isMobile ? "stretch" : "flex-start",
                        gap: isMobile ? "0.5rem" : "1rem",
                        padding: isMobile ? "0.75rem 0.85rem" : "0.9rem 1.1rem",
                        background: "rgba(255,255,255,0.03)",
                        borderRadius: "6px",
                        borderLeft: `3px solid ${item.type === "golf" ? "rgba(34,197,94,0.6)" : item.type === "dining" ? "rgba(234,179,8,0.6)" : item.type === "nightlife" ? "rgba(168,85,247,0.6)" : "rgba(59,130,246,0.6)"}`,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", flex: 1, minWidth: 0 }}>
                        <span style={{ fontSize: "1.2rem", flexShrink: 0, lineHeight: 1.4 }}>
                          {emoji}
                        </span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div>
                            <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.45)", fontFamily: "monospace", marginRight: "0.75rem" }}>
                              {item.time}
                              {item.arriveTime && (
                                <span style={{ color: "rgba(255,255,255,0.3)" }}> · {item.arriveTime}</span>
                              )}
                            </span>
                            <span style={{ fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>
                              {item.activity}
                            </span>
                            {displayDetail && (
                              <span style={{ color: "rgba(255,255,255,0.45)", marginLeft: "0.5rem", fontSize: "0.85rem" }}>
                                — {displayDetail}
                              </span>
                            )}
                          </div>
                          {(item.location || item.architect) && (
                            <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.45)", marginTop: "0.25rem", letterSpacing: "0.02em" }}>
                              {item.location && <span>📍 {item.location}</span>}
                              {item.location && item.architect && <span style={{ margin: "0 0.5rem", opacity: 0.4 }}>·</span>}
                              {item.architect && <span>✏️ {item.architect}</span>}
                            </div>
                          )}
                          {item.description && (
                            <div style={{
                              fontSize: "0.85rem",
                              color: "rgba(255,255,255,0.65)",
                              marginTop: "0.4rem",
                              fontStyle: "italic",
                              lineHeight: 1.5,
                            }}>
                              {item.description}
                            </div>
                          )}
                          {item.facts && item.facts.length > 0 && (
                            <ul style={{
                              margin: "0.4rem 0 0",
                              padding: 0,
                              listStyle: "none",
                              display: "flex",
                              flexWrap: "wrap",
                              gap: "0.35rem",
                            }}>
                              {item.facts.map((f, fi) => (
                                <li key={fi} style={{
                                  fontSize: "0.7rem",
                                  color: "rgba(255,255,255,0.6)",
                                  background: "rgba(255,255,255,0.05)",
                                  padding: "0.2rem 0.5rem",
                                  borderRadius: "3px",
                                  border: "1px solid rgba(255,255,255,0.08)",
                                }}>
                                  {f}
                                </li>
                              ))}
                            </ul>
                          )}
                          {(item.cost || item.driveTime) && (
                            <div style={{
                              fontSize: "0.72rem",
                              color: "rgba(255,255,255,0.5)",
                              marginTop: "0.4rem",
                              fontFamily: "monospace",
                            }}>
                              {item.driveTime && <span>🚗 {item.driveTime}</span>}
                              {item.driveTime && item.cost && <span style={{ margin: "0 0.5rem", opacity: 0.4 }}>·</span>}
                              {item.cost && <span>💵 {item.cost}</span>}
                            </div>
                          )}
                          {!hasRichDetail && null}
                        </div>
                      </div>
                      {resolvedImage && (
                        <div style={{
                          position: "relative",
                          width: isMobile ? "100%" : "140px",
                          aspectRatio: "3/2",
                          borderRadius: "4px",
                          overflow: "hidden",
                          flexShrink: 0,
                        }}>
                          <Image
                            src={resolvedImage}
                            alt={item.activity}
                            fill
                            style={{ objectFit: "cover" }}
                            sizes={isMobile ? "90vw" : "140px"}
                          />
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
              {(day.dayTotal || day.perPerson) && (
                <div style={{
                  marginTop: "0.75rem",
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.55)",
                  fontFamily: "monospace",
                  textAlign: "right",
                  letterSpacing: "0.04em",
                }}>
                  {day.dayTotal && <span>Day Total: {day.dayTotal}</span>}
                  {day.dayTotal && day.perPerson && <span style={{ margin: "0 0.75rem", opacity: 0.4 }}>|</span>}
                  {day.perPerson && <span>Per Person: {day.perPerson}</span>}
                </div>
              )}
            </div>
          ))}
        </AccordionSection>
      )}

      {/* Section 3.5: The Chef's Table — private dining menus */}
      {trip.privateDining && trip.privateDining.length > 0 && (
        <AccordionSection title="The Chef&apos;s Table" order={4} anchorId="sec-chef" isOpen={isOpen("chef")} onToggle={() => toggle("chef")}>
          <p style={{ textAlign: "center", color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", maxWidth: "640px", margin: "-1rem auto 2.5rem", lineHeight: 1.6 }}>
            Two nights, Chef Natalie cooks family-style at the lodge — once over steak, once over the catch we haul off Lake Michigan.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1.5rem", maxWidth: "1000px", margin: "0 auto", alignItems: "start" }}>
            {trip.privateDining.map((menu) => (
              <div
                key={menu.title}
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  background: "rgba(255,255,255,0.02)",
                  padding: "1.75rem clamp(1.25rem, 3vw, 2rem)",
                }}
              >
                <div style={{ textAlign: "center", borderBottom: "1px solid rgba(234,88,12,0.3)", paddingBottom: "1rem", marginBottom: "1.25rem" }}>
                  <div style={{ fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#EA580C", fontWeight: 700 }}>{menu.date}</div>
                  <h3 style={{ fontFamily: "var(--font-slab-cold), serif", fontSize: "clamp(1.4rem, 3vw, 1.9rem)", lineHeight: 1.3, color: "#fff", margin: "0.35rem 0 0", textTransform: "uppercase" }}>{menu.title}</h3>
                  {menu.caterer && (
                    <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", marginTop: "0.4rem" }}>
                      {menu.catererUrl ? (
                        <a href={menu.catererUrl} target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "underline", textUnderlineOffset: "2px" }}>{menu.caterer}</a>
                      ) : menu.caterer}
                    </div>
                  )}
                </div>

                {menu.courses.map((course) => (
                  <div key={course.heading} style={{ marginBottom: "1.25rem" }}>
                    <div style={{ fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", fontWeight: 700, textAlign: "center", marginBottom: "0.75rem" }}>{course.heading}</div>
                    {course.items.map((item) => (
                      <div key={item.name} style={{ marginBottom: "0.7rem" }}>
                        <div style={{ color: "#fff", fontWeight: 600, fontSize: "0.95rem" }}>{item.name}</div>
                        {item.detail && <div style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.83rem", lineHeight: 1.55, marginTop: "0.15rem" }}>{item.detail}</div>}
                      </div>
                    ))}
                  </div>
                ))}

                {(menu.pricePerPerson || menu.total) && (
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1rem", marginTop: "0.5rem", fontSize: "0.82rem", color: "rgba(255,255,255,0.6)" }}>
                    {menu.pricePerPerson && <div style={{ display: "flex", justifyContent: "space-between", padding: "0.15rem 0" }}><span>Per person</span><span style={{ color: "#fff" }}>{menu.pricePerPerson}</span></div>}
                    {menu.serviceFee && <div style={{ display: "flex", justifyContent: "space-between", padding: "0.15rem 0" }}><span>Delivery, set-up + service</span><span style={{ color: "#fff" }}>{menu.serviceFee}</span></div>}
                    {menu.gratuity && <div style={{ display: "flex", justifyContent: "space-between", padding: "0.15rem 0" }}><span>Gratuity</span><span style={{ color: "#fff" }}>{menu.gratuity}</span></div>}
                    {menu.total && <div style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0 0", marginTop: "0.3rem", borderTop: "1px solid rgba(255,255,255,0.08)", color: "#EA580C", fontWeight: 700 }}><span>Total</span><span>{menu.total}</span></div>}
                    {menu.terms && <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", marginTop: "0.6rem", textAlign: "center" }}>{menu.terms}</div>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </AccordionSection>
      )}

      {/* Section 3.6: Last Call — nightlife / bars */}
      {trip.bars && trip.bars.length > 0 && (
        <AccordionSection title="Last Call" order={5} anchorId="sec-bars" isOpen={isOpen("bars")} onToggle={() => toggle("bars")}>
          <p style={{ textAlign: "center", color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", maxWidth: "640px", margin: "-1rem auto 2.5rem", lineHeight: 1.6 }}>
            The Sheboygan + Kohler after-hours lineup — scouted by a local, ranked from the civilized cocktail to the dive that closes the place down.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1rem", maxWidth: "1000px", margin: "0 auto" }}>
            {trip.bars.map((bar) => {
              const card = (
                <>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "0.75rem", flexWrap: "wrap" }}>
                    <h3 style={{ fontFamily: "var(--font-slab-cold), serif", fontSize: "clamp(1.25rem, 3vw, 1.6rem)", lineHeight: 1.3, color: "#fff", margin: 0, textTransform: "uppercase" }}>
                      {bar.name}
                    </h3>
                    {bar.location && <span style={{ fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", fontWeight: 700 }}>📍 {bar.location}</span>}
                  </div>
                  {bar.vibe && <div style={{ fontSize: "0.74rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "#EA580C", fontWeight: 700, marginTop: "0.4rem" }}>{bar.vibe}</div>}
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", lineHeight: 1.6, marginTop: "0.6rem", marginBottom: 0 }}>{bar.description}</p>
                  {bar.url && (
                    <div style={{ marginTop: "0.85rem", fontSize: "0.78rem", color: "#EA580C", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>
                      View on Google Maps ↗
                    </div>
                  )}
                </>
              );
              const baseStyle: React.CSSProperties = {
                display: "block",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "10px",
                background: "rgba(255,255,255,0.02)",
                padding: "1.5rem clamp(1.25rem, 3vw, 1.75rem)",
                textDecoration: "none",
              };
              return bar.url ? (
                <a
                  key={bar.name}
                  href={bar.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={baseStyle}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(234,88,12,0.5)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
                >
                  {card}
                </a>
              ) : (
                <div key={bar.name} style={baseStyle}>{card}</div>
              );
            })}
          </div>
        </AccordionSection>
      )}

      {/* Section 4: Lodging — single front-of-house image */}
      {lodgingImage && (
        <AccordionSection title="Command Center" order={1} anchorId="sec-command" isOpen={isOpen("command")} onToggle={() => toggle("command")}>

          {trip.lodgingBookingUrl ? (
            <a href={trip.lodgingBookingUrl} target="_blank" rel="noopener noreferrer" style={{ display: "block", maxWidth: "800px", margin: "0 auto" }}>
              <div style={{
                position: "relative",
                aspectRatio: "16/9",
                borderRadius: "8px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.08)",
                transition: "border-color 0.3s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
              >
                <Image
                  src={lodgingImage}
                  alt="Trip lodging"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 90vw, 800px"
                />
                <div style={{
                  position: "absolute",
                  bottom: "1rem",
                  right: "1rem",
                  background: "rgba(0,0,0,0.7)",
                  borderRadius: "4px",
                  padding: "0.4rem 0.75rem",
                  fontSize: "0.75rem",
                  color: "#EA580C",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                }}>
                  🏠 View on Airbnb
                </div>
              </div>
            </a>
          ) : (
            <div style={{
              position: "relative",
              aspectRatio: "16/9",
              borderRadius: "8px",
              overflow: "hidden",
              maxWidth: "800px",
              margin: "0 auto",
              border: "1px solid rgba(255,255,255,0.08)",
            }}>
              <Image
                src={lodgingImage}
                alt="Trip lodging"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 90vw, 800px"
              />
            </div>
          )}

          {trip.lodgingGuestPortalUrl && (
            <div style={{ maxWidth: "800px", margin: "2.5rem auto 0" }}>
              {(trip.lodgingName || trip.lodgingStayDates) && (
                <p style={{ textAlign: "center", color: "rgba(255,255,255,0.7)", fontSize: "0.95rem", marginBottom: "1.75rem", lineHeight: 1.6 }}>
                  Thrilled to welcome you to{" "}
                  {trip.lodgingName && <strong style={{ color: "#fff" }}>{trip.lodgingName}</strong>}
                  {trip.lodgingStayDates && <> for your stay <strong style={{ color: "#fff" }}>{trip.lodgingStayDates}</strong></>}.
                  {" "}Everything you need for a smooth arrival is right here.
                </p>
              )}

              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "0.85rem" }}>
                {/* Guest Portal */}
                <a
                  href={trip.lodgingGuestPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block", padding: "1.1rem 1.25rem", borderRadius: "8px",
                    border: "1px solid rgba(234,88,12,0.4)", background: "rgba(234,88,12,0.06)",
                    textDecoration: "none", transition: "border-color 0.3s, background 0.3s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(234,88,12,0.8)"; e.currentTarget.style.background = "rgba(234,88,12,0.12)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(234,88,12,0.4)"; e.currentTarget.style.background = "rgba(234,88,12,0.06)"; }}
                >
                  <div style={{ fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#EA580C", fontWeight: 700, marginBottom: "0.35rem" }}>🔗 Guest Portal</div>
                  <div style={{ color: "#fff", fontSize: "0.95rem", fontWeight: 600 }}>Reservation details + exact address →</div>
                  <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.78rem", marginTop: "0.3rem" }}>Open before you leave for the airport</div>
                </a>

                {/* Digital Guidebook */}
                {trip.lodgingGuidebookUrl && (
                  <a
                    href={trip.lodgingGuidebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "block", padding: "1.1rem 1.25rem", borderRadius: "8px",
                      border: "1px solid rgba(234,88,12,0.4)", background: "rgba(234,88,12,0.06)",
                      textDecoration: "none", transition: "border-color 0.3s, background 0.3s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(234,88,12,0.8)"; e.currentTarget.style.background = "rgba(234,88,12,0.12)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(234,88,12,0.4)"; e.currentTarget.style.background = "rgba(234,88,12,0.06)"; }}
                  >
                    <div style={{ fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#EA580C", fontWeight: 700, marginBottom: "0.35rem" }}>📘 Digital Guidebook</div>
                    <div style={{ color: "#fff", fontSize: "0.95rem", fontWeight: 600 }}>Required reading — share with your group →</div>
                    <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.78rem", marginTop: "0.3rem" }}>How-to videos, house rules, local recs, safety</div>
                  </a>
                )}

                {/* Door Code */}
                {trip.lodgingDoorCode && (
                  <div style={{ padding: "1.1rem 1.25rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)" }}>
                    <div style={{ fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", fontWeight: 700, marginBottom: "0.35rem" }}>🔢 Door Code</div>
                    <div style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 700, fontFamily: "var(--font-mono, monospace)", letterSpacing: "0.15em" }}>{trip.lodgingDoorCode}</div>
                  </div>
                )}

                {/* WiFi */}
                {trip.lodgingWifiNetwork && (
                  <div style={{ padding: "1.1rem 1.25rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)" }}>
                    <div style={{ fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", fontWeight: 700, marginBottom: "0.35rem" }}>📶 WiFi</div>
                    <div style={{ color: "#fff", fontSize: "0.95rem" }}>
                      <span style={{ color: "rgba(255,255,255,0.5)" }}>Network</span> {trip.lodgingWifiNetwork}
                    </div>
                    {trip.lodgingWifiPassword && (
                      <div style={{ color: "#fff", fontSize: "0.95rem", marginTop: "0.2rem" }}>
                        <span style={{ color: "rgba(255,255,255,0.5)" }}>Password</span> {trip.lodgingWifiPassword}
                      </div>
                    )}
                  </div>
                )}

                {/* Transportation */}
                {trip.transport && (
                  <div style={{ gridColumn: isMobile ? "auto" : "1 / -1", padding: "1.1rem 1.25rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)" }}>
                    <div style={{ fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", fontWeight: 700, marginBottom: "0.5rem" }}>🚐 Transportation</div>
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "0.4rem 0.85rem", marginBottom: "0.7rem" }}>
                      <span style={{ color: "#fff", fontSize: "1.05rem", fontWeight: 700 }}>{trip.transport.name}</span>
                      {trip.transport.vehicle && <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.85rem" }}>{trip.transport.vehicle}</span>}
                      {trip.transport.contact && <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.85rem" }}>· ask for {trip.transport.contact}</span>}
                    </div>
                    {trip.transport.phones && trip.transport.phones.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.55rem" }}>
                        {trip.transport.phones.map((p) => (
                          <a
                            key={p}
                            href={`tel:+1${p.replace(/[^0-9]/g, "")}`}
                            style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", color: "#EA580C", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none", border: "1px solid rgba(234,88,12,0.4)", borderRadius: "6px", padding: "0.4rem 0.7rem", transition: "background 0.3s" }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(234,88,12,0.12)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                          >
                            📞 {p}
                          </a>
                        ))}
                      </div>
                    )}
                    {trip.transport.address && <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.78rem", marginTop: "0.65rem" }}>{trip.transport.address}</div>}
                  </div>
                )}
              </div>

              <p style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: "0.78rem", marginTop: "1.25rem" }}>
                We&apos;ll also text the guidebook link before check-in for easy access.
              </p>
            </div>
          )}
        </AccordionSection>
      )}

      </div>
    </main>
  );
}
