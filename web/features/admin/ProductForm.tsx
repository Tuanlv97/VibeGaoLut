'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';

export interface ProductFormInitialData {
  id?: string;
  categoryId: string;
  name: string;
  slug?: string;
  price: number;
  compareAtPrice?: number | null;
  stockQuantity: number;
  weightUnit: string;
  origin: string;
  ingredients: string;
  nutritionInfo: string;
  description: string;
  isFeaturedNew?: boolean;
  images?: string[];
}

export function ProductForm({
  initialData,
  onSubmit,
  isLoading = false,
}: {
  initialData?: ProductFormInitialData;
  onSubmit: (data: any) => Promise<void>;
  isLoading?: boolean;
}) {
  const router = useRouter();

  const [categoryId, setCategoryId] = useState(initialData?.categoryId || 'cat-1');
  const [name, setName] = useState(initialData?.name || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [price, setPrice] = useState(initialData?.price || 120000);
  const [compareAtPrice, setCompareAtPrice] = useState(initialData?.compareAtPrice || 150000);
  const [stockQuantity, setStockQuantity] = useState(initialData?.stockQuantity || 50);
  const [weightUnit, setWeightUnit] = useState(initialData?.weightUnit || '1kg');
  const [origin, setOrigin] = useState(initialData?.origin || 'Sóc Trăng, Việt Nam');
  const [ingredients, setIngredients] = useState(initialData?.ingredients || '100% Gạo lứt đỏ ST25 nguyên cám');
  const [nutritionInfo, setNutritionInfo] = useState(
    initialData?.nutritionInfo || 'Calories: 350kcal, Carbs: 76g, Protein: 7.5g, Fiber: 3.4g',
  );
  const [description, setDescription] = useState(
    initialData?.description || 'Gạo lứt đỏ nguyên cám ST25 dẻo ngon, giàu dinh dưỡng cho bữa ăn sức khỏe.',
  );
  const [isFeaturedNew, setIsFeaturedNew] = useState(initialData?.isFeaturedNew || false);
  const [imageUrl, setImageUrl] = useState(
    initialData?.images?.[0] ||
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=600&auto=format&fit=crop',
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      categoryId,
      name,
      slug: slug || undefined,
      price: Number(price),
      compareAtPrice: Number(compareAtPrice) || null,
      stockQuantity: Number(stockQuantity),
      weightUnit,
      origin,
      ingredients,
      nutritionInfo,
      description,
      isFeaturedNew,
      images: [imageUrl],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Info */}
        <div className="space-y-5">
          <h3 className="text-base font-bold text-slate-800 border-b pb-2">Thông Tin Cơ Bản</h3>

          <Input
            label="Tên Sản Phẩm *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="vd: Gạo Lứt Đỏ ST25 GreenPantry 1kg"
            required
          />

          <Input
            label="URL Slug (để trống tự động tạo)"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="gao-lut-do-st25-1kg"
          />

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
              Danh Mục Sản Phẩm *
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="cat-1">Gạo & Ngũ Cốc</option>
              <option value="cat-2">Các Loại Hạt Dry Fruits</option>
              <option value="cat-3">Trà & Detox Dưỡng Sinh</option>
              <option value="cat-4">Đậu & Bột Nguyên Chất</option>
              <option value="cat-5">Thực Phẩm Chay Tự Nhiên</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Giá Bán (VND) *"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
            />
            <Input
              label="Giá Gốc So Sánh (VND)"
              type="number"
              value={compareAtPrice || ''}
              onChange={(e) => setCompareAtPrice(Number(e.target.value))}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Tồn Kho *"
              type="number"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(Number(e.target.value))}
              required
            />
            <Input
              label="Quy Cách / Trọng Lượng *"
              value={weightUnit}
              onChange={(e) => setWeightUnit(e.target.value)}
              placeholder="1kg, 500g..."
              required
            />
          </div>
        </div>

        {/* Specs & Flags */}
        <div className="space-y-5">
          <h3 className="text-base font-bold text-slate-800 border-b pb-2">Chi Tiết & Hình Ảnh</h3>

          <Input
            label="Xuất Xứ *"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="Nông trại Sóc Trăng, Việt Nam"
            required
          />

          <Textarea
            label="Thành Phần *"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="100% hạt gạo nguyên cám..."
            rows={2}
          />

          <Textarea
            label="Thông Tin Dinh Dưỡng *"
            value={nutritionInfo}
            onChange={(e) => setNutritionInfo(e.target.value)}
            placeholder="Calories: 350kcal..."
            rows={2}
          />

          <Input
            label="Link Ảnh Sản Phẩm *"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://..."
            required
          />

          <div className="pt-2">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isFeaturedNew}
                onChange={(e) => setIsFeaturedNew(e.target.checked)}
                className="w-5 h-5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
              />
              <span className="text-sm font-semibold text-slate-800">
                ⭐ Sản Phẩm Mới (Bật cờ Hybrid Rule: Gim nổi bật trang Sản Phẩm Mới)
              </span>
            </label>
          </div>
        </div>
      </div>

      <Textarea
        label="Mô Tả Sản Phẩm *"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        required
      />

      <div className="flex items-center justify-end space-x-4 pt-6 border-t border-slate-100">
        <Button variant="outline" onClick={() => router.back()} type="button" disabled={isLoading}>
          Hủy Bỏ
        </Button>
        <Button variant="primary" type="submit" disabled={isLoading} className="bg-emerald-600 hover:bg-emerald-700">
          {isLoading ? 'Đang Lưu...' : 'Lưu Sản Phẩm'}
        </Button>
      </div>
    </form>
  );
}
