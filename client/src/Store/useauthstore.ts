import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    contact: string;
  } | null;
  role: 'client' | 'admin' | 'employee' | null;
  setAuth: (token: string, user: AuthState['user'], role: AuthState['role']) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      role: null,

      // ✅ Completely resets store and sets new token, user, and role
      setAuth: (token, user, role) =>
        set(() => ({
          token,
          user,
          role,
        })),

      clearAuth: () =>
        set(() => ({
          token: null,
          user: null,
          role: null,
        })),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        role: state.role,
      }),
    }
  )
);
