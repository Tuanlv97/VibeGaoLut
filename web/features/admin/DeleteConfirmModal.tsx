'use client';

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Xác Nhận Xóa',
  message = 'Bạn có chắc chắn muốn xóa bản ghi này? Hành động này không thể hoàn tác.',
  isLoading = false,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  isLoading?: boolean;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-6 pt-2">
        <p className="text-sm text-slate-600 leading-relaxed">{message}</p>
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Hủy
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isLoading ? 'Đang xóa...' : 'Đồng Ý Xóa'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
