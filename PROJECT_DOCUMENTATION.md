# Digital Aksumite - Full Documentation

> **Quick Reference**: Enterprise-grade website for Digital Aksumite - a software company portfolio with CMS-driven content, job applications, and contact forms.

---

## 📁 Project Structure

```
digitalaksumite/
├── digitalaksumite-web/          # Next.js Frontend
│   ├── src/
│   │   ├── app/                   # Next.js App Router
│   │   │   ├── page.tsx           # Home page
│   │   │   ├── layout.tsx         # Root layout with SEO
│   │   │   ├── blog/[slug]/       # Blog post pages
│   │   │   ├── careers/[slug]/    # Job detail pages
│   │   │   ├── about/             # About page
│   │   │   ├── contact/           # Contact page
│   │   │   ├── privacy-policy/    # Privacy policy
│   │   │   ├── terms-of-service/  # Terms of service
│   │   │   ├── not-found.tsx      # Custom 404
│   │   │   ├── error.tsx          # Error boundary
│   │   │   ├── sitemap.ts         # Dynamic sitemap
│   │   │   └── robots.ts          # Robots.txt
│   │   ├── components/            # React components
│   │   ├── services/              # API service layer
│   │   ├── types/                 # TypeScript types
│   │   ├── config/                # Configuration
│   │   └── utils/                 # Utilities
│   └── public/                    # Static assets
│
└── digitalaksumite-cms/           # CMS Backend (Payload)
    ├── src/                       # Collections, globals, endpoints, seed
    └── public/                    # Uploaded media (if using local storage)
```

---

## 🎨 Frontend (Next.js 16)

### Tech Stack

- **Framework**: Next.js 16.1.6 + React 19 + TypeScript
- **Styling**: Tailwind CSS 4 + Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Build**: React Compiler enabled

### Key Features

#### 1. Graceful Degradation (Fallback Data)

**File**: `src/services/fallback-data.ts`

Every service returns fallback data if the CMS API is down. This ensures the site always works.

```typescript
// Example: Home page has fallback
export const fallbackHomePage: HomePage = {
  heroTitle: 'We Build Systems That Last',
  heroSubtitle: 'We create systems...',
  // ...
};
```

**How to check if the CMS is down**: Look for subtitle "We create systems that define, protect and guide our society." - this is the fallback indicator.

#### 2. SEO & Social Sharing

**Files**: `src/app/layout.tsx`, `src/app/blog/[slug]/page.tsx`, `src/app/careers/[slug]/page.tsx`

- **Meta tags**: Dynamic OpenGraph + Twitter Cards per page
- **Structured Data**: Article schema (blog), JobPosting schema (careers)
- **Sitemap**: Auto-generated from CMS content
- **Robots.txt**: Configured for crawlers

#### 3. Security

**File**: `src/utils/security.ts`

```typescript
// Implemented:
- DOMPurify for HTML sanitization
- Zod schemas for form validation
- URL sanitization (blocks javascript:)
- File upload restrictions (PDF only, 5MB)
- Rate limiting helper (ready to use)
```

**File**: `next.config.ts`

Security headers configured:

- Content-Security-Policy
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy

#### 4. Error Handling

**Files**: `src/app/not-found.tsx`, `src/app/error.tsx`, `src/components/error-boundary.tsx`

- Custom 404 page with brand styling
- Error boundary for production crashes
- Fallback UI when API fails

#### 5. Forms (Contact + Careers)

**Files**: `src/components/contact-section.tsx`, `src/components/internship-form.tsx`

- React Hook Form with Zod validation
- Phone number validation (libphonenumber-js)
- File uploads (PDF only, 5MB)
- Friendly error messages (no console spam)

### Component Architecture

| Component             | Purpose                              |
| --------------------- | ------------------------------------ |
| `Hero`                | Homepage hero with animated gradient |
| `ServicesSection`     | Service cards with hover effects     |
| `ProjectsSection`     | Portfolio grid                       |
| `TestimonialsSection` | Client quotes carousel               |
| `BlogSection`         | Latest blog posts                    |
| `ContactSection`      | Contact form                         |
| `CTASection`          | Call-to-action banner                |
| `Footer`              | Site footer with dynamic links       |
| `Navbar`              | Navigation with mobile menu          |

