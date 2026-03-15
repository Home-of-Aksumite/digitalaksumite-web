import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/container';
import { blogPostService } from '@/services/blog-post.service';
import { strapiApiUrl } from '@/config/env';
import { BlogContent } from '@/components/blog-content';
import { ArrowLeft, Calendar, Clock, User, Share2, ChevronRight } from 'lucide-react';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await blogPostService.getBySlug(slug);

  return {
    title: post ? `${post.title} | Digital Aksumite Blog` : 'Post Not Found',
    description: post?.excerpt || 'Blog post not found',
  };
}

// Calculate reading time
function calculateReadingTime(content: unknown): number {
  if (!content || !Array.isArray(content)) return 3;

  let wordCount = 0;
  for (const block of content) {
    if (typeof block === 'object' && block !== null) {
      const b = block as Record<string, unknown>;
      if (Array.isArray(b.children)) {
        for (const child of b.children) {
          if (typeof child === 'object' && child !== null) {
            const c = child as Record<string, unknown>;
            if (typeof c.text === 'string') {
              wordCount += c.text.split(/\s+/).length;
            }
          }
        }
      }
    }
  }
  return Math.max(1, Math.ceil(wordCount / 200));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await blogPostService.getBySlug(slug);

  if (!post) {
    notFound();
  }

  const readingTime = calculateReadingTime(post.content);

  // Get featured image URL
  const featuredImageUrl = post.featuredImage
    ? post.featuredImage.url.startsWith('http')
      ? post.featuredImage.url
      : `${strapiApiUrl}${post.featuredImage.url}`
    : undefined;

  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      {/* Navigation Breadcrumb */}
      <div className="border-b border-gray-100 bg-white dark:border-gray-800 dark:bg-[#0a0a0a]">
        <Container>
          <nav className="flex items-center gap-2 py-4 text-sm">
            <Link href="/" className="text-gray-500 transition-colors hover:text-[#C9A227]">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Link href="/#blog" className="text-gray-500 transition-colors hover:text-[#C9A227]">
              Blog
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="max-w-[200px] truncate font-medium text-gray-900 sm:max-w-[300px] dark:text-gray-100">
              {post.title}
            </span>
          </nav>
        </Container>
      </div>

      {/* Hero Section with Featured Image */}
      <section className="relative">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F2A44] to-[#0a1929]" />

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-[#C9A227]/5 blur-3xl" />
          <div className="absolute right-10 bottom-20 h-96 w-96 rounded-full bg-[#C9A227]/3 blur-3xl" />
        </div>

        <Container className="relative z-10 pt-16 pb-24 md:pt-24 md:pb-32">
          {/* Back Link */}
          <Link
            href="/#blog"
            className="group mb-8 inline-flex items-center gap-2 text-[#E5E7EB]/70 transition-colors hover:text-[#C9A227]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-medium">Back to articles</span>
          </Link>

          {/* Title */}
          <h1 className="max-w-4xl text-3xl leading-tight font-bold text-white md:text-4xl lg:text-5xl xl:text-6xl">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="mt-8 flex flex-wrap items-center gap-6 text-[#E5E7EB]/80">
            {post.author && (
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#C9A227]/20">
                  <User className="h-4 w-4 text-[#C9A227]" />
                </div>
                <span className="text-sm font-medium">{post.author}</span>
              </div>
            )}

            {post.publishedAt && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#C9A227]" />
                <time dateTime={post.publishedAt} className="text-sm">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#C9A227]" />
              <span className="text-sm">{readingTime} min read</span>
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#C9A227]/20 bg-[#C9A227]/10 px-3 py-1 text-xs font-medium text-[#C9A227]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </Container>

        {/* Featured Image */}
        {featuredImageUrl && (
          <div className="relative z-10 -mb-16 md:-mb-24">
            <Container>
              <div className="relative aspect-[21/9] overflow-hidden rounded-2xl shadow-2xl ring-4 ring-white md:aspect-[3/1] dark:ring-gray-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featuredImageUrl}
                  alt={post.featuredImage?.alternativeText || post.title}
                  className="h-full w-full object-cover"
                />
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </Container>
          </div>
        )}
      </section>

      {/* Content Section */}
      <section className="pt-24 pb-16 md:pt-32">
        <Container>
          <div className="mx-auto max-w-3xl">
            {/* Excerpt Card */}
            <div className="mb-12 rounded-2xl border-l-4 border-[#C9A227] bg-gradient-to-br from-[#F9FAFB] to-[#F3F4F6] p-6 md:p-8 dark:from-[#1F2937] dark:to-[#111827]">
              <p className="text-lg leading-relaxed text-[#6B7280] italic md:text-xl dark:text-[#9CA3AF]">
                &ldquo;{post.excerpt}&rdquo;
              </p>
            </div>

            {/* Main Content */}
            <BlogContent content={post.content} />

            {/* Share Section */}
            <div className="mt-16 border-t border-gray-200 pt-8 dark:border-gray-800">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                    <Share2 className="h-5 w-5 text-[#C9A227]" />
                    Share this article
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Found this helpful? Share it with your network.
                  </p>
                </div>
                <div className="flex gap-3">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent('https://digitalaksumite.com/blog/' + post.slug)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#1DA1F2]/10 px-4 py-2 text-sm font-medium text-[#1DA1F2] transition-colors hover:bg-[#1DA1F2]/20"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    Twitter
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent('https://digitalaksumite.com/blog/' + post.slug)}&title=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#0A66C2]/10 px-4 py-2 text-sm font-medium text-[#0A66C2] transition-colors hover:bg-[#0A66C2]/20"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Back to Blog Link */}
            <div className="mt-12 text-center">
              <Link
                href="/#blog"
                className="group inline-flex items-center gap-2 font-medium text-[#C9A227] transition-colors hover:text-[#b8921f]"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Read more articles
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Decorative bottom section */}
      <div className="bg-[#0F2A44] py-16">
        <Container>
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2">
              <div className="h-px w-8 bg-[#C9A227]/50" />
              <span className="text-sm font-medium tracking-wider text-[#C9A227] uppercase">
                Digital Aksumite
              </span>
              <div className="h-px w-8 bg-[#C9A227]/50" />
            </div>
            <p className="mx-auto max-w-md text-gray-400">
              Building digital infrastructure that endures. Software systems with a hundred-year
              perspective.
            </p>
          </div>
        </Container>
      </div>
    </main>
  );
}
