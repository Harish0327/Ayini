import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(request: NextRequest) {
  try {
    console.log('Environment check:', {
      key_id: process.env.RAZORPAY_KEY_ID ? 'Present' : 'Missing',
      key_secret: process.env.RAZORPAY_KEY_SECRET ? 'Present' : 'Missing'
    });

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error('Missing Razorpay credentials');
      return NextResponse.json({ error: 'Missing payment configuration' }, { status: 500 });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const { amount } = await request.json();
    console.log('Creating order for amount:', amount);
    
    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }
    
    const options = {
      amount: Math.round(amount * 100),
      currency: 'INR',
      receipt: 'order_' + Date.now(),
      payment_capture: 1,
      notes: {
        test_mode: 'true'
      }
    };
    
    console.log('Order options:', options);
    console.log('Razorpay instance created with key_id:', process.env.RAZORPAY_KEY_ID);
    
    const order = await razorpay.orders.create(options);
    console.log('Order created successfully:', order.id);
    
    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: process.env.RAZORPAY_KEY_ID
    });
  } catch (error: any) {
    console.error('Razorpay order creation failed:', {
      message: error.message,
      statusCode: error.statusCode,
      description: error.description,
      field: error.field,
      source: error.source,
      step: error.step,
      reason: error.reason,
      metadata: error.metadata,
      error: error
    });
    
    // Test Razorpay credentials
    try {
      const testRazorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID!,
        key_secret: process.env.RAZORPAY_KEY_SECRET!,
      });
      console.log('Razorpay instance created successfully');
    } catch (credError: any) {
      console.error('Razorpay credential error:', credError.message);
    }
    
    return NextResponse.json({ 
      error: 'Failed to create order',
      details: error.message,
      razorpay_error: {
        statusCode: error.statusCode,
        description: error.description,
        field: error.field,
        source: error.source,
        step: error.step,
        reason: error.reason
      },
      env_check: {
        key_id: process.env.RAZORPAY_KEY_ID ? 'Present' : 'Missing',
        key_secret: process.env.RAZORPAY_KEY_SECRET ? 'Present' : 'Missing'
      }
    }, { status: 500 });
  }
}