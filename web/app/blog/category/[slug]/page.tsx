import React from 'react';
import { MOCK_BLOG_POSTS } from '@/lib/mock-data';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { BlogGrid } from '@/features/blog/BlogGrid';

interface BlogCategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogCategoryPage({ params }: BlogCategoryPageProps) {
  const { slug } = await params;
  const filteredPosts = MOCK_BLOG_POSTS.filter((p) => p.categorySlug === slug);

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
