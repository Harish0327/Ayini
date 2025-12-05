import { clientPromise } from '@/integrations/mongodb/client';

export async function testDatabaseConnection() {
  try {
    const client = await clientPromise;
    await client.db().admin().ping();
    return { success: true, message: 'Database connected successfully' };
  } catch (error) {
    return { success: false, message: `Database connection failed: ${error}` };
  }
}

export async function initializeDatabase() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME || 'ayini_shop');
    
    // Test connection
    await client.db().admin().ping();
    
    // Check if collections exist, create if they don't
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    
    const requiredCollections = ['categories', 'products', 'profiles', 'orders', 'order_items'];
    
    for (const collectionName of requiredCollections) {
      if (!collectionNames.includes(collectionName)) {
        await db.createCollection(collectionName);
      }
    }
    
    return { success: true, message: 'Database initialized successfully' };
  } catch (error) {
    return { success: false, message: `Database initialization failed: ${error}` };
  }
}