import { apiClient } from '@/lib/api-client';
import type { StrapiListResponse, StrapiMedia } from '@/types/api';
import type { TrustedPartner, ClientLogo } from '@/types/content';
import { strapiApiUrl } from '@/config/env';

export const trustedPartnerService = {
  async getAll(): Promise<ClientLogo[]> {
    try {
      const response = await apiClient.get<StrapiListResponse<TrustedPartner>>(
        '/trusted-partners',
        {
          populate: '*',
          filters: {
            featured: {
              $eq: true,
            },
          },
          sort: ['order:asc'],
        }
      );

      // Debug logging

      console.log('Trusted partners API response:', JSON.stringify(response.data, undefined, 2));

      console.log('Strapi API URL:', strapiApiUrl);

      // Handle case where data might be nested differently
      const data = response.data?.data || [];

      if (!Array.isArray(data)) {
        console.warn('Trusted partners data is not an array:', data);
        return [] as ClientLogo[];
      }

      // Map and extract logo URL properly
      return data.map((item: TrustedPartner): ClientLogo => {
        console.log('Processing item:', item);

        console.log('Item logo field:', item.logo);

        // Strapi v5 media field structure - handle both flat and nested formats
        const logoData = item.logo as { url?: string; attributes?: { url?: string } } | undefined;
        const rawLogoUrl = logoData?.url || logoData?.attributes?.url;

        console.log('Raw logo URL:', rawLogoUrl);

        const logoUrl = rawLogoUrl
          ? rawLogoUrl.startsWith('http')
            ? rawLogoUrl
            : `${strapiApiUrl}${rawLogoUrl}`
          : // eslint-disable-next-line unicorn/no-null
            null;

        console.log('Constructed logo URL:', logoUrl);

        // Build the full StrapiMedia object with resolved URL

        const logoMedia: StrapiMedia | null = item.logo
          ? {
              ...item.logo,
              url: logoUrl || '',
            }
          : // eslint-disable-next-line unicorn/no-null
            null;

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
    } catch (error) {
      console.error('Trusted partners fetch error:', error);
      return [] as ClientLogo[];
    }
  },
};
