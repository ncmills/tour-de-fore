import { Suspense } from "react";
import SetPasswordClient from "@/components/SetPasswordClient";

export const metadata = {
  title: "Set Password | Tour de Fore",
};

export default function SetPasswordPage() {
  return (
    <Suspense>
      <SetPasswordClient />
    </Suspense>
  );
}
