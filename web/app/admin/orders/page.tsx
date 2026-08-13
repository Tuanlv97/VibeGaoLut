'use client';

import React from 'react';
import { AdminHeader } from '@/features/admin/AdminHeader';
import { AdminOrderTable } from '@/features/admin/AdminOrderTable';
import { useAdminOrders, useUpdateOrderStatus } from '@/lib/api/hooks';
import { restockMockStock } from '@/lib/mock-data';
import { useQueryClient } from '@tanstack/react-query';

export default function AdminOrdersPage() {
  const queryClient = useQueryClient();
  const { data: orders = [], refetch } = useAdminOrders();
  const updateStatusMutation = useUpdateOrderStatus();

  const handleUpdateStatus = async (orderId: string, status: string) => {
    const targetOrder = orders.find((o) => o.id === orderId || o.orderNumber === orderId);

    await updateStatusMutation.mutateAsync({ orderId, status });

    if (status === 'CANCELLED' && targetOrder?.items) {
      targetOrder.items.forEach((item: any) => {
        restockMockStock(item.productId || item.id, item.quantity);
      });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product'] });
    }

    refetch();
  };

  return (
    <div>
      <AdminHeader
        title="Quản Lý & Duyệt Đơn Hàng"
        subtitle="Xử lý đơn hàng COD từ PENDING -> CONFIRMED -> PROCESSING -> SHIPPED -> DELIVERED"
      />
      <div className="p-8 max-w-7xl mx-auto">
        <AdminOrderTable orders={orders} onUpdateStatus={handleUpdateStatus} />
      </div>
    </div>
  );
}
