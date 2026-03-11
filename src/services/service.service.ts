/**
 * Service Service
 * Handles all API operations for services
 */

import { apiClient } from '@/lib/api-client';
import type { QueryParams, StrapiListResponse } from '@/types/api';
import type { Service } from '@/types/content';

const ENDPOINT = '/services';

export const serviceService = {
  async getAll(params?: QueryParams) {
    const response = await apiClient.get<StrapiListResponse<Service>>(ENDPOINT, params);
    // Strapi v5 returns flat data, v4 had attributes wrapper
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return response.data.data.map((item: any) => ({
      title: item.title || '',
      slug: item.slug || '',
      shortDescription: item.shortDescription || item.description || '',
      fullDescription: item.fullDescription || item.description || '',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    })).filter((item: any) => item.title && item.slug);
  },

  async getBySlug(slug: string, params?: QueryParams) {
    const response = await apiClient.get<StrapiListResponse<Service>>(ENDPOINT, {
      ...params,
      filters: {
        slug: { $eq: slug },
      },
    });
    return response.data.data[0]?.attributes || undefined;
  },

  async getFeatured(limit = 6) {
    const response = await apiClient.get<StrapiListResponse<Service>>(ENDPOINT, {
      filters: { featured: { $eq: true } },
      pagination: { limit },
      sort: ['order:asc'],
    });
    return response.data.data.map((item) => item.attributes);
  },
};
