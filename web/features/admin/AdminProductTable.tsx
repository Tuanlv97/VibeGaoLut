'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DeleteConfirmModal } from './DeleteConfirmModal';

export function AdminProductTable({
  products = [],
  onDelete,
  onToggleNewArrival,
  isLoading = false,
}: {
  products: any[];
  onDelete: (id: string) => Promise<void>;
  onToggleNewArrival: (id: string, isFeaturedNew: boolean) => Promise<void>;
  isLoading?: boolean;
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || p.categoryId === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleDeleteConfirm = async () => {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      await onDelete(deletingId);
    } finally {
      setIsDeleting(false);
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <span className="absolute left-3 top-2.5 text-slate-400 text-sm">🔍</span>
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-lg border border-slate-200 text-sm px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="ALL">Tất cả danh mục</option>
            <option value="cat-1">Gạo & Ngũ Cốc</option>
            <option value="cat-2">Các Loại Hạt Dry Fruits</option>
            <option value="cat-3">Trà & Detox Dưỡng Sinh</option>
            <option value="cat-4">Đậu & Bột Nguyên Chất</option>
            <option value="cat-5">Thực Phẩm Chay Tự Nhiên</option>
          </select>
        </div>

        <Link
          href="/admin/products/new"
          className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-lg shadow-sm transition-colors flex items-center justify-center space-x-2"
        >
          <span>➕</span>
          <span>Thêm Sản Phẩm Mới</span>
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-6">Sản Phẩm</th>
                <th className="py-3.5 px-4">Giá Bán</th>
                <th className="py-3.5 px-4">Tồn Kho</th>
                <th className="py-3.5 px-4 text-center">SP Mới (New Arrival)</th>
                <th className="py-3.5 px-6 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
                    Chưa có sản phẩm nào phù hợp.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 relative overflow-hidden flex-shrink-0 border border-slate-200">
                          {p.images?.[0] ? (
                            <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-lg">🌾</div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 line-clamp-1">{p.name}</p>
                          <p className="text-xs text-slate-500">{p.weightUnit || '1kg'} • {p.origin}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-semibold text-emerald-700">
                      {p.price.toLocaleString('vi-VN')}đ
                      {p.compareAtPrice && (
                        <span className="text-xs text-slate-400 line-through block font-normal">
                          {p.compareAtPrice.toLocaleString('vi-VN')}đ
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          p.stockQuantity > 10
                            ? 'bg-emerald-50 text-emerald-700'
                            : p.stockQuantity > 0
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-red-50 text-red-700'
                        }`}
                      >
                        {p.stockQuantity} món
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => onToggleNewArrival(p.id, !p.isFeaturedNew)}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                          p.isFeaturedNew
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        }`}
                      >
                        {p.isFeaturedNew ? '⭐ BẬT' : 'TẮT'}
                      </button>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <Link
                        href={`/admin/products/${p.id}/edit`}
                        className="inline-flex px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-medium transition-colors"
                      >
                        ✏️ Sửa
                      </Link>
                      <button
                        onClick={() => setDeletingId(p.id)}
                        className="inline-flex px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-xs font-medium transition-colors"
                      >
                        🗑️ Xóa
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={Boolean(deletingId)}
        onClose={() => setDeletingId(null)}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
        message="Bạn có chắc chắn muốn xóa sản phẩm này khỏi hệ thống catalog?"
      />
    </div>
  );
}
