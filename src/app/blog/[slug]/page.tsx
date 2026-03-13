import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/container';
import { blogPostService } from '@/services/blog-post.service';
import { extractTextFromBlocks } from '@/lib/content-utils';

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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await blogPostService.getBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white dark:bg-[#121212]">
      {/* Hero */}
      <section className="bg-[#0F2A44] py-16">
        <Container>
          <Link
            href="/#blog"
            className="inline-flex items-center text-sm text-[#E5E7EB]/80 hover:text-[#C9A227]"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
          <h1 className="mt-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-[#E5E7EB]/80">
            {post.author && <span>By {post.author}</span>}
            {post.publishedAt && (
              <>
                <span>•</span>
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </>
            )}
          </div>
        </Container>
      </section>

      {/* Content */}
      <Container className="py-12">
        <div className="mx-auto max-w-3xl">
          <article className="prose dark:prose-invert max-w-none">
            <p className="text-lg leading-relaxed text-[#6B7280] dark:text-[#9CA3AF]">
              {post.excerpt}
            </p>
            <div className="mt-8 whitespace-pre-wrap text-[#374151] dark:text-[#E5E7EB]">
              {extractTextFromBlocks(post.content) || post.excerpt}
            </div>
          </article>

          {/* Back to Blog */}
          <div className="mt-12 border-t border-[#E5E7EB] pt-8 dark:border-[#374151]">
            <Link href="/#blog" className="inline-flex items-center text-[#C9A227] hover:underline">
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Read more articles
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  );
}
