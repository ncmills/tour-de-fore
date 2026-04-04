import { redirect } from "next/navigation";
import { getSessionEmail, getUserPlans, getUserName } from "@/lib/auth";
import { getPlan } from "@/lib/kv";
import MyTripsClient from "@/components/MyTripsClient";

export const metadata = {
  title: "My Account | Tour de Fore",
  description: "Your Tour de Fore account and saved trip plans.",
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

  return (
    <MyTripsClient
          email={email}
          name={name || ""}
          plannedTrips={plannedTrips.filter(Boolean) as NonNullable<(typeof plannedTrips)[number]>[]}
        />
  );
}
