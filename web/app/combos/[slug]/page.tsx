'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import {
  ShoppingBag,
  Calendar,
  Sparkles,
  CheckCircle2,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Plus,
  Flame,
  Scale,
  HeartPulse,
  Dumbbell,
  Briefcase,
  Users,
} from 'lucide-react';
import { useComboDetail } from '@/lib/api/hooks';
import { useCartStore } from '@/stores/cart-store';
import { useTodoStore } from '@/stores/todo-store';
import { useToast } from '@/components/ui/ToastProvider';

export default function ComboDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const { data: combo, isLoading } = useComboDetail(slug);

  const addItemToCart = useCartStore((s) => s.addItem);
  const addTodo = useTodoStore((s) => s.addTodo);
  const { showToast } = useToast();

  const [activeDay, setActiveDay] = useState<number>(1);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAF6] p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#2D5A27]" />
      </div>
    );
  }

  if (!combo) {
    return (
      <div className="min-h-screen bg-[#F8FAF6] p-12 text-center">
        <h2 className="text-xl font-bold text-[#1E293B]">Không tìm thấy gói Combo</h2>
        <Link href="/combos" className="mt-4 inline-block text-xs font-bold text-[#2D5A27] underline">
          Quay lại danh sách Combo
        </Link>
      </div>
    );
  }

  const handleAddEntireComboToCart = () => {
    combo.items.forEach((item) => {
      addItemToCart(
        {
          id: item.productId,
          name: item.productName || combo.name,
          price: item.unitPrice,
          weightUnit: '1 túi',
          image: item.productImage || combo.bannerUrl,
          slug: item.productSlug || combo.slug,
        },
        item.quantity,
      );
    });

    showToast(`Đã thêm toàn bộ ${combo.items.length} món trong "${combo.name}" vào Giỏ Hàng!`, 'success');
  };

  const handleImportMealPlanToTodo = () => {
    if (!combo.mealPlanJson || combo.mealPlanJson.length === 0) {
      showToast('Gói Combo này chưa có lịch trình thực đơn mẫu 7 ngày.', 'info');
      return;
    }

    const today = new Date();

    combo.mealPlanJson.forEach((dayPlan, index) => {
      const targetDate = new Date(today);
      targetDate.setDate(today.getDate() + index);
      const dateStr = targetDate.toISOString().split('T')[0];

      dayPlan.tasks.forEach((taskText) => {
        addTodo(`[${combo.name} - Ngày ${dayPlan.day}] ${taskText}`, dateStr, `Thực đơn mẫu trong bộ ${combo.name}`);
      });
    });

    showToast(`Đã nạp toàn bộ Thực đơn 7 ngày của "${combo.name}" vào trang Todo của bạn!`, 'success');
    router.push('/todo');
  };

  return (
    <div className="min-h-screen bg-[#F8FAF6] pb-20">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-[#E2E8F0] py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs text-[#64748B]">
          <Link href="/" className="hover:text-[#2D5A27]">Trang chủ</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/combos" className="hover:text-[#2D5A27]">Combo Thực Phẩm Chay</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#1E293B] font-bold line-clamp-1">{combo.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Top Overview Section */}
        <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          {/* Left Banner Image */}
          <div className="lg:col-span-5 relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden bg-gray-100 border border-[#E2E8F0]">
            <Image
              src={combo.bannerUrl}
              alt={combo.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-[#2D5A27] text-white text-xs font-bold rounded-full shadow-md">
                Tiết kiệm {combo.savingsAmount.toLocaleString('vi-VN')}đ
              </span>
            </div>
          </div>

          {/* Right Information */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2D5A27]/10 text-[#2D5A27] text-xs font-bold mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#C86D51]" />
                <span>Combo Dinh Dưỡng Đóng Gói</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#1E293B] mb-3">
                {combo.name}
              </h1>

              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed mb-6">
                {combo.fullDescription}
              </p>

              {/* Price Block */}
              <div className="bg-[#F8FAF6] p-4 rounded-2xl border border-[#E2E8F0] mb-6 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-[#64748B] block mb-0.5">Giá Combo ưu đãi:</span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl sm:text-3xl font-black font-display text-[#2D5A27]">
                      {combo.comboPrice.toLocaleString('vi-VN')}đ
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      {combo.originalPrice.toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                </div>

                <span className="px-3 py-1 bg-[#C86D51]/15 text-[#C86D51] text-xs font-bold rounded-xl border border-[#C86D51]/20">
                  Tiết kiệm {Math.round((combo.savingsAmount / combo.originalPrice) * 100)}%
                </span>
              </div>

              {/* Quick Trust Badges */}
              <div className="grid grid-cols-3 gap-3 mb-6 text-center">
                <div className="p-2.5 bg-gray-50 rounded-xl border border-[#E2E8F0]">
                  <Truck className="w-4 h-4 text-[#2D5A27] mx-auto mb-1" />
                  <span className="text-[11px] font-semibold text-[#1E293B] block">Freeship từ 300k</span>
                </div>
                <div className="p-2.5 bg-gray-50 rounded-xl border border-[#E2E8F0]">
                  <ShieldCheck className="w-4 h-4 text-[#2D5A27] mx-auto mb-1" />
                  <span className="text-[11px] font-semibold text-[#1E293B] block">100% Thực vật sạch</span>
                </div>
                <div className="p-2.5 bg-gray-50 rounded-xl border border-[#E2E8F0]">
                  <RotateCcw className="w-4 h-4 text-[#2D5A27] mx-auto mb-1" />
                  <span className="text-[11px] font-semibold text-[#1E293B] block">Đổi trả 7 ngày</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[#E2E8F0]">
              <button
                onClick={handleImportMealPlanToTodo}
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-[#EBF3E8] hover:bg-[#DCEAD6] text-[#2D5A27] border border-[#2D5A27]/30 text-xs sm:text-sm font-bold transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Thêm Thực Đơn 7 Ngày Vào Todo</span>
              </button>

              <button
                onClick={handleAddEntireComboToCart}
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-[#2D5A27] hover:bg-[#23461E] text-white text-xs sm:text-sm font-bold shadow-lg shadow-[#2D5A27]/25 transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Thêm Combo Vào Giỏ hàng</span>
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: Product Components inside Combo */}
        <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-sm mb-10">
          <h2 className="text-xl font-bold font-display text-[#1E293B] mb-2">
            Danh Sách Món Trong Gói Combo ({combo.items.length} món)
          </h2>
          <p className="text-xs text-[#64748B] mb-6">
            Toàn bộ sản phẩm đều được kiểm định nguồn gốc xuất xứ hữu cơ, đóng gói chân không giữ trọn vị tươi ngon.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {combo.items.map((item, idx) => (
              <div key={idx} className="bg-[#F8FAF6] p-4 rounded-2xl border border-[#E2E8F0] flex items-center gap-3">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white shrink-0 border border-[#E2E8F0]">
                  <Image
                    src={item.productImage || combo.bannerUrl}
                    alt={item.productName || 'Sản phẩm'}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-[#1E293B] line-clamp-2">
                    {item.productName || 'Sản phẩm dinh dưỡng'}
                  </h4>
                  <div className="flex items-center justify-between mt-1 text-[11px]">
                    <span className="text-[#64748B]">Số lượng: <b className="text-[#2D5A27]">x{item.quantity}</b></span>
                    <span className="font-bold text-[#2D5A27]">{item.unitPrice.toLocaleString('vi-VN')}đ</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: 7-Day Meal Plan Integration */}
        {combo.mealPlanJson && combo.mealPlanJson.length > 0 && (
          <div className="bg-gradient-to-br from-white to-[#F4F8F3] rounded-3xl border border-[#2D5A27]/20 p-6 sm:p-8 shadow-md mb-10">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2D5A27] text-white text-xs font-bold mb-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Tích Hợp Daily Personal Todo</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-display text-[#1E293B]">
                  Lịch Trình Thực Đơn Chay 7 Ngày Mẫu
                </h2>
              </div>

              <button
                onClick={handleImportMealPlanToTodo}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2D5A27] text-white text-xs font-bold hover:bg-[#23461E] shadow-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Nạp Thực Đơn Này Vào Todo Cá Nhân</span>
              </button>
            </div>

            {/* Days Tabs */}
            <div className="flex overflow-x-auto gap-2 pb-3 mb-6 scrollbar-none">
              {combo.mealPlanJson.map((plan) => (
                <button
                  key={plan.day}
                  onClick={() => setActiveDay(plan.day)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                    activeDay === plan.day
                      ? 'bg-[#2D5A27] text-white shadow-md'
                      : 'bg-white text-[#64748B] hover:bg-[#EBF3E8] border border-[#E2E8F0]'
                  }`}
                >
                  Ngày {plan.day}
                </button>
              ))}
            </div>

            {/* Active Day Content */}
            {combo.mealPlanJson.map(
              (plan) =>
                plan.day === activeDay && (
                  <div key={plan.day} className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-xs">
                    <h3 className="text-base font-bold text-[#2D5A27] mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>{plan.title}</span>
                    </h3>

                    <div className="space-y-3">
                      {plan.tasks.map((task, tidx) => (
                        <div key={tidx} className="flex items-start gap-3 p-3 bg-[#F8FAF6] rounded-xl border border-[#E2E8F0]">
                          <span className="w-2 h-2 rounded-full bg-[#2D5A27] mt-1.5 shrink-0" />
                          <span className="text-xs sm:text-sm text-[#1E293B] font-medium">{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ),
            )}
          </div>
        )}
      </div>
    </div>
  );
}
