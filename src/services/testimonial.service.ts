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
    return response.data;
  },

  async getFeatured(limit = 3) {
    const response = await apiClient.get<StrapiListResponse<Testimonial>>(ENDPOINT, {
      filters: { featured: { $eq: true } },
      pagination: { limit },
      sort: ['order:asc'],
    });
    return response.data;
  },
};
