import React from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { OrderTimeline, OrderStatus } from '@/features/order/OrderTimeline';
import { OrderDetailsView } from '@/features/order/OrderDetailsView';

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = await params;

  const mockOrder = {
    id,
    orderNumber: `GP-${id.toUpperCase()}`,
    customerName: 'Trần Thị Mai',
    customerPhone: '0987654321',
    customerEmail: 'mai.tran@example.com',
    province: 'Hà Nội',
    district: 'Thanh Xuân',
    ward: 'Nhân Chính',
    addressDetail: 'Số 15 Nguyễn Tuân',
    subtotal: 355000,
    shippingFee: 0,
    totalAmount: 355000,
    paymentMethod: 'COD (Thanh toán khi nhận hàng)',
    status: 'DELIVERED' as OrderStatus,
    createdAt: '2026-08-05T14:30:00Z',
    items: [
      {
        id: 'item-1',
        name: 'Gạo Lứt Đỏ ST25 GreenPantry 1kg',
        price: 120000,
        quantity: 1,
        weightUnit: '1kg',
      },
      {
        id: 'item-2',
        name: 'Bột Sắn Dây Ta Nguyên Chất 500g',
        price: 135000,
        quantity: 1,
        weightUnit: '500g',
      },
      {
        id: 'item-3',
        name: 'Trà Gạo Lứt Đậu Đen Xanh Lòng 400g',
        price: 95000,
        quantity: 1,
        weightUnit: '400g',
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumb
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Tra cứu đơn', href: '/orders/track' },
          { label: `Đơn hàng #${mockOrder.orderNumber}` },
        ]}
      />

      <div className="space-y-6 max-w-4xl mx-auto">
        <OrderTimeline currentStatus={mockOrder.status} />
        <OrderDetailsView order={mockOrder} />
      </div>
    </div>
  );
}
