import React from 'react';
import Link from 'next/link';
import { HelpCircle, CheckCircle, Tag } from 'lucide-react';
import { Question } from '@/lib/mock-data';
import { Badge } from '@/components/ui/Badge';

interface QuestionCardProps {
  question: Question;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 space-y-3 shadow-xs hover:border-[#2D5A27]/30 transition-all">
      <div className="flex items-center justify-between gap-2 text-xs text-[#64748B]">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#1E293B]">{question.authorName}</span>
          <Badge variant="outline">{question.questionType}</Badge>
        </div>
        <span>{new Date(question.createdAt).toLocaleDateString('vi-VN')}</span>
      </div>

      <Link href={`/questions/${question.id}`} className="block">
        <h3 className="font-bold text-base text-[#1E293B] hover:text-[#2D5A27] transition-colors leading-snug">
          Q: {question.content}
        </h3>
      </Link>

      {question.productName && (
        <div className="flex items-center gap-1.5 text-xs text-[#2D5A27]">
          <Tag className="w-3.5 h-3.5" />
          <span>Sản phẩm liên quan: <strong>{question.productName}</strong></span>
        </div>
      )}

      {question.answer && (
        <div className="p-4 bg-[#F9F6F0] rounded-xl border border-[#E2E8F0] space-y-1.5 mt-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#2D5A27]">
            <CheckCircle className="w-4 h-4" />
            <span>Câu trả lời chính thức từ GreenPantry:</span>
          </div>
          <p className="text-xs text-[#1E293B] leading-relaxed pl-5">
            {question.answer.content}
          </p>
        </div>
      )}
    </div>
  );
};
