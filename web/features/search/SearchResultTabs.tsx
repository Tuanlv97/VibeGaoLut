'use client';

import React from 'react';

interface SearchResultTabsProps {
  activeTab: 'all' | 'products' | 'blogs' | 'questions';
  onTabChange: (tab: 'all' | 'products' | 'blogs' | 'questions') => void;
  counts: {
    all: number;
    products: number;
    blogs: number;
    questions: number;
  };
}

export const SearchResultTabs: React.FC<SearchResultTabsProps> = ({
  activeTab,
  onTabChange,
  counts,
}) => {
  const tabs: Array<{ id: 'all' | 'products' | 'blogs' | 'questions'; label: string; count: number }> = [
    { id: 'all', label: 'Tất Cả', count: counts.all },
    { id: 'products', label: 'Sản Phẩm', count: counts.products },
    { id: 'blogs', label: 'Bài Viết Dinh Dưỡng', count: counts.blogs },
    { id: 'questions', label: 'Cộng Đồng Q&A', count: counts.questions },
  ];

  return (
    <div className="flex items-center gap-2 border-b border-[#E2E8F0] pb-3 mb-6 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === tab.id
              ? 'bg-[#2D5A27] text-white shadow-xs'
              : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:text-[#1E293B]'
          }`}
        >
          <span>{tab.label}</span>
          <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
            activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-[#64748B]'
          }`}>
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
};
