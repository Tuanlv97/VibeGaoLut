import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, User } from 'lucide-react';
import { BlogPost } from '@/lib/mock-data';
import { Badge } from '@/components/ui/Badge';

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <article className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-xs hover:shadow-md hover:border-[#2D5A27]/40 transition-all duration-200 flex flex-col">
      <Link href={`/blog/${post.slug}`} className="relative aspect-video w-full overflow-hidden bg-slate-100 block">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2">
          <Badge variant="terracotta">{post.categoryName}</Badge>
        </div>
      </Link>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          <Link href={`/blog/${post.slug}`} className="font-bold text-base text-[#1E293B] hover:text-[#2D5A27] line-clamp-2 leading-snug">
            {post.title}
          </Link>
          <p className="text-xs text-[#64748B] line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
          <span className="flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-[#2D5A27]" />
            {post.authorName}
          </span>
          <span className="flex items-center gap-1 font-mono">
            <Clock className="w-3.5 h-3.5" />
            {post.readingTimeMinutes} phút đọc
          </span>
        </div>
      </div>
    </article>
  );
};
