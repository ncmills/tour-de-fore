import { Suspense } from "react";
import AutoGenerateClient from "@/components/AutoGenerateClient";

export const metadata = {
  title: "Generating Your Plan | Tour de Fore",
};

export default function AutoGeneratePage() {
  return (
    <Suspense>
      <AutoGenerateClient />
    </Suspense>
  );
}
