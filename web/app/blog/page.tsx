'use client';

import React, { useState } from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { FeaturedBlogPost } from '@/features/blog/FeaturedBlogPost';
import { BlogCategoryTabs } from '@/features/blog/BlogCategoryTabs';
import { BlogGrid } from '@/features/blog/BlogGrid';
import { useBlogPosts } from '@/lib/api/hooks';

export default function BlogListingPage() {
  const [selectedCategory, setSelectedCategory] = useState('');

  const { data: blogPostsData } = useBlogPosts({
    categoryId: selectedCategory || undefined,
  });

  const postsList = blogPostsData?.items || [];
  const featuredPost = postsList.find((p: any) => p.isFeatured) || postsList[0];

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
      {featuredPost && <FeaturedBlogPost post={featuredPost} />}

      {/* Category Tabs & Blog Grid */}
      <div className="space-y-4 pt-4 border-t border-[#E2E8F0]">
        <BlogCategoryTabs
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <BlogGrid posts={postsList} />
      </div>
    </div>
  );
}
