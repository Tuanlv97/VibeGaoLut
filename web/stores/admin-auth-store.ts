import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export enum AdminRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  STORE_MANAGER = 'STORE_MANAGER',
  CONTENT_EDITOR = 'CONTENT_EDITOR',
}

export interface AdminUserSession {
  id: string;
  email: string;
  fullName: string;
  role: AdminRole;
}

interface AdminAuthState {
  token: string | null;
  user: AdminUserSession | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: AdminUserSession) => void;
  logout: () => void;
}

export const useAdminAuthStore = create<AdminAuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      setAuth: (token: string, user: AdminUserSession) =>
        set({ token, user, isAuthenticated: true }),
      logout: () => set({ token: null, user: null, isAuthenticated: false }),
    }),
    {
      name: 'greenpantry_admin_auth',
    },
  ),
);
