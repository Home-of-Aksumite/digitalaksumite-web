/**
 * Page Service
 * Handles all API operations for single page types
 * Optimized: Uses targeted populate/fields instead of populate='*'
 */

import { apiClient } from '@/lib/api-client';
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
      const response = await apiClient.get<HomePage>('/globals/home-page');
      return response.data;
    } catch {
      return fallbackHomePage;
    }
  },

  about: async () => {
    try {
      const response = await apiClient.get<AboutPage>('/globals/about-page');
      return response.data;
    } catch {
      return fallbackAboutPage;
    }
  },

  contact: async () => {
    try {
      const response = await apiClient.get<ContactPage>('/globals/contact-page');
      return response.data;
    } catch {
      return fallbackContactPage;
    }
  },

  siteSettings: async () => {
    try {
      const response = await apiClient.get<SiteSettings>('/globals/site-settings');
      return response.data;
    } catch {
      return fallbackSiteSettings;
    }
  },

  navbar: async () => {
    try {
      const response = await apiClient.get<Navbar>('/globals/navbar');
      return response.data;
    } catch {
      return {
        logo: { url: '/logo.svg', alternativeText: 'Digital Aksumite' },
        updatedAt: new Date().toISOString(),
      };
    }
  },

  footer: async () => {
    try {
      const response = await apiClient.get<Footer>('/globals/footer');
      return response.data;
    } catch {
      return {
        description: 'Building systems that define, protect and guide our society.',
        copyrightText: `© ${new Date().getFullYear()} Digital Aksumite. All rights reserved.`,
        updatedAt: new Date().toISOString(),
      };
    }
  },

  privacyPolicy: async () => {
    try {
      const response = await apiClient.get<PrivacyPolicy>('/globals/privacy-policy');
      return response.data;
    } catch {
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
      const response = await apiClient.get<TermsOfService>('/globals/terms-of-service');
      return response.data;
    } catch {
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
