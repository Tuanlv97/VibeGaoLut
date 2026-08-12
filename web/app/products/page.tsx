'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import { ProductGrid } from '@/features/product/ProductGrid';
import { ProductFilterSidebar } from '@/features/product/ProductFilterSidebar';
import { ProductSortHeader } from '@/features/product/ProductSortHeader';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useProducts, useCategories } from '@/lib/api/hooks';

export default function ProductListingPage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([50000, 500000]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data: productsData } = useProducts({
    categoryId: selectedCategory || undefined,
    maxPrice: priceRange[1],
    sort: sortBy === 'price-asc' ? 'price_asc' : sortBy === 'price-desc' ? 'price_desc' : 'newest',
  });

  const productsList = productsData?.items?.length ? productsData.items : MOCK_PRODUCTS;

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, priceRange, selectedRating, sortBy]);

  const filteredProducts = useMemo(() => {
    return productsList.filter((p: any) => {
      if (selectedCategory && p.categorySlug && p.categorySlug !== selectedCategory && p.categoryId !== selectedCategory) {
        return false;
      }
      if (p.price > priceRange[1]) return false;
      const productRating = p.rating || 5;
      if (selectedRating && productRating < selectedRating) return false;
      return true;
    }).sort((a: any, b: any) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 5) - (a.rating || 5);
      return new Date(b.releasedAt || Date.now()).getTime() - new Date(a.releasedAt || Date.now()).getTime();
    });
  }, [productsList, selectedCategory, priceRange, selectedRating, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const handleReset = () => {
    setSelectedCategory('');
    setPriceRange([50000, 500000]);
    setSelectedRating(null);
    setSortBy('newest');
    setCurrentPage(1);
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

        <div className="lg:col-span-3 space-y-6">
          <ProductSortHeader
            totalCount={filteredProducts.length}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          <ProductGrid products={paginatedProducts} columns={3} />

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-6 border-t border-[#E2E8F0]">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-[#E2E8F0] text-[#64748B] hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                title="Trang trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-9 h-9 rounded-lg font-semibold text-sm transition-colors ${
                      currentPage === pageNum
                        ? 'bg-[#2D5A27] text-white shadow-xs'
                        : 'bg-white border border-[#E2E8F0] text-[#1E293B] hover:bg-slate-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-[#E2E8F0] text-[#64748B] hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                title="Trang sau"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
