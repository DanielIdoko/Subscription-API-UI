export interface User {
  data: {
    createdAt?: string;
    email: string;
    emailVerified?: boolean;
    id?: string;
    name: string;
    updatedAt?: string;
    __v?: number;
    _id: string;
  };
}

export interface Subscription {
  _id: string;
  name: string;
  price: number;
  billingCycle: "monthly" | "yearly";
  nextBillingDate: string;
  category: string;
  status: "active" | "inactive" | "paused";
  autoRenew: boolean;
}

export interface CategoryBreakdown {
  category: string;
  total: number;
}

export interface DashboardStats {
  totalMonthlySpend?: number;
  totalYearlySpend?: number;
  activeSubscriptionsCount?: number;
  upcomingRenewals?: [];
  categoryBreakdown?: CategoryBreakdown[];
}

export interface MonthlyData {
  month: string;
  total: number;
}
