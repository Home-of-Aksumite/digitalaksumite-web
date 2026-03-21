import { Hero } from '@/components/hero';
import { AboutSection } from '@/components/about-section';
import { ServicesSection } from '@/components/services-section';
import { ProjectsSection } from '@/components/projects-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { BlogSection } from '@/components/blog-section';
import { ContactSection } from '@/components/contact-section';
import { CTASection } from '@/components/cta-section';
import { homeBundleService } from '@/services/home-bundle.service';
import { extractTextFromBlocks, truncateText } from '@/lib/content-utils';
import type { ApiService } from '@/components/services-section';
import type { ApiProject } from '@/components/projects-section';
import type { ApiTestimonial } from '@/components/testimonials-section';
import type { ApiBlogPost } from '@/components/blog-section';

// ISR caching: revalidate every 60 seconds (1 minute delay acceptable per user)
export const revalidate = 60;

export default async function Home() {
  // Fetch all home data in a single optimized request
  const bundle = await homeBundleService.getBundle();

  // Transform data for components
  const services: ApiService[] = bundle.featuredServices.map((service) => ({
    title: service.title,
    description: extractTextFromBlocks(service.description) || '',
    slug: service.slug,
    icon: service.icon,
  }));

  const projects: ApiProject[] = bundle.featuredProjects.map((project) => ({
    title: project.title,
    slug: project.slug,
    description: truncateText(extractTextFromBlocks(project.description)),
    featured: project.featured,
    link: project.link,
    featuredImage: project.featuredImage
      ? {
          url: project.featuredImage.url,
          alternativeText: project.featuredImage.alternativeText,
        }
      : undefined,
  }));

  const testimonials: ApiTestimonial[] = bundle.featuredTestimonials.map((t) => ({
    quote: t.quote,
    clientName: t.clientName,
    company: t.company,
    rating: t.rating,
    featured: t.featured,
    clientPhoto: t.clientPhoto
      ? {
          url: t.clientPhoto.url,
          alternativeText: t.clientPhoto.alternativeText ?? undefined,
        }
      : undefined,
  }));

  const blogPosts: ApiBlogPost[] = bundle.featuredBlogPosts.map((post) => ({
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    featured: post.featured,
    publishedAt: post.publishedAt,
    author: post.author,
    featuredImage: post.featuredImage,
  }));

  return (
    <>
      <Hero homePage={bundle.homePage} trustedPartners={bundle.trustedPartners} />
      <AboutSection aboutPage={bundle.aboutPage} />
      <ServicesSection services={services} />
      <ProjectsSection projects={projects} />
      <TestimonialsSection testimonials={testimonials} />
      <BlogSection posts={blogPosts} />
      <ContactSection contactPage={bundle.contactPage} siteSettings={bundle.siteSettings} />
      <CTASection homePage={bundle.homePage} />
    </>
  );
}
