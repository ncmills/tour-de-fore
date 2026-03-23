"use client";

import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="text-[11px] tracking-[0.1em] uppercase font-body text-[#5a5550]"
    >
      <ol className="flex items-center gap-2 flex-wrap">
        <li>
          <Link href="/" className="hover:text-[#e85d26] transition-colors">
            Home
          </Link>
        </li>
        {crumbs.map((crumb, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="text-[#2a2a2a]">/</span>
            {crumb.href ? (
              <Link href={crumb.href} className="hover:text-[#e85d26] transition-colors">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-[#8a8580]">{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
