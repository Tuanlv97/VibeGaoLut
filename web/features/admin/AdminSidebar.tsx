'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Tổng Quan', href: '/admin', icon: '📊' },
    { label: 'Sản Phẩm', href: '/admin/products', icon: '🌾' },
    { label: 'Đơn Hàng', href: '/admin/orders', icon: '📦' },
    { label: 'Bài Viết Blog', href: '/admin/blog', icon: '📝' },
    { label: 'Hỏi Đáp Q&A', href: '/admin/questions', icon: '💬' },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-200 min-h-screen p-6 flex flex-col justify-between shadow-xl">
      <div>
        {/* Brand Header */}
        <div className="flex items-center space-x-3 pb-8 border-b border-slate-800 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white font-bold text-xl shadow-md">
            G
          </div>
          <div>
            <h1 className="font-bold text-lg text-white tracking-wide">GreenPantry</h1>
            <span className="text-xs text-emerald-400 font-medium px-2 py-0.5 bg-emerald-950/80 rounded-full border border-emerald-800/50">
              Admin Portal
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40 translate-x-1'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Back to Storefront Action */}
      <div className="pt-6 border-t border-slate-800">
        <Link
          href="/"
          className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-sm font-medium"
        >
          <span>🌐</span>
          <span>Xem Guest Storefront</span>
        </Link>
      </div>
    </aside>
  );
}
