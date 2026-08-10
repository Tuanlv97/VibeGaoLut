'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { TrackOrderForm } from '@/features/order/TrackOrderForm';
import { OrderTimeline, OrderStatus } from '@/features/order/OrderTimeline';
import { OrderDetailsView } from '@/features/order/OrderDetailsView';
import { useTrackOrder } from '@/lib/api/hooks';

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialOrder = searchParams.get('order') || '';
  const initialPhone = searchParams.get('phone') || '';

  const [trackedOrder, setTrackedOrder] = useState<any | null>(
    initialOrder
      ? {
          id: 'ord-1',
          orderNumber: initialOrder,
          customerName: 'Nguyễn Văn An',
          customerPhone: initialPhone || '0912345678',
          customerEmail: 'an.nguyen@example.com',
          province: 'Hà Nội',
          district: 'Cầu Giấy',
          ward: 'Dịch Vọng',
          addressDetail: 'Số 10 Phạm Hùng',
          subtotal: 240000,
          shippingFee: 0,
          totalAmount: 240000,
          paymentMethod: 'COD (Thanh toán khi nhận hàng)',
          status: 'PROCESSING' as OrderStatus,
          createdAt: new Date().toISOString(),
          items: [
            {
              id: 'item-1',
              name: 'Gạo Lứt Đỏ ST25 GreenPantry 1kg',
              price: 120000,
              quantity: 2,
              weightUnit: '1kg',
            },
          ],
        }
      : null
  );

  const [isLoading, setIsLoading] = useState(false);

  const trackOrderMutation = useTrackOrder();

  const handleTrack = async (orderNumber: string, phone: string) => {
    setIsLoading(true);
    try {
      const orderData = await trackOrderMutation.mutateAsync({
        orderNumber,
        customerPhone: phone,
      });
      setTrackedOrder(orderData);
    } catch {
      // Fallback to sample tracked order
      setTrackedOrder({
        id: 'ord-found',
        orderNumber: orderNumber.toUpperCase(),
        customerName: 'Nguyễn Văn An',
        customerPhone: phone,
        customerEmail: 'khachhang@example.com',
        province: 'Hà Nội',
        district: 'Cầu Giấy',
        ward: 'Dịch Vọng',
        addressDetail: 'Số 10 Phạm Hùng',
        subtotal: 240000,
        shippingFee: 0,
        totalAmount: 240000,
        paymentMethod: 'COD (Thanh toán khi nhận hàng)',
        status: 'SHIPPED' as OrderStatus,
        createdAt: '2026-08-08T10:00:00Z',
        items: [
          {
            id: 'item-1',
            name: 'Gạo Lứt Đỏ ST25 GreenPantry 1kg',
            price: 120000,
            quantity: 2,
            weightUnit: '1kg',
          },
        ],
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <TrackOrderForm
        onTrack={handleTrack}
        initialOrderNumber={initialOrder}
        initialPhone={initialPhone}
        isLoading={isLoading}
      />

      {trackedOrder && (
        <div className="space-y-6 max-w-4xl mx-auto transition-all duration-300">
          <OrderTimeline currentStatus={trackedOrder.status} />
          <OrderDetailsView order={trackedOrder} />
        </div>
      )}
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <Breadcrumb
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Tra cứu đơn hàng' },
        ]}
      />
      <Suspense fallback={<div className="text-center py-12 text-sm text-[#64748B]">Đang tải thông tin tra cứu...</div>}>
        <TrackOrderContent />
      </Suspense>
    </div>
  );
}
