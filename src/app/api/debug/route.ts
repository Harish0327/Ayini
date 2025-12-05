import { NextResponse } from 'next/server';

export async function GET() {
  return Response.json({
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID || "NOT_FOUND",
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET ? "LOADED" : "NOT_FOUND",
    NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "NOT_FOUND",
    MONGODB_URI: process.env.MONGODB_URI ? 'SET' : 'NOT SET',
    MONGODB_DB_NAME: process.env.MONGODB_DB_NAME || 'NOT SET',
    NODE_ENV: process.env.NODE_ENV
  });
}