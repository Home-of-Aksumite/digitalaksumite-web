import { apiClient } from '@/lib/api-client';
import type { StrapiListResponse, StrapiMedia } from '@/types/api';
import type { TrustedPartner, ClientLogo } from '@/types/content';
import { strapiApiUrl } from '@/config/env';
import { fallbackTrustedPartners } from './fallback-data';

const ENDPOINT = '/trusted-partners';

export const trustedPartnerService = {
  async getAll(): Promise<ClientLogo[]> {
    try {
      const response = await apiClient.get<StrapiListResponse<TrustedPartner>>(ENDPOINT, {
        populate: '*',
        filters: {
          featured: {
            $eq: true,
          },
        },
        sort: ['order:asc'],
      });

      // Handle case where data might be nested differently
      const data = response.data?.data || [];

      if (!Array.isArray(data)) {
        console.warn('Trusted partners data is not an array:', data);
        return [] as ClientLogo[];
      }

      // Map and extract logo URL properly
      return data.map((item: TrustedPartner): ClientLogo => {
        // Strapi v5 media field structure - handle both flat and nested formats
        const logoData = item.logo as { url?: string; attributes?: { url?: string } } | undefined;
        const rawLogoUrl = logoData?.url || logoData?.attributes?.url;

        const logoUrl = rawLogoUrl
          ? rawLogoUrl.startsWith('http')
            ? rawLogoUrl
            : `${strapiApiUrl}${rawLogoUrl}`
          : undefined;

        // Build the full StrapiMedia object with resolved URL
        const logoMedia: StrapiMedia | undefined = item.logo
          ? {
              ...item.logo,
              url: logoUrl || '',
            }
          : undefined;

        return {
          id: item.id,
          documentId: item.documentId,
          name: item.name || '',
          logo: logoMedia,
          link: item.link || '',
          order: item.order || 0,
          featured: item.featured || false,
          category: item.category || 'partner',
          createdAt: item.createdAt || new Date().toISOString(),
          updatedAt: item.updatedAt || new Date().toISOString(),
          publishedAt: item.publishedAt || new Date().toISOString(),
        };
      });
    } catch {
      // Return fallback data when Strapi is unavailable
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
