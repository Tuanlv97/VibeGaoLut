'use client';

import React from 'react';
import Image from 'next/image';
import { ShieldCheck } from 'lucide-react';
import { useCartStore } from '@/stores/cart-store';
import { Button } from '@/components/ui/Button';

interface OrderSummaryWidgetProps {
  onConfirmOrder: () => void;
  isSubmitting?: boolean;
  pointsDiscountAmount?: number;
}

export const OrderSummaryWidget: React.FC<OrderSummaryWidgetProps> = ({
  onConfirmOrder,
  isSubmitting = false,
  pointsDiscountAmount = 0,
}) => {
  const items = useCartStore((s) => s.items);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const getShippingFee = useCartStore((s) => s.getShippingFee);

  const subtotal = getSubtotal();
  const shippingFee = getShippingFee();
  const grandTotal = Math.max(0, subtotal + shippingFee - pointsDiscountAmount);

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 space-y-5 sticky top-24 shadow-xs">
      <h3 className="font-bold text-lg text-[#1E293B] border-b border-[#E2E8F0] pb-3">
        Đơn Hàng Của Bạn ({items.length} món)
      </h3>

      <div className="max-h-60 overflow-y-auto divide-y divide-[#E2E8F0] pr-1">
        {items.map((item) => (
          <div key={item.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="relative w-10 h-10 rounded-md overflow-hidden bg-slate-50 border border-[#E2E8F0] shrink-0">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <div>
                <div className="font-medium text-[#1E293B] line-clamp-1">{item.name}</div>
                <div className="text-[#64748B]">x{item.quantity} ({item.weightUnit})</div>
              </div>
            </div>
            <div className="font-semibold font-mono text-[#1E293B]">
              {new Intl.NumberFormat('vi-VN').format(item.price * item.quantity)}đ
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-[#E2E8F0] pt-3 space-y-2 text-sm">
        <div className="flex justify-between text-[#64748B]">
          <span>Tạm tính:</span>
          <span className="font-mono font-medium text-[#1E293B]">
            {new Intl.NumberFormat('vi-VN').format(subtotal)}đ
          </span>
        </div>

        <div className="flex justify-between text-[#64748B]">
          <span>Phí giao hàng COD:</span>
          <span className="font-mono font-medium text-[#1E293B]">
            {shippingFee === 0 ? 'MIỄN PHÍ' : `${new Intl.NumberFormat('vi-VN').format(shippingFee)}đ`}
          </span>
        </div>

        {pointsDiscountAmount > 0 && (
          <div className="flex justify-between text-amber-700 font-medium">
            <span>Giảm giá điểm tích lũy:</span>
            <span className="font-mono font-semibold">
              -{new Intl.NumberFormat('vi-VN').format(pointsDiscountAmount)}đ
            </span>
          </div>
        )}

        <div className="border-t border-[#E2E8F0] pt-3 flex justify-between items-baseline">
          <span className="font-bold text-base text-[#1E293B]">Tổng cộng:</span>
          <span className="font-bold text-2xl text-[#2D5A27] font-mono">
            {new Intl.NumberFormat('vi-VN').format(grandTotal)}đ
          </span>
        </div>
      </div>

      <Button
        variant="primary"
        size="lg"
        onClick={onConfirmOrder}
        isLoading={isSubmitting}
        className="w-full bg-[#2D5A27]"
      >
        Xác Nhận Đặt Hàng (COD)
      </Button>

      <div className="flex items-center justify-center gap-1.5 text-xs text-[#64748B] pt-1">
        <ShieldCheck className="w-4 h-4 text-[#2D5A27]" />
        <span>Tự động cấp Mã Đơn Hàng sau khi bấm Xác Nhận</span>
      </div>
    </div>
  );
};
