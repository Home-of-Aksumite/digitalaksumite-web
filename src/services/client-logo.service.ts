import { apiClient } from '@/lib/api-client';
import type { StrapiListResponse } from '@/types/api';
import type { TrustedPartner, ClientLogo } from '@/types/content';

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
      console.log('Trusted partners API response:', response.data);

      // Handle case where data might be nested differently
      const data = response.data?.data || [];

      if (!Array.isArray(data)) {
        console.warn('Trusted partners data is not an array:', data);
        return [] as ClientLogo[];
      }

      return data.map((item) => item) as ClientLogo[];
    } catch (error) {
      console.error('Trusted partners fetch error:', error);
      return [] as ClientLogo[];
    }
  },
};
