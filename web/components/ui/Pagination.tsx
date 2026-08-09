'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 pt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 border border-[#E2E8F0] rounded-lg bg-white disabled:opacity-50 text-[#1E293B] hover:bg-[#F9F6F0]"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {Array.from({ length: totalPages }).map((_, i) => {
        const page = i + 1;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-9 h-9 text-xs font-semibold rounded-lg font-mono transition-colors ${
              currentPage === page
                ? 'bg-[#2D5A27] text-white'
                : 'bg-white border border-[#E2E8F0] text-[#1E293B] hover:bg-[#F9F6F0]'
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 border border-[#E2E8F0] rounded-lg bg-white disabled:opacity-50 text-[#1E293B] hover:bg-[#F9F6F0]"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};
