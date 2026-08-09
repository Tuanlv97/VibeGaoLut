import React from 'react';
import { notFound } from 'next/navigation';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '@/lib/mock-data';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ProductGrid } from '@/features/product/ProductGrid';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = MOCK_CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const products = MOCK_PRODUCTS.filter((p) => p.categorySlug === slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumb
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Danh mục', href: '/products' },
          { label: category.name },
        ]}
      />

      {/* Category Hero Banner */}
      <div className="bg-[#2D5A27] text-white rounded-2xl p-8 sm:p-12 space-y-3 shadow-md">
        <span className="text-xs uppercase font-bold tracking-wider text-emerald-200">
          Danh Mục Sản Phẩm
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-display leading-tight">
          {category.name}
        </h1>
        <p className="text-sm text-emerald-100 max-w-2xl leading-relaxed">
          {category.description}
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[#1E293B]">
          Sản Phẩm Trong Danh Mục ({products.length})
        </h2>
        <ProductGrid products={products} columns={4} />
      </div>
    </div>
  );
}
