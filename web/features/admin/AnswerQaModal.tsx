'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';

export function AnswerQaModal({
  question,
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}: {
  question: any | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { questionId: string; content: string; responderName: string; approve: boolean }) => Promise<void>;
  isLoading?: boolean;
}) {
  const [content, setContent] = useState('');
  const [responderName, setResponderName] = useState('Chuyên gia Dinh dưỡng GreenPantry');

  if (!question) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      questionId: question.id,
      content,
      responderName,
      approve: true,
    });
    setContent('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Trả Lời & Duyệt Câu Hỏi Q&A">
      <form onSubmit={handleSubmit} className="space-y-4 pt-2 text-sm">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
          <p className="text-xs font-semibold text-slate-500">
            Câu hỏi từ: <span className="text-slate-800 font-bold">{question.authorName}</span> ({question.authorEmail})
          </p>
          <p className="font-bold text-slate-900 text-base">"{question.content}"</p>
        </div>

        <Textarea
          label="Câu Trả Lời Chính Thức từ GreenPantry *"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Nhập nội dung tư vấn thực dưỡng / chế biến..."
          rows={5}
          required
        />

        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
          <Button variant="outline" onClick={onClose} type="button" disabled={isLoading}>
            Hủy
          </Button>
          <Button variant="primary" type="submit" disabled={isLoading} className="bg-emerald-600 hover:bg-emerald-700">
            {isLoading ? 'Đang Gửi...' : 'Duyệt & Đăng Câu Trả Lời'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
