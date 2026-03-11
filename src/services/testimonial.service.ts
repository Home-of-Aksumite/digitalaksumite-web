/**
 * Testimonial Service
 * Handles all API operations for testimonials
 */

import { apiClient } from '@/lib/api-client';
import type { QueryParams, StrapiListResponse } from '@/types/api';
import type { Testimonial } from '@/types/content';

const ENDPOINT = '/testimonials';

export const testimonialService = {
  async getAll(params?: QueryParams) {
    const response = await apiClient.get<StrapiListResponse<Testimonial>>(ENDPOINT, params);
    // Strapi v5 returns flat data - CMS fields: quote, clientName, company, rating, featured
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return response.data.data.map((item: any) => ({
      quote: item.quote || '',
      clientName: item.clientName || 'Anonymous',
      company: item.company || '',
      rating: item.rating || 5,
      featured: item.featured || false,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    })).filter((item: any) => item.quote);
  },

  async getFeatured(limit = 3) {
    const response = await apiClient.get<StrapiListResponse<Testimonial>>(ENDPOINT, {
      filters: { featured: { $eq: true } },
      pagination: { limit },
      sort: ['order:asc'],
    });
    // Strapi v5 returns flat data - CMS fields: quote, clientName, company, rating, featured
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return response.data.data.map((item: any) => ({
      quote: item.quote || '',
      clientName: item.clientName || 'Anonymous',
      company: item.company || '',
      rating: item.rating || 5,
      featured: item.featured || false,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    })).filter((item: any) => item.quote);
  },
};
