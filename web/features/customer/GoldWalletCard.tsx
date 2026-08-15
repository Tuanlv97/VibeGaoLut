'use client';

import { useState, useEffect } from 'react';
import { Coins, QrCode, ArrowUpRight, ArrowDownLeft, Clock, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
import { fetchAPI } from '@/lib/api/client';
import { TopupQrModal } from './TopupQrModal';
import { useCustomerAuthStore } from '@/stores/customer-auth-store';

interface GoldTransactionItem {
  id: string;
  type: 'TOPUP' | 'PAYMENT' | 'REFUND';
  amountVnd: number;
  goldAmount: number;
  balanceAfter: number;
  description: string;
  status: 'PENDING' | 'SUCCESS' | 'REJECTED';
  transferContent?: string;
  createdAt: string;
}

export function GoldWalletCard() {
  const customer = useCustomerAuthStore((s) => s.customer);
  const updateCustomer = useCustomerAuthStore((s) => s.updateCustomer);

  const [goldBalance, setGoldBalance] = useState<number>(customer?.goldBalance || 0);
  const [transactions, setTransactions] = useState<GoldTransactionItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadData = async (showLoading = false) => {
    if (showLoading) setLoading(true);
    try {
      const res = await fetchAPI<{ goldBalance: number; transactions: GoldTransactionItem[] }>('/customer/wallet/history');
      setGoldBalance(res.goldBalance);
      setTransactions(res.transactions);
      updateCustomer({ goldBalance: res.goldBalance });
    } catch {
      // Fallback
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => {
    loadData(true);

    // Auto reload when user switches back to this tab
    const handleFocus = () => {
      loadData(false);
    };
    window.addEventListener('focus', handleFocus);

    // Auto poll every 4 seconds so topup approval updates automatically
    const interval = setInterval(() => {
      loadData(false);
    }, 4000);

    return () => {
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Wallet Balance Hero Card */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 opacity-15 pointer-events-none">
          <Coins className="w-64 h-64 text-white" />
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold text-amber-100 mb-3">
              <Coins className="w-4 h-4 text-amber-200" /> Ví Điểm GOLD
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {goldBalance.toLocaleString('vi-VN')} <span className="text-xl font-normal opacity-90">GOLD</span>
            </div>
            <p className="text-xs text-amber-100/90 mt-1">
              Tương đương <strong>{(goldBalance * 1000).toLocaleString('vi-VN')} VNĐ</strong> khả dụng mua hàng
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex-1 sm:flex-none py-3 px-5 bg-white text-amber-800 font-bold text-sm rounded-2xl hover:bg-amber-50 transition-all shadow-md flex items-center justify-center gap-2"
            >
              <QrCode className="w-4 h-4 text-amber-700" />
              Nạp GOLD Qua VietQR
            </button>
            <button
              onClick={() => loadData(true)}
              disabled={loading}
              className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-2xl transition-all"
              title="Làm mới"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Transaction History Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <h4 className="text-base font-bold text-slate-900 mb-4 flex items-center justify-between">
          <span>Lịch Sử Biến Động Ví GOLD</span>
          <span className="text-xs font-normal text-slate-500">{transactions.length} giao dịch</span>
        </h4>

        {transactions.length === 0 ? (
          <div className="text-center py-10 text-slate-400">
            <Coins className="w-10 h-10 mx-auto mb-2 text-slate-300" />
            <p className="text-sm">Chưa có giao dịch nạp hoặc thanh toán điểm GOLD.</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-3 text-xs font-semibold text-[#2D5A27] hover:underline"
            >
              Nạp điểm GOLD ngay ➔
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 overflow-x-auto">
            {transactions.map((tx) => (
              <div key={tx.id} className="py-3.5 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      tx.type === 'TOPUP'
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-rose-50 text-rose-600'
                    }`}
                  >
                    {tx.type === 'TOPUP' ? (
                      <ArrowDownLeft className="w-4 h-4" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{tx.description}</div>
                    <div className="text-[11px] text-slate-400">
                      {new Date(tx.createdAt).toLocaleString('vi-VN')}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className={`font-bold text-sm ${
                      tx.goldAmount > 0 ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {tx.goldAmount > 0 ? `+${tx.goldAmount}` : tx.goldAmount} GOLD
                  </div>

                  <div className="mt-0.5">
                    {tx.status === 'PENDING' && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                        <Clock className="w-3 h-3" /> Chờ duyệt VietQR
                      </span>
                    )}
                    {tx.status === 'SUCCESS' && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" /> Thành công
                      </span>
                    )}
                    {tx.status === 'REJECTED' && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full">
                        <XCircle className="w-3 h-3" /> Từ chối
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Topup QR Modal */}
      <TopupQrModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={loadData}
      />
    </div>
  );
}
