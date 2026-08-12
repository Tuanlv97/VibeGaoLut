'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { Award, Check, MapPin, AlertCircle } from 'lucide-react';
import { useCartStore } from '@/stores/cart-store';
import { useCustomerAuthStore } from '@/stores/customer-auth-store';
import { useCustomerProfile, CustomerAddressItem } from '@/lib/api/hooks/useCustomer';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { GuestAddressForm } from '@/features/checkout/GuestAddressForm';
import { PaymentMethodSelector } from '@/features/checkout/PaymentMethodSelector';
import { OrderSummaryWidget } from '@/features/checkout/OrderSummaryWidget';
import { useCreateOrder, saveLocalOrder } from '@/lib/api/hooks';

export default function CheckoutPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const items = useCartStore((s) => s.items);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const getShippingFee = useCartStore((s) => s.getShippingFee);
  const getGrandTotal = useCartStore((s) => s.getGrandTotal);
  const clearCart = useCartStore((s) => s.clearCart);

  const { customer, token, updateCustomer } = useCustomerAuthStore();
  const { data: profile } = useCustomerProfile();

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

  const [selectedAddressId, setSelectedAddressId] = useState<string>('');

  // Loyalty Points Opt-In State (DEFAULT IS UNCHECKED / FALSE)
  const [usePoints, setUsePoints] = useState<boolean>(false);
  const [pointsToUse, setPointsToUse] = useState<number>(0);

  const [paymentMethod, setPaymentMethod] = useState<string>('COD');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createOrderMutation = useCreateOrder();

  // Auto-fill from customer profile, customer auth store, or default address
  useEffect(() => {
    const userObj = profile || customer;
    if (userObj) {
      const defaultAddr = profile?.addresses?.find((a) => a.isDefault) || profile?.addresses?.[0];
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || defaultAddr?.recipientName || userObj.fullName || '',
        phone: prev.phone || defaultAddr?.phone || userObj.phone || '',
        email: prev.email || userObj.email || '',
        province: defaultAddr?.province || prev.province || 'Hà Nội',
        district: defaultAddr?.district || prev.district || 'Cầu Giấy',
        ward: defaultAddr?.ward || prev.ward || 'Dịch Vọng',
        addressDetail: defaultAddr?.addressDetail || prev.addressDetail || '',
      }));

      if (defaultAddr) {
        setSelectedAddressId(defaultAddr.id);
      }
    }
  }, [profile, customer]);

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

  const handleSelectSavedAddress = (addr: CustomerAddressItem) => {
    setSelectedAddressId(addr.id);
    setFormData((prev) => ({
      ...prev,
      fullName: addr.recipientName,
      phone: addr.phone,
      province: addr.province,
      district: addr.district,
      ward: addr.ward,
      addressDetail: addr.addressDetail,
    }));
  };

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

  const availablePoints = profile?.loyaltyPoints || customer?.loyaltyPoints || 0;
  const subtotal = getSubtotal();
  const maxRedeemablePoints = Math.min(availablePoints, Math.floor(subtotal / 1000) * 10);
  const pointsDiscountAmount = usePoints && pointsToUse > 0 ? pointsToUse * 100 : 0;

  const handleConfirmOrder = async () => {
    if (!validate()) return;

    setIsSubmitting(true);
    const shippingFee = getShippingFee();
    const calculatedGrandTotal = Math.max(0, subtotal + shippingFee - pointsDiscountAmount);

    try {
      const orderPayload: any = {
        customerName: formData.fullName,
        customerPhone: formData.phone,
        customerEmail: formData.email,
        province: formData.province,
        district: formData.district,
        ward: formData.ward,
        addressDetail: formData.addressDetail,
        paymentMethod,
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      };

      if (token && (profile?.id || customer?.id)) {
        orderPayload.customerId = profile?.id || customer?.id;
        orderPayload.usePoints = usePoints;
        orderPayload.pointsToUse = usePoints ? pointsToUse : 0;
      }

      const result = await createOrderMutation.mutateAsync(orderPayload);
      clearCart();
      setIsSubmitting(false);

      const orderNum = result.orderNumber || `GP-${Math.floor(100000 + Math.random() * 900000)}`;
      const total = result.totalAmount || calculatedGrandTotal;

      if (paymentMethod === 'GOLD_WALLET') {
        const goldPaid = Math.ceil(total / 1000);
        if (customer?.goldBalance !== undefined) {
          const newBalance = Math.max(0, customer.goldBalance - goldPaid);
          updateCustomer({ goldBalance: newBalance });
          queryClient.setQueryData(['customer-profile', token], (old: any) =>
            old ? { ...old, goldBalance: newBalance } : old
          );
        }
      }

      queryClient.invalidateQueries({ queryKey: ['customer-profile'] });
      queryClient.invalidateQueries({ queryKey: ['customer-wallet'] });
      queryClient.invalidateQueries({ queryKey: ['customer-orders'] });

      const finalPaymentMethod = result.paymentMethod || paymentMethod;
      const finalStatus = result.status || (paymentMethod === 'GOLD_WALLET' ? 'PROCESSING' : 'PENDING');

      router.push(
        `/orders/success?orderNumber=${orderNum}&name=${encodeURIComponent(
          formData.fullName
        )}&phone=${encodeURIComponent(formData.phone)}&total=${total}&paymentMethod=${encodeURIComponent(
          finalPaymentMethod
        )}&status=${encodeURIComponent(finalStatus)}`
      );
    } catch (err: any) {
      setIsSubmitting(false);
      const errorMessage = err?.message || 'Đặt hàng không thành công. Vui lòng thử lại.';

      // If backend API returned a specific validation or balance error, show it to the user
      if (errorMessage && !errorMessage.includes('Failed to fetch') && !errorMessage.includes('NetworkError')) {
        setErrors((prev) => ({ ...prev, submit: errorMessage }));
        return;
      }

      // Fallback only if API server is completely offline
      const generatedOrderNumber = `GP-${Math.floor(100000 + Math.random() * 900000)}`;

      const fallbackOrder = {
        id: `ord_local_${Date.now()}`,
        orderNumber: generatedOrderNumber,
        customerName: formData.fullName,
        customerPhone: formData.phone,
        customerEmail: formData.email,
        province: formData.province,
        district: formData.district,
        ward: formData.ward,
        addressDetail: formData.addressDetail,
        subtotal,
        shippingFee,
        totalAmount: calculatedGrandTotal,
        paymentMethod,
        status: paymentMethod === 'GOLD_WALLET' ? 'PROCESSING' : 'PENDING',
        createdAt: new Date().toISOString(),
        items: items.map((i) => ({
          id: i.id,
          productId: i.id,
          productName: i.name,
          unitPrice: i.price,
          quantity: i.quantity,
          subtotal: i.price * i.quantity,
          weightUnit: i.weightUnit,
        })),
        customerId: customer?.id || null,
        pointsUsed: usePoints ? pointsToUse : 0,
        pointsDiscountAmount,
      };

      if (paymentMethod === 'GOLD_WALLET') {
        const goldPaid = Math.ceil(calculatedGrandTotal / 1000);
        if (customer?.goldBalance !== undefined) {
          updateCustomer({ goldBalance: Math.max(0, customer.goldBalance - goldPaid) });
        }
      }

      saveLocalOrder(fallbackOrder);
      clearCart();

      router.push(
        `/orders/success?orderNumber=${generatedOrderNumber}&name=${encodeURIComponent(
          formData.fullName
        )}&phone=${encodeURIComponent(formData.phone)}&total=${calculatedGrandTotal}&paymentMethod=${encodeURIComponent(
          paymentMethod
        )}&status=${encodeURIComponent(paymentMethod === 'GOLD_WALLET' ? 'PROCESSING' : 'PENDING')}`
      );
    }
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
        {token ? 'Thanh Toán Đơn Hàng' : 'Guest Checkout Thanh Toán COD'}
      </h1>

      {errors.submit && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 font-medium text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600" />
          <span>{errors.submit}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          {/* Saved Addresses Bar for Logged-In Customers */}
          {token && profile?.addresses && profile.addresses.length > 0 && (
            <div className="bg-white border border-[#E2D9CC] rounded-xl p-5 space-y-3">
              <h3 className="font-bold text-sm text-[#1E293B] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#2D5A27]" /> Chọn Địa Chỉ Giao Hàng Đã Lưu
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {profile.addresses.map((addr) => (
                  <button
                    key={addr.id}
                    type="button"
                    onClick={() => handleSelectSavedAddress(addr)}
                    className={`text-left p-3.5 rounded-xl border text-xs transition-all space-y-1 ${
                      selectedAddressId === addr.id
                        ? 'border-[#2D5A27] bg-emerald-50/50 ring-1 ring-[#2D5A27]'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-bold text-slate-800 flex items-center justify-between">
                      <span>{addr.recipientName} ({addr.phone})</span>
                      {selectedAddressId === addr.id && <Check className="w-4 h-4 text-[#2D5A27]" />}
                    </div>
                    <div className="text-slate-600 line-clamp-2">
                      {addr.addressDetail}, {addr.ward}{addr.district ? `, ${addr.district}` : ''}, {addr.province}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <GuestAddressForm
            formData={formData}
            onChange={handleChange}
            errors={errors}
            isLoggedIn={Boolean(token)}
            customerName={profile?.fullName || customer?.fullName}
          />

          {/* Loyalty Points Opt-In Block for Logged-in Customer */}
          {token && availablePoints >= 10 && (
            <div className="bg-white border border-emerald-200 rounded-xl p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <h3 className="font-bold text-sm text-[#1E293B]">Ưu Đãi Điểm Thưởng Tích Lũy</h3>
                </div>
                <span className="text-xs text-[#2D5A27] font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Số dư: {availablePoints} điểm
                </span>
              </div>

              {/* OPT-IN CHECKBOX: UNCHECKED BY DEFAULT */}
              <label className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-emerald-50/30 transition-colors">
                <input
                  type="checkbox"
                  checked={usePoints}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setUsePoints(checked);
                    if (checked && pointsToUse === 0) {
                      setPointsToUse(Math.min(maxRedeemablePoints, 10));
                    }
                  }}
                  className="w-4 h-4 text-[#2D5A27] rounded focus:ring-[#2D5A27]"
                />
                <div className="text-sm font-medium text-slate-800">
                  Sử dụng điểm tích lũy để giảm giá cho đơn hàng này
                </div>
              </label>

              {usePoints && (
                <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-700">
                    <span>Chọn số điểm muốn đổi (10 điểm = 1.000đ):</span>
                    <span className="font-bold text-[#2D5A27]">
                      Dùng {pointsToUse} điểm (-{(pointsToUse * 100).toLocaleString('vi-VN')}đ)
                    </span>
                  </div>

                  <input
                    type="range"
                    min="10"
                    max={maxRedeemablePoints}
                    step="10"
                    value={pointsToUse}
                    onChange={(e) => setPointsToUse(Number(e.target.value))}
                    className="w-full accent-[#2D5A27] cursor-pointer"
                  />

                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>10 điểm (1.000đ)</span>
                    <span>Tối đa {maxRedeemablePoints} điểm ({(maxRedeemablePoints * 100).toLocaleString('vi-VN')}đ)</span>
                  </div>
                </div>
              )}
            </div>
          )}

          <PaymentMethodSelector
            selectedMethod={paymentMethod}
            onChange={setPaymentMethod}
            goldBalance={customer?.goldBalance || profile?.goldBalance || 0}
            totalAmountGold={Math.ceil(Math.max(0, subtotal + getShippingFee() - pointsDiscountAmount) / 1000)}
          />
        </div>

        <div className="lg:col-span-1">
          <OrderSummaryWidget
            onConfirmOrder={handleConfirmOrder}
            isSubmitting={isSubmitting}
            pointsDiscountAmount={pointsDiscountAmount}
          />
        </div>
      </div>
    </div>
  );
}

