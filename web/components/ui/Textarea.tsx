import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-[#1E293B]">
            {label}
            {props.required && <span className="text-red-500 font-bold ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          className={twMerge(
            clsx(
              'w-full bg-white border border-[#E2E8F0] rounded-lg p-3 text-[#1E293B] placeholder-[#94A3B8] text-sm transition-all focus:outline-none focus:border-[#2D5A27] focus:ring-2 focus:ring-[#2D5A27]/20 disabled:opacity-50 disabled:bg-slate-50 min-h-[100px]',
              error && 'border-[#991B1B] focus:border-[#991B1B] focus:ring-[#991B1B]/20',
              className
            )
          )}
          {...props}
        />
        {error && <span className="text-xs text-[#991B1B] font-medium">{error}</span>}
        {!error && helperText && (
          <span className="text-xs text-[#64748B]">{helperText}</span>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
