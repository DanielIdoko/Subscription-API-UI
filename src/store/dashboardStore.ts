import { create } from 'zustand';
import type { DashboardStats } from '../types/types';
import dashboardAPI from '../services/api/dashboard.api';

interface DashboardState {
  stats: DashboardStats | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchStats: () => Promise<void>;
  clearError: () => void;
}

export const dashboardStore = create<DashboardState>((set) => ({
  stats: null,
  isLoading: false,
  error: null,

  fetchStats: async () => {
    try {
      set({ isLoading: true, error: null });
      const { data } = await dashboardAPI.getStats();

      set({
        stats: data,
        isLoading: false,
      });
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch dashboard stats';
      set({ isLoading: false, error: errorMessage });
      throw err;
    }
  },

  clearError: () => set({ error: null }),
}));
