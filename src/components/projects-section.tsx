/**
 * Projects Section
 * Display featured projects with premium card interactions
 */

'use client';

import { Container } from '@/components/container';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/scroll-reveal';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { strapiApiUrl } from '@/config/env';

// API Project interface (matches Strapi response)
export interface ApiProject {
  title: string;
  slug: string;
  description: string;
  featured?: boolean;
  link?: string;
  featuredImage?: {
    url: string;
    alternativeText?: string | null;
  } | null;
}

interface ProjectsSectionProps {
  title?: string;
  subtitle?: string;
  projects?: ApiProject[];
}

export function ProjectsSection({
  title = 'Featured Projects',
  subtitle = 'See how we have helped businesses transform their digital presence with tailored solutions.',
  projects = undefined,
}: ProjectsSectionProps) {
  if (!projects || projects.length === 0) {
    return undefined;
  }

  const displayProjects = projects;

  return (
    <section
      id="projects"
      className={cn(
        'border-t border-[#E8E4DC] py-20 md:py-28 lg:py-32',
        'bg-[#FAFAF5]',
        'dark:border-[#2D3748] dark:bg-[#18181B]'
      )}
    >
      <Container>
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:mb-16 md:flex-row md:items-end">
          <div>
            <ScrollReveal>
              <span className="text-sm font-semibold tracking-widest text-[#C9A227] uppercase">
                Portfolio
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2
                className={cn(
                  'mt-3 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl',
                  'text-[#0F2A44]',
                  'dark:text-white'
                )}
              >
                {title}
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p
                className={cn(
                  'mt-4 max-w-xl text-base md:text-lg',
                  'text-[#475569]',
                  'dark:text-[#9CA3AF]'
                )}
              >
                {subtitle}
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Projects Grid */}
        <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" staggerDelay={0.15}>
          {displayProjects.map((project) => (
            <StaggerItem key={project.slug}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}

function ProjectCard({ project }: { project: ApiProject }) {
  // Get featured image URL
  const hasImage = project.featuredImage?.url;
  const imageUrl = hasImage
    ? project.featuredImage!.url.startsWith('http')
      ? project.featuredImage!.url
      : `${strapiApiUrl}${project.featuredImage!.url}`
    : undefined;

  // Use link for external website, or undefined if not available
  const externalLink = project.link || undefined;

  return (
    <motion.article
      className={cn(
        'group relative overflow-hidden rounded-2xl',
        'border border-gray-100 bg-white shadow-sm',
        'dark:border-transparent dark:bg-[#1F2937]',
        'transition-all duration-500',
        'hover:shadow-[0_20px_40px_rgba(15,42,68,0.12)]',
        'dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]',
        externalLink && 'cursor-pointer'
      )}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Image Container - clickable if external link exists */}
      {externalLink ? (
        <a
          href={externalLink}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block aspect-[16/10] cursor-pointer overflow-hidden bg-[#1F2937]"
        >
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt={project.featuredImage?.alternativeText || project.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-white">
              <span className="text-lg font-semibold">{project.title}</span>
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F2A44] via-[#0F2A44]/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* View Project link on hover */}
          <div className="absolute right-4 bottom-4 left-4 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="inline-flex cursor-pointer items-center text-sm font-medium text-[#C9A227] hover:underline">
              View Project →
            </span>
          </div>
        </a>
      ) : (
        <div className="relative aspect-[16/10] overflow-hidden bg-[#1F2937]">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt={project.featuredImage?.alternativeText || project.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-white">
              <span className="text-lg font-semibold">{project.title}</span>
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F2A44] via-[#0F2A44]/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <h3
          className={cn(
            'mb-2 text-xl font-bold',
            'text-[#0F2A44]',
            'dark:text-white',
            'transition-colors duration-300',
            'group-hover:text-[#C9A227]'
          )}
        >
          {project.title}
        </h3>
        <p
          className={cn(
            'text-[15px] leading-relaxed break-words',
            'text-[#475569]',
            'dark:text-[#9CA3AF]'
          )}
        >
          {project.description}
        </p>
      </div>

      {/* Bottom accent line */}
      <div className="absolute right-0 bottom-0 left-0 h-1 scale-x-0 bg-gradient-to-r from-[#C9A227] via-[#C9A227] to-[#C9A227] transition-transform duration-500 group-hover:scale-x-100" />
    </motion.article>
  );
}
