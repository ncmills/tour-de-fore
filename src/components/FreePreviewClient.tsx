"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import type { FreePreview, PriceLevel } from "@/lib/plan-types";
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

function LockedSection({ label, count, icon }: { label: string; count: number; icon: string }) {
  return (
    <div style={{
      position: "relative",
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: 12,
      padding: "2rem 1.5rem",
      overflow: "hidden",
    }}>
      {/* Blur overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        backdropFilter: "blur(4px)",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2,
        borderRadius: 12,
      }}>
        <span style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🏆</span>
        <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "rgba(255,255,255,0.7)", letterSpacing: "0.1em" }}>
          {count} {label}
        </span>
        <span style={{ fontSize: "0.65rem", color: "rgba(234,88,12,0.8)", marginTop: "0.25rem" }}>
          UNLOCK FULL PLAN
        </span>
      </div>
      {/* Placeholder content behind blur */}
      <div style={{ opacity: 0.15 }}>
        <p style={{ fontSize: "0.9rem", color: "#fff" }}>{icon} {label}</p>
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
          {Array.from({ length: Math.min(count, 3) }).map((_, i) => (
            <div key={i} style={{ height: 12, width: `${60 + i * 20}px`, background: "rgba(255,255,255,0.3)", borderRadius: 4 }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FreePreviewClient({
  planId,
  dest,
  preview,
}: {
  planId: string;
  dest: PriceLevel;
  preview: FreePreview;
}) {
  const [unlocking, setUnlocking] = useState(false);

  const handleUnlock = async () => {
    setUnlocking(true);
    try {
      const res = await fetch("/api/unlock-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, dest }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setUnlocking(false);
      }
    } catch {
      setUnlocking(false);
    }
  };

  return (
    <main style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "clamp(2rem, 6vw, 4rem) clamp(1rem, 4vw, 3rem)" }}>
      <MulliganButton href={`/plan/result/${planId}`} />
      <HomeButton />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "clamp(2rem, 5vw, 3rem)", maxWidth: 700, margin: "0 auto 3rem" }}>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "0.75rem" }}
        >
          Free Preview
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            fontFamily: "var(--font-plan-groovy), cursive",
            fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
            marginBottom: "0.5rem",
          }}
        >
          {preview.city}, {preview.state}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ fontSize: "1rem", color: "rgba(255,255,255,0.5)", maxWidth: 500, margin: "0 auto" }}
        >
          {preview.tagline}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ marginTop: "1rem", fontSize: "0.85rem", color: "rgba(255,255,255,0.35)" }}
        >
          {preview.groupSize} people · {preview.numberOfDays} days · Est. {preview.estimatedBudgetPerPerson}/person
        </motion.div>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        {/* ── VISIBLE: Lodging Preview ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ marginBottom: "1.5rem" }}
        >
          <h2 style={{ fontFamily: "var(--font-plan-script), cursive", fontSize: "1.8rem", marginBottom: "1rem" }}>
            The Lodging
          </h2>
          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 12,
            padding: "1.5rem",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "0.75rem" }}>
              <div>
                <span style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
                  {preview.lodgingPreview.type}
                </span>
                {preview.lodgingPreview.avgRating && (
                  <span style={{ marginLeft: "0.75rem", fontSize: "0.8rem", color: "rgba(234,88,12,0.9)" }}>
                    ⭐ {preview.lodgingPreview.avgRating}
                  </span>
                )}
              </div>
              <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>
                ${preview.lodgingPreview.nightlyRange[0]}–${preview.lodgingPreview.nightlyRange[1]}/night
              </span>
            </div>
            <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", marginBottom: "0.5rem" }}>
              Sleeps {preview.lodgingPreview.sleeps[0]}–{preview.lodgingPreview.sleeps[1]} · {preview.lodgingPreview.areaDescription}
            </p>
            {preview.lodgingPreview.bedsBreakdown && (
              <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.35)" }}>
                🛏️ {preview.lodgingPreview.bedsBreakdown}
              </p>
            )}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.75rem" }}>
              {preview.lodgingPreview.amenities.map((a) => (
                <span key={a} style={{ fontSize: "0.7rem", padding: "3px 8px", background: "rgba(255,255,255,0.06)", borderRadius: 4, color: "rgba(255,255,255,0.4)" }}>
                  {a}
                </span>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── VISIBLE: Course Preview (3 courses) ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ marginBottom: "1.5rem" }}
        >
          <h2 style={{ fontFamily: "var(--font-plan-script), cursive", fontSize: "1.8rem", marginBottom: "1rem" }}>
            The Courses
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {preview.coursePreview.map((course, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
                overflow: "hidden",
                position: "relative",
              }}>
                {/* Course image */}
                <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", overflow: "hidden" }}>
                  <Image
                    src={course.imageUrl || getFallbackImage(course.name)}
                    alt={course.name}
                    fill
                    sizes="(max-width: 800px) 100vw, 800px"
                    style={{ objectFit: "cover" }}
                    unoptimized
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)" }} />
                  {course.hypeTag && (
                    <span style={{
                      position: "absolute",
                      top: "0.75rem",
                      right: "0.75rem",
                      fontSize: "0.55rem",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      padding: "3px 8px",
                      background: "rgba(234,88,12,0.3)",
                      border: "1px solid rgba(234,88,12,0.5)",
                      borderRadius: 4,
                      color: "rgba(234,88,12,0.95)",
                      backdropFilter: "blur(4px)",
                    }}>
                      🏆 {course.hypeTag}
                    </span>
                  )}
                </div>
                <div style={{ padding: "1.25rem 1.5rem" }}>
                  <div style={{ fontSize: "1rem", fontWeight: 600, color: "#fff", marginBottom: "0.25rem" }}>
                    {course.name}
                  </div>
                  <div style={{ display: "flex", gap: "1rem", fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", marginBottom: "0.5rem" }}>
                    <span>{course.tier}</span>
                    <span>${course.greenFeeRange[0]}–${course.greenFeeRange[1]}</span>
                    {course.googleRating && <span>⭐ {course.googleRating}</span>}
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>
                    {course.highlight}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── TEASERS (visible hooks) ── */}
        {(preview.activityTeaser || preview.barTeaser || preview.partyBusAvailable || preview.privateChefAvailable) && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            style={{ marginBottom: "2rem" }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(200px, 100%), 1fr))", gap: "0.75rem" }}>
              {preview.activityTeaser && (
                <div style={{ padding: "0.75rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8 }}>
                  <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.3rem" }}>Top Arrival Activity</div>
                  <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)" }}>🎯 {preview.activityTeaser.name}</div>
                  <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)" }}>{preview.activityTeaser.priceRange}/person</div>
                </div>
              )}
              {preview.barTeaser && (
                <div style={{ padding: "0.75rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8 }}>
                  <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.3rem" }}>Featured Bar</div>
                  <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)" }}>🌙 {preview.barTeaser.name}</div>
                  <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)" }}>{preview.barTeaser.vibe}</div>
                </div>
              )}
              {preview.partyBusAvailable && (
                <div style={{ padding: "0.75rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8 }}>
                  <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.3rem" }}>Party Bus</div>
                  <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)" }}>🚌 Available</div>
                  <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)" }}>${preview.partyBusAvailable.hourlyRange[0]}-${preview.partyBusAvailable.hourlyRange[1]}/hr</div>
                </div>
              )}
              {preview.privateChefAvailable && (
                <div style={{ padding: "0.75rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8 }}>
                  <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.3rem" }}>Private Chef</div>
                  <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)" }}>👨‍🍳 Available</div>
                  <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)" }}>${preview.privateChefAvailable.pricePerPersonRange[0]}-${preview.privateChefAvailable.pricePerPersonRange[1]}/person</div>
                </div>
              )}
            </div>
          </motion.section>
        )}

        {/* ── LOCKED SECTIONS ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ marginBottom: "2.5rem" }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))", gap: "1rem" }}>
            {preview.lockedCounts.moreHouses > 0 && (
              <LockedSection label="More Houses" count={preview.lockedCounts.moreHouses} icon="🏠" />
            )}
            <LockedSection label="Restaurants" count={preview.lockedCounts.restaurants} icon="🍽️" />
            <LockedSection label="Bars & Nightlife" count={preview.lockedCounts.bars} icon="🌙" />
            <LockedSection label="Activities" count={preview.lockedCounts.activities} icon="🎯" />
            {preview.lockedCounts.partyBusOptions > 0 && (
              <LockedSection label="Party Bus Options" count={preview.lockedCounts.partyBusOptions} icon="🚌" />
            )}
            {preview.lockedCounts.privateChefOptions > 0 && (
              <LockedSection label="Private Chef" count={preview.lockedCounts.privateChefOptions} icon="👨‍🍳" />
            )}
            <LockedSection label="Day-by-Day Schedule" count={1} icon="📅" />
            <LockedSection label="Devil's Playbook" count={1} icon="😈" />
          </div>
        </motion.section>

        {/* ── UNLOCK CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            textAlign: "center",
            background: "rgba(220,38,38,0.06)",
            border: "2px solid rgba(220,38,38,0.3)",
            borderRadius: 16,
            padding: "3rem 2rem",
            marginBottom: "4rem",
          }}
        >
          <h3 style={{
            fontFamily: "var(--font-plan-groovy), cursive",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            marginBottom: "1rem",
          }}>
            Unlock the Full Plan
          </h3>
          <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.5)", marginBottom: "0.75rem", maxWidth: 450, margin: "0 auto 0.75rem" }}>
            Get every lodging option, all courses with ratings and booking links, restaurants, bars, party bus contacts, a day-by-day schedule, and TDF pro tips.
          </p>
          <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.3)", marginBottom: "2rem" }}>
            One-time payment. Your plan is saved forever.
          </p>
          <button
            onClick={handleUnlock}
            disabled={unlocking}
            style={{
              padding: "1rem 3rem",
              background: "rgba(220,38,38,0.9)",
              border: "none",
              borderRadius: 8,
              color: "#fff",
              fontSize: "1.1rem",
              fontWeight: 700,
              letterSpacing: "0.05em",
              cursor: unlocking ? "wait" : "pointer",
              opacity: unlocking ? 0.6 : 1,
              transition: "all 0.2s",
              fontFamily: "var(--font-plan-script), cursive",
            }}
          >
            {unlocking ? "Redirecting to checkout..." : "Unlock Full Plan — $99"}
          </button>
        </motion.div>
      </div>
    </main>
  );
}
