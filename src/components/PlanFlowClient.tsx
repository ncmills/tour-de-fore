"use client";

import { useState } from "react";
import PlanLandingClient from "./PlanLandingClient";
import PlanWizardClient from "./PlanWizardClient";

export default function PlanFlowClient() {
  const [showWizard, setShowWizard] = useState(false);

  if (showWizard) {
    return <PlanWizardClient />;
  }

  return <PlanLandingClient onFirstTime={() => setShowWizard(true)} />;
}
