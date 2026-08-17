'use client';

import React, { useState, useEffect } from 'react';
import { AdminHeader } from '@/features/admin/AdminHeader';
import { useAdminCustomers, useUpdateCustomerStatus, useAdminOrders } from '@/lib/api/hooks';
import {
  Users,
  Search,
  Phone,
  Mail,
  MapPin,
  Coins,
  Star,
  ShoppingBag,
  UserCheck,
  UserX,
  Eye,
  Loader2,
  Calendar,
  Copy,
  Check,
  Plus,
  MessageSquare,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  ShieldAlert,
  Award,
} from 'lucide-react';

interface CareNote {
  id: string;
  createdAt: string;
  author: string;
  content: string;
}

// Fallback demo customers if DB has none yet
const DEMO_CUSTOMERS = [
  {
    id: 'cust-demo-1',
    fullName: 'Nguyễn Minh Anh',
    phone: '0912345678',
    email: 'minhanh.nguyen@gmail.com',
    loyaltyPoints: 350,
    goldBalance: 150000,
    isActive: true,
    createdAt: new Date('2026-01-15T08:30:00Z').toISOString(),
    updatedAt: new Date('2026-02-10T10:00:00Z').toISOString(),
    addresses: [
      {
        id: 'addr-1',
        recipientName: 'Nguyễn Minh Anh',
        phone: '0912345678',
        province: 'Thành phố Hà Nội',
        district: 'Quận Cầu Giấy',
        ward: 'Phường Dịch Vọng',
        addressDetail: 'Số 18 Phạm Hùng, Tòa nhà Keangnam',
        isDefault: true,
      },
    ],
    totalOrders: 5,
    totalSpent: 1850000,
    orders: [
      { id: 'ord-1', orderNumber: 'GP-883920', createdAt: '2026-02-08T14:20:00Z', totalAmount: 450000, status: 'DELIVERED' },
      { id: 'ord-2', orderNumber: 'GP-772819', createdAt: '2026-01-20T09:15:00Z', totalAmount: 600000, status: 'DELIVERED' },
    ],
  },
  {
    id: 'cust-demo-2',
    fullName: 'Lê Đức Nam',
    phone: '0987654321',
    email: 'ducnam.le@gmail.com',
    loyaltyPoints: 120,
    goldBalance: 50000,
    isActive: true,
    createdAt: new Date('2026-02-01T11:20:00Z').toISOString(),
    updatedAt: new Date('2026-02-01T11:20:00Z').toISOString(),
    addresses: [
      {
        id: 'addr-2',
        recipientName: 'Lê Đức Nam',
        phone: '0987654321',
        province: 'Thành phố Hồ Chí Minh',
        district: 'Quận 1',
        ward: 'Phường Bến Nghé',
        addressDetail: 'Tầng 12, Tòa nhà Bitexco, 2 Hải Triều',
        isDefault: true,
      },
    ],
    totalOrders: 2,
    totalSpent: 720000,
    orders: [
      { id: 'ord-3', orderNumber: 'GP-991204', createdAt: '2026-02-12T16:00:00Z', totalAmount: 720000, status: 'PROCESSING' },
    ],
  },
  {
    id: 'cust-demo-3',
    fullName: 'Trần Thị Bích',
    phone: '0933112233',
    email: 'bich.tran@yahoo.com',
    loyaltyPoints: 500,
    goldBalance: 300000,
    isActive: true,
    createdAt: new Date('2025-11-20T10:00:00Z').toISOString(),
    updatedAt: new Date('2026-02-14T08:00:00Z').toISOString(),
    addresses: [
      {
        id: 'addr-3',
        recipientName: 'Trần Thị Bích',
        phone: '0933112233',
        province: 'Thành phố Đà Nẵng',
        district: 'Quận Hải Châu',
        ward: 'Phường Hòa Cường Bắc',
        addressDetail: '150 Đường 2 Tháng 9',
        isDefault: true,
      },
    ],
    totalOrders: 8,
    totalSpent: 3400000,
    orders: [
      { id: 'ord-4', orderNumber: 'GP-661109', createdAt: '2026-02-14T08:00:00Z', totalAmount: 950000, status: 'DELIVERED' },
    ],
  },
  {
    id: 'cust-demo-4',
    fullName: 'Phạm Hoàng Anh',
    phone: '0905998877',
    email: 'hoanganh.pham@outlook.com',
    loyaltyPoints: 0,
    goldBalance: 0,
    isActive: false,
    createdAt: new Date('2026-01-05T14:45:00Z').toISOString(),
    updatedAt: new Date('2026-01-05T14:45:00Z').toISOString(),
    addresses: [],
    totalOrders: 0,
    totalSpent: 0,
    orders: [],
  },
];

