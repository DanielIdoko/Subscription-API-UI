import { create } from 'zustand';
import type { MonthlyData } from '../types/types';
import analyticsAPI from '../services/api/analytics.api';

interface AnalyticsState {
  monthlyData: MonthlyData[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchMonthlyData: () => Promise<void>;
  clearError: () => void;
}

export const analyticsStore = create<AnalyticsState>((set) => ({
  monthlyData: [],
  isLoading: false,
  error: null,

  fetchMonthlyData: async () => {
    try {
      set({ isLoading: true, error: null });
      const { data } = await analyticsAPI.getMonthlyData();

      set({
        monthlyData: data,
        isLoading: false,
      });
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch monthly data';
      set({ isLoading: false, error: errorMessage });
      throw err;
    }
  },

  clearError: () => set({ error: null }),
}));
