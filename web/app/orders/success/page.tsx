'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { OrderSuccessCard } from '@/features/order/OrderSuccessCard';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber') || 'GP-883920';
  const customerName = searchParams.get('name') || 'Nguyễn Văn An';
  const phone = searchParams.get('phone') || '0912345678';
  const totalAmount = Number(searchParams.get('total')) || 240000;
  const paymentMethod = searchParams.get('paymentMethod') || 'COD';
  const status = searchParams.get('status') || 'PENDING';

  return (
    <OrderSuccessCard
      orderNumber={orderNumber}
      customerName={customerName}
      phone={phone}
      totalAmount={totalAmount}
      paymentMethod={paymentMethod}
      status={status}
    />
  );
}

export default function OrderSuccessPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumb
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Đặt hàng thành công' },
        ]}
      />
      <Suspense fallback={<div className="text-center py-12 text-sm text-[#64748B]">Đang tải xác nhận đơn...</div>}>
        <OrderSuccessContent />
      </Suspense>
    </div>
  );
}
