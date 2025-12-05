import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(request: NextRequest) {
  try {
    console.log('SERVER ENV CHECK:', {
      id: process.env.RAZORPAY_KEY_ID || 'missing',
      secret: process.env.RAZORPAY_KEY_SECRET ? 'exists' : 'missing'
    });

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const { amount } = await request.json();

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: 'INR',
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error('Razorpay order creation failed:', error);
    return NextResponse.json({
      error: 'Failed to create order',
      details: error
    }, { status: 500 });
  }
}