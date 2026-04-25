/**
 * Environment Configuration
 * Centralized environment variable management with validation
 */

import { z } from 'zod';

const envSchema = z.object({
  // CMS (Payload)
  NEXT_PUBLIC_CMS_API_URL: z.string().url().optional(),
  NEXT_PUBLIC_CMS_API_TOKEN: z.string().min(1).optional(),

  // Application
  NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // Security
  COOKIE_SECRET: z.string().min(32).optional(),
  RATE_LIMIT_MAX_REQUESTS: z.string().regex(/^\d+$/).default('100'),

  // Analytics (optional)
  NEXT_PUBLIC_GA_ID: z.string().optional(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('Environment validation failed:', parsedEnv.error.format());
  throw new Error('Invalid environment configuration');
}

const resolvedCmsApiUrl =
  parsedEnv.data.NEXT_PUBLIC_CMS_API_URL ||
  (parsedEnv.data.NODE_ENV === 'production'
    ? 'https://cms.digitalaksumite.com'
    : 'http://localhost:8000');

if (!resolvedCmsApiUrl) {
  throw new Error('Missing NEXT_PUBLIC_CMS_API_URL in production environment');
}

export const env = {
  ...parsedEnv.data,
  NEXT_PUBLIC_CMS_API_URL: resolvedCmsApiUrl,
};

// Helper to check if running in production
export const isProduction = env.NODE_ENV === 'production';

// Helper to check if running in development
export const isDevelopment = env.NODE_ENV === 'development';

// CMS API URL with trailing slash handling
export const cmsApiUrl = (() => {
  const fromEnv = env.NEXT_PUBLIC_CMS_API_URL;
  const cleaned = fromEnv.replace(/\/$/, '').replace(/\/(api)$/, '');

  if (
    typeof window !== 'undefined' &&
    window.location.protocol === 'https:' &&
    window.location.hostname !== 'localhost' &&
    window.location.hostname !== '127.0.0.1' &&
    cleaned.startsWith('http://localhost')
  ) {
    return 'https://cms.digitalaksumite.com';
  }

  return cleaned;
})();

export const cmsOrigin = cmsApiUrl.replace(/\/(api)(\/)?$/, '');

// CMS API Token (public for client-side use)
export const cmsApiToken = env.NEXT_PUBLIC_CMS_API_TOKEN;

// Site URL with trailing slash handling
export const siteUrl = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
