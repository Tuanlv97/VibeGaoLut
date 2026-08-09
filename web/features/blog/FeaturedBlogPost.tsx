import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, User, ArrowRight } from 'lucide-react';
import { BlogPost } from '@/lib/mock-data';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface FeaturedBlogPostProps {
  post: BlogPost;
}

export const FeaturedBlogPost: React.FC<FeaturedBlogPostProps> = ({ post }) => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-2 mb-10">
      <Link href={`/blog/${post.slug}`} className="relative aspect-video lg:aspect-auto w-full h-full min-h-[260px] bg-slate-100 block">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <Badge variant="sage">BÀI VIẾT NỔI BẬT</Badge>
        </div>
      </Link>

      <div className="p-6 sm:p-8 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <Badge variant="outline">{post.categoryName}</Badge>
          <Link href={`/blog/${post.slug}`}>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#1E293B] hover:text-[#2D5A27] transition-colors leading-tight">
              {post.title}
            </h2>
          </Link>
          <p className="text-sm text-[#64748B] leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-[#64748B]">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-[#2D5A27]" />
              {post.authorName}
            </span>
            <span className="flex items-center gap-1 font-mono">
              <Clock className="w-3.5 h-3.5" />
              {post.readingTimeMinutes} phút đọc
            </span>
          </div>

          <Link href={`/blog/${post.slug}`}>
            <Button variant="primary" size="sm">
              Đọc Tiếp <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
