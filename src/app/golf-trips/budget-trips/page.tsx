import Link from "next/link";
import { allDestinations } from "@/data";
import MulliganButton from "@/components/MulliganButton";
import HomeButton from "@/components/HomeButton";

export const metadata = {
  title: "Budget Golf Trips Under $2K Per Person | Tour de Fore",
  description: "Affordable group golf trips with great courses, lodging, and dining. Find destinations where you can golf for under $2,000 per person.",
  alternates: { canonical: "https://tourdefore.com/golf-trips/budget-trips" },
  openGraph: {
    title: "Budget Golf Trips Under $2K Per Person | Tour de Fore",
    description: "Affordable group golf trips with great courses, lodging, and dining. Find destinations where you can golf for under $2,000 per person.",
    images: ["/icon-fancy.png"],
  },
};

export default function BudgetTripsPage() {
  const budgetDests = allDestinations
    .filter((d) => d.courses.some((c) => c.tier === "budget" || c.tier === "solid") && d.lodging.some((l) => l.nightlyRange[0] < 400))
    .map((d) => {
      const cheapestFee = Math.min(...d.courses.map((c) => c.greenFeeRange[0]));
      const cheapestLodging = Math.min(...d.lodging.map((l) => l.nightlyRange[0]));
      return { dest: d, cheapestFee, cheapestLodging };
    })
    .sort((a, b) => a.cheapestFee + a.cheapestLodging - (b.cheapestFee + b.cheapestLodging));

  return (
    <main style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "clamp(3rem, 8vw, 6rem) clamp(1.5rem, 6vw, 6rem)" }}>
      <MulliganButton href="/golf-trips" />
      <HomeButton />
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.5rem" }}>
          Budget Golf Trips
        </h1>
        <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: "3rem" }}>Great golf doesn&apos;t have to break the bank. {budgetDests.length} affordable destinations.</p>

        <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "1rem", color: "rgba(255,255,255,0.6)" }}>Most Affordable Golf Destinations</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))", gap: "1rem" }}>
          {budgetDests.map(({ dest: d, cheapestFee, cheapestLodging }) => (
            <Link key={d.id} href={`/golf-trips/${d.id}`} style={{ display: "block", padding: "1.25rem", background: "#111", border: "1px solid #222", borderRadius: 10, textDecoration: "none", color: "#fff" }}>
              <strong style={{ fontSize: "0.95rem" }}>{d.city}, {d.state}</strong>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", margin: "0.3rem 0" }}>{d.tagline}</p>
              <div style={{ display: "flex", gap: "1rem", fontSize: "0.75rem", color: "#4ade80", marginTop: "0.5rem" }}>
                <span>Green fees from ${cheapestFee}</span>
                <span>Lodging from ${cheapestLodging}/night</span>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link href="/plan-a-trip" style={{ display: "inline-block", background: "rgba(220,38,38,0.9)", borderRadius: 8, padding: "14px 36px", color: "#fff", fontSize: 17, fontWeight: 700, letterSpacing: "0.06em", textDecoration: "none", textTransform: "uppercase", fontFamily: "var(--font-plan-block), sans-serif" }}>
            Plan a Budget Trip →
          </Link>
        </div>
      </div>
    </main>
  );
}
