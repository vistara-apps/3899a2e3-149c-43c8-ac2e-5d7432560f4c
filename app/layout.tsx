import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Morpho Pulse - Real-time DeFi Lending Rates',
  description: 'Real-time USDT and USDC lending rates from Morpho, with alerts and API for developers.',
  keywords: ['DeFi', 'Morpho', 'lending', 'rates', 'USDT', 'USDC', 'Base'],
  authors: [{ name: 'Morpho Pulse Team' }],
  openGraph: {
    title: 'Morpho Pulse',
    description: 'Real-time DeFi lending rates, instantly.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen particle-bg">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
