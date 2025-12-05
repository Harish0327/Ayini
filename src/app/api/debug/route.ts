import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    env: {
      MONGODB_URI: process.env.MONGODB_URI ? 'SET' : 'NOT SET',
      MONGODB_DB_NAME: process.env.MONGODB_DB_NAME || 'NOT SET',
      NODE_ENV: process.env.NODE_ENV
    }
  });
}