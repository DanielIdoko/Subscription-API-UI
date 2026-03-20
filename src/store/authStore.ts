import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../types/types";
import authAPI from "../services/api/auth.api";


interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchCurrentUser: () => Promise<void>;
  clearError: () => void;
}

export const authStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      register: async (name, email, password) => {
        try {
          set({ isLoading: true, error: null });
          const { data } = await authAPI.register({ name, email, password });

          localStorage.setItem("auth_token", data.data.accessToken);
          // console.log(data.accessToken);
          
          set({
            user: data.user,
            token: data.data.accessToken,
            isLoading: false,
          });
        } catch (err: any) {
          const errorMessage =
            err.response?.data?.message ||
            "Registration failed. Please try again";
          set({ isLoading: false, error: errorMessage });
          throw err;
        }
      },

      login: async (email, password) => {
        try {
          set({ isLoading: true, error: null });
          const { data } = await authAPI.login({ email, password });

          // console.log(data);
          // console.log(data.data.accessToken);

          localStorage.setItem("auth_token", data.data.accessToken);
          set({
            user: data.user,
            token: data.data.accessToken,
            isLoading: false,
          });
        } catch (err: any) {
          const errorMessage =
            err.response?.data?.message || "Login failed. Please try again";
          set({ isLoading: false, error: errorMessage });
          throw err;
        }
      },

      logout: () => {
        localStorage.removeItem("auth_token");
        set({ user: null, token: null, error: null });
      },

      fetchCurrentUser: async () => {
        try {
          set({ isLoading: true, error: null });
          const { data } = await authAPI.getCurrentUser();
          set({ user: data, isLoading: false });
        } catch (err: any) {
          const errorMessage =
            err.response?.data?.message || "Failed to fetch user. Try again";
          set({ isLoading: false, error: errorMessage });
          throw err;
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-store",
      partialize: (state) => ({ token: state.token, user: state.user }),
    },
  ),
);
