'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAdminAuthStore } from '@/stores/admin-auth-store';
import { ShieldAlert, Loader2 } from 'lucide-react';

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

export function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAdminAuthStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated && !isAuthenticated && pathname !== '/admin/login') {
      router.replace('/admin/login');
    }
  }, [isHydrated, isAuthenticated, pathname, router]);

  // Bypass guard on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-[#F9F6F0] flex flex-col items-center justify-center p-4">
        <Loader2 className="w-8 h-8 text-[#2D5A27] animate-spin mb-3" />
        <p className="text-slate-600 font-medium text-sm">Đang tải thông tin xác thực Admin...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F9F6F0] flex flex-col items-center justify-center p-4">
        <ShieldAlert className="w-12 h-12 text-amber-600 mb-3" />
        <h2 className="text-xl font-bold text-slate-800 mb-1">Yêu cầu đăng nhập</h2>
        <p className="text-slate-600 text-sm mb-4">Vui lòng đăng nhập để truy cập Admin Portal.</p>
      </div>
    );
  }

  return <>{children}</>;
}
