import { create } from 'zustand';
import type { Subscription } from '../types/types';
import subscriptionAPI from '../services/api/subscription.api';
import type { CreateSubscriptionPayload, UpdateSubscriptionPayload } from '../services/api/subscription.api';

interface SubscriptionState {
  subscriptions: Subscription[];
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchSubscriptions: (page?: number, limit?: number, sort?: string) => Promise<void>;
  createSubscription: (payload: CreateSubscriptionPayload) => Promise<void>;
  updateSubscription: (id: string, payload: UpdateSubscriptionPayload) => Promise<void>;
  deleteSubscription: (id: string) => Promise<void>;
  clearError: () => void;
}

export const subscriptionStore = create<SubscriptionState>((set) => ({
  subscriptions: [],
  currentPage: 1,
  totalPages: 1,
  isLoading: false,
  error: null,

  fetchSubscriptions: async (page = 1, limit = 10, sort = '-nextBillingDate') => {
    try {
      set({ isLoading: true, error: null });
      const { data } = await subscriptionAPI.getSubscriptions({
        page,
        limit,
        sort,
      });

      set({
        subscriptions: data.data,
        currentPage: data.pagination.page,
        totalPages: data.pagination.totalPages,
        isLoading: false,
      });
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch subscriptions';
      set({ isLoading: false, error: errorMessage });
      throw err;
    }
  },

  createSubscription: async (payload) => {
    try {
      set({ isLoading: true, error: null });
      const { data } = await subscriptionAPI.createSubscription(payload);

      // Add the new subscription to the list
      set((state) => ({
        subscriptions: [data, ...state.subscriptions],
        isLoading: false,
      }));
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to create subscription';
      set({ isLoading: false, error: errorMessage });
      throw err;
    }
  },

  updateSubscription: async (id, payload) => {
    try {
      set({ isLoading: true, error: null });
      const { data } = await subscriptionAPI.updateSubscription(id, payload);

      // Update the subscription in the list
      set((state) => ({
        subscriptions: state.subscriptions.map((sub) =>
          sub._id === id ? data : sub
        ),
        isLoading: false,
      }));
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to update subscription';
      set({ isLoading: false, error: errorMessage });
      throw err;
    }
  },

  deleteSubscription: async (id) => {
    try {
      set({ isLoading: true, error: null });
      await subscriptionAPI.deleteSubscription(id);

      // Remove the subscription from the list
      set((state) => ({
        subscriptions: state.subscriptions.filter((sub) => sub._id !== id),
        isLoading: false,
      }));
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to delete subscription';
      set({ isLoading: false, error: errorMessage });
      throw err;
    }
  },

  clearError: () => set({ error: null }),
}));
