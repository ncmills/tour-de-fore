import type { ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';
import type { MDXRemoteProps } from 'next-mdx-remote/rsc';
import { Callout, PlannerCTA, DataHook, KeyStat } from './BlogComponents';

type Components = MDXRemoteProps['components'];

/* Prose-element overrides + custom components available to every MDX post.
   Tailwind v4 + TDF dark tokens:
     --color-text:       #FAFAFA  → text-text
     --color-text-prose: #C9C9CF  → text-text-prose
     --color-text-muted: #A1A1AA  → text-text-muted
     --color-bg-card:    #27272A  → bg-bg-card
     --color-bg-alt:     #1E1E22  → bg-bg-alt
     --color-border:     #3F3F46  → border-border
     --color-accent:     #EA580C  → text-accent / border-accent
   Font display: var(--font-space)  (Space Grotesk)
   Font body:    var(--font-inter)  (Inter)
*/
export const mdxComponents: Components = {
  h2: (props: ComponentPropsWithoutRef<'h2'>) => (
    <h2
      className="mt-12 mb-4 scroll-mt-24 text-[26px] leading-tight text-text"
      style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, letterSpacing: '-0.02em' }}
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<'h3'>) => (
    <h3
      className="mt-8 mb-3 text-xl leading-snug text-text"
      style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, letterSpacing: '-0.02em' }}
      {...props}
    />
  ),
  h4: (props: ComponentPropsWithoutRef<'h4'>) => (
    <h4
      className="mt-6 mb-2 text-[17px] font-semibold text-text"
      style={{ fontFamily: 'var(--font-space), sans-serif' }}
      {...props}
    />
  ),
  p: (props: ComponentPropsWithoutRef<'p'>) => (
    <p className="my-4 text-[17px] leading-[1.75] text-text-prose" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<'ul'>) => (
    <ul
      className="my-4 list-disc space-y-2 pl-6 text-[17px] leading-[1.7] text-text-prose marker:text-accent"
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<'ol'>) => (
    <ol
      className="my-4 list-decimal space-y-2 pl-6 text-[17px] leading-[1.7] text-text-prose marker:text-text-muted"
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<'li'>) => <li className="pl-1" {...props} />,
  a: ({ href = '#', ...props }: ComponentPropsWithoutRef<'a'>) => {
    const external = /^https?:\/\//.test(href);
    const cls =
      'font-medium text-accent underline decoration-[#EA580C]/30 underline-offset-2 transition-colors hover:decoration-[#EA580C]';
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...props} />
    ) : (
      <Link href={href} className={cls} {...props} />
    );
  },
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-semibold text-text" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote
      className="my-6 border-l-2 border-accent/40 pl-5 text-[17px] italic leading-relaxed text-text-muted"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-border" />,
  table: (props: ComponentPropsWithoutRef<'table'>) => (
    <div className="not-prose my-6 overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  thead: (props: ComponentPropsWithoutRef<'thead'>) => <thead className="bg-bg-alt" {...props} />,
  th: (props: ComponentPropsWithoutRef<'th'>) => (
    <th
      className="border-b border-border px-4 py-2.5 text-left font-mono text-[11px] uppercase tracking-wide text-text-muted"
      {...props}
    />
  ),
  td: (props: ComponentPropsWithoutRef<'td'>) => (
    <td className="border-b border-border px-4 py-2.5 text-text-muted" {...props} />
  ),
  code: (props: ComponentPropsWithoutRef<'code'>) => (
    <code
      className="rounded bg-bg-card px-1.5 py-0.5 font-mono text-[0.85em] text-[#EA580C]"
      {...props}
    />
  ),
  pre: (props: ComponentPropsWithoutRef<'pre'>) => (
    <pre
      className="not-prose my-6 overflow-x-auto rounded-lg bg-bg-card p-4 text-[14px] text-text-prose"
      {...props}
    />
  ),
  // Custom components wired into every post
  Callout,
  PlannerCTA,
  DataHook,
  KeyStat,
};