### Services Layer

**Folder**: `src/services/`

| Service                      | Purpose                            |
| ---------------------------- | ---------------------------------- |
| `page.service.ts`            | Fetch pages (home, about, contact) |
| `blog-post.service.ts`       | Fetch blog posts                   |
| `job.service.ts`             | Fetch job openings                 |
| `job-application.service.ts` | Submit job applications            |
| `contact.service.ts`         | Submit contact forms               |
| `project.service.ts`         | Fetch projects                     |
| `service.service.ts`         | Fetch services                     |
| `testimonial.service.ts`     | Fetch testimonials                 |

**Pattern**: All services use try/catch + fallback data:

```typescript
async getBySlug(slug: string) {
  try {
    const response = await apiClient.get(...);
    return response.data.data;
  } catch {
    return fallbackData.find(item => item.slug === slug);
  }
}
```

---

## 🗄️ Backend (Payload)

### Tech Stack

- **Payload**: 3.x
- **Database**: SQLite (dev) / PostgreSQL (prod recommended)
- **Auth**: Users & Permissions plugin
- **Upload**: Local provider (dev)

### Content Types

#### 1. JobOpening

**Fields**: title, slug, department, location, description (blocks), employmentType, publishedDate, isInternship, isActive, requirements, salaryRange

**Usage**: Career listings with dynamic pages.

**API**: `GET /api/job-openings?filters[isActive][$eq]=true`

#### 2. BlogPost

**Fields**: title, slug, excerpt, content (blocks), featuredImage, gallery, publishedDate, featured, authorName

**Usage**: Blog with rich content.

**API**: `GET /api/blog-posts?filters[featured][$eq]=true`

#### 3. ContactSubmission

**Fields**: name, email, phone, subject, message, serviceInterest, budget, timeline, status

**Usage**: Stores contact form submissions.

**API**: `POST /api/contact-submissions`

#### 4. JobApplication

**Fields**: firstName, lastName, email, phone, linkedIn, portfolio, coverLetter, resume (media), jobOpening (relation), status

**Usage**: Job applications with file uploads.

**API**: `POST /api/job-applications`

#### 5. Single Pages

- **home-page**: Hero, about, services, projects, testimonials, blog, CTA sections
- **about-page**: Mission, vision, values, history, stats
- **contact-page**: Title, subtitle, description, form settings
- **privacy-policy**: Sections with title/content
- **terms-of-service**: Sections with title/content

#### 6. Global Settings

- **site-setting**: Company info, social links, SEO defaults
- **navbar**: Logo, navigation links
- **footer**: Description, links, copyright

### Important Notes

1. **Public Permissions**: All GET endpoints are public. POST endpoints (contact, applications) are public.

2. **Draft & Publish**: Enabled on blog posts and job openings. Only published items appear on the site.

3. **Media Uploads**: Stored in `public/uploads/` in development.

4. **Database**: SQLite in development (`data.db` in `.tmp/`). Switch to PostgreSQL for production.

---

## ⚙️ Environment Variables

### Frontend (`.env.local`)

```bash
# Required
NEXT_PUBLIC_CMS_API_URL=http://localhost:8000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Optional - for production CMS
NEXT_PUBLIC_CMS_API_TOKEN=your_token_here

# Security (optional)
COOKIE_SECRET=32_character_random_string
RATE_LIMIT_MAX_REQUESTS=100

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Backend (`.env`)

```bash
# Database
DATABASE_URL=postgres://user:password@localhost:5432/digitalaksumite

# Payload
PAYLOAD_SECRET=your_payload_secret
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:8000

# Server
HOST=0.0.0.0
PORT=8000
```

---

## 🚀 Deployment

### Frontend (Vercel - Recommended)

1. Push to GitHub
2. Import to Vercel
3. Set environment variables:
   - `NEXT_PUBLIC_CMS_API_URL`: Your CMS URL
   - `NEXT_PUBLIC_SITE_URL`: Your domain
4. Deploy

**Features that work on Vercel**:

- Static site generation (SSG)
- Image optimization
- Edge functions (if needed)
- Analytics (cookie-free)

### Backend (Self-Hosted or Cloud)

**Option A: Managed Hosting**

- Deploy directly from your hosting provider dashboard
- Managed database and CDN
- Pricing depends on provider

**Option B: Self-Hosted (VPS)**

```bash
# Build
cd digitalaksumite-cms
npm run build

