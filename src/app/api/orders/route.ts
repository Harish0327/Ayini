import { NextRequest, NextResponse } from 'next/server';
import { Database } from '@/integrations/mongodb/database';

export async function GET() {
  try {
    const orders = await Database.getOrders();
    return NextResponse.json(orders || []);
  } catch (error) {
    console.error('Orders API error:', error);
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await Database.createOrder(body);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}