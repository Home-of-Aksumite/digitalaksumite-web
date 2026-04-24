import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/container';
import { cn } from '@/lib/utils';
import { blogPostService } from '@/services/blog-post.service';
import { cmsOrigin, siteUrl } from '@/config/env';
import { BlogContent } from '@/components/blog-content';
import { ArrowLeft, Calendar, Clock, User, Share2, ChevronRight, Home } from 'lucide-react';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await blogPostService.getBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found | Digital Aksumite Blog',
      description: 'The requested blog post could not be found.',
    };
  }

  const postUrl = `${siteUrl}/blog/${slug}`;
  const imageUrl = post.featuredImage
    ? post.featuredImage.url.startsWith('http')
      ? post.featuredImage.url
      : `${cmsOrigin}${post.featuredImage.url}`
    : `${siteUrl}/og-image.png`;

  return {
    title: `${post.title} | Digital Aksumite Blog`,
    description:
      post.excerpt ||
      'Read insights from Digital Aksumite on digital transformation, software development, and enterprise solutions.',
    keywords: post.tags?.join(', ') || 'blog, digital transformation, software development',
    authors: post.author ? [{ name: post.author }] : [{ name: 'Digital Aksumite' }],
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt || 'Read insights from Digital Aksumite.',
      type: 'article',
      url: postUrl,
      siteName: 'Digital Aksumite',
      locale: 'en_US',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: post.author ? [post.author] : undefined,
      tags: post.tags,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.featuredImage?.alternativeText || post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || 'Read insights from Digital Aksumite.',
      images: [imageUrl],
      creator: '@digitalaksumite',
      site: '@digitalaksumite',
    },
  };
}

