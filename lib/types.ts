export interface User {
  userId: string;
  email?: string;
  discordId?: string;
  telegramId?: string;
  alertThresholds: AlertThreshold[];
  subscriptionTier: SubscriptionTier;
  createdAt: Date;
  updatedAt: Date;
}

export interface Alert {
  alertId: string;
  userId: string;
  currencyPair: CurrencyPair;
  thresholdType: ThresholdType;
  thresholdValue: number;
  notificationChannel: NotificationChannel;
  createdAt: Date;
  status: AlertStatus;
  lastTriggered?: Date;
}

export interface RateData {
  timestamp: Date;
  usdtRate: number;
  usdcRate: number;
  protocol: 'morpho';
  blockNumber?: number;
  transactionHash?: string;
}

export interface AlertThreshold {
  currency: CurrencyPair;
  threshold: number;
  type: ThresholdType;
  active: boolean;
}

export type CurrencyPair = 'USDT' | 'USDC';
export type ThresholdType = 'above' | 'below';
export type NotificationChannel = 'email' | 'discord' | 'telegram';
export type AlertStatus = 'active' | 'paused' | 'triggered' | 'expired';
export type SubscriptionTier = 'free' | 'pro' | 'enterprise';

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
  timestamp: Date;
}

export interface RateResponse {
  rates: {
    USDT: {
      current: number;
      change24h: number;
      volume24h: string;
      lastUpdated: Date;
    };
    USDC: {
      current: number;
      change24h: number;
      volume24h: string;
      lastUpdated: Date;
    };
  };
  protocol: string;
  chain: string;
}

export interface HistoricalRateData {
  timestamp: Date;
  rate: number;
  currency: CurrencyPair;
}

export interface ApiKeyData {
  key: string;
  userId: string;
  tier: SubscriptionTier;
  callsToday: number;
  callsThisMonth: number;
  rateLimit: number;
  createdAt: Date;
  lastUsed?: Date;
}

export interface NotificationPreferences {
  email: boolean;
  discord: boolean;
  telegram: boolean;
  pushNotifications: boolean;
  frequency: 'instant' | 'hourly' | 'daily';
}

export interface UserSettings {
  userId: string;
  notifications: NotificationPreferences;
  timezone: string;
  currency: string;
  theme: 'light' | 'dark' | 'auto';
  apiAccess: boolean;
}
