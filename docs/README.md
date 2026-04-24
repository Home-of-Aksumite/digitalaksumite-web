# Digital Aksumite

**Professional Software Engineering Company Website**

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-06B6D4)](https://tailwindcss.com/)
[![ESLint](https://img.shields.io/badge/ESLint-9.0-purple)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-3.0-ff69b4)](https://prettier.io/)

---

## Project Overview

Digital Aksumite is a high-end software engineering company website built with modern technologies and professional engineering practices. The website showcases the company's services, projects, and capabilities with a focus on minimal, engineering-focused design similar to Stripe, Linear, and Vercel.

**Live Site:** [digitalaksumite.com](https://digitalaksumite.com) _(once deployed)_

---

## Architecture

### Frontend

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **UI Components:** Headless UI
- **Animation:** Framer Motion

### Backend

- **CMS:** Payload 3 (Headless)
- **Database:** PostgreSQL
- **API:** REST
- **Media:** Local storage (dev) / S3-compatible (prod)

### Deployment

- **Frontend:** Vercel
- **Backend:** Self-hosted / Cloud provider
- **CDN:** Vercel Edge Network

---

## Quick Start

### Prerequisites

- Node.js 18+
- npm 9+
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/digitalaksumite/website.git
cd digitalaksumite-web

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your actual values

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Development

### Available Scripts

| Command                | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start development server with hot reload |
| `npm run build`        | Create production build                  |
| `npm run start`        | Start production server                  |
| `npm run lint`         | Run ESLint checks                        |
| `npm run lint:fix`     | Fix ESLint issues automatically          |
| `npm run format`       | Format code with Prettier                |
| `npm run format:check` | Check code formatting                    |
| `npm run type-check`   | Run TypeScript type checking             |
| `npm run validate`     | Run all validation checks                |

### Project Structure

```
digitalaksumite-web/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   ├── config/           # Configuration files
│   ├── lib/              # Core utilities and API client
│   ├── services/         # API service layer
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Helper utilities
├── tests/                # Test files
├── docs/                 # Documentation
├── public/               # Static assets
└── .husky/               # Git hooks
```

---

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

| Variable                    | Description              | Required                |
| --------------------------- | ------------------------ | ----------------------- |
| `NEXT_PUBLIC_CMS_API_URL`   | CMS API base URL         | Yes                     |
| `NEXT_PUBLIC_CMS_API_TOKEN` | API authentication token | No (for public content) |
| `NEXT_PUBLIC_SITE_URL`      | Production site URL      | Yes                     |
| `NODE_ENV`                  | Environment mode         | Auto-set                |
| `COOKIE_SECRET`             | Session cookie secret    | Production only         |

---

## Code Quality

### ESLint Configuration

- Next.js core web vitals rules
- TypeScript strict rules
- Security plugin
- Import plugin
- Unicorn plugin for best practices

### Prettier Configuration

- Single quotes
- 2-space indentation
- 100 character line width
- Trailing commas (ES5)

### Pre-commit Hooks

Husky + lint-staged runs on every commit:

- ESLint auto-fix
- Prettier formatting

---

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes with proper tests
3. Run validation: `npm run validate`
4. Commit with clear messages
5. Push and create a Pull Request

### Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

---

## Security

See [SECURITY.md](./SECURITY.md) for:

- Security policy
- Reporting vulnerabilities
- Best practices

---

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for:

- System design
- Data flow
- Component structure
- API integration patterns

---

## License

Proprietary - Digital Aksumite

---

## Contact

**Digital Aksumite**

- Website: [digitalaksumite.com](https://digitalaksumite.com)
- Email: contact@digitalaksumite.com
- Location: Addis Ababa, Ethiopia

---

_"We create systems that define, protect and guide our society."_
