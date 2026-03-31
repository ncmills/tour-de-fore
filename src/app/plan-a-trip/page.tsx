import { Suspense } from "react";
import ExplosionGate from "@/components/ExplosionGate";
import PlanFlowClient from "@/components/PlanFlowClient";

export const metadata = {
  title: "Plan a Golf Trip | Tour de Fore AI Trip Planner",
  description: "Plan the perfect group golf trip with AI. 135+ destinations, custom itineraries at three price points, real courses and venues.",
  alternates: { canonical: "https://tourdefore.com/plan-a-trip" },
  openGraph: { title: "Plan a Golf Trip — AI Trip Planner", description: "Plan the perfect group golf trip with AI. 135+ destinations across America.", images: ["/icon-fancy.png"] },
};

export default function PlanATripPage() {
  return (
    <Suspense>
      <ExplosionGate pageKey="plan-a-trip">
        <PlanFlowClient />
      </ExplosionGate>
    </Suspense>
  );
}
