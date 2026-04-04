"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const FireBackground = dynamic(() => import("./FireBackground"), { ssr: false });

export default function GlobalFire() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <FireBackground />;
}
