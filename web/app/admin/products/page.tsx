'use client';

import React from 'react';
import { AdminHeader } from '@/features/admin/AdminHeader';
import { AdminProductTable } from '@/features/admin/AdminProductTable';
import { useProducts, useDeleteProduct, useUpdateProduct } from '@/lib/api/hooks';

export default function AdminProductsPage() {
  const { data: productsData, refetch } = useProducts({ limit: 1000 });
  const deleteMutation = useDeleteProduct();
  const updateMutation = useUpdateProduct();

  const products = productsData?.items || [];

  const handleDelete = async (id: string) => {
    await deleteMutation.mutateAsync(id);
    refetch();
  };

  const handleToggleNewArrival = async (id: string, isFeaturedNew: boolean) => {
    await updateMutation.mutateAsync({ id, isFeaturedNew });
    refetch();
  };

  return (
    <div>
      <AdminHeader
        title="Quản Lý Danh Mục Sản Phẩm"
        subtitle="Thêm, sửa, xóa sản phẩm và cài đặt cờ Sản Phẩm Mới (Hybrid Rule)"
      />
      <div className="p-8 max-w-7xl mx-auto">
        <AdminProductTable
          products={products}
          onDelete={handleDelete}
          onToggleNewArrival={handleToggleNewArrival}
        />
      </div>
    </div>
  );
}
