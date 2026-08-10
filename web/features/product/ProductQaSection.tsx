import React from 'react';
import Link from 'next/link';
import { HelpCircle, MessageSquare } from 'lucide-react';
import { useQuestions } from '@/lib/api/hooks';

interface ProductQaSectionProps {
  productId: string;
}

export const ProductQaSection: React.FC<ProductQaSectionProps> = ({ productId }) => {
  const { data: questions = [] } = useQuestions(productId);

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
        <h3 className="font-bold text-lg text-[#1E293B] flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#2D5A27]" />
          Hỏi Đáp Liên Quan Đến Sản Phẩm
        </h3>
        <Link
          href="/questions/new"
          className="text-xs text-[#2D5A27] font-semibold hover:underline flex items-center gap-1"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          Đặt câu hỏi mới
        </Link>
      </div>

      {questions.length === 0 ? (
        <p className="text-xs text-[#64748B] py-2">
          Chưa có câu hỏi nào cho sản phẩm này. Hãy là người đầu tiên đặt câu hỏi cho chuyên gia dinh dưỡng!
        </p>
      ) : (
        <div className="space-y-3">
          {questions.map((q) => (
            <div key={q.id} className="p-3 bg-[#F9F6F0] rounded-lg border border-[#E2E8F0] space-y-2">
              <div className="flex items-center justify-between text-xs text-[#64748B]">
                <span className="font-semibold text-[#1E293B]">Hỏi bởi: {q.authorName}</span>
                <span>{new Date(q.createdAt).toLocaleDateString('vi-VN')}</span>
              </div>
              <p className="text-sm font-medium text-[#1E293B]">Q: {q.content}</p>

              {q.answer && (
                <div className="pl-3 border-l-2 border-[#2D5A27] text-xs space-y-1 text-[#1E293B] bg-white p-2.5 rounded-r-md">
                  <span className="font-bold text-[#2D5A27] block">
                    ✓ Trả lời từ {q.answer.responderName}:
                  </span>
                  <p>{q.answer.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
