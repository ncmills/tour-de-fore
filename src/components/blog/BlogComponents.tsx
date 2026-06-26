import React from 'react';

/* ─────────────────────────────────────────────────────────────────────
   Blog MDX components — TDF dark palette (ember #EA580C).
   These are the building blocks authors compose inside .mdx posts.
   The PlannerCTA is TDF's CTA route-in to /planner.
   ───────────────────────────────────────────────────────────────────── */

// ── Inline SVGs (no lucide-react in TDF) ──────────────────────────────

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path strokeLinecap="round" d="M12 16v-4M12 8h.01" />
    </svg>
  );
}

function WarningIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    </svg>
  );
}

function ScaleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l9-3 9 3M3 6l3 8a3 3 0 006 0l3-8M12 3v18M9 21h6" />
    </svg>
  );
}

function DatabaseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
    </svg>
  );
}

// ── PlannerCTA ─────────────────────────────────────────────────────────

/** Route readers into the TDF trip planner. Drop anywhere in a post body. */
export function PlannerCTA({ label = 'Plan this trip with the TDF planner' }: { label?: string }) {
  return (
    <a
      href="/planner"
      className="block my-6 rounded-lg border border-[#EA580C]/40 bg-[#EA580C]/5 px-5 py-4 font-semibold text-[#EA580C] hover:bg-[#EA580C]/10"
      style={{ fontFamily: 'var(--font-inter), sans-serif', textDecoration: 'none' }}
    >
      {label} →
    </a>
  );
}

// ── DataHook ───────────────────────────────────────────────────────────

/** Callout that surfaces a "why this data matters" angle in the prose. */
export function DataHook({ children }: { children: React.ReactNode }) {
  return (
    <aside className="not-prose my-6 flex gap-3 rounded-lg border-l-2 border-[#f59e0b] bg-[#f59e0b]/10 px-5 py-4">
      <DatabaseIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#f59e0b]" />
      <div className="text-[15px] leading-relaxed text-[#f59e0b]">{children}</div>
    </aside>
  );
}

// ── Callout ────────────────────────────────────────────────────────────

const CALLOUT_STYLES = {
  note: {
    Icon: InfoIcon,
    ring: 'border-[#EA580C]/20 bg-[#EA580C]/5',
    tint: 'text-[#EA580C]',
  },
  warning: {
    Icon: WarningIcon,
    ring: 'border-[#f59e0b]/30 bg-[#f59e0b]/10',
    tint: 'text-[#f59e0b]',
  },
  legal: {
    Icon: ScaleIcon,
    ring: 'border-[#3F3F46] bg-[#1E1E22]',
    tint: 'text-[#A1A1AA]',
  },
} as const;

export function Callout({
  type = 'note',
  title,
  children,
}: {
  type?: keyof typeof CALLOUT_STYLES;
  title?: string;
  children: React.ReactNode;
}) {
  const s = CALLOUT_STYLES[type] ?? CALLOUT_STYLES.note;
  const { Icon } = s;
  return (
    <aside className={`not-prose my-6 flex gap-3 rounded-lg border ${s.ring} px-5 py-4`}>
      <Icon className={`mt-0.5 h-5 w-5 flex-shrink-0 ${s.tint}`} />
      <div className="min-w-0 text-[15px] leading-relaxed text-[#C9C9CF]">
        {title && <p className={`mb-1 font-semibold ${s.tint}`}>{title}</p>}
        {children}
      </div>
    </aside>
  );
}

// ── KeyStat ────────────────────────────────────────────────────────────

/** Lightweight inline stat — pulls a figure out of the prose flow. */
export function KeyStat({ value, label }: { value: string; label: string }) {
  return (
    <span className="not-prose mx-1 inline-flex items-baseline gap-1.5 rounded-md bg-[#27272A] px-2 py-0.5 align-baseline">
      <span className="font-mono text-sm font-medium tabular-nums text-[#EA580C]">{value}</span>
      <span className="text-xs text-[#A1A1AA]">{label}</span>
    </span>
  );
}
