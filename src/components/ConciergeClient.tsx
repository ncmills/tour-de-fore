"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const services = [
  { icon: "⛳", title: "Tee Time Bookings", desc: "Every round reserved, confirmed, and managed. Staggered times for your group size." },
  { icon: "🏠", title: "Lodging Reservation", desc: "We find and book the perfect house — pool, hot tub, bedrooms sorted by group dynamics." },
  { icon: "🍽️", title: "Restaurant Reservations", desc: "Every dinner, every lunch. Private rooms for large groups. Dietary needs handled." },
  { icon: "🎯", title: "Activity Bookings", desc: "ATVs, fishing charters, casinos, breweries — all coordinated with your schedule." },
  { icon: "🚌", title: "Transport Coordination", desc: "Party bus, shuttles, rental car fleet — nobody drives after beers on the course." },
  { icon: "👕", title: "Custom Branded Gear", desc: "Hats, polos, koozies, bag tags — all designed with your trip logo and crew names." },
  { icon: "🌐", title: "Custom Trip Website", desc: "A branded microsite for your crew with schedule, photos, scores, and trip info." },
  { icon: "📱", title: "Custom Mobile App", desc: "Your own trip app with live schedule, push notifications, photo sharing, and leaderboard." },
  { icon: "📞", title: "24/7 Trip Support", desc: "Dedicated trip coordinator on call for anything that comes up — rain plans, tee time changes, restaurant switches." },
];

export default function ConciergeClient() {
  const params = useSearchParams();
  const planId = params.get("planId") || "";
  const tier = params.get("tier") || "";

  return (
    <main style={{ minHeight: "100vh", background: "#000", color: "#fff" }}>
      {/* Back link */}
      <div style={{ position: "fixed", top: "1.2rem", left: "clamp(1.5rem, 6vw, 6rem)", zIndex: 500 }}>
        <Link
          href={planId ? `/plan/result/${planId}?tier=${tier}` : "/?skip=1"}
          style={{ fontFamily: "var(--font-script), cursive", fontSize: "1.1rem", color: "rgba(255,255,255,0.35)", textDecoration: "none" }}
        >
          ← back to plan
        </Link>
      </div>

      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ padding: "clamp(5rem, 12vw, 8rem) clamp(1.5rem, 6vw, 6rem) 4rem", textAlign: "center" }}
      >
        <p style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(220,38,38,0.7)", marginBottom: "1rem" }}>
          Concierge Service
        </p>
        <h1 style={{
          fontFamily: "var(--font-script), cursive",
          fontSize: "clamp(2.5rem, 8vw, 5rem)",
          color: "#fff",
          lineHeight: 1.1,
          marginBottom: "1.5rem",
        }}>
          Let the Devils Handle It
        </h1>
        <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.3rem)", color: "rgba(255,255,255,0.5)", maxWidth: "600px", margin: "0 auto", lineHeight: 1.6 }}>
          We book everything, manage everything, and design custom gear, a website, and a mobile app for your trip. You just show up and play.
        </p>
      </motion.section>

      {/* Services Grid */}
      <section style={{ padding: "0 clamp(1.5rem, 6vw, 6rem) 5rem" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1.5rem",
          maxWidth: "1100px",
          margin: "0 auto",
        }}>
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "10px",
                padding: "1.75rem",
                transition: "border-color 0.3s, transform 0.3s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(220,38,38,0.3)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{service.icon}</div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>{service.title}</h3>
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ padding: "5rem clamp(1.5rem, 6vw, 6rem)", textAlign: "center" }}
      >
        <div style={{
          maxWidth: "600px",
          margin: "0 auto",
          background: "rgba(220,38,38,0.06)",
          border: "2px solid rgba(220,38,38,0.3)",
          borderRadius: "16px",
          padding: "3rem 2rem",
        }}>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "1rem" }}>
            All-Inclusive Pricing
          </p>
          <div style={{ fontSize: "clamp(3rem, 8vw, 5rem)", fontWeight: 800, color: "#fff", marginBottom: "0.5rem" }}>
            20%
          </div>
          <p style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.6)", marginBottom: "2rem" }}>
            of total trip cost
          </p>
          <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.6, marginBottom: "2.5rem" }}>
            That covers every booking, every reservation, custom branded gear for the whole crew, a dedicated trip website, a custom mobile app, and 24/7 support from your trip coordinator.
          </p>

          {/* Stripe checkout button */}
          <form action="/api/concierge-checkout" method="POST">
            <input type="hidden" name="planId" value={planId} />
            <input type="hidden" name="tier" value={tier} />
            <button
              type="submit"
              style={{
                fontFamily: "var(--font-space), sans-serif",
                fontSize: "1rem",
                fontWeight: 700,
                letterSpacing: "0.05em",
                color: "#fff",
                background: "rgba(220,38,38,0.9)",
                border: "none",
                borderRadius: "8px",
                padding: "1rem 2.5rem",
                cursor: "pointer",
                transition: "background 0.2s, transform 0.2s",
                width: "100%",
                maxWidth: "350px",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(220,38,38,1)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(220,38,38,0.9)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Book Concierge Service →
            </button>
          </form>

          <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.25)", marginTop: "1rem" }}>
            Secure payment via Stripe. We&apos;ll reach out within 24 hours to begin planning.
          </p>
        </div>
      </motion.section>
    </main>
  );
}
