import React from 'react';
import { Truck, CheckCircle2 } from 'lucide-react';

export const PaymentMethodSelector: React.FC = () => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 space-y-4">
      <h2 className="font-bold text-lg text-[#1E293B] border-b border-[#E2E8F0] pb-3">
        2. Phương Thức Thanh Toán
      </h2>

      <div className="p-4 border-2 border-[#2D5A27] bg-[#F9F6F0] rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#2D5A27] text-white rounded-lg">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-[#1E293B]">
              Thanh Toán Khi Nhận Hàng (COD)
            </h4>
            <p className="text-xs text-[#64748B]">
              Kiểm tra hàng trước khi thanh toán tiền mặt trực tiếp cho shipper
            </p>
          </div>
        </div>

        <CheckCircle2 className="w-6 h-6 text-[#2D5A27] shrink-0" />
      </div>
    </div>
  );
};
