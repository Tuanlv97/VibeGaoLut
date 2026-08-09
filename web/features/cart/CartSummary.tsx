'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useCartStore } from '@/stores/cart-store';
import { Button } from '@/components/ui/Button';

export const CartSummary: React.FC = () => {
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const getShippingFee = useCartStore((s) => s.getShippingFee);
  const getGrandTotal = useCartStore((s) => s.getGrandTotal);

  const subtotal = getSubtotal();
  const shippingFee = getShippingFee();
  const grandTotal = getGrandTotal();

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 space-y-5 sticky top-24 shadow-xs">
      <h3 className="font-bold text-lg text-[#1E293B] border-b border-[#E2E8F0] pb-3">
        Tóm Tắt Đơn Hàng
      </h3>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-[#64748B]">
          <span>Tạm tính:</span>
          <span className="font-mono font-medium text-[#1E293B]">
            {new Intl.NumberFormat('vi-VN').format(subtotal)}đ
          </span>
        </div>

        <div className="flex justify-between text-[#64748B]">
          <span>Phí vận chuyển:</span>
          <span className="font-mono font-medium text-[#1E293B]">
            {shippingFee === 0 ? (
              <strong className="text-[#166534]">MIỄN PHÍ</strong>
            ) : (
              `${new Intl.NumberFormat('vi-VN').format(shippingFee)}đ`
            )}
          </span>
        </div>

        {subtotal < 300000 && (
          <div className="text-xs text-[#D97706] bg-[#FEF3C7] p-2.5 rounded-lg border border-[#FEF3C7]">
            Mua thêm {new Intl.NumberFormat('vi-VN').format(300000 - subtotal)}đ để nhận Miễn phí vận chuyển toàn quốc!
          </div>
        )}

        <div className="border-t border-[#E2E8F0] pt-3 flex justify-between items-baseline">
          <span className="font-bold text-base text-[#1E293B]">Tổng thanh toán:</span>
          <span className="font-bold text-2xl text-[#2D5A27] font-mono">
            {new Intl.NumberFormat('vi-VN').format(grandTotal)}đ
          </span>
        </div>
      </div>

      <Link href="/checkout" className="block">
        <Button variant="primary" size="lg" className="w-full">
          Tiến Hành Thanh Toán (COD)
          <ArrowRight className="w-4 h-4" />
        </Button>
      </Link>

      <div className="space-y-2 pt-2 border-t border-[#E2E8F0] text-xs text-[#64748B]">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-[#2D5A27]" />
          <span>Giao hàng thu tiền COD tận nhà</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#2D5A27]" />
          <span>Không bắt buộc đăng ký tài khoản</span>
        </div>
      </div>
    </div>
  );
};
