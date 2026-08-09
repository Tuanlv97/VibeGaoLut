import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface BadgeProps {
  variant?: 'sage' | 'success' | 'warning' | 'destructive' | 'outline' | 'terracotta';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'sage',
  children,
  className,
}) => {
  const base = 'inline-flex items-center gap-1 font-semibold text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider';

  const variants = {
    sage: 'bg-[#2D5A27] text-white',
    success: 'bg-[#DCFCE7] text-[#166534] border border-[#DCFCE7]',
    warning: 'bg-[#FEF3C7] text-[#D97706] border border-[#FEF3C7]',
    destructive: 'bg-[#FEE2E2] text-[#991B1B] border border-[#FEE2E2]',
    terracotta: 'bg-[#C86D51] text-white',
    outline: 'bg-transparent text-[#64748B] border border-[#E2E8F0]',
  };

  return (
    <span className={twMerge(clsx(base, variants[variant], className))}>
      {children}
    </span>
  );
};
