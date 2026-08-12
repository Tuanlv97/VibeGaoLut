'use client';

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

export function OrderDetailsModal({
  order,
  isOpen,
  onClose,
}: {
  order: any | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!order) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Chi Tiết Đơn Hàng #${order.orderNumber}`}>
      <div className="space-y-6 text-sm">
        {/* Customer & Address Card */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
          <p className="font-bold text-slate-800">Thông Tin Khách Hàng (Guest)</p>
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
            <p><span className="font-semibold">Họ tên:</span> {order.customerName}</p>
            <p><span className="font-semibold">SĐT:</span> {order.customerPhone}</p>
            <p><span className="font-semibold">Email:</span> {order.customerEmail}</p>
            <p><span className="font-semibold">Thanh toán:</span> {order.paymentMethod || 'COD'}</p>
          </div>
          <p className="text-xs text-slate-600 pt-1 border-t border-slate-200">
            <span className="font-semibold">Địa chỉ giao hàng:</span> {order.addressDetail}, {order.ward}{order.district ? `, ${order.district}` : ''}, {order.province}
          </p>
        </div>

        {/* Order Items */}
        <div>
          <p className="font-bold text-slate-800 mb-2">Danh Sách Sản Phẩm Mua</p>
          <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
            {order.items?.map((item: any) => (
              <div key={item.id} className="p-3 flex items-center justify-between bg-white text-xs">
                <div>
                  <p className="font-bold text-slate-900">{item.productName}</p>
                  <p className="text-slate-500">Số lượng: x{item.quantity}</p>
                </div>
                <p className="font-semibold text-emerald-700">
                  {item.subtotal?.toLocaleString('vi-VN')}đ
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Calculation */}
        <div className="border-t border-slate-200 pt-4 text-xs space-y-1.5">
          <div className="flex justify-between text-slate-600">
            <span>Tạm tính:</span>
            <span>{order.subtotal?.toLocaleString('vi-VN')}đ</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Phí vận chuyển:</span>
            <span>{order.shippingFee?.toLocaleString('vi-VN')}đ</span>
          </div>
          <div className="flex justify-between font-bold text-sm text-slate-900 pt-2 border-t border-slate-100">
            <span>Tổng thanh toán (COD):</span>
            <span className="text-emerald-700">{order.totalAmount?.toLocaleString('vi-VN')}đ</span>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-100">
          <Button variant="outline" onClick={onClose}>
            Đóng
          </Button>
        </div>
      </div>
    </Modal>
  );
}
