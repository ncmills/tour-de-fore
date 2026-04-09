import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getPlan, getAttendees } from "@/lib/kv";
import { getSessionEmail, getUserPlans } from "@/lib/auth";
import PlanResultClient from "@/components/PlanResultClient";
import PlanSelectionClient from "@/components/PlanSelectionClient";
import PlanGate from "@/components/PlanGate";
import ErrorBoundary from "@/components/ErrorBoundary";
import type {
  TripTier,
  ThreePlanResult,
  GeneratedPlan,
  PriceLevel,
} from "@/lib/plan-types";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ dest?: string; tier?: string }>;
}

function getTierPlan(plans: ThreePlanResult, tier: string): GeneratedPlan | null {
  switch (tier) {
    case "imp": return plans.imp;
    case "devil": return plans.devil;
    case "demon-king": return plans.demonKing;
    default: return null;
  }
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const stored = await getPlan(id);
  if (!stored) return { title: "Plan Not Found | Tour de Fore" };

  const preview = stored.freePreviews?.mid;
  if (preview) {
    return {
      title: `${preview.city}, ${preview.state} Trip Plan | Tour de Fore`,
      description: `Plan your golf trip to ${preview.city} — ${preview.groupSize} people, ${preview.numberOfDays} days.`,
    };
  }

  return { title: "Your Trip Plan | Tour de Fore" };
}

export default async function PlanResultPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { dest, tier } = await searchParams;
  const stored = await getPlan(id);
  if (!stored) notFound();

  // Check if user is authenticated
  const sessionEmail = await getSessionEmail();
  const authenticated = !!sessionEmail;

  // If not authenticated, show gate
  if (!authenticated) {
    const preview = stored.freePreviews?.mid || stored.freePreviews?.budget;
    return (
      <Suspense>
        <PlanGate
          planId={id}
          city={preview?.city || "your destination"}
          state={preview?.state || ""}
          prefillEmail={stored.inputs?.organizerEmail || ""}
        />
      </Suspense>
    );
  }

  // Verify plan access — organizer, plan owner, or listed attendee
  const isOrganizer = stored.inputs?.organizerEmail?.toLowerCase() === sessionEmail?.toLowerCase();
  const userPlans = sessionEmail ? await getUserPlans(sessionEmail) : [];
  const ownsThisPlan = isOrganizer || userPlans.includes(id);
  let isAttendee = false;
  if (!ownsThisPlan && sessionEmail) {
    const attendees = await getAttendees(id);
    isAttendee = attendees.some((a) => a.email.toLowerCase() === sessionEmail.toLowerCase());
  }
  const hasAccess = ownsThisPlan || isAttendee;

  // No dest: show destination cards (all plans are free — no paywall)
  if (!dest) {
    return (
      <Suspense>
        <PlanSelectionClient
          planId={id}
          freePreviews={stored.freePreviews || null}
          paid={true}
          legacyDestinations={hasAccess ? stored.destinations : undefined}
        />
      </Suspense>
    );
  }

  const destLevel = dest as PriceLevel;

  // Show full plan
  if (hasAccess && stored.destinations?.[destLevel]) {
    const rec = stored.destinations[destLevel];
    const selectedTier = tier || "devil";
    const plan = getTierPlan(rec.plans, selectedTier);
    if (!plan) notFound();

    return (
      <ErrorBoundary fallbackHref={`/plan/result/${id}`}>
        <Suspense>
          <PlanResultClient
            plan={plan}
            allPlans={rec.plans}
            planId={id}
            tier={selectedTier as TripTier}
            dest={dest}
            paid={true}
          />
        </Suspense>
      </ErrorBoundary>
    );
  }

  // Legacy plans
  if (hasAccess && stored.plans) {
    const selectedTier = tier || "devil";
    const plan = getTierPlan(stored.plans, selectedTier);
    if (!plan) notFound();
    return (
      <Suspense>
        <PlanResultClient plan={plan} planId={id} tier={selectedTier as TripTier} dest={dest} paid={true} />
      </Suspense>
    );
  }

  // Fallback — show selection
  return (
    <Suspense>
      <PlanSelectionClient planId={id} freePreviews={stored.freePreviews || null} paid={true} />
    </Suspense>
  );
}
