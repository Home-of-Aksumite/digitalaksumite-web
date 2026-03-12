/**
 * Job Application Service
 * Handle job applications with file upload support
 */

import { apiClient } from '@/lib/api-client';
import type { StrapiSingleResponse, StrapiListResponse } from '@/types/api';
import type { JobApplication } from '@/types/content';

const ENDPOINT = '/job-applications';

export interface CreateJobApplicationData {
  name: string;
  email: string;
  phone?: string;
  applicationType: 'Job Application' | 'Internship' | 'General Application';
  coverLetter?: string;
  portfolioLink?: string;
  jobOpening?: number; // ID of the job opening
}

export interface ApplicationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  resume: File | null;
  coverLetter: string;
  portfolioLink?: string;
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
    // First, upload the resume file if provided
    let resumeId: number | undefined;

    if (formData.resume) {
      const uploadResponse = await this.uploadFile(formData.resume);
      resumeId = uploadResponse.id;
    }

    // Create the job application entry
    const applicationData: CreateJobApplicationData = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      applicationType,
      coverLetter: formData.coverLetter,
      portfolioLink: formData.portfolioLink,
    };

    // Add job opening relation if provided
    if (jobOpeningId) {
      applicationData.jobOpening = jobOpeningId;
    }

    // Add resume relation if file was uploaded
    const requestBody: Record<string, unknown> = {
      data: applicationData,
    };

    if (resumeId) {
      (requestBody.data as Record<string, unknown>).resume = resumeId;
    }

    const response = await apiClient.post<StrapiSingleResponse<JobApplication>>(
      ENDPOINT,
      requestBody
    );

    return response.data.data;
  },

  /**
   * Upload a file to Strapi
   */
  async uploadFile(file: File): Promise<{ id: number; url: string }> {
    const formData = new FormData();
    formData.append('files', file);

    const uploadUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/upload`;

    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`File upload failed: ${response.statusText}`);
    }

    const data = (await response.json()) as Array<{ id: number; url: string }>;
    return data[0];
  },

  /**
   * Get all job applications (admin only)
   */
  async getAll() {
    const response = await apiClient.get<StrapiListResponse<JobApplication>>(ENDPOINT);
    return response.data.data;
  },

  /**
   * Get applications by job opening
   */
  async getByJobOpening(jobOpeningId: number) {
    const response = await apiClient.get<StrapiListResponse<JobApplication>>(ENDPOINT, {
      filters: {
        job_opening: {
          id: {
            $eq: jobOpeningId,
          },
        },
      },
    });
    return response.data.data;
  },
};
