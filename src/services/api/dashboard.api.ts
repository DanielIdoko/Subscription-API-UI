import axiosInstance from './axios';

export interface CategoryBreakdown {
  category: string;
  total: number;
}

export interface DashboardStats {
  totalMonthlySpend: number;
  totalYearlySpend: number;
  activeSubscriptionsCount: number;
  upcomingRenewals: [];
  categoryBreakdown: CategoryBreakdown[];
}

const dashboardAPI = {
  getStats: () =>
    axiosInstance.get<DashboardStats>('/dashboard/stats'),
};

export default dashboardAPI;
