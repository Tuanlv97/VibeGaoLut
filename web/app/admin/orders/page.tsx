'use client';

import React from 'react';
import { AdminHeader } from '@/features/admin/AdminHeader';
import { AdminOrderTable } from '@/features/admin/AdminOrderTable';
import { useAdminOrders, useUpdateOrderStatus } from '@/lib/api/hooks';

export default function AdminOrdersPage() {
  const { data: orders = [], refetch } = useAdminOrders();
  const updateStatusMutation = useUpdateOrderStatus();

  const handleUpdateStatus = async (orderId: string, status: string) => {
    await updateStatusMutation.mutateAsync({ orderId, status });
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
