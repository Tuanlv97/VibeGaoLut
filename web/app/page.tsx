'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ProductGrid } from '@/features/product/ProductGrid';
import { BlogCard } from '@/features/blog/BlogCard';
import { Button } from '@/components/ui/Button';
import { useProducts, useCategories, useBlogPosts } from '@/lib/api/hooks';

export default function HomePage() {
  const { data: productsData } = useProducts();
  const { data: categories = [] } = useCategories();
  const { data: blogPostsData } = useBlogPosts();

  const products = productsData?.items || [];
  const blogPosts = blogPostsData?.items || [];

  const featuredProducts = products.slice(0, 4);
  const featuredBlog = blogPosts[0];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center shadow-xs">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F9F6F0] border border-[#2D5A27]/20 text-[#2D5A27] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Thực Phẩm Dưỡng Sinh Từ Thiên Nhiên
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-[#1E293B] leading-[1.15]">
              Dinh Dưỡng Tự Nhiên Cho Thói Quen Sống Lành
            </h1>

            <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
              Cung cấp gạo lứt đỏ ST25 nguyên cám, ngũ cốc hạ thổ, bột dưỡng sinh và trà thảo mộc nguyên chất. Trải nghiệm Guest Checkout COD 100% không rào cản.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/products">
                <Button variant="primary" size="lg" className="bg-[#2D5A27]">
                  Khám Phá Sản Phẩm Ngay
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/todo">
                <Button variant="secondary" size="lg">
                  Nhật Ký Todo Thói Quen
                </Button>
              </Link>
            </div>

            <div className="pt-6 border-t border-[#E2E8F0] grid grid-cols-3 gap-4 text-xs text-[#64748B]">
              <div>
                <strong className="block text-[#1E293B] font-mono text-base font-bold">100%</strong>
                <span>Nguyên cám tự nhiên</span>
              </div>
              <div>
                <strong className="block text-[#1E293B] font-mono text-base font-bold">0 Chi Phí</strong>
                <span>Tạo tài khoản Guest</span>
              </div>
              <div>
                <strong className="block text-[#1E293B] font-mono text-base font-bold">Freeship</strong>
                <span>Đơn hàng từ 300k</span>
              </div>
            </div>
          </div>

          <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-lg border border-[#E2E8F0] bg-slate-100">
            <Image
              src="https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1000&q=80"
              alt="GreenPantry Organic Food"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* Category Showcase Grid */}
      {categories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#1E293B]">
                Danh Mục Sản Phẩm Tự Nhiên
              </h2>
              <p className="text-xs text-[#64748B] mt-1">Tuyển chọn từ lúa nương và thảo mộc Việt Nam</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
            {categories.map((cat: any) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="group bg-white border border-[#E2E8F0] rounded-2xl p-4 text-center space-y-3 shadow-xs hover:shadow-md hover:border-[#2D5A27]/40 transition-all duration-200"
              >
                <div className="relative w-16 h-16 rounded-full overflow-hidden mx-auto bg-slate-50 border border-[#E2E8F0]">
                  {cat.imageUrl && (
                    <Image src={cat.imageUrl} alt={cat.name} fill className="object-cover group-hover:scale-110 transition-transform" />
                  )}
                </div>
                <h3 className="font-bold text-sm text-[#1E293B] group-hover:text-[#2D5A27] transition-colors">
                  {cat.name}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#1E293B]">
              Sản Phẩm Nổi Bật Dành Cho Bạn
            </h2>
            <p className="text-xs text-[#64748B] mt-1">Gạo lứt đỏ, bột sắn dây ta & trà đậu xanh lòng</p>
          </div>

          <Link href="/products" className="text-xs text-[#2D5A27] font-semibold hover:underline flex items-center gap-1">
            Xem tất cả <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <ProductGrid products={featuredProducts} columns={4} />
      </section>

      {/* Content Commerce Section */}
      {featuredBlog && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F9F6F0] border-2 border-[#2D5A27]/20 rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="bg-[#C86D51] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Content Commerce
              </span>
              <h2 className="text-3xl font-bold font-display text-[#1E293B]">
                {featuredBlog.title}
              </h2>
              <p className="text-sm text-[#64748B] leading-relaxed">
                {featuredBlog.excerpt}
              </p>
              <div className="pt-2">
                <Link href={`/blog/${featuredBlog.slug}`}>
                  <Button variant="primary" size="md" className="bg-[#2D5A27]">
                    Đọc Bài Viết & Xem Sản Phẩm <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-md bg-white">
              {featuredBlog.coverImage && (
                <Image
                  src={featuredBlog.coverImage}
                  alt={featuredBlog.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>
          </div>
        </section>
      )}

      {/* Blog Highlights Grid */}
      {blogPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#1E293B]">
                Góc Sức Khỏe & Dinh Dưỡng
              </h2>
              <p className="text-xs text-[#64748B] mt-1">Bài viết thực dưỡng, công thức nấu ăn & mẹo sống xanh</p>
            </div>

            <Link href="/blog" className="text-xs text-[#2D5A27] font-semibold hover:underline flex items-center gap-1">
              Xem tất cả bài viết <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts.map((post: any) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
