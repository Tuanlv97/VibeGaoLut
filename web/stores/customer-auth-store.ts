import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CustomerUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  loyaltyPoints: number;
  goldBalance?: number;
}

interface CustomerAuthState {
  token: string | null;
  customer: CustomerUser | null;
  setAuth: (token: string, customer: CustomerUser) => void;
  updateCustomer: (customer: Partial<CustomerUser>) => void;
  logout: () => void;
}

export const useCustomerAuthStore = create<CustomerAuthState>()(
  persist(
    (set) => ({
      token: null,
      customer: null,
      setAuth: (token, customer) => set({ token, customer }),
      updateCustomer: (customer) =>
        set((state) => ({
          customer: state.customer ? { ...state.customer, ...customer } : null,
        })),
      logout: () => set({ token: null, customer: null }),
    }),
    {
      name: 'greenpantry_customer_auth',
    },
  ),
);
