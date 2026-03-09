/**
 * Environment Configuration
 * Centralized environment variable management with validation
 */

import { z } from 'zod';

const envSchema = z.object({
  // Strapi CMS
  NEXT_PUBLIC_STRAPI_API_URL: z.string().url().default('http://localhost:1337'),
  STRAPI_API_TOKEN: z.string().min(1).optional(),

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

export const env = parsedEnv.data;

// Helper to check if running in production
export const isProduction = env.NODE_ENV === 'production';

// Helper to check if running in development
export const isDevelopment = env.NODE_ENV === 'development';

// Strapi API URL with trailing slash handling
export const strapiApiUrl = env.NEXT_PUBLIC_STRAPI_API_URL.replace(/\/$/, '');

// Site URL with trailing slash handling
export const siteUrl = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
