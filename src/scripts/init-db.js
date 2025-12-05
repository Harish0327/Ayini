const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://asianpirate27_db_user:0YvxLmGkXpD2C8bn@ayinidata.au5dy0u.mongodb.net/?appName=AyiniData";
const dbName = "ayini_shop";

async function initializeDatabase() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db(dbName);

    // Create collections
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

    console.log('Database initialized successfully!');
    
    // Insert sample data only if not exists
    const existingCategories = await db.collection('categories').countDocuments();
    if (existingCategories === 0) {
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
    }

    const existingProducts = await db.collection('products').countDocuments();
    if (existingProducts === 0) {
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
    }

    // Create admin user if not exists
    const existingAdmin = await db.collection('profiles').findOne({ email: 'ayiniadmin@gmail.com' });
    if (!existingAdmin) {
      const adminUser = {
        email: 'ayiniadmin@gmail.com',
        full_name: 'Admin User',
        created_at: new Date(),
        updated_at: new Date()
      };

      const adminResult = await db.collection('profiles').insertOne(adminUser);
      
      // Create admin role
      await db.collection('user_roles').insertOne({
        user_id: adminResult.insertedId.toString(),
        role: 'admin',
        created_at: new Date()
      });
    }
    
    console.log('Sample data and admin user created successfully!');
    
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    await client.close();
  }
}

initializeDatabase();