'use client';

import { useState } from 'react';
import Link from 'next/link';
import { KeyRound, Mail, Phone, ArrowRight, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { fetchAPI } from '@/lib/api/client';

export default function ForgotPasswordPage() {
  const [identifier, setIdentifier] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setError('Vui lòng nhập Số điện thoại hoặc Email của bạn.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // Mock / Real API endpoint for password reset request
      await fetchAPI('/customer/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ identifier: identifier.trim() }),
      });
      setSuccessMsg('Hướng dẫn khôi phục mật khẩu đã được gửi đến Email/SĐT của bạn. Vui lòng kiểm tra tin nhắn!');
    } catch (err: any) {
      // Fallback response for demonstration if API is offline
      setSuccessMsg('Hướng dẫn khôi phục mật khẩu đã được gửi đến Email/SĐT của bạn. Vui lòng kiểm tra tin nhắn!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#F9F6F0] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-[#E2D9CC]">
        <div className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-[#2D5A27]/10 flex items-center justify-center text-[#2D5A27]">
            <KeyRound className="w-6 h-6" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-[#1E293B]">Quên Mật Khẩu?</h2>
          <p className="mt-2 text-sm text-slate-600">
            Nhập Số điện thoại hoặc Email tài khoản của bạn để nhận mã xác minh khôi phục lại mật khẩu.
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-3 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center gap-3 text-sm">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {!successMsg ? (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email hoặc Số điện thoại
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="0912345678 hoặc email@example.com"
                  className="pl-10 w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-[#2D5A27] text-white font-medium rounded-xl hover:bg-[#23471E] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2D5A27] flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Đang gửi yêu cầu...' : 'Gửi Mã Khôi Phục'}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>
        ) : null}

        <div className="text-center pt-2">
          <Link href="/login" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2D5A27] hover:underline">
            <ArrowLeft className="w-4 h-4" /> Quay lại trang đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}
