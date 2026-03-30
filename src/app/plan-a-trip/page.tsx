import { Suspense } from "react";
import ExplosionGate from "@/components/ExplosionGate";
import PlanWizardClient from "@/components/PlanWizardClient";

export const metadata = {
  title: "Plan a Golf Trip | Tour de Fore AI Trip Planner",
  description:
    "Plan the perfect group golf trip with AI. 135+ destinations, custom itineraries at three price points, real courses and venues.",
};

export default function PlanATripPage() {
  return (
    <Suspense>
      <ExplosionGate pageKey="plan-a-trip">
        <PlanWizardClient />
      </ExplosionGate>
    </Suspense>
  );
}
