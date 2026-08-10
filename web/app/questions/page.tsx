'use client';

import React, { useState } from 'react';
import { MOCK_QUESTIONS } from '@/lib/mock-data';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { QuestionFilterTabs } from '@/features/qa/QuestionFilterTabs';
import { QuestionCardList } from '@/features/qa/QuestionCardList';
import { AskQuestionButton } from '@/features/qa/AskQuestionButton';
import { AskQuestionModal } from '@/features/qa/AskQuestionModal';

import { useQuestions } from '@/lib/api/hooks';

export default function QuestionListingPage() {
  const [selectedType, setSelectedType] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: questions = [] } = useQuestions();

  const filteredQuestions = (questions || []).filter((q: any) => {
    if (selectedType && q.questionType !== selectedType) return false;
    return q.status === 'APPROVED' || !q.status;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumb
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Hỏi đáp cộng đồng' },
        ]}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold font-display text-[#1E293B]">
            Hỏi Đáp Cùng Chuyên Gia Dinh Dưỡng
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Gửi thắc mắc về cách chọn lúa/gạo lứt, chế độ ăn thuần tự nhiên hoặc tư vấn sử dụng thảo mộc.
          </p>
        </div>

        <AskQuestionButton onClickModal={() => setIsModalOpen(true)} />
      </div>

      <QuestionFilterTabs
        selectedType={selectedType}
        onSelectType={setSelectedType}
      />

      <QuestionCardList questions={filteredQuestions} />

      <AskQuestionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
