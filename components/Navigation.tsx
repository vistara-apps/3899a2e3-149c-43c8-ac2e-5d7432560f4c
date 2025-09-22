'use client';

import { useState } from 'react';
import { BarChart3, Bell, Code, Settings, User } from 'lucide-react';
import { cn } from '../lib/utils';

interface NavigationProps {
  mobile?: boolean;
  onItemClick?: () => void;
}

export function Navigation({ mobile = false, onItemClick }: NavigationProps) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'api', label: 'API', icon: Code },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleItemClick = (id: string) => {
    setActiveTab(id);
    onItemClick?.();
  };

  if (mobile) {
    return (
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors duration-200',
                activeTab === item.id
                  ? 'bg-golden-100 text-golden-700'
                  : 'text-gray-600 hover:bg-golden-50 hover:text-golden-600'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className="flex items-center gap-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
              activeTab === item.id
                ? 'bg-golden-100 text-golden-700'
                : 'text-gray-600 hover:bg-golden-50 hover:text-golden-600'
            )}
          >
            <Icon className="w-4 h-4" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
