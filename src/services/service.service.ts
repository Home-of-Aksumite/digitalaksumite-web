/**
 * Service Service
 * Handles all API operations for services
 */

import { apiClient } from '@/lib/api-client';
import { extractTextFromBlocks } from '@/lib/content-utils';
import type { QueryParams } from '@/types/api';
import type { Service } from '@/types/content';

import { fallbackServices } from './fallback-data';

const ENDPOINT = '/services';

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

function mapPayloadService(input: unknown): Service {
  const doc = asRecord(input);
  const description = typeof doc.description === 'string' ? doc.description : '';

  return {
    id: typeof doc.id === 'string' || typeof doc.id === 'number' ? String(doc.id) : '',
    documentId: typeof doc.documentId === 'string' ? doc.documentId : undefined,
    title: typeof doc.title === 'string' ? doc.title : '',
    slug: typeof doc.slug === 'string' ? doc.slug : '',
    shortDescription: typeof doc.shortDescription === 'string' ? doc.shortDescription : description,
    fullDescription: typeof doc.fullDescription === 'string' ? doc.fullDescription : description,
    description,
    icon: doc.icon as unknown as Service['icon'],
    features: Array.isArray(doc.features) ? (doc.features as Service['features']) : [],
    order: typeof doc.order === 'number' ? doc.order : Number(doc.order ?? 0),
    featured: Boolean(doc.featured),
    seoTitle: typeof doc.seoTitle === 'string' ? doc.seoTitle : undefined,
    seoDescription: typeof doc.seoDescription === 'string' ? doc.seoDescription : undefined,
    createdAt: typeof doc.createdAt === 'string' ? doc.createdAt : new Date().toISOString(),
    updatedAt: typeof doc.updatedAt === 'string' ? doc.updatedAt : new Date().toISOString(),
  };
}

export const serviceService = {
  async getAll(params?: QueryParams) {
    try {
      const response = await apiClient.get<PayloadListResponse<unknown>>(ENDPOINT, {
        ...params,
        sort: typeof params?.sort === 'string' ? params.sort : 'order',
        depth: 2,
      });

      return (response.data.docs ?? []).map(mapPayloadService).filter((s) => s.title && s.slug);
    } catch {
      // Return fallback data when the CMS is unavailable
      return fallbackServices;
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
      return doc ? mapPayloadService(doc) : undefined;
    } catch {
      // Return fallback service matching slug or undefined
      return fallbackServices.find((s) => s.slug === slug);
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

      return (response.data.docs ?? [])
        .map((doc) => {
          const mapped = mapPayloadService(doc);
          const desc =
            extractTextFromBlocks((mapped as { description?: unknown }).description) ||
            mapped.shortDescription ||
            '';
          return {
            ...mapped,
            description: desc,
            shortDescription: desc,
            fullDescription: desc,
          };
        })
        .filter((item) => item.title && item.slug);
    } catch {
      // Return fallback data when the CMS is unavailable (limit to requested count)
      return fallbackServices.slice(0, limit);
    }
  },
};
