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
    // Strapi v5 returns flat data
    return response.data.data.map((item: any) => ({
      title: item.title || '',
      slug: item.slug || '',
      excerpt: item.excerpt || '',
      featured: item.featured || false,
      publishedAt: item.publishedAt || '',
      author: item.author || '',
    })).filter((item: any) => item.title && item.slug);
  },

  /**
   * Get a single blog post by ID
   */
  async getById(id: number, params?: QueryParams) {
    const response = await apiClient.get<StrapiSingleResponse<BlogPost>>(
      `${ENDPOINT}/${id}`,
      params
    );
    return {
      title: response.data.data.title || '',
      slug: response.data.data.slug || '',
      excerpt: response.data.data.excerpt || '',
      featured: response.data.data.featured || false,
      publishedAt: response.data.data.publishedAt || '',
      author: response.data.data.author || '',
    };
  },

  /**
   * Get a single blog post by slug
   */
  async getBySlug(slug: string, params?: QueryParams) {
    const response = await apiClient.get<StrapiListResponse<BlogPost>>(ENDPOINT, {
      ...params,
      filters: {
        slug: {
          $eq: slug,
        },
      },
    });
    return response.data.data[0] ? {
      title: response.data.data[0].title || '',
      slug: response.data.data[0].slug || '',
      excerpt: response.data.data[0].excerpt || '',
      featured: response.data.data[0].featured || false,
      publishedAt: response.data.data[0].publishedAt || '',
      author: response.data.data[0].author || '',
    } : undefined;
  },

  /**
   * Get featured blog posts
   */
  async getFeatured(limit = 3) {
    const response = await apiClient.get<StrapiListResponse<BlogPost>>(ENDPOINT, {
      filters: {
        featured: {
          $eq: true,
        },
      },
      pagination: {
        limit,
      },
      sort: ['publishedAt:desc'],
    });
    // Strapi v5 returns flat data
    return response.data.data.map((item: any) => ({
      title: item.title || '',
      slug: item.slug || '',
      excerpt: item.excerpt || '',
      featured: item.featured || false,
      publishedAt: item.publishedAt || '',
      author: item.author || '',
    })).filter((item: any) => item.title && item.slug);
  },

  /**
   * Get recent blog posts
   */
  async getRecent(limit = 5) {
    const response = await apiClient.get<StrapiListResponse<BlogPost>>(ENDPOINT, {
      pagination: {
        limit,
      },
      sort: ['publishedAt:desc'],
    });
    // Strapi v5 returns flat data
    return response.data.data.map((item: any) => ({
      title: item.title || '',
      slug: item.slug || '',
      excerpt: item.excerpt || '',
      featured: item.featured || false,
      publishedAt: item.publishedAt || '',
      author: item.author || '',
    })).filter((item: any) => item.title && item.slug);
  },
};
