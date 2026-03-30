import { redirect } from "next/navigation";
import { getSessionEmail, getUserPlans, getUserPastTrips, getUserName } from "@/lib/auth";
import { getPlan } from "@/lib/kv";
import { trips } from "@/lib/trips";
import MyTripsClient from "@/components/MyTripsClient";

export const metadata = {
  title: "My Trips | Tour de Fore",
  description: "Your saved Tour de Fore trip plans and past trip history.",
};

export default async function MyTripsPage() {
  const email = await getSessionEmail();

  if (!email) {
    redirect("/?skip=1");
  }

  const [planIds, attendedYears, name] = await Promise.all([
    getUserPlans(email),
    getUserPastTrips(email),
    getUserName(email),
  ]);

  // Fetch plan summaries
  const plannedTrips = await Promise.all(
    planIds.map(async (id) => {
      const plan = await getPlan(id);
      if (!plan) return null;
      const preview = plan.freePreviews?.mid || plan.freePreviews?.budget;
      const dest = plan.destinations?.mid;
      return {
        id: plan.id,
        city: preview?.city || dest?.city || "Unknown",
        state: preview?.state || dest?.state || "",
        createdAt: plan.createdAt,
        paid: plan.paid || false,
        groupSize: plan.inputs.groupSize,
        numberOfDays: plan.inputs.numberOfDays,
      };
    })
  );

  // Build past trip data from trips.ts
  const allPastTrips = trips
    .filter((t) => !t.upcoming)
    .map((t) => ({
      year: t.year,
      location: t.location,
      state: t.stateAbbr,
      tagline: t.tagline,
      dates: t.dates,
      heroImage: t.heroImage,
      slug: t.slug,
      attended: attendedYears.includes(t.year),
    }));

  return (
    <MyTripsClient
      email={email}
      name={name || ""}
      plannedTrips={plannedTrips.filter(Boolean) as NonNullable<(typeof plannedTrips)[number]>[]}
      pastTrips={allPastTrips}
    />
  );
}
