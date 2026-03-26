import { Suspense } from "react";
import ExplosionGate from "@/components/ExplosionGate";
import PastTripsClient from "@/components/PastTripsClient";

export default function PastTripsPage() {
  return (
    <Suspense>
      <ExplosionGate pageKey="past-trips">
        <PastTripsClient />
      </ExplosionGate>
    </Suspense>
  );
}
