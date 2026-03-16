'use client';

import { useCallback, useState } from 'react';
import { cn } from '@/lib/utils';
import { Upload, File, X } from 'lucide-react';

interface FileUploadProps {
  id?: string;
  accept?: string;
  maxSize?: number; // in MB
  onFileSelect: (file: File | undefined) => void;
  selectedFile?: File | undefined;
  label?: string;
  required?: boolean;
  error?: string;
}

export function FileUpload({
  id = 'file-upload',
  accept = '.pdf',
  maxSize = 5,
  onFileSelect,
  selectedFile,
  label = 'Resume / CV',
  required = false,
  error,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const validateFile = useCallback(
    (file: File): boolean => {
      const maxBytes = maxSize * 1024 * 1024;
      if (file.size > maxBytes) {
        return false;
      }
      const acceptedTypes = accept.split(',').map((t) => t.trim());
      const isAccepted = acceptedTypes.some((type) => {
        if (type.startsWith('.')) {
          return file.name.toLowerCase().endsWith(type.toLowerCase());
        }
        return file.type.match(type);
      });
      return isAccepted;
    },
    [accept, maxSize]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && validateFile(file)) {
        onFileSelect(file);
      }
    },
    [onFileSelect, validateFile]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && validateFile(file)) {
        onFileSelect(file);
      }
    },
    [onFileSelect, validateFile]
  );

  const clearFile = useCallback(() => {
    onFileSelect(undefined);
  }, [onFileSelect]);

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-[#0F2A44] dark:text-white">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      {selectedFile ? (
        <div
          className={cn(
            'relative flex items-center gap-4 rounded-xl border-2 px-5 py-4',
            'border-[#C9A227]/30 bg-[#C9A227]/5',
            'dark:border-[#C9A227]/30 dark:bg-[#C9A227]/10'
          )}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#C9A227]/20 bg-[#C9A227]/10">
            <File className="h-6 w-6 text-[#C9A227]" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-[#0F2A44] dark:text-white">
              {selectedFile.name}
            </p>
            <p className="mt-0.5 text-xs text-[#6B7280] dark:text-[#9CA3AF]">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
          <button
            type="button"
            onClick={clearFile}
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-lg',
              'border border-[#E5E7EB] bg-white text-[#6B7280]',
              'transition hover:border-red-300 hover:text-red-500',
              'dark:border-[#374151] dark:bg-[#1F2937] dark:hover:border-red-500/50 dark:hover:text-red-400'
            )}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label
          htmlFor={id}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            'group relative flex cursor-pointer flex-col items-center justify-center',
            'rounded-xl border-2 border-dashed px-6 py-8',
            'transition-all duration-200',
            isDragging
              ? 'border-[#C9A227] bg-[#C9A227]/10'
              : 'border-[#E5E7EB] bg-white hover:border-[#C9A227]/50 hover:bg-[#C9A227]/5',
            'dark:border-[#374151] dark:bg-[#1F2937]/50',
            'dark:hover:border-[#C9A227]/50 dark:hover:bg-[#C9A227]/10'
          )}
        >
          <input
            id={id}
            type="file"
            accept={accept}
            onChange={handleFileSelect}
            className="sr-only"
          />

          <div
            className={cn(
              'mb-4 flex h-14 w-14 items-center justify-center rounded-2xl',
              'border border-[#E5E7EB] bg-white shadow-sm',
              'transition group-hover:shadow-md',
              'dark:border-[#374151] dark:bg-[#1F2937]'
            )}
          >
            <Upload className="h-6 w-6 text-[#C9A227]" />
          </div>

          <p className="text-center text-sm font-medium text-[#0F2A44] dark:text-white">
            <span className="text-[#C9A227]">Click to upload</span> or drag and drop
          </p>
          <p className="mt-1 text-center text-xs text-[#6B7280] dark:text-[#9CA3AF]">
            PDF up to {maxSize}MB
          </p>
        </label>
      )}

      {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}
