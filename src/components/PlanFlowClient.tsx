"use client";

import { useState, useEffect } from "react";
import PlanLandingClient from "./PlanLandingClient";
import PlanWizardClient from "./PlanWizardClient";

export default function PlanFlowClient() {
  const [showWizard, setShowWizard] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => {
        if (r.ok) setShowWizard(true);
      })
      .finally(() => setChecked(true));
  }, []);

  if (!checked) return null;

  if (showWizard) {
    return <PlanWizardClient />;
  }

  return <PlanLandingClient onFirstTime={() => setShowWizard(true)} />;
}
