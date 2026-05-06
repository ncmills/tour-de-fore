import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getPlan, getAttendees } from "@/lib/kv";
import { getSessionEmail, getUserPlans } from "@/lib/auth";
import TripBuilderClient from "@/components/TripBuilderClient";
import PlanGate from "@/components/PlanGate";
import ErrorBoundary from "@/components/ErrorBoundary";
import type { TripTier, PriceLevel, ThreePlanResult, GeneratedPlan } from "@/lib/plan-types";
import { allDestinations } from "@/data/index";
import { buildInsightsContext } from "@/lib/insights";

interface Props {
  searchParams: Promise<{ planId?: string; dest?: string; tier?: string }>;
}

export const metadata = {
  title: "Build Your Trip | Tour de Fore",
  description: "Customize your golf trip — pick lodging, courses, restaurants, and more.",
  robots: { index: false, follow: false },
};

export default async function BuildPage({ searchParams }: Props) {
  const { planId, dest, tier } = await searchParams;

  if (!planId || !dest || !tier) notFound();

  const stored = await getPlan(planId);
  if (!stored || !stored.paid || !stored.destinations) notFound();

  // Auth gate — require login and verify plan access
  const sessionEmail = await getSessionEmail();
  if (!sessionEmail) {
    const preview = stored.freePreviews?.mid || stored.freePreviews?.budget;
    return (
      <Suspense>
        <PlanGate
          planId={planId}
          city={preview?.city || "your destination"}
          state={preview?.state || ""}
          prefillEmail={stored.inputs?.organizerEmail || ""}
        />
      </Suspense>
    );
  }

  // Verify plan access — organizer, plan owner, or listed attendee
  const isOrganizer = stored.inputs?.organizerEmail?.toLowerCase() === sessionEmail.toLowerCase();
  const userPlans = await getUserPlans(sessionEmail);
  const ownsThisPlan = isOrganizer || userPlans.includes(planId);
  let isAttendee = false;
  if (!ownsThisPlan) {
    const attendees = await getAttendees(planId);
    isAttendee = attendees.some((a) => a.email.toLowerCase() === sessionEmail.toLowerCase());
  }
  if (!ownsThisPlan && !isAttendee) notFound();

  const destLevel = dest as PriceLevel;
  const rec = stored.destinations[destLevel];
  if (!rec) notFound();

  const tierKey = (tier === "demon-king" ? "demonKing" : tier) as keyof ThreePlanResult;
  const rawPlan = rec.plans[tierKey];
  if (!rawPlan) notFound();

  // Sanitize plan data — Claude's JSON repair can produce partial objects
  const plan: GeneratedPlan = {
    ...rawPlan,
    lodging: rawPlan.lodging || { name: "Lodging TBD", type: "House", address: "", costPerNight: "$0", rationale: "" },
    courses: Array.isArray(rawPlan.courses) ? rawPlan.courses : [],
    dining: Array.isArray(rawPlan.dining) ? rawPlan.dining : [],
    bars: Array.isArray(rawPlan.bars) ? rawPlan.bars : [],
    schedule: Array.isArray(rawPlan.schedule) ? rawPlan.schedule : [],
    proTips: Array.isArray(rawPlan.proTips) ? rawPlan.proTips : [],
    estimatedBudget: rawPlan.estimatedBudget || { perPerson: "$0", breakdown: [] },
    groupLogistics: rawPlan.groupLogistics || { teeTimeStrategy: "", transport: "", packingList: [] },
    numberOfDays: rawPlan.numberOfDays || rawPlan.schedule?.length || 3,
    groupSize: rawPlan.groupSize || stored.inputs?.groupSize || 12,
    destination: rawPlan.destination || rec.city || "",
  };

  // Look up destination data for smart insights
  const destination = allDestinations.find((d) => d.id === rec.destinationId);
  const insights = destination
    ? buildInsightsContext(destination, stored.inputs?.groupSize || 12)
    : null;

  return (
    <ErrorBoundary fallbackHref={`/plan/result/${planId}`}>
      <Suspense>
        <TripBuilderClient
          plan={plan}
          allPlans={rec.plans}
          planId={planId}
          tier={tier as TripTier}
          dest={dest}
          insights={insights}
        />
      </Suspense>
    </ErrorBoundary>
  );
}
