import React from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import type { Subscription } from '../types/types';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

interface SubscriptionCardProps {
  subscription: Subscription;
  onEdit?: (subscription: Subscription) => void;
  onDelete?: (id: string) => void;
  isDeleting?: boolean;
}

const categoryColors: Record<string, { bg: string; text: string; icon: string }> = {
  entertainment: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-300', icon: '🎬' },
  productivity: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', icon: '💼' },
  health: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-300', icon: '🏥' },
  education: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-300', icon: '📚' },
  finance: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300', icon: '💰' },
  other: { bg: 'bg-gray-100 dark:bg-gray-900/30', text: 'text-gray-700 dark:text-gray-300', icon: '📦' },
};

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  subscription,
  onEdit,
  onDelete,
  isDeleting = false,
}) => {
  const category = categoryColors[subscription.category.toLowerCase()] || categoryColors.other;
  const nextBillingDate = new Date(subscription.nextBillingDate);
  const daysUntilRenewal = Math.ceil(
    (nextBillingDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const statusColor =
    subscription.status === 'active'
      ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20'
      : subscription.status === 'paused'
        ? 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20'
        : 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20';

  return (
    <Card>
      <CardContent className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start gap-3">
              <div className={`text-2xl ${category.bg} rounded-lg p-2 shrink-0`}>
                {category.icon}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-sans text-gray-900 dark:text-gray-100 truncate">{subscription.name}</h3>
                <p className={`text-x-small font-sans px-2 py-1 rounded-md w-fit mt-1 ${statusColor}`}>
                  {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-small font-sans">Price</p>
              <p className="font-sans font-semibold text-small text-gray-900 dark:text-gray-100">
                ${subscription.price}/{subscription.billingCycle === 'monthly' ? 'mo' : 'yr'}
              </p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-xs font-sans">Next Renewal</p>
              <p className="font-sans  font-semibold text-gray-900 dark:text-gray-100">
                {daysUntilRenewal > 0 ? `In ${daysUntilRenewal} days` : 'Today'}
              </p>
            </div>
          </div>

          <div className="mt-3">
            <span className={`text-xs px-2 py-1 rounded-md font-sans ${category.bg} ${category.text}`}>
              {subscription.category}
            </span>
            {subscription.autoRenew && (
              <span className="text-xs px-2 py-1 rounded-md font-sans bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 ml-2">
                Auto-renew
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2 shrink-0">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onEdit?.(subscription)}
            className="p-2"
            title="Edit"
          >
            <FiEdit2 className="w-4 h-4" />
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete?.(subscription._id)}
            isLoading={isDeleting}
            className="p-2"
            title="Delete"
          >
            <FiTrash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
