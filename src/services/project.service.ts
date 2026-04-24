/**
 * Project Service
 * Handles all API operations for projects
 */

import { apiClient } from '@/lib/api-client';
import type { QueryParams } from '@/types/api';
import type { Project } from '@/types/content';

import { fallbackProjects } from './fallback-data';

const ENDPOINT = '/projects';

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

function mapPayloadProject(input: unknown): Project {
  const doc = asRecord(input);
  return {
    title: typeof doc.title === 'string' ? doc.title : '',
    slug: typeof doc.slug === 'string' ? doc.slug : '',
    client: typeof doc.client === 'string' ? doc.client : '',
    summary: typeof doc.summary === 'string' ? doc.summary : '',
    description:
      typeof doc.description === 'string'
        ? doc.description
        : typeof doc.summary === 'string'
          ? doc.summary
          : '',
    featuredImage: doc.featuredImage as unknown as Project['featuredImage'],
    technologies: Array.isArray(doc.technologies)
      ? (doc.technologies as Project['technologies'])
      : [],
    websiteUrl: typeof doc.websiteUrl === 'string' ? doc.websiteUrl : undefined,
    githubUrl: typeof doc.githubUrl === 'string' ? doc.githubUrl : undefined,
    link: typeof doc.link === 'string' ? doc.link : undefined,
    completedDate: typeof doc.completedDate === 'string' ? doc.completedDate : '',
    featured: Boolean(doc.featured),
    order: typeof doc.order === 'number' ? doc.order : Number(doc.order ?? 0),
    seoTitle: typeof doc.seoTitle === 'string' ? doc.seoTitle : undefined,
    seoDescription: typeof doc.seoDescription === 'string' ? doc.seoDescription : undefined,
    createdAt: typeof doc.createdAt === 'string' ? doc.createdAt : new Date().toISOString(),
    updatedAt: typeof doc.updatedAt === 'string' ? doc.updatedAt : new Date().toISOString(),
  };
}

export const projectService = {
  async getAll(params?: QueryParams) {
    try {
      const response = await apiClient.get<PayloadListResponse<unknown>>(ENDPOINT, {
        ...params,
        sort: typeof params?.sort === 'string' ? params.sort : 'order',
        depth: 2,
      });

      return (response.data.docs ?? []).map(mapPayloadProject).filter((p) => p.title && p.slug);
    } catch {
      // Return fallback data when the CMS is unavailable
      return fallbackProjects;
    }
  },

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
      return doc ? mapPayloadProject(doc) : undefined;
    } catch {
      // Return fallback project matching slug or undefined
      return fallbackProjects.find((p) => p.slug === slug);
    }
  },

  async getFeatured(limit = 6) {
    try {
      const response = await apiClient.get<PayloadListResponse<unknown>>(ENDPOINT, {
        where: {
          featured: {
            equals: true,
          },
        },
        limit,
        sort: 'order',
        depth: 2,
      });

      return (response.data.docs ?? []).map(mapPayloadProject).filter((p) => p.title && p.slug);
    } catch {
      // Return fallback data when the CMS is unavailable (limit to requested count)
      return fallbackProjects.slice(0, limit);
    }
  },
};
