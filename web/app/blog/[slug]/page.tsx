import React from 'react';
import { notFound } from 'next/navigation';
import { MOCK_BLOG_POSTS, MOCK_PRODUCTS } from '@/lib/mock-data';
import { BlogHeader } from '@/features/blog/BlogHeader';
import { BlogContent } from '@/features/blog/BlogContent';
import { ShareAndTags } from '@/features/blog/ShareAndTags';

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = MOCK_BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedProducts = MOCK_PRODUCTS.filter((p) =>
    post.relatedProductIds.includes(p.id)
  );

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <BlogHeader post={post} />
      <BlogContent content={post.content} relatedProducts={relatedProducts} />
      <ShareAndTags />
    </article>
  );
}
