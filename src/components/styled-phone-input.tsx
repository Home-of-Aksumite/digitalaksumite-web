'use client';

import PhoneInput from 'react-phone-number-input';
import { cn } from '@/lib/utils';
import 'react-phone-number-input/style.css';

interface StyledPhoneInputProps {
  id?: string;
  value?: string;
  onChange?: (value?: string | undefined) => void;
  placeholder?: string;
  defaultCountry?: string;
  international?: boolean;
  className?: string;
  error?: boolean;
}

export function StyledPhoneInput({
  id,
  value,
  onChange,
  placeholder = 'Enter phone number',
  defaultCountry = 'ET',
  international = true,
  className,
  error,
}: StyledPhoneInputProps) {
  return (
    <div className={cn('phone-input-wrapper', className)}>
      <PhoneInput
        id={id}
        value={value}
        onChange={onChange as (value?: string | undefined) => void}
        placeholder={placeholder}
        defaultCountry={defaultCountry as 'ET'}
        international={international}
        className={cn(
          'block w-full rounded-lg border px-4 py-3',
          'border-[#E5E7EB] bg-white focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] focus:outline-none',
          'dark:border-[#374151] dark:bg-[#1F2937] dark:text-white',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500'
        )}
      />
      <style jsx global>{`
        .phone-input-wrapper .PhoneInput {
          display: flex;
          align-items: center;
        }
        .phone-input-wrapper .PhoneInputCountry {
          display: flex;
          align-items: center;
          margin-right: 0.75rem;
          padding-right: 0.75rem;
          border-right: 1px solid #e5e7eb;
        }
        .dark .phone-input-wrapper .PhoneInputCountry {
          border-right-color: #374151;
        }
        .phone-input-wrapper .PhoneInputCountrySelect {
          appearance: none;
          background: transparent;
          border: none;
          padding: 0;
          cursor: pointer;
          font-size: 0.875rem;
          color: inherit;
        }
        .phone-input-wrapper .PhoneInputCountryIcon {
          width: 1.25rem;
          height: auto;
          margin-right: 0.5rem;
        }
        .phone-input-wrapper .PhoneInputInput {
          flex: 1;
          background: transparent;
          border: none;
          padding: 0;
          font-size: 0.875rem;
          color: inherit;
          outline: none;
        }
        .phone-input-wrapper .PhoneInputInput::placeholder {
          color: #9ca3af;
        }
        .dark .phone-input-wrapper .PhoneInputInput::placeholder {
          color: #6b7280;
        }
      `}</style>
    </div>
  );
}
