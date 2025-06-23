import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: 'red' | 'orange' | 'yellow' | 'green' | 'blue';
  trend?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon: Icon, color, trend }) => {
  const colorClasses = {
    red: 'bg-red-600 text-red-100',
    orange: 'bg-orange-600 text-orange-100',
    yellow: 'bg-yellow-600 text-yellow-100',
    green: 'bg-green-600 text-green-100',
    blue: 'bg-blue-600 text-blue-100',
  };

  const trendColor = trend?.startsWith('+') ? 'text-red-400' : trend?.startsWith('-') ? 'text-green-400' : 'text-gray-400';

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors">
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
        {trend && (
          <span className={`text-xs font-medium ${trendColor}`}>
            {trend}
          </span>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-bold">{value}</h3>
        <p className="text-sm text-gray-400 mt-1">{title}</p>
      </div>
    </div>
  );
};

export default MetricCard;