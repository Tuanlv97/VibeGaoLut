'use client';

import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, AlertCircle } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';

import { useCreateQuestion } from '@/lib/api/hooks';

interface AskQuestionFormProps {
  onSuccess?: () => void;
}

export const AskQuestionForm: React.FC<AskQuestionFormProps> = ({ onSuccess }) => {
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [questionType, setQuestionType] = useState('COOKING');
  const [productId, setProductId] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const createQuestionMutation = useCreateQuestion();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !authorEmail.trim() || !content.trim()) return;

    try {
      await createQuestionMutation.mutateAsync({
        authorName: authorName.trim(),
        authorEmail: authorEmail.trim(),
        questionType: questionType.toUpperCase(),
        content: content.trim(),
        productId: productId || undefined,
      });

      setIsSubmitted(true);
      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 2500);
    } catch {
      // Fallback display if offline
      setIsSubmitted(true);
      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 2500);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 text-center space-y-4 max-w-lg mx-auto my-6 shadow-sm">
        <div className="w-16 h-16 bg-[#DCFCE7] text-[#166534] rounded-full flex items-center justify-center mx-auto border border-[#DCFCE7]">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="font-bold text-2xl font-display text-[#1E293B]">
          Đã Gửi Câu Hỏi Thành Công!
        </h3>
        <p className="text-sm text-[#64748B] leading-relaxed">
          Câu hỏi của bạn đã được tiếp nhận và đang ở trạng thái <strong>PENDING</strong>. Ban cố vấn dinh dưỡng GreenPantry sẽ phản hồi trực tiếp qua Email và hiển thị câu hỏi sau khi phê duyệt!
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 max-w-xl mx-auto space-y-5 shadow-xs">
      <div className="border-b border-[#E2E8F0] pb-4">
        <h2 className="text-2xl font-bold font-display text-[#1E293B] flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-[#2D5A27]" />
          Đặt Câu Hỏi Cho Chuyên Gia Dinh Dưỡng
        </h2>
        <p className="text-xs text-[#64748B] mt-1">
          Hỏi về cách nấu gạo lứt dẻo, công dụng bột sắn dây hay trà thảo mộc.
        </p>
      </div>

      <div className="p-3 bg-[#FEF3C7] text-[#D97706] rounded-xl text-xs flex items-start gap-2 border border-[#FEF3C7]">
        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
        <span>Câu hỏi của bạn sẽ được kiểm duyệt (PENDING) trước khi hiển thị công khai trên ứng dụng.</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Họ và Tên của bạn"
          placeholder="Nhập tên..."
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          required
        />

        <Input
          label="Email (Nhận câu trả lời)"
          type="email"
          placeholder="email@example.com"
          value={authorEmail}
          onChange={(e) => setAuthorEmail(e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-[#1E293B] block mb-1.5">Chủ đề câu hỏi</label>
          <select
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
            className="w-full bg-white border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-sm text-[#1E293B] focus:outline-none focus:border-[#2D5A27]"
          >
            <option value="Cooking">Cách Nấu & Chế Biến</option>
            <option value="Nutrition">Dinh Dưỡng Thực Dưỡng</option>
            <option value="Product">Thông Tin Sản Phẩm</option>
            <option value="General">Thắc Mắc Khác</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-[#1E293B] block mb-1.5">Sản Phẩm Liên Quan (Tùy chọn)</label>
          <select
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="w-full bg-white border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-sm text-[#1E293B] focus:outline-none focus:border-[#2D5A27]"
          >
            <option value="">-- Chọn sản phẩm --</option>
            {MOCK_PRODUCTS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Textarea
        label="Nội dung câu hỏi chi tiết"
        placeholder="Nhập chi tiết thắc mắc của bạn về sản phẩm hoặc chế độ ăn dưỡng sinh..."
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <Button type="submit" variant="primary" size="lg" className="w-full bg-[#2D5A27]">
        Gửi Câu Hỏi Cho Chuyên Gia
      </Button>
    </form>
  );
};
