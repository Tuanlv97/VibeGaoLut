'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { uploadMedia } from '@/lib/api/client';
import { useCategories } from '@/lib/api/hooks';

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
  const { data: categories = [] } = useCategories();

  const isEditMode = Boolean(initialData);

  const [categoryId, setCategoryId] = useState(
    initialData?.categoryId || (categories.length > 0 ? categories[0].id : 'cat_gao_ngu_coc'),
  );
  const [name, setName] = useState(initialData?.name || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [price, setPrice] = useState<number | ''>(initialData?.price ?? '');
  const [compareAtPrice, setCompareAtPrice] = useState<number | ''>(initialData?.compareAtPrice ?? '');
  const [stockQuantity, setStockQuantity] = useState<number | ''>(initialData?.stockQuantity ?? '');
  const [weightUnit, setWeightUnit] = useState(initialData?.weightUnit || '');
  const [origin, setOrigin] = useState(initialData?.origin || '');
  const [ingredients, setIngredients] = useState(initialData?.ingredients || '');
  const [nutritionInfo, setNutritionInfo] = useState(initialData?.nutritionInfo || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [isFeaturedNew, setIsFeaturedNew] = useState(initialData?.isFeaturedNew || false);
  const [imageUrl, setImageUrl] = useState(initialData?.images?.[0] || '');

  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Vui lòng nhập tên sản phẩm';
    if (price === '' || Number(price) <= 0) newErrors.price = 'Giá bán phải lớn hơn 0đ';
    if (stockQuantity === '' || Number(stockQuantity) < 0) newErrors.stockQuantity = 'Vui lòng nhập số lượng tồn kho (không được âm)';
    if (!weightUnit.trim()) newErrors.weightUnit = 'Vui lòng nhập quy cách / trọng lượng';
    if (!origin.trim()) newErrors.origin = 'Vui lòng nhập xuất xứ';
    if (!ingredients.trim()) newErrors.ingredients = 'Vui lòng nhập thành phần sản phẩm';
    if (!nutritionInfo.trim()) newErrors.nutritionInfo = 'Vui lòng nhập thông tin dinh dưỡng';
    if (!imageUrl.trim()) newErrors.imageUrl = 'Vui lòng tải ảnh từ máy tính hoặc dán link URL ảnh';
    if (!description.trim()) newErrors.description = 'Vui lòng nhập mô tả chi tiết sản phẩm';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);
    try {
      const res = await uploadMedia(file);
      setImageUrl(res.url);
      setErrors((prev) => ({ ...prev, imageUrl: '' }));
    } catch (err: any) {
      let msg = err?.message || 'Upload ảnh lên Cloudinary thất bại';
      if (typeof msg !== 'string') {
        msg = JSON.stringify(msg);
      }
      if (msg.includes('Failed to fetch') || msg.includes('NetworkError')) {
        msg = 'Không thể kết nối đến Backend API (http://localhost:4000). Vui lòng đảm bảo Backend đã chạy (lệnh "npm run start:dev" trong thư mục api).';
      }
      setUploadError(msg);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    await onSubmit({
      categoryId: categoryId || (categories.length > 0 ? categories[0].id : 'cat_gao_ngu_coc'),
      name,
      slug: slug || undefined,
      price: Number(price),
      compareAtPrice: compareAtPrice !== '' ? Number(compareAtPrice) : null,
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
            label="Tên Sản Phẩm"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
            }}
            placeholder="vd: Gạo Lứt Đỏ ST25 GreenPantry 1kg"
            required
            error={errors.name}
          />

          <Input
            label="URL Slug (để trống tự động tạo)"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="gao-lut-do-st25-1kg"
          />

          <div>
            <label className="block text-sm font-medium text-[#1E293B] mb-1.5">
              Danh Mục Sản Phẩm <span className="text-red-500 font-bold ml-1">*</span>
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {categories.length > 0 ? (
                categories.map((c: any) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))
              ) : (
                <>
                  <option value="cat_gao_ngu_coc">Gạo & Ngũ Cốc</option>
                  <option value="cat_tra_herbal">Trà Herbal</option>
                  <option value="cat_dau_bot">Đậu & Bột</option>
                  <option value="cat_healthy_snacks">Healthy Snacks</option>
                </>
              )}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Giá Bán (VND)"
              type="number"
              value={price}
              onChange={(e) => {
                const val = e.target.value;
                setPrice(val === '' ? '' : Number(val));
                if (errors.price) setErrors((prev) => ({ ...prev, price: '' }));
              }}
              placeholder="120000"
              required
              error={errors.price}
            />
            <Input
              label="Giá Gốc So Sánh (VND)"
              type="number"
              value={compareAtPrice}
              onChange={(e) => {
                const val = e.target.value;
                setCompareAtPrice(val === '' ? '' : Number(val));
              }}
              placeholder="150000"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Tồn Kho"
              type="number"
              value={stockQuantity}
              onChange={(e) => {
                const val = e.target.value;
                setStockQuantity(val === '' ? '' : Number(val));
                if (errors.stockQuantity) setErrors((prev) => ({ ...prev, stockQuantity: '' }));
              }}
              placeholder="50"
              required
              error={errors.stockQuantity}
            />
            <Input
              label="Quy Cách / Trọng Lượng"
              value={weightUnit}
              onChange={(e) => {
                setWeightUnit(e.target.value);
                if (errors.weightUnit) setErrors((prev) => ({ ...prev, weightUnit: '' }));
              }}
              placeholder="1kg, 500g..."
              required
              error={errors.weightUnit}
            />
          </div>
        </div>

        {/* Specs & Flags */}
        <div className="space-y-5">
          <h3 className="text-base font-bold text-slate-800 border-b pb-2">Chi Tiết & Hình Ảnh</h3>

          <Input
            label="Xuất Xứ"
            value={origin}
            onChange={(e) => {
              setOrigin(e.target.value);
              if (errors.origin) setErrors((prev) => ({ ...prev, origin: '' }));
            }}
            placeholder="Nông trại Sóc Trăng, Việt Nam"
            required
            error={errors.origin}
          />

          <Textarea
            label="Thành Phần"
            value={ingredients}
            onChange={(e) => {
              setIngredients(e.target.value);
              if (errors.ingredients) setErrors((prev) => ({ ...prev, ingredients: '' }));
            }}
            placeholder="100% hạt gạo nguyên cám..."
            rows={2}
            required
            error={errors.ingredients}
          />

          <Textarea
            label="Thông Tin Dinh Dưỡng"
            value={nutritionInfo}
            onChange={(e) => {
              setNutritionInfo(e.target.value);
              if (errors.nutritionInfo) setErrors((prev) => ({ ...prev, nutritionInfo: '' }));
            }}
            placeholder="Calories: 350kcal..."
            rows={2}
            required
            error={errors.nutritionInfo}
          />

          <div>
            <label className="block text-sm font-medium text-[#1E293B] mb-1.5">
              Hình Ảnh Sản Phẩm <span className="text-red-500 font-bold ml-1">*</span>
            </label>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <label className="cursor-pointer bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 font-semibold px-4 py-2.5 rounded-xl text-sm transition inline-flex items-center space-x-2">
                  <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <span>{isUploading ? 'Đang Tải Lên Cloudinary...' : 'Tải Ảnh Từ Máy Tính'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={isUploading}
                    className="hidden"
                  />
                </label>
                {isUploading && (
                  <span className="text-xs font-medium text-amber-600 animate-pulse">
                    ⏳ Đang xử lý...
                  </span>
                )}
              </div>

              {uploadError && (
                <div className="text-xs font-medium text-rose-700 bg-rose-50 p-3 rounded-xl border border-rose-200">
                  ❌ {uploadError}
                </div>
              )}

              <Input
                label="URL Ảnh (Tự động điền khi upload)"
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  if (errors.imageUrl) setErrors((prev) => ({ ...prev, imageUrl: '' }));
                }}
                placeholder="https://res.cloudinary.com/..."
                required
                error={errors.imageUrl}
              />

              {imageUrl ? (
                <div className="mt-2 relative w-24 h-24 rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1 right-1 bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
                    CDN
                  </div>
                </div>
              ) : null}
            </div>
          </div>

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
        label="Mô Tả Sản Phẩm"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          if (errors.description) setErrors((prev) => ({ ...prev, description: '' }));
        }}
        placeholder="Mô tả chi tiết về nguồn gốc, hương vị và lợi ích sức khỏe của sản phẩm..."
        rows={4}
        required
        error={errors.description}
      />

      <div className="flex items-center justify-end space-x-4 pt-6 border-t border-slate-100">
        <Button variant="outline" onClick={() => router.back()} type="button" disabled={isLoading}>
          ← Quay lại
        </Button>
        <Button variant="primary" type="submit" disabled={isLoading} className="bg-emerald-600 hover:bg-emerald-700">
          {isLoading ? 'Đang Lưu...' : isEditMode ? 'Cập Nhật Sản Phẩm' : 'Lưu Sản Phẩm'}
        </Button>
      </div>
    </form>
  );
}
