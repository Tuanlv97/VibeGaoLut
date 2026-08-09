'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { MOCK_PRODUCTS, MOCK_BLOG_POSTS, MOCK_QUESTIONS } from '@/lib/mock-data';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SearchInputBar } from '@/features/search/SearchInputBar';
import { SearchResultTabs } from '@/features/search/SearchResultTabs';
import { ProductGrid } from '@/features/product/ProductGrid';
import { BlogGrid } from '@/features/blog/BlogGrid';
import { QuestionCardList } from '@/features/qa/QuestionCardList';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<'all' | 'products' | 'blogs' | 'questions'>('all');

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return MOCK_PRODUCTS;
    const q = query.toLowerCase();
    return MOCK_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q)
    );
  }, [query]);

  const filteredBlogs = useMemo(() => {
    if (!query.trim()) return MOCK_BLOG_POSTS;
    const q = query.toLowerCase();
    return MOCK_BLOG_POSTS.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.excerpt.toLowerCase().includes(q) ||
        b.content.toLowerCase().includes(q)
    );
  }, [query]);

  const filteredQuestions = useMemo(() => {
    if (!query.trim()) return MOCK_QUESTIONS;
    const q = query.toLowerCase();
    return MOCK_QUESTIONS.filter(
      (ques) =>
        ques.content.toLowerCase().includes(q) ||
        (ques.answer && ques.answer.content.toLowerCase().includes(q))
    );
  }, [query]);

  const counts = {
    all: filteredProducts.length + filteredBlogs.length + filteredQuestions.length,
    products: filteredProducts.length,
    blogs: filteredBlogs.length,
    questions: filteredQuestions.length,
  };

  return (
    <div className="space-y-6">
      <SearchInputBar query={query} onSearch={setQuery} />

      {query && (
        <div className="text-sm text-[#64748B] mb-4">
          Kết quả tìm kiếm cho từ khóa: <strong className="text-[#2D5A27]">"{query}"</strong>
        </div>
      )}

      <SearchResultTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        counts={counts}
      />

      {/* Results Content */}
      <div className="space-y-10">
        {(activeTab === 'all' || activeTab === 'products') && (
          <div className="space-y-4">
            <h3 className="font-bold text-xl font-display text-[#1E293B] border-b border-[#E2E8F0] pb-2">
              Sản Phẩm ({filteredProducts.length})
            </h3>
            <ProductGrid products={filteredProducts} columns={4} />
          </div>
        )}

        {(activeTab === 'all' || activeTab === 'blogs') && (
          <div className="space-y-4 pt-4">
            <h3 className="font-bold text-xl font-display text-[#1E293B] border-b border-[#E2E8F0] pb-2">
              Bài Viết Dinh Dưỡng ({filteredBlogs.length})
            </h3>
            <BlogGrid posts={filteredBlogs} />
          </div>
        )}

        {(activeTab === 'all' || activeTab === 'questions') && (
          <div className="space-y-4 pt-4">
            <h3 className="font-bold text-xl font-display text-[#1E293B] border-b border-[#E2E8F0] pb-2">
              Hỏi Đáp Cộng Đồng ({filteredQuestions.length})
            </h3>
            <QuestionCardList questions={filteredQuestions} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumb
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Kết quả tìm kiếm' },
        ]}
      />

      <Suspense fallback={<div className="text-center py-12 text-sm text-[#64748B]">Đang tìm kiếm...</div>}>
        <SearchContent />
      </Suspense>
    </div>
  );
}
