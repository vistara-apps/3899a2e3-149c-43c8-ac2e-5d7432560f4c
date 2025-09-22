'use client';

import { useState } from 'react';
import { Code, Copy, Eye, EyeOff, Key, ExternalLink } from 'lucide-react';
import { Button } from './ui/Button';

export function ApiPanel() {
  const [apiKey, setApiKey] = useState('mp_live_1234567890abcdef');
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyKey = async () => {
    await navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateNewKey = () => {
    const newKey = 'mp_live_' + Math.random().toString(36).substring(2, 18);
    setApiKey(newKey);
  };

  const apiEndpoints = [
    {
      method: 'GET',
      path: '/api/rates',
      description: 'Get current USDT/USDC rates',
    },
    {
      method: 'GET',
      path: '/api/rates/history',
      description: 'Get historical rate data',
    },
    {
      method: 'POST',
      path: '/api/alerts',
      description: 'Create rate alert',
    },
  ];

  return (
    <div className="card-gradient rounded-lg p-6 golden-glow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Code className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Developer API</h3>
            <p className="text-sm text-gray-600">Integrate rate data</p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          <ExternalLink className="w-4 h-4" />
        </Button>
      </div>

      {/* API Key Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">API Key</label>
          <button
            onClick={generateNewKey}
            className="text-xs text-golden-600 hover:text-golden-700 font-medium"
          >
            Generate New
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              readOnly
              className="w-full px-3 py-2 bg-white/50 border border-golden-200 rounded-md text-sm font-mono"
            />
            <button
              onClick={() => setShowKey(!showKey)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-golden-100 rounded"
            >
              {showKey ? (
                <EyeOff className="w-4 h-4 text-gray-500" />
              ) : (
                <Eye className="w-4 h-4 text-gray-500" />
              )}
            </button>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyKey}
            className={copied ? 'bg-green-50 border-green-200' : ''}
          >
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* API Endpoints */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">Available Endpoints</h4>
        {apiEndpoints.map((endpoint, index) => (
          <div
            key={index}
            className="p-3 bg-white/50 rounded-lg border border-golden-200/50"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2 py-1 text-xs font-medium rounded ${
                endpoint.method === 'GET' 
                  ? 'bg-green-100 text-green-700'
                  : 'bg-blue-100 text-blue-700'
              }`}>
                {endpoint.method}
              </span>
              <code className="text-sm font-mono text-gray-700">{endpoint.path}</code>
            </div>
            <p className="text-xs text-gray-600">{endpoint.description}</p>
          </div>
        ))}
      </div>

      {/* Usage Stats */}
      <div className="mt-6 pt-4 border-t border-golden-200/50">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-lg font-bold text-gray-900">1,247</p>
            <p className="text-xs text-gray-600">API Calls Today</p>
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">4,892</p>
            <p className="text-xs text-gray-600">Total This Month</p>
          </div>
        </div>
      </div>
    </div>
  );
}
