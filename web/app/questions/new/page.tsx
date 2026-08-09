'use client';

import React from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { AskQuestionForm } from '@/features/qa/AskQuestionForm';

export default function AskQuestionPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumb
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Hỏi đáp', href: '/questions' },
          { label: 'Đặt câu hỏi mới' },
        ]}
      />

      <AskQuestionForm />
    </div>
  );
}
