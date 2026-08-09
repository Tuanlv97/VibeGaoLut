'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';

export function BlogFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading = false,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  initialData?: any;
  isLoading?: boolean;
}) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || 'cat-blog-1');
  const [authorName, setAuthorName] = useState(initialData?.authorName || 'Dược sĩ Minh Anh');
  const [readingTimeMinutes, setReadingTimeMinutes] = useState(initialData?.readingTimeMinutes || 5);
  const [coverImage, setCoverImage] = useState(
    initialData?.coverImage ||
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop',
  );
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [isFeatured, setIsFeatured] = useState(initialData?.isFeatured || false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      title,
      slug: slug || undefined,
      categoryId,
      authorName,
      readingTimeMinutes: Number(readingTimeMinutes),
      coverImage,
      excerpt,
      content,
      isFeatured,
      relatedProductIds: initialData?.relatedProductIds || ['p-1'],
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Sửa Bài Viết Blog' : 'Thêm Bài Viết Blog Mới'}>
      <form onSubmit={handleSubmit} className="space-y-4 pt-2 text-sm">
        <Input
          label="Tiêu Đề Bài Viết *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="vd: 5 Lợi Ích Của Gạo Lứt Đỏ Nguyên Cám"
          required
        />

        <Input
          label="URL Slug (tùy chọn)"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="5-loi-ich-cua-gao-lut-do"
        />

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Tác Giả *"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            required
          />
          <Input
            label="Thời Gian Đọc (Phút) *"
            type="number"
            value={readingTimeMinutes}
            onChange={(e) => setReadingTimeMinutes(Number(e.target.value))}
            required
          />
        </div>

        <Input
          label="Link Ảnh Bìa (Cover Image) *"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          required
        />

        <Textarea
          label="Tóm Tắt Ngắn (Excerpt) *"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
          required
        />

        <Textarea
          label="Nội Dung Bài Viết (Rich Content) *"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          required
        />

        <div className="pt-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
            />
            <span className="font-semibold text-slate-800">⭐ Bài Viết Nổi Bật (Featured Hero)</span>
          </label>
        </div>

        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
          <Button variant="outline" onClick={onClose} type="button" disabled={isLoading}>
            Hủy Bỏ
          </Button>
          <Button variant="primary" type="submit" disabled={isLoading} className="bg-emerald-600 hover:bg-emerald-700">
            {isLoading ? 'Đang Lưu...' : 'Lưu Bài Viết'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
