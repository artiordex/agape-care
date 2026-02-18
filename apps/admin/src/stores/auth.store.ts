/**
 * Description : auth.store.ts - ?? auth.store ?? ?? ??
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

import { create } from 'zustand';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  roleId?: string | null;
  departmentId?: string | null;
}

interface AuthStore {
  user: AuthUser | null;
  accessToken: string | null;
  isInitialized: boolean;
  setAuth: (user: AuthUser, token: string) => void;
  clearAuth: () => void;
  setInitialized: () => void;
}

export const useAuthStore = create<AuthStore>(set => ({
  user: null,
  accessToken: null,
  isInitialized: false,
  setAuth: (user, accessToken) => set({ user, accessToken }),
  clearAuth: () => set({ user: null, accessToken: null }),
  setInitialized: () => set({ isInitialized: true }),
}));
