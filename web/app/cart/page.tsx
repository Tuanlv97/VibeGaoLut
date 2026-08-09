'use client';

import React from 'react';
import { useCartStore } from '@/stores/cart-store';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { CartItemList } from '@/features/cart/CartItemList';
import { CartSummary } from '@/features/cart/CartSummary';
import { EmptyCart } from '@/features/cart/EmptyCart';

export default function CartPage() {
  const items = useCartStore((s) => s.items);

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[
            { label: 'Trang chủ', href: '/' },
            { label: 'Giỏ hàng' },
          ]}
        />
        <EmptyCart />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumb
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Giỏ hàng' },
        ]}
      />

      <h1 className="text-3xl font-bold font-display text-[#1E293B]">
        Giỏ Hàng Của Bạn ({items.length} sản phẩm)
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <CartItemList />
        </div>

        <div className="lg:col-span-1">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
