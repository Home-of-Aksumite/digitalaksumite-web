/**
 * Page Service
 * Handles all API operations for single page types
 * Optimized: Uses targeted populate/fields instead of populate='*'
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
        fields: [
          'heroTitle',
          'heroSubtitle',
          'heroPrimaryButtonText',
          'heroPrimaryButtonUrl',
          'heroSecondaryButtonText',
          'heroSecondaryButtonUrl',
          'ctaPrimaryButtonText',
          'ctaPrimaryButtonUrl',
          'ctaSecondaryButtonText',
          'ctaSecondaryButtonUrl',
        ],
      });
      return response.data.data;
    } catch {
      return fallbackHomePage;
    }
  },

  about: async () => {
    try {
      const response = await apiClient.get<StrapiSingleResponse<AboutPage>>('/about-page', {
        fields: ['title', 'mission', 'vision', 'teamIntro', 'history'],
        populate: {
          values: true,
          stats: true,
          companyImages: { fields: ['url', 'alternativeText', 'width', 'height', 'formats'] },
        },
      });
      return response.data.data;
    } catch {
      return fallbackAboutPage;
    }
  },

  contact: async () => {
    try {
      const response = await apiClient.get<StrapiSingleResponse<ContactPage>>('/contact-page', {
        fields: ['title', 'description', 'formTitle', 'formDescription'],
      });
      return response.data.data;
    } catch {
      return fallbackContactPage;
    }
  },

  siteSettings: async () => {
    try {
      const response = await apiClient.get<StrapiSingleResponse<SiteSettings>>('/site-setting', {
        fields: [
          'siteName',
          'companyEmail',
          'companyPhone',
          'companyAddress',
          'linkedin',
          'twitter',
          'github',
          'instagram',
          'facebook',
          'defaultSEODescription',
        ],
        populate: {
          logo: { fields: ['url', 'alternativeText', 'width', 'height'] },
          favicon: { fields: ['url', 'alternativeText'] },
        },
      });
      return response.data.data;
    } catch {
      return fallbackSiteSettings;
    }
  },

  navbar: async () => {
    try {
      const response = await apiClient.get<StrapiSingleResponse<Navbar>>('/navbar', {
        populate: {
          logo: { fields: ['url', 'alternativeText', 'width', 'height'] },
        },
      });
      return response.data.data;
    } catch {
      return {
        logo: { url: '/logo.svg', alternativeText: 'Digital Aksumite' },
        updatedAt: new Date().toISOString(),
      };
    }
  },

  footer: async () => {
    try {
      const response = await apiClient.get<StrapiSingleResponse<Footer>>('/footer', {
        fields: ['description', 'copyrightText'],
      });
      return response.data.data;
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
      const response = await apiClient.get<StrapiSingleResponse<PrivacyPolicy>>('/privacy-policy', {
        fields: ['pageTitle', 'pageDescription', 'lastUpdated', 'sections'],
      });
      return response.data.data;
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
      const response = await apiClient.get<StrapiSingleResponse<TermsOfService>>(
        '/terms-of-service',
        {
          fields: ['pageTitle', 'pageDescription', 'lastUpdated', 'sections'],
        }
      );
      return response.data.data;
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
