import React from 'react';
import { CheckCircle2, Clock, PackageCheck, Truck, Check } from 'lucide-react';

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED';

interface OrderTimelineProps {
  currentStatus: OrderStatus;
}

export const OrderTimeline: React.FC<OrderTimelineProps> = ({ currentStatus }) => {
  const steps: Array<{ status: OrderStatus; label: string; desc: string }> = [
    { status: 'PENDING', label: 'Đã Tiếp Nhận', desc: 'Đơn hàng mới tạo' },
    { status: 'CONFIRMED', label: 'Đã Xác Nhận', desc: 'Nhân viên duyệt đơn' },
    { status: 'PROCESSING', label: 'Đang Đóng Gói', desc: 'Đang chuẩn bị lúa/gạo' },
    { status: 'SHIPPED', label: 'Đang Giao Hàng', desc: 'Shipper vận chuyển' },
    { status: 'DELIVERED', label: 'Giao Thành Công', desc: 'Hoàn tất thanh toán COD' },
  ];

  const getStepIndex = (s: OrderStatus) => {
    return steps.findIndex((step) => step.status === s);
  };

  const currentIndex = getStepIndex(currentStatus);

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 space-y-6">
      <h3 className="font-bold text-lg text-[#1E293B] border-b border-[#E2E8F0] pb-3">
        Lịch Sử Tiến Độ Đơn Hàng
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative">
        {steps.map((step, idx) => {
          const isDone = idx <= currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <div key={step.status} className="flex flex-row sm:flex-col items-center sm:text-center gap-3 sm:gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border-2 transition-all ${
                  isDone
                    ? 'bg-[#2D5A27] text-white border-[#2D5A27]'
                    : 'bg-slate-100 text-[#64748B] border-[#E2E8F0]'
                } ${isCurrent ? 'ring-4 ring-[#2D5A27]/20 scale-110' : ''}`}
              >
                {isDone ? <Check className="w-5 h-5" /> : idx + 1}
              </div>

              <div>
                <div className={`font-bold text-xs sm:text-sm ${isCurrent ? 'text-[#2D5A27]' : 'text-[#1E293B]'}`}>
                  {step.label}
                </div>
                <div className="text-[11px] text-[#64748B]">{step.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
