'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Clock, DollarSign } from 'lucide-react';
import { cn } from '../lib/utils';

interface RateData {
  currency: 'USDT' | 'USDC';
  rate: number;
  change24h: number;
  volume: string;
  lastUpdated: Date;
}

interface RateCardProps {
  data: RateData;
}

export function RateCard({ data }: RateCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [previousRate, setPreviousRate] = useState(data.rate);

  useEffect(() => {
    if (data.rate !== previousRate) {
      setIsUpdating(true);
      setPreviousRate(data.rate);
      const timer = setTimeout(() => setIsUpdating(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [data.rate, previousRate]);

  const isPositiveChange = data.change24h >= 0;
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className={cn(
      'card-gradient rounded-lg p-6 golden-glow transition-all duration-300',
      isUpdating && 'animate-pulse-golden scale-105'
    )}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            'w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg',
            data.currency === 'USDT' 
              ? 'bg-gradient-to-br from-green-400 to-green-600'
              : 'bg-gradient-to-br from-blue-400 to-blue-600'
          )}>
            {data.currency === 'USDT' ? '₮' : '$'}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{data.currency}</h3>
            <p className="text-sm text-gray-600">Morpho Protocol</p>
          </div>
        </div>
        
        <div className={cn(
          'flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium',
          isPositiveChange 
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-700'
        )}>
          {isPositiveChange ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          {isPositiveChange ? '+' : ''}{data.change24h.toFixed(2)}%
        </div>
      </div>

      {/* Rate Display */}
      <div className="mb-6">
        <div className="flex items-baseline gap-2 mb-2">
          <span className={cn(
            'text-4xl font-bold transition-colors duration-300',
            isUpdating ? 'text-golden-600' : 'text-gray-900'
          )}>
            {data.rate.toFixed(2)}%
          </span>
          <span className="text-lg text-gray-600">APY</span>
        </div>
        
        {isUpdating && (
          <div className="shimmer-effect h-1 bg-golden-200 rounded-full overflow-hidden">
            <div className="h-full bg-golden-500 rounded-full"></div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-golden-200/50">
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-gray-500" />
          <div>
            <p className="text-xs text-gray-500">24h Volume</p>
            <p className="font-semibold text-gray-900">{data.volume}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <div>
            <p className="text-xs text-gray-500">Last Update</p>
            <p className="font-semibold text-gray-900">{formatTime(data.lastUpdated)}</p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button className="w-full mt-4 bg-gradient-to-r from-golden-400 to-golden-600 text-white py-3 rounded-lg font-medium hover:from-golden-500 hover:to-golden-700 transition-all duration-200 transform hover:scale-105">
        Set Alert for {data.currency}
      </button>
    </div>
  );
}
