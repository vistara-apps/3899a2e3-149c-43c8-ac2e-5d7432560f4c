import { NextRequest, NextResponse } from 'next/server';
import { HistoricalRateData } from '../../../../lib/types';

// Generate mock historical data
const generateHistoricalData = (currency: 'USDT' | 'USDC', hours = 24): HistoricalRateData[] => {
  const data: HistoricalRateData[] = [];
  const baseRate = currency === 'USDT' ? 5.2 : 4.8;
  const now = new Date();

  for (let i = hours; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
    const variation = (Math.random() - 0.5) * 0.6;
    const rate = baseRate + variation;

    data.push({
      timestamp,
      rate: Math.max(0, rate), // Ensure non-negative rates
      currency,
    });
  }

  return data;
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const currency = searchParams.get('currency') as 'USDT' | 'USDC' | null;
    const hours = parseInt(searchParams.get('hours') || '24');
    const apiKey = request.headers.get('x-api-key');

    // Validate parameters
    if (currency && !['USDT', 'USDC'].includes(currency)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid currency',
          message: 'Currency must be USDT or USDC',
        },
        { status: 400 }
      );
    }

    if (hours < 1 || hours > 168) { // Max 1 week
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid time range',
          message: 'Hours must be between 1 and 168 (1 week)',
        },
        { status: 400 }
      );
    }

    // Mock API key validation for premium features
    if (hours > 24 && !apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: 'API key required',
          message: 'Historical data beyond 24 hours requires a valid API key',
        },
        { status: 401 }
      );
    }

    let historicalData: HistoricalRateData[] = [];

    if (currency) {
      // Get data for specific currency
      historicalData = generateHistoricalData(currency, hours);
    } else {
      // Get data for both currencies
      const usdtData = generateHistoricalData('USDT', hours);
      const usdcData = generateHistoricalData('USDC', hours);
      historicalData = [...usdtData, ...usdcData];
    }

    return NextResponse.json({
      data: {
        rates: historicalData,
        currency: currency || 'ALL',
        timeRange: `${hours}h`,
        dataPoints: historicalData.length,
      },
      success: true,
      timestamp: new Date(),
    });

  } catch (error) {
    console.error('Error fetching historical rates:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'Failed to fetch historical rate data',
        timestamp: new Date(),
      },
      { status: 500 }
    );
  }
}
