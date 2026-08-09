import React from 'react';
import Image from 'next/image';
import { User, Calendar, Clock } from 'lucide-react';
import { BlogPost } from '@/lib/mock-data';
import { Badge } from '@/components/ui/Badge';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

interface BlogHeaderProps {
  post: BlogPost;
}

export const BlogHeader: React.FC<BlogHeaderProps> = ({ post }) => {
  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      <Breadcrumb
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: post.title },
        ]}
      />

      <div className="flex items-center gap-2">
        <Badge variant="terracotta">{post.categoryName}</Badge>
      </div>

      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[#1E293B] leading-tight">
        {post.title}
      </h1>

      <div className="flex flex-wrap items-center gap-4 text-xs text-[#64748B] pt-2 border-b border-[#E2E8F0] pb-4">
        <span className="flex items-center gap-1.5 font-semibold text-[#1E293B]">
          <User className="w-4 h-4 text-[#2D5A27]" />
          Tác giả: {post.authorName}
        </span>
        <span>•</span>
        <span className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          {new Date(post.publishedAt).toLocaleDateString('vi-VN')}
        </span>
        <span>•</span>
        <span className="flex items-center gap-1.5 font-mono">
          <Clock className="w-4 h-4" />
          Thời gian đọc: {post.readingTimeMinutes} phút
        </span>
      </div>

      <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-100 border border-[#E2E8F0] my-6">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          priority
          className="object-cover"
        />
      </div>
    </div>
  );
};
