'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { AdminHeader } from '@/features/admin/AdminHeader';
import { ProductForm } from '@/features/admin/ProductForm';
import { useProducts, useUpdateProduct } from '@/lib/api/hooks';

export default function AdminEditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const { data: productsData } = useProducts({ limit: 1000 });
  const updateMutation = useUpdateProduct();

  const product = productsData?.items?.find((p: any) => p.id === productId || p.slug === productId);

  const handleSubmit = async (data: any) => {
    await updateMutation.mutateAsync({ id: productId, ...data });
    router.push('/admin/products');
  };

  return (
    <div>
      <AdminHeader
        title={`Chỉnh Sửa Sản Phẩm ${product ? `— ${product.name}` : ''}`}
        subtitle="Cập nhật chi tiết dinh dưỡng, giá bán và tồn kho"
      />
      <div className="p-8 max-w-5xl mx-auto">
        {product ? (
          <ProductForm initialData={product} onSubmit={handleSubmit} isLoading={updateMutation.isPending} />
        ) : (
          <div className="p-8 text-center text-slate-500">Đang tải thông tin sản phẩm...</div>
        )}
      </div>
    </div>
  );
}
