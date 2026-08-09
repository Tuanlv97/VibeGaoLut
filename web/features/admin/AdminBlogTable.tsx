'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { BlogFormModal } from './BlogFormModal';
import { DeleteConfirmModal } from './DeleteConfirmModal';

export function AdminBlogTable({
  blogPosts = [],
  onCreate,
  onUpdate,
  onDelete,
}: {
  blogPosts: any[];
  onCreate: (data: any) => Promise<void>;
  onUpdate: (id: string, data: any) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await onCreate(data);
      setIsCreateOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateSubmit = async (data: any) => {
    if (!editingPost) return;
    setIsLoading(true);
    try {
      await onUpdate(editingPost.id, data);
      setEditingPost(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingId) return;
    setIsLoading(true);
    try {
      await onDelete(deletingId);
      setDeletingId(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header action */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <h3 className="font-bold text-slate-800 text-base">Danh Sách Bài Viết Blog Dinh Dưỡng</h3>
        <button
          onClick={() => setIsCreateOpen(true)}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-lg shadow-sm transition-colors flex items-center space-x-2"
        >
          <span>✍️</span>
          <span>Viết Bài Mới</span>
        </button>
      </div>

      {/* Blog Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-6">Bài Viết</th>
                <th className="py-3.5 px-4">Tác Giả</th>
                <th className="py-3.5 px-4">SP Đề Cập (Content Commerce)</th>
                <th className="py-3.5 px-4 text-center">Nổi Bật</th>
                <th className="py-3.5 px-6 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {blogPosts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
                    Chưa có bài viết nào.
                  </td>
                </tr>
              ) : (
                blogPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-16 h-10 rounded-lg bg-slate-100 relative overflow-hidden flex-shrink-0 border border-slate-200">
                          {post.coverImage ? (
                            <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs">📝</div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 line-clamp-1">{post.title}</p>
                          <p className="text-xs text-slate-500 line-clamp-1">{post.excerpt}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-medium text-slate-800">
                      {post.authorName || 'Dược sĩ Minh Anh'}
                      <span className="block text-xs text-slate-400">{post.readingTimeMinutes || 5} phút đọc</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                        🛒 {post.relatedProductIds?.length || 1} sản phẩm
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      {post.isFeatured ? (
                        <span className="bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full text-xs font-bold">
                          ⭐ HERO
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs">-</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        onClick={() => setEditingPost(post)}
                        className="inline-flex px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-medium transition-colors"
                      >
                        ✏️ Sửa
                      </button>
                      <button
                        onClick={() => setDeletingId(post.id)}
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

      {/* Create Modal */}
      <BlogFormModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreateSubmit}
        isLoading={isLoading}
      />

      {/* Edit Modal */}
      <BlogFormModal
        isOpen={Boolean(editingPost)}
        onClose={() => setEditingPost(null)}
        onSubmit={handleUpdateSubmit}
        initialData={editingPost}
        isLoading={isLoading}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingId)}
        onClose={() => setDeletingId(null)}
        onConfirm={handleDeleteConfirm}
        isLoading={isLoading}
        message="Bạn có chắc chắn muốn xóa bài viết blog này?"
      />
    </div>
  );
}
