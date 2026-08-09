'use client';

import React from 'react';
import { AdminHeader } from '@/features/admin/AdminHeader';
import { AdminBlogTable } from '@/features/admin/AdminBlogTable';
import {
  useAdminBlogPosts,
  useCreateBlogPost,
  useUpdateBlogPost,
  useDeleteBlogPost,
} from '@/lib/api/hooks';

export default function AdminBlogPage() {
  const { data: blogData, refetch } = useAdminBlogPosts();
  const createMutation = useCreateBlogPost();
  const updateMutation = useUpdateBlogPost();
  const deleteMutation = useDeleteBlogPost();

  const blogPosts = blogData?.items || [];

  const handleCreate = async (data: any) => {
    await createMutation.mutateAsync(data);
    refetch();
  };

  const handleUpdate = async (id: string, data: any) => {
    await updateMutation.mutateAsync({ id, ...data });
    refetch();
  };

  const handleDelete = async (id: string) => {
    await deleteMutation.mutateAsync(id);
    refetch();
  };

  return (
    <div>
      <AdminHeader
        title="Quản Lý Bài Viết Blog Dinh Dưỡng"
        subtitle="Soạn bài viết, ghim bài viết Hero và liên kết sản phẩm Content Commerce"
      />
      <div className="p-8 max-w-7xl mx-auto">
        <AdminBlogTable
          blogPosts={blogPosts}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
