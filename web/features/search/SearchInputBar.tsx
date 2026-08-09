'use client';

import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchInputBarProps {
  query: string;
  onSearch: (q: string) => void;
}

export const SearchInputBar: React.FC<SearchInputBarProps> = ({ query, onSearch }) => {
  const [val, setVal] = useState(query);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(val);
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto mb-8">
      <input
        type="text"
        placeholder="Tìm kiếm gạo lứt, sản phẩm, bài viết dinh dưỡng hay câu hỏi..."
        value={val}
        onChange={(e) => setVal(e.target.value)}
        className="w-full bg-white border-2 border-[#2D5A27] rounded-2xl pl-12 pr-12 py-3.5 text-base text-[#1E293B] shadow-md focus:outline-none focus:ring-4 focus:ring-[#2D5A27]/10"
      />
      <Search className="w-5 h-5 absolute left-4 top-4 text-[#2D5A27]" />
      {val && (
        <button
          type="button"
          onClick={() => {
            setVal('');
            onSearch('');
          }}
          className="absolute right-4 top-4 text-[#64748B] hover:text-[#1E293B]"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </form>
  );
};
