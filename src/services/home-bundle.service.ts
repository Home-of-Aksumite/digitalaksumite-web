/**
 * Home Bundle Service
 * Fetches all home page data in a single optimized request
 */

import { apiClient } from '@/lib/api-client';
import type {
  HomePage,
  AboutPage,
  ContactPage,
  SiteSettings,
  Footer,
  Service,
  Project,
  Testimonial,
  BlogPost,
  TrustedPartner,
} from '@/types/content';

import {
  fallbackHomePage,
  fallbackAboutPage,
  fallbackContactPage,
  fallbackSiteSettings,
  fallbackFooter,
  fallbackServices,
  fallbackProjects,
  fallbackTestimonials,
  fallbackBlogPosts,
  fallbackTrustedPartners,
} from './fallback-data';

export interface HomeBundleData {
  homePage: HomePage;
  aboutPage: AboutPage;
  contactPage: ContactPage;
  siteSettings: SiteSettings;
  footer: Footer;
  featuredServices: Service[];
  featuredProjects: Project[];
  featuredTestimonials: Testimonial[];
  featuredBlogPosts: BlogPost[];
  trustedPartners: TrustedPartner[];
}

export const homeBundleService = {
  async getBundle(): Promise<HomeBundleData> {
    try {
      const response = await apiClient.get<{ data: HomeBundleData; meta: { timestamp: string } }>(
        '/home-bundle'
      );

      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch home bundle:', error);

      // Return comprehensive fallback data
      return {
        homePage: fallbackHomePage,
        aboutPage: fallbackAboutPage,
        contactPage: fallbackContactPage,
        siteSettings: fallbackSiteSettings,
        footer: fallbackFooter,
        featuredServices: fallbackServices.slice(0, 6),
        featuredProjects: fallbackProjects.slice(0, 6),
        featuredTestimonials: fallbackTestimonials.slice(0, 3),
        featuredBlogPosts: fallbackBlogPosts.slice(0, 3),
        trustedPartners: fallbackTrustedPartners,
      };
    }
  },
};
