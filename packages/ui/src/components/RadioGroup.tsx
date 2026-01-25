/**
 * Description : RadioGroup.tsx - 📌 라디오 버튼 그룹 컴포넌트
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */
import { cva } from 'class-variance-authority';
import React, { forwardRef, useState } from 'react';
import { type RadioGroupProps } from '../ui-types.js';

// 라디오 버튼 variant 스타일 정의
const radioVariants = cva(
  'h-4 w-4 rounded-full border border-border text-brand focus:ring-2 focus:ring-brand/20 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-3 w-3',
        default: 'h-4 w-4',
        lg: 'h-5 w-5',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

// 라디오 그룹 컴포넌트 정의
export const RadioGroup = forwardRef<HTMLInputElement, RadioGroupProps>(
  (
    {
      className = '',
      size,
      options,
      value,
      defaultValue,
      error,
      label,
      helperText,
      orientation = 'vertical',
      onValueChange,
      name,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue || '');
    const currentValue = value !== undefined ? value : internalValue;

    const handleChange = (optionValue: string) => {
      if (value === undefined) {
        setInternalValue(optionValue);
      }
      onValueChange?.(optionValue);
    };

    return (
      <div className={`space-y-2 ${className}`}>
        {label && <label className="text-text text-sm font-medium leading-none">{label}</label>}

        <div className={`space-y-2 ${orientation === 'horizontal' ? 'flex space-x-6 space-y-0' : ''}`}>
          {options.map(option => (
            <div key={option.value} className="flex items-start space-x-2">
              <input
                ref={ref}
                type="radio"
                name={name}
                value={option.value}
                checked={currentValue === option.value}
                disabled={option.disabled}
                onChange={() => handleChange(option.value)}
                className={radioVariants({ size })}
                {...props}
              />
              <div className="min-w-0 flex-1">
                <label
                  className="text-text cursor-pointer text-sm font-medium"
                  onClick={() => !option.disabled && handleChange(option.value)}
                >
                  {option.label}
                </label>
                {option.description && <p className="text-text-muted text-sm">{option.description}</p>}
              </div>
            </div>
          ))}
        </div>

        {(error || helperText) && (
          <p className={`text-sm ${error ? 'text-error' : 'text-text-muted'}`}>{error || helperText}</p>
        )}
      </div>
    );
  },
);

RadioGroup.displayName = 'RadioGroup';
