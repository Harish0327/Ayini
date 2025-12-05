import { NextResponse } from 'next/server';
import { Database } from '@/integrations/mongodb/database';

export async function GET() {
  try {
    const customers = await Database.getProfiles();
    return NextResponse.json(customers || []);
  } catch (error) {
    console.error('Customers API error:', error);
    return NextResponse.json([]);
  }
}