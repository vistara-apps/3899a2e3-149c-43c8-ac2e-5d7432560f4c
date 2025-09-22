'use client';

import { useState } from 'react';
import { Menu, X, Zap, Bell, Code, Settings } from 'lucide-react';
import { Navigation } from './Navigation';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-golden-200/50">
        <div className="max-w-screen-lg mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-golden-400 to-golden-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Morpho Pulse</h1>
              <p className="text-xs text-golden-600 -mt-1">Real-time DeFi rates</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <Navigation />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-golden-100 transition-colors duration-200"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-golden-200/50 bg-white/95 backdrop-blur-md">
            <div className="px-4 py-4">
              <Navigation mobile onItemClick={() => setIsMobileMenuOpen(false)} />
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-screen-lg mx-auto px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-golden-200/50 bg-white/50 backdrop-blur-sm mt-12">
        <div className="max-w-screen-lg mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-golden-400 to-golden-600 rounded flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-gray-900">Morpho Pulse</span>
            </div>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              Real-time DeFi lending rates from Morpho Protocol. Stay informed, stay profitable.
            </p>
            <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
              <span>Built on Base</span>
              <span>•</span>
              <span>Powered by Morpho</span>
              <span>•</span>
              <span>v1.0.0</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
