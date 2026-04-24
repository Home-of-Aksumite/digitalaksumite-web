# Architecture Documentation

## Overview

Digital Aksumite website follows a **Headless CMS + Modern Frontend** architecture, separating content management from presentation for maximum flexibility and performance.

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT                                  │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │   Browser    │────│   Next.js    │────│    Vercel    │      │
│  │              │    │   (React)     │    │   (Hosting)   │      │
│  └──────────────┘    └──────────────┘    └──────────────┘      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API LAYER                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                  Payload CMS                            │   │
│  │  • REST API    • Media Library                          │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    DATA LAYER                                   │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │  PostgreSQL  │    │     S3       │    │   Redis      │      │
│  │  (Database)  │    │   (Media)    │    │  (Cache)     │      │
│  └──────────────┘    └──────────────┘    └──────────────┘      │
└─────────────────────────────────────────────────────────────────┘
```

---

## Frontend Architecture

### Next.js 14 App Router

**Routing Structure:**

```
src/app/
├── layout.tsx          # Root layout with providers
├── page.tsx            # Home page
├── about/
│   └── page.tsx        # About page
├── services/
│   ├── page.tsx        # Services listing
│   └── [slug]/
│       └── page.tsx    # Individual service
├── projects/
│   ├── page.tsx        # Projects listing
│   └── [slug]/
│       └── page.tsx    # Individual project
├── blog/
│   ├── page.tsx        # Blog listing
│   └── [slug]/
│       └── page.tsx    # Individual blog post
├── contact/
│   └── page.tsx        # Contact page
├── careers/
│   ├── page.tsx        # Job listings
│   └── [slug]/
│       └── page.tsx    # Individual job
├── api/                # API routes for forms
│   └── submit/
│       ├── contact/route.ts
│       └── application/route.ts
└── (legal)/
    ├── privacy/
    │   └── page.tsx
    └── terms/
        └── page.tsx
```

### Component Architecture

**Modular Component Structure:**

```
src/components/
├── ui/                 # Primitive UI components
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   └── typography.tsx
├── layout/             # Layout components
│   ├── navbar.tsx
│   ├── footer.tsx
│   └── container.tsx
├── sections/           # Page sections
│   ├── hero.tsx
│   ├── features.tsx
│   ├── testimonials.tsx
│   └── cta.tsx
└── shared/             # Shared components
    ├── seo.tsx
    ├── error-boundary.tsx
    └── loading.tsx
```

---

## Service Layer Architecture

### API Client

**Core Client (`src/lib/api-client.ts`):**

- Centralized HTTP client
- Automatic error handling
- Request/response interceptors
- Type-safe responses

### Service Organization

**Pattern: One service per content type**

```typescript
// src/services/blog-post.service.ts
export const blogPostService = {
  getAll: (params) => apiClient.get('/blog-posts', params),
  getById: (id) => apiClient.get(`/blog-posts/${id}`),
  getBySlug: (slug) => apiClient.get('/blog-posts', { filters: { slug } }),
  getFeatured: () => apiClient.get('/blog-posts', { filters: { featured: true } }),
};
```

**Services:**

- `blog-post.service.ts` - Blog content
- `service.service.ts` - Services offered
- `project.service.ts` - Portfolio projects
- `testimonial.service.ts` - Client testimonials
- `job.service.ts` - Career opportunities
- `page.service.ts` - Single type pages (Home, About, Contact)
- `contact.service.ts` - Form submissions

---

## Data Flow

### Content Fetching Pattern

```
1. Page Component
   └── 2. Server Component
        └── 3. Service Layer
             └── 4. API Client
                  └── 5. Payload CMS
                       └── 6. PostgreSQL
```

**Example:**

```typescript
// app/blog/page.tsx (Server Component)
import { blogPostService } from '@/services/blog-post.service';

export default async function BlogPage() {
  const { data: posts } = await blogPostService.getAll({
    sort: ['publishedAt:desc'],
    pagination: { limit: 10 },
  });

  return <BlogPostList posts={posts} />;
}
```

### Form Submission Flow

```
1. Client Form
   └── 2. Client-side Validation (Zod)
        └── 3. API Route Handler
             └── 4. Server-side Sanitization
                  └── 5. Service Layer POST
                       └── 6. Payload CMS
