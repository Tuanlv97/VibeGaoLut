'use client';

import React from 'react';

interface QuestionFilterTabsProps {
  selectedType: string;
  onSelectType: (type: string) => void;
}

export const QuestionFilterTabs: React.FC<QuestionFilterTabsProps> = ({
  selectedType,
  onSelectType,
}) => {
  const types = [
    { id: '', name: 'Tất Cả Câu Hỏi' },
    { id: 'Product', name: 'Về Sản Phẩm' },
    { id: 'Nutrition', name: 'Dinh Dưỡng Thực Dưỡng' },
    { id: 'Cooking', name: 'Cách Nấu & Ngâm Gạo' },
    { id: 'General', name: 'Thắc Mắc Chung' },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6">
      {types.map((t) => (
        <button
          key={t.id}
          onClick={() => onSelectType(t.id)}
          className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            selectedType === t.id
              ? 'bg-[#2D5A27] text-white shadow-xs'
              : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:border-[#2D5A27]'
          }`}
        >
          {t.name}
        </button>
      ))}
    </div>
  );
};
