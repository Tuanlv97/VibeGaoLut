'use client';

import React from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

import { AdministrativeSelects } from '@/components/checkout/AdministrativeSelects';

interface GuestAddressFormProps {
  formData: {
    fullName: string;
    phone: string;
    email: string;
    province: string;
    district: string;
    ward: string;
    addressDetail: string;
    orderNote: string;
  };
  onChange: (field: string, value: string) => void;
  errors: Record<string, string>;
  isLoggedIn?: boolean;
  customerName?: string;
  hasNoAddress?: boolean;
  saveAsDefault?: boolean;
  onToggleSaveAsDefault?: (val: boolean) => void;
}

export const GuestAddressForm: React.FC<GuestAddressFormProps> = ({
  formData,
  onChange,
  errors,
  isLoggedIn = false,
  customerName,
  hasNoAddress = false,
  saveAsDefault = false,
  onToggleSaveAsDefault,
}) => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 space-y-4">
      <h2 className="font-bold text-lg text-[#1E293B] border-b border-[#E2E8F0] pb-3 flex items-center justify-between">
        <span>
          1. Thông Tin Nhận Hàng {isLoggedIn ? `(Tài Khoản: ${customerName || formData.fullName || 'Thành Viên'})` : '(Khách Vãng Lai)'}
        </span>
        {isLoggedIn && (
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1">
            ✨ Đã đăng nhập • Tích 10k = 1đ
          </span>
        )}
      </h2>

      {isLoggedIn && hasNoAddress && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-start gap-2.5 shadow-sm">
          <span className="text-base flex-shrink-0">📌</span>
          <div className="space-y-0.5">
            <span className="font-bold block text-sm text-[#2D5A27]">Tài Khoản Chưa Có Địa Chỉ Nhận Hàng</span>
            <span>
              Vui lòng nhập thông tin giao hàng bên dưới. Hệ thống sẽ <strong>tự động lưu</strong> địa chỉ này làm địa chỉ mặc định để tự động fill cho các lần mua hàng tiếp theo của bạn!
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Họ và Tên Người Nhận"
          placeholder="Nhập họ và tên..."
          value={formData.fullName}
          onChange={(e) => onChange('fullName', e.target.value)}
          error={errors.fullName}
          required
        />

        <Input
          label="Số Điện Thoại Nhận Hàng"
          placeholder="Ví dụ: 0912345678"
          value={formData.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          error={errors.phone}
          required
        />
      </div>

      <Input
        label="Địa Chỉ Email (Nhận thông báo đơn hàng)"
        placeholder="Ví dụ: mail@example.com"
        type="email"
        value={formData.email}
        onChange={(e) => onChange('email', e.target.value)}
        error={errors.email}
        required
      />

      <AdministrativeSelects
        provinceValue={formData.province}
        wardValue={formData.ward}
        onChange={onChange}
        errors={errors}
        required
      />

      <Textarea
        label="Địa Chỉ Cụ Thể (Số nhà, tên đường, tòa nhà)"
        placeholder="Ví dụ: Số 10 Phạm Hùng, Tòa nhà Keangnam..."
        value={formData.addressDetail}
        onChange={(e) => onChange('addressDetail', e.target.value)}
        error={errors.addressDetail}
        required
      />

      {isLoggedIn && !hasNoAddress && (
        <label className="flex items-center gap-2.5 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-emerald-50/40 transition-colors text-xs text-slate-800 font-medium">
          <input
            type="checkbox"
            checked={saveAsDefault}
            onChange={(e) => onToggleSaveAsDefault?.(e.target.checked)}
            className="w-4 h-4 text-[#2D5A27] rounded focus:ring-[#2D5A27]"
          />
          <span>💾 Lưu / Cập nhật địa chỉ này làm địa chỉ giao hàng mặc định cho tài khoản của tôi</span>
        </label>
      )}

      <Textarea
        label="Ghi Chú Đơn Hàng (Tùy chọn)"
        placeholder="Lời nhắn cho shipper: Giao giờ hành chính, gọi trước khi giao..."
        value={formData.orderNote}
        onChange={(e) => onChange('orderNote', e.target.value)}
      />
    </div>
  );
};
