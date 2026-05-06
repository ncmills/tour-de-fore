import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getSessionEmail } from "@/lib/auth";
import LoginClient from "@/components/LoginClient";

export const metadata = {
  title: "Sign In | Tour de Fore",
  description: "Sign in to your Tour de Fore account to view and manage your planned golf trips.",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ returnTo?: string }>;
}) {
  const email = await getSessionEmail();
  if (email) redirect("/my-trips");

  const { returnTo } = await searchParams;

  return (
    <Suspense>
      <LoginClient returnTo={returnTo || "/my-trips"} />
    </Suspense>
  );
}
