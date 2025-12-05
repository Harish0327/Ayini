import { NextResponse } from 'next/server';
import { testDatabaseConnection, initializeDatabase } from '@/lib/db-connection';

export async function GET() {
  try {
    const connectionTest = await testDatabaseConnection();
    
    if (connectionTest.success) {
      const initResult = await initializeDatabase();
      return NextResponse.json({
        status: 'success',
        connection: connectionTest.message,
        initialization: initResult.message,
        timestamp: new Date().toISOString()
      });
    } else {
      return NextResponse.json({
        status: 'error',
        message: connectionTest.message,
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: `Database error: ${error}`,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}