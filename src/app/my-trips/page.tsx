import { redirect } from "next/navigation";
import { getSessionEmail, getUserPlans } from "@/lib/auth";
import { getPlan } from "@/lib/kv";
import MyTripsClient from "@/components/MyTripsClient";

export const metadata = {
  title: "My Trips | Tour de Fore",
  description: "Your saved Tour de Fore trip plans.",
};

export default async function MyTripsPage() {
  const email = await getSessionEmail();

  if (!email) {
    redirect("/?skip=1");
  }

  const planIds = await getUserPlans(email);
  const plans = await Promise.all(
    planIds.map(async (id) => {
      const plan = await getPlan(id);
      if (!plan) return null;
      // Extract summary info
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

  const validPlans = plans.filter(Boolean) as NonNullable<(typeof plans)[number]>[];

  return <MyTripsClient email={email} plans={validPlans} />;
}
