'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { BlogGrid } from '@/features/blog/BlogGrid';
import { useBlogPosts } from '@/lib/api/hooks';

export default function BlogCategoryPage() {
  const params = useParams();
  const slug = (params?.slug as string) || '';

  const { data: blogPostsData } = useBlogPosts({ categoryId: slug });
  const filteredPosts = blogPostsData?.items || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumb
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: `Chuyên mục ${slug}` },
        ]}
      />

      <div>
        <h1 className="text-3xl font-bold font-display text-[#1E293B] capitalize">
          Chuyên Mục: {slug.replace(/-/g, ' ')}
        </h1>
        <p className="text-xs text-[#64748B] mt-1">
          Các bài viết hướng dẫn chuyên sâu thuộc chuyên mục.
        </p>
      </div>

      <BlogGrid posts={filteredPosts} />
    </div>
  );
}
