/**
 * Service Service
 * Handles all API operations for services
 */

import { apiClient } from '@/lib/api-client';
import { extractTextFromBlocks } from '@/lib/content-utils';
import type { QueryParams, StrapiListResponse } from '@/types/api';
import type { Service } from '@/types/content';

const ENDPOINT = '/services';

export const serviceService = {
  async getAll(params?: QueryParams) {
    const response = await apiClient.get<StrapiListResponse<Service>>(ENDPOINT, {
      ...params,
      populate: {
        icon: {
          fields: ['url', 'alternativeText'],
        },
      },
    });
    // Strapi v5 returns flat data, v4 had attributes wrapper
    return response.data.data
      .map((item) => ({
        title: item.title || '',
        slug: item.slug || '',
        shortDescription: item.shortDescription || item.description || '',
        fullDescription: item.fullDescription || item.description || '',
        icon: item.icon
          ? {
              url: item.icon.url,
              alternativeText: item.icon.alternativeText,
            }
          : undefined,
      }))
      .filter((item) => item.title && item.slug);
  },

  async getBySlug(slug: string, params?: QueryParams) {
    const response = await apiClient.get<StrapiListResponse<Service>>(ENDPOINT, {
      ...params,
      filters: {
        slug: { $eq: slug },
      },
    });
    return response.data.data[0] || undefined;
  },

  async getFeatured(limit = 6) {
    const response = await apiClient.get<StrapiListResponse<Service>>(ENDPOINT, {
      sort: ['publishedAt:desc'],
      filters: { featured: { $eq: true } },
      pagination: { limit },
      populate: {
        icon: {
          fields: ['url', 'alternativeText'],
        },
      },
    });
    // Map and extract text from blocks
    return response.data.data
      .map((item) => ({
        title: item.title || '',
        slug: item.slug || '',
        shortDescription: extractTextFromBlocks(item.description) || '',
        fullDescription: extractTextFromBlocks(item.description) || '',
        icon: item.icon
          ? {
              url: item.icon.url,
              alternativeText: item.icon.alternativeText,
            }
          : undefined,
      }))
      .filter((item) => item.title && item.slug);
  },
};
