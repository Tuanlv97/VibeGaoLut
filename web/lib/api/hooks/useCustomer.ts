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
  const customer = useCustomerAuthStore((s) => s.customer);

  return useQuery<any[]>({
    queryKey: ['customer-orders', token, customer?.phone, customer?.email],
    queryFn: async () => {
      let remoteOrders: any[] = [];
      try {
        remoteOrders = await fetchAPI<any[]>('/customer/orders');
      } catch {}

      let localOrders: any[] = [];
      if (typeof window !== 'undefined') {
        try {
          const raw = localStorage.getItem('greenpantry_local_orders');
          if (raw) localOrders = JSON.parse(raw);
        } catch {}
      }

      const orderMap = new Map<string, any>();
      (remoteOrders || []).forEach((o) => {
        if (o) orderMap.set(o.orderNumber || o.id, o);
      });

      localOrders.forEach((loc) => {
        if (loc) {
          const isMatch =
            (customer?.id && loc.customerId === customer.id) ||
            (customer?.phone && loc.customerPhone?.trim() === customer.phone.trim()) ||
            (customer?.email && loc.customerEmail?.trim().toLowerCase() === customer.email.trim().toLowerCase());
          
          if (isMatch) {
            const key = loc.orderNumber || loc.id;
            if (!orderMap.has(key)) {
              orderMap.set(key, loc);
            }
          }
        }
      });

      return Array.from(orderMap.values()).sort(
        (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime(),
      );
    },
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

export interface UpdateOrderAddressPayload {
  orderId: string;
  customerName: string;
  customerPhone: string;
  province: string;
  district?: string;
  ward: string;
  addressDetail: string;
  updateDefaultAddress?: boolean;
}

export function useUpdateOrderAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, ...payload }: UpdateOrderAddressPayload) =>
      fetchAPI<any>(`/customer/orders/${orderId}/address`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customer-orders'] });
      queryClient.invalidateQueries({ queryKey: ['customer-profile'] });
    },
  });
}
