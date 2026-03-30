import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getPlan } from "@/lib/kv";
import PlanResultClient from "@/components/PlanResultClient";
import PlanSelectionClient from "@/components/PlanSelectionClient";
import FreePreviewClient from "@/components/FreePreviewClient";
import TierSelectionClient from "@/components/TierSelectionClient";
import type {
  TripTier,
  ThreePlanResult,
  GeneratedPlan,
  PriceLevel,
  DestinationRecommendation,
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

  if (!stored) {
    return { title: "Plan Not Found | Tour de Fore" };
  }

  // Use free preview for metadata if no paid plan
  const preview = stored.freePreviews?.mid;
  if (preview) {
    return {
      title: `${preview.city}, ${preview.state} Trip Plan | Tour de Fore`,
      description: `Plan your golf trip to ${preview.city} — ${preview.groupSize} people, ${preview.numberOfDays} days.`,
    };
  }

  const rec = stored.destinations?.mid;
  const plan = rec?.plans?.devil || stored.plans?.devil;
  const name = plan?.tripName || "Your Trip Plan";

  return {
    title: `${name} | Tour de Fore`,
    description: plan?.tagline || "",
  };
}

export default async function PlanResultPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { dest, tier } = await searchParams;
  const stored = await getPlan(id);

  if (!stored) {
    notFound();
  }

  // ── FREEMIUM FLOW: No dest param → show free preview destination cards ──
  if (!dest) {
    // New freemium flow: show free previews with locked sections
    if (stored.freePreviews) {
      return (
        <Suspense>
          <PlanSelectionClient planId={id} freePreviews={stored.freePreviews} paid={stored.paid} />
        </Suspense>
      );
    }
    // Legacy: old paid destinations format
    if (stored.destinations) {
      return (
        <Suspense>
          <PlanSelectionClient planId={id} freePreviews={null} paid={true} legacyDestinations={stored.destinations} />
        </Suspense>
      );
    }
    // Legacy: old single-plan format
    if (stored.plans) {
      const legacyRec: DestinationRecommendation = {
        destinationId: "legacy",
        city: stored.plans.devil.destination.split(",")[0]?.trim() || "Unknown",
        state: stored.plans.devil.destination.split(",")[1]?.trim() || "",
        tagline: stored.plans.devil.tagline,
        priceLevel: "mid",
        plans: stored.plans,
      };
      return (
        <Suspense>
          <TierSelectionClient planId={id} dest="mid" recommendation={legacyRec} />
        </Suspense>
      );
    }
    notFound();
  }

  // ── Has dest param: check if paid ──
  const destLevel = dest as PriceLevel;

  // If paid and full plan exists for this destination, show it
  if (stored.paid && stored.destinations?.[destLevel]) {
    const rec = stored.destinations[destLevel];

    // No tier selected → show tier picker
    if (!tier) {
      return (
        <Suspense>
          <TierSelectionClient planId={id} dest={destLevel} recommendation={rec} />
        </Suspense>
      );
    }

    // Has tier → show full plan
    const plan = getTierPlan(rec.plans, tier);
    if (!plan) notFound();

    return (
      <Suspense>
        <PlanResultClient plan={plan} planId={id} tier={tier as TripTier} dest={dest} />
      </Suspense>
    );
  }

  // Not paid: show free preview with unlock CTA
  const preview = stored.freePreviews?.[destLevel];
  if (!preview) notFound();

  return (
    <Suspense>
      <FreePreviewClient planId={id} dest={destLevel} preview={preview} />
    </Suspense>
  );
}
