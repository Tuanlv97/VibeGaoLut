'use client';

import React from 'react';
import { MOCK_CATEGORIES } from '@/lib/mock-data';
import { Filter, Star, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ProductFilterSidebarProps {
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  selectedRating: number | null;
  onRatingChange: (rating: number | null) => void;
  onReset: () => void;
}

export const ProductFilterSidebar: React.FC<ProductFilterSidebarProps> = ({
  selectedCategory,
  onSelectCategory,
  priceRange,
  onPriceChange,
  selectedRating,
  onRatingChange,
  onReset,
}) => {
  return (
    <aside className="bg-white border border-[#E2E8F0] rounded-xl p-5 space-y-6">
      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
        <h3 className="font-bold text-base text-[#1E293B] flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#2D5A27]" />
          Bộ Lọc Sản Phẩm
        </h3>
        <button
          onClick={onReset}
          className="text-xs text-[#64748B] hover:text-[#2D5A27] flex items-center gap-1"
        >
          <RefreshCw className="w-3 h-3" />
          Xóa bộ lọc
        </button>
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="font-semibold text-sm text-[#1E293B] mb-3">Danh Mục</h4>
        <div className="space-y-1.5 text-sm">
          <button
            onClick={() => onSelectCategory('')}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
              selectedCategory === ''
                ? 'bg-[#2D5A27] text-white font-medium'
                : 'text-[#64748B] hover:bg-[#F9F6F0] hover:text-[#1E293B]'
            }`}
          >
            Tất Cả Sản Phẩm
          </button>
          {MOCK_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                selectedCategory === cat.slug
                  ? 'bg-[#2D5A27] text-white font-medium'
                  : 'text-[#64748B] hover:bg-[#F9F6F0] hover:text-[#1E293B]'
              }`}
            >
              <span>{cat.name}</span>
              <span className="text-xs opacity-75">({cat.productCount})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="border-t border-[#E2E8F0] pt-4">
        <h4 className="font-semibold text-sm text-[#1E293B] mb-3">Khoảng Giá</h4>
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-[#64748B] font-mono">
            <span>0đ</span>
            <span>{new Intl.NumberFormat('vi-VN').format(priceRange[1])}đ</span>
          </div>
          <input
            type="range"
            min={50000}
            max={500000}
            step={10000}
            value={priceRange[1]}
            onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
            className="w-full accent-[#2D5A27]"
          />
        </div>
      </div>

      {/* Rating Filter */}
      <div className="border-t border-[#E2E8F0] pt-4">
        <h4 className="font-semibold text-sm text-[#1E293B] mb-3">Đánh Giá Sao</h4>
        <div className="space-y-1.5 text-sm">
          {[5, 4, 3].map((star) => (
            <button
              key={star}
              onClick={() => onRatingChange(selectedRating === star ? null : star)}
              className={`w-full text-left px-3 py-1.5 rounded-lg flex items-center gap-2 ${
                selectedRating === star
                  ? 'bg-[#F9F6F0] border border-[#2D5A27] font-semibold text-[#2D5A27]'
                  : 'text-[#64748B] hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-0.5 text-amber-500">
                {Array.from({ length: star }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-xs text-[#1E293B]">Từ {star} sao</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};
