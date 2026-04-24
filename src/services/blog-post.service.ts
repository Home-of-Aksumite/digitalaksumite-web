/**
 * BlogPost Service
 * Handles all API operations for blog posts
 */

import { apiClient } from '@/lib/api-client';
import type { QueryParams } from '@/types/api';
import type { BlogPost } from '@/types/content';

import { fallbackBlogPosts } from './fallback-data';

const ENDPOINT = '/blog-posts';

type PayloadListResponse<T> = {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
};

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
}

function mapPayloadBlogPost(input: unknown): BlogPost {
  const doc = asRecord(input);
  const galleryRaw = doc.gallery;
  return {
    title: typeof doc.title === 'string' ? doc.title : '',
    slug: typeof doc.slug === 'string' ? doc.slug : '',
    excerpt: typeof doc.excerpt === 'string' ? doc.excerpt : '',
    content: typeof doc.content === 'string' ? doc.content : '',
    featuredImage: doc.featuredImage as unknown as BlogPost['featuredImage'],
    gallery: Array.isArray(galleryRaw) ? (galleryRaw as BlogPost['gallery']) : [],
    author:
      typeof doc.authorName === 'string'
        ? doc.authorName
        : typeof doc.author === 'string'
          ? doc.author
          : '',
    publishedAt:
      typeof doc.publishedDate === 'string'
        ? doc.publishedDate
        : typeof doc.publishedAt === 'string'
          ? doc.publishedAt
          : '',
    updatedAt: typeof doc.updatedAt === 'string' ? doc.updatedAt : '',
    featured: Boolean(doc.featured),
    tags: Array.isArray(doc.tags) ? (doc.tags as BlogPost['tags']) : [],
    readTime: typeof doc.readTime === 'number' ? doc.readTime : Number(doc.readTime ?? 0),
    seoTitle: typeof doc.seoTitle === 'string' ? doc.seoTitle : undefined,
    seoDescription: typeof doc.seoDescription === 'string' ? doc.seoDescription : undefined,
    createdAt: typeof doc.createdAt === 'string' ? doc.createdAt : '',
  };
}

export const blogPostService = {
  /**
   * Get all blog posts with optional filtering
   */
  async getAll(params?: QueryParams) {
    try {
      const response = await apiClient.get<PayloadListResponse<unknown>>(ENDPOINT, {
        ...params,
        sort: params?.sort ?? '-publishedDate',
      });
      return (response.data.docs ?? []).map(mapPayloadBlogPost);
    } catch {
      // Return fallback data when the CMS is unavailable
      return fallbackBlogPosts;
    }
  },

  /**
   * Get a single blog post by ID
   */
  async getById(id: number, params?: QueryParams) {
    try {
      const response = await apiClient.get<unknown>(`${ENDPOINT}/${id}`, params);
      return mapPayloadBlogPost(response.data);
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
      const response = await apiClient.get<PayloadListResponse<unknown>>(ENDPOINT, {
        ...params,
        where: {
          slug: {
            equals: slug,
          },
        },
        limit: 1,
        depth: 2,
      });

      const doc = response.data.docs?.[0];
      return doc ? mapPayloadBlogPost(doc) : undefined;
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
      const response = await apiClient.get<PayloadListResponse<unknown>>(ENDPOINT, {
        where: {
          featured: {
            equals: true,
          },
        },
        limit,
        sort: '-publishedDate',
        depth: 2,
      });
      return (response.data.docs ?? []).map(mapPayloadBlogPost);
    } catch {
      // Return fallback data when the CMS is unavailable (limit to requested count)
      return fallbackBlogPosts.slice(0, limit);
    }
  },

  /**
   * Get recent blog posts
   */
  async getRecent(limit = 5) {
    try {
      const response = await apiClient.get<PayloadListResponse<unknown>>(ENDPOINT, {
        limit,
        sort: '-publishedDate',
        depth: 2,
      });
      return (response.data.docs ?? []).map(mapPayloadBlogPost);
    } catch {
      // Return fallback data when the CMS is unavailable (limit to requested count)
      return fallbackBlogPosts.slice(0, limit);
    }
  },
};