export default function AdminCustomersPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'notes'>('profile');

  // Customer care note state
  const [notes, setNotes] = useState<CareNote[]>([]);
  const [newNote, setNewNote] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const { data: apiCustomers, isLoading, refetch } = useAdminCustomers({
    search: search || undefined,
    status: statusFilter !== 'all' ? statusFilter : undefined,
  });

  const updateStatusMutation = useUpdateCustomerStatus();

  // Combine API customers with Demo fallback if API list is empty
  const customersList = React.useMemo(() => {
    if (apiCustomers && apiCustomers.length > 0) {
      return apiCustomers;
    }
    // Filter demo data locally
    return DEMO_CUSTOMERS.filter((c) => {
      const matchSearch =
        !search ||
        c.fullName.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search) ||
        c.email.toLowerCase().includes(search.toLowerCase());
      const matchStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' && c.isActive) ||
        (statusFilter === 'inactive' && !c.isActive);
      return matchSearch && matchStatus;
    });
  }, [apiCustomers, search, statusFilter]);

  // KPI Metrics calculation
  const totalCustomers = customersList.length;
  const activeCustomersCount = customersList.filter((c) => c.isActive).length;
  const totalLoyaltyPoints = customersList.reduce((sum, c) => sum + (c.loyaltyPoints || 0), 0);
  const totalGoldBalance = customersList.reduce((sum, c) => sum + (c.goldBalance || 0), 0);

  // Load customer care notes from localStorage when selectedCustomer changes
  useEffect(() => {
    if (selectedCustomer?.id) {
      try {
        const stored = localStorage.getItem(`greenpantry_care_notes_${selectedCustomer.id}`);
        if (stored) {
          setNotes(JSON.parse(stored));
        } else {
          // Default initial note template
          setNotes([
            {
              id: 'note-init-1',
              createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
              author: 'Admin Chăm Sóc KH',
              content: 'Tài khoản mới tạo. Đã liên hệ chào mừng khách hàng và giới thiệu ưu đãi tích điểm.',
            },
          ]);
        }
      } catch {
        setNotes([]);
      }
    }
  }, [selectedCustomer]);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !selectedCustomer) return;

    const noteObj: CareNote = {
      id: `note-${Date.now()}`,
      createdAt: new Date().toISOString(),
      author: 'Admin Portal',
      content: newNote.trim(),
    };

    const updated = [noteObj, ...notes];
    setNotes(updated);
    setNewNote('');

    try {
      localStorage.setItem(`greenpantry_care_notes_${selectedCustomer.id}`, JSON.stringify(updated));
    } catch {}
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    const actionText = currentStatus ? 'khóa' : 'mở khóa';
    if (confirm(`Bạn có chắc chắn muốn ${actionText} tài khoản khách hàng này?`)) {
      try {
        await updateStatusMutation.mutateAsync({ id, isActive: !currentStatus });
        refetch();
        if (selectedCustomer && selectedCustomer.id === id) {
          setSelectedCustomer({ ...selectedCustomer, isActive: !currentStatus });
        }
      } catch (err: any) {
        alert(err.message || 'Thao tác thất bại.');
      }
    }
  };

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const formatVND = (num: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num || 0);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'N/A';
    try {
      return new Date(dateStr).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div>
      <AdminHeader
        title="Quản Lý & Chăm Sóc Khách Hàng (CRM)"
        subtitle="Theo dõi thông tin khách hàng, số dư ví GOLD, tích điểm, lịch sử đơn hàng & tương tác chăm sóc khách hàng"
      />

      <div className="p-8 max-w-7xl mx-auto space-y-6">
        {/* KPI Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider whitespace-nowrap">Tổng Khách Hàng</p>
              <h4 className="text-2xl font-bold text-slate-800 mt-0.5">{totalCustomers}</h4>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider whitespace-nowrap">Đang Hoạt Động</p>
              <h4 className="text-2xl font-bold text-[#2D5A27] mt-0.5">{activeCustomersCount}</h4>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <Star className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider whitespace-nowrap">Tổng Điểm Tích Lũy</p>
              <h4 className="text-2xl font-bold text-amber-600 mt-0.5">{totalLoyaltyPoints.toLocaleString()} đ</h4>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
              <Coins className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider whitespace-nowrap">Tổng Số Dư Ví GOLD</p>
              <h4 className="text-2xl font-bold text-purple-700 mt-0.5">{formatVND(totalGoldBalance)}</h4>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="relative flex-1 min-w-[280px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm theo tên khách hàng, số điện thoại, email..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5A27] transition-all"
            />
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  statusFilter === 'all'
                    ? 'bg-white text-slate-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tất Cả ({customersList.length})
              </button>
              <button
                onClick={() => setStatusFilter('active')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  statusFilter === 'active'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Hoạt Động
              </button>
              <button
                onClick={() => setStatusFilter('inactive')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  statusFilter === 'inactive'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Đã Khóa
              </button>
            </div>
          </div>
        </div>

        {/* Customer Data Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center text-slate-500 flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin text-[#2D5A27]" />
              <span>Đang tải danh sách khách hàng...</span>
            </div>
          ) : customersList.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              <Users className="w-10 h-10 mx-auto text-slate-300 mb-2" />
              <p>Không tìm thấy khách hàng phù hợp.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider border-b border-slate-200 whitespace-nowrap">
                    <th className="py-4 px-6 whitespace-nowrap">Khách Hàng</th>
                    <th className="py-4 px-6 whitespace-nowrap">Liên Hệ</th>
                    <th className="py-4 px-6 whitespace-nowrap">Tích Điểm</th>
                    <th className="py-4 px-6 whitespace-nowrap">Ví GOLD</th>
                    <th className="py-4 px-6 whitespace-nowrap">Đơn Hàng & Mua Sắm</th>
                    <th className="py-4 px-6 whitespace-nowrap">Trạng Thái</th>
                    <th className="py-4 px-6 text-right whitespace-nowrap">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {customersList.map((customer) => {
                    const defaultAddress = customer.addresses?.find((a: any) => a.isDefault) || customer.addresses?.[0];
                    return (
                      <tr key={customer.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-4 px-6 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm shadow-xs border border-emerald-200 shrink-0">
                              {customer.fullName ? customer.fullName[0]?.toUpperCase() : 'K'}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 whitespace-nowrap">{customer.fullName}</div>
                              <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5 whitespace-nowrap">
                                <Calendar className="w-3.5 h-3.5 shrink-0" />
                                <span className="whitespace-nowrap">Tham gia {formatDate(customer.createdAt)}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-6 whitespace-nowrap">
                          <div className="flex items-center gap-2 text-slate-700 text-xs whitespace-nowrap">
                            <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="font-medium whitespace-nowrap">{customer.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-500 text-xs whitespace-nowrap">
                            <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="whitespace-nowrap">{customer.email}</span>
                          </div>
                          {defaultAddress && (
                            <div className="flex items-center gap-1.5 text-slate-500 text-xs text-ellipsis overflow-hidden max-w-[240px] whitespace-nowrap" title={`${defaultAddress.district}, ${defaultAddress.province}`}>
                              <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                              <span className="truncate">{defaultAddress.district}, {defaultAddress.province}</span>
                            </div>
                          )}
                        </td>

                        <td className="py-4 px-6 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
                            <span className="whitespace-nowrap">{customer.loyaltyPoints || 0} điểm</span>
                          </span>
                        </td>

                        <td className="py-4 px-6 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 border border-purple-200 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                            <Coins className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                            <span className="whitespace-nowrap">{formatVND(customer.goldBalance || 0)}</span>
                          </span>
                        </td>

                        <td className="py-4 px-6 whitespace-nowrap">
                          <div className="text-slate-800 font-semibold text-xs flex items-center gap-1 whitespace-nowrap">
                            <ShoppingBag className="w-3.5 h-3.5 text-[#2D5A27] shrink-0" />
                            <span className="whitespace-nowrap">{customer.totalOrders || 0} đơn hàng</span>
                          </div>
                          <div className="text-xs text-emerald-700 font-bold mt-0.5 whitespace-nowrap">
                            {formatVND(customer.totalSpent || 0)}
                          </div>
                        </td>

                        <td className="py-4 px-6 whitespace-nowrap">
                          {customer.isActive ? (
                            <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                              <span className="whitespace-nowrap">Hoạt động</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                              <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                              <span className="whitespace-nowrap">Đã khóa</span>
                            </span>
                          )}
                        </td>

                        <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                          <button
                            onClick={() => {
                              setSelectedCustomer(customer);
                              setActiveTab('profile');
                            }}
                            className="px-3.5 py-1.5 bg-[#2D5A27] hover:bg-[#23481f] text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 inline-flex cursor-pointer shadow-xs whitespace-nowrap"
                          >
                            <Eye className="w-3.5 h-3.5 shrink-0" />
                            <span className="whitespace-nowrap">Chăm Sóc KH</span>
                          </button>

                          <button
                            onClick={() => handleToggleStatus(customer.id, customer.isActive)}
                            title={customer.isActive ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
                            className={`p-1.5 rounded-xl transition-colors cursor-pointer border ${
                              customer.isActive
                                ? 'text-amber-600 hover:bg-amber-50 border-amber-200'
                                : 'text-emerald-600 hover:bg-emerald-50 border-emerald-200'
                            }`}
                          >
                            {customer.isActive ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Customer Care Modal / Drawer */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-100 flex flex-col">
            {/* Modal Header */}
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white font-bold flex items-center justify-center text-xl shadow-md">
                  {selectedCustomer.fullName ? selectedCustomer.fullName[0]?.toUpperCase() : 'K'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg text-white">{selectedCustomer.fullName}</h3>
                    {selectedCustomer.isActive ? (
                      <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800">
                        Hoạt Động
                      </span>
                    ) : (
                      <span className="text-[10px] uppercase font-bold text-rose-400 bg-rose-950 px-2 py-0.5 rounded-full border border-rose-800">
                        Đã Khóa
                      </span>
                    )}
                  </div>
                  <p className="text-slate-400 text-xs mt-0.5 flex items-center gap-3">
                    <span>Mã KH: {selectedCustomer.id}</span>
                    <span>•</span>
                    <span>Tham gia: {formatDate(selectedCustomer.createdAt)}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedCustomer(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Quick Action Contact Bar */}
            <div className="bg-emerald-50/80 px-6 py-3 border-b border-emerald-100 flex items-center justify-between flex-wrap gap-2 text-xs">
              <span className="font-bold text-[#2D5A27] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" /> Phím Tắt Chăm Sóc Nhanh:
              </span>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${selectedCustomer.phone}`}
                  className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Phone className="w-3 h-3" /> Gọi Điện
                </a>

                <a
                  href={`https://zalo.me/${selectedCustomer.phone}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ExternalLink className="w-3 h-3" /> Nhắn Zalo
                </a>

                <button
                  onClick={() =>
                    handleCopy(
                      `Khách Hàng: ${selectedCustomer.fullName}\nSĐT: ${selectedCustomer.phone}\nEmail: ${selectedCustomer.email}`,
                      'all_info',
                    )
                  }
                  className="px-3 py-1.5 bg-white border border-emerald-300 text-emerald-800 rounded-lg font-semibold hover:bg-emerald-100 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {copiedField === 'all_info' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedField === 'all_info' ? 'Đã Copy' : 'Copy Thông Tin'}</span>
                </button>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="flex border-b border-slate-200 bg-slate-50 px-6">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-4 py-3 font-semibold text-xs border-b-2 transition-all cursor-pointer ${
                  activeTab === 'profile'
                    ? 'border-[#2D5A27] text-[#2D5A27]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Hồ Sơ & Sổ Địa Chỉ
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-4 py-3 font-semibold text-xs border-b-2 transition-all cursor-pointer ${
                  activeTab === 'orders'
                    ? 'border-[#2D5A27] text-[#2D5A27]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Lịch Sử Mua Hàng ({selectedCustomer.orders?.length || 0})
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`px-4 py-3 font-semibold text-xs border-b-2 transition-all cursor-pointer ${
                  activeTab === 'notes'
                    ? 'border-[#2D5A27] text-[#2D5A27]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Nhật Ký Chăm Sóc ({notes.length})
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  {/* Account Summary Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-amber-900">
                      <div className="text-xs font-semibold text-amber-700 flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" /> Tích Điểm
                      </div>
                      <div className="text-xl font-bold mt-1">{selectedCustomer.loyaltyPoints || 0} điểm</div>
                      <p className="text-[10px] text-amber-600 mt-0.5">Tương đương {formatVND((selectedCustomer.loyaltyPoints || 0) * 100)} giảm giá</p>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 p-4 rounded-2xl text-purple-900">
                      <div className="text-xs font-semibold text-purple-700 flex items-center gap-1">
                        <Coins className="w-4 h-4 text-purple-600" /> Số Dư Ví GOLD
                      </div>
                      <div className="text-xl font-bold mt-1">{formatVND(selectedCustomer.goldBalance || 0)}</div>
                      <p className="text-[10px] text-purple-600 mt-0.5">Dùng thanh toán đơn hàng</p>
                    </div>

                    <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-emerald-900">
                      <div className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                        <ShoppingBag className="w-4 h-4 text-emerald-600" /> Chi Tiêu Tích Lũy
                      </div>
                      <div className="text-xl font-bold mt-1">{formatVND(selectedCustomer.totalSpent || 0)}</div>
                      <p className="text-[10px] text-emerald-600 mt-0.5">Từ {selectedCustomer.totalOrders || 0} đơn đã hoàn tất</p>
                    </div>
                  </div>

                  {/* Personal Contact Info */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-xs">
                    <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider border-b border-slate-100 pb-2">
                      Thông Tin Liên Hệ Trực Tiếp
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-xs text-slate-400 block font-medium">Họ Và Tên Khách Hàng</span>
                        <span className="font-bold text-slate-800">{selectedCustomer.fullName}</span>
                      </div>

                      <div>
                        <span className="text-xs text-slate-400 block font-medium">Số Điện Thoại</span>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-800">{selectedCustomer.phone}</span>
                          <button
                            onClick={() => handleCopy(selectedCustomer.phone, 'phone')}
                            className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold cursor-pointer"
                          >
                            {copiedField === 'phone' ? 'Đã sao chép' : 'Sao chép'}
                          </button>
                        </div>
                      </div>

                      <div>
                        <span className="text-xs text-slate-400 block font-medium">Địa Chỉ Email</span>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-800">{selectedCustomer.email}</span>
                          <button
                            onClick={() => handleCopy(selectedCustomer.email, 'email')}
                            className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold cursor-pointer"
                          >
                            {copiedField === 'email' ? 'Đã sao chép' : 'Sao chép'}
                          </button>
                        </div>
                      </div>

                      <div>
                        <span className="text-xs text-slate-400 block font-medium">Ngày Đăng Ký Hệ Thống</span>
                        <span className="font-semibold text-slate-800">{formatDate(selectedCustomer.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Address List */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-xs">
                    <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center justify-between">
                      <span>Sổ Địa Chỉ Giao Hàng</span>
                      <span className="text-xs text-slate-400 font-normal">
                        ({selectedCustomer.addresses?.length || 0} địa chỉ)
                      </span>
                    </h4>

                    {!selectedCustomer.addresses || selectedCustomer.addresses.length === 0 ? (
                      <p className="text-xs text-slate-400 italic">Khách hàng chưa lưu địa chỉ nào.</p>
                    ) : (
                      <div className="space-y-3">
                        {selectedCustomer.addresses.map((addr: any) => (
                          <div key={addr.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                            <div className="flex items-center justify-between font-bold text-slate-800">
                              <span>{addr.recipientName || selectedCustomer.fullName} ({addr.phone || selectedCustomer.phone})</span>
                              {addr.isDefault && (
                                <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md text-[10px]">
                                  Mặc định
                                </span>
                              )}
                            </div>
                            <p className="text-slate-600">
                              {addr.addressDetail}, {addr.ward}, {addr.district}, {addr.province}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="space-y-4">
                  <h4 className="font-bold text-slate-800 text-sm">Danh Sách Đơn Hàng Đã Đặt</h4>

                  {!selectedCustomer.orders || selectedCustomer.orders.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-xs">
                      Khách hàng chưa phát sinh đơn hàng nào.
                    </div>
                  ) : (
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-100 text-slate-600 uppercase tracking-wider border-b border-slate-200">
                          <th className="py-3 px-4">Mã Đơn</th>
                          <th className="py-3 px-4">Ngày Đặt</th>
                          <th className="py-3 px-4">Tổng Tiền</th>
                          <th className="py-3 px-4">Trạng Thái</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {selectedCustomer.orders.map((ord: any) => (
                          <tr key={ord.id} className="hover:bg-slate-50">
                            <td className="py-3 px-4 font-bold text-slate-800">{ord.orderNumber}</td>
                            <td className="py-3 px-4 text-slate-600">{formatDate(ord.createdAt)}</td>
                            <td className="py-3 px-4 font-bold text-emerald-700">{formatVND(ord.totalAmount)}</td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                {ord.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}

              {activeTab === 'notes' && (
                <div className="space-y-6">
                  {/* Add New Care Note Form */}
                  <form onSubmit={handleAddNote} className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-3">
                    <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-[#2D5A27]" /> Thêm Ghi Chú Chăm Sóc Mới
                    </h4>
                    <textarea
                      required
                      rows={3}
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Ví dụ: Đã gọi điện hỏi thăm trải nghiệm sử dụng trà gạo lứt. Khách khen thơm ngon, hẹn tuần sau mua thêm combo..."
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                    ></textarea>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#2D5A27] hover:bg-[#23481f] text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5" /> Lưu Ghi Chú
                      </button>
                    </div>
                  </form>

                  {/* Notes Timeline List */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Lịch Sử Ghi Chú Interketing / Care Notes</h4>

                    {notes.length === 0 ? (
                      <p className="text-xs text-slate-400 italic">Chưa có ghi chú chăm sóc nào.</p>
                    ) : (
                      <div className="space-y-3">
                        {notes.map((n) => (
                          <div key={n.id} className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-1.5">
                            <div className="flex items-center justify-between text-xs text-slate-500">
                              <span className="font-bold text-slate-800 flex items-center gap-1">
                                <Award className="w-3.5 h-3.5 text-amber-500" /> {n.author}
                              </span>
                              <span>{formatDate(n.createdAt)}</span>
                            </div>
                            <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">{n.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
