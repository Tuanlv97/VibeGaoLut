'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Search, Calendar, Menu, X, Leaf } from 'lucide-react';
import { useCartStore } from '@/stores/cart-store';

export const Navbar: React.FC = () => {
  const router = useRouter();
  const totalCartCount = useCartStore((s) => s.getTotalCount());
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-backdrop border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold font-display text-[#2D5A27] shrink-0">
          <div className="p-2 bg-[#2D5A27] text-white rounded-xl">
            <Leaf className="w-5 h-5" />
          </div>
          <span>GreenPantry</span>
        </Link>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#1E293B]">
          <Link href="/products" className="hover:text-[#2D5A27] transition-colors">
            Sản Phẩm
          </Link>
          <Link href="/new-products" className="hover:text-[#2D5A27] transition-colors flex items-center gap-1">
            Mới Về
            <span className="w-2 h-2 rounded-full bg-[#C86D51]"></span>
          </Link>
          <Link href="/blog" className="hover:text-[#2D5A27] transition-colors">
            Bài Viết
          </Link>

          <Link href="/questions" className="hover:text-[#2D5A27] transition-colors">
            Q&A Hỏi Đáp
          </Link>
          <Link href="/todo" className="hover:text-[#2D5A27] transition-colors flex items-center gap-1 text-[#2D5A27] font-semibold bg-[#2D5A27]/10 px-3 py-1.5 rounded-lg">
            <Calendar className="w-4 h-4" />
            Nhật Ký Todo
          </Link>
        </nav>

        {/* Search Bar & Actions */}
        <div className="flex items-center gap-3">
          <form onSubmit={handleSearch} className="hidden lg:flex items-center relative">
            <input
              type="text"
              placeholder="Tìm gạo lứt, trà, ngũ cốc..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/80 border border-[#E2E8F0] text-xs rounded-full pl-9 pr-4 py-2 w-56 text-[#1E293B] focus:outline-none focus:border-[#2D5A27] focus:ring-1 focus:ring-[#2D5A27]"
            />
            <Search className="w-4 h-4 absolute left-3 text-[#64748B]" />
          </form>

          {/* Cart Badge */}
          <Link
            href="/cart"
            className="relative p-2.5 bg-white border border-[#E2E8F0] rounded-xl hover:border-[#2D5A27] transition-colors text-[#1E293B]"
            aria-label="Giỏ hàng"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#C86D51] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                {totalCartCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#1E293B]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E2E8F0] bg-white px-4 pt-3 pb-6 flex flex-col gap-4">
          <form onSubmit={handleSearch} className="flex items-center relative">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F9F6F0] border border-[#E2E8F0] text-sm rounded-lg pl-9 pr-4 py-2 text-[#1E293B]"
            />
            <Search className="w-4 h-4 absolute left-3 text-[#64748B]" />
          </form>

          <nav className="flex flex-col gap-3 font-medium text-sm text-[#1E293B]">
            <Link href="/products" onClick={() => setMobileMenuOpen(false)}>Sản Phẩm</Link>
            <Link href="/new-products" onClick={() => setMobileMenuOpen(false)}>Sản Phẩm Mới</Link>
            <Link href="/blog" onClick={() => setMobileMenuOpen(false)}>Bài Viết Dinh Dưỡng</Link>
            <Link href="/questions" onClick={() => setMobileMenuOpen(false)}>Q&A Hỏi Đáp</Link>
            <Link href="/todo" onClick={() => setMobileMenuOpen(false)} className="text-[#2D5A27] font-semibold">Nhật Ký Todo Thói Quen</Link>
            <Link href="/orders/track" onClick={() => setMobileMenuOpen(false)}>Tra Cứu Đơn Hàng</Link>
          </nav>
        </div>
      )}
    </header>
  );
};
