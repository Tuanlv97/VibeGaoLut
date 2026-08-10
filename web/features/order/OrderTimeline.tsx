import React from 'react';
import { FileText, ShieldCheck, Package, Truck, CheckCircle2, Check } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED';

interface OrderTimelineProps {
  currentStatus: OrderStatus;
}

export const OrderTimeline: React.FC<OrderTimelineProps> = ({ currentStatus }) => {
  const steps: Array<{
    status: OrderStatus;
    label: string;
    desc: string;
    icon: React.ElementType;
  }> = [
    { status: 'PENDING', label: 'Đã Tiếp Nhận', desc: 'Đơn hàng vừa tạo', icon: FileText },
    { status: 'CONFIRMED', label: 'Đã Xác Nhận', desc: 'Duyệt đơn hàng', icon: ShieldCheck },
    { status: 'PROCESSING', label: 'Đang Đóng Gói', desc: 'Chuẩn bị sản phẩm', icon: Package },
    { status: 'SHIPPED', label: 'Đang Giao Hàng', desc: 'Shipper vận chuyển', icon: Truck },
    { status: 'DELIVERED', label: 'Giao Thành Công', desc: 'Hoàn tất đơn hàng', icon: CheckCircle2 },
  ];

  const getStepIndex = (s: OrderStatus) => {
    const idx = steps.findIndex((step) => step.status === s);
    return idx === -1 ? 0 : idx;
  };

  const currentIndex = getStepIndex(currentStatus);
  const progressPercent = Math.min(100, Math.max(0, (currentIndex / (steps.length - 1)) * 100));

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'DELIVERED':
        return <Badge variant="success">GIAO THÀNH CÔNG</Badge>;
      case 'SHIPPED':
        return <Badge variant="sage">ĐANG GIAO HÀNG</Badge>;
      case 'PROCESSING':
        return <Badge variant="warning">ĐANG ĐÓNG GÓI</Badge>;
      case 'CONFIRMED':
        return <Badge variant="sage">ĐÃ XÁC NHẬN</Badge>;
      default:
        return <Badge variant="warning">ĐÃ TIẾP NHẬN</Badge>;
    }
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E8F0] pb-4">
        <div>
          <h3 className="font-extrabold text-xl font-display text-[#1E293B]">
            Tiến Trình Vận Chuyển
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">
            Cập nhật trạng thái xử lý theo thời gian thực
          </p>
        </div>
        <div>{getStatusBadge(currentStatus)}</div>
      </div>

      {/* Desktop Horizontal Timeline */}
      <div className="hidden md:block relative pt-4 pb-2 px-4">
        {/* Background Track Line */}
        <div className="absolute top-10 left-12 right-12 h-1 bg-[#E2E8F0] rounded-full z-0" />
        
        {/* Active Progress Fill Line */}
        <div
          className="absolute top-10 left-12 h-1 bg-[#2D5A27] rounded-full z-0 transition-all duration-500 ease-out"
          style={{ width: `calc(${progressPercent}% * 0.88)` }}
        />

        <div className="grid grid-cols-5 gap-2 relative z-10">
          {steps.map((step, idx) => {
            const isDone = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            const isFuture = idx > currentIndex;
            const StepIcon = step.icon;

            return (
              <div key={step.status} className="flex flex-col items-center text-center group">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCurrent
                      ? 'bg-[#2D5A27] text-white ring-4 ring-[#2D5A27]/25 shadow-md scale-110'
                      : isDone
                      ? 'bg-[#2D5A27] text-white'
                      : 'bg-white border-2 border-[#E2E8F0] text-[#94A3B8]'
                  }`}
                >
                  {isDone ? (
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  ) : (
                    <StepIcon className="w-5 h-5" />
                  )}
                </div>

                <div className="mt-3 space-y-0.5">
                  <div
                    className={`font-display font-bold text-xs sm:text-sm ${
                      isCurrent
                        ? 'text-[#2D5A27]'
                        : isDone
                        ? 'text-[#1E293B]'
                        : 'text-[#94A3B8]'
                    }`}
                  >
                    {step.label}
                  </div>
                  <div className="text-[11px] text-[#64748B] font-normal leading-tight">
                    {step.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Vertical Timeline */}
      <div className="block md:hidden relative pl-6 space-y-6 pt-2">
        {/* Vertical Line */}
        <div className="absolute top-3 bottom-3 left-[15px] w-0.5 bg-[#E2E8F0] z-0" />

        {steps.map((step, idx) => {
          const isDone = idx < currentIndex;
          const isCurrent = idx === currentIndex;
          const StepIcon = step.icon;

          return (
            <div key={step.status} className="relative flex items-start gap-4 z-10">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 -ml-4 transition-all ${
                  isCurrent
                    ? 'bg-[#2D5A27] text-white ring-4 ring-[#2D5A27]/25 shadow-sm'
                    : isDone
                    ? 'bg-[#2D5A27] text-white'
                    : 'bg-white border-2 border-[#E2E8F0] text-[#94A3B8]'
                }`}
              >
                {isDone ? <Check className="w-4 h-4" /> : <StepIcon className="w-4 h-4" />}
              </div>

              <div className="-mt-0.5 space-y-0.5">
                <div
                  className={`font-display font-bold text-sm ${
                    isCurrent
                      ? 'text-[#2D5A27]'
                      : isDone
                      ? 'text-[#1E293B]'
                      : 'text-[#94A3B8]'
                  }`}
                >
                  {step.label}
                </div>
                <div className="text-xs text-[#64748B]">{step.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

