import React from 'react';
import { notFound } from 'next/navigation';
import { MOCK_QUESTIONS } from '@/lib/mock-data';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { QuestionDetailView } from '@/features/qa/QuestionDetailView';

interface QuestionDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function QuestionDetailPage({ params }: QuestionDetailPageProps) {
  const { id } = await params;
  const question = MOCK_QUESTIONS.find((q) => q.id === id);

  if (!question) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumb
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Hỏi đáp', href: '/questions' },
          { label: `Chi tiết câu hỏi` },
        ]}
      />

      <QuestionDetailView question={question} />
    </div>
  );
}
