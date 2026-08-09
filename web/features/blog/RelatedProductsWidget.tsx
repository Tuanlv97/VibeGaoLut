'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Check, Sparkles } from 'lucide-react';
import { Product } from '@/lib/mock-data';
import { useCartStore } from '@/stores/cart-store';
import { Button } from '@/components/ui/Button';

interface RelatedProductsWidgetProps {
  products: Product[];
}

export const RelatedProductsWidget: React.FC<RelatedProductsWidgetProps> = ({
  products,
}) => {
  const addItem = useCartStore((s) => s.addItem);
  const [addedMap, setAddedMap] = useState<Record<string, boolean>>({});

  if (products.length === 0) return null;

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      weightUnit: product.weightUnit,
      image: product.images[0],
      slug: product.slug,
    });

    setAddedMap((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedMap((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  return (
    <div className="bg-[#F9F6F0] border-2 border-[#2D5A27]/30 rounded-2xl p-6 my-8 space-y-4 shadow-sm">
      <div className="flex items-center gap-2 text-[#2D5A27]">
        <Sparkles className="w-5 h-5 fill-current" />
        <h3 className="font-bold text-lg font-display text-[#1E293B]">
          Sản Phẩm Được Đề Cập Trong Bài Viết
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-[#E2E8F0] rounded-xl p-4 flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-slate-50 border border-[#E2E8F0] shrink-0">
                <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
              </div>

              <div>
                <Link href={`/products/${product.slug}`} className="font-bold text-xs text-[#1E293B] hover:text-[#2D5A27] line-clamp-1">
                  {product.name}
                </Link>
                <div className="font-bold font-mono text-sm text-[#2D5A27] mt-0.5">
                  {new Intl.NumberFormat('vi-VN').format(product.price)}đ
                </div>
              </div>
            </div>

            <Button
              variant="accent"
              size="sm"
              onClick={() => handleAddToCart(product)}
              className="shrink-0"
            >
              {addedMap[product.id] ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
              {addedMap[product.id] ? 'Đã Thêm' : 'Thêm Giỏ'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
