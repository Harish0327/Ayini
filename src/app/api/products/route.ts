import { NextRequest, NextResponse } from 'next/server';
import { Database } from '@/integrations/mongodb/database';

export async function GET() {
  try {
    const products = await Database.getProducts();
    return NextResponse.json(products || []);
  } catch (error) {
    console.error('Products API error:', error);
    const fallbackProducts = [
      {
        id: '1',
        name: 'Idly Podi',
        description: 'Traditional South Indian spice powder perfect for idly and dosa',
        price: 150,
        weight: '250g',
        image_url: '/assets/IdlyPodi.JPG',
        ingredients: 'Urad dal, chana dal, red chili, sesame seeds, salt',
        stock_quantity: 50,
        is_active: true
      },
      {
        id: '2',
        name: 'Tea Powder',
        description: 'Premium blend tea powder for authentic Indian chai',
        price: 200,
        weight: '500g',
        image_url: '/assets/Chaileaf.JPG',
        ingredients: 'Black tea leaves, cardamom, ginger, cinnamon',
        stock_quantity: 30,
        is_active: true
      }
    ];
    return NextResponse.json(fallbackProducts);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await Database.createProduct(body);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const body = await request.json();
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }
    await Database.updateProduct(id, body);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }
    await Database.deleteProduct(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}