import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { OrderStatus } from './OrderTimeline';

interface OrderDetailsViewProps {
  order: {
    id: string;
    orderNumber: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    province: string;
    district: string;
    ward: string;
    addressDetail: string;
    subtotal: number;
    shippingFee: number;
    totalAmount: number;
    paymentMethod: string;
    status: OrderStatus;
    createdAt: string;
    items: Array<{
      id: string;
      name: string;
      price: number;
      quantity: number;
      weightUnit: string;
    }>;
  };
}

export const OrderDetailsView: React.FC<OrderDetailsViewProps> = ({ order }) => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2E8F0] pb-4">
        <div>
          <h2 className="font-bold text-xl font-display text-[#1E293B]">
            Chi Tiết Đơn Hàng #{order.orderNumber}
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            Khởi tạo lúc: {new Date(order.createdAt).toLocaleString('vi-VN')}
          </p>
        </div>
        <Badge variant={order.status === 'DELIVERED' ? 'success' : 'warning'}>
          {order.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[#1E293B]">
        <div className="p-4 bg-[#F9F6F0] rounded-xl space-y-2 border border-[#E2E8F0]">
          <h4 className="font-bold text-xs uppercase text-[#64748B] tracking-wider">Thông Tin Người Nhận</h4>
          <div><strong>{order.customerName}</strong> ({order.customerPhone})</div>
          <div className="text-xs text-[#64748B]">{order.customerEmail}</div>
          <div className="text-xs text-[#64748B] leading-relaxed pt-1">
            {order.addressDetail}, {order.ward}, {order.district}, {order.province}
          </div>
        </div>

        <div className="p-4 bg-[#F9F6F0] rounded-xl space-y-2 border border-[#E2E8F0]">
          <h4 className="font-bold text-xs uppercase text-[#64748B] tracking-wider">Thanh Toán & Vận Chuyển</h4>
          <div>Phương thức: <strong>{order.paymentMethod}</strong></div>
          <div>Trạng thái thanh toán: <strong className="text-[#166534]">Thanh toán khi nhận hàng</strong></div>
          <div className="pt-2 text-xs text-[#2D5A27] font-semibold">
            Tổng cộng COD: {new Intl.NumberFormat('vi-VN').format(order.totalAmount)}đ
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-bold text-sm text-[#1E293B]">Sản Phẩm Đã Đặt</h4>
        <div className="divide-y divide-[#E2E8F0] border border-[#E2E8F0] rounded-xl overflow-hidden">
          {order.items.map((item) => (
            <div key={item.id} className="p-3 bg-white flex items-center justify-between text-xs">
              <div>
                <div className="font-semibold text-[#1E293B]">{item.name}</div>
                <div className="text-[#64748B]">{item.weightUnit} x {item.quantity}</div>
              </div>
              <div className="font-bold font-mono text-[#2D5A27]">
                {new Intl.NumberFormat('vi-VN').format(item.price * item.quantity)}đ
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
