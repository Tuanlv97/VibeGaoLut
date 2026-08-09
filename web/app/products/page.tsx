'use client';

import React, { useState, useMemo } from 'react';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import { ProductGrid } from '@/features/product/ProductGrid';
import { ProductFilterSidebar } from '@/features/product/ProductFilterSidebar';
import { ProductSortHeader } from '@/features/product/ProductSortHeader';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

import { useProducts, useCategories } from '@/lib/api/hooks';

export default function ProductListingPage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([50000, 500000]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('newest');

  const { data: productsData } = useProducts({
    categoryId: selectedCategory || undefined,
    maxPrice: priceRange[1],
    sort: sortBy === 'price-asc' ? 'price_asc' : sortBy === 'price-desc' ? 'price_desc' : 'newest',
  });

  const productsList = productsData?.items || MOCK_PRODUCTS;

  const filteredProducts = useMemo(() => {
    return productsList.filter((p: any) => {
      if (selectedCategory && p.categorySlug && p.categorySlug !== selectedCategory) return false;
      if (p.price > priceRange[1]) return false;
      if (selectedRating && p.rating && p.rating < selectedRating) return false;
      return true;
    }).sort((a: any, b: any) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 5) - (a.rating || 5);
      return new Date(b.releasedAt || Date.now()).getTime() - new Date(a.releasedAt || Date.now()).getTime();
    });
  }, [productsList, selectedCategory, priceRange, selectedRating, sortBy]);

  const handleReset = () => {
    setSelectedCategory('');
    setPriceRange([50000, 500000]);
    setSelectedRating(null);
    setSortBy('newest');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumb
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Sản phẩm' },
        ]}
      />

      <div>
        <h1 className="text-3xl font-bold font-display text-[#1E293B]">
          Danh Sách Sản Phẩm Tự Nhiên
        </h1>
        <p className="text-xs text-[#64748B] mt-1">
          Gạo lứt đỏ nguyên cám, các loại hạt dinh dưỡng, bột dưỡng sinh và trà thảo mộc.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <ProductFilterSidebar
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            selectedRating={selectedRating}
            onRatingChange={setSelectedRating}
            onReset={handleReset}
          />
        </div>

        <div className="lg:col-span-3 space-y-4">
          <ProductSortHeader
            totalCount={filteredProducts.length}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          <ProductGrid products={filteredProducts} columns={3} />
        </div>
      </div>
    </div>
  );
}
