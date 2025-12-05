import { NextResponse } from 'next/server';
import { Database } from '@/integrations/mongodb/database';

export async function GET() {
  try {
    const customers = await Database.getProfiles();
    return NextResponse.json(customers);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 });
  }
}