import Link from "next/link";

export const metadata = {
  title: "Booking Confirmed | Tour de Fore Concierge",
};

export default function ConciergeSuccessPage() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#000",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      textAlign: "center",
    }}>
      <div style={{ fontSize: "4rem", marginBottom: "1.5rem" }}>😈</div>
      <h1 style={{
        fontFamily: "var(--font-script), cursive",
        fontSize: "clamp(2.5rem, 7vw, 4rem)",
        marginBottom: "1rem",
      }}>
        You&apos;re All Set
      </h1>
      <p style={{
        fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
        color: "rgba(255,255,255,0.5)",
        maxWidth: "500px",
        lineHeight: 1.6,
        marginBottom: "2.5rem",
      }}>
        Your concierge booking is confirmed. Our team will reach out within 24 hours to kick off planning. Get ready — the devils are handling everything from here.
      </p>
      <Link
        href="/?skip=1"
        style={{
          fontFamily: "var(--font-space), sans-serif",
          fontSize: "0.9rem",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.5)",
          textDecoration: "none",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "6px",
          padding: "0.75rem 2rem",
          transition: "all 0.2s",
        }}
      >
        Back to Home
      </Link>
    </main>
  );
}
