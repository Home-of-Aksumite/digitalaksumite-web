/**
 * Content Type Definitions
 * TypeScript interfaces matching Strapi CMS content types
 */

import type { StrapiMedia } from './api';

// ============================================================================
// BlogPost
// ============================================================================

export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: StrapiMedia | null;
  author: string;
  publishedAt: string;
  updatedAt: string;
  featured: boolean;
  tags: string[];
  readTime: number;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
}

// ============================================================================
// Service
// ============================================================================

export interface Service {
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon: StrapiMedia | null;
  features: string[];
  order: number;
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// Project
// ============================================================================

export interface Project {
  title: string;
  slug: string;
  client: string;
  summary: string;
  description: string;
  thumbnail: StrapiMedia | null;
  gallery: StrapiMedia[];
  technologies: string[];
  websiteUrl?: string;
  githubUrl?: string;
  completedDate: string;
  featured: boolean;
  order: number;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// Testimonial
// ============================================================================

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: StrapiMedia | null;
  rating: number;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// JobOpening
// ============================================================================

export interface JobOpening {
  title: string;
  slug: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  summary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  salaryRange?: string;
  isActive: boolean;
  publishedAt: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// JobApplication
// ============================================================================

export interface JobApplication {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  linkedIn?: string;
  portfolio?: string;
  coverLetter: string;
  resume: StrapiMedia | null;
  jobOpening: { id: number };
  status: 'pending' | 'reviewing' | 'interviewed' | 'rejected' | 'hired';
  appliedAt: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// ContactSubmission
// ============================================================================

export interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  serviceInterest?: string;
  budget?: string;
  timeline?: string;
  status: 'new' | 'in-progress' | 'responded' | 'archived';
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// Single Types - Pages
// ============================================================================

export interface HeroSlide {
  image: StrapiMedia;
  alt: string;
}

export interface HomePage {
  heroTitle: string;
  heroSubtitle: string;
  heroPrimaryButtonText: string;
  heroSecondaryButtonText: string;
  heroSlides: HeroSlide[];
  aboutSummary: string;
  servicesIntro: string;
  projectsIntro: string;
  testimonialsIntro: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButtonText: string;
  seoTitle?: string;
  seoDescription?: string;
  updatedAt: string;
}

export interface AboutPage {
  title: string;
  mission: string;
  vision: string;
  values: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  teamIntro: string;
  history: string;
  stats: Array<{
    value: string;
    label: string;
  }>;
  seoTitle?: string;
  seoDescription?: string;
  updatedAt: string;
}

export interface ContactPage {
  title: string;
  subtitle: string;
  description: string;
  email: string;
  phone?: string;
  address?: string;
  officeHours?: string;
  mapEmbedUrl?: string;
  formTitle: string;
  formDescription: string;
  seoTitle?: string;
  seoDescription?: string;
  updatedAt: string;
}

// ============================================================================
// Single Types - Global
// ============================================================================

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  email: string;
  phone?: string;
  address?: string;
  logo: StrapiMedia | null;
  favicon: StrapiMedia | null;
  socialLinks: SocialLink[];
  defaultSeoTitle: string;
  defaultSeoDescription: string;
  googleAnalyticsId?: string;
  updatedAt: string;
}

export interface Navbar {
  logo: StrapiMedia | null;
  logoAlt: string;
  updatedAt: string;
}

export interface Footer {
  logo: StrapiMedia | null;
  description: string;
  copyright: string;
  legalLinks: Array<{
    label: string;
    url: string;
  }>;
  updatedAt: string;
}

export interface PrivacyPolicy {
  title: string;
  content: string;
  lastUpdated: string;
  updatedAt: string;
}

export interface TermsOfService {
  title: string;
  content: string;
  lastUpdated: string;
  updatedAt: string;
}
