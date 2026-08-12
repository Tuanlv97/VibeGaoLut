'use client';

import { useState, useEffect } from 'react';
import { Coins, CheckCircle, XCircle, RefreshCw, AlertCircle, Clock } from 'lucide-react';
import { fetchAPI } from '@/lib/api/client';

interface PendingTopup {
  id: string;
  customerId: string;
  amountVnd: number;
  goldAmount: number;
  description: string;
  status: string;
  transferContent?: string;
  createdAt: string;
}

export default function AdminWalletTopupPage() {
  const [topups, setTopups] = useState<PendingTopup[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchTopups = async () => {
    setLoading(true);
    try {
      const data = await fetchAPI<PendingTopup[]>('/admin/wallet/topups');
      setTopups(data);
    } catch (err: any) {
      setMsg({ type: 'error', text: err.message || 'Không thể tải danh sách nạp tiền.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopups();
  }, []);

  const handleAction = async (id: string, action: 'APPROVE' | 'REJECT') => {
    setActionLoadingId(id);
    setMsg(null);
    try {
      const res = await fetchAPI<{ message: string }>(`/admin/wallet/topups/${id}/approve`, {
        method: 'PATCH',
        body: JSON.stringify({ action }),
      });
      setMsg({ type: 'success', text: res.message || 'Đã xử lý giao dịch thành công.' });
      fetchTopups();
    } catch (err: any) {
      setMsg({ type: 'error', text: err.message || 'Xử lý thất bại.' });
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Coins className="w-6 h-6 text-amber-500" /> Quản Lý Nạp Tiền VietQR (Ví GOLD)
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Duyệt các giao dịch nạp tiền qua mã VietQR để tự động cộng điểm GOLD cho Khách hàng.
          </p>
        </div>

        <button
          onClick={fetchTopups}
          disabled={loading}
          className="px-4 py-2 bg-slate-100 text-slate-700 font-medium text-xs rounded-xl hover:bg-slate-200 transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Làm mới
        </button>
      </div>

      {msg && (
        <div
          className={`p-4 rounded-xl text-sm flex items-center gap-2 ${
            msg.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {msg.type === 'success' ? (
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
          )}
          <span>{msg.text}</span>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900">
            Yêu Cầu Nạp Tiền Đang Chờ Duyệt ({topups.length})
          </h3>
        </div>

        {topups.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <Clock className="w-12 h-12 mx-auto mb-2 text-slate-300" />
            <p className="text-sm">Hiện không có yêu cầu nạp tiền nào đang chờ duyệt.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5">Thời Gian</th>
                  <th className="px-6 py-3.5">Nội Dung CK VietQR</th>
                  <th className="px-6 py-3.5">Số Tiền VNĐ</th>
                  <th className="px-6 py-3.5">Quy Đổi GOLD</th>
                  <th className="px-6 py-3.5 text-right">Thao Tác Duyệt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {topups.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {new Date(tx.createdAt).toLocaleString('vi-VN')}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono font-bold bg-amber-50 text-amber-800 px-2.5 py-1 rounded-md border border-amber-200">
                        {tx.transferContent || tx.description}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900 text-sm">
                      {tx.amountVnd.toLocaleString('vi-VN')} VNĐ
                    </td>
                    <td className="px-6 py-4 font-bold text-amber-600 text-sm">
                      +{tx.goldAmount} GOLD
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleAction(tx.id, 'APPROVE')}
                        disabled={actionLoadingId === tx.id}
                        className="px-3 py-1.5 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors shadow-xs disabled:opacity-50 inline-flex items-center gap-1"
                      >
                        <CheckCircle className="w-3.5 h-3.5" /> Duyệt Cộng GOLD
                      </button>
                      <button
                        onClick={() => handleAction(tx.id, 'REJECT')}
                        disabled={actionLoadingId === tx.id}
                        className="px-3 py-1.5 bg-rose-50 text-rose-700 font-semibold rounded-lg hover:bg-rose-100 transition-colors disabled:opacity-50 inline-flex items-center gap-1"
                      >
                        <XCircle className="w-3.5 h-3.5" /> Từ Chối
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
