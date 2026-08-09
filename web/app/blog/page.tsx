'use client';

import React, { useState } from 'react';
import { MOCK_BLOG_POSTS } from '@/lib/mock-data';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { FeaturedBlogPost } from '@/features/blog/FeaturedBlogPost';
import { BlogCategoryTabs } from '@/features/blog/BlogCategoryTabs';
import { BlogGrid } from '@/features/blog/BlogGrid';

export default function BlogListingPage() {
  const [selectedCategory, setSelectedCategory] = useState('');

  const featuredPost = MOCK_BLOG_POSTS.find((p) => p.isFeatured) || MOCK_BLOG_POSTS[0];

  const filteredPosts = MOCK_BLOG_POSTS.filter((p) => {
    if (selectedCategory && p.categorySlug !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumb
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Blog kiến thức dinh dưỡng' },
        ]}
      />

      <div>
        <h1 className="text-3xl sm:text-4xl font-bold font-display text-[#1E293B]">
          Góc Sức Khỏe & Dinh Dưỡng Dưỡng Sinh
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B] mt-1">
          Tổng hợp kiến thức ăn thuần tự nhiên, mẹo nấu cơm gạo lứt dẻo ngon và bí quyết chăm sóc sức khỏe toàn diện.
        </p>
      </div>

      {/* Hero Featured Article */}
      <FeaturedBlogPost post={featuredPost} />

      {/* Category Tabs & Blog Grid */}
      <div className="space-y-4 pt-4 border-t border-[#E2E8F0]">
        <BlogCategoryTabs
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <BlogGrid posts={filteredPosts} />
      </div>
    </div>
  );
}
