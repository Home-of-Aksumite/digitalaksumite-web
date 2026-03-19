/**
 * Service Service
 * Handles all API operations for services
 */

import { apiClient } from '@/lib/api-client';
import { extractTextFromBlocks } from '@/lib/content-utils';
import type { QueryParams, StrapiListResponse } from '@/types/api';
import type { Service } from '@/types/content';

import { fallbackServices } from './fallback-data';

const ENDPOINT = '/services';

export const serviceService = {
  async getAll(params?: QueryParams) {
    try {
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
          id: item.id || '',
          title: item.title || '',
          slug: item.slug || '',
          shortDescription: item.shortDescription || item.description || '',
          fullDescription: item.fullDescription || item.description || '',
          featured: item.featured || false,
          icon: item.icon
            ? {
                url: item.icon.url,
                alternativeText: item.icon.alternativeText,
              }
            : undefined,
        }))
        .filter((item) => item.title && item.slug);
    } catch {
      // Return fallback data when Strapi is unavailable
      return fallbackServices;
    }
  },

  async getBySlug(slug: string, params?: QueryParams) {
    try {
      const response = await apiClient.get<StrapiListResponse<Service>>(ENDPOINT, {
        ...params,
        filters: {
          slug: { $eq: slug },
        },
      });
      return response.data.data[0] || undefined;
    } catch {
      // Return fallback service matching slug or undefined
      return fallbackServices.find((s) => s.slug === slug);
    }
  },

  async getFeatured(limit = 6) {
    try {
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
          id: item.id || '',
          title: item.title || '',
          slug: item.slug || '',
          description: extractTextFromBlocks(item.description) || item.shortDescription || '',
          shortDescription: extractTextFromBlocks(item.description) || item.shortDescription || '',
          fullDescription: extractTextFromBlocks(item.description) || item.fullDescription || '',
          featured: item.featured || false,
          icon: item.icon
            ? {
                url: item.icon.url,
                alternativeText: item.icon.alternativeText,
              }
            : undefined,
        }))
        .filter((item) => item.title && item.slug);
    } catch {
      // Return fallback data when Strapi is unavailable (limit to requested count)
      return fallbackServices.slice(0, limit);
    }
  },
};
