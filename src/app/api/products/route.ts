import { NextRequest, NextResponse } from 'next/server';
import { Database } from '@/integrations/mongodb/database';

export async function GET() {
  try {
    const products = await Database.getProducts();
    return NextResponse.json(products || []);
  } catch (error) {
    console.error('Products API error:', error);
    // Fallback products when database fails
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
      },
      {
        id: '3',
        name: 'Green Tea Powder',
        description: 'Organic green tea powder for healthy living',
        price: 250,
        weight: '250g',
        image_url: '/assets/Greentealeaf.JPG',
        ingredients: 'Organic green tea leaves',
        stock_quantity: 25,
        is_active: true
      }
    ];
    return NextResponse.json(fallbackProducts);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Creating product:', body);
    const result = await Database.createProduct(body);
    console.log('Product created:', result);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json({ error: 'Failed to create product', details: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const body = await request.json();
    console.log('Updating product:', id, body);
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }
    await Database.updateProduct(id, body);
    console.log('Product updated successfully');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update product error:', error);
    return NextResponse.json({ error: 'Failed to update product', details: error.message }, { status: 500 });
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