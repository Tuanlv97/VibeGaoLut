import React from 'react';
import Link from 'next/link';
import { Leaf, ShieldCheck, Truck, RefreshCw, PhoneCall } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1E293B] text-white border-t border-[#334155] pt-12 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pb-10 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#2D5A27] rounded-xl text-white">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">100% Nông Sản Tự Nhiên</h4>
              <p className="text-xs text-slate-400">Gạo lứt, ngũ cốc tuyển chọn</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#2D5A27] rounded-xl text-white">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Freeship Đơn Từ 300k</h4>
              <p className="text-xs text-slate-400">Giao hàng toàn quốc COD</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#2D5A27] rounded-xl text-white">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Guest Checkout Tiện Lợi</h4>
              <p className="text-xs text-slate-400">Không cần đăng ký tài khoản</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#2D5A27] rounded-xl text-white">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Đổi Trả Trong 7 Ngày</h4>
              <p className="text-xs text-slate-400">Cam kết chất lượng thực phẩm</p>
            </div>
          </div>
        </div>

        {/* Footer Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-2xl font-bold font-display text-white">
              <div className="p-1.5 bg-[#2D5A27] rounded-lg">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span>GreenPantry</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Nền tảng thực phẩm dưỡng sinh, ngũ cốc & trà thảo mộc thiên nhiên hàng đầu. Đồng hành cùng lối sống lành mạnh của bạn mỗi ngày.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-200 mb-4">
              Khám Phá
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  Tất cả sản phẩm
                </Link>
              </li>
              <li>
                <Link href="/new-products" className="hover:text-white transition-colors">
                  Sản phẩm mới về
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog dinh dưỡng
                </Link>
              </li>
              <li>
                <Link href="/todo" className="hover:text-white transition-colors">
                  Nhật ký Todo thói quen
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-200 mb-4">
              Hỗ Trợ Khách Hàng
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/orders/track" className="hover:text-white transition-colors font-medium text-emerald-400">
                  Tra cứu đơn hàng Guest
                </Link>
              </li>
              <li>
                <Link href="/questions" className="hover:text-white transition-colors">
                  Hỏi đáp Q&A cùng chuyên gia
                </Link>
              </li>
              <li>Chính sách vận chuyển & COD</li>
              <li>Hướng dẫn bảo quản thực phẩm</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-200 mb-4">
              Liên Hệ Hotline
            </h4>
            <div className="flex items-center gap-2 text-lg font-bold text-emerald-400 mb-2">
              <PhoneCall className="w-5 h-5" />
              <span>1900 8822</span>
            </div>
            <p className="text-xs text-slate-400">
              Email: hotro@greenpantry.vn
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Thời gian làm việc: 8:00 - 20:00 (T2 - CN)
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-700 pt-6 text-center text-xs text-slate-500">
          <p>© 2026 GreenPantry. Tất cả quyền được bảo lưu. Nền tảng E-commerce & Dinh dưỡng dưỡng sinh.</p>
        </div>
      </div>
    </footer>
  );
};
