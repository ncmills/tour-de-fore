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
  color: "#fff",
  marginBottom: "2rem",
  textAlign: "center",
  textTransform: "uppercase",
  textShadow: "0 0 7px rgba(255,60,20,0.5), 0 0 20px rgba(255,60,20,0.25), 0 0 40px rgba(255,30,10,0.1)",
};

export default function PastTripDetailClient({ trip, isLive }: { trip: Trip; isLive?: boolean }) {
  const [isMobile, setIsMobile] = useState(false);
  const [activeDay, setActiveDay] = useState(0);

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
          top: 0,
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
                document.getElementById(`day-${i}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
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

      {/* Section 2: Lads on Tour — 3-panel dissolving gallery */}
      {galleryImages.length >= 3 && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ position: "relative", zIndex: 1, padding: "0.6rem clamp(1.5rem, 6vw, 6rem) 3rem" }}
        >
          <h2 style={sectionHeadingStyle}>Lads on Tour</h2>
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
        </motion.section>
      )}

      {/* Section: Courses — full course details with images */}
      {trip.courses.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ position: "relative", zIndex: 1, padding: "3rem clamp(1.5rem, 6vw, 6rem)" }}
        >
          <h2 style={sectionHeadingStyle}>The Courses</h2>
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
        </motion.section>
      )}

      {/* Section 3: Devils in the Details — Itinerary with inline images */}
      {trip.schedule.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ position: "relative", zIndex: 1, padding: "3rem clamp(1.5rem, 6vw, 6rem)" }}
        >
          <h2 style={sectionHeadingStyle}>Devils&apos; Details</h2>

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
        </motion.section>
      )}

      {/* Section 4: Lodging — single front-of-house image */}
      {lodgingImage && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ position: "relative", zIndex: 1, padding: "3rem clamp(1.5rem, 6vw, 6rem)" }}
        >
          <h2 style={sectionHeadingStyle}>Command Center</h2>

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
        </motion.section>
      )}
    </main>
  );
}
