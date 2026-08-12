'use client';

import { Coins, Award, ArrowUpRight, ArrowDownRight, RefreshCw, Info } from 'lucide-react';
import { useCustomerPointsHistory } from '@/lib/api/hooks/useCustomer';

export default function LoyaltyPointsCard() {
  const { data, isLoading, isError, refetch } = useCustomerPointsHistory();

  if (isLoading) {
    return (
      <div className="p-6 bg-white rounded-2xl border border-slate-200 animate-pulse space-y-4">
        <div className="h-20 bg-slate-100 rounded-xl"></div>
        <div className="h-40 bg-slate-100 rounded-xl"></div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center py-8">
        <p className="text-slate-600 mb-4">Không thể tải thông tin điểm tích lũy.</p>
        <button
          onClick={() => refetch()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#2D5A27] text-white text-sm font-medium rounded-xl hover:bg-[#23471E]"
        >
          <RefreshCw className="w-4 h-4" /> Thử lại
        </button>
      </div>
    );
  }

  const equivalentVnd = data.currentPoints * 100;

  return (
    <div className="space-y-6">
      {/* Overview Balance Box */}
      <div className="bg-gradient-to-r from-[#2D5A27] to-[#1E3E1A] text-white p-6 sm:p-8 rounded-2xl shadow-md relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-200 text-sm font-medium">
              <Award className="w-5 h-5 text-amber-400" />
              <span>Điểm Thưởng Tích Lũy</span>
            </div>
            <div className="mt-2 flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                {data.currentPoints.toLocaleString('vi-VN')}
              </span>
              <span className="text-lg text-emerald-100 font-medium">điểm</span>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-emerald-200">
              Quy đổi tương đương:{' '}
              <strong className="text-white font-semibold">{equivalentVnd.toLocaleString('vi-VN')} VNĐ</strong> giảm giá
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 text-xs text-emerald-100 space-y-1.5 max-w-xs">
            <div className="flex items-center gap-1.5 text-white font-medium mb-1">
              <Info className="w-4 h-4 text-amber-300" /> Quy định tích & đổi điểm
            </div>
            <div>• <strong className="text-white">10.000đ</strong> tiền đơn = <strong className="text-amber-300">1 điểm</strong></div>
            <div>• <strong className="text-[#A3E635]">10 điểm</strong> = <strong className="text-[#A3E635]">1.000đ</strong> trừ vào hóa đơn</div>
            <div>• Điểm trừ trực tiếp khi bạn chọn sử dụng lúc thanh toán.</div>
          </div>
        </div>
      </div>

      {/* Transaction History Log */}
      <div className="bg-white rounded-2xl border border-[#E2D9CC] p-6 shadow-sm">
        <h3 className="text-lg font-bold text-[#1E293B] mb-4 flex items-center gap-2">
          <Coins className="w-5 h-5 text-[#2D5A27]" />
          Lịch Sử Tích & Đổi Điểm
        </h3>

        {data.transactions.length === 0 ? (
          <div className="text-center py-10 text-slate-500">
            <p>Bạn chưa có lịch sử tích điểm hoặc sử dụng điểm nào.</p>
            <p className="text-xs mt-1 text-slate-400">Tích điểm tự động sau khi đơn hàng được giao thành công!</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {data.transactions.map((tx) => {
              const isEarned = tx.transactionType === 'EARNED' || tx.transactionType === 'REFUNDED';
              const isRedeemed = tx.transactionType === 'REDEEMED';

              return (
                <div key={tx.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        isEarned
                          ? 'bg-emerald-100 text-emerald-700'
                          : isRedeemed
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {isEarned ? (
                        <ArrowUpRight className="w-5 h-5" />
                      ) : (
                        <ArrowDownRight className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{tx.description}</p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {new Date(tx.createdAt).toLocaleString('vi-VN')}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`text-sm font-bold ${
                        tx.points > 0 ? 'text-emerald-600' : 'text-amber-600'
                      }`}
                    >
                      {tx.points > 0 ? `+${tx.points}` : tx.points} điểm
                    </span>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Số dư: {tx.balanceAfter} điểm
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
