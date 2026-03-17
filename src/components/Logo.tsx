"use client";

// Devil's trident with the center prong as a golf flag pin
// Clean, iconic, memorable — the pitchfork meets the fairway
export default function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Left prong */}
      <path
        d="M16 8 C16 8 12 12 12 18 C12 22 14 24 16 24 L16 8Z"
        fill="currentColor"
        opacity="0.9"
      />
      {/* Right prong */}
      <path
        d="M48 8 C48 8 52 12 52 18 C52 22 50 24 48 24 L48 8Z"
        fill="currentColor"
        opacity="0.9"
      />
      {/* Center prong / flagstick - taller */}
      <rect x="31" y="4" width="2" height="52" rx="1" fill="currentColor" />
      {/* Flag on center prong */}
      <path
        d="M33 4 L33 16 L45 10 Z"
        fill="#c87941"
      />
      {/* Crossbar connecting prongs */}
      <path
        d="M14 24 C14 24 20 28 32 28 C44 28 50 24 50 24 L50 26 C50 26 44 30 32 30 C20 30 14 26 14 26 Z"
        fill="currentColor"
        opacity="0.8"
      />
      {/* Handle / shaft below crossbar */}
      <rect x="30" y="30" width="4" height="26" rx="2" fill="currentColor" opacity="0.9" />
      {/* Base */}
      <ellipse cx="32" cy="58" rx="6" ry="2" fill="currentColor" opacity="0.4" />
    </svg>
  );
}
