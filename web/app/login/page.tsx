'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Lock, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { fetchAPI } from '@/lib/api/client';
import { useCustomerAuthStore, CustomerUser } from '@/stores/customer-auth-store';

export default function CustomerLoginPage() {
  const router = useRouter();
  const setAuth = useCustomerAuthStore((s) => s.setAuth);

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) {
      setError('Vui lòng nhập Email / SĐT và Mật khẩu.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await fetchAPI<{ accessToken: string; customer: CustomerUser }>('/customer/auth/login', {
        method: 'POST',
        body: JSON.stringify({ identifier, password }),
      });

      setAuth(res.accessToken, res.customer);
      setSuccess(true);
      setTimeout(() => {
        router.push('/profile');
      }, 1000);
    } catch (err: any) {
      setError(err.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#F9F6F0] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-[#E2D9CC]">
        <div className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-[#2D5A27]/10 flex items-center justify-center text-[#2D5A27]">
            <User className="w-6 h-6" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-[#1E293B]">Đăng Nhập Khách Hàng</h2>
          <p className="mt-2 text-sm text-slate-600">
            Trải nghiệm tích điểm, lưu địa chỉ giao hàng và theo dõi đơn hàng dễ dàng.
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-3 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center gap-3 text-sm">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <span>Đăng nhập thành công! Đang chuyển hướng...</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email hoặc Số điện thoại
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="h-5 w-5" />
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

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-slate-700">
                  Mật khẩu
                </label>
                <Link href="/forgot-password" className="text-xs font-semibold text-[#2D5A27] hover:underline">
                  Quên mật khẩu?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || success}
            className="w-full py-3 px-4 bg-[#2D5A27] text-white font-medium rounded-xl hover:bg-[#23471E] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2D5A27] flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Đang xác thực...' : 'Đăng Nhập'}
            {!loading && <ArrowRight className="w-5 h-5" />}
          </button>
        </form>

        <div className="text-center text-sm text-slate-600">
          Chưa có tài khoản?{' '}
          <Link href="/register" className="font-semibold text-[#2D5A27] hover:underline">
            Tạo tài khoản mới
          </Link>
        </div>
      </div>
    </div>
  );
}
