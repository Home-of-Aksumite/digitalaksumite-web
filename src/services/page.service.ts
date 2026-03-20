/**
 * Page Service
 * Handles all API operations for single page types
 */

import { apiClient } from '@/lib/api-client';
import type { StrapiSingleResponse } from '@/types/api';
import type {
  HomePage,
  AboutPage,
  ContactPage,
  SiteSettings,
  Navbar,
  Footer,
  PrivacyPolicy,
  TermsOfService,
} from '@/types/content';

import {
  fallbackHomePage,
  fallbackAboutPage,
  fallbackContactPage,
  fallbackSiteSettings,
} from './fallback-data';

export const pageService = {
  home: async () => {
    try {
      const response = await apiClient.get<StrapiSingleResponse<HomePage>>('/home-page', {
        populate: '*',
      });
      return response.data.data;
    } catch {
      // Return fallback data when Strapi is unavailable
      return fallbackHomePage;
    }
  },

  about: async () => {
    try {
      const response = await apiClient.get<StrapiSingleResponse<AboutPage>>('/about-page', {
        populate: '*',
      });
      return response.data.data;
    } catch {
      // Return fallback data when Strapi is unavailable
      return fallbackAboutPage;
    }
  },

  contact: async () => {
    try {
      const response = await apiClient.get<StrapiSingleResponse<ContactPage>>('/contact-page', {
        populate: '*',
      });
      return response.data.data;
    } catch {
      // Return fallback data when Strapi is unavailable
      return fallbackContactPage;
    }
  },

  siteSettings: async () => {
    try {
      const response = await apiClient.get<StrapiSingleResponse<SiteSettings>>('/site-setting', {
        populate: '*',
      });
      return response.data.data;
    } catch {
      // Return fallback data when Strapi is unavailable
      return fallbackSiteSettings;
    }
  },

  navbar: async () => {
    try {
      const response = await apiClient.get<StrapiSingleResponse<Navbar>>('/navbar', {
        populate: '*',
      });
      return response.data.data;
    } catch {
      // Return minimal fallback navbar data
      return {
        logo: { url: '/logo.svg', alternativeText: 'Digital Aksumite' },
        links: [
          { label: 'Home', url: '/' },
          { label: 'About', url: '/about' },
          { label: 'Services', url: '/services' },
          { label: 'Projects', url: '/projects' },
          { label: 'Contact', url: '/contact' },
        ],
        updatedAt: new Date().toISOString(),
      };
    }
  },

  footer: async () => {
    try {
      const response = await apiClient.get<StrapiSingleResponse<Footer>>('/footer', {
        populate: '*',
      });
      return response.data.data;
    } catch {
      // Return minimal fallback footer data
      return {
        description: 'Building systems that define, protect and guide our society.',
        copyrightText: '© 2026 Digital Aksumite. All rights reserved.',
        updatedAt: new Date().toISOString(),
      };
    }
  },

  privacyPolicy: async () => {
    try {
      const response = await apiClient.get<StrapiSingleResponse<PrivacyPolicy>>('/privacy-policy', {
        populate: '*',
      });
      return response.data.data;
    } catch {
      // Return minimal fallback privacy policy
      return {
        pageTitle: 'Privacy Policy',
        pageDescription: 'Your Data. Your Trust. Our Responsibility.',
        sections: [],
        lastUpdated: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }
  },

  termsOfService: async () => {
    try {
      const response = await apiClient.get<StrapiSingleResponse<TermsOfService>>(
        '/terms-of-service',
        { populate: '*' }
      );
      return response.data.data;
    } catch {
      // Return minimal fallback terms of service
      return {
        pageTitle: 'Terms of Service',
        pageDescription: 'Clear Agreements. Fair Terms. Delivered As Promised.',
        sections: [],
        lastUpdated: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }
  },
};
