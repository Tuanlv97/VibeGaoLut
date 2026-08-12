'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  User,
  MapPin,
  Package,
  Award,
  LogOut,
  Plus,
  Trash2,
  Check,
  Star,
  Clock,
  Phone,
  Mail,
  Home,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { useCustomerAuthStore } from '@/stores/customer-auth-store';
import {
  useCustomerProfile,
  useCustomerOrders,
  useCreateCustomerAddress,
  useUpdateCustomerAddress,
  useDeleteCustomerAddress,
  CustomerAddressItem,
} from '@/lib/api/hooks/useCustomer';
import LoyaltyPointsCard from '@/features/customer/LoyaltyPointsCard';

export default function CustomerProfilePage() {
  const router = useRouter();
  const { token, customer, logout } = useCustomerAuthStore();
  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'orders' | 'points'>('profile');

  const { data: profile, isLoading: isProfileLoading, refetch: refetchProfile } = useCustomerProfile();
  const { data: orders, isLoading: isOrdersLoading } = useCustomerOrders();

  const createAddressMutation = useCreateCustomerAddress();
  const updateAddressMutation = useUpdateCustomerAddress();
  const deleteAddressMutation = useDeleteCustomerAddress();

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState<CustomerAddressItem | null>(null);

  const [addressForm, setAddressForm] = useState({
    recipientName: '',
    phone: '',
    province: 'Hà Nội',
    district: '',
    ward: '',
    addressDetail: '',
    isDefault: false,
  });

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  if (!token || isProfileLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#F9F6F0]">
        <div className="text-center text-slate-500">Đang tải thông tin cá nhân...</div>
      </div>
    );
  }

  const handleOpenAddAddress = () => {
    setEditingAddress(null);
    setAddressForm({
      recipientName: customer?.fullName || '',
      phone: customer?.phone || '',
      province: 'Hà Nội',
      district: '',
      ward: '',
      addressDetail: '',
      isDefault: false,
    });
    setShowAddressModal(true);
  };

  const handleOpenEditAddress = (addr: CustomerAddressItem) => {
    setEditingAddress(addr);
    setAddressForm({
      recipientName: addr.recipientName,
      phone: addr.phone,
      province: addr.province,
      district: addr.district,
      ward: addr.ward,
      addressDetail: addr.addressDetail,
      isDefault: addr.isDefault,
    });
    setShowAddressModal(true);
  };

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAddress) {
      await updateAddressMutation.mutateAsync({
        id: editingAddress.id,
        ...addressForm,
      });
    } else {
      await createAddressMutation.mutateAsync(addressForm);
    }
    setShowAddressModal(false);
    refetchProfile();
  };

  const handleSetDefaultAddress = async (addr: CustomerAddressItem) => {
    await updateAddressMutation.mutateAsync({
      id: addr.id,
      isDefault: true,
    });
    refetchProfile();
  };

  const handleDeleteAddress = async (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa địa chỉ này?')) {
      await deleteAddressMutation.mutateAsync(id);
      refetchProfile();
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#F9F6F0] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Profile Summary */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2D9CC] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#2D5A27] text-white font-bold text-2xl flex items-center justify-center shadow-inner">
              {profile?.fullName?.charAt(0).toUpperCase() || 'K'}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#1E293B]">{profile?.fullName}</h1>
              <div className="mt-1 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                <span className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-slate-400" /> {profile?.phone}</span>
                <span className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-slate-400" /> {profile?.email}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <div>
                <div className="text-xs text-slate-500">Điểm thưởng</div>
                <div className="text-sm font-bold text-[#2D5A27]">{profile?.loyaltyPoints || 0} điểm</div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="px-4 py-2.5 border border-slate-200 text-slate-700 hover:bg-red-50 hover:border-red-200 hover:text-red-700 font-medium rounded-xl transition-colors flex items-center gap-2 text-sm"
            >
              <LogOut className="w-4 h-4" /> Đăng xuất
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap border-b border-[#E2D9CC] gap-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-5 font-medium text-sm rounded-t-xl border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'border-[#2D5A27] text-[#2D5A27] bg-white font-semibold shadow-sm'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-4 h-4" /> Thông Tin Cá Nhân
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`py-3 px-5 font-medium text-sm rounded-t-xl border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'addresses'
                ? 'border-[#2D5A27] text-[#2D5A27] bg-white font-semibold shadow-sm'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <MapPin className="w-4 h-4" /> Sổ Địa Chỉ ({profile?.addresses.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-5 font-medium text-sm rounded-t-xl border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'border-[#2D5A27] text-[#2D5A27] bg-white font-semibold shadow-sm'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Package className="w-4 h-4" /> Đơn Hàng Của Tôi ({orders?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('points')}
            className={`py-3 px-5 font-medium text-sm rounded-t-xl border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'points'
                ? 'border-[#2D5A27] text-[#2D5A27] bg-white font-semibold shadow-sm'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-4 h-4 text-amber-500" /> Điểm Tích Lũy
          </button>
        </div>

        {/* Tab Contents */}
        {activeTab === 'profile' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2D9CC] shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-[#1E293B]">Thông Tin Tài Khoản</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Họ và tên</label>
                <div className="mt-1 text-slate-900 font-medium text-base p-3 bg-slate-50 rounded-xl border border-slate-100">
                  {profile?.fullName}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Số điện thoại</label>
                <div className="mt-1 text-slate-900 font-medium text-base p-3 bg-slate-50 rounded-xl border border-slate-100">
                  {profile?.phone}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</label>
                <div className="mt-1 text-slate-900 font-medium text-base p-3 bg-slate-50 rounded-xl border border-slate-100">
                  {profile?.email}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Ngày tham gia</label>
                <div className="mt-1 text-slate-900 font-medium text-base p-3 bg-slate-50 rounded-xl border border-slate-100">
                  {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('vi-VN') : '—'}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'addresses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#1E293B]">Sổ Địa Chỉ Giao Hàng</h2>
              <button
                onClick={handleOpenAddAddress}
                className="px-4 py-2 bg-[#2D5A27] text-white text-sm font-medium rounded-xl hover:bg-[#23471E] flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Thêm Địa Chỉ Mới
              </button>
            </div>

            {profile?.addresses.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-[#E2D9CC] text-center text-slate-500">
                Bạn chưa thêm địa chỉ nhận hàng nào.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile?.addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={`bg-white p-6 rounded-2xl border ${
                      addr.isDefault ? 'border-[#2D5A27] ring-1 ring-[#2D5A27]' : 'border-[#E2D9CC]'
                    } shadow-sm space-y-3 relative`}
                  >
                    {addr.isDefault && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#2D5A27] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        <Check className="w-3.5 h-3.5" /> Địa chỉ mặc định
                      </span>
                    )}

                    <div>
                      <div className="font-bold text-[#1E293B] text-base">{addr.recipientName}</div>
                      <div className="text-slate-600 text-sm">{addr.phone}</div>
                    </div>

                    <div className="text-slate-700 text-sm">
                      {addr.addressDetail}, {addr.ward}, {addr.district}, {addr.province}
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      {!addr.isDefault ? (
                        <button
                          onClick={() => handleSetDefaultAddress(addr)}
                          className="text-[#2D5A27] font-semibold hover:underline"
                        >
                          Đặt làm mặc định
                        </button>
                      ) : (
                        <span />
                      )}

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleOpenEditAddress(addr)}
                          className="text-slate-600 font-medium hover:text-slate-900"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(addr.id)}
                          className="text-red-600 font-medium hover:underline flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-[#1E293B]">Lịch Sử Đơn Hàng</h2>

            {isOrdersLoading ? (
              <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500">
                Đang tải danh sách đơn hàng...
              </div>
            ) : !orders || orders.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-[#E2D9CC] text-center text-slate-500 py-12">
                <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p>Bạn chưa có đơn hàng nào.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((ord: any) => (
                  <div key={ord.id} className="bg-white p-6 rounded-2xl border border-[#E2D9CC] shadow-sm space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-[#2D5A27] text-base">{ord.orderNumber}</span>
                        <span className="text-xs text-slate-500">
                          {new Date(ord.createdAt).toLocaleString('vi-VN')}
                        </span>
                      </div>
                      <span
                        className={`px-3 py-1 text-xs font-bold rounded-full ${
                          ord.status === 'DELIVERED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : ord.status === 'CANCELLED'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {ord.status}
                      </span>
                    </div>

                    <div className="divide-y divide-slate-50">
                      {ord.items?.map((item: any) => (
                        <div key={item.id} className="py-2 flex items-center justify-between text-sm">
                          <span className="text-slate-800 font-medium">
                            {item.productName} <span className="text-slate-400 font-normal">x{item.quantity}</span>
                          </span>
                          <span className="text-slate-900 font-semibold">
                            {item.subtotal?.toLocaleString('vi-VN')} VNĐ
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-sm gap-2">
                      <div className="text-xs text-slate-500 space-y-0.5">
                        <div>Địa chỉ: {ord.addressDetail}, {ord.ward}, {ord.district}, {ord.province}</div>
                        {ord.pointsUsed > 0 && (
                          <div className="text-amber-600 font-medium">
                            Đã dùng {ord.pointsUsed} điểm (-{ord.pointsDiscountAmount?.toLocaleString('vi-VN')}đ)
                          </div>
                        )}
                        {ord.pointsEarned > 0 && (
                          <div className="text-emerald-600 font-medium">
                            Tích lũy nhận được: +{ord.pointsEarned} điểm
                          </div>
                        )}
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-slate-500 block">Tổng thanh toán (COD)</span>
                        <span className="text-lg font-extrabold text-[#2D5A27]">
                          {ord.totalAmount?.toLocaleString('vi-VN')} VNĐ
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'points' && <LoyaltyPointsCard />}
      </div>

      {/* Add / Edit Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-2xl shadow-xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-[#1E293B]">
              {editingAddress ? 'Chỉnh Sửa Địa Chỉ' : 'Thêm Địa Chỉ Giao Hàng Mới'}
            </h3>

            <form onSubmit={handleSaveAddress} className="space-y-4 text-sm">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Tên người nhận</label>
                <input
                  type="text"
                  required
                  value={addressForm.recipientName}
                  onChange={(e) => setAddressForm({ ...addressForm, recipientName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Số điện thoại</label>
                <input
                  type="tel"
                  required
                  value={addressForm.phone}
                  onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Tỉnh/Thành</label>
                  <input
                    type="text"
                    required
                    value={addressForm.province}
                    onChange={(e) => setAddressForm({ ...addressForm, province: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Quận/Huyện</label>
                  <input
                    type="text"
                    required
                    value={addressForm.district}
                    onChange={(e) => setAddressForm({ ...addressForm, district: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Phường/Xã</label>
                  <input
                    type="text"
                    required
                    value={addressForm.ward}
                    onChange={(e) => setAddressForm({ ...addressForm, ward: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Địa chỉ chi tiết (Tên đường, số nhà)</label>
                <input
                  type="text"
                  required
                  value={addressForm.addressDetail}
                  onChange={(e) => setAddressForm({ ...addressForm, addressDetail: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                />
              </div>

              <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={addressForm.isDefault}
                  onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                  className="w-4 h-4 rounded text-[#2D5A27] focus:ring-[#2D5A27]"
                />
                <span>Đặt làm địa chỉ giao hàng mặc định</span>
              </label>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddressModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2D5A27] text-white font-medium rounded-xl hover:bg-[#23471E]"
                >
                  Lưu Địa Chỉ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
