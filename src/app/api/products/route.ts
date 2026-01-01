import { NextRequest, NextResponse } from 'next/server';
import { Database } from '@/integrations/mongodb/database';

export async function GET() {
  try {
    const products = await Database.getProducts();
    console.log('Products fetched from DB:', products?.length || 0);
    return NextResponse.json(products || []);
  } catch (error) {
    console.error('Products API error:', error);
    return NextResponse.json({ error: 'Database connection failed', details: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Creating product:', body);
    
    // Validate required fields
    if (!body.name || !body.variants || body.variants.length === 0) {
      return NextResponse.json({ 
        error: 'Missing required fields: name and at least one variant' 
      }, { status: 400 });
    }
    
    const result = await Database.createProduct(body);
    console.log('Product created:', result);
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json({ 
      error: 'Failed to create product', 
      details: error.message 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const body = await request.json();
    console.log('Updating product:', id, body);
    
    if (!id) {
      return NextResponse.json({ error: 'Product ID required' }, { status: 400 });
    }
    
    await Database.updateProduct(id, body);
    console.log('Product updated successfully');
    return NextResponse.json({ success: true, message: 'Product updated successfully' });
  } catch (error) {
    console.error('Update product error:', error);
    return NextResponse.json({ 
      error: 'Failed to update product', 
      details: error.message 
    }, { status: 500 });
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