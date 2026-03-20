import axiosInstance from './axios';

export interface Subscription {
  _id: string;
  name: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  nextBillingDate: string;
  category: string;
  status: 'active' | 'inactive' | 'paused';
  autoRenew: boolean;
}

export interface CreateSubscriptionPayload {
  name: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  nextBillingDate: string;
  category: string;
  autoRenew: boolean;
}

export interface UpdateSubscriptionPayload {
  name?: string;
  price?: number;
  billingCycle?: 'monthly' | 'yearly';
  nextBillingDate?: string;
  category?: string;
  autoRenew?: boolean;
}

export interface SubscriptionsResponse {
  data: Subscription[];
  pagination: {
    page: number;
    totalPages: number;
  };
}

export interface DeleteSubscriptionResponse {
  message: string;
}

interface FetchSubscriptionsParams {
  page?: number;
  limit?: number;
  sort?: string;
}

const subscriptionAPI = {
  getSubscriptions: (params?: FetchSubscriptionsParams) =>
    axiosInstance.get<SubscriptionsResponse>('/subscriptions', { params }),

  createSubscription: (payload: CreateSubscriptionPayload) =>
    axiosInstance.post<Subscription>('/subscriptions', payload),

  updateSubscription: (id: string, payload: UpdateSubscriptionPayload) =>
    axiosInstance.put<Subscription>(`/subscriptions/${id}`, payload),

  deleteSubscription: (id: string) =>
    axiosInstance.delete<DeleteSubscriptionResponse>(`/subscriptions/${id}`),
};

export default subscriptionAPI;
