import { create } from "zustand";
import type { User } from "../types/types";
import api from "../utils/api";

// Auth state type
type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setIsAuthenticated: (value: boolean) => void;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Functions
  register: (name: string, email: string, password: string) => Promise<boolean>;
  //   login: (email: string, password: string) => Promise<boolean>;
  //   logout: () => Promise<void>;
  //   fetchAuthenticatedUser: () => Promise<void>;
};

export const authStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,

  // Mutators
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),

  setUser: (user) => set({ user }),
  setLoading: (value) => set({ isLoading: value }),
  setError: (error) => set({ error }),
  register: async (name, email, password) => {
    try {
      set({ isLoading: true, error: null });
      const { data } = await api.post("auth/signup", {
        name,
        email,
        password,
      });

      // Check for token to verify user logged in
      if (data.data?.token) {
        set({
          isAuthenticated: true,
          user: data.data.user,
        });
        console.log(data);
        return true;
      }

      return false;
    } catch (err: any) {
      console.error("Registration failed:", err.response?.data || err.message);

      set({
        error: err.response?.data.error || "An error occured. Please try again.",
        isAuthenticated: false,
      });
      return false;
    } finally {
      set({ isLoading: false });
    }
  },
}));
