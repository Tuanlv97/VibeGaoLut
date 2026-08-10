'use client';

import React from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { NewArrivalsHeader } from '@/features/product/NewArrivalsHeader';
import { ProductGrid } from '@/features/product/ProductGrid';
import { useNewArrivals } from '@/lib/api/hooks';

export default function NewArrivalsPage() {
  const { data: newProducts = [] } = useNewArrivals();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumb
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Sản phẩm mới về' },
        ]}
      />

      <NewArrivalsHeader />

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[#1E293B]">
          Danh Sách Mới Ra Mắt Trong Tháng ({newProducts.length})
        </h2>
        <ProductGrid products={newProducts} columns={4} />
      </div>
    </div>
  );
}
