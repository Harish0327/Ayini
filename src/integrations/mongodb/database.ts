import { clientPromise, dbName } from './client';
import { Category, Product, Profile, Order, OrderItem, UserRole } from './models';
import { ObjectId } from 'mongodb';

export class Database {
  static async getDb() {
    const client = await clientPromise;
    return client.db(dbName);
  }

  // Categories
  static async getCategories() {
    const db = await this.getDb();
    const categories = await db.collection<Category>('categories').find({}).toArray();
    return categories.map(cat => ({ ...cat, id: cat._id?.toString() }));
  }

  static async createCategory(category: Omit<Category, '_id' | 'id' | 'created_at' | 'updated_at'>) {
    const db = await this.getDb();
    const now = new Date();
    const result = await db.collection<Category>('categories').insertOne({
      ...category,
      created_at: now,
      updated_at: now
    });
    return { id: result.insertedId.toString() };
  }

  static async updateCategory(id: string, category: Partial<Category>) {
    const db = await this.getDb();
    await db.collection<Category>('categories').updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...category, updated_at: new Date() } }
    );
  }

  static async deleteCategory(id: string) {
    const db = await this.getDb();
    await db.collection<Category>('categories').deleteOne({ _id: new ObjectId(id) });
  }

  // Products
  static async getProducts() {
    const db = await this.getDb();
    const products = await db.collection<Product>('products').find({}).toArray();
    return products.map(prod => ({ ...prod, id: prod._id?.toString() }));
  }

  static async createProduct(product: Omit<Product, '_id' | 'id' | 'created_at' | 'updated_at'>) {
    const db = await this.getDb();
    const now = new Date();
    const result = await db.collection<Product>('products').insertOne({
      ...product,
      created_at: now,
      updated_at: now
    });
    return { id: result.insertedId.toString() };
  }

  static async updateProduct(id: string, product: Partial<Product>) {
    const db = await this.getDb();
    await db.collection<Product>('products').updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...product, updated_at: new Date() } }
    );
  }

  static async deleteProduct(id: string) {
    const db = await this.getDb();
    await db.collection<Product>('products').deleteOne({ _id: new ObjectId(id) });
  }

  // Profiles
  static async getProfiles() {
    const db = await this.getDb();
    const profiles = await db.collection<Profile>('profiles').find({}).toArray();
    return profiles.map(profile => ({ ...profile, id: profile._id?.toString() }));
  }

  // Orders
  static async getOrders() {
    const db = await this.getDb();
    const orders = await db.collection<Order>('orders').find({}).sort({ created_at: -1 }).toArray();
    return orders.map(order => ({ ...order, id: order._id?.toString() }));
  }

  static async getOrderItems(orderId: string) {
    const db = await this.getDb();
    const items = await db.collection<OrderItem>('order_items').find({ order_id: orderId }).toArray();
    return items.map(item => ({ ...item, id: item._id?.toString() }));
  }

  static async createOrder(order: Omit<Order, '_id' | 'id' | 'created_at' | 'updated_at'>) {
    const db = await this.getDb();
    const now = new Date();
    const result = await db.collection<Order>('orders').insertOne({
      ...order,
      created_at: now,
      updated_at: now
    });
    return { id: result.insertedId.toString() };
  }

  static async updateOrderStatus(id: string, status: string) {
    const db = await this.getDb();
    await db.collection<Order>('orders').updateOne(
      { _id: new ObjectId(id) },
      { $set: { status, updated_at: new Date() } }
    );
  }

  // Dashboard stats
  static async getStats() {
    const db = await this.getDb();
    const [productsCount, ordersCount, customersCount] = await Promise.all([
      db.collection('products').countDocuments(),
      db.collection('orders').countDocuments(),
      db.collection('profiles').countDocuments()
    ]);

    const recentOrders = await db.collection<Order>('orders')
      .find({})
      .sort({ created_at: -1 })
      .limit(5)
      .toArray();

    const totalRevenue = await db.collection<Order>('orders')
      .aggregate([
        { $group: { _id: null, total: { $sum: '$total_amount' } } }
      ])
      .toArray();

    return {
      productsCount,
      ordersCount,
      customersCount,
      recentOrders: recentOrders.map(order => ({ ...order, id: order._id?.toString() })),
      totalRevenue: totalRevenue[0]?.total || 0
    };
  }
}