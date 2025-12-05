import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    // Check for admin credentials
    if (email === 'ayiniadmin@gmail.com' && password === 'adminayini@321') {
      return NextResponse.json({ 
        user: { 
          id: 'admin', 
          email: 'ayiniadmin@gmail.com',
          role: 'admin'
        } 
      });
    }
    
    // For demo purposes, accept any other email/password as customer
    if (email && password) {
      return NextResponse.json({ 
        user: { 
          id: 'customer_' + Date.now(), 
          email: email,
          role: 'customer'
        } 
      });
    }
    
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to sign in' }, { status: 500 });
  }
}