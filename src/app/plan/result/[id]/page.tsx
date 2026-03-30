import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getPlan } from "@/lib/kv";
import { getSessionEmail, isSubscribed } from "@/lib/auth";
import { maskPlan } from "@/lib/mask";
import PlanResultClient from "@/components/PlanResultClient";
import PlanSelectionClient from "@/components/PlanSelectionClient";
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

  // Check subscription status
  const email = await getSessionEmail();
  const subscribed = email ? await isSubscribed(email) : false;

  // ── No dest: show destination cards ──
  if (!dest) {
    return (
      <Suspense>
        <PlanSelectionClient
          planId={id}
          freePreviews={stored.freePreviews || null}
          paid={subscribed || stored.paid}
          paidDestination={stored.paidDestination}
          legacyDestinations={stored.destinations}
        />
      </Suspense>
    );
  }

  const destLevel = dest as PriceLevel;

  // ── Has dest + full plan data: show plan (masked or full) ──
  if (stored.destinations?.[destLevel]) {
    const rec = stored.destinations[destLevel];
    const selectedTier = tier || "devil";
    let plan = getTierPlan(rec.plans, selectedTier);
    if (!plan) notFound();

    // Mask names for non-subscribers
    if (!subscribed) {
      plan = maskPlan(plan);
    }

    return (
      <Suspense>
        <PlanResultClient
          plan={plan}
          allPlans={subscribed ? rec.plans : undefined}
          planId={id}
          tier={selectedTier as TripTier}
          dest={dest}
          paid={subscribed}
          subscribed={subscribed}
        />
      </Suspense>
    );
  }

  // ── Legacy plans ──
  if (stored.plans) {
    const selectedTier = tier || "devil";
    let plan = getTierPlan(stored.plans, selectedTier);
    if (!plan) notFound();
    if (!subscribed) plan = maskPlan(plan);
    return (
      <Suspense>
        <PlanResultClient plan={plan} planId={id} tier={selectedTier as TripTier} dest={dest} paid={true} subscribed={subscribed} />
      </Suspense>
    );
  }

  // No full plan yet — show destination cards
  return (
    <Suspense>
      <PlanSelectionClient
        planId={id}
        freePreviews={stored.freePreviews || null}
        paid={false}
      />
    </Suspense>
  );
}
