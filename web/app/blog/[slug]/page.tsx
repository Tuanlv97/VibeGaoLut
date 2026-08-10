'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { BlogHeader } from '@/features/blog/BlogHeader';
import { BlogContent } from '@/features/blog/BlogContent';
import { ShareAndTags } from '@/features/blog/ShareAndTags';
import { useBlogPostDetail } from '@/lib/api/hooks';

export default function BlogDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) || '';

  const { data } = useBlogPostDetail(slug);
  const post = data?.post;
  const relatedProducts = data?.relatedProducts || [];

  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-sm text-[#64748B]">
        Chưa tìm thấy bài viết này hoặc bài viết không tồn tại.
      </div>
    );
  }

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <BlogHeader post={post} />
      <BlogContent content={post.content} relatedProducts={relatedProducts} />
      <ShareAndTags />
    </article>
  );
}
