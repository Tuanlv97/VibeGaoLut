'use client';

import React from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

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
}

export const GuestAddressForm: React.FC<GuestAddressFormProps> = ({
  formData,
  onChange,
  errors,
}) => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 space-y-4">
      <h2 className="font-bold text-lg text-[#1E293B] border-b border-[#E2E8F0] pb-3">
        1. Thông Tin Nhận Hàng (Guest Checkout)
      </h2>

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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Input
          label="Tỉnh / Thành Phố"
          placeholder="Ví dụ: Hà Nội"
          value={formData.province}
          onChange={(e) => onChange('province', e.target.value)}
          error={errors.province}
          required
        />

        <Input
          label="Quận / Huyện"
          placeholder="Ví dụ: Cầu Giấy"
          value={formData.district}
          onChange={(e) => onChange('district', e.target.value)}
          error={errors.district}
          required
        />

        <Input
          label="Phường / Xã"
          placeholder="Ví dụ: Dịch Vọng"
          value={formData.ward}
          onChange={(e) => onChange('ward', e.target.value)}
          error={errors.ward}
          required
        />
      </div>

      <Textarea
        label="Địa Chỉ Cụ Thể (Số nhà, tên đường, tòa nhà)"
        placeholder="Ví dụ: Số 10 Phạm Hùng, Tòa nhà Keangnam..."
        value={formData.addressDetail}
        onChange={(e) => onChange('addressDetail', e.target.value)}
        error={errors.addressDetail}
        required
      />

      <Textarea
        label="Ghi Chú Đơn Hàng (Tùy chọn)"
        placeholder="Lời nhắn cho shipper: Giao giờ hành chính, gọi trước khi giao..."
        value={formData.orderNote}
        onChange={(e) => onChange('orderNote', e.target.value)}
      />
    </div>
  );
};
