import axiosInstance from './axios';

export interface MonthlyData {
  month: string;
  total: number;
}

const analyticsAPI = {
  getMonthlyData: () =>
    axiosInstance.get<MonthlyData[]>('/analytics/monthly'),
};

export default analyticsAPI;
