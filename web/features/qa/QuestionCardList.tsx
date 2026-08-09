import React from 'react';
import { Question } from '@/lib/mock-data';
import { QuestionCard } from './QuestionCard';

interface QuestionCardListProps {
  questions: Question[];
}

export const QuestionCardList: React.FC<QuestionCardListProps> = ({ questions }) => {
  if (questions.length === 0) {
    return (
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-8 text-center my-6">
        <p className="text-[#64748B] text-sm">Chưa có câu hỏi nào thuộc chuyên mục này.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <QuestionCard key={question.id} question={question} />
      ))}
    </div>
  );
};
