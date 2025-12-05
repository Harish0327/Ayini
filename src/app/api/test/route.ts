import { NextResponse } from 'next/server';
import { Database } from '@/integrations/mongodb/database';

export async function GET() {
  try {
    const db = await Database.getDb();
    const collections = await db.listCollections().toArray();
    const productsCount = await db.collection('products').countDocuments();
    
    return NextResponse.json({
      status: 'Database connected',
      collections: collections.map(c => c.name),
      productsCount,
      env: {
        hasMongoUri: !!process.env.MONGODB_URI,
        dbName: process.env.MONGODB_DB_NAME
      }
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Database connection failed', 
      details: error.message 
    }, { status: 500 });
  }
}