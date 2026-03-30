import { notFound } from "next/navigation";
import { getPlan } from "@/lib/kv";
import ShareableTripClient from "@/components/ShareableTripClient";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const stored = await getPlan(id);
  if (!stored) return { title: "Trip Not Found | Tour de Fore" };

  const preview = stored.freePreviews?.mid;
  const dest = stored.destinations?.mid;
  const city = preview?.city || dest?.city || "Unknown";
  const state = preview?.state || dest?.state || "";

  return {
    title: `${city}, ${state} Golf Trip | Tour de Fore`,
    description: `${stored.inputs.groupSize} people, ${stored.inputs.numberOfDays} days — courses, lodging, restaurants, and the full itinerary.`,
  };
}

export default async function ShareableTripPage({ params }: Props) {
  const { id } = await params;
  const stored = await getPlan(id);

  if (!stored || !stored.paid || !stored.destinations) {
    notFound();
  }

  const destLevel = stored.paidDestination || "mid";
  const rec = stored.destinations[destLevel];
  if (!rec) notFound();

  // Use the devil (recommended) tier for the shareable view
  const plan = rec.plans.devil;

  return <ShareableTripClient plan={plan} planId={id} selectedOptions={stored.selectedOptions} />;
}
