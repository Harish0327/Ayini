import { clientPromise, dbName } from '../integrations/mongodb/client';

async function initializeDatabase() {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);

    // Create collections with indexes
    await db.createCollection('categories');
    await db.createCollection('products');
    await db.createCollection('profiles');
    await db.createCollection('orders');
    await db.createCollection('order_items');
    await db.createCollection('user_roles');

    // Create indexes
    await db.collection('categories').createIndex({ slug: 1 }, { unique: true });
    await db.collection('products').createIndex({ slug: 1 }, { unique: true });
    await db.collection('profiles').createIndex({ email: 1 }, { unique: true });
    await db.collection('orders').createIndex({ order_number: 1 }, { unique: true });
    await db.collection('user_roles').createIndex({ user_id: 1 });

    console.log('Database initialized successfully!');
    
    // Insert sample data
    const sampleCategories = [
      {
        name: 'Spice Powders',
        slug: 'spice-powders',
        description: 'Traditional Indian spice blends and powders',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Tea & Beverages',
        slug: 'tea-beverages',
        description: 'Premium tea powders and beverage mixes',
        created_at: new Date(),
        updated_at: new Date()
      }
    ];

    await db.collection('categories').insertMany(sampleCategories);

    const sampleProducts = [
      {
        name: 'Idly Podi',
        slug: 'idly-podi',
        description: 'Traditional South Indian spice powder perfect for idly and dosa',
        price: 150,
        weight: '250g',
        ingredients: 'Urad dal, chana dal, red chili, sesame seeds, salt',
        stock_quantity: 50,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Tea Powder',
        slug: 'tea-powder',
        description: 'Premium blend tea powder for authentic Indian chai',
        price: 200,
        weight: '500g',
        ingredients: 'Black tea leaves, cardamom, ginger, cinnamon',
        stock_quantity: 30,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ];

    await db.collection('products').insertMany(sampleProducts);
    
    console.log('Sample data inserted successfully!');
    
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Run if called directly
if (require.main === module) {
  initializeDatabase().then(() => process.exit(0));
}

export { initializeDatabase };