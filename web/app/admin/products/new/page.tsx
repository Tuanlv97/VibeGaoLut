'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AdminHeader } from '@/features/admin/AdminHeader';
import { ProductForm } from '@/features/admin/ProductForm';
import { useCreateProduct } from '@/lib/api/hooks';

export default function AdminAddProductPage() {
  const router = useRouter();
  const createMutation = useCreateProduct();

  const handleSubmit = async (data: any) => {
    await createMutation.mutateAsync(data);
    router.push('/admin/products');
  };

  return (
    <div>
      <AdminHeader
        title="Thêm Sản Phẩm Mới"
        subtitle="Điền thông tin dinh dưỡng, quy cách và cờ Sản Phẩm Mới"
      />
      <div className="p-8 max-w-5xl mx-auto">
        <ProductForm onSubmit={handleSubmit} isLoading={createMutation.isPending} />
      </div>
    </div>
  );
}
