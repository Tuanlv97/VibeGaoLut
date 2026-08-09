'use client';

import React from 'react';

interface BlogCategoryTabsProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const BlogCategoryTabs: React.FC<BlogCategoryTabsProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const categories = [
    { id: '', name: 'Tất Cả Bài Viết' },
    { id: 'kien-thuc-dinh-duong', name: 'Kiến Thức Dinh Dưỡng' },
    { id: 'cong-thuc-nau-an', name: 'Công Thức Nấu Ăn' },
    { id: 'meo-duong-sinh', name: 'Mẹo Dưỡng Sinh' },
    { id: 'tra-detox', name: 'Trà & Detox' },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelectCategory(cat.id)}
          className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            selectedCategory === cat.id
              ? 'bg-[#2D5A27] text-white shadow-xs'
              : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:border-[#2D5A27]'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};
