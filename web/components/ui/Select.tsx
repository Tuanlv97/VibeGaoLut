import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-[#1E293B]">
            {label}
            {props.required && <span className="text-[#991B1B] ml-1">*</span>}
          </label>
        )}
        <select
          ref={ref}
          className={twMerge(
            clsx(
              'w-full bg-white border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[#1E293B] text-sm transition-all focus:outline-none focus:border-[#2D5A27] focus:ring-2 focus:ring-[#2D5A27]/20 disabled:opacity-50 disabled:bg-slate-50',
              error && 'border-[#991B1B] focus:border-[#991B1B] focus:ring-[#991B1B]/20',
              className
            )
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <span className="text-xs text-[#991B1B] font-medium">{error}</span>}
      </div>
    );
  }
);

Select.displayName = 'Select';
