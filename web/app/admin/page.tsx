'use client';

import React from 'react';
import { AdminHeader } from '@/features/admin/AdminHeader';
import { AdminStatCard } from '@/features/admin/AdminStatCard';
import { AdminOrderTable } from '@/features/admin/AdminOrderTable';
import { useAdminStats, useAdminOrders, useUpdateOrderStatus } from '@/lib/api/hooks';

export default function AdminDashboardPage() {
  const { data: stats } = useAdminStats();
  const { data: orders = [], refetch: refetchOrders } = useAdminOrders();
  const updateStatusMutation = useUpdateOrderStatus();

  const handleUpdateStatus = async (orderId: string, status: string) => {
    await updateStatusMutation.mutateAsync({ orderId, status });
    refetchOrders();
  };

  return (
    <div>
      <AdminHeader
        title="Tổng Quan Báo Cáo & Quản Trị (Dashboard)"
        subtitle="Theo dõi chỉ số kinh doanh, sản phẩm và đơn hàng chờ duyệt"
      />

      <div className="p-8 space-y-8 max-w-7xl mx-auto">
        {/* KPI Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AdminStatCard
            title="Tổng Doanh Thu"
            value={`${(stats?.totalRevenue || 154200000).toLocaleString('vi-VN')}đ`}
            icon="💰"
            badgeText="+12% tháng này"
            badgeColor="emerald"
          />
          <AdminStatCard
            title="Tổng Đơn Hàng"
            value={stats?.totalOrders || 1248}
            icon="📦"
            badgeText="Tất cả đơn"
            badgeColor="blue"
          />
          <AdminStatCard
            title="Đơn Hàng Chờ Duyệt"
            value={stats?.pendingOrdersCount || 18}
            icon="⏳"
            badgeText="Cần xử lý"
            badgeColor="amber"
          />
          <AdminStatCard
            title="Tổng Số Sản Phẩm"
            value={stats?.totalProducts || 42}
            icon="🌾"
            badgeText="Hoạt động"
            badgeColor="purple"
          />
        </div>

        {/* Recent Orders Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800 tracking-tight">Đơn Hàng Gần Đây</h3>
          </div>
          <AdminOrderTable orders={orders} onUpdateStatus={handleUpdateStatus} />
        </div>
      </div>
    </div>
  );
}
