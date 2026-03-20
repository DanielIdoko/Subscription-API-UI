import React from 'react';
import { Card, CardContent } from './Card';

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  icon,
  label,
  value,
  change,
  changeType = 'neutral',
  className = 'border border-slate-200',
}) => {
  const changeColor =
    changeType === 'positive'
      ? 'text-green-600 dark:text-green-400'
      : changeType === 'negative'
        ? 'text-red-600 dark:text-red-400'
        : 'text-gray-600 dark:text-gray-400';

  return (
    <Card className={className}>
      <CardContent className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300 font-inter">{label}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-2 font-sans">{value}</p>
          {change && (
            <p className={`text-xs font-sans mt-2 ${changeColor}`}>{change}</p>
          )}
        </div>
        <div className="ml-4 p-3 bg-blue-50 dark:bg-slate-700 rounded-lg text-blue-600 dark:text-blue-200 text-2xl">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
};
