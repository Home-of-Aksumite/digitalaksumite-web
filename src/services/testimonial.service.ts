/**
 * Testimonial Service
 * Handles all API operations for testimonials
 */

import { apiClient } from '@/lib/api-client';
import type { QueryParams } from '@/types/api';
import type { Testimonial } from '@/types/content';

import { fallbackTestimonials } from './fallback-data';

const ENDPOINT = '/testimonials';

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

function mapPayloadTestimonial(input: unknown): Testimonial {
  const doc = asRecord(input);
  const clientPhoto = asRecord(doc.clientPhoto);
  return {
    quote: typeof doc.quote === 'string' ? doc.quote : '',
    clientName: typeof doc.clientName === 'string' ? doc.clientName : 'Anonymous',
    company: typeof doc.company === 'string' ? doc.company : '',
    rating: typeof doc.rating === 'number' ? doc.rating : Number(doc.rating ?? 5),
    featured: Boolean(doc.featured),
    clientPhoto: doc.clientPhoto
      ? {
          url: typeof clientPhoto.url === 'string' ? clientPhoto.url : '',
          alternativeText:
            typeof clientPhoto.alternativeText === 'string'
              ? clientPhoto.alternativeText
              : typeof clientPhoto.alt === 'string'
                ? clientPhoto.alt
                : undefined,
        }
      : undefined,
    createdAt: typeof doc.createdAt === 'string' ? doc.createdAt : undefined,
    updatedAt: typeof doc.updatedAt === 'string' ? doc.updatedAt : undefined,
  };
}

export const testimonialService = {
  async getAll(params?: QueryParams) {
    try {
      const response = await apiClient.get<PayloadListResponse<unknown>>(ENDPOINT, {
        ...params,
        sort: typeof params?.sort === 'string' ? params.sort : 'order',
        depth: 2,
      });

      return (response.data.docs ?? []).map(mapPayloadTestimonial).filter((t) => t.quote);
    } catch {
      // Return fallback data when the CMS is unavailable
      return fallbackTestimonials;
    }
  },

  async getFeatured(limit = 3) {
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

      return (response.data.docs ?? []).map(mapPayloadTestimonial).filter((t) => t.quote);
    } catch {
      // Return fallback data when the CMS is unavailable (limit to requested count)
      return fallbackTestimonials.slice(0, limit);
    }
  },
};
