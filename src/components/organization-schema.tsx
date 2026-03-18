'use client';

import Script from 'next/script';

interface OrganizationSchemaProps {
  siteUrl: string;
  siteSettings?: {
    companyEmail?: string;
    companyPhone?: string;
    companyAddress?: string;
  } | null;
}

export function OrganizationSchema({ siteUrl, siteSettings }: OrganizationSchemaProps) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Digital Aksumite',
    alternateName: ['Aksumite', 'Aksumawit', 'Digital Aksumite Software'],
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    slogan: 'We build systems that define, protect and guide our society!',
    description:
      'Premium software development company delivering world-class web applications, mobile apps, and cloud solutions globally.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteSettings?.companyPhone || '+251980698989',
      email: siteSettings?.companyEmail || 'hello@digitalaksumite.com',
      contactType: 'customer service',
      availableLanguage: ['English'],
    },
    sameAs: [
      // Add your social media URLs here
      // 'https://facebook.com/digitalaksumite',
      // 'https://twitter.com/digitalaksumite',
      // 'https://linkedin.com/company/digitalaksumite',
      // 'https://instagram.com/digitalaksumite',
    ],
    areaServed: [
      {
        '@type': 'Place',
        name: 'United Kingdom',
      },
      {
        '@type': 'Place',
        name: 'Europe',
      },
      {
        '@type': 'Place',
        name: 'United States',
      },
      {
        '@type': 'Place',
        name: 'North America',
      },
      {
        '@type': 'Place',
        name: 'Ethiopia',
      },
      {
        '@type': 'Place',
        name: 'Africa',
      },
      {
        '@type': 'Place',
        name: 'Global',
      },
    ],
    knowsAbout: [
      'Software Development',
      'Web Development',
      'Mobile App Development',
      'Cloud Solutions',
      'Digital Transformation',
      'Enterprise Software',
      'Technology Consulting',
      'React Development',
      'Next.js Development',
      'Node.js Development',
      'Full Stack Development',
    ],
    serviceType: [
      'Web Application Development',
      'Mobile Application Development',
      'Cloud Solutions',
      'Custom Software Development',
      'Enterprise Software Solutions',
      'SaaS Development',
      'E-commerce Development',
      'API Development',
      'DevOps Services',
      'UI/UX Design',
    ],
    priceRange: '$$$',
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}
