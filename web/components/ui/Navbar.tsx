'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { ShoppingBag, Search, Calendar, Menu, X, Leaf } from 'lucide-react';
import { useCartStore } from '@/stores/cart-store';

export const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const totalCartCount = useCartStore((s) => s.getTotalCount());
  const displayCartCount = mounted ? totalCartCount : 0;
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const isProductsActive = pathname.startsWith('/products') || pathname.startsWith('/categories');
  const isNewActive = pathname === '/new-products';
  const isBlogActive = pathname.startsWith('/blog');
  const isQaActive = pathname.startsWith('/questions');
  const isTodoActive = pathname === '/todo';

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
        <nav className="hidden md:flex items-center gap-7 text-sm text-[#1E293B]">
          <Link
            href="/products"
            className={`relative py-1.5 transition-all ${
              isProductsActive
                ? 'text-[#2D5A27] font-bold'
                : 'font-medium hover:text-[#2D5A27]'
            }`}
          >
            <span>Sản Phẩm</span>
            {isProductsActive && (
              <span className="absolute -bottom-1.5 left-0 right-0 h-[3px] bg-[#2D5A27] rounded-full shadow-xs" />
            )}
          </Link>

          <Link
            href="/new-products"
            className={`relative py-1.5 transition-all flex items-center gap-1.5 ${
              isNewActive
                ? 'text-[#2D5A27] font-bold'
                : 'font-medium hover:text-[#2D5A27]'
            }`}
          >
            <span>Mới Về</span>
            <span className="w-2 h-2 rounded-full bg-[#C86D51]"></span>
            {isNewActive && (
              <span className="absolute -bottom-1.5 left-0 right-0 h-[3px] bg-[#2D5A27] rounded-full shadow-xs" />
            )}
          </Link>

          <Link
            href="/blog"
            className={`relative py-1.5 transition-all ${
              isBlogActive
                ? 'text-[#2D5A27] font-bold'
                : 'font-medium hover:text-[#2D5A27]'
            }`}
          >
            <span>Bài Viết</span>
            {isBlogActive && (
              <span className="absolute -bottom-1.5 left-0 right-0 h-[3px] bg-[#2D5A27] rounded-full shadow-xs" />
            )}
          </Link>

          <Link
            href="/questions"
            className={`relative py-1.5 transition-all ${
              isQaActive
                ? 'text-[#2D5A27] font-bold'
                : 'font-medium hover:text-[#2D5A27]'
            }`}
          >
            <span>Q&A Hỏi Đáp</span>
            {isQaActive && (
              <span className="absolute -bottom-1.5 left-0 right-0 h-[3px] bg-[#2D5A27] rounded-full shadow-xs" />
            )}
          </Link>

          <Link
            href="/todo"
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
              isTodoActive
                ? 'bg-[#2D5A27] text-white shadow-sm ring-2 ring-[#2D5A27]/20'
                : 'text-[#2D5A27] bg-[#2D5A27]/10 hover:bg-[#2D5A27]/20'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Nhật Ký Todo</span>
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
            {displayCartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#C86D51] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                {displayCartCount}
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
            <Link
              href="/products"
              onClick={() => setMobileMenuOpen(false)}
              className={isProductsActive ? 'text-[#2D5A27] font-bold border-l-2 border-[#2D5A27] pl-2' : ''}
            >
              Sản Phẩm
            </Link>
            <Link
              href="/new-products"
              onClick={() => setMobileMenuOpen(false)}
              className={isNewActive ? 'text-[#2D5A27] font-bold border-l-2 border-[#2D5A27] pl-2' : ''}
            >
              Sản Phẩm Mới
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className={isBlogActive ? 'text-[#2D5A27] font-bold border-l-2 border-[#2D5A27] pl-2' : ''}
            >
              Bài Viết Dinh Dưỡng
            </Link>
            <Link
              href="/questions"
              onClick={() => setMobileMenuOpen(false)}
              className={isQaActive ? 'text-[#2D5A27] font-bold border-l-2 border-[#2D5A27] pl-2' : ''}
            >
              Q&A Hỏi Đáp
            </Link>
            <Link
              href="/todo"
              onClick={() => setMobileMenuOpen(false)}
              className={`font-semibold ${isTodoActive ? 'text-[#2D5A27] font-bold border-l-2 border-[#2D5A27] pl-2' : 'text-[#2D5A27]'}`}
            >
              Nhật Ký Todo Thói Quen
            </Link>
            <Link
              href="/orders/track"
              onClick={() => setMobileMenuOpen(false)}
              className={pathname === '/orders/track' ? 'text-[#2D5A27] font-bold border-l-2 border-[#2D5A27] pl-2' : ''}
            >
              Tra Cứu Đơn Hàng
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
