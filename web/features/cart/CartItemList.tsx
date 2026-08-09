'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { useCartStore, CartItem } from '@/stores/cart-store';

export const CartItemList: React.FC = () => {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 space-y-4">
      <h2 className="font-bold text-lg text-[#1E293B] border-b border-[#E2E8F0] pb-3">
        Danh Sách Sản Phẩm Trong Giỏ ({items.length})
      </h2>

      <div className="divide-y divide-[#E2E8F0]">
        {items.map((item) => (
          <div key={item.id} className="py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-slate-50 border border-[#E2E8F0] shrink-0">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>

              <div>
                <Link href={`/products/${item.slug}`} className="font-semibold text-sm text-[#1E293B] hover:text-[#2D5A27]">
                  {item.name}
                </Link>
                <div className="text-xs text-[#64748B] mt-0.5 font-mono">
                  {new Intl.NumberFormat('vi-VN').format(item.price)}đ / {item.weightUnit}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0">
              <div className="flex items-center border border-[#E2E8F0] rounded-lg bg-white">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="px-2.5 py-1 text-xs font-bold text-[#64748B] hover:bg-[#F9F6F0]"
                >
                  -
                </button>
                <span className="px-3 text-xs font-semibold font-mono text-[#1E293B] min-w-[2rem] text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-2.5 py-1 text-xs font-bold text-[#64748B] hover:bg-[#F9F6F0]"
                >
                  +
                </button>
              </div>

              <div className="font-bold text-base text-[#2D5A27] font-mono min-w-[6rem] text-right">
                {new Intl.NumberFormat('vi-VN').format(item.price * item.quantity)}đ
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="text-[#64748B] hover:text-[#991B1B] p-1.5 transition-colors"
                title="Xóa sản phẩm"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
