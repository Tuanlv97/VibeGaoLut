'use client';

import React from 'react';
import { Product } from '@/lib/mock-data';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  columns?: 3 | 4;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  columns = 4,
}) => {
  if (products.length === 0) {
    return (
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-8 text-center my-6">
        <p className="text-[#64748B] text-sm">Không tìm thấy sản phẩm phù hợp bộ lọc.</p>
      </div>
    );
  }

  const gridCols =
    columns === 3
      ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
      : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';

  return (
    <div className={`grid ${gridCols} gap-6`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
