import HomeButton from "@/components/HomeButton";
import MulliganButton from "@/components/MulliganButton";
import Link from "next/link";

export const metadata = {
  title: "About | Tour de Fore",
  description:
    "Tour de Fore is a golf trip planning platform built by a group of golfers who've planned annual trips together for years.",
  alternates: { canonical: "https://tourdefore.com/about" },
};

const ACCENT = "#EA580C";
const MUTED = "rgba(255,255,255,0.6)";
const DIVIDER = "rgba(255,255,255,0.08)";

export default function AboutPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        padding: "clamp(2rem, 6vw, 4rem) clamp(1rem, 4vw, 3rem)",
      }}
    >
      <MulliganButton />
      <HomeButton />

      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <h1
          style={{
            fontFamily: "var(--font-plan-groovy), cursive",
            fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
            color: "#fff",
            marginBottom: "1rem",
            lineHeight: 1.1,
          }}
        >
          About Tour de Fore
        </h1>

        <p
          style={{
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            color: MUTED,
            marginBottom: "3.5rem",
            fontFamily: "var(--font-instrument), serif",
            fontStyle: "italic",
            lineHeight: 1.6,
          }}
        >
          We planned ours. Now we&apos;ll plan yours.
        </p>

        <div style={{ width: "3rem", height: "1px", background: ACCENT, marginBottom: "3.5rem" }} />

        {/* The Story */}
        <section style={{ marginBottom: "3.5rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-space), sans-serif",
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: ACCENT,
              marginBottom: "1rem",
            }}
          >
            The Story
          </h2>
          <p style={{ lineHeight: 1.8, color: MUTED, fontSize: "0.95rem", marginBottom: "1rem" }}>
            Tour de Fore started the way most good things do — a group of friends trying to pull off a golf trip. Picking
            a destination that worked for everyone, finding courses that matched the group&apos;s game and budget, sorting
            out logistics without a week of group texts: there was no single tool that handled all of it.
          </p>
          <p style={{ lineHeight: 1.8, color: MUTED, fontSize: "0.95rem" }}>
            So we built one. What started as internal planning infrastructure for our own annual trip has grown into a
            platform used by groups across the country — from first-timers figuring out where to go to the crew
            that&apos;s been doing this for twenty years and just wants better data.
          </p>
        </section>

        <div style={{ width: "100%", height: "1px", background: DIVIDER, marginBottom: "3.5rem" }} />

        {/* The Platform */}
        <section style={{ marginBottom: "3.5rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-space), sans-serif",
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: ACCENT,
              marginBottom: "1rem",
            }}
          >
            What We Built
          </h2>
          <p style={{ lineHeight: 1.8, color: MUTED, fontSize: "0.95rem", marginBottom: "1.5rem" }}>
            Tour de Fore is a golf trip planning engine. Tell it how many are coming, what you want to spend, and how
            your group plays — it produces a real itinerary: courses, lodging, activities, a daily schedule, and a
            shareable plan every attendee can see. No generic listicles. No affiliate-padded recommendations.
          </p>
          <ul style={{ paddingLeft: "1.25rem", color: MUTED, fontSize: "0.95rem", lineHeight: 2.2 }}>
            <li>
              <strong style={{ color: "#fff" }}>The Planner</strong> — AI-powered wizard that outputs a complete,
              shareable trip plan tailored to your group.
            </li>
            <li>
              <strong style={{ color: "#fff" }}>Golf Atlas</strong> — curated index of the courses and destinations
              worth building a pilgrimage around.
            </li>
            <li>
              <strong style={{ color: "#fff" }}>Destination data</strong> — 230+ golf destinations with courses, real
              cost ranges, activities, and lodging ranked and compared.
            </li>
            <li>
              <strong style={{ color: "#fff" }}>Concierge</strong> — for groups that want a human to own the logistics
              end-to-end.
            </li>
          </ul>
        </section>

        <div style={{ width: "100%", height: "1px", background: DIVIDER, marginBottom: "3.5rem" }} />

        {/* The Philosophy */}
        <section style={{ marginBottom: "3.5rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-space), sans-serif",
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: ACCENT,
              marginBottom: "1rem",
            }}
          >
            The Philosophy
          </h2>
          <p style={{ lineHeight: 1.8, color: MUTED, fontSize: "0.95rem", marginBottom: "1rem" }}>
            Golf trips are about the group, not the gear. We don&apos;t optimize for clicks or commissions — we optimize
            for the plan your group actually wants to go on. That means honest course ratings, real cost estimates, and
            recommendations calibrated to how your crew plays, not what ranks highest on a search result.
          </p>
          <p style={{ lineHeight: 1.8, color: MUTED, fontSize: "0.95rem" }}>
            Every feature on this site has been stress-tested on a real trip. If something was painful to plan, we built
            a tool for it.
          </p>
        </section>

        <div style={{ width: "100%", height: "1px", background: DIVIDER, marginBottom: "3.5rem" }} />

        {/* Contact / CTA */}
        <section>
          <h2
            style={{
              fontFamily: "var(--font-space), sans-serif",
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: ACCENT,
              marginBottom: "1rem",
            }}
          >
            Get in Touch
          </h2>
          <p style={{ lineHeight: 1.8, color: MUTED, fontSize: "0.95rem", marginBottom: "2rem" }}>
            Questions, partnership ideas, or a great course we should add to the Atlas? Email{" "}
            <a href="mailto:info@tourdefore.com" style={{ color: ACCENT, textDecoration: "none" }}>
              info@tourdefore.com
            </a>
            .
          </p>
          <Link
            href="/plan"
            style={{
              display: "inline-block",
              background: ACCENT,
              color: "#fff",
              padding: "0.75rem 2rem",
              borderRadius: "0.5rem",
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "0.875rem",
              textDecoration: "none",
            }}
          >
            Plan a Trip
          </Link>
        </section>
      </div>
    </main>
  );
}
