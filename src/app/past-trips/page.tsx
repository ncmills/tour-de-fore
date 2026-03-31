import { Suspense } from "react";
import ExplosionGate from "@/components/ExplosionGate";
import PastTripsClient from "@/components/PastTripsClient";

export const metadata = {
  title: "Body of Work — Past Golf Trips | Tour de Fore",
  description: "Six years of legendary group golf trips across America — St. George, Boise, Lexington, Bend, Deadwood, Kohler, and more.",
  alternates: { canonical: "https://tourdefore.com/past-trips" },
  openGraph: { title: "Body of Work — Past Golf Trips", description: "Six years of legendary group golf trips across America.", images: ["/icon-fancy.png"] },
};

export default function PastTripsPage() {
  return (
    <Suspense>
      <ExplosionGate pageKey="past-trips">
        <PastTripsClient />
      </ExplosionGate>
    </Suspense>
  );
}
