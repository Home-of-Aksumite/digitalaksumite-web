/**
 * BlogPost Service
 * Handles all API operations for blog posts
 */

import { apiClient } from '@/lib/api-client';
import type { QueryParams, StrapiListResponse, StrapiSingleResponse } from '@/types/api';
import type { BlogPost } from '@/types/content';

const ENDPOINT = '/blog-posts';

export const blogPostService = {
  /**
   * Get all blog posts with optional filtering
   */
  async getAll(params?: QueryParams) {
    const response = await apiClient.get<StrapiListResponse<BlogPost>>(ENDPOINT, params);
    return response.data.data;
  },

  /**
   * Get a single blog post by ID
   */
  async getById(id: number, params?: QueryParams) {
    const response = await apiClient.get<StrapiSingleResponse<BlogPost>>(
      `${ENDPOINT}/${id}`,
      params
    );
    return response.data.data;
  },

  /**
   * Get a single blog post by slug
   */
  async getBySlug(slug: string, params?: QueryParams) {
    const response = await apiClient.get<StrapiListResponse<BlogPost>>(ENDPOINT, {
      ...params,
      filters: {
        slug: { $eq: slug },
      },
    });
    return response.data.data[0] || undefined;
  },

  /**
   * Get featured blog posts
   */
  async getFeatured(limit = 3) {
    const response = await apiClient.get<StrapiListResponse<BlogPost>>(ENDPOINT, {
      filters: {
        featured: { $eq: true },
      },
      pagination: { limit },
      sort: ['publishedAt:desc'],
    });
    return response.data.data;
  },

  /**
   * Get recent blog posts
   */
  async getRecent(limit = 5) {
    const response = await apiClient.get<StrapiListResponse<BlogPost>>(ENDPOINT, {
      pagination: { limit },
      sort: ['publishedAt:desc'],
    });
    return response.data.data;
  },
};

