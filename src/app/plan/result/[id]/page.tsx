import { notFound } from "next/navigation";
import { getPlan } from "@/lib/kv";
import PlanResultClient from "@/components/PlanResultClient";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const stored = await getPlan(id);

  if (!stored) {
    return { title: "Plan Not Found | Tour de Fore" };
  }

  return {
    title: `${stored.plan.tripName} | Tour de Fore`,
    description: `${stored.plan.tagline} — ${stored.plan.destination}`,
    openGraph: {
      title: `${stored.plan.tripName} | Tour de Fore`,
      description: `${stored.plan.tagline} — ${stored.plan.destination}`,
    },
  };
}

export default async function PlanResultPage({ params }: Props) {
  const { id } = await params;
  const stored = await getPlan(id);

  if (!stored) {
    notFound();
  }

  return <PlanResultClient stored={stored} />;
}
