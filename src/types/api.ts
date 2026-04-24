/**
 * API Type Definitions
 * Core types for API communication with the CMS
 */

// ============================================================================
// API Response Types
// ============================================================================

export interface ApiMeta {
  status: number;
  timestamp: string;
}

export interface ApiResponse<T> {
  data: T;
  meta: ApiMeta;
}

export interface ApiErrorDetails {
  message: string;
  details?: Record<string, unknown>;
}

export interface ApiError {
  error: ApiErrorDetails;
}

export interface CmsListResponse<T> {
  data: T[];
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface CmsSingleResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

// ============================================================================
// Query Parameters
// ============================================================================

export interface QueryParams {
  populate?: string | string[] | Record<string, unknown>;
  filters?: Record<string, unknown>;
  sort?: string | string[];
  pagination?: {
    page?: number;
    pageSize?: number;
    start?: number;
    limit?: number;
  };
  fields?: string[];
  publicationState?: 'live' | 'preview';
  locale?: string | string[];

  // Allow CMS-specific query params (e.g. Payload: where, depth, limit)
  [key: string]: unknown;
}

// ============================================================================
// CMS Media Types
// ============================================================================

export interface CmsMediaFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface CmsMedia {
  id?: number | string;
  name?: string;
  filename?: string;
  alternativeText?: string | null;
  alt?: string;
  caption?: string | null;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: CmsMediaFormat;
    small?: CmsMediaFormat;
    medium?: CmsMediaFormat;
    large?: CmsMediaFormat;
  } | null;
  hash?: string;
  ext?: string;
  mime?: string;
  size?: number;
  url: string;
  previewUrl?: string | null;
  provider?: string;
  provider_metadata?: Record<string, unknown> | null;
  createdAt?: string;
  updatedAt?: string;
}
