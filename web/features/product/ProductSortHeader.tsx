'use client';

import React from 'react';
import { ArrowUpDown } from 'lucide-react';

interface ProductSortHeaderProps {
  totalCount: number;
  sortBy: string;
  onSortChange: (value: string) => void;
}

export const ProductSortHeader: React.FC<ProductSortHeaderProps> = ({
  totalCount,
  sortBy,
  onSortChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#E2E8F0] rounded-xl p-4 mb-6">
      <div className="text-sm text-[#1E293B]">
        Hiển thị <strong className="text-[#2D5A27]">{totalCount}</strong> sản phẩm thiên nhiên
      </div>

      <div className="flex items-center gap-2">
        <ArrowUpDown className="w-4 h-4 text-[#64748B]" />
        <span className="text-xs font-semibold text-[#64748B]">Sắp xếp:</span>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-[#F9F6F0] border border-[#E2E8F0] text-xs rounded-lg px-3 py-1.5 text-[#1E293B] focus:outline-none focus:border-[#2D5A27]"
        >
          <option value="newest">Mới Nhất</option>
          <option value="price-asc">Giá: Thấp Đến Cao</option>
          <option value="price-desc">Giá: Cao Đến Thấp</option>
          <option value="rating">Đánh Giá Cao Nhất</option>
        </select>
      </div>
    </div>
  );
};
