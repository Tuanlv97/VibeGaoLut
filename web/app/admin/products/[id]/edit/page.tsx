'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { AdminHeader } from '@/features/admin/AdminHeader';
import { ProductForm } from '@/features/admin/ProductForm';
import { useProducts, useUpdateProduct } from '@/lib/api/hooks';
import { useToast } from '@/components/ui/ToastProvider';

export default function AdminEditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;
  const toast = useToast();

  const { data: productsData } = useProducts({ limit: 1000 });
  const updateMutation = useUpdateProduct();

  const product = productsData?.items?.find((p: any) => p.id === productId || p.slug === productId);

  const handleSubmit = async (data: any) => {
    try {
      await updateMutation.mutateAsync({ id: productId, ...data });
      toast.success('✨ Cập nhật sản phẩm thành công!');
      router.push('/admin/products');
    } catch (err: any) {
      toast.error(err.message || 'Cập nhật sản phẩm thất bại');
    }
  };

  return (
    <div>
      <AdminHeader
        title={`Chỉnh Sửa Sản Phẩm ${product ? `— ${product.name}` : ''}`}
        subtitle="Cập nhật chi tiết dinh dưỡng, giá bán và tồn kho"
      />
      <div className="p-8 max-w-5xl mx-auto space-y-4">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-emerald-700 bg-white hover:bg-emerald-50 border border-slate-200 px-4 py-2 rounded-xl transition-all shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại danh sách sản phẩm</span>
        </Link>
        {product ? (
          <ProductForm initialData={product} onSubmit={handleSubmit} isLoading={updateMutation.isPending} />
        ) : (
          <div className="p-8 text-center text-slate-500">Đang tải thông tin sản phẩm...</div>
        )}
      </div>
    </div>
  );
}
