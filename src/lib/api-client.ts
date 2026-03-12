/**
 * Core API Client
 * Base HTTP client for all API communications with Strapi CMS
 */

import { strapiApiToken } from '@/config/env';
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
 * Build query string from parameters using Strapi bracket notation
 */
function buildQueryString(params: QueryParams, prefix = ''): string {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    const fullKey = prefix ? `${prefix}[${key}]` : key;

    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (typeof v === 'object' && v !== null) {
          const nested = buildQueryString(v, `${fullKey}[]`);
          if (nested) {
            nested
              .substring(1)
              .split('&')
              .forEach((pair) => {
                const [k, v] = pair.split('=');
                if (k && v) query.append(decodeURIComponent(k), decodeURIComponent(v));
              });
          }
        } else {
          query.append(`${fullKey}[]`, String(v));
        }
      });
    } else if (typeof value === 'object') {
      const nested = buildQueryString(value, fullKey);
      if (nested) {
        nested
          .substring(1)
          .split('&')
          .forEach((pair) => {
            const [k, v] = pair.split('=');
            if (k && v) query.append(decodeURIComponent(k), decodeURIComponent(v));
          });
      }
    } else {
      query.append(fullKey, String(value));
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
  const url = `/api${endpoint}${queryString}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...((options.headers as Record<string, string>) || {}),
  };

  // Add API token if available
  if (strapiApiToken) {
    headers.Authorization = `Bearer ${strapiApiToken}`;
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
      console.error('API Error:', {
        url: url,
        status: response.status,
        errorData: errorData,
        fullError: JSON.stringify(errorData, undefined, 2),
      });
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
