import { apiClient } from '@/lib/api-client';
import type { CmsMedia } from '@/types/api';
import type { TrustedPartner, ClientLogo } from '@/types/content';
import { cmsOrigin } from '@/config/env';
import { fallbackTrustedPartners } from './fallback-data';

const ENDPOINT = '/trusted-partners';

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

function isClientLogoCategory(value: unknown): value is ClientLogo['category'] {
  return value === 'client' || value === 'technology' || value === 'partner';
}

export const trustedPartnerService = {
  async getAll(): Promise<ClientLogo[]> {
    try {
      const response = await apiClient.get<PayloadListResponse<unknown>>(ENDPOINT, {
        where: {
          featured: {
            equals: true,
          },
        },
        sort: 'order',
        depth: 2,
      });

      const docs = (response.data?.docs ?? []) as TrustedPartner[];

      return docs.map((doc: TrustedPartner): ClientLogo => {
        const docRecord = asRecord(doc);
        const logoRecord = asRecord(docRecord.logo);
        const rawLogoUrl = typeof logoRecord.url === 'string' ? logoRecord.url : undefined;
        const logoUrl = rawLogoUrl
          ? rawLogoUrl.startsWith('http')
            ? rawLogoUrl
            : `${cmsOrigin}${rawLogoUrl}`
          : undefined;

        const logoMedia: CmsMedia | undefined = docRecord.logo
          ? {
              ...(logoRecord as unknown as CmsMedia),
              url: logoUrl || '',
            }
          : undefined;

        const idRaw = docRecord.id;
        const id = typeof idRaw === 'string' || typeof idRaw === 'number' ? idRaw : 0;

        const categoryRaw = docRecord.category;

        return {
          id,
          documentId: typeof docRecord.documentId === 'string' ? docRecord.documentId : '',
          name: typeof docRecord.name === 'string' ? docRecord.name : '',
          logo: logoMedia,
          link: typeof docRecord.link === 'string' ? docRecord.link : '',
          order:
            typeof docRecord.order === 'number' ? docRecord.order : Number(docRecord.order ?? 0),
          featured: Boolean(docRecord.featured),
          category: isClientLogoCategory(categoryRaw) ? categoryRaw : 'partner',
          createdAt:
            typeof docRecord.createdAt === 'string'
              ? docRecord.createdAt
              : new Date().toISOString(),
          updatedAt:
            typeof docRecord.updatedAt === 'string'
              ? docRecord.updatedAt
              : new Date().toISOString(),
          publishedAt:
            typeof docRecord.publishedAt === 'string'
              ? docRecord.publishedAt
              : typeof docRecord.createdAt === 'string'
                ? docRecord.createdAt
                : new Date().toISOString(),
        };
      });
    } catch {
      // Return fallback data when the CMS is unavailable
      return fallbackTrustedPartners.map(
        (item): ClientLogo => ({
          id: item.id || 0,
          documentId: item.documentId || '',
          name: item.name || '',
          logo: item.logo || undefined,
          link: item.link || '',
          order: item.order || 0,
          featured: item.featured || false,
          category: 'partner',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          publishedAt: new Date().toISOString(),
        })
      );
    }
  },
};