# Start production server
npm start

# Or use PM2
pm2 start npm --name "cms" -- start
```

**Option C: Docker**

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 8000
CMD ["npm", "start"]
```

### Important Production Checklist

- [ ] Switch from SQLite to PostgreSQL
- [ ] Configure S3/Cloudinary for media uploads
- [ ] Set up backup strategy for database
- [ ] Configure CDN for static assets
- [ ] Enable HTTPS (SSL certificate)
- [ ] Set up monitoring (optional: Sentry, uptime)

---

## 🔧 Development Commands

### Frontend

```bash
cd digitalaksumite-web

npm run dev          # Start dev server (port 3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint check
npm run format       # Prettier formatting
npm run type-check   # TypeScript check
npm run validate     # Run all checks
```

### Backend

```bash
cd digitalaksumite-cms

npm run dev          # Start dev server (port 8000)
npm run build        # Production build
npm run start        # Start production server
npm run seed         # Seed content (if needed)
```

### Full Stack (Both)

```bash
# Terminal 1 - Backend
cd digitalaksumite-cms && npm run dev

# Terminal 2 - Frontend
cd digitalaksumite-web && npm run dev
```

---

## 🐛 Troubleshooting

### Frontend Issues

**Build fails with "Property X missing"**

- Check `src/types/content.ts` - interface needs updating
- Check `src/services/fallback-data.ts` - fallback data needs same properties

**Images not loading**

- Check `next.config.ts` - `images.remotePatterns` must include the CMS URL
- Verify the CMS is running and accessible

**Form submissions fail**

- Check the CMS is running on the correct port
- Verify public access rules are configured in the CMS
- Check browser console for CORS errors

### Backend Issues

**Admin panel 403 errors**

- Clear browser cookies/localStorage
- Restart CMS server

**Database issues**

- Check database connectivity and migrations

**Uploads not working**

- Check `config/middlewares.ts` - body parsing enabled
- Verify file size limits in both CMS and frontend

---

## 📊 Maintenance Guide

### Daily

- Check form submissions in CMS Admin
- Monitor error logs (if Sentry enabled)

### Weekly

- Review job applications
- Update blog content
- Check site analytics (Vercel Dashboard)

### Monthly

- Update dependencies: `npm update`
- Review and rotate API tokens
- Backup database

### Quarterly

- Full dependency audit: `npm audit`
- Performance review (Core Web Vitals)
- Content audit (outdated blog posts, jobs)

---

## 📝 Adding New Features

### Add a New Page

1. Create `src/app/new-page/page.tsx`
2. Add to `src/components/navbar.tsx` navigation
3. Create service in `src/services/page.service.ts`
4. Add fallback data in `src/services/fallback-data.ts`

### Add a New Content Type (CMS)

1. Create a collection/global in the CMS admin/config
2. Set public access rules as needed
3. Add TypeScript interface in `src/types/content.ts`
4. Create service in `src/services/`
5. Add fallback data

### Modify Forms

1. Update Zod schema in `src/utils/security.ts`
2. Update form component
3. Update CMS schema if needed
4. Update service layer

---

## 🎯 Key Architectural Decisions

1. **Fallback Data**: Every service returns fallback content. Site works even if CMS is down.

2. **Static Generation**: All pages are SSG. Fast, SEO-friendly, no server needed.

3. **No API Routes**: Forms submit directly to the CMS. Simpler, no Next.js API layer.

4. **Type Safety**: Full TypeScript with Zod validation. Runtime and compile-time safety.

5. **Security First**: CSP headers, input sanitization, file restrictions all implemented.

6. **Cookie-Free Analytics**: Use Vercel Analytics (no GDPR banner needed).

---

## 📞 Support Contacts

- **Technical Issues**: Check logs in your hosting provider dashboard and CMS logs
- **Content Updates**: Use CMS Admin at `/admin`

---

**Last Updated**: March 2026
**Version**: 1.0
**Maintainer**: Digital Aksumite Team
