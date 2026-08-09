'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface TrackOrderFormProps {
  onTrack: (orderNumber: string, phone: string) => void;
  initialOrderNumber?: string;
  initialPhone?: string;
  isLoading?: boolean;
}

export const TrackOrderForm: React.FC<TrackOrderFormProps> = ({
  onTrack,
  initialOrderNumber = '',
  initialPhone = '',
  isLoading = false,
}) => {
  const [orderNumber, setOrderNumber] = useState(initialOrderNumber);
  const [phone, setPhone] = useState(initialPhone);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!orderNumber.trim() || !phone.trim()) {
      setError('Vui lòng điền đầy đủ Mã đơn hàng và Số điện thoại');
      return;
    }

    onTrack(orderNumber.trim(), phone.trim());
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 max-w-xl mx-auto shadow-xs space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold font-display text-[#1E293B]">
          Tra Cứu Tiến Độ Đơn Hàng Guest
        </h2>
        <p className="text-xs text-[#64748B]">
          Nhập Mã Đơn Hàng (vd: GP-883920) và Số Điện Thoại để xem lịch sử trạng thái giao hàng.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Mã Đơn Hàng"
          placeholder="Nhập mã dạng GP-883920..."
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          required
        />

        <Input
          label="Số Điện Thoại Nhận Hàng"
          placeholder="Nhập SĐT đã dùng khi đặt hàng..."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        {error && <p className="text-xs text-[#991B1B] font-medium">{error}</p>}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isLoading}
          className="w-full bg-[#2D5A27]"
        >
          <Search className="w-4 h-4" />
          Tra Cứu Ngay
        </Button>
      </form>
    </div>
  );
};
