'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuthStore } from '@/stores/admin-auth-store';
import { useAdminLogin } from '@/lib/api/hooks';
import { Leaf, Lock, Mail, AlertCircle, ArrowRight, Loader2, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const setAuth = useAdminAuthStore((s) => s.setAuth);
  const loginMutation = useAdminLogin();

  const [email, setEmail] = useState('admin@greenpantry.vn');
  const [password, setPassword] = useState('Admin@123456');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      const res = await loginMutation.mutateAsync({ email, password });
      setAuth(res.accessToken, res.user);
      router.push('/admin');
    } catch (err: any) {
      if (err.message?.includes('Failed to fetch') || err.message?.includes('fetch failed')) {
        setErrorMessage(
          'Không thể kết nối đến Backend Server (http://localhost:4000). Vui lòng mở terminal và chạy lệnh `npm run start:dev` trong thư mục `api`.',
        );
      } else {
        setErrorMessage(err.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại Email và Mật khẩu.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F6F0] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        {/* Top Header Banner */}
        <div className="bg-[#2D5A27] text-white p-8 text-center relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 rounded-2xl mb-4 backdrop-blur-sm">
            <Leaf className="w-8 h-8 text-emerald-300" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">GreenPantry Admin Portal</h1>
          <p className="text-emerald-100 text-xs mt-1">Đăng nhập cổng quản trị nội bộ hệ thống</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {errorMessage && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3 text-rose-700 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
              Email Quản Trị
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@greenpantry.vn"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5A27] focus:bg-white transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
              Mật Khẩu
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5A27] focus:bg-white transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1 cursor-pointer"
                title={showPassword ? 'Ẩn mật khẩu' : 'Hiển thị mật khẩu'}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full py-3.5 px-6 bg-[#2D5A27] hover:bg-[#23481f] active:bg-[#1a3617] text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-70 disabled:cursor-not-allowed group cursor-pointer"
          >
            {loginMutation.isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Đang đăng nhập...</span>
              </>
            ) : (
              <>
                <span>Đăng Nhập Quản Trị</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          {/* Preset Helper Card for Demo */}
          <div className="mt-6 pt-6 border-t border-slate-100 bg-slate-50/80 -mx-8 -mb-8 p-6 text-xs text-slate-500 rounded-b-3xl">
            <p className="font-semibold text-slate-700 mb-1.5">Tài khoản Demo khởi tạo sẵn:</p>
            <div className="space-y-1 font-mono text-[11px] bg-white p-2.5 rounded-lg border border-slate-200/80">
              <div className="flex justify-between">
                <span className="text-emerald-700">Super Admin:</span>
                <span>admin@greenpantry.vn / Admin@123456</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-700">Store Manager:</span>
                <span>manager@greenpantry.vn / Admin@123456</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
