import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Test mode bypass for international cards

export async function POST(request: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, testMode } = await request.json();
    
    console.log('Verifying payment:', {
      order_id: razorpay_order_id,
      payment_id: razorpay_payment_id,
      signature: razorpay_signature ? 'Present' : 'Missing',
      testMode: testMode
    });

    // Test mode - always return success
    if (testMode || razorpay_order_id?.startsWith('test_')) {
      console.log('Test mode payment verification - always success');
      return NextResponse.json({ 
        success: true, 
        message: 'Test payment verified successfully',
        payment_id: razorpay_payment_id || 'test_payment_' + Date.now(),
        order_id: razorpay_order_id || 'test_order_' + Date.now()
      });
    }

    if (!process.env.RAZORPAY_KEY_SECRET) {
      console.error('Missing Razorpay key secret');
      return NextResponse.json({ 
        success: false, 
        error: 'Missing payment configuration' 
      }, { status: 500 });
    }
    
    const key_secret = process.env.RAZORPAY_KEY_SECRET;
    
    // Create HMAC SHA256 signature
    const hmac = crypto.createHmac('sha256', key_secret);
    hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
    const generated_signature = hmac.digest('hex');
    
    console.log('Signature verification:', {
      generated: generated_signature,
      received: razorpay_signature,
      match: generated_signature === razorpay_signature
    });
    
    // Verify signature
    if (generated_signature === razorpay_signature) {
      // Payment is verified
      console.log('Payment verified successfully');
      return NextResponse.json({ 
        success: true, 
        message: 'Payment verified successfully',
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id
      });
    } else {
      // Payment verification failed
      console.log('Payment verification failed - signature mismatch');
      return NextResponse.json({ 
        success: false, 
        message: 'Payment verification failed' 
      }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Payment verification error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Payment verification failed',
      details: error.message 
    }, { status: 500 });
  }
}