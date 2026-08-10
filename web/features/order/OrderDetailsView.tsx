import React from 'react';
import { User, MapPin, CreditCard, ShoppingBag, Calendar, CheckCircle } from 'lucide-react';
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
  const formattedDate = new Date(order.createdAt).toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E8F0] pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="font-extrabold text-2xl font-display text-[#1E293B]">
              Đơn hàng:
            </h2>
            <span className="font-mono text-2xl font-black text-[#2D5A27] tracking-wide">
              #{order.orderNumber}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
            <Calendar className="w-3.5 h-3.5" />
            <span>Đặt lúc: {formattedDate}</span>
          </div>
        </div>

        <div className="self-start sm:self-auto">
          <Badge variant={order.status === 'DELIVERED' ? 'success' : 'warning'}>
            {order.status}
          </Badge>
        </div>
      </div>

      {/* Info Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        {/* Recipient Card */}
        <div className="p-5 bg-[#F9F6F0] rounded-xl space-y-3 border border-[#E2E8F0]">
          <div className="flex items-center gap-2 text-[#2D5A27] font-display font-bold text-xs uppercase tracking-wider border-b border-[#E2E8F0]/80 pb-2">
            <User className="w-4 h-4" />
            <span>Thông Tin Giao Hàng</span>
          </div>
          <div className="space-y-1.5 text-xs sm:text-sm text-[#1E293B]">
            <div className="font-semibold text-base text-[#1E293B]">{order.customerName}</div>
            <div className="text-[#64748B]">SĐT: <strong className="text-[#1E293B] font-mono">{order.customerPhone}</strong></div>
            {order.customerEmail && (
              <div className="text-[#64748B]">Email: {order.customerEmail}</div>
            )}
            <div className="flex items-start gap-1.5 pt-1 text-[#64748B] leading-relaxed">
              <MapPin className="w-4 h-4 shrink-0 text-[#2D5A27] mt-0.5" />
              <span>
                {order.addressDetail}, {order.ward}, {order.district}, {order.province}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Card */}
        <div className="p-5 bg-[#F9F6F0] rounded-xl space-y-3 border border-[#E2E8F0]">
          <div className="flex items-center gap-2 text-[#2D5A27] font-display font-bold text-xs uppercase tracking-wider border-b border-[#E2E8F0]/80 pb-2">
            <CreditCard className="w-4 h-4" />
            <span>Thanh Toán & Vận Chuyển</span>
          </div>
          <div className="space-y-2 text-xs sm:text-sm text-[#1E293B]">
            <div>
              <span className="text-[#64748B]">Phương thức: </span>
              <strong className="font-medium text-[#1E293B]">{order.paymentMethod}</strong>
            </div>
            <div className="flex items-center gap-1.5 text-[#166534] bg-[#DCFCE7] px-2.5 py-1 rounded-md text-xs font-semibold w-fit border border-[#BBF7D0]">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Thanh toán COD khi nhận hàng</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ordered Products Table */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 font-display font-bold text-base text-[#1E293B]">
          <ShoppingBag className="w-4 h-4 text-[#2D5A27]" />
          <span>Sản Phẩm Đã Đặt ({order.items.length})</span>
        </div>

        <div className="border border-[#E2E8F0] rounded-xl overflow-hidden divide-y divide-[#E2E8F0]">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-white hover:bg-slate-50/50 transition-colors flex items-center justify-between gap-4 text-xs sm:text-sm"
            >
              <div className="space-y-1">
                <div className="font-bold text-[#1E293B] font-display text-sm sm:text-base">
                  {item.name}
                </div>
                <div className="text-xs text-[#64748B] flex items-center gap-2">
                  <span className="bg-slate-100 text-[#64748B] px-2 py-0.5 rounded text-[11px] font-medium border border-slate-200">
                    {item.weightUnit}
                  </span>
                  <span>x {item.quantity}</span>
                </div>
              </div>
              <div className="font-bold font-mono text-[#2D5A27] text-sm sm:text-base text-right shrink-0">
                {new Intl.NumberFormat('vi-VN').format(item.price * item.quantity)}đ
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Summary */}
      <div className="p-4 bg-[#F9F6F0] rounded-xl border border-[#E2E8F0] space-y-2 text-xs sm:text-sm text-[#64748B]">
        <div className="flex justify-between items-center">
          <span>Tạm tính:</span>
          <span className="font-mono font-medium text-[#1E293B]">
            {new Intl.NumberFormat('vi-VN').format(order.subtotal)}đ
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span>Phí vận chuyển:</span>
          <span className="font-mono font-medium text-[#1E293B]">
            {order.shippingFee > 0
              ? `${new Intl.NumberFormat('vi-VN').format(order.shippingFee)}đ`
              : 'Miễn phí'}
          </span>
        </div>
        <div className="border-t border-[#E2E8F0] pt-2.5 mt-1 flex justify-between items-center text-sm sm:text-base font-bold">
          <span className="text-[#1E293B] font-display">Tổng cộng COD:</span>
          <span className="text-[#2D5A27] font-mono text-lg font-black">
            {new Intl.NumberFormat('vi-VN').format(order.totalAmount)}đ
          </span>
        </div>
      </div>
    </div>
  );
};

