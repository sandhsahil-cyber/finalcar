import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricsCardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: number;
  icon: React.ReactNode;
  color: string;
  onClick?: () => void;
}

const MetricsCard: React.FC<MetricsCardProps> = ({ title, value, subtitle, trend, icon, color, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-100 p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="absolute top-0 right-0 w-24 h-24 -mr-6 -mt-6 rounded-full opacity-10" style={{ backgroundColor: color }} />
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{title}</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
          {trend !== undefined && (
            <div className={`flex items-center mt-2 text-xs font-medium ${trend > 0 ? 'text-emerald-600' : trend < 0 ? 'text-red-500' : 'text-gray-400'}`}>
              {trend > 0 ? <TrendingUp className="w-3.5 h-3.5 mr-1" /> : trend < 0 ? <TrendingDown className="w-3.5 h-3.5 mr-1" /> : <Minus className="w-3.5 h-3.5 mr-1" />}
              <span>{Math.abs(trend)}% vs last month</span>
            </div>
          )}
        </div>
        <div className="flex-shrink-0 p-3 rounded-xl" style={{ backgroundColor: `${color}15` }}>
          <div style={{ color }}>{icon}</div>
        </div>
      </div>
    </div>
  );
};

export default MetricsCard;
