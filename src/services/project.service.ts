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
    return response.data.data.map((item: any) => ({
      title: item.title,
      slug: item.slug,
      description: item.description || item.summary || '',
      featured: item.featured,
    })).filter(Boolean);
  },

  async getBySlug(slug: string, params?: QueryParams) {
    const response = await apiClient.get<StrapiListResponse<Project>>(ENDPOINT, {
      ...params,
      filters: { slug: { $eq: slug } },
    });
    const item = response.data.data[0];
    return item ? {
      title: item.attributes.title || '',
      slug: item.attributes.slug || '',
      description: item.attributes.description || item.attributes.summary || '',
      featured: item.attributes.featured || false,
    } : undefined;
  },

  async getFeatured(limit = 6) {
    const response = await apiClient.get<StrapiListResponse<Project>>(ENDPOINT, {
      filters: { featured: { $eq: true } },
      pagination: { limit },
      sort: ['order:asc'],
    });
    // Strapi v5 returns flat data
    return response.data.data.map((item: any) => ({
      title: item.title,
      slug: item.slug,
      description: item.description || item.summary || '',
      featured: item.featured,
    })).filter(Boolean);
  },
};
