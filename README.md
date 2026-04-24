# Digital Aksumite Frontend

> Next.js 16 website with CMS integration, job applications, and contact forms.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000

## 📁 Structure

```
src/
├── app/                 # Next.js pages (home, blog, careers, etc.)
├── components/          # React components
├── services/           # API calls to CMS + fallback data
├── types/              # TypeScript interfaces
├── config/             # Environment setup
└── utils/              # Security & validation
```

## 🔌 CMS Connection

Set in `.env.local`:

```bash
NEXT_PUBLIC_CMS_API_URL=http://localhost:8000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_CMS_API_TOKEN=optional_token
```

## 🛡️ Key Features

| Feature       | Implementation                            |
| ------------- | ----------------------------------------- |
| Fallback data | Site works even if CMS is down            |
| SEO           | OpenGraph, Twitter Cards, structured data |
| Security      | CSP headers, DOMPurify, Zod validation    |
| Forms         | Contact + job applications to CMS         |

## 📝 Common Tasks

**Add a page:**

1. Create `src/app/page-name/page.tsx`
2. Add to `src/components/navbar.tsx`
3. Create service + fallback data

**Build:**

```bash
npm run build
```

**Deploy to Vercel:**

1. Push to GitHub
2. Import to Vercel
3. Set env vars
4. Deploy

## 📦 Key Dependencies

- Next.js 16 + React 19
- Tailwind CSS 4
- Framer Motion (animations)
- React Hook Form + Zod

## 🔍 Bundle Analysis

Install in **this frontend folder only**:

```bash
npm install --save-dev @next/bundle-analyzer
```

Then modify `next.config.ts` and run `npm run build`.

Current build: ~50s (healthy)

---

See `PROJECT_DOCUMENTATION.md` for full project docs.
