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
      className="text-xs tracking-[0.1em] uppercase font-body text-text-dim"
    >
      <ol className="flex items-center gap-2 flex-wrap">
        <li>
          <Link href="/" className="hover:text-accent transition-colors">
            Home
          </Link>
        </li>
        {crumbs.map((crumb, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="text-border">/</span>
            {crumb.href ? (
              <Link href={crumb.href} className="hover:text-accent transition-colors">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-text-muted">{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
