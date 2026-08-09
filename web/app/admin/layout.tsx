import React from 'react';
import { AdminSidebar } from '@/features/admin/AdminSidebar';

export const metadata = {
  title: 'GreenPantry — Admin Management Portal',
  description: 'Quản trị sản phẩm, đơn hàng, blog và hỏi đáp Q&A cho GreenPantry Platform.',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-100 font-sans text-slate-900 antialiased">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 pb-12">{children}</main>
      </div>
    </div>
  );
}
