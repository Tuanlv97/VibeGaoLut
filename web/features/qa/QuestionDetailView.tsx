import React from 'react';
import Link from 'next/link';
import { HelpCircle, CheckCircle, ArrowLeft, Tag } from 'lucide-react';
import { Question } from '@/lib/mock-data';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface QuestionDetailViewProps {
  question: Question;
}

export const QuestionDetailView: React.FC<QuestionDetailViewProps> = ({ question }) => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link href="/questions" className="inline-flex items-center gap-1.5 text-xs text-[#64748B] hover:text-[#2D5A27]">
        <ArrowLeft className="w-4 h-4" />
        Quay lại danh sách câu hỏi
      </Link>

      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center justify-between gap-2 border-b border-[#E2E8F0] pb-4">
          <div className="flex items-center gap-2 text-xs text-[#64748B]">
            <span className="font-semibold text-[#1E293B]">Tác giả: {question.authorName}</span>
            <span>•</span>
            <span>{new Date(question.createdAt).toLocaleDateString('vi-VN')}</span>
          </div>
          <Badge variant="sage">{question.questionType}</Badge>
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl font-bold font-display text-[#1E293B] leading-snug flex items-start gap-2">
            <HelpCircle className="w-6 h-6 text-[#2D5A27] shrink-0 mt-0.5" />
            <span>{question.content}</span>
          </h1>

          {question.productName && (
            <div className="flex items-center gap-2 text-xs text-[#2D5A27] bg-[#F9F6F0] p-2.5 rounded-lg border border-[#E2E8F0]">
              <Tag className="w-4 h-4" />
              <span>Sản phẩm đính kèm: <strong>{question.productName}</strong></span>
            </div>
          )}
        </div>

        {question.answer ? (
          <div className="p-6 bg-[#F9F6F0] rounded-xl border-2 border-[#2D5A27]/20 space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-[#2D5A27]">
              <CheckCircle className="w-5 h-5" />
              <span>Câu Trả Lời Chính Thức Từ {question.answer.responderName}</span>
            </div>
            <p className="text-sm text-[#1E293B] leading-relaxed pl-7">
              {question.answer.content}
            </p>
            <div className="text-xs text-[#64748B] pl-7">
              Phản hồi ngày: {new Date(question.answer.createdAt).toLocaleDateString('vi-VN')}
            </div>
          </div>
        ) : (
          <div className="p-4 bg-amber-50 text-amber-800 text-xs rounded-xl border border-amber-200">
            Câu hỏi này đang chờ chuyên gia phản hồi chính thức.
          </div>
        )}
      </div>
    </div>
  );
};
