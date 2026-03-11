import { Hero } from '@/components/hero';
import { AboutSection } from '@/components/about-section';
import { ServicesSection } from '@/components/services-section';
import { ProjectsSection } from '@/components/projects-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { BlogSection } from '@/components/blog-section';
import { ContactSection } from '@/components/contact-section';
import { CTASection } from '@/components/cta-section';
import { serviceService } from '@/services/service.service';
import { projectService } from '@/services/project.service';
import { testimonialService } from '@/services/testimonial.service';
import { blogPostService } from '@/services/blog-post.service';
import { pageService } from '@/services/page.service';
import { extractTextFromBlocks, truncateText } from '@/lib/content-utils';
import type { ApiService } from '@/components/services-section';
import type { ApiProject } from '@/components/projects-section';
import type { ApiTestimonial } from '@/components/testimonials-section';
import type { ApiBlogPost } from '@/components/blog-section';
import type { HomePage, ContactPage, AboutPage, SiteSettings } from '@/types/content';

export default async function Home() {
  // Fetch data from Strapi
  let services: ApiService[] = [];
  let projects: ApiProject[] = [];
  let testimonials: ApiTestimonial[] = [];
  let blogPosts: ApiBlogPost[] = [];
  let homePage: HomePage | undefined = undefined;
  let aboutPage: AboutPage | undefined = undefined;
  let contactPage: ContactPage | undefined = undefined;
  let siteSettings: SiteSettings | undefined = undefined;

  try {
    const servicesData = await serviceService.getAll();
    services = servicesData.map((service) => ({
      title: service.title,
      description: service.shortDescription || service.fullDescription || '',
      slug: service.slug,
    }));
  } catch (error) {
    console.error('Failed to fetch services:', error);
  }

  try {
    const projectsData = await projectService.getAll();
    projects = projectsData.map((project) => ({
      title: project.title,
      slug: project.slug,
      description: truncateText(extractTextFromBlocks(project.description)),
      featured: project.featured,
    }));
  } catch (error) {
    console.error('Failed to fetch projects:', error);
  }

  try {
    testimonials = await testimonialService.getAll();
  } catch (error) {
    console.error('Failed to fetch testimonials:', error);
  }

  try {
    const blogPostsData = await blogPostService.getAll();
    blogPosts = blogPostsData.map((post) => ({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      featured: post.featured,
      publishedAt: post.publishedAt,
      author: post.author,
    }));
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
  }

  try {
    homePage = await pageService.home();
  } catch (error) {
    console.error('Failed to fetch home page:', error);
  }

  try {
    aboutPage = await pageService.about();
  } catch (error) {
    console.error('Failed to fetch about page:', error);
  }

  try {
    contactPage = await pageService.contact();
  } catch (error) {
    console.error('Failed to fetch contact page:', error);
  }

  try {
    siteSettings = await pageService.siteSettings();
  } catch (error) {
    console.error('Failed to fetch site settings:', error);
  }

  return (
    <>
      <Hero homePage={homePage} />
      <AboutSection aboutPage={aboutPage} />
      <ServicesSection services={services} />
      <ProjectsSection projects={projects} />
      <TestimonialsSection testimonials={testimonials} />
      <BlogSection posts={blogPosts} />
      <ContactSection contactPage={contactPage} siteSettings={siteSettings} />
      <CTASection />
    </>
  );
}
