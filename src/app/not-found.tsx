import Link from "next/link";

export const metadata = {
  title: "Page Not Found | Tour de Fore",
  description: "The page you're looking for doesn't exist. Find your next golf trip destination.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main style={{ minHeight: "100vh", background: "#000", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem" }}>
      <div style={{ fontSize: "6rem", marginBottom: "1rem", opacity: 0.3 }}>404</div>
      <h1 style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "clamp(1.5rem, 4vw, 2.5rem)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.75rem" }}>
        Lost in the Rough
      </h1>
      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "1rem", marginBottom: "2.5rem", maxWidth: 400 }}>
        This page doesn&apos;t exist. Let&apos;s get you back on the fairway.
      </p>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
        <Link href="/" style={{ display: "inline-block", background: "rgba(200,121,65,0.9)", borderRadius: 8, padding: "12px 28px", color: "#fff", fontSize: 15, fontWeight: 600, letterSpacing: "0.04em", textDecoration: "none", textTransform: "uppercase" }}>
          Home
        </Link>
        <Link href="/golf-trips" style={{ display: "inline-block", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, padding: "12px 28px", color: "#fff", fontSize: 15, fontWeight: 600, letterSpacing: "0.04em", textDecoration: "none", textTransform: "uppercase" }}>
          Browse Destinations
        </Link>
        <Link href="/plan-a-trip" style={{ display: "inline-block", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, padding: "12px 28px", color: "#fff", fontSize: 15, fontWeight: 600, letterSpacing: "0.04em", textDecoration: "none", textTransform: "uppercase" }}>
          Plan a Trip
        </Link>
      </div>
    </main>
  );
}
