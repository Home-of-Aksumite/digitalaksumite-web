/**
 * Project Service
 * Handles all API operations for projects
 */

import { apiClient } from '@/lib/api-client';
import type { QueryParams, StrapiListResponse } from '@/types/api';
import type { Project } from '@/types/content';

import { fallbackProjects } from './fallback-data';

const ENDPOINT = '/projects';

export const projectService = {
  async getAll(params?: QueryParams) {
    try {
      const response = await apiClient.get<StrapiListResponse<Project>>(ENDPOINT, {
        ...params,
        populate: {
          featuredImage: {
            fields: ['url', 'alternativeText', 'width', 'height', 'formats'],
          },
        },
      });
      // Strapi v5 returns flat data
      return response.data.data
        .map((item) => ({
          title: item.title,
          slug: item.slug,
          description: item.description || item.summary || '',
          featured: item.featured,
          link: item.link,
          featuredImage: item.featuredImage,
        }))
        .filter((item) => item.title && item.slug);
    } catch {
      // Return fallback data when Strapi is unavailable
      return fallbackProjects;
    }
  },

  async getBySlug(slug: string, params?: QueryParams) {
    try {
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
        link: item.link,
      };
    } catch {
      // Return fallback project matching slug or undefined
      return fallbackProjects.find((p) => p.slug === slug);
    }
  },

  async getFeatured(limit = 6) {
    try {
      const response = await apiClient.get<StrapiListResponse<Project>>(ENDPOINT, {
        filters: { featured: { $eq: true } },
        pagination: { limit },
        sort: ['publishedAt:desc'],
        populate: {
          featuredImage: {
            fields: ['url', 'alternativeText', 'width', 'height', 'formats'],
          },
        },
      });
      // Strapi v5 returns flat data
      return response.data.data
        .map((item) => ({
          title: item.title,
          slug: item.slug,
          description: item.description || item.summary || '',
          featured: item.featured,
          link: item.link,
          featuredImage: item.featuredImage,
        }))
        .filter((item) => item.title && item.slug);
    } catch {
      // Return fallback data when Strapi is unavailable (limit to requested count)
      return fallbackProjects.slice(0, limit);
    }
  },
};
