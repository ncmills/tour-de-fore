import { Suspense } from "react";
import ExplosionGate from "@/components/ExplosionGate";
import PlanWizardClient from "@/components/PlanWizardClient";

export default function PlanATripPage() {
  return (
    <Suspense>
      <ExplosionGate pageKey="plan-a-trip">
        <PlanWizardClient />
      </ExplosionGate>
    </Suspense>
  );
}
