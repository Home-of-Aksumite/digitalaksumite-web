/**
 * Blog Section
 * Display latest blog posts with hover lift effects
 */

'use client';

import Link from 'next/link';
import { Container } from '@/components/container';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/scroll-reveal';
import { cmsApiUrl } from '@/config/env';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

// API BlogPost interface
export interface ApiBlogPost {
  title: string;
  slug: string;
  excerpt: string;
  featured?: boolean;
  publishedAt?: string;
  author?: string;
  featuredImage?: {
    url: string;
    alternativeText?: string | null;
    width?: number;
    height?: number;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    } | null;
  } | null;
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
  if (!posts || posts.length === 0) {
    return undefined;
  }

  return (
    <section
      id="blog"
      className={cn(
        'border-t border-[#E8E4DC] py-20 md:py-28 lg:py-32',
        'bg-[#FAFAF5]',
        'dark:border-[#2D3748] dark:bg-[#18181B]'
      )}
    >
      <Container>
        {/* Section Header */}
        <div className="mb-12 text-center md:mb-16">
          <ScrollReveal>
            <span className="text-sm font-semibold tracking-widest text-[#C9A227] uppercase">
              From the Blog
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2
              className={cn(
                'mt-3 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl',
                'text-[#0F2A44]',
                'dark:text-white'
              )}
            >
              {title}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p
              className={cn(
                'mx-auto mt-4 max-w-2xl text-base md:text-lg',
                'text-[#6B7280]',
                'dark:text-[#9CA3AF]'
              )}
            >
              {subtitle}
            </p>
          </ScrollReveal>
        </div>

        {/* Posts Grid */}
        <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1}>
          {posts.map((post) => (
            <StaggerItem key={post.slug}>
              <BlogCard post={post} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}

function BlogCard({ post }: { post: ApiBlogPost }) {
  const href = `/blog/${post.slug}`;

  // Get image URL from featuredImage
  const imageUrl = post.featuredImage
    ? post.featuredImage.url.startsWith('http')
      ? post.featuredImage.url
      : `${cmsApiUrl}${post.featuredImage.url}`
    : undefined;

  return (
    <Link href={href} className="group block">
      <motion.article
        className={cn(
          'overflow-hidden rounded-2xl',
          'border border-gray-100 bg-white shadow-sm',
          'dark:border-transparent dark:bg-[#1F2937]',
          'transition-all duration-500',
          'hover:shadow-[0_20px_40px_rgba(15,42,68,0.1)]',
          'dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]'
        )}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Image Container */}
        <div className="relative aspect-[16/9] overflow-hidden bg-[#0F2A44]">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt={post.featuredImage?.alternativeText || post.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-white">
              <span className="text-lg font-semibold">Blog</span>
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F2A44] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-60" />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3
            className={cn(
              'mb-2 text-xl font-semibold',
              'text-[#0F2A44]',
              'dark:text-white',
              'transition-colors duration-300',
              'group-hover:text-[#C9A227]'
            )}
          >
            {post.title}
          </h3>

          <p
            className={cn(
              'text-[15px] leading-relaxed break-words',
              'text-[#475569]',
              'dark:text-[#9CA3AF]'
            )}
          >
            {post.excerpt}
          </p>

          {/* Read More */}
          <div className="mt-4 flex items-center text-sm font-medium text-[#C9A227]">
            <span className="relative">
              Read more
              <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-[#C9A227] transition-all duration-300 group-hover:w-full" />
            </span>
            <ArrowIcon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="h-1 scale-x-0 bg-gradient-to-r from-[#C9A227] via-[#C9A227] to-[#C9A227] transition-transform duration-500 group-hover:scale-x-100" />
      </motion.article>
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
