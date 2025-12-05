import { ObjectId } from 'mongodb';

export interface Category {
  _id?: ObjectId;
  id?: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Product {
  _id?: ObjectId;
  id?: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  weight: string;
  image_url?: string;
  ingredients?: string;
  category_id?: string;
  stock_quantity?: number;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface Profile {
  _id?: ObjectId;
  id?: string;
  email: string;
  full_name?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Order {
  _id?: ObjectId;
  id?: string;
  order_number: string;
  user_id: string;
  customer_name?: string;
  customer_email?: string;
  total_amount: number;
  status?: string;
  payment_status?: string;
  payment_id?: string;
  phone: string;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_pincode: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface OrderItem {
  _id?: ObjectId;
  id?: string;
  order_id: string;
  product_id?: string;
  product_name: string;
  product_price: number;
  quantity: number;
  subtotal: number;
  created_at?: Date;
}

export interface UserRole {
  _id?: ObjectId;
  id?: string;
  user_id: string;
  role: 'admin' | 'customer';
  created_at?: Date;
}

export type AppRole = 'admin' | 'customer';