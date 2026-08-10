'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { AdminSidebar } from '@/features/admin/AdminSidebar';
import { AdminAuthGuard } from '@/features/admin/AdminAuthGuard';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  return (
    <AdminAuthGuard>
      {isLoginPage ? (
        <main className="min-h-screen">{children}</main>
      ) : (
        <div className="flex min-h-screen bg-slate-100 font-sans text-slate-900 antialiased">
          <AdminSidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <main className="flex-1 pb-12">{children}</main>
          </div>
        </div>
      )}
    </AdminAuthGuard>
  );
}