// Calculate reading time
function calculateReadingTime(content: unknown): number {
  if (typeof content === 'string') {
    const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
    return Math.max(1, Math.ceil(wordCount / 200));
  }

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
      : `${cmsOrigin}${post.featuredImage.url}`
    : undefined;

  // Article structured data for Google rich results
  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: featuredImageUrl || `${siteUrl}/og-image.png`,
    author: {
      '@type': 'Person',
      name: post.author || 'Digital Aksumite',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Digital Aksumite',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.svg`,
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${slug}`,
    },
    keywords: post.tags?.join(', '),
  };

  // Get gallery images
  const galleryImages =
    post.gallery?.map((img) => ({
      url: img.url.startsWith('http') ? img.url : `${cmsOrigin}${img.url}`,
      alt: img.alternativeText || post.title,
    })) || [];

  const galleryOnlyImages = galleryImages;

  // Determine grid layout based on image count
  const getGridClasses = (count: number) => {
    if (count === 1) return 'grid-cols-1 max-w-2xl mx-auto';
    if (count === 2) return 'grid-cols-1 md:grid-cols-2';
    if (count === 3) return 'grid-cols-1 md:grid-cols-3';
    if (count === 4) return 'grid-cols-1 md:grid-cols-2';
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'; // 5+
  };

  // Determine aspect ratio based on image count
  const getAspectClass = (count: number) => {
    if (count === 1) return 'aspect-[16/9]';
    if (count === 2) return 'aspect-[4/3]';
    return 'aspect-[4/3]';
  };

  return (
    <>
      {/* Article Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
      <main className={cn('min-h-screen', 'bg-[#FAFAF5]', 'dark:bg-[#18181B]')}>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-[#0F2A44] py-20 md:py-28">
          {/* Breadcrumb */}
          <Container className="relative z-10">
            <nav className="flex items-center gap-3 py-4">
              <Link
                href="/"
                className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 transition-all duration-300 hover:border-[#C9A227]/30 hover:bg-[#C9A227]/20"
              >
                <Home className="h-4 w-4 text-[#C9A227] transition-transform group-hover:scale-110" />
                <span className="text-sm font-medium text-white/90 transition-colors group-hover:text-[#C9A227]">
                  Home
                </span>
              </Link>
              <ChevronRight className="h-4 w-4 text-[#C9A227]/50" />
              <Link
                href="/#blog"
                className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 transition-all duration-300 hover:border-[#C9A227]/30 hover:bg-[#C9A227]/20"
              >
                <span className="text-sm font-medium text-white/90 transition-colors group-hover:text-[#C9A227]">
                  Blog
                </span>
              </Link>
              <ChevronRight className="h-4 w-4 text-[#C9A227]/50" />
              <span className="max-w-[200px] truncate rounded-full border border-[#C9A227]/20 bg-[#C9A227]/10 px-3 py-1.5 text-sm font-semibold text-[#C9A227] sm:max-w-[300px]">
                {post.title}
              </span>
            </nav>
          </Container>

          {/* Background with gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F2A44] to-[#0a1929]" />

          {/* Decorative glow elements - matching About page */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 h-64 w-64 rounded-full bg-[#C9A227] opacity-10 blur-3xl" />
            <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-[#C9A227] opacity-10 blur-3xl" />
            <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-[#C9A227]/5 blur-3xl" />
            <div className="absolute right-10 bottom-20 h-96 w-96 rounded-full bg-[#C9A227]/3 blur-3xl" />
          </div>

          <Container className="relative z-10 pt-8 pb-24 md:pt-12 md:pb-16">
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
        </section>

        {/* Content Section */}
        <section className={cn('pt-12 pb-16 md:pt-16', 'bg-[#FAFAF5]', 'dark:bg-[#18181B]')}>
          <Container>
            <div className="mx-auto max-w-3xl">
              {featuredImageUrl && (
                <figure
                  className={cn(
                    'relative mb-10 overflow-hidden rounded-2xl shadow-lg',
                    'aspect-[16/9]',
                    'ring-1 ring-gray-100',
                    'dark:ring-[#C9A227]/20'
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={featuredImageUrl}
                    alt={post.featuredImage?.alternativeText || post.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </figure>
              )}

              {/* Excerpt Card */}
              <div
                className={cn(
                  'relative mb-12 overflow-hidden rounded-2xl border p-6 md:p-8',
                  'transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
                  // Light mode: white card
                  'border-gray-200 bg-white',
                  // Dark mode: dark card
                  'dark:border-[#C9A227]/10 dark:bg-[#1F2937]'
                )}
              >
                {/* Left golden accent line */}
                <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-[#C9A227] to-[#C9A227]/50" />
                <p
                  className={cn(
                    'text-lg leading-relaxed italic md:text-xl',
                    'text-[#475569]',
                    'dark:text-[#E5E7EB]/90'
                  )}
                >
                  &ldquo;{post.excerpt}&rdquo;
                </p>
              </div>

              {/* Main Content */}
              <BlogContent content={post.content} />

              {/* Gallery */}
              {galleryOnlyImages.length > 0 && (
                <div className="my-12">
                  <h3
                    className={cn(
                      'mb-6 text-center text-sm font-semibold tracking-widest uppercase',
                      'text-[#64748B]',
                      'dark:text-[#64748b]'
                    )}
                  >
                    Gallery
                  </h3>
                  <div className={`grid ${getGridClasses(galleryOnlyImages.length)} gap-6`}>
                    {galleryOnlyImages.map((image, index) => (
                      <figure
                        key={index}
                        className={cn(
                          `relative ${getAspectClass(galleryOnlyImages.length)} group cursor-pointer overflow-hidden rounded-2xl shadow-lg`,
                          galleryOnlyImages.length === 1 ? 'max-h-[500px]' : '',
                          'ring-1 ring-gray-100',
                          'dark:ring-[#C9A227]/20'
                        )}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={image.url}
                          alt={image.alt}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <div className="absolute right-3 bottom-3 left-3 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                          <p className="truncate text-sm text-white/90">{image.alt}</p>
                        </div>
                      </figure>
                    ))}
                  </div>
                </div>
              )}

              {/* Share Section */}
              <div
                className={cn('mt-16 border-t pt-8', 'border-gray-100', 'dark:border-[#1e293b]')}
              >
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <h3
                      className={cn(
                        'flex items-center gap-2 text-lg font-semibold',
                        'text-[#0F2A44]',
                        'dark:text-white'
                      )}
                    >
                      <Share2 className="h-5 w-5 text-[#C9A227]" />
                      Share this article
                    </h3>
                    <p className={cn('mt-1 text-sm', 'text-[#64748B]', 'dark:text-[#64748b]')}>
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
      </main>
    </>
  );
}
