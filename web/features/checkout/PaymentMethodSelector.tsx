import React from 'react';
import { Truck, Coins, Building2, CheckCircle2, AlertCircle } from 'lucide-react';

interface PaymentMethodSelectorProps {
  selectedMethod: string;
  onChange: (method: string) => void;
  goldBalance?: number;
  totalAmountGold?: number;
}

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  onChange,
  goldBalance = 0,
  totalAmountGold = 0,
}) => {
  const isGoldSufficient = goldBalance >= totalAmountGold;

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 space-y-4">
      <h2 className="font-bold text-lg text-[#1E293B] border-b border-[#E2E8F0] pb-3">
        2. Phương Thức Thanh Toán
      </h2>

      <div className="space-y-3">
        {/* Option 1: GOLD WALLET */}
        <button
          type="button"
          onClick={() => onChange('GOLD_WALLET')}
          className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
            selectedMethod === 'GOLD_WALLET'
              ? 'border-[#2D5A27] bg-[#F9F6F0] shadow-xs'
              : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500 text-white rounded-lg">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm text-[#1E293B]">
                  Thanh Toán Bằng Ví GOLD
                </h4>
                <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                  Số dư: {goldBalance} GOLD
                </span>
              </div>
              <p className="text-xs text-[#64748B] mt-0.5">
                Cần <strong>{totalAmountGold} GOLD</strong> cho đơn hàng này. Trừ trực tiếp số dư Ví không cần chuyển khoản.
              </p>
              {!isGoldSufficient && selectedMethod === 'GOLD_WALLET' && (
                <p className="text-[11px] text-rose-600 font-semibold mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Số dư GOLD không đủ. Vui lòng nạp thêm GOLD hoặc chọn PTTT khác.
                </p>
              )}
            </div>
          </div>

          {selectedMethod === 'GOLD_WALLET' && (
            <CheckCircle2 className="w-6 h-6 text-[#2D5A27] shrink-0" />
          )}
        </button>

        {/* Option 2: BANK TRANSFER (VietQR) */}
        <button
          type="button"
          onClick={() => onChange('BANK_TRANSFER')}
          className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
            selectedMethod === 'BANK_TRANSFER'
              ? 'border-[#2D5A27] bg-[#F9F6F0] shadow-xs'
              : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600 text-white rounded-lg">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#1E293B]">
                Chuyển Khoản Ngân Hàng (VietQR)
              </h4>
              <p className="text-xs text-[#64748B]">
                Quét mã VietQR chuyển khoản trực tiếp qua ngân hàng (MB, Vietcombank, Techcombank...)
              </p>
            </div>
          </div>

          {selectedMethod === 'BANK_TRANSFER' && (
            <CheckCircle2 className="w-6 h-6 text-[#2D5A27] shrink-0" />
          )}
        </button>

        {/* Option 3: COD */}
        <button
          type="button"
          onClick={() => onChange('COD')}
          className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
            selectedMethod === 'COD'
              ? 'border-[#2D5A27] bg-[#F9F6F0] shadow-xs'
              : 'border-slate-200 hover:border-slate-300'
          }`}
        >
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

          {selectedMethod === 'COD' && (
            <CheckCircle2 className="w-6 h-6 text-[#2D5A27] shrink-0" />
          )}
        </button>
      </div>
    </div>
  );
};
