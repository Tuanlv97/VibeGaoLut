'use client';

import React, { useState } from 'react';
import { AdminHeader } from '@/features/admin/AdminHeader';
import { useAdminAuthStore, AdminRole } from '@/stores/admin-auth-store';
import {
  useAdminUsers,
  useCreateAdminUser,
  useUpdateAdminUser,
  useDeleteAdminUser,
} from '@/lib/api/hooks';
import {
  UserPlus,
  Shield,
  UserCheck,
  UserX,
  Trash2,
  Lock,
  Mail,
  User as UserIcon,
  CheckCircle2,
  XCircle,
  Loader2,
  ShieldAlert,
  Eye,
  EyeOff,
} from 'lucide-react';

export default function AdminUsersPage() {
  const { user: currentUser } = useAdminAuthStore();
  const { data: users, isLoading, refetch } = useAdminUsers();
  const createMutation = useCreateAdminUser();
  const updateMutation = useUpdateAdminUser();
  const deleteMutation = useDeleteAdminUser();

  const isSuperAdmin = currentUser?.role === AdminRole.SUPER_ADMIN;

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModalPassword, setShowModalPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<AdminRole>(AdminRole.STORE_MANAGER);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    try {
      await createMutation.mutateAsync({ email, password, fullName, role });
      setIsCreateModalOpen(false);
      setEmail('');
      setPassword('');
      setFullName('');
      setRole(AdminRole.STORE_MANAGER);
      refetch();
    } catch (err: any) {
      setErrorMsg(err.message || 'Không thể tạo tài khoản mới.');
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      await updateMutation.mutateAsync({
        id,
        data: { isActive: !currentStatus },
      });
      refetch();
    } catch (err: any) {
      alert(err.message || 'Lỗi khi thay đổi trạng thái.');
    }
  };

  const handleDeleteUser = async (id: string, name: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa tài khoản "${name}"?`)) {
      try {
        await deleteMutation.mutateAsync(id);
        refetch();
      } catch (err: any) {
        alert(err.message || 'Lỗi khi xóa tài khoản.');
      }
    }
  };

  const getRoleBadge = (userRole: AdminRole) => {
    switch (userRole) {
      case AdminRole.SUPER_ADMIN:
        return (
          <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full text-xs font-semibold">
            <Shield className="w-3.5 h-3.5" /> Super Admin
          </span>
        );
      case AdminRole.STORE_MANAGER:
        return (
          <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full text-xs font-semibold">
            Quản lý Kho/Đơn hàng
          </span>
        );
      case AdminRole.CONTENT_EDITOR:
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-semibold">
            Biên tập viên Content
          </span>
        );
      default:
        return <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full text-xs">{userRole}</span>;
    }
  };

  if (!isSuperAdmin) {
    return (
      <div>
        <AdminHeader title="Quản Lý Người Dùng & Phân Quyền" subtitle="Giới hạn quyền truy cập" />
        <div className="p-12 max-w-4xl mx-auto text-center">
          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-8 flex flex-col items-center">
            <ShieldAlert className="w-12 h-12 text-amber-600 mb-3" />
            <h3 className="text-xl font-bold text-slate-800">Quyền Hạn Không Đủ</h3>
            <p className="text-slate-600 text-sm mt-1 max-w-md">
              Tính năng Quản lý Người dùng & Phân quyền chỉ dành riêng cho quyền hạn Super Admin. Vui lòng liên hệ quản trị viên cấp cao.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AdminHeader
        title="Quản Lý Người Dùng & Phân Quyền (RBAC)"
        subtitle="Quản lý tài khoản cán bộ quản trị, phân cấp vai trò và kiểm soát quyền truy cập"
      />

      <div className="p-8 max-w-7xl mx-auto space-y-6">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h3 className="font-bold text-slate-800 text-lg">Danh Sách Tài Khoản Quản Trị</h3>
            <p className="text-slate-500 text-xs mt-0.5">Tất cả cán bộ nhân viên có quyền vào hệ thống Admin</p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2.5 bg-[#2D5A27] hover:bg-[#23481f] text-white font-semibold rounded-xl shadow-sm text-sm flex items-center gap-2 transition-all cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Thêm Tài Khoản Mới</span>
          </button>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center text-slate-500 flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin text-[#2D5A27]" />
              <span>Đang tải danh sách tài khoản...</span>
            </div>
          ) : !users || users.length === 0 ? (
            <div className="p-12 text-center text-slate-500">Chưa có tài khoản quản trị nào.</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider border-b border-slate-200">
                  <th className="py-4 px-6">Họ Và Tên</th>
                  <th className="py-4 px-6">Email</th>
                  <th className="py-4 px-6">Vai Trò (Role)</th>
                  <th className="py-4 px-6">Trạng Thái</th>
                  <th className="py-4 px-6 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {users.map((u: any) => (
                  <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-semibold text-slate-800 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center text-xs">
                        {u.fullName[0]?.toUpperCase()}
                      </div>
                      <span>{u.fullName}</span>
                    </td>
                    <td className="py-4 px-6 text-slate-600">{u.email}</td>
                    <td className="py-4 px-6">{getRoleBadge(u.role)}</td>
                    <td className="py-4 px-6">
                      {u.isActive ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full text-xs font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Hoạt động
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full text-xs font-semibold">
                          <XCircle className="w-3.5 h-3.5" /> Đã khóa
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        onClick={() => handleToggleStatus(u.id, u.isActive)}
                        title={u.isActive ? 'Khóa tài khoản' : 'Kích hoạt tài khoản'}
                        className={`p-2 rounded-lg transition-colors cursor-pointer ${
                          u.isActive
                            ? 'text-amber-600 hover:bg-amber-50'
                            : 'text-emerald-600 hover:bg-emerald-50'
                        }`}
                      >
                        {u.isActive ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                      </button>
                      {u.id !== currentUser?.id && (
                        <button
                          onClick={() => handleDeleteUser(u.id, u.fullName)}
                          title="Xóa tài khoản"
                          className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal Add Admin User */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-bold text-lg text-slate-800">Thêm Tài Khoản Admin Mới</h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="py-4 space-y-4">
              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs">
                  {errorMsg}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                  Họ Và Tên
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nguyễn Văn Quản Lý"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="manager@greenpantry.vn"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                  Mật Khẩu Mới
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showModalPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowModalPassword(!showModalPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-0.5 cursor-pointer"
                    title={showModalPassword ? 'Ẩn mật khẩu' : 'Hiển thị mật khẩu'}
                  >
                    {showModalPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                  Vai Trò & Quyền Hạn (Role)
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as AdminRole)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                >
                  <option value={AdminRole.STORE_MANAGER}>STORE_MANAGER (Quản lý Sản phẩm & Đơn hàng)</option>
                  <option value={AdminRole.CONTENT_EDITOR}>CONTENT_EDITOR (Quản lý Bài viết & Q&A)</option>
                  <option value={AdminRole.SUPER_ADMIN}>SUPER_ADMIN (Toàn quyền hệ thống)</option>
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-colors cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending}
                  className="flex-1 py-2.5 bg-[#2D5A27] hover:bg-[#23481f] text-white font-semibold rounded-xl text-sm transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  {createMutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>Tạo Tài Khoản</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
