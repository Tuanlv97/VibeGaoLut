'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/stores/cart-store';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { GuestAddressForm } from '@/features/checkout/GuestAddressForm';
import { PaymentMethodSelector } from '@/features/checkout/PaymentMethodSelector';
import { OrderSummaryWidget } from '@/features/checkout/OrderSummaryWidget';

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const getGrandTotal = useCartStore((s) => s.getGrandTotal);
  const clearCart = useCartStore((s) => s.clearCart);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    province: 'Hà Nội',
    district: 'Cầu Giấy',
    ward: 'Dịch Vọng',
    addressDetail: '',
    orderNote: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold font-display text-[#1E293B]">
          Giỏ Hàng Đang Trống
        </h2>
        <p className="text-sm text-[#64748B]">Vui lòng thêm sản phẩm trước khi thanh toán.</p>
      </div>
    );
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Vui lòng nhập họ và tên';
    if (!formData.phone.trim() || formData.phone.length < 9) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = 'Email không hợp lệ';
    }
    if (!formData.addressDetail.trim()) {
      newErrors.addressDetail = 'Vui lòng nhập địa chỉ cụ thể';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirmOrder = () => {
    if (!validate()) return;

    setIsSubmitting(true);

    const generatedOrderNumber = `GP-${Math.floor(100000 + Math.random() * 900000)}`;
    const grandTotal = getGrandTotal();

    setTimeout(() => {
      clearCart();
      setIsSubmitting(false);
      router.push(
        `/orders/success?orderNumber=${generatedOrderNumber}&name=${encodeURIComponent(
          formData.fullName
        )}&phone=${encodeURIComponent(formData.phone)}&total=${grandTotal}`
      );
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumb
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Giỏ hàng', href: '/cart' },
          { label: 'Thanh toán COD' },
        ]}
      />

      <h1 className="text-3xl font-bold font-display text-[#1E293B]">
        Guest Checkout Thanh Toán COD
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          <GuestAddressForm
            formData={formData}
            onChange={handleChange}
            errors={errors}
          />
          <PaymentMethodSelector />
        </div>

        <div className="lg:col-span-1">
          <OrderSummaryWidget
            onConfirmOrder={handleConfirmOrder}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}
