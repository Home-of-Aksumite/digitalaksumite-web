/**
 * BlogPost Service
 * Handles all API operations for blog posts
 */

import { apiClient } from '@/lib/api-client';
import type { QueryParams, StrapiListResponse, StrapiSingleResponse } from '@/types/api';
import type { BlogPost } from '@/types/content';

import { fallbackBlogPosts } from './fallback-data';

const ENDPOINT = '/blog-posts';

export const blogPostService = {
  /**
   * Get all blog posts with optional filtering
   */
  async getAll(params?: QueryParams) {
    try {
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
    } catch {
      // Return fallback data when Strapi is unavailable
      return fallbackBlogPosts;
    }
  },

  /**
   * Get a single blog post by ID
   */
  async getById(id: number, params?: QueryParams) {
    try {
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
    } catch {
      // Cannot find fallback by ID - BlogPost type has no id field
      return undefined;
    }
  },

  /**
   * Get a single blog post by slug
   */
  async getBySlug(slug: string, params?: QueryParams) {
    try {
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
    } catch {
      // Return fallback blog post matching slug or undefined
      return fallbackBlogPosts.find((b) => b.slug === slug);
    }
  },

  /**
   * Get featured blog posts
   */
  async getFeatured(limit = 3) {
    try {
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
    } catch {
      // Return fallback data when Strapi is unavailable (limit to requested count)
      return fallbackBlogPosts.slice(0, limit);
    }
  },

  /**
   * Get recent blog posts
   */
  async getRecent(limit = 5) {
    try {
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
    } catch {
      // Return fallback data when Strapi is unavailable (limit to requested count)
      return fallbackBlogPosts.slice(0, limit);
    }
  },
};
