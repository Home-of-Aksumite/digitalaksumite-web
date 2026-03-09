/**
 * Core API Client
 * Base HTTP client for all API communications with Strapi CMS
 */

import { env, strapiApiUrl } from '@/config/env';
import type { ApiError, ApiResponse, QueryParams } from '@/types/api';

class ApiErrorClass extends Error {
  constructor(
    public status: number,
    public message: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Build query string from parameters
 */
function buildQueryString(params: QueryParams): string {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      value.forEach((v) => query.append(`${key}[]`, String(v)));
    } else if (typeof value === 'object') {
      query.append(key, JSON.stringify(value));
    } else {
      query.append(key, String(value));
    }
  });

  const queryString = query.toString();
  return queryString ? `?${queryString}` : '';
}

/**
 * Base fetch wrapper with error handling
 */
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {},
  params?: QueryParams
): Promise<ApiResponse<T>> {
  const queryString = params ? buildQueryString(params) : '';
  const url = `${strapiApiUrl}/api${endpoint}${queryString}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...((options.headers as Record<string, string>) || {}),
  };

  // Add API token if available
  if (env.STRAPI_API_TOKEN) {
    headers.Authorization = `Bearer ${env.STRAPI_API_TOKEN}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      next: {
        revalidate: 60, // Default 60 second revalidation
      },
    });

    if (!response.ok) {
      const errorData = (await response.json().catch(() => ({}))) as ApiError;
      throw new ApiErrorClass(
        response.status,
        errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`,
        errorData.error?.details
      );
    }

    const data = (await response.json()) as T;

    return {
      data,
      meta: {
        status: response.status,
        timestamp: new Date().toISOString(),
      },
    };
  } catch (error) {
    if (error instanceof ApiErrorClass) {
      throw error;
    }

    if (error instanceof Error) {
      throw new ApiErrorClass(0, `Network error: ${error.message}`);
    }

    throw new ApiErrorClass(0, 'Unknown error occurred');
  }
}

/**
 * API Client methods
 */
export const apiClient = {
  /**
   * GET request
   */
  get: <T>(endpoint: string, params?: QueryParams) =>
    fetchApi<T>(endpoint, { method: 'GET' }, params),

  /**
   * POST request
   */
  post: <T>(endpoint: string, body: unknown) =>
    fetchApi<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  /**
   * PUT request
   */
  put: <T>(endpoint: string, body: unknown) =>
    fetchApi<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    }),

  /**
   * DELETE request
   */
  delete: <T>(endpoint: string) => fetchApi<T>(endpoint, { method: 'DELETE' }),
};

export { ApiErrorClass as ApiError };
