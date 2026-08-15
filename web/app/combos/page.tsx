'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Sparkles, CheckCircle2, Flame, HeartPulse, Scale, Dumbbell, Briefcase, Users, ArrowRight, Calendar } from 'lucide-react';
import { useCombos } from '@/lib/api/hooks';
import { useCartStore } from '@/stores/cart-store';
import { useToast } from '@/components/ui/ToastProvider';
import { Combo } from '@/lib/mock-data';

export default function CombosPage() {
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { data: combos, isLoading } = useCombos(selectedType === 'ALL' ? undefined : selectedType, searchQuery);
  const addItemToCart = useCartStore((s) => s.addItem);
  const { showToast } = useToast();

  const handleAddComboToCart = (combo: Combo, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Add each item in the combo to cart
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

    showToast(`Đã thêm toàn bộ gói "${combo.name}" vào giỏ hàng!`, 'success');
  };

  const getComboTypeBadge = (type: string) => {
    switch (type) {
      case 'WEIGHT_LOSS':
        return { label: 'Giảm Cân & Siết Mỡ', icon: Scale, bg: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
      case 'WEIGHT_GAIN':
        return { label: 'Tăng Cân High-Protein', icon: Dumbbell, bg: 'bg-amber-100 text-amber-800 border-amber-200' };
      case 'HEALTH':
        return { label: 'Sức Khỏe Trẻ Hóa', icon: HeartPulse, bg: 'bg-rose-100 text-rose-800 border-rose-200' };
      case 'OFFICE':
        return { label: 'Văn Phòng Nhanh Gọn', icon: Briefcase, bg: 'bg-blue-100 text-blue-800 border-blue-200' };
      case 'FAMILY':
        return { label: 'Gia Đình Bếp Xanh', icon: Users, bg: 'bg-purple-100 text-purple-800 border-purple-200' };
      default:
        return { label: 'Combo Dinh Dưỡng', icon: Sparkles, bg: 'bg-gray-100 text-gray-800 border-gray-200' };
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF6] pb-16">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#EBF3E8] via-[#F4F8F3] to-[#F8FAF6] pt-12 pb-16 border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2D5A27]/10 text-[#2D5A27] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4 text-[#C86D51]" />
            <span>Giải Pháp Ăn Chay Theo Mục Tiêu Sức Khỏe</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#1E293B] tracking-tight mb-4">
            Combo Thực Phẩm Ăn Chay <br className="hidden sm:inline" />
            <span className="text-[#2D5A27]">Chuẩn Dinh Dưỡng & Đóng Gói Tiết Kiệm</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#64748B] mb-8 leading-relaxed">
            Mỗi gói Combo được nghiên cứu kỹ lưỡng bởi chuyên gia dinh dưỡng thực dưỡng, đáp ứng đúng mục tiêu cá nhân (Giảm cân, Tăng cơ, Ngủ ngon, Văn phòng) kèm thực đơn 7 ngày tích hợp trực tiếp vào Todo cá nhân.
          </p>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
            <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-[#E2E8F0] flex items-start gap-3 shadow-xs">
              <div className="p-2 bg-[#2D5A27]/10 text-[#2D5A27] rounded-xl shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1E293B]">Tiết Kiệm Đội Giá 15-18%</h4>
                <p className="text-[11px] text-[#64748B] mt-0.5">Rẻ hơn đáng kể so với việc chọn mua riêng lẻ từng món.</p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-[#E2E8F0] flex items-start gap-3 shadow-xs">
              <div className="p-2 bg-[#C86D51]/10 text-[#C86D51] rounded-xl shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1E293B]">Thực Đơn 7 Ngày Khớp Todo</h4>
                <p className="text-[11px] text-[#64748B] mt-0.5">Thêm checklist nhắc nhở lịch ăn uống 1-Click vào Todo.</p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-[#E2E8F0] flex items-start gap-3 shadow-xs">
              <div className="p-2 bg-amber-500/10 text-amber-600 rounded-xl shrink-0">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1E293B]">Đảm Bảo Calo & Macro</h4>
                <p className="text-[11px] text-[#64748B] mt-0.5">Cân bằng Protein, Carb phức hợp và Chất béo tốt.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Filter Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[#E2E8F0]">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { key: 'ALL', label: 'Tất Cả Combo', icon: Sparkles },
              { key: 'WEIGHT_LOSS', label: 'Giảm Cân & Siết Mỡ', icon: Scale },
              { key: 'WEIGHT_GAIN', label: 'Tăng Cân High-Protein', icon: Dumbbell },
              { key: 'HEALTH', label: 'Sức Khỏe & Trẻ Hóa', icon: HeartPulse },
              { key: 'OFFICE', label: 'Văn Phòng Nhanh', icon: Briefcase },
              { key: 'FAMILY', label: 'Gia Đình Bếp Xanh', icon: Users },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = selectedType === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setSelectedType(tab.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    active
                      ? 'bg-[#2D5A27] text-white shadow-md shadow-[#2D5A27]/20 scale-105'
                      : 'bg-white text-[#64748B] hover:bg-[#EBF3E8] hover:text-[#2D5A27] border border-[#E2E8F0]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="w-full sm:w-auto">
            <input
              type="text"
              placeholder="Tìm tên combo thực phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 bg-white border border-[#E2E8F0] rounded-xl px-3.5 py-2 text-xs text-[#1E293B] focus:outline-none focus:border-[#2D5A27] focus:ring-1 focus:ring-[#2D5A27]"
            />
          </div>
        </div>

        {/* Combo Cards Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 bg-white rounded-3xl animate-pulse border border-[#E2E8F0]" />
            ))}
          </div>
        ) : combos && combos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {combos.map((combo: Combo) => {
              const badgeInfo = getComboTypeBadge(combo.comboType);
              const BadgeIcon = badgeInfo.icon;

              return (
                <div
                  key={combo.id}
                  className="group bg-white rounded-3xl border border-[#E2E8F0] hover:border-[#2D5A27]/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
                >
                  {/* Image Container */}
                  <div className="relative h-52 w-full overflow-hidden bg-gray-100">
                    <Image
                      src={combo.bannerUrl}
                      alt={combo.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-xs shadow-xs ${badgeInfo.bg}`}>
                        <BadgeIcon className="w-3.5 h-3.5" />
                        <span>{badgeInfo.label}</span>
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 bg-[#C86D51] text-white text-xs font-bold rounded-full shadow-md">
                        Tiết kiệm {combo.savingsAmount.toLocaleString('vi-VN')}đ
                      </span>
                    </div>

                    {/* Bottom Title on Image */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h3 className="text-lg font-bold font-display line-clamp-1 group-hover:text-[#EBF3E8] transition-colors">
                        {combo.name}
                      </h3>
                      <p className="text-xs text-gray-200 line-clamp-1">{combo.items.length} món thực phẩm thành phần</p>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed mb-4">
                        {combo.shortDescription}
                      </p>

                      {/* Items Component Checklist */}
                      <div className="bg-[#F8FAF6] p-3 rounded-2xl border border-[#E2E8F0] mb-4 space-y-1.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#2D5A27] block mb-1">
                          Thành phần bộ Combo:
                        </span>
                        {combo.items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs text-[#1E293B]">
                            <span className="line-clamp-1 text-[#334155] font-medium">• {item.productName || 'Sản phẩm dinh dưỡng'}</span>
                            <span className="font-bold text-[#2D5A27] shrink-0">x{item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pricing & CTA */}
                    <div className="pt-3 border-t border-[#E2E8F0]">
                      <div className="flex items-baseline justify-between mb-4">
                        <div>
                          <span className="text-xs text-gray-400 line-through mr-2">
                            {combo.originalPrice.toLocaleString('vi-VN')}đ
                          </span>
                          <span className="text-xl font-black text-[#2D5A27] font-display">
                            {combo.comboPrice.toLocaleString('vi-VN')}đ
                          </span>
                        </div>
                        <span className="text-[11px] font-semibold text-[#C86D51] bg-[#C86D51]/10 px-2 py-0.5 rounded-md">
                          Giao COD toàn quốc
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href={`/combos/${combo.slug}`}
                          className="flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl border border-[#2D5A27] text-[#2D5A27] hover:bg-[#EBF3E8] text-xs font-bold transition-all"
                        >
                          <span>Thực Đơn 7 Ngày</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          onClick={(e) => handleAddComboToCart(combo, e)}
                          className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#2D5A27] hover:bg-[#23461E] text-white text-xs font-bold transition-all shadow-md shadow-[#2D5A27]/20 cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Thêm Vào Giỏ</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E2E8F0] my-8">
            <Sparkles className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#1E293B]">Không tìm thấy Combo phù hợp</h3>
            <p className="text-xs text-[#64748B] mt-1">Thử chọn mục tiêu khác hoặc tìm kiếm từ khóa khác.</p>
          </div>
        )}
      </div>
    </div>
  );
}
