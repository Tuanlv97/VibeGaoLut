import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const EmptyCart: React.FC = () => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-12 text-center max-w-lg mx-auto space-y-4 my-8">
      <div className="w-16 h-16 bg-[#F9F6F0] text-[#2D5A27] rounded-full flex items-center justify-center mx-auto border border-[#E2E8F0]">
        <ShoppingBag className="w-8 h-8" />
      </div>
      <h2 className="font-bold text-2xl font-display text-[#1E293B]">
        Giỏ Hàng Của Bạn Đang Trống
      </h2>
      <p className="text-sm text-[#64748B]">
        Hãy chọn các sản phẩm thực phẩm chay, gạo lứt ST25 đỏ và trà thảo mộc tự nhiên thơm ngon vào giỏ để tiến hành đặt hàng nhé!
      </p>
      <div className="pt-2">
        <Link href="/products">
          <Button variant="primary" size="lg">
            Khám Phá Sản Phẩm Ngay
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
