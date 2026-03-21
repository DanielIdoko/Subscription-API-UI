import React, { useEffect } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Spinner } from '../components/ui/Spinner';
import { analyticsStore } from '../store/analyticsStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const AnalyticsPage: React.FC = () => {
  const { monthlyData, isLoading, fetchMonthlyData } = analyticsStore();

  useEffect(() => {
    fetchMonthlyData();
  }, [fetchMonthlyData]);

  if (isLoading) {
    return (
      <DashboardLayout title="Analytics" greeting={false}>
        <div className="flex items-center justify-center" style={{ minHeight: 400 }}>
          <Spinner size="lg" />
        </div>
      </DashboardLayout>
    );
  }

  const totalSpent = monthlyData.reduce((sum, d) => sum + d.total, 0);
  const averageMonthly = monthlyData.length > 0 ? totalSpent / monthlyData.length : 0;
  const highestMonth = Math.max(...monthlyData.map((d) => d.total), 0);

  return (
    <DashboardLayout title="Analytics" greeting={false}>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-600 font-sans">Total Spending</p>
              <p className="text-3xl font-sans text-gray-900 mt-2">
                ${totalSpent.toFixed(2)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-600 font-sans">Average Monthly</p>
              <p className="text-3xl font-sans text-gray-900 mt-2">
                ${averageMonthly.toFixed(2)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-600 font-sans">Highest Month</p>
              <p className="text-3xl font-sans text-gray-900 mt-2">
                ${highestMonth.toFixed(2)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-600 font-sans">Months Tracked</p>
              <p className="text-3xl font-sans text-gray-900 mt-2">{monthlyData.length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Spending Trend</CardTitle>
          </CardHeader>
          <CardContent>
            {monthlyData.length > 0 ? (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                      tickFormatter={(value: number) => `$${value}`}
                    />
                    {/* <Tooltip
                      formatter={(value: number | undefined) => value !== undefined ? [`$${value}`, 'Amount'] : ['N/A', 'Amount']}
                      labelStyle={{ color: '#374151' }}
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      }}
                    /> */}
                    <Bar
                      dataKey="total"
                      fill="url(#colorGradient)"
                      radius={[4, 4, 0, 0]}
                    />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0.8} />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="empty-info">No data available yet</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Detailed Table */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Details</CardTitle>
          </CardHeader>
          <CardContent>
            {monthlyData.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Month</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">Amount</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">% of Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyData.map((data) => {
                      const percentage = ((data.total / totalSpent) * 100).toFixed(1);
                      return (
                        <tr key={data.month} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-gray-700">{data.month}</td>
                          <td className="text-right py-3 px-4 font-semibold text-gray-900">
                            ${data.total}
                          </td>
                          <td className="text-right py-3 px-4 text-gray-600">{percentage}%</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="empty-info">No data available yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;
