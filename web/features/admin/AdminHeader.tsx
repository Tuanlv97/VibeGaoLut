'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAdminAuthStore, AdminRole } from '@/stores/admin-auth-store';
import { LogOut } from 'lucide-react';

export function AdminHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  const router = useRouter();
  const { user, logout } = useAdminAuthStore();

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  const getRoleBadge = (role?: AdminRole) => {
    switch (role) {
      case AdminRole.SUPER_ADMIN:
        return <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-[10px] font-bold">Super Admin</span>;
      case AdminRole.STORE_MANAGER:
        return <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold">Store Manager</span>;
      case AdminRole.CONTENT_EDITOR:
        return <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold">Content Editor</span>;
      default:
        return <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-bold">Quản trị viên</span>;
    }
  };

  const initials = user?.fullName
    ? user.fullName
        .split(' ')
        .map((n) => n[0])
        .slice(-2)
        .join('')
        .toUpperCase()
    : 'AD';

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
          <div className="w-9 h-9 rounded-full bg-[#2D5A27] text-white font-bold flex items-center justify-center text-xs shadow-sm">
            {initials}
          </div>
          <div className="text-xs">
            <div className="flex items-center gap-1.5">
              <p className="font-bold text-slate-800">{user?.fullName || 'Super Admin'}</p>
              {getRoleBadge(user?.role)}
            </div>
            <p className="text-slate-500">{user?.email || 'admin@greenpantry.vn'}</p>
          </div>

          <button
            onClick={handleLogout}
            title="Đăng xuất"
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer ml-1"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
