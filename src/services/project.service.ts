/**
 * Project Service
 * Handles all API operations for projects
 */

import { apiClient } from '@/lib/api-client';
import type { QueryParams, StrapiListResponse } from '@/types/api';
import type { Project } from '@/types/content';

const ENDPOINT = '/projects';

export const projectService = {
  async getAll(params?: QueryParams) {
    const response = await apiClient.get<StrapiListResponse<Project>>(ENDPOINT, params);
    // Strapi v5 returns flat data
    return response.data.data
      .map((item) => ({
        title: item.title,
        slug: item.slug,
        description: item.description || item.summary || '',
        featured: item.featured,
      }))
      .filter((item) => item.title && item.slug);
  },

  async getBySlug(slug: string, params?: QueryParams) {
    const response = await apiClient.get<StrapiListResponse<Project>>(ENDPOINT, {
      ...params,
      filters: { slug: { $eq: slug } },
    });
    const item = response.data.data[0];
    if (!item) return undefined;
    return {
      title: item.title,
      slug: item.slug,
      description: item.description || item.summary || '',
      featured: item.featured || false,
    };
  },

  async getFeatured(limit = 6) {
    const response = await apiClient.get<StrapiListResponse<Project>>(ENDPOINT, {
      filters: { featured: { $eq: true } },
      pagination: { limit },
      sort: ['order:asc'],
    });
    // Strapi v5 returns flat data
    return response.data.data
      .map((item) => ({
        title: item.title,
        slug: item.slug,
        description: item.description || item.summary || '',
        featured: item.featured,
      }))
      .filter((item) => item.title && item.slug);
  },
};
