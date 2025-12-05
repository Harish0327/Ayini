import { NextResponse } from 'next/server';
import { Database } from '@/integrations/mongodb/database';

export async function GET() {
  try {
    const stats = await Database.getStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Stats API error:', error);
    return NextResponse.json({
      productsCount: 0,
      ordersCount: 0,
      customersCount: 0,
      recentOrders: [],
      totalRevenue: 0
    });
  }
}