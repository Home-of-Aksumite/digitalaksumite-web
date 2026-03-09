/**
 * Security Utilities
 * Input sanitization, validation, and security helpers
 */

import DOMPurify from 'isomorphic-dompurify';
import { z } from 'zod';

// ============================================================================
// HTML Sanitization
// ============================================================================

/**
 * Sanitize HTML content to prevent XSS attacks
 * Removes all HTML tags by default - use only for plain text fields
 */
export function sanitizeHtml(input: string): string {
  if (!input) return '';

  const config = {
    ALLOWED_TAGS: [], // No HTML tags allowed
    ALLOWED_ATTR: [], // No attributes allowed
    KEEP_CONTENT: true,
  };

  return DOMPurify.sanitize(input, config).trim();
}

/**
 * Sanitize HTML with allowed formatting tags
 * For rich text fields that need basic formatting
 */
export function sanitizeRichText(input: string): string {
  if (!input) return '';

  const config = {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: [], // No attributes allowed to prevent XSS
  };

  return DOMPurify.sanitize(input, config);
}

/**
 * Sanitize URL to prevent javascript: and data: schemes
 */
export function sanitizeUrl(url: string): string {
  if (!url) return '';

  const allowedProtocols = ['http:', 'https:', 'mailto:', 'tel:'];
  const lowerUrl = url.toLowerCase().trim();

  // Check for javascript: or data: protocols
  const protocolMatch = lowerUrl.match(/^([^:]+):/);

  if (protocolMatch) {
    const protocol = protocolMatch[1];
    if (!allowedProtocols.includes(protocol + ':')) {
      return '';
    }
  }

  return url;
}

// ============================================================================
// Input Validation Schemas
// ============================================================================

export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Invalid email address')
  .max(254, 'Email too long')
  .transform((email) => email.toLowerCase().trim());

export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name too long')
  .regex(/^[a-zA-Z\s\-'\.]+$/, 'Name contains invalid characters')
  .transform((name) => sanitizeHtml(name));

export const phoneSchema = z
  .string()
  .regex(
    /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/,
    'Invalid phone number format'
  )
  .optional();

export const messageSchema = z
  .string()
  .min(10, 'Message must be at least 10 characters')
  .max(5000, 'Message too long')
  .transform((msg) => sanitizeHtml(msg));

export const slugSchema = z
  .string()
  .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens')
  .max(200, 'Slug too long');

// ============================================================================
// Form Validation
// ============================================================================

export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  subject: z.string().min(5).max(200).transform(sanitizeHtml),
  message: messageSchema,
  serviceInterest: z.string().max(100).optional(),
  budget: z.string().max(50).optional(),
  timeline: z.string().max(50).optional(),
});

export const jobApplicationSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  linkedIn: z.string().url().optional(),
  portfolio: z.string().url().optional(),
  coverLetter: messageSchema,
});

// ============================================================================
// Security Headers Helper
// ============================================================================

export function getSecurityHeaders() {
  return {
    'Content-Security-Policy':
      "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https:; font-src 'self'; connect-src 'self' https:;",
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  };
}

// ============================================================================
// Rate Limiting Helper (Simple In-Memory)
// ============================================================================

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 100,
  windowMs: number = 60000
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return { allowed: true, remaining: maxRequests - 1, resetTime: now + windowMs };
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetTime: entry.resetTime };
  }

  entry.count++;
  return { allowed: true, remaining: maxRequests - entry.count, resetTime: entry.resetTime };
}
