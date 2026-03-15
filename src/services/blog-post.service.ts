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
    const response = await apiClient.get<StrapiListResponse<BlogPost>>(ENDPOINT, {
      ...params,
      populate: {
        featuredImage: {
          fields: ['url', 'alternativeText', 'width', 'height', 'formats'],
        },
        ...((params?.populate as Record<string, unknown>) || {}),
      },
    });
    return response.data.data;
  },

  /**
   * Get a single blog post by ID
   */
  async getById(id: number, params?: QueryParams) {
    const response = await apiClient.get<StrapiSingleResponse<BlogPost>>(`${ENDPOINT}/${id}`, {
      ...params,
      populate: {
        featuredImage: {
          fields: ['url', 'alternativeText', 'width', 'height', 'formats'],
        },
        ...((params?.populate as Record<string, unknown>) || {}),
      },
    });
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
      populate: {
        featuredImage: {
          fields: ['url', 'alternativeText', 'width', 'height', 'formats'],
        },
        gallery: {
          fields: ['url', 'alternativeText', 'width', 'height', 'formats'],
        },
        ...((params?.populate as Record<string, unknown>) || {}),
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
      populate: {
        featuredImage: {
          fields: ['url', 'alternativeText', 'width', 'height', 'formats'],
        },
      },
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
      populate: {
        featuredImage: {
          fields: ['url', 'alternativeText', 'width', 'height', 'formats'],
        },
      },
    });
    return response.data.data;
  },
};
