import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverable = false,
  className,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          'bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-xs transition-all duration-200',
          hoverable && 'hover:shadow-md hover:-translate-y-0.5 hover:border-[#2D5A27]/30',
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
};
