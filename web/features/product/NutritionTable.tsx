'use client';

import React from 'react';
import { Product } from '@/lib/mock-data';

interface NutritionTableProps {
  product: Product;
}

export const NutritionTable: React.FC<NutritionTableProps> = ({ product }) => {
  const { nutritionInfo } = product;

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 space-y-4">
      <h3 className="font-bold text-lg text-[#1E293B] border-b border-[#E2E8F0] pb-3">
        Bảng Giá Trị Dinh Dưỡng Dưỡng Sinh
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-[#F9F6F0] text-[#1E293B]">
              <th className="p-3 rounded-l-lg font-semibold">Thành Phần Dinh Dưỡng</th>
              <th className="p-3 rounded-r-lg font-semibold text-right">Hàm Lượng (trên 100g)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0] text-[#64748B]">
            <tr>
              <td className="p-3 font-medium text-[#1E293B]">Năng lượng (Calories)</td>
              <td className="p-3 text-right font-mono font-semibold text-[#2D5A27]">{nutritionInfo.calories}</td>
            </tr>
            <tr>
              <td className="p-3 font-medium text-[#1E293B]">Chất đạm (Protein)</td>
              <td className="p-3 text-right font-mono">{nutritionInfo.protein}</td>
            </tr>
            <tr>
              <td className="p-3 font-medium text-[#1E293B]">Tinh bột (Carbohydrates)</td>
              <td className="p-3 text-right font-mono">{nutritionInfo.carbs}</td>
            </tr>
            <tr>
              <td className="p-3 font-medium text-[#1E293B]">Chất xơ tự nhiên (Dietary Fiber)</td>
              <td className="p-3 text-right font-mono font-semibold text-[#2D5A27]">{nutritionInfo.fiber}</td>
            </tr>
            <tr>
              <td className="p-3 font-medium text-[#1E293B]">Chất béo (Fat)</td>
              <td className="p-3 text-right font-mono">{nutritionInfo.fat}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="text-xs text-[#64748B] pt-2">
        * Thành phần: <strong>{product.ingredients}</strong>. Đã qua kiểm định tiêu chuẩn chất lượng an toàn thực phẩm.
      </div>
    </div>
  );
};
