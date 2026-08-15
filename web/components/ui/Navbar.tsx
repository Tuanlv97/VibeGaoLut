'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { ShoppingBag, Search, Calendar, Menu, X, Leaf, User, Award, LogOut, Coins } from 'lucide-react';
import { useCartStore } from '@/stores/cart-store';
import { useCustomerAuthStore } from '@/stores/customer-auth-store';

export const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);

  const { customer, token, logout } = useCustomerAuthStore();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const totalCartCount = useCartStore((s) => s.getTotalCount());
  const displayCartCount = mounted ? totalCartCount : 0;
  const isCustomerLoggedIn = mounted && !!token && !!customer;

  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

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
        <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-sm text-[#1E293B] shrink-0">
          <Link
            href="/products"
            className={`relative py-1.5 transition-all whitespace-nowrap ${
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
            className={`relative py-1.5 transition-all flex items-center gap-1.5 whitespace-nowrap ${
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
            className={`relative py-1.5 transition-all whitespace-nowrap ${
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
            className={`relative py-1.5 transition-all whitespace-nowrap ${
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
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
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
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <form onSubmit={handleSearch} className="hidden lg:flex items-center relative shrink">
            <input
              type="text"
              placeholder="Tìm gạo lứt, trà..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/80 border border-[#E2E8F0] text-xs rounded-full pl-9 pr-3 py-2 w-44 xl:w-56 text-[#1E293B] focus:outline-none focus:border-[#2D5A27] focus:ring-1 focus:ring-[#2D5A27]"
            />
            <Search className="w-4 h-4 absolute left-3 text-[#64748B]" />
          </form>

          {/* Customer User Profile or Login button */}
          {isCustomerLoggedIn ? (
            <div className="relative shrink-0">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-1.5 sm:p-2 bg-emerald-50 border border-emerald-200 rounded-xl hover:bg-emerald-100 transition-colors whitespace-nowrap"
              >
                <div className="w-7 h-7 rounded-full bg-[#2D5A27] text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {customer?.fullName?.charAt(0).toUpperCase()}
                </div>
                <span className="hidden xl:inline text-xs font-semibold text-[#2D5A27] whitespace-nowrap max-w-[120px] truncate">
                  {customer?.fullName}
                </span>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs whitespace-nowrap shrink-0">
                  <Coins className="w-3.5 h-3.5 text-amber-500" />
                  {customer?.goldBalance || 0} GOLD
                </span>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E2D9CC] rounded-xl shadow-lg py-1.5 z-50 text-sm">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <div className="font-semibold text-slate-800 text-xs truncate">{customer?.fullName}</div>
                    <div className="text-[11px] text-slate-500 truncate">{customer?.email}</div>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setUserMenuOpen(false)}
                    className="block px-4 py-2 text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    Hồ sơ cá nhân & Địa chỉ
                  </Link>
                  <Link
                    href="/profile"
                    onClick={() => setUserMenuOpen(false)}
                    className="block px-4 py-2 text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    Đơn hàng của tôi
                  </Link>
                  <Link
                    href="/profile"
                    onClick={() => setUserMenuOpen(false)}
                    className="block px-4 py-2 text-emerald-700 hover:bg-emerald-50 font-medium flex items-center gap-1.5"
                  >
                    <Award className="w-4 h-4 text-amber-500" /> {customer?.loyaltyPoints || 0} điểm thưởng
                  </Link>
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      logout();
                      router.push('/');
                    }}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 font-medium border-t border-slate-100 flex items-center gap-1.5"
                  >
                    <LogOut className="w-4 h-4" /> Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#2D5A27] bg-[#2D5A27]/10 hover:bg-[#2D5A27]/20 rounded-xl transition-colors shrink-0"
            >
              <User className="w-4 h-4" />
              <span>Đăng nhập</span>
            </Link>
          )}

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
