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
  paymentMethod?: string;
  status?: string;
}

export const OrderSuccessCard: React.FC<OrderSuccessCardProps> = ({
  orderNumber,
  customerName,
  phone,
  totalAmount,
  paymentMethod = 'COD',
  status = 'PENDING',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderPaymentMethodLabel = () => {
    switch (paymentMethod) {
      case 'GOLD_WALLET':
        return <strong className="text-amber-800 font-bold bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-lg flex items-center gap-1 text-xs">🪙 Thanh toán bằng Ví GOLD</strong>;
      case 'BANK_TRANSFER':
        return <strong className="text-blue-800 font-bold bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-lg flex items-center gap-1 text-xs">🏦 Chuyển khoản VietQR</strong>;
      default:
        return <strong className="text-[#166534] font-medium text-xs">💵 COD (Thanh toán khi nhận hàng)</strong>;
    }
  };

  const renderStatusBadge = () => {
    switch (status) {
      case 'PROCESSING':
        return <Badge variant="success">🟣 ĐÃ XÁC NHẬN - ĐANG ĐÓNG GÓI</Badge>;
      case 'CONFIRMED':
        return <Badge variant="sage">🔵 ĐÃ XÁC NHẬN</Badge>;
      case 'SHIPPED':
        return <Badge variant="sage">🚚 ĐANG GIAO HÀNG</Badge>;
      case 'DELIVERED':
        return <Badge variant="success">🟢 ĐÃ GIAO THÀNH CÔNG</Badge>;
      default:
        return <Badge variant="warning">🟡 ĐÃ TIẾP NHẬN (PENDING)</Badge>;
    }
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-10 max-w-xl mx-auto text-center space-y-6 shadow-sm my-8">
      {/* Animated Glowing Success Icon */}
      <div className="w-20 h-20 bg-[#DCFCE7] text-[#166534] rounded-full flex items-center justify-center mx-auto ring-8 ring-[#DCFCE7]/60 transition-transform hover:scale-105">
        <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold font-display text-[#1E293B]">
          Đặt Hàng Thành Công!
        </h1>
        <p className="text-sm text-[#64748B] max-w-md mx-auto leading-relaxed">
          Cảm ơn <strong className="text-[#1E293B]">{customerName}</strong>. Đơn hàng của bạn đã được ghi nhận vào hệ thống GreenPantry và đang được xử lý.
        </p>
      </div>

      {/* Generated Order ID Banner */}
      <div className="p-4 bg-[#F0FDF4] border border-[#DCFCE7] rounded-xl flex items-center justify-between gap-3 shadow-2xs">
        <div className="text-left">
          <span className="text-xs text-[#64748B] uppercase font-semibold tracking-wider block">Mã Đơn Hàng Của Bạn</span>
          <span className="text-2xl font-extrabold font-mono text-[#2D5A27] tracking-wider">{orderNumber}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="shrink-0 bg-white hover:bg-emerald-50 text-[#2D5A27] border-[#2D5A27]/20 whitespace-nowrap font-medium"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600 shrink-0" /> : <Copy className="w-4 h-4 shrink-0" />}
          <span>{copied ? 'Đã Sao Chép!' : 'Sao Chép'}</span>
        </Button>
      </div>

      {/* Order Summary Metadata */}
      <div className="p-5 bg-[#F9F6F0] rounded-xl text-left border border-[#E2E8F0] space-y-2.5">
        <h3 className="font-display font-bold text-base text-[#1E293B] border-b border-[#E2E8F0] pb-2">
          Tóm Tắt Đơn Hàng
        </h3>
        <div className="space-y-2 text-sm text-[#64748B]">
          <div className="flex justify-between items-center gap-2">
            <span>Người nhận:</span>
            <strong className="text-[#1E293B] font-medium">{customerName} ({phone})</strong>
          </div>
          <div className="flex justify-between items-center gap-2">
            <span>Hình thức thanh toán:</span>
            {renderPaymentMethodLabel()}
          </div>
          <div className="flex justify-between items-center gap-2">
            <span>Trạng thái ban đầu:</span>
            {renderStatusBadge()}
          </div>
          <div className="border-t border-[#E2E8F0] pt-2 mt-1 flex justify-between items-center gap-2">
            <span className="font-semibold text-[#1E293B]">Tổng số tiền:</span>
            <strong className="text-[#2D5A27] font-mono text-lg font-bold">
              {new Intl.NumberFormat('vi-VN').format(totalAmount)}đ
            </strong>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 flex flex-col sm:flex-row gap-3">
        <Link href={`/orders/track?order=${orderNumber}&phone=${phone}`} className="flex-1 min-w-0">
          <Button variant="primary" size="lg" className="w-full justify-center whitespace-nowrap gap-2 text-sm sm:text-base px-3 sm:px-4">
            <Search className="w-4 h-4 shrink-0" />
            <span>Tra Cứu Tiến Độ</span>
          </Button>
        </Link>
        <Link href="/" className="flex-1 min-w-0">
          <Button variant="outline" size="lg" className="w-full justify-center whitespace-nowrap gap-2 text-sm sm:text-base px-3 sm:px-4">
            <Home className="w-4 h-4 shrink-0" />
            <span>Về Trang Chủ</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

