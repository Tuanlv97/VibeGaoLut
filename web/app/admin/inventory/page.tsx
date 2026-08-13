'use client';

import React from 'react';
import { AdminHeader } from '@/features/admin/AdminHeader';
import { InventoryManagement } from '@/features/admin/InventoryManagement';

export default function AdminInventoryPage() {
  return (
    <div>
      <AdminHeader
        title="Quản Lý Kho Hàng & Nhập Kho"
        subtitle="Kiểm soát số lượng tồn kho, nhận cảnh báo hàng sắp hết và lập phiếu nhập hàng"
      />
      <div className="p-8 max-w-7xl mx-auto">
        <InventoryManagement />
      </div>
    </div>
  );
}
