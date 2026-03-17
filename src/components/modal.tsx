'use client';

import { useEffect, useId, useMemo, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function Modal({ open, onOpenChange, title, description, children, className }: ModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | undefined>(undefined);

  const portalTarget = useMemo(() => {
    if (typeof document === 'undefined') return undefined;
    return document.body;
  }, []);

  useEffect(() => {
    if (!open) return;

    lastFocusedRef.current = document.activeElement as HTMLElement | undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusFirst = () => {
      const root = panelRef.current;
      if (!root) return;

      const focusable = root.querySelectorAll<HTMLElement>(
        'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'
      );

      const first = focusable[0] ?? root;
      first.focus();
    };

    const timeout = window.setTimeout(focusFirst, 0);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onOpenChange(false);
        return;
      }

      if (e.key !== 'Tab') return;

      const root = panelRef.current;
      if (!root) return;

      const focusable = Array.from(
        root.querySelectorAll<HTMLElement>(
          'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute('disabled') && el.tabIndex !== -1);

      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (e.shiftKey) {
        if (active === first || !root.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(timeout);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;

      const last = lastFocusedRef.current;
      if (last) last.focus();
    };
  }, [open, onOpenChange]);

  if (!open || !portalTarget) return undefined;

  return createPortal(
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close modal"
        className="absolute inset-0 bg-black/60"
        onClick={() => onOpenChange(false)}
      />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={description ? descriptionId : undefined}
          className={cn(
            'w-full max-w-3xl rounded-2xl border shadow-2xl',
            'focus:outline-none',
            // Light mode
            'border-gray-200 bg-white text-[#0F2A44]',
            // Dark mode
            'dark:border-white/10 dark:bg-[#0B1220] dark:text-white',
            className
          )}
        >
          <div
            className={cn(
              'flex items-start justify-between gap-6 border-b px-6 py-5',
              'border-gray-100',
              'dark:border-white/10'
            )}
          >
            <div>
              <h2 id={titleId} className="text-lg font-semibold tracking-tight">
                {title}
              </h2>
              {description && (
                <p
                  id={descriptionId}
                  className={cn('mt-1 text-sm', 'text-gray-500', 'dark:text-white/70')}
                >
                  {description}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className={cn(
                'inline-flex h-9 w-9 items-center justify-center rounded-lg',
                'transition focus:ring-2 focus:ring-[#C9A227] focus:ring-offset-0 focus:outline-none',
                // Light mode
                'border border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900',
                // Dark mode
                'dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white'
              )}
            >
              <span className="sr-only">Close</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div className="max-h-[80vh] overflow-auto px-6 py-6">{children}</div>
        </div>
      </div>
    </div>,
    portalTarget
  );
}
