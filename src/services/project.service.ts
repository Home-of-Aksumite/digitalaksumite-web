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
    return response.data;
  },

  async getBySlug(slug: string, params?: QueryParams) {
    const response = await apiClient.get<StrapiListResponse<Project>>(ENDPOINT, {
      ...params,
      filters: { slug: { $eq: slug } },
    });
    return response.data.data[0] || undefined;
  },

  async getFeatured(limit = 6) {
    const response = await apiClient.get<StrapiListResponse<Project>>(ENDPOINT, {
      filters: { featured: { $eq: true } },
      pagination: { limit },
      sort: ['order:asc'],
    });
    return response.data;
  },
};
