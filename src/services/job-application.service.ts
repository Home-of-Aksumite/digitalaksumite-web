/**
 * Job Application Service
 * Handle job applications with file upload support
 */

import { apiClient } from '@/lib/api-client';
import type { JobApplication } from '@/types/content';
import { jobService } from './job.service';
import type { ApplicationFormData } from './job.service';

const ENDPOINT = '/job-applications';

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

export interface CreateJobApplicationData {
  name: string;
  email: string;
  phone?: string;
  applicationType: 'Job Application' | 'Internship' | 'General Application';
  coverLetter?: string;
  portfolioLink?: string;
  jobOpening?: number; // ID of the job opening
}

export const jobApplicationService = {
  /**
   * Create a new job application with file upload
   */
  async create(
    formData: ApplicationFormData,
    jobOpeningId?: number,
    applicationType: 'Job Application' | 'Internship' | 'General Application' = 'Job Application'
  ): Promise<JobApplication> {
    try {
      const created = await jobService.applications.create(formData, {
        jobOpeningId: jobOpeningId ? String(jobOpeningId) : undefined,
        applicationType,
      });
      return created;
    } catch (error) {
      // Silently handle error - user gets friendly message via UI
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(
        'Unable to submit your application at this time. Please try again later or contact us directly.'
      );
    }
  },

  /**
   * Get all job applications (admin only)
   */
  async getAll() {
    try {
      const response = await apiClient.get<PayloadListResponse<JobApplication>>(ENDPOINT, {
        limit: 100,
        sort: '-createdAt',
        depth: 2,
      });
      return response.data.docs;
    } catch {
      // Silently return empty array
      return [];
    }
  },

  /**
   * Get applications by job opening
   */
  async getByJobOpening(jobOpeningId: number) {
    try {
      const response = await apiClient.get<PayloadListResponse<JobApplication>>(ENDPOINT, {
        where: {
          jobOpening: {
            equals: String(jobOpeningId),
          },
        },
        limit: 100,
        sort: '-createdAt',
        depth: 2,
      });
      return response.data.docs;
    } catch {
      // Silently return empty array
      return [];
    }
  },
};
