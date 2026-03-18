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
    const response = await apiClient.get<StrapiListResponse<Testimonial>>(ENDPOINT, {
      ...params,
      populate: {
        clientPhoto: {
          fields: ['url', 'alternativeText', 'width', 'height', 'formats'],
        },
      },
    });
    // Strapi v5 returns flat data - CMS fields: quote, clientName, company, rating, featured, clientPhoto

    return response.data.data
      .map((item) => ({
        quote: item.quote || '',
        clientName: item.clientName || 'Anonymous',
        company: item.company || '',
        rating: item.rating || 5,
        featured: item.featured || false,
        clientPhoto: item.clientPhoto
          ? {
              url: item.clientPhoto.url,
              alternativeText: item.clientPhoto.alternativeText ?? undefined,
            }
          : undefined,
      }))
      .filter((item) => item.quote);
  },

  async getFeatured(limit = 3) {
    const response = await apiClient.get<StrapiListResponse<Testimonial>>(ENDPOINT, {
      filters: { featured: { $eq: true } },
      pagination: { limit },
      sort: ['publishedAt:desc'],
      populate: {
        clientPhoto: {
          fields: ['url', 'alternativeText', 'width', 'height', 'formats'],
        },
      },
    });
    // Strapi v5 returns flat data - CMS fields: quote, clientName, company, rating, featured, clientPhoto

    return response.data.data
      .map((item) => ({
        quote: item.quote || '',
        clientName: item.clientName || 'Anonymous',
        company: item.company || '',
        rating: item.rating || 5,
        featured: item.featured || false,
        clientPhoto: item.clientPhoto
          ? {
              url: item.clientPhoto.url,
              alternativeText: item.clientPhoto.alternativeText ?? undefined,
            }
          : undefined,
      }))
      .filter((item) => item.quote);
  },
};
