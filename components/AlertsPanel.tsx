'use client';

import { useState } from 'react';
import { Bell, Plus, Settings, Trash2 } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

interface Alert {
  id: string;
  currency: 'USDT' | 'USDC';
  threshold: number;
  type: 'above' | 'below';
  channel: 'email' | 'discord' | 'telegram';
  active: boolean;
}

export function AlertsPanel() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      currency: 'USDT',
      threshold: 5.5,
      type: 'above',
      channel: 'email',
      active: true,
    },
    {
      id: '2',
      currency: 'USDC',
      threshold: 4.5,
      type: 'below',
      channel: 'discord',
      active: false,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newAlert, setNewAlert] = useState({
    currency: 'USDT' as 'USDT' | 'USDC',
    threshold: '',
    type: 'above' as 'above' | 'below',
    channel: 'email' as 'email' | 'discord' | 'telegram',
  });

  const handleAddAlert = () => {
    if (!newAlert.threshold) return;

    const alert: Alert = {
      id: Date.now().toString(),
      currency: newAlert.currency,
      threshold: parseFloat(newAlert.threshold),
      type: newAlert.type,
      channel: newAlert.channel,
      active: true,
    };

    setAlerts([...alerts, alert]);
    setNewAlert({
      currency: 'USDT',
      threshold: '',
      type: 'above',
      channel: 'email',
    });
    setShowAddForm(false);
  };

  const toggleAlert = (id: string) => {
    setAlerts(alerts.map(alert =>
      alert.id === id ? { ...alert, active: !alert.active } : alert
    ));
  };

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  return (
    <div className="card-gradient rounded-lg p-6 golden-glow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Bell className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Rate Alerts</h3>
            <p className="text-sm text-gray-600">{alerts.length} configured</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Add Alert Form */}
      {showAddForm && (
        <div className="mb-6 p-4 bg-white/50 rounded-lg border border-golden-200/50">
          <h4 className="font-medium text-gray-900 mb-4">Create New Alert</h4>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <select
              value={newAlert.currency}
              onChange={(e) => setNewAlert({ ...newAlert, currency: e.target.value as 'USDT' | 'USDC' })}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="USDT">USDT</option>
              <option value="USDC">USDC</option>
            </select>
            <select
              value={newAlert.type}
              onChange={(e) => setNewAlert({ ...newAlert, type: e.target.value as 'above' | 'below' })}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="above">Above</option>
              <option value="below">Below</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Input
              type="number"
              step="0.01"
              placeholder="Rate %"
              value={newAlert.threshold}
              onChange={(e) => setNewAlert({ ...newAlert, threshold: e.target.value })}
            />
            <select
              value={newAlert.channel}
              onChange={(e) => setNewAlert({ ...newAlert, channel: e.target.value as 'email' | 'discord' | 'telegram' })}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="email">Email</option>
              <option value="discord">Discord</option>
              <option value="telegram">Telegram</option>
            </select>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleAddAlert} size="sm">
              Create Alert
            </Button>
            <Button variant="outline" onClick={() => setShowAddForm(false)} size="sm">
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Alerts List */}
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-golden-200/50"
          >
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${alert.active ? 'bg-green-500' : 'bg-gray-300'}`} />
              <div>
                <p className="font-medium text-gray-900">
                  {alert.currency} {alert.type} {alert.threshold}%
                </p>
                <p className="text-xs text-gray-600 capitalize">
                  via {alert.channel}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleAlert(alert.id)}
                className="p-1 hover:bg-golden-100 rounded transition-colors duration-200"
              >
                <Settings className="w-4 h-4 text-gray-500" />
              </button>
              <button
                onClick={() => deleteAlert(alert.id)}
                className="p-1 hover:bg-red-100 rounded transition-colors duration-200"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {alerts.length === 0 && (
        <div className="text-center py-8">
          <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No alerts configured</p>
          <p className="text-sm text-gray-400">Create your first alert to get started</p>
        </div>
      )}
    </div>
  );
}
