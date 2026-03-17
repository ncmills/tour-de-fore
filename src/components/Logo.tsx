"use client";

import Image from "next/image";

// Small icon logo (filled trident) — for nav, footer, small accents
export default function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <Image
      src="/logo-icon.png"
      alt="Tour de Fore"
      width={660}
      height={977}
      className={className}
      priority
    />
  );
}

// Full logo with text (trident + "TOUR DE FORE EST. 2021") — for hero, large displays
export function LogoFull({ className = "w-64" }: { className?: string }) {
  return (
    <Image
      src="/logo-full.png"
      alt="Tour de Fore — Est. 2021"
      width={660}
      height={977}
      className={className}
      priority
    />
  );
}
