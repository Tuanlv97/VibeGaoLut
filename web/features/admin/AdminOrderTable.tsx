'use client';

import React, { useState } from 'react';
import { OrderDetailsModal } from './OrderDetailsModal';

export function AdminOrderTable({
  orders = [],
  onUpdateStatus,
}: {
  orders: any[];
  onUpdateStatus: (orderId: string, status: string) => Promise<void>;
}) {
  const [selectedStatusTab, setSelectedStatusTab] = useState('ALL');
  const [selectedOrderForModal, setSelectedOrderForModal] = useState<any | null>(null);

  const statusList = [
    { key: 'ALL', label: 'Tất Cả' },
    { key: 'PENDING', label: 'Chờ Duyệt' },
    { key: 'CONFIRMED', label: 'Đã Xác Nhận' },
    { key: 'PROCESSING', label: 'Đang Đóng Gói' },
    { key: 'SHIPPED', label: 'Đang Giao' },
    { key: 'DELIVERED', label: 'Đã Giao' },
    { key: 'CANCELLED', label: 'Đã Hủy' },
  ];

  const filteredOrders = orders.filter((o) => {
    if (selectedStatusTab === 'ALL') return true;
    return o.status === selectedStatusTab;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <span className="bg-amber-100 text-amber-800 border border-amber-300 px-2.5 py-1 rounded-full text-xs font-bold">🟡 CHỜ DUYỆT</span>;
      case 'CONFIRMED':
        return <span className="bg-blue-100 text-blue-800 border border-blue-300 px-2.5 py-1 rounded-full text-xs font-bold">🔵 ĐÃ XÁC NHẬN</span>;
      case 'PROCESSING':
        return <span className="bg-purple-100 text-purple-800 border border-purple-300 px-2.5 py-1 rounded-full text-xs font-bold">🟣 ĐANG ĐÓNG GÓI</span>;
      case 'SHIPPED':
        return <span className="bg-indigo-100 text-indigo-800 border border-indigo-300 px-2.5 py-1 rounded-full text-xs font-bold">🚚 ĐANG GIAO</span>;
      case 'DELIVERED':
        return <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-1 rounded-full text-xs font-bold">🟢 ĐÃ GIAO</span>;
      case 'CANCELLED':
        return <span className="bg-red-100 text-red-800 border border-red-300 px-2.5 py-1 rounded-full text-xs font-bold">🔴 ĐÃ HỦY</span>;
      default:
        return <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full text-xs font-bold">{status}</span>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 bg-white p-2 rounded-xl border border-slate-200 shadow-xs overflow-x-auto">
        {statusList.map((tab) => {
          const isActive = selectedStatusTab === tab.key;
          const count = tab.key === 'ALL' ? orders.length : orders.filter((o) => o.status === tab.key).length;
          return (
            <button
              key={tab.key}
              onClick={() => setSelectedStatusTab(tab.key)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {tab.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-6">Mã Đơn Hàng</th>
                <th className="py-3.5 px-4">Khách Hàng (Guest)</th>
                <th className="py-3.5 px-4">Tổng Tiền (COD)</th>
                <th className="py-3.5 px-4">Trạng Thái Hiện Tại</th>
                <th className="py-3.5 px-6 text-right">Chuyển Trạng Thái / Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
                    Chưa có đơn hàng nào trong mục này.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900">
                      #{order.orderNumber}
                      <span className="block text-xs font-normal text-slate-400">
                        {new Date(order.createdAt).toLocaleString('vi-VN')}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-semibold text-slate-800">{order.customerName}</p>
                      <p className="text-xs text-slate-500">{order.customerPhone} • {order.province}</p>
                    </td>
                    <td className="py-4 px-4 font-bold text-emerald-700">
                      {order.totalAmount?.toLocaleString('vi-VN')}đ
                    </td>
                    <td className="py-4 px-4">{getStatusBadge(order.status)}</td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        onClick={() => setSelectedOrderForModal(order)}
                        className="inline-flex px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-medium transition-colors"
                      >
                        👁️ Chi tiết
                      </button>

                      {/* Quick Status Select */}
                      <select
                        value={order.status}
                        onChange={(e) => onUpdateStatus(order.id, e.target.value)}
                        className="rounded-lg border border-slate-300 text-xs font-semibold px-2 py-1.5 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                      >
                        <option value="PENDING">PENDING (Chờ duyệt)</option>
                        <option value="CONFIRMED">CONFIRMED (Xác nhận)</option>
                        <option value="PROCESSING">PROCESSING (Đóng gói)</option>
                        <option value="SHIPPED">SHIPPED (Giao hàng)</option>
                        <option value="DELIVERED">DELIVERED (Thành công)</option>
                        <option value="CANCELLED">CANCELLED (Hủy đơn)</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <OrderDetailsModal
        order={selectedOrderForModal}
        isOpen={Boolean(selectedOrderForModal)}
        onClose={() => setSelectedOrderForModal(null)}
      />
    </div>
  );
}
