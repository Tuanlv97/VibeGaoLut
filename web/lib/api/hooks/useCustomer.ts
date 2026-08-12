import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAPI } from '../client';
import { useCustomerAuthStore } from '@/stores/customer-auth-store';

export interface CustomerAddressItem {
  id: string;
  recipientName: string;
  phone: string;
  province: string;
  district: string;
  ward: string;
  addressDetail: string;
  isDefault: boolean;
}

export interface CustomerProfileData {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  loyaltyPoints: number;
  goldBalance: number;
  isActive: boolean;
  createdAt: string;
  addresses: CustomerAddressItem[];
}

export interface PointTransactionItem {
  id: string;
  orderId: string | null;
  transactionType: 'EARNED' | 'REDEEMED' | 'REFUNDED' | 'ADMIN_ADJUSTMENT';
  points: number;
  balanceAfter: number;
  description: string;
  createdAt: string;
}

export interface PointsHistoryData {
  currentPoints: number;
  transactions: PointTransactionItem[];
}

export function useCustomerProfile() {
  const token = useCustomerAuthStore((s) => s.token);
  const updateCustomer = useCustomerAuthStore((s) => s.updateCustomer);

  return useQuery<CustomerProfileData>({
    queryKey: ['customer-profile', token],
    queryFn: async () => {
      const data = await fetchAPI<CustomerProfileData>('/customer/profile');
      updateCustomer({
        id: data.id,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        loyaltyPoints: data.loyaltyPoints,
        goldBalance: data.goldBalance,
      });
      return data;
    },
    enabled: !!token,
  });
}

export function useCustomerOrders() {
  const token = useCustomerAuthStore((s) => s.token);

  return useQuery<any[]>({
    queryKey: ['customer-orders', token],
    queryFn: () => fetchAPI<any[]>('/customer/orders'),
    enabled: !!token,
  });
}

export function useCustomerPointsHistory() {
  const token = useCustomerAuthStore((s) => s.token);

  return useQuery<PointsHistoryData>({
    queryKey: ['customer-points-history', token],
    queryFn: () => fetchAPI<PointsHistoryData>('/customer/points/history'),
    enabled: !!token,
  });
}

export function useCreateCustomerAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<CustomerAddressItem, 'id'>) =>
      fetchAPI<CustomerAddressItem>('/customer/addresses', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customer-profile'] });
    },
  });
}

export function useUpdateCustomerAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }: { id: string } & Partial<CustomerAddressItem>) =>
      fetchAPI<CustomerAddressItem>(`/customer/addresses/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customer-profile'] });
    },
  });
}

export function useDeleteCustomerAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      fetchAPI<{ success: boolean }>(`/customer/addresses/${id}`, {
        method: 'DELETE',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customer-profile'] });
    },
  });
}