```

---

## Type System

### Type Organization

```
src/types/
├── api.ts              # API response types
├── content.ts          # Content type definitions
├── components.ts       # Component prop types
└── utils.ts            # Utility types
```

**Type Definition Example:**

```typescript
// src/types/content.ts
export interface BlogPost {
  title: string;
  slug: string;
  content: string;
  featuredImage: CmsMedia | null;
  author: string;
  publishedAt: string;
  // ... other fields
}
```

---

## Security Architecture

### Input Validation

**Zod Schemas for All Inputs:**

```typescript
// src/utils/security.ts
export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  message: messageSchema,
});
```

### Output Sanitization

**DOMPurify for HTML Content:**

```typescript
// All user-generated content sanitized
const sanitized = sanitizeHtml(userInput);
```

### Security Headers

**Next.js Headers Configuration:**

```javascript
// next.config.js
headers: async () => [
  {
    source: '/:path*',
    headers: securityHeaders,
  },
];
```

---

## State Management

### Server State

- **Next.js Server Components** for initial data fetching
- **Automatic caching** with `next.revalidate`
- **On-demand revalidation** for CMS webhooks

### Client State

- **React Server Components** by default
- **Client Components** only when needed (interactivity)
- **URL state** for filters and pagination

---

## Performance Strategy

### Build Time

- Static generation for marketing pages
- ISR (Incremental Static Regeneration) for blog
- Sitemap and robots.txt generation

### Runtime

- Image optimization with Next.js Image
- Font optimization with next/font
- Code splitting by route
- Prefetching on hover

### Caching

```
┌──────────────────────────────────────┐
│  CDN (Vercel Edge)                   │
│  • Static assets: 1 year             │
│  • API responses: 60s                  │
├──────────────────────────────────────┤
│  Next.js Data Cache                  │
│  • fetch() revalidate: 60s           │
│  • Router cache: 30s                 │
├──────────────────────────────────────┤
│  Browser                             │
│  • Service Worker (future)           │
└──────────────────────────────────────┘
```

---

## Deployment Architecture

### Vercel Configuration

**Production Optimizations:**

```javascript
// vercel.json
{
  "regions": ["iad1"],  // US East (customize as needed)
  "headers": [...],
  "rewrites": [...]
}
```

### Environment Separation

| Environment | URL                 | Purpose     |
| ----------- | ------------------- | ----------- |
| Production  | digitalaksumite.com | Live site   |
| Preview     | \*.vercel.app       | PR previews |
| Local       | localhost:3000      | Development |

---

## CMS Integration

### CMS Content Types

**Collection Types:**

- BlogPost
- Service
- Project
- Testimonial
- JobOpening
- JobApplication
- ContactSubmission

**Single Types:**

- HomePage
- AboutPage
- ContactPage
- SiteSettings
- Navbar
- Footer
- PrivacyPolicy
- TermsOfService

### API Permissions

**Public Role:**

- Read access: All content types (GET)
- No access: JobApplication, ContactSubmission (POST only)

**Authenticated Role:**

- Full access to protected types

---

## File Organization

```
digitalaksumite-web/
├── .env.example              # Environment template
├── .eslintrc.mjs            # Linting rules
├── .prettierrc.json         # Formatting rules
├── .husky/                  # Git hooks
├── docs/                    # Documentation
│   ├── README.md
│   ├── SECURITY.md
│   └── ARCHITECTURE.md
├── next.config.ts           # Next.js config
├── package.json             # Dependencies
├── src/
│   ├── app/                 # Next.js pages
│   ├── components/          # React components
│   ├── config/              # Configuration
│   ├── lib/                 # Core utilities
│   ├── services/            # API services
│   ├── types/               # Type definitions
│   └── utils/               # Helper functions
├── tests/                   # Test files
└── public/                  # Static assets
```

---

## Development Workflow

### Branch Strategy

```
main
  └── feature/service-cards
  └── fix/navbar-responsive
  └── docs/api-guide
```

### Pre-commit Checks

1. **Husky** triggers on commit
2. **lint-staged** runs:
   - ESLint --fix
   - Prettier --write
3. Commit proceeds only if clean

---

## Monitoring & Analytics

### Planned Integrations

- **Vercel Analytics** - Web vitals
- **Google Analytics 4** - User behavior
- **Sentry** - Error tracking (optional)

---

_Architecture version: 1.0_
_Last updated: 2026-03-09_
