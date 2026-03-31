import { Suspense } from "react";
import ConciergeClient from "@/components/ConciergeClient";

export const metadata = {
  title: "Golf Trip Concierge — Full-Service Planning | Tour de Fore",
  description: "Let us book everything for your golf trip — tee times, lodging, restaurants, transportation, and custom gear.",
  alternates: { canonical: "https://tourdefore.com/concierge" },
  openGraph: { title: "Golf Trip Concierge Service", description: "Full-service golf trip planning — we handle everything.", images: ["/icon-fancy.png"] },
};

export default function ConciergePage() {
  return (
    <Suspense>
      <ConciergeClient />
    </Suspense>
  );
}
