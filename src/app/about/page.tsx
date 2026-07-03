import Link from "next/link";
import HomeButton from "@/components/HomeButton";
import MulliganButton from "@/components/MulliganButton";
import FadeIn from "@/components/FadeIn";

export const metadata = {
  title: "About | Tour de Fore",
  description:
    "Tour de Fore is a golf-trip habit that got out of hand — six years of annual pilgrimages, one crew, and the receipts to prove it. Here's how it started.",
  alternates: { canonical: "https://tourdefore.com/about" },
};

const ACCENT = "#EA580C";
const MUTED = "rgba(255,255,255,0.62)";
const FAINT = "rgba(255,255,255,0.34)";

// Shared prose style for body paragraphs.
const bodyP: React.CSSProperties = {
  fontFamily: "var(--font-body), sans-serif",
  fontSize: "clamp(1rem, 1.6vw, 1.15rem)",
  lineHeight: 1.75,
  color: MUTED,
  marginBottom: "1.4rem",
};

// Small caps section eyebrow.
const eyebrow: React.CSSProperties = {
  fontFamily: "monospace",
  fontSize: "0.72rem",
  letterSpacing: "0.28em",
  textTransform: "uppercase",
  color: ACCENT,
  marginBottom: "1rem",
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: "var(--font-plan-block), sans-serif",
        fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
        textTransform: "uppercase",
        letterSpacing: "0.02em",
        lineHeight: 1.3,
        color: "#fff",
        marginBottom: "1.4rem",
      }}
    >
      {children}
    </h2>
  );
}

export default function AboutPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        padding: "clamp(3rem, 8vw, 6rem) clamp(1rem, 4vw, 3rem)",
      }}
    >
      <MulliganButton />
      <HomeButton />

      <article style={{ maxWidth: 760, margin: "0 auto" }}>
        {/* Hero */}
        <FadeIn>
          <p
            style={{
              fontFamily: "monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.34em",
              textTransform: "uppercase",
              color: FAINT,
              marginBottom: "1.5rem",
            }}
          >
            Est. 2021 · Belmont Mills LLC
          </p>

          <h1
            style={{
              fontFamily: "var(--font-plan-block), sans-serif",
              fontSize: "clamp(3rem, 10vw, 6rem)",
              textTransform: "uppercase",
              letterSpacing: "0.01em",
              lineHeight: 1.25,
              color: "#fff",
              margin: 0,
              textShadow:
                "0 0 7px rgba(255,106,40,0.55), 0 0 22px rgba(255,60,20,0.32), 0 0 44px rgba(255,40,10,0.16)",
            }}
          >
            We planned ours.
          </h1>

          <p
            style={{
              fontFamily: "var(--font-instrument), serif",
              fontStyle: "italic",
              fontSize: "clamp(1.25rem, 3vw, 1.9rem)",
              lineHeight: 1.5,
              color: "rgba(255,255,255,0.82)",
              marginTop: "1.4rem",
              marginBottom: "2.6rem",
            }}
          >
            Tour de Fore started as one group text and a shared spreadsheet. It is
            now six years of annual golf trips, a felony&rsquo;s worth of memories,
            and a pro shop. This is where it lives.
          </p>

          <div style={{ width: "3.5rem", height: "2px", background: ACCENT, marginBottom: "3.5rem" }} />
        </FadeIn>

        {/* The origin */}
        <FadeIn delay={0.05}>
          <section style={{ marginBottom: "3.5rem" }}>
            <p style={eyebrow}>How it started</p>
            <SectionHeading>Six friends. One bad idea. Repeated annually.</SectionHeading>
            <p style={bodyP}>
              In 2021 a handful of us decided a normal weekend wasn&rsquo;t enough
              and booked a golf trip with roughly the planning discipline of a
              fraternity formal. Something about 108 holes in three days, zero adult
              supervision, and a fish fry that ended in a chef&rsquo;s brown butter
              cake made us do it again. And again.
            </p>
            <p style={bodyP}>
              We&rsquo;ve gone every year since — six trips now, the seventh already
              on the calendar. The handicaps got worse. The itineraries got better.
              Nobody has broken par, which is not the point and never was.
            </p>
          </section>
        </FadeIn>

        {/* What this site is */}
        <FadeIn delay={0.05}>
          <section style={{ marginBottom: "3.5rem" }}>
            <p style={eyebrow}>What this is</p>
            <SectionHeading>The clubhouse, not the concierge.</SectionHeading>
            <p style={bodyP}>
              tourdefore.com is our clubhouse. Two doors off the lobby. The{" "}
              <Link href="/past-trips" style={{ color: ACCENT, textDecoration: "none", borderBottom: `1px solid ${ACCENT}` }}>
                Body of Work
              </Link>{" "}
              is the receipts — every trip we&rsquo;ve actually taken, course by
              course, meal by meal, hangover by hangover. The{" "}
              <Link href="/shop" style={{ color: ACCENT, textDecoration: "none", borderBottom: `1px solid ${ACCENT}` }}>
                Pro Shop
              </Link>{" "}
              is where you put the colors on: embroidered hats, polos, the works,
              made to order.
            </p>
            <p style={bodyP}>
              That&rsquo;s it. No membership, no manifesto, no newsletter you have to
              unsubscribe from three times. Just the trips and the merch.
            </p>
          </section>
        </FadeIn>

        {/* The planner spun off */}
        <FadeIn delay={0.05}>
          <section style={{ marginBottom: "3.5rem" }}>
            <p style={eyebrow}>Want your own?</p>
            <SectionHeading>We built a robot for that. It moved out.</SectionHeading>
            <p style={bodyP}>
              Planning these trips got obsessive enough that we built a machine to do
              it — an AI that spits out a full golf-trip itinerary from a few answers.
              It got big enough to need its own building, so it moved out. It lives at{" "}
              <a
                href="https://handicaphq.com"
                style={{ color: ACCENT, textDecoration: "none", borderBottom: `1px solid ${ACCENT}` }}
              >
                Handicap HQ
              </a>{" "}
              now. Go let it plan your version — then come back here and show us the
              scorecard.
            </p>
          </section>
        </FadeIn>

        {/* Signoff + CTAs */}
        <FadeIn delay={0.05}>
          <div style={{ width: "3.5rem", height: "1px", background: "rgba(255,255,255,0.14)", marginBottom: "2.4rem" }} />
          <p
            style={{
              fontFamily: "var(--font-instrument), serif",
              fontStyle: "italic",
              fontSize: "clamp(1.1rem, 2.4vw, 1.5rem)",
              color: "rgba(255,255,255,0.7)",
              marginBottom: "2.6rem",
            }}
          >
            Onwards and upwards. Or at least onwards to the next tee.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            <Link
              href="/past-trips"
              style={{
                fontFamily: "var(--font-plan-block), sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontSize: "1.05rem",
                color: "#fff",
                background: ACCENT,
                padding: "0.85rem 1.6rem",
                borderRadius: "2px",
                textDecoration: "none",
              }}
            >
              See the Body of Work
            </Link>
            <Link
              href="/shop"
              style={{
                fontFamily: "var(--font-plan-block), sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontSize: "1.05rem",
                color: "#fff",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.25)",
                padding: "0.85rem 1.6rem",
                borderRadius: "2px",
                textDecoration: "none",
              }}
            >
              Enter the Pro Shop
            </Link>
          </div>
        </FadeIn>
      </article>
    </main>
  );
}
