import { NextResponse } from 'next/server';
import { Database } from '@/integrations/mongodb/database';

export async function POST() {
  try {
    const db = await Database.getDb();
    
    const sampleProducts = [
      {
        name: 'Idly Podi',
        slug: 'idly-podi',
        description: 'Traditional South Indian spice powder perfect for idly and dosa',
        price: 150,
        weight: '250g',
        image_url: '/assets/IdlyPodi.JPG',
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
        image_url: '/assets/Chaileaf.JPG',
        ingredients: 'Black tea leaves, cardamom, ginger, cinnamon',
        stock_quantity: 30,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ];

    await db.collection('products').insertMany(sampleProducts);
    
    return NextResponse.json({ 
      message: 'Products initialized successfully', 
      count: sampleProducts.length 
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to initialize products', 
      details: error.message 
    }, { status: 500 });
  }
}