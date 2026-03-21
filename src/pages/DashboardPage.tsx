import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import {
  FiTrendingUp,
  FiCreditCard,
  FiClock,
  FiAlertCircle,
  FiPlus,
  FiChevronRight,
} from "react-icons/fi";
import { DashboardLayout } from "../components/DashboardLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { StatsCard } from "../components/ui/StatsCard";
import { Button } from "../components/ui/Button";
import { Spinner } from "../components/ui/Spinner";
import { SubscriptionCard } from "../components/SubscriptionCard";
import { dashboardStore } from "../store/dashboardStore";
import { subscriptionStore } from "../store/subscriptionStore";

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { stats, isLoading: statsLoading, fetchStats } = dashboardStore();
  const {
    subscriptions,
    isLoading: subsLoading,
    fetchSubscriptions,
  } = subscriptionStore();

  useEffect(() => {
    fetchStats();
    fetchSubscriptions(1, 5);
  }, [fetchStats, fetchSubscriptions]);

  const recentSubscriptions = subscriptions.slice(0, 5);

  if (statsLoading || subsLoading) {
    return (
      <DashboardLayout>
        <div
          className="flex items-center justify-center"
          style={{ minHeight: 400 }}
        >
          <Spinner size="sm" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout greeting>
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            icon={<FiCreditCard />}
            label="Monthly Spend"
            value={`$${stats?.totalMonthlySpend || 0}`}
            change="+5% from last month"
            changeType="neutral"
          />
          <StatsCard
            icon={<FiTrendingUp />}
            label="Active Subscriptions"
            value={stats?.activeSubscriptionsCount || 0}
            change={`${stats?.activeSubscriptionsCount! || 0} active today`}
            changeType="positive"
          />
          <StatsCard
            icon={<FiClock />}
            label="Upcoming Renewals"
            value={stats?.upcomingRenewals?.length || 0}
            change="Next 7 days"
            changeType="neutral"
          />
          <StatsCard
            icon={<FiAlertCircle />}
            label="Categories"
            value={stats?.categoryBreakdown?.length || 0}
            change="Well organized"
            changeType="positive"
          />
        </div>

        {/* Category Breakdown */}
        {stats && stats?.categoryBreakdown?.length! > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Spending by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.categoryBreakdown?.map((category) => (
                  <div
                    key={category.category}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                      {category.category}
                    </span>
                    <div className="flex items-center gap-4">
                      <div className="w-32 bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full"
                          style={{
                            width: `${
                              (category.total /
                                (stats.totalMonthlySpend || 1)) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 w-16 text-right">
                        ${category.total}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Subscriptions */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-inter text-gray-900 dark:text-gray-100 px-2">
              Recent Subscriptions
            </h2>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate("/subscriptions")}
            >
              View All
              <FiChevronRight size={13} color="#fff" />
            </Button>
          </div>

          {recentSubscriptions.length > 0 ? (
            <div className="space-y-4">
              {recentSubscriptions.map((sub) => (
                <SubscriptionCard
                  key={sub._id}
                  subscription={sub}
                  onEdit={() => navigate(`/subscriptions?edit=${sub._id}`)}
                  onDelete={() => navigate(`/subscriptions?delete=${sub._id}`)}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FiCreditCard className="w-12 h-12 text-gray-300 mb-4" />
                <h3 className="text-sm font-inter text-gray-700">
                  No subscriptions yet
                </h3>
                <p className="text-gray-500 font-sans text-center text-xs mb-6">
                  Add your first subscription to start tracking
                </p>
                <Button
                  onClick={() => navigate("/subscriptions")}
                  variant="outline"
                >
                  Add Subscription <FiPlus size={13}/>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
