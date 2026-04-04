import { Suspense } from "react";
import ExplosionGate from "@/components/ExplosionGate";
import PastTripsClient from "@/components/PastTripsClient";

export const metadata = {
  title: "6 Years of Group Golf Trips Across America | Tour de Fore",
  description: "Six years of legendary group golf trips — St. George, Boise, Lexington, Bend, Deadwood, Kohler, and more. Photos, stories, and stats from every trip.",
  alternates: { canonical: "https://tourdefore.com/past-trips" },
  openGraph: { title: "Body of Work — Past Golf Trips", description: "Six years of legendary group golf trips across America." },
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
