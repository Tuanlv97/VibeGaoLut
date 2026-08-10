'use client';

import React, { useState } from 'react';
import { Search, Package, Phone } from 'lucide-react';
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
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 max-w-xl mx-auto shadow-sm space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-[#F0FDF4] text-[#2D5A27] rounded-full flex items-center justify-center mx-auto mb-2 border border-[#DCFCE7]">
          <Package className="w-6 h-6" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#1E293B]">
          Kiểm Tra Trạng Thái Đơn Hàng
        </h2>
        <p className="text-sm text-[#64748B] max-w-md mx-auto">
          Nhập Mã Đơn Hàng (vd: <span className="font-mono font-medium text-[#2D5A27]">GP-963191</span>) và Số Điện Thoại để tra cứu chi tiết tiến trình giao hàng.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 pt-1">
        <div>
          <Input
            label="Mã Đơn Hàng"
            placeholder="Ví dụ: GP-963191..."
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            required
            className="font-mono uppercase tracking-wider"
          />
        </div>

        <div>
          <Input
            label="Số Điện Thoại Nhận Hàng"
            placeholder="Nhập SĐT khi đặt hàng (vd: 0978785678)..."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        {error && (
          <p className="text-xs text-[#991B1B] bg-[#FEE2E2] p-2.5 rounded-lg font-medium border border-[#FECACA]">
            {error}
          </p>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isLoading}
          className="w-full justify-center gap-2 text-base font-semibold shadow-xs"
        >
          <Search className="w-4 h-4 shrink-0" />
          <span>Tra Cứu Tiến Độ</span>
        </Button>
      </form>
    </div>
  );
};

