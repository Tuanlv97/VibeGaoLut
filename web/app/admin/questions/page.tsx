'use client';

import React from 'react';
import { AdminHeader } from '@/features/admin/AdminHeader';
import { AdminQaTable } from '@/features/admin/AdminQaTable';
import {
  useAdminQuestions,
  useModerateQuestionStatus,
  useAnswerQuestion,
} from '@/lib/api/hooks';

export default function AdminQuestionsPage() {
  const { data: questions = [], refetch } = useAdminQuestions();
  const updateStatusMutation = useModerateQuestionStatus();
  const answerMutation = useAnswerQuestion();

  const handleUpdateStatus = async (questionId: string, status: string) => {
    await updateStatusMutation.mutateAsync({ questionId, status });
    refetch();
  };

  const handleAnswer = async (data: {
    questionId: string;
    content: string;
    responderName: string;
    approve: boolean;
  }) => {
    await answerMutation.mutateAsync(data);
    refetch();
  };

  return (
    <div>
      <AdminHeader
        title="Duyệt & Trả Lời Hỏi Đáp Cộng Đồng Q&A"
        subtitle="Kiểm duyệt câu hỏi Guest và cung cấp phản hồi chính thức từ chuyên gia"
      />
      <div className="p-8 max-w-7xl mx-auto">
        <AdminQaTable
          questions={questions}
          onUpdateStatus={handleUpdateStatus}
          onAnswer={handleAnswer}
        />
      </div>
    </div>
  );
}
