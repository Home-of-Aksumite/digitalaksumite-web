/**
 * Blog Section
 * Display latest blog posts from Strapi CMS
 */

import Link from 'next/link';
import { Container } from '@/components/container';
import { cn } from '@/lib/utils';

// API BlogPost interface (matches Strapi response)
export interface ApiBlogPost {
  title: string;
  slug: string;
  excerpt: string;
  featured?: boolean;
  publishedAt?: string;
  author?: string;
}

interface BlogSectionProps {
  title?: string;
  subtitle?: string;
  posts?: ApiBlogPost[];
}

export function BlogSection({
  title = 'Latest Insights',
  subtitle = 'Stay updated with our thoughts on technology, design, and building digital products.',
  posts = [],
}: BlogSectionProps) {
  // Don't render if no posts
  if (!posts || posts.length === 0) {
    return null;
  }

  // Show max 3 posts
  const displayPosts = posts.slice(0, 3);

  return (
    <section className={cn('py-20 md:py-28', 'bg-[#F9FAFB]', 'dark:bg-[#121212]')}>
      <Container>
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="text-sm font-semibold tracking-wider text-[#C9A227] uppercase">
            From the Blog
          </span>
          <h2
            className={cn(
              'mt-3 text-3xl font-bold tracking-tight md:text-4xl',
              'text-[#0F2A44]',
              'dark:text-white'
            )}
          >
            {title}
          </h2>
          <p
            className={cn(
              'mx-auto mt-4 max-w-2xl text-lg',
              'text-[#6B7280]',
              'dark:text-[#9CA3AF]'
            )}
          >
            {subtitle}
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className={cn(
              'inline-flex items-center rounded-lg px-6 py-3 text-sm font-medium',
              'border border-[#0F2A44] text-[#0F2A44] transition-colors',
              'hover:bg-[#0F2A44] hover:text-white',
              'dark:border-[#E5E7EB] dark:text-[#E5E7EB] dark:hover:bg-[#E5E7EB] dark:hover:text-[#121212]'
            )}
          >
            View All Posts
            <ArrowIcon className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

function BlogCard({ post }: { post: ApiBlogPost }) {
  const href = `/blog/${post.slug}`;
  
  return (
    <Link href={href} className="group block">
      <article
        className={cn(
          'overflow-hidden rounded-xl transition-all duration-300',
          'bg-white shadow-sm hover:shadow-xl',
          'dark:bg-[#1F2937]'
        )}
      >
        {/* Image Placeholder */}
        <div className="relative aspect-[16/9] overflow-hidden bg-[#0F2A44]">
          <div className="flex h-full items-center justify-center text-white">
            <span className="text-lg font-semibold">Blog</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className={cn('mb-2 text-xl font-semibold', 'text-[#0F2A44]', 'dark:text-white')}>
            {post.title}
          </h3>

          {/* Excerpt */}
          <p
            className={cn('text-sm leading-relaxed', 'text-[#6B7280]', 'dark:text-[#9CA3AF]')}
          >
            {post.excerpt}
          </p>

          {/* Read More Link */}
          <div className="mt-4 flex items-center text-sm font-medium text-[#C9A227]">
            <span>Read more</span>
            <ArrowIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </article>
    </Link>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}
