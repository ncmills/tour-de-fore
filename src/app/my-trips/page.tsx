import { redirect } from "next/navigation";
import { getSessionEmail, getUserPlans, getUserName } from "@/lib/auth";
import { getPlan } from "@/lib/kv";
import { supabase } from "@/lib/supabase";
import MyTripsClient from "@/components/MyTripsClient";

const TIER_LABELS: Record<string, string> = {
  imp: "Imp",
  devil: "Devil",
  "demon-king": "Demon King",
};

/**
 * Compact crew tally for a single plan's saved-trips card. The planIds here are
 * the signed-in user's own plans, so the owner-gating already holds. Returns
 * null when there are no responses (card stays clean) or Supabase is down.
 */
async function getCrewSummary(planId: string): Promise<{
  in: number;
  maybe: number;
  out: number;
  topTier: string | null;
  topTierVotes: number;
} | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("crew_responses")
    .select("vote_tier, rsvp_status")
    .eq("site", "tdf")
    .eq("plan_id", planId);
  if (error || !data || data.length === 0) return null;

  const counts = { in: 0, maybe: 0, out: 0 };
  const tierVotes: Record<string, number> = { imp: 0, devil: 0, "demon-king": 0 };
  for (const row of data) {
    if (row.rsvp_status === "in") counts.in += 1;
    else if (row.rsvp_status === "maybe") counts.maybe += 1;
    else if (row.rsvp_status === "out") counts.out += 1;
    if (row.vote_tier && row.vote_tier in tierVotes) tierVotes[row.vote_tier] += 1;
  }
  const top = Object.entries(tierVotes).sort((a, b) => b[1] - a[1])[0];
  return {
    ...counts,
    topTier: top && top[1] > 0 ? TIER_LABELS[top[0]] : null,
    topTierVotes: top ? top[1] : 0,
  };
}

export const metadata = {
  title: "My Account | Tour de Fore",
  description: "Your Tour de Fore account and saved trip plans.",
  robots: { index: false, follow: false },
};

export default async function MyTripsPage() {
  const email = await getSessionEmail();

  if (!email) {
    redirect("/login");
  }

  const [planIds, name] = await Promise.all([
    getUserPlans(email),
    getUserName(email),
  ]);

  // Fetch plan summaries
  const plannedTrips = await Promise.all(
    planIds.map(async (id) => {
      const plan = await getPlan(id);
      if (!plan) return null;
      const preview = plan.freePreviews?.mid || plan.freePreviews?.budget;
      const dest = plan.destinations?.mid;
      const crew = await getCrewSummary(plan.id);
      return {
        id: plan.id,
        crew,
        city: preview?.city || dest?.city || "Unknown",
        state: preview?.state || dest?.state || "",
        createdAt: plan.createdAt,
        paid: plan.paid || false,
        groupSize: plan.inputs.groupSize,
        numberOfDays: plan.inputs.numberOfDays,
        // Structured timing for the per-trip countdown (same source as the
        // .ics export + result-header dates string — see lib/trip-dates.ts).
        timing: {
          tripMonth: plan.inputs.tripMonth,
          preferredSeason: plan.inputs.preferredSeason,
          flexible: plan.inputs.flexible,
        },
        // Full wizard inputs so "Duplicate this trip" can prefill the wizard
        // via its sessionStorage state-restore path.
        inputs: plan.inputs,
      };
    })
  );

  return (
    <MyTripsClient
          email={email}
          name={name || ""}
          plannedTrips={plannedTrips.filter(Boolean) as NonNullable<(typeof plannedTrips)[number]>[]}
        />
  );
}
