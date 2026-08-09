'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Copy, Check, Search, Home } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface OrderSuccessCardProps {
  orderNumber: string;
  customerName: string;
  phone: string;
  totalAmount: number;
}

export const OrderSuccessCard: React.FC<OrderSuccessCardProps> = ({
  orderNumber,
  customerName,
  phone,
  totalAmount,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 sm:p-12 max-w-xl mx-auto text-center space-y-6 shadow-sm my-8">
      <div className="w-20 h-20 bg-[#DCFCE7] text-[#166534] rounded-full flex items-center justify-center mx-auto border border-[#DCFCE7] animate-bounce">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold font-display text-[#1E293B]">
          Đặt Hàng Thành Công!
        </h1>
        <p className="text-sm text-[#64748B]">
          Cảm ơn <strong>{customerName}</strong>. Đơn hàng của bạn đã được ghi nhận vào hệ thống GreenPantry và sẽ sớm được nhân viên xác nhận.
        </p>
      </div>

      {/* Generated Order ID Banner */}
      <div className="p-4 bg-[#F9F6F0] border-2 border-[#2D5A27] rounded-xl flex items-center justify-between gap-4">
        <div className="text-left">
          <span className="text-xs text-[#64748B] uppercase font-semibold block">Mã Đơn Hàng Của Bạn</span>
          <span className="text-2xl font-bold font-mono text-[#2D5A27] tracking-wider">{orderNumber}</span>
        </div>
        <Button variant="outline" size="sm" onClick={handleCopy} className="shrink-0 bg-white">
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Đã Sao Chép!' : 'Sao Chép'}
        </Button>
      </div>

      {/* Order Summary Metadata */}
      <div className="text-xs text-[#64748B] space-y-1.5 p-4 bg-slate-50 rounded-xl text-left border border-[#E2E8F0]">
        <div className="flex justify-between">
          <span>Người nhận:</span>
          <strong className="text-[#1E293B]">{customerName} ({phone})</strong>
        </div>
        <div className="flex justify-between">
          <span>Hình thức thanh toán:</span>
          <strong className="text-[#166534]">COD (Thanh toán khi nhận hàng)</strong>
        </div>
        <div className="flex justify-between">
          <span>Tổng số tiền:</span>
          <strong className="text-[#2D5A27] font-mono text-sm">
            {new Intl.NumberFormat('vi-VN').format(totalAmount)}đ
          </strong>
        </div>
        <div className="flex justify-between">
          <span>Trạng thái ban đầu:</span>
          <Badge variant="warning">ĐÃ TIẾP NHẬN (PENDING)</Badge>
        </div>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row gap-3">
        <Link href={`/orders/track?order=${orderNumber}&phone=${phone}`} className="flex-1">
          <Button variant="primary" size="lg" className="w-full">
            <Search className="w-4 h-4" />
            Tra Cứu Tiến Độ Đơn Hàng
          </Button>
        </Link>
        <Link href="/" className="flex-1">
          <Button variant="outline" size="lg" className="w-full">
            <Home className="w-4 h-4" />
            Về Trang Chủ
          </Button>
        </Link>
      </div>
    </div>
  );
};
