import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password, userData } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }
    
    // For demo purposes, accept any signup
    return NextResponse.json({ 
      user: { 
        id: 'user_' + Date.now(), 
        email: email,
        role: 'customer'
      } 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to sign up' }, { status: 500 });
  }
}