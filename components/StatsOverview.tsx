'use client';

import { Activity, Users, Zap, TrendingUp } from 'lucide-react';

interface RateData {
  currency: 'USDT' | 'USDC';
  rate: number;
  change24h: number;
  volume: string;
  lastUpdated: Date;
}

interface StatsOverviewProps {
  rates: RateData[];
}

export function StatsOverview({ rates }: StatsOverviewProps) {
  const avgRate = rates.reduce((sum, rate) => sum + rate.rate, 0) / rates.length;
  const totalVolumeNum = rates.reduce((sum, rate) => {
    const volume = parseFloat(rate.volume.replace(/[$M]/g, ''));
    return sum + volume;
  }, 0);

  const stats = [
    {
      label: 'Average Rate',
      value: `${avgRate.toFixed(2)}%`,
      icon: Activity,
      color: 'text-golden-600',
      bg: 'bg-golden-100',
    },
    {
      label: 'Total Volume',
      value: `$${totalVolumeNum.toFixed(1)}M`,
      icon: TrendingUp,
      color: 'text-green-600',
      bg: 'bg-green-100',
    },
    {
      label: 'Active Alerts',
      value: '24',
      icon: Zap,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
    },
    {
      label: 'API Calls',
      value: '1.2K',
      icon: Users,
      color: 'text-purple-600',
      bg: 'bg-purple-100',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="card-gradient rounded-lg p-4 text-center hover:scale-105 transition-transform duration-200"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`w-12 h-12 ${stat.bg} rounded-full flex items-center justify-center mx-auto mb-3`}>
              <Icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
}
