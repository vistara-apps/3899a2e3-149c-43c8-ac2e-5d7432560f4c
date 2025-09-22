import { NextRequest, NextResponse } from 'next/server';
import { Alert } from '../../../lib/types';

// Mock alert storage (in production, use a database)
let mockAlerts: Alert[] = [
  {
    alertId: '1',
    userId: 'user_123',
    currencyPair: 'USDT',
    thresholdType: 'above',
    thresholdValue: 5.5,
    notificationChannel: 'email',
    createdAt: new Date(),
    status: 'active',
  },
  {
    alertId: '2',
    userId: 'user_123',
    currencyPair: 'USDC',
    thresholdType: 'below',
    thresholdValue: 4.5,
    notificationChannel: 'discord',
    createdAt: new Date(),
    status: 'paused',
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const userId = searchParams.get('userId') || 'user_123'; // Mock user ID
    const status = searchParams.get('status');

    let filteredAlerts = mockAlerts.filter(alert => alert.userId === userId);

    if (status) {
      filteredAlerts = filteredAlerts.filter(alert => alert.status === status);
    }

    return NextResponse.json({
      data: {
        alerts: filteredAlerts,
        total: filteredAlerts.length,
      },
      success: true,
      timestamp: new Date(),
    });

  } catch (error) {
    console.error('Error fetching alerts:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'Failed to fetch alerts',
        timestamp: new Date(),
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { currencyPair, thresholdType, thresholdValue, notificationChannel, userId } = body;

    // Validate required fields
    if (!currencyPair || !thresholdType || !thresholdValue || !notificationChannel) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields',
          message: 'currencyPair, thresholdType, thresholdValue, and notificationChannel are required',
        },
        { status: 400 }
      );
    }

    // Validate field values
    if (!['USDT', 'USDC'].includes(currencyPair)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid currency pair',
          message: 'currencyPair must be USDT or USDC',
        },
        { status: 400 }
      );
    }

    if (!['above', 'below'].includes(thresholdType)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid threshold type',
          message: 'thresholdType must be above or below',
        },
        { status: 400 }
      );
    }

    if (!['email', 'discord', 'telegram'].includes(notificationChannel)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid notification channel',
          message: 'notificationChannel must be email, discord, or telegram',
        },
        { status: 400 }
      );
    }

    // Create new alert
    const newAlert: Alert = {
      alertId: Date.now().toString(),
      userId: userId || 'user_123',
      currencyPair,
      thresholdType,
      thresholdValue: parseFloat(thresholdValue),
      notificationChannel,
      createdAt: new Date(),
      status: 'active',
    };

    mockAlerts.push(newAlert);

    return NextResponse.json({
      data: newAlert,
      success: true,
      message: 'Alert created successfully',
      timestamp: new Date(),
    });

  } catch (error) {
    console.error('Error creating alert:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'Failed to create alert',
        timestamp: new Date(),
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const alertId = searchParams.get('alertId');
    const userId = searchParams.get('userId') || 'user_123';

    if (!alertId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing alert ID',
          message: 'alertId parameter is required',
        },
        { status: 400 }
      );
    }

    const alertIndex = mockAlerts.findIndex(
      alert => alert.alertId === alertId && alert.userId === userId
    );

    if (alertIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: 'Alert not found',
          message: 'Alert not found or access denied',
        },
        { status: 404 }
      );
    }

    const deletedAlert = mockAlerts.splice(alertIndex, 1)[0];

    return NextResponse.json({
      data: deletedAlert,
      success: true,
      message: 'Alert deleted successfully',
      timestamp: new Date(),
    });

  } catch (error) {
    console.error('Error deleting alert:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'Failed to delete alert',
        timestamp: new Date(),
      },
      { status: 500 }
    );
  }
}
