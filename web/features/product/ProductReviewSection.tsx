'use client';

import React, { useState } from 'react';
import { Star, ShieldCheck, MessageSquarePlus } from 'lucide-react';
import { Review, MOCK_REVIEWS } from '@/lib/mock-data';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

interface ProductReviewSectionProps {
  productId: string;
}

export const ProductReviewSection: React.FC<ProductReviewSectionProps> = ({
  productId,
}) => {
  const reviews = MOCK_REVIEWS.filter((r) => r.productId === productId);
  const [showModal, setShowModal] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!orderNumber.trim() || !orderNumber.toUpperCase().startsWith('GP-')) {
      setErrorMsg('Vui lòng nhập Mã đơn hàng hợp lệ (bắt đầu bằng GP- ví dụ: GP-883920)');
      return;
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowModal(false);
      setOrderNumber('');
      setComment('');
    }, 2000);
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-4">
        <div>
          <h3 className="font-bold text-lg text-[#1E293B]">
            Đánh Giá Xác Thực Từ Người Mua Đơn Hàng (Verified Buyer)
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">
            Chỉ những đơn hàng đã giao thành công (DELIVERED) mới có thể gửi đánh giá.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowModal(true)}
          className="shrink-0"
        >
          <MessageSquarePlus className="w-4 h-4" />
          Gửi Đánh Giá Qua Mã Đơn Hàng
        </Button>
      </div>

      {/* Average Rating Summary */}
      <div className="flex items-center gap-6 p-4 bg-[#F9F6F0] rounded-xl border border-[#E2E8F0]">
        <div className="text-center border-r border-[#E2E8F0] pr-6">
          <div className="text-4xl font-bold text-[#2D5A27] font-mono">4.9</div>
          <div className="flex items-center gap-0.5 text-amber-500 justify-center my-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <div className="text-xs text-[#64748B] font-medium">{reviews.length + 36} lượt đánh giá</div>
        </div>

        <div className="space-y-1 text-xs text-[#64748B] flex-1">
          <div className="flex items-center gap-2">
            <span>5 sao</span>
            <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-[#2D5A27] h-full w-[90%]"></div>
            </div>
            <span>90%</span>
          </div>
          <div className="flex items-center gap-2">
            <span>4 sao</span>
            <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-[#2D5A27] h-full w-[10%]"></div>
            </div>
            <span>10%</span>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((rev) => (
          <div key={rev.id} className="p-4 border border-[#E2E8F0] rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-[#1E293B]">{rev.customerName}</span>
                {rev.verified && (
                  <Badge variant="success">
                    <ShieldCheck className="w-3 h-3" />
                    ĐÃ MUA HÀNG #{rev.orderId}
                  </Badge>
                )}
              </div>
              <span className="text-xs text-[#64748B]">
                {new Date(rev.createdAt).toLocaleDateString('vi-VN')}
              </span>
            </div>

            <div className="flex items-center gap-0.5 text-amber-500">
              {Array.from({ length: rev.rating }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>

            <p className="text-sm text-[#1E293B] leading-relaxed">{rev.comment}</p>
          </div>
        ))}
      </div>

      {/* Modal Submit Review */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <h4 className="font-bold text-base text-[#1E293B]">Viết Đánh Giá Sản Phẩm</h4>
              <button onClick={() => setShowModal(false)} className="text-[#64748B] hover:text-[#1E293B]">✕</button>
            </div>

            {submitted ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 text-center rounded-xl space-y-2">
                <ShieldCheck className="w-8 h-8 mx-auto text-emerald-600" />
                <h5 className="font-bold">Gửi Đánh Giá Thành Công!</h5>
                <p className="text-xs">Cảm ơn bạn. Đánh giá của bạn đang được duyệt PENDING trước khi hiển thị.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <Input
                  label="Mã Đơn Hàng Của Bạn"
                  placeholder="Ví dụ: GP-883920"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  required
                />

                <Input
                  label="Họ và Tên"
                  placeholder="Nhập tên của bạn..."
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />

                <div>
                  <label className="text-sm font-medium text-[#1E293B] block mb-1">Đánh Giá Sao</label>
                  <div className="flex items-center gap-1 text-amber-500">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setRating(s)}
                        className="p-1 focus:outline-none"
                      >
                        <Star className={`w-6 h-6 ${s <= rating ? 'fill-current' : 'text-slate-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <Textarea
                  label="Nội dung trải nghiệm sản phẩm"
                  placeholder="Chia sẻ chất lượng cơm, độ ngậy, hạt gạo..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />

                {errorMsg && <p className="text-xs text-[#991B1B] font-medium">{errorMsg}</p>}

                <div className="flex justify-end gap-2 pt-2">
                  <Button type="button" variant="ghost" onClick={() => setShowModal(false)}>Hủy</Button>
                  <Button type="submit" variant="primary">Gửi Đánh Giá</Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
