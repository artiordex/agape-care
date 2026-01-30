/**
 * Description : Textarea.tsx - 📌 텍스트 영역 컴포넌트
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */
import { cva } from 'class-variance-authority';
import React, { forwardRef } from 'react';
import { type TextareaProps } from '../ui-types.js';

// 텍스트 영역 variant 스타일 정의
const textareaVariants = cva(
  'flex w-full rounded border bg-white px-3 py-2 text-sm transition-colors placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px]',
  {
    variants: {
      variant: {
        default: 'border-gray-300 hover:border-blue-500 focus:border-blue-500',
        error: 'border-red-500 focus:border-red-500 focus-visible:ring-red-500/20',
        success: 'border-green-500 focus:border-green-500 focus-visible:ring-green-500/20',
      },
      resize: {
        none: 'resize-none',
        both: 'resize',
        horizontal: 'resize-x',
        vertical: 'resize-y',
      },
    },
    defaultVariants: {
      variant: 'default',
      resize: 'vertical',
    },
  },
);

// 텍스트 영역 컴포넌트 정의
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', variant, resize, error, label, helperText, ...props }, ref) => {
    const textareaVariant = error ? 'error' : variant;

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`${textareaVariants({ variant: textareaVariant, resize })} ${className}`}
          {...props}
        />
        {(error || helperText) && (
          <p className={`text-sm ${error ? 'text-error' : 'text-text-muted'}`}>{error || helperText}</p>
        )}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
