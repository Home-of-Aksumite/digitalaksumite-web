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

export const pageService = {
  home: async () => {
    const response = await apiClient.get<StrapiSingleResponse<HomePage>>('/home-page', {
      populate: '*',
    });
    return response.data.data;
  },

  about: async () => {
    const response = await apiClient.get<StrapiSingleResponse<AboutPage>>('/about-page', {
      populate: '*',
    });
    return response.data.data;
  },

  contact: async () => {
    const response = await apiClient.get<StrapiSingleResponse<ContactPage>>('/contact-page', {
      populate: '*',
    });
    return response.data.data;
  },

  siteSettings: async () => {
    const response = await apiClient.get<StrapiSingleResponse<SiteSettings>>('/site-setting', {
      populate: '*',
    });
    return response.data.data;
  },

  navbar: async () => {
    const response = await apiClient.get<StrapiSingleResponse<Navbar>>('/navbar', {
      populate: '*',
    });
    return response.data.data;
  },

  footer: async () => {
    const response = await apiClient.get<StrapiSingleResponse<Footer>>('/footer', {
      populate: '*',
    });
    return response.data.data;
  },

  privacyPolicy: async () => {
    const response = await apiClient.get<StrapiSingleResponse<PrivacyPolicy>>('/privacy-policy', {
      populate: '*',
    });
    return response.data.data;
  },

  termsOfService: async () => {
    const response = await apiClient.get<StrapiSingleResponse<TermsOfService>>(
      '/terms-of-service',
      { populate: '*' }
    );
    return response.data.data;
  },
};
