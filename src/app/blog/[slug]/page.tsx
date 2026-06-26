import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import { getPost, getAllSlugs, getRelatedPosts, type Post } from '@/lib/blog';
import { mdxComponents } from '@/components/blog/mdxComponents';
import MulliganButton from '@/components/MulliganButton';
import HomeButton from '@/components/HomeButton';

const SITE_URL = 'https://tourdefore.com';

const PUBLISHER = {
  '@type': 'Organization',
  name: 'Tour de Fore',
  '@id': `${SITE_URL}/#org`,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/icon-fancy.png`,
    width: 1024,
    height: 1024,
  },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: 'Article not found' };
  return {
    title: `${post.title} | Tour de Fore`,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${slug}`,
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      images: ['/icon-fancy.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: ['/icon-fancy.png'],
    },
    keywords: [post.primaryKeyword, ...(post.secondaryKeywords ?? [])],
  };
}

/* ── FAQ JSON-LD parser ─────────────────────────────────────────────────
   Looks for an `## FAQ` section in the raw MDX body. Under it, treats each
   `### question text` heading + following text as a Q/A pair.
   Strips MDX self-closing component tags before emitting the answer text.
   ───────────────────────────────────────────────────────────────────── */
function parseFAQSection(content: string): Array<{ question: string; answer: string }> {
  // Locate ## FAQ heading (case-insensitive)
  const faqMatch = /^##\s+FAQ\b/im.exec(content);
  if (!faqMatch) return [];

  // Slice from end of that heading line
  const afterHeading = content.indexOf('\n', faqMatch.index);
  if (afterHeading === -1) return [];
  const faqStart = afterHeading + 1;

  // Find next ## heading or use end of string
  const nextH2 = content.indexOf('\n## ', faqStart);
  const faqBody = nextH2 === -1 ? content.slice(faqStart) : content.slice(faqStart, nextH2);

  const qas: Array<{ question: string; answer: string }> = [];

  // Split on ### question headings
  const parts = faqBody.split(/\n###\s+/);
  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    const nl = part.indexOf('\n');
    if (nl === -1) continue;
    const question = part.slice(0, nl).trim();
    const rawAnswer = part.slice(nl + 1)
      // Strip self-closing MDX component tags <PlannerCTA /> etc.
      .replace(/<[A-Z][A-Za-z]*\s*\/>/g, '')
      // Strip paired MDX component tags
      .replace(/<[A-Z][A-Za-z]*[^>]*>[\s\S]*?<\/[A-Z][A-Za-z]*>/g, '')
      // Collapse markdown formatting characters
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/`/g, '')
      .trim();

    if (question && rawAnswer) {
      qas.push({ question, answer: rawAnswer });
    }
  }

  return qas;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { content } = await compileMDX({
    source: post.content,
    components: mdxComponents,
    options: { parseFrontmatter: false },
  });

  const related = getRelatedPosts(post);
  const url = `${SITE_URL}/blog/${slug}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished: post.datePublished,
    dateModified: post.dateModified ?? post.datePublished,
    author: PUBLISHER,
    publisher: PUBLISHER,
    isAccessibleForFree: true,
    ...(post.citations.length > 0 && {
      citation: post.citations.map((c) => ({
        '@type': 'CreativeWork',
        name: c.label,
        url: c.url,
      })),
    }),
    keywords: [post.primaryKeyword, ...(post.secondaryKeywords ?? [])].join(', '),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  };

  // FAQPage schema (GEO lever) — emitted only when the post has an ## FAQ section
  const faqPairs = parseFAQSection(post.content);
  const faqSchema =
    faqPairs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqPairs.map(({ question, answer }) => ({
            '@type': 'Question',
            name: question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: answer,
            },
          })),
        }
      : null;

  return (
    <main
      id="main-content"
      style={{ background: 'var(--color-bg)', color: 'var(--color-text)', minHeight: '100vh' }}
    >
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <MulliganButton href="/blog" />
      <HomeButton />

      <div
        style={{
          maxWidth: 720,
          margin: '0 auto',
          padding: 'clamp(4rem, 10vw, 7rem) clamp(1.5rem, 5vw, 3rem) 4rem',
        }}
      >
        {/* Breadcrumb */}
        <nav
          className="mb-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-text-dim"
          style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          aria-label="Breadcrumb"
        >
          <Link href="/blog" className="hover:text-accent transition-colors">
            ← Blog
          </Link>
        </nav>

        {/* Article header */}
        <header style={{ marginBottom: '2.5rem' }}>
          <p
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-dim"
            style={{ fontFamily: 'var(--font-inter), sans-serif', marginBottom: '0.75rem' }}
          >
            {post.primaryKeyword}
          </p>
          <h1
            className="text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.12] text-text"
            style={{
              fontFamily: 'var(--font-space), sans-serif',
              fontWeight: 700,
              letterSpacing: '-0.03em',
            }}
          >
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-text-muted" style={{ maxWidth: 640 }}>
            {post.description}
          </p>

          {/* Meta bar */}
          <div
            className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 border-y border-border py-3 font-mono text-[12px] text-text-dim"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            <span>Tour de Fore</span>
            <span style={{ color: 'var(--color-border)' }}>·</span>
            <time dateTime={post.datePublished}>
              {formatDate(post.dateModified ?? post.datePublished)}
            </time>
            <span style={{ color: 'var(--color-border)' }}>·</span>
            <span>{post.readingMinutes} min read</span>
          </div>
        </header>

        {/* MDX body */}
        <article style={{ paddingBottom: '2rem' }}>{content}</article>

        {/* Citations */}
        {post.citations.length > 0 && (
          <section
            className="mt-12 border-t border-border pt-6"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            <h2
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-dim"
              style={{ marginBottom: '0.75rem' }}
            >
              Sources
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {post.citations.map((c) => (
                <li key={c.url}>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] text-accent hover:underline"
                    style={{ textDecoration: 'none' }}
                  >
                    ↗ {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Related posts */}
        {related.length > 0 && (
          <section className="mt-12 border-t border-border pt-8">
            <h2
              className="text-xl text-text"
              style={{
                fontFamily: 'var(--font-space), sans-serif',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                marginBottom: '1rem',
              }}
            >
              Keep reading
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {related.map((r: Post) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  style={{ textDecoration: 'none' }}
                  className="group rounded-xl border border-border bg-bg-card p-4 transition-colors hover:border-accent/40"
                >
                  <p
                    className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-dim"
                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                  >
                    {r.primaryKeyword}
                  </p>
                  <p
                    className="mt-1.5 text-[17px] leading-snug text-text group-hover:text-accent"
                    style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700 }}
                  >
                    {r.title}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm text-accent">
                    Read →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
