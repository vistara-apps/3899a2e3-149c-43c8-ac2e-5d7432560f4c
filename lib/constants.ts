export const APP_CONFIG = {
  name: 'Morpho Pulse',
  description: 'Real-time DeFi lending rates, instantly.',
  version: '1.0.0',
  author: 'Morpho Pulse Team',
  website: 'https://morphopulse.com',
  support: 'support@morphopulse.com',
} as const;

export const SUBSCRIPTION_TIERS = {
  free: {
    name: 'Free',
    price: 0,
    features: [
      'Basic rate monitoring',
      'Up to 3 alerts',
      '100 API calls/month',
      'Email notifications',
    ],
    limits: {
      alerts: 3,
      apiCalls: 100,
      channels: ['email'],
    },
  },
  pro: {
    name: 'Pro',
    price: 5,
    features: [
      'Advanced rate monitoring',
      'Unlimited alerts',
      '10K API calls/month',
      'All notification channels',
      'Historical data access',
      'Priority support',
    ],
    limits: {
      alerts: -1, // unlimited
      apiCalls: 10000,
      channels: ['email', 'discord', 'telegram'],
    },
  },
  enterprise: {
    name: 'Enterprise',
    price: 'custom',
    features: [
      'Everything in Pro',
      'Unlimited API calls',
      'Custom integrations',
      'Dedicated support',
      'SLA guarantee',
      'White-label options',
    ],
    limits: {
      alerts: -1,
      apiCalls: -1,
      channels: ['email', 'discord', 'telegram', 'webhook'],
    },
  },
} as const;

export const RATE_UPDATE_INTERVALS = {
  realtime: 5000, // 5 seconds
  fast: 30000, // 30 seconds
  normal: 60000, // 1 minute
  slow: 300000, // 5 minutes
} as const;

export const API_ENDPOINTS = {
  rates: '/api/rates',
  ratesHistory: '/api/rates/history',
  alerts: '/api/alerts',
  users: '/api/users',
  auth: '/api/auth',
  webhooks: '/api/webhooks',
} as const;

export const NOTIFICATION_CHANNELS = {
  email: {
    name: 'Email',
    icon: '📧',
    description: 'Receive alerts via email',
  },
  discord: {
    name: 'Discord',
    icon: '💬',
    description: 'Get notified in Discord',
  },
  telegram: {
    name: 'Telegram',
    icon: '📱',
    description: 'Instant Telegram messages',
  },
} as const;

export const CURRENCY_INFO = {
  USDT: {
    name: 'Tether USD',
    symbol: '₮',
    color: 'green',
    decimals: 6,
  },
  USDC: {
    name: 'USD Coin',
    symbol: '$',
    color: 'blue',
    decimals: 6,
  },
} as const;

export const MORPHO_CONFIG = {
  protocol: 'Morpho',
  website: 'https://morpho.finance',
  docs: 'https://docs.morpho.finance',
  contracts: {
    base: {
      morpho: '0x...',
      usdt: '0x...',
      usdc: '0x...',
    },
  },
} as const;

export const THEME_CONFIG = {
  colors: {
    primary: 'hsl(220 89.8% 46.1%)',
    golden: {
      50: '#fefdf8',
      100: '#fef7cd',
      200: '#feeb95',
      300: '#fdd955',
      400: '#fbc638',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
  },
  animations: {
    duration: {
      fast: 150,
      normal: 200,
      slow: 300,
    },
    easing: 'cubic-bezier(0.22,1,0.36,1)',
  },
} as const;

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  API_ERROR: 'API error. Please try again later.',
  INVALID_INPUT: 'Invalid input. Please check your data.',
  UNAUTHORIZED: 'Unauthorized. Please sign in.',
  RATE_LIMIT: 'Rate limit exceeded. Please try again later.',
  SERVER_ERROR: 'Server error. Please contact support.',
} as const;

export const SUCCESS_MESSAGES = {
  ALERT_CREATED: 'Alert created successfully!',
  ALERT_UPDATED: 'Alert updated successfully!',
  ALERT_DELETED: 'Alert deleted successfully!',
  SETTINGS_SAVED: 'Settings saved successfully!',
  API_KEY_GENERATED: 'New API key generated successfully!',
} as const;
