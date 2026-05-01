/**
 * Fallback Data Service
 * Provides seed content when the CMS is unavailable
 * Hero subtitle uses "We create..." as chit code to indicate fallback mode
 */

/* eslint-disable unicorn/no-null -- Types require null for optional media fields */

import type {
  HomePage,
  AboutPage,
  ContactPage,
  Service,
  SiteSettings,
  TrustedPartner,
  Project,
  BlogPost,
  JobOpening,
  Footer,
  Testimonial,
} from '@/types/content';

// Fallback Services (6 items)
export const fallbackServices: Service[] = [
  {
    id: 1,
    documentId: '1',
    title: 'Website Strategy & Planning',
    slug: 'website-strategy-planning',
    shortDescription:
      "Don't build blind. We map out exactly what your website needs to do, who it's for, and how to beat your competitors — before you write a single line of code.",
    fullDescription:
      "Don't build blind. We map out exactly what your website needs to do, who it's for, and how to beat your competitors — before you write a single line of code.",
    icon: null,
    features: [],
    order: 1,
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    documentId: '2',
    title: 'Websites That Bring Customers',
    slug: 'websites-that-bring-customers',
    shortDescription:
      'Fast, stunning websites designed to turn visitors into buyers. We do not just make it look good — we make it work for your business 24/7.',
    fullDescription:
      'Fast, stunning websites designed to turn visitors into buyers. We do not just make it look good — we make it work for your business 24/7.',
    icon: null,
    features: [],
    order: 2,
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    documentId: '3',
    title: 'Custom Tools That Save You Hours',
    slug: 'custom-tools-save-hours',
    shortDescription:
      'Stop doing the same work twice. We build software that automates your daily tasks — inventory, tracking, reports, whatever eats your time.',
    fullDescription:
      'Stop doing the same work twice. We build software that automates your daily tasks — inventory, tracking, reports, whatever eats your time.',
    icon: null,
    features: [],
    order: 3,
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 4,
    documentId: '4',
    title: 'Online Stores Built for Sales',
    slug: 'online-stores-built-for-sales',
    shortDescription:
      'Secure, smooth checkout experiences that customers trust. From product pages to payment confirmation — everything optimized to sell more.',
    fullDescription:
      'Secure, smooth checkout experiences that customers trust. From product pages to payment confirmation — everything optimized to sell more.',
    icon: null,
    features: [],
    order: 4,
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 5,
    documentId: '5',
    title: 'Make Your Site Faster & Findable',
    slug: 'speed-growth-optimization',
    shortDescription:
      'Your site exists. Now let us make it faster and get more people to it. We fix slow pages, improve Google ranking, and get you more leads.',
    fullDescription:
      'Your site exists. Now let us make it faster and get more people to it. We fix slow pages, improve Google ranking, and get you more leads.',
    icon: null,
    features: [],
    order: 5,
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 6,
    documentId: '6',
    title: 'Your Tech Team on Retainer',
    slug: 'tech-team-on-retainer',
    shortDescription:
      'Software breaks. Software ages. Hackers do not sleep. We maintain, update, and protect your systems so you never worry about tech again.',
    fullDescription:
      'Software breaks. Software ages. Hackers do not sleep. We maintain, update, and protect your systems so you never worry about tech again.',
    icon: null,
    features: [],
    order: 6,
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Fallback Projects (3 items)
export const fallbackProjects: Project[] = [
  {
    title: 'The United Stand',
    slug: 'the-united-stand',
    client: 'The United Stand',
    summary:
      "Complete digital infrastructure for the world's largest independent Manchester United fan channel.",
    description:
      "Complete digital infrastructure for the world's largest independent Manchester United fan channel. With 2M+ subscribers and peak concurrent viewership exceeding 500,000 during major matches, the platform demands absolute reliability.",
    featuredImage: null,
    technologies: ['Next.js', 'Node.js', 'PostgreSQL'],
    link: 'https://theunitedstand.com',
    completedDate: '2024-06-01',
    featured: true,
    order: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: 'Aksum Eye Clinic',
    slug: 'aksum-eye-clinic',
    client: 'Aksum Eye Clinic',
    summary:
      "Patient management system and public website for Ethiopia's premier eye care facility.",
    description:
      "Patient management system and public website for Ethiopia's premier eye care facility. Bookings, records, trust — all digitized with efficiency matching European institutions.",
    featuredImage: null,
    technologies: ['React', 'Python', 'Django'],
    link: 'https://aksumeyeclinic.com',
    completedDate: '2024-03-15',
    featured: true,
    order: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: 'Yohana Music',
    slug: 'yohana-music',
    client: 'Yohana Music',
    summary: 'Portfolio platform for an Ethiopian artist reaching global audiences.',
    description:
      'Portfolio platform for an Ethiopian artist reaching global audiences. Designed for discovery and built for scale across three continents.',
    featuredImage: null,
    technologies: ['Next.js', 'Tailwind CSS', 'Vercel'],
    link: 'https://yohanasolomon.com',
    completedDate: '2024-01-20',
    featured: false,
    order: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Fallback Testimonials (3 fictional) - matches service return type
export const fallbackTestimonials: Testimonial[] = [
  {
    clientName: 'Marcus Chen',
    company: 'Pacific Trade Network',
    quote:
      'Our platform processes transactions across twelve time zones. Digital Aksumite built the backbone we never worry about. That peace of mind is rare.',
    rating: 5,
    featured: true,
    clientPhoto: null,
  },
  {
    clientName: 'Sarah Williams',
    company: 'Meridian Logistics',
    quote:
      'We needed a system that understood both African infrastructure and North American standards. They delivered exactly that. No compromises.',
    rating: 5,
    featured: true,
    clientPhoto: null,
  },
  {
    clientName: 'Dr. Yonas Alemu',
    company: 'Aksum Eye Clinic',
    quote:
      'Our patients trust us with their sight. We trust Digital Aksumite with our technology. That says everything.',
    rating: 5,
    featured: true,
    clientPhoto: null,
  },
];

// Fallback Blog Posts (3 posts)
export const fallbackBlogPosts: BlogPost[] = [
  {
    title: 'The Silence After the Launch',
    slug: 'the-silence-after-launch',
    excerpt: 'Why most software fails in month three, and how to prevent it.',
    content:
      'Why most software fails in month three, and how to prevent it. The silence after launch is deafening. Months of work, sleepless nights, countless iterations — and then nothing. The initial spike of interest fades, the bug reports slow to a trickle, and the dashboard shows flatlined metrics. This is where most software projects die.',
    publishedAt: '2026-01-15',
    updatedAt: '2026-01-15',
    featured: true,
    author: 'Digital Aksumite Team',
    featuredImage: null,
    gallery: [],
    tags: ['software', 'launch', 'maintenance'],
    readTime: 5,
    createdAt: '2026-01-15',
  },
  {
    title: 'Built in Africa, Used in Berlin',
    slug: 'built-in-africa-used-in-berlin',
    excerpt: 'On building global-grade technology from Ethiopia.',
    content:
      'On building global-grade technology from Ethiopia. There is a misconception that technology built in Africa is somehow inferior. We prove this wrong every day. Our systems serve clients across three continents, handling millions of requests with the same reliability expected from Silicon Valley or Berlin.',
    publishedAt: '2026-02-20',
    updatedAt: '2026-02-20',
    featured: false,
    author: 'Digital Aksumite Team',
    featuredImage: null,
    gallery: [],
    tags: ['africa', 'global', 'technology'],
    readTime: 4,
    createdAt: '2026-02-20',
  },
  {
    title: 'The Boring Choice Is Usually the Right One',
    slug: 'the-boring-choice-is-right',
    excerpt: 'Why we pick stable technology over trendy stacks.',
    content:
      'Why we pick stable technology over trendy stacks. Every week brings a new framework, a new paradigm, a new way to build software. We watch, we learn, and then we usually choose PostgreSQL. Not because we are boring, but because we are building for the long term.',
    publishedAt: '2026-03-05',
    updatedAt: '2026-03-05',
    featured: true,
    author: 'Digital Aksumite Team',
    featuredImage: null,
    gallery: [],
    tags: ['technology', 'architecture', 'opinion'],
    readTime: 6,
    createdAt: '2026-03-05',
  },
];

// Fallback HomePage (CHIT CODE: "We create..." = CMS down)
export const fallbackHomePage: HomePage = {
  heroTitle: 'We Build | Systems | That Last',
  heroSubtitle: 'We create systems that define, protect and guide our society.',
  heroPrimaryButtonText: 'Contact Us',
  heroPrimaryButtonUrl: '/#contact',
  heroSecondaryButtonText: 'Services',
  heroSecondaryButtonUrl: '/#services',
  heroSlides: [],
  aboutTitle: "Crafting Tomorrow's Foundation",
  aboutShortText: 'Technology built with purpose, precision, and permanence.',
  aboutButtonText: 'Discover Our Story',
  aboutSummary: 'We are Digital Aksumite. We build systems that stand the test of time.',
  servicesIntro: 'Our Services',
  projectsIntro: 'Featured Projects',
  testimonialsIntro: 'What Our Clients Say',
  blogIntro: 'Latest Insights',
  ctaTitle: 'Ready to Build Systems That Last?',
  ctaSubtitle: 'We work with organizations that think in decades, not quarters.',
  ctaPrimaryButtonText: 'Start a Project',
  ctaPrimaryButtonUrl: '/#contact',
  ctaSecondaryButtonText: 'Explore Services',
  ctaSecondaryButtonUrl: '/#services',
  updatedAt: new Date().toISOString(),
};

// Fallback AboutPage
export const fallbackAboutPage: AboutPage = {
  title: "Crafting Tomorrow's Foundation",
  mission:
    'To engineer digital infrastructure that empowers institutions and individuals across the world — from Addis Ababa to Amsterdam, from Nairobi to New York.',
  vision:
    'A world where technology serves humanity with integrity. Where African innovation leads globally. Where systems outlive their builders.',
  teamIntro: 'Our engineers combine technical precision with global perspective.',
  history:
    'Two years ago, three students in a campus dormitory saw something broken. Organizations struggled with technology that failed when it mattered most. Systems crashed. Data vanished. Trust eroded. We started with one laptop, no funding, and a conviction: Africa deserves technology as reliable as anything built in Silicon Valley or Berlin. So we built it ourselves. Today, we serve clients across three continents. The dormitory is gone. The conviction remains.',
  values: [
    { title: 'Excellence', description: 'Good enough is never enough.', icon: 'star' },
    { title: 'Impact', description: 'Technology must serve people, not vanity.', icon: 'zap' },
    { title: 'Integrity', description: 'We do what we say. No exceptions.', icon: 'shield' },
    { title: 'Global Mindset', description: 'Built in Africa. Trusted worldwide.', icon: 'globe' },
  ],
  stats: [
    { value: '2+', label: 'Years of Excellence' },
    { value: '50+', label: 'Systems Delivered' },
    { value: '3', label: 'Continents Served' },
    { value: '100%', label: 'Commitment' },
  ],
  companyImages: [],
  updatedAt: new Date().toISOString(),
};

// Fallback ContactPage
export const fallbackContactPage: ContactPage = {
  title: 'Get in Touch',
  subtitle: "Let's discuss how we can build something that lasts.",
  description:
    'Whether you have a specific project in mind or just want to explore possibilities, we are here to listen.',
  formTitle: 'Send us a Message',
  formDescription: 'Fill out the form below and we will respond within 24 hours.',
  updatedAt: new Date().toISOString(),
};

// Fallback SiteSettings
export const fallbackSiteSettings: SiteSettings = {
  siteName: 'Digital Aksumite',
  tagline: 'We build systems that define, protect and guide our society.',
  companyEmail: 'hello@digitalaksumite.com',
  companyPhone: '+2519 80698989',
  companyAddress: 'Addis Ababa, Ethiopia',
  workingHours: 'Monday - Friday: 9:00 AM - 6:00 PM EAT',
  linkedin: 'https://linkedin.com/company/digitalaksumite',
  twitter: 'https://twitter.com/digitalaksumite',
  instagram: 'https://instagram.com/digitalaksumite',
  github: 'https://github.com/digitalaksumite',
  defaultSEODescription:
    'Digital Aksumite crafts enduring digital systems that empower organizations across the world.',
  logo: null,
  favicon: null,
  updatedAt: new Date().toISOString(),
};

// Fallback Footer
export const fallbackFooter: Footer = {
  description:
    'Ancient power meets modern technology. We build digital solutions that honor our heritage while embracing the future.',
  copyrightText: `© ${new Date().getFullYear()} Digital Aksumite. All rights reserved.`,
  updatedAt: new Date().toISOString(),
};

// Fallback Job Openings (2 sample positions)
export const fallbackJobOpenings: JobOpening[] = [
  {
    id: 1,
    documentId: '1',
    title: 'Full Stack Developer',
    slug: 'full-stack-developer',
    department: 'Engineering',
    location: 'Addis Ababa / Remote',
    employmentType: '- Full-time',
    description:
      'We are looking for a talented Full Stack Developer to join our growing team. You will work on challenging projects that serve clients globally.',
    publishedDate: new Date().toISOString(),
    isInternship: false,
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    documentId: '2',
    title: 'UI/UX Design Intern',
    slug: 'ui-ux-design-intern',
    department: 'Design',
    location: 'Addis Ababa',
    employmentType: '- Internship',
    description:
      'Join our design team as an intern and learn from experienced designers working on international projects. Great opportunity to build your portfolio.',
    publishedDate: new Date().toISOString(),
    isInternship: true,
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Fallback Trusted Partners (3 items)
export const fallbackTrustedPartners: TrustedPartner[] = [
  {
    id: 1,
    documentId: '1',
    name: 'Google',
    link: 'https://google.com',
    order: 1,
    featured: true,
    logo: undefined,
    category: 'partner',
    createdAt: '',
    updatedAt: '',
    publishedAt: '',
  },
  {
    id: 2,
    documentId: '2',
    name: 'The United Stand',
    link: 'https://theunitedstand.com',
    order: 2,
    featured: true,
    logo: undefined,
    category: 'partner',
    createdAt: '',
    updatedAt: '',
    publishedAt: '',
  },
  {
    id: 3,
    documentId: '3',
    name: 'Yohana Music',
    link: 'https://yohannamusic.com',
    order: 3,
    featured: true,
    logo: undefined,
    category: 'partner',
    createdAt: '',
    updatedAt: '',
    publishedAt: '',
  },
  {
    id: 1,
    documentId: '1',
    name: 'Google',
    link: 'https://google.com',
    order: 1,
    featured: true,
    logo: undefined,
    category: 'partner',
    createdAt: '',
    updatedAt: '',
    publishedAt: '',
  },
  {
    id: 2,
    documentId: '2',
    name: 'The United Stand',
    link: 'https://theunitedstand.com',
    order: 2,
    featured: true,
    logo: undefined,
    category: 'partner',
    createdAt: '',
    updatedAt: '',
    publishedAt: '',
  },
  {
    id: 3,
    documentId: '3',
    name: 'Yohana Music',
    link: 'https://yohannamusic.com',
    order: 3,
    featured: true,
    logo: undefined,
    category: 'partner',
    createdAt: '',
    updatedAt: '',
    publishedAt: '',
  },
];
