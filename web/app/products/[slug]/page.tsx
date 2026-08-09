import React from 'react';
import { notFound } from 'next/navigation';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ProductGallery } from '@/features/product/ProductGallery';
import { ProductInfo } from '@/features/product/ProductInfo';
import { NutritionTable } from '@/features/product/NutritionTable';
import { ProductReviewSection } from '@/features/product/ProductReviewSection';
import { ProductQaSection } from '@/features/product/ProductQaSection';
import { RelatedProducts } from '@/features/product/RelatedProducts';

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumb
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Sản phẩm', href: '/products' },
          { label: product.categoryName, href: `/categories/${product.categorySlug}` },
          { label: product.name },
        ]}
      />

      {/* Main Buy Box Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <ProductGallery images={product.images} productName={product.name} />
        <ProductInfo product={product} />
      </div>

      {/* Tabs / Specs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6 border-t border-[#E2E8F0]">
        <div className="lg:col-span-2 space-y-8">
          <NutritionTable product={product} />
          <ProductReviewSection productId={product.id} />
          <ProductQaSection productId={product.id} />
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 space-y-3">
            <h4 className="font-bold text-base text-[#1E293B]">Hướng Dẫn Bảo Quản</h4>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp. Sau khi mở túi hút chân không, nên cho gạo lứt/thực phẩm vào hũ thủy tinh đậy kín nắp để dùng được lâu nhất.
            </p>
          </div>

          <div className="bg-[#2D5A27] text-white rounded-xl p-6 space-y-2">
            <h4 className="font-bold text-base font-display">Cam Kết GreenPantry</h4>
            <p className="text-xs text-emerald-100 leading-relaxed">
              100% sản phẩm nông sản tự nhiên không hóa chất chống mọt. Hoàn tiền 100% nếu sản phẩm không đúng mô tả.
            </p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts currentProductId={product.id} />
    </div>
  );
}
