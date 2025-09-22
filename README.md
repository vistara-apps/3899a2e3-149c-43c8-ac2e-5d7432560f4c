# Morpho Pulse - Real-time DeFi Lending Rates

A Base Mini App providing real-time USDT and USDC lending rates from Morpho Protocol, with customizable alerts and developer-friendly APIs.

## Features

### 🔥 Core Features
- **Live Dashboard**: Real-time USDT and USDC lending rates with beautiful visualizations
- **Smart Alerts**: Customizable rate alerts via Email, Discord, and Telegram
- **Developer API**: RESTful API for integrating rate data into your applications
- **Rate Notifications**: Automated alerts for significant market movements

### 🎨 Design
- Golden wave-inspired theme with particle effects
- Mobile-first responsive design
- Smooth animations and micro-interactions
- Built with Tailwind CSS and modern UI components

### 🔗 Base Integration
- Built as a Base Mini App using MiniKit
- OnchainKit integration for wallet functionality
- Optimized for Base App and Farcaster clients

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: Base (via MiniKit & OnchainKit)
- **Icons**: Lucide React
- **Data**: Mock Morpho Protocol integration (ready for production APIs)

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/morpho-pulse.git
cd morpho-pulse
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your API keys:
```env
NEXT_PUBLIC_MINIKIT_API_KEY=your_minikit_api_key
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Documentation

### Get Current Rates
```bash
GET /api/rates
```

Response:
```json
{
  "data": {
    "rates": {
      "USDT": {
        "current": 5.24,
        "change24h": 0.12,
        "volume24h": "2.4M",
        "lastUpdated": "2024-01-15T10:30:00Z"
      },
      "USDC": {
        "current": 4.87,
        "change24h": -0.08,
        "volume24h": "1.8M",
        "lastUpdated": "2024-01-15T10:30:00Z"
      }
    },
    "protocol": "Morpho",
    "chain": "Base"
  },
  "success": true,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Get Historical Data
```bash
GET /api/rates/history?currency=USDT&hours=24
```

### Create Alert
```bash
POST /api/alerts
Content-Type: application/json

{
  "currencyPair": "USDT",
  "thresholdType": "above",
  "thresholdValue": 5.5,
  "notificationChannel": "email"
}
```

## Subscription Tiers

### Free Tier
- Basic rate monitoring
- Up to 3 alerts
- 100 API calls/month
- Email notifications

### Pro Tier ($5/month)
- Advanced rate monitoring
- Unlimited alerts
- 10K API calls/month
- All notification channels
- Historical data access
- Priority support

### Enterprise Tier (Custom)
- Everything in Pro
- Unlimited API calls
- Custom integrations
- Dedicated support
- SLA guarantee

## Project Structure

```
morpho-pulse/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home page
│   └── providers.tsx      # App providers
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── Dashboard.tsx     # Main dashboard
│   ├── RateCard.tsx      # Rate display cards
│   ├── AlertsPanel.tsx   # Alert management
│   └── ApiPanel.tsx      # API key management
├── lib/                  # Utilities and types
│   ├── utils.ts          # Helper functions
│   ├── types.ts          # TypeScript types
│   └── constants.ts      # App constants
└── public/               # Static assets
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Roadmap

- [ ] Real Morpho Protocol integration
- [ ] Advanced charting and analytics
- [ ] Portfolio tracking
- [ ] Mobile app (React Native)
- [ ] Webhook notifications
- [ ] Multi-chain support

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- Email: support@morphopulse.com
- Discord: [Join our community](https://discord.gg/morphopulse)
- Documentation: [docs.morphopulse.com](https://docs.morphopulse.com)

---

Built with ❤️ for the Base ecosystem and DeFi community.
