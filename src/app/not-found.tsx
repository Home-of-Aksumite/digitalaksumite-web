'use client';

import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0F2A44] px-4">
      <div className="text-center">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <h1
            className={cn(
              'text-[120px] leading-none font-bold tracking-tighter',
              'text-[#C9A227]',
              'md:text-[180px]'
            )}
          >
            404
          </h1>
          <div className="absolute inset-0 opacity-20 blur-3xl">
            <span className="text-[120px] leading-none font-bold tracking-tighter text-[#C9A227] md:text-[180px]">
              404
            </span>
          </div>
        </div>

        {/* Message */}
        <h2 className="mb-4 text-2xl font-semibold text-white md:text-3xl">
          Oops! This page seems to have wandered off.
        </h2>
        <p className="mx-auto mb-8 max-w-md text-lg text-[#E5E7EB]/70">
          Let&apos;s get you back to building something amazing together.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={() => router.push('/')}
            className={cn(
              'group relative rounded-xl px-8 py-4 font-semibold',
              'bg-[#C9A227] text-[#121212]',
              'transition-all duration-300',
              'hover:scale-105 hover:shadow-[0_0_30px_rgba(201,162,39,0.4)]',
              'focus:ring-2 focus:ring-[#C9A227]/50 focus:outline-none'
            )}
          >
            <span className="flex items-center gap-2">
              <svg
                className="h-5 w-5 transition-transform group-hover:-translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Take Me Home
            </span>
          </button>

          <button
            onClick={() => router.push('/contact')}
            className={cn(
              'rounded-xl px-8 py-4 font-semibold',
              'border-2 border-[#C9A227]/50 text-[#C9A227]',
              'transition-all duration-300',
              'hover:border-[#C9A227] hover:bg-[#C9A227]/10',
              'focus:ring-2 focus:ring-[#C9A227]/50 focus:outline-none'
            )}
          >
            <span className="flex items-center gap-2">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Contact Us
            </span>
          </button>
        </div>

        {/* Decorative Element */}
        <div className="mt-16 flex justify-center">
          <div className="flex items-center gap-2 text-sm text-[#E5E7EB]/50">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#E5E7EB]/30" />
            <span>Digital Aksumite</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#E5E7EB]/30" />
          </div>
        </div>
      </div>
    </div>
  );
}
