import React from 'react';

export const NewArrivalsHeader: React.FC = () => {
  return (
    <div className="bg-[#2D5A27] text-white rounded-2xl p-8 mb-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
      <div className="space-y-2 max-w-xl">
        <span className="bg-[#C86D51] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Tuyển Chọn Tháng Này
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-display leading-tight">
          Sản Phẩm Mới Về Thu Hoạch Tự Nhiên
        </h1>
        <p className="text-sm text-emerald-100">
          Danh mục sản phẩm nông sản lúa mùa mới nhất, hạt dẻo thơm nguyên cám được thu hoạch và hạ thổ đóng gói trong vòng 30 ngày qua.
        </p>
      </div>
      <div className="text-[#F9F6F0] bg-white/10 backdrop-blur-xs border border-white/20 p-4 rounded-xl text-center shrink-0">
        <span className="text-2xl font-bold font-mono block">30 Ngày</span>
        <span className="text-xs text-emerald-200">Đảm bảo tươi mới nhất</span>
      </div>
    </div>
  );
};
