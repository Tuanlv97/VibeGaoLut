'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { AdminHeader } from '@/features/admin/AdminHeader';
import { ProductForm } from '@/features/admin/ProductForm';
import { useCreateProduct } from '@/lib/api/hooks';
import { useToast } from '@/components/ui/ToastProvider';

export default function AdminAddProductPage() {
  const router = useRouter();
  const createMutation = useCreateProduct();
  const toast = useToast();

  const handleSubmit = async (data: any) => {
    try {
      await createMutation.mutateAsync(data);
      toast.success('🎉 Thêm sản phẩm mới thành công!');
      router.push('/admin/products');
    } catch (err: any) {
      toast.error(err.message || 'Thêm sản phẩm mới thất bại');
    }
  };

  return (
    <div>
      <AdminHeader
        title="Thêm Sản Phẩm Mới"
        subtitle="Điền thông tin dinh dưỡng, quy cách và cờ Sản Phẩm Mới"
      />
      <div className="p-8 max-w-5xl mx-auto space-y-4">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-emerald-700 bg-white hover:bg-emerald-50 border border-slate-200 px-4 py-2 rounded-xl transition-all shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại danh sách sản phẩm</span>
        </Link>
        <ProductForm onSubmit={handleSubmit} isLoading={createMutation.isPending} />
      </div>
    </div>
  );
}
