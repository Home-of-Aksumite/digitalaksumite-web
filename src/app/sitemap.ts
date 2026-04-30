import type { MetadataRoute } from 'next';
import { siteUrl } from '@/config/env';
// import { pageService } from '@/services/page.service';
import { blogPostService } from '@/services/blog-post.service';
import { jobService } from '@/services/job.service';
import type { BlogPost, JobOpening } from '@/types/content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteUrl;

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  // Dynamic blog posts
  let blogPosts: MetadataRoute.Sitemap = [];
  try {
    const posts = await blogPostService.getAll();
    blogPosts = posts.map((post: BlogPost) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  } catch (error) {
    // If blog service fails, continue without blog posts
    console.log('Sitemap: blog posts skipped due to CMS error');
  }

  // Dynamic job openings
  let jobOpenings: MetadataRoute.Sitemap = [];
  try {
    const jobs = await jobService.openings.getAll();
    jobOpenings = jobs.map((job: JobOpening) => ({
      url: `${baseUrl}/careers/${job.slug}`,
      lastModified: job.updatedAt ? new Date(job.updatedAt) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch (error) {
    // If job service fails, continue without job openings
    console.log('Sitemap: job openings skipped due to CMS error');
  }

  // Always return at minimum the static routes so sitemap never fails completely
  const allRoutes = [...staticRoutes, ...blogPosts, ...jobOpenings];
  console.log(`Sitemap generated with ${allRoutes.length} routes`);
  return allRoutes;
}
