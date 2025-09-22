import { NextRequest, NextResponse } from 'next/server';
import { RateResponse } from '../../../lib/types';

// Mock data for demonstration - in production, this would fetch from Morpho Protocol
const generateMockRates = (): RateResponse => {
  const baseUSDTRate = 5.2;
  const baseUSDCRate = 4.8;
  
  // Add some realistic variation
  const usdtVariation = (Math.random() - 0.5) * 0.4;
  const usdcVariation = (Math.random() - 0.5) * 0.3;
  
  return {
    rates: {
      USDT: {
        current: baseUSDTRate + usdtVariation,
        change24h: (Math.random() - 0.5) * 0.5,
        volume24h: `${(2.1 + Math.random() * 0.8).toFixed(1)}M`,
        lastUpdated: new Date(),
      },
      USDC: {
        current: baseUSDCRate + usdcVariation,
        change24h: (Math.random() - 0.5) * 0.4,
        volume24h: `${(1.6 + Math.random() * 0.6).toFixed(1)}M`,
        lastUpdated: new Date(),
      },
    },
    protocol: 'Morpho',
    chain: 'Base',
  };
};

export async function GET(request: NextRequest) {
  try {
    // In production, you would:
    // 1. Validate API key from headers
    // 2. Check rate limits
    // 3. Fetch real data from Morpho contracts or subgraph
    // 4. Cache results appropriately

    const apiKey = request.headers.get('x-api-key');
    
    // Mock API key validation
    if (!apiKey && request.nextUrl.searchParams.get('require_auth') === 'true') {
      return NextResponse.json(
        { 
          success: false, 
          error: 'API key required',
          message: 'Please provide a valid API key in the x-api-key header'
        },
        { status: 401 }
      );
    }

    const rateData = generateMockRates();

    return NextResponse.json({
      data: rateData,
      success: true,
      timestamp: new Date(),
    });

  } catch (error) {
    console.error('Error fetching rates:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'Failed to fetch rate data',
        timestamp: new Date(),
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
    },
  });
}
