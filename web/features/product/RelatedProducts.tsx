'use client';

import React from 'react';
import { ProductGrid } from './ProductGrid';
import { useProducts } from '@/lib/api/hooks';

interface RelatedProductsProps {
  currentProductId: string;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({ currentProductId }) => {
  const { data: productsData } = useProducts();
  const allProducts = productsData?.items || [];
  const related = allProducts.filter((p: any) => p.id !== currentProductId).slice(0, 4);

  return (
    <div className="space-y-4 pt-6">
      <h3 className="font-bold text-xl font-display text-[#1E293B]">
        Sản Phẩm Cùng Chuyên Mục Bạn Có Thể Thích
      </h3>
      <ProductGrid products={related} columns={4} />
    </div>
  );
};
