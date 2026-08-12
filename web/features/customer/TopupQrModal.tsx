'use client';

import { useState } from 'react';
import { X, QrCode, Copy, Check, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { fetchAPI } from '@/lib/api/client';

interface TopupQrModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function TopupQrModal({ isOpen, onClose, onSuccess }: TopupQrModalProps) {
  const [amount, setAmount] = useState<number>(200000);
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState<{
    qrCodeUrl: string;
    amountVnd: number;
    goldAmount: number;
    transferContent: string;
    accountNo: string;
    accountName: string;
    bankId: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (amount < 10000) {
      setError('Số tiền nạp tối thiểu là 10.000 VNĐ');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await fetchAPI<any>('/customer/wallet/topup-qr', {
        method: 'POST',
        body: JSON.stringify({ amountVnd: amount }),
      });
      setQrData(res);
    } catch (err: any) {
      setError(err.message || 'Không thể tạo mã nạp tiền. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600">
            <QrCode className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Nạp Tiền Quy Đổi GOLD</h3>
            <p className="text-xs text-slate-500">Quét mã VietQR bằng ứng dụng Ngân hàng (MB, VCB, MoMo...)</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {!qrData ? (
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Chọn số tiền muốn nạp (VNĐ)
              </label>
              <div className="grid grid-cols-2 gap-2.5 mb-3">
                {[100000, 200000, 500000, 1000000].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setAmount(val)}
                    className={`py-3 px-4 rounded-xl text-sm font-semibold border transition-all ${
                      amount === val
                        ? 'border-[#2D5A27] bg-[#2D5A27]/5 text-[#2D5A27] shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    {val.toLocaleString('vi-VN')} đ
                    <span className="block text-[11px] font-normal text-amber-600">
                      = {Math.floor(val / 1000)} GOLD
                    </span>
                  </button>
                ))}
              </div>

              <div className="relative mt-2">
                <input
                  type="number"
                  min="10000"
                  step="10000"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  placeholder="Nhập số tiền khác..."
                  className="w-full pl-4 pr-16 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                />
                <span className="absolute right-4 top-3.5 text-xs text-slate-400 font-semibold">VNĐ</span>
              </div>
            </div>

            <div className="p-4 bg-amber-50/70 border border-amber-200/60 rounded-2xl text-xs text-amber-900 space-y-1.5">
              <div className="font-semibold flex items-center gap-1.5 text-amber-800">
                <ShieldCheck className="w-4 h-4 text-amber-600" /> Quy đổi điểm GOLD:
              </div>
              <p>• <strong>1.000 VNĐ = 1 GOLD</strong> (Tỷ lệ 1:1.000)</p>
              <p>• Số tiền nạp: <strong>{amount.toLocaleString('vi-VN')} VNĐ</strong> ➔ Nhận <strong>{Math.floor(amount / 1000)} GOLD</strong></p>
              <p>• GOLD được dùng để mua hàng trực tiếp mà không cần chuyển khoản mỗi lần.</p>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-3.5 px-4 bg-[#2D5A27] text-white font-semibold text-sm rounded-xl hover:bg-[#23471E] transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Đang tạo mã VietQR...' : 'Tạo Mã VietQR Nạp Tiền'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        ) : (
          <div className="space-y-5 text-center">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 inline-block mx-auto shadow-inner">
              <img
                src={qrData.qrCodeUrl}
                alt="VietQR Code"
                className="w-56 h-56 mx-auto object-contain rounded-xl"
              />
            </div>

            <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-left text-xs space-y-2">
              <div className="flex justify-between items-center pb-2 border-b border-amber-200/60">
                <span className="text-slate-500">Số tiền nạp:</span>
                <span className="font-bold text-slate-900 text-sm">{qrData.amountVnd.toLocaleString('vi-VN')} VNĐ</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-amber-200/60">
                <span className="text-slate-500">Số GOLD quy đổi:</span>
                <span className="font-bold text-amber-600 text-sm">+{qrData.goldAmount} GOLD</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-amber-200/60">
                <span className="text-slate-500">Ngân hàng:</span>
                <span className="font-semibold text-slate-800">{qrData.bankId} - {qrData.accountName}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-amber-200/60">
                <span className="text-slate-500">Số tài khoản:</span>
                <span className="font-bold text-slate-900">{qrData.accountNo}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Nội dung chuyển khoản:</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(qrData.transferContent)}
                  className="inline-flex items-center gap-1 font-mono font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded hover:bg-amber-200 transition-colors"
                >
                  {qrData.transferContent}
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setQrData(null)}
                className="flex-1 py-2.5 px-4 border border-slate-200 text-slate-700 font-medium text-xs rounded-xl hover:bg-slate-50"
              >
                Đổi số tiền khác
              </button>
              <button
                type="button"
                onClick={() => {
                  onSuccess();
                  onClose();
                }}
                className="flex-1 py-2.5 px-4 bg-[#2D5A27] text-white font-medium text-xs rounded-xl hover:bg-[#23471E]"
              >
                Đã Chuyển Khoản Thành Công
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
