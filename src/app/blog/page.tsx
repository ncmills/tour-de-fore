import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts, type Post } from '@/lib/blog';
import MulliganButton from '@/components/MulliganButton';
import HomeButton from '@/components/HomeButton';

const SITE_URL = 'https://tourdefore.com';

export const metadata: Metadata = {
  title: 'Golf Trip Blog — Destination Guides, Course Reviews & Trip Reports | Tour de Fore',
  description:
    'Golf travel writing from six years on the road: destination deep-dives, course reviews, gear picks, and trip reports. Every piece is grounded in real rounds.',
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    type: 'website',
    title: 'Golf Trip Blog — Tour de Fore',
    description:
      'Golf travel writing from six years on the road: destination deep-dives, course reviews, gear picks, and trip reports.',
    url: `${SITE_URL}/blog`,
    images: ['/icon-fancy.png'],
  },
};

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      style={{ textDecoration: 'none' }}
      className="group flex flex-col rounded-xl border border-border bg-bg-card p-5 transition-colors hover:border-accent/40"
    >
      <span
        className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-dim"
        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
      >
        {post.primaryKeyword}
      </span>
      <h3
        className="mt-2.5 text-[19px] leading-snug text-text group-hover:text-accent"
        style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, letterSpacing: '-0.02em' }}
      >
        {post.title}
      </h3>
      <p className="mt-2 flex-1 text-[15px] leading-relaxed text-text-muted line-clamp-3">
        {post.description}
      </p>
      <div
        className="mt-4 flex items-center justify-between font-mono text-[11px] text-text-dim"
        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
      >
        <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
        <span className="inline-flex items-center gap-1 text-accent">
          {post.readingMinutes} min read →
        </span>
      </div>
    </Link>
  );
}

export default function BlogIndexPage() {
  const posts = getAllPosts();

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Tour de Fore — Golf Trip Blog',
    description:
      'Golf travel writing covering destinations, course reviews, trip reports, and gear picks.',
    url: `${SITE_URL}/blog`,
    publisher: {
      '@type': 'Organization',
      name: 'Tour de Fore',
      '@id': `${SITE_URL}/#org`,
    },
    blogPost: posts.slice(0, 25).map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.datePublished,
      dateModified: p.dateModified,
    })),
  };

  return (
    <main
      id="main-content"
      style={{ background: 'var(--color-bg)', color: 'var(--color-text)', minHeight: '100vh' }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <MulliganButton href="/?skip=1" />
      <HomeButton />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(4rem, 10vw, 7rem) clamp(1.5rem, 5vw, 3rem) 4rem' }}>
        {/* Header */}
        <header style={{ maxWidth: 640, marginBottom: '3rem' }}>
          <p
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-dim"
            style={{ fontFamily: 'var(--font-inter), sans-serif', marginBottom: '0.75rem' }}
          >
            Tour de Fore
          </p>
          <h1
            className="text-[clamp(2rem,5vw,3rem)] leading-[1.1] text-text"
            style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, letterSpacing: '-0.03em' }}
          >
            The Golf Trip Blog
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-text-muted" style={{ maxWidth: 560 }}>
            Six years of fairways. Destination guides, course reviews, trip reports, and gear
            picks — written by people who've done the research in the field.
          </p>
        </header>

        {/* Post grid */}
        {posts.length === 0 ? (
          <p
            className="rounded-lg border border-border bg-bg-card px-6 py-10 text-center text-text-muted"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            Articles are on the way.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
