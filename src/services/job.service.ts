/**
 * Job Service
 * Handles all API operations for job openings and applications
 */

import { apiClient } from '@/lib/api-client';
import type { QueryParams, StrapiListResponse, StrapiSingleResponse } from '@/types/api';
import type { JobOpening, JobApplication } from '@/types/content';

const JOB_OPENINGS_ENDPOINT = '/job-openings';
const JOB_APPLICATIONS_ENDPOINT = '/job-applications';

export const jobService = {
  openings: {
    async getAll(params?: QueryParams) {
      const response = await apiClient.get<StrapiListResponse<JobOpening>>(JOB_OPENINGS_ENDPOINT, {
        ...params,
        filters: { isActive: { $eq: true } },
      });
      return response.data;
    },

    async getBySlug(slug: string, params?: QueryParams) {
      const response = await apiClient.get<StrapiListResponse<JobOpening>>(JOB_OPENINGS_ENDPOINT, {
        ...params,
        filters: {
          slug: { $eq: slug },
          isActive: { $eq: true },
        },
      });
      return response.data.data[0] || undefined;
    },
  },

  applications: {
    async create(data: Omit<JobApplication, 'id' | 'createdAt' | 'updatedAt' | 'status'>) {
      const response = await apiClient.post<StrapiSingleResponse<JobApplication>>(
        JOB_APPLICATIONS_ENDPOINT,
        { data }
      );
      return response.data;
    },
  },
};
