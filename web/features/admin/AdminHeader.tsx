'use client';

import React from 'react';
import Link from 'next/link';

export function AdminHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between shadow-sm sticky top-0 z-20">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{title}</h2>
        {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center space-x-4">
        <Link
          href="/"
          className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition-colors flex items-center space-x-1.5"
        >
          <span>🌱</span>
          <span>Về cửa hàng</span>
        </Link>
        <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
          <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm shadow-inner">
            AD
          </div>
          <div className="text-xs">
            <p className="font-bold text-slate-800">Admin GreenPantry</p>
            <p className="text-slate-500">Quản trị viên</p>
          </div>
        </div>
      </div>
    </header>
  );
}
