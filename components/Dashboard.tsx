'use client';

import { useState, useEffect } from 'react';
import { RateCard } from './RateCard';
import { AlertsPanel } from './AlertsPanel';
import { ApiPanel } from './ApiPanel';
import { StatsOverview } from './StatsOverview';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface RateData {
  currency: 'USDT' | 'USDC';
  rate: number;
  change24h: number;
  volume: string;
  lastUpdated: Date;
}

export function Dashboard() {
  const [rates, setRates] = useState<RateData[]>([
    {
      currency: 'USDT',
      rate: 5.24,
      change24h: 0.12,
      volume: '$2.4M',
      lastUpdated: new Date(),
    },
    {
      currency: 'USDC',
      rate: 4.87,
      change24h: -0.08,
      volume: '$1.8M',
      lastUpdated: new Date(),
    },
  ]);

  const [isLoading, setIsLoading] = useState(true);

  // Simulate real-time rate updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRates(prevRates =>
        prevRates.map(rate => ({
          ...rate,
          rate: rate.rate + (Math.random() - 0.5) * 0.1,
          change24h: rate.change24h + (Math.random() - 0.5) * 0.05,
          lastUpdated: new Date(),
        }))
      );
    }, 5000);

    // Initial loading simulation
    setTimeout(() => setIsLoading(false), 1500);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-golden-200 border-t-golden-500 rounded-full animate-spin mx-auto"></div>
          <h2 className="text-2xl font-bold text-gray-900">Loading Live Rates...</h2>
          <p className="text-gray-600">Fetching latest data from Morpho Protocol</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-golden-100 text-golden-700 px-4 py-2 rounded-full text-sm font-medium">
          <Activity className="w-4 h-4 animate-pulse" />
          Live Data
        </div>
        <h1 className="text-4xl font-bold text-gray-900 text-balance">
          Real-time DeFi Lending Rates
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto text-balance">
          Track USDT and USDC lending rates on Morpho Protocol with instant alerts and developer-friendly APIs.
        </p>
      </div>

      {/* Stats Overview */}
      <StatsOverview rates={rates} />

      {/* Rate Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rates.map((rate) => (
          <RateCard key={rate.currency} data={rate} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AlertsPanel />
        <ApiPanel />
      </div>

      {/* Market Insights */}
      <div className="card-gradient rounded-lg p-6 golden-glow">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Market Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white/50 rounded-lg">
            <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">24h High</p>
            <p className="text-lg font-bold text-gray-900">5.31%</p>
          </div>
          <div className="text-center p-4 bg-white/50 rounded-lg">
            <TrendingDown className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">24h Low</p>
            <p className="text-lg font-bold text-gray-900">4.72%</p>
          </div>
          <div className="text-center p-4 bg-white/50 rounded-lg">
            <Activity className="w-8 h-8 text-golden-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Avg Rate</p>
            <p className="text-lg font-bold text-gray-900">5.06%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
