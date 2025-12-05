# MongoDB Migration Guide

## Overview
This project has been successfully migrated from Supabase to MongoDB Atlas.

## Database Configuration
- **MongoDB URI**: `mongodb+srv://asianpirate27_db_user:0YvxLmGkXpD2C8bn@ayinidata.au5dy0u.mongodb.net/?appName=AyiniData`
- **Database Name**: `ayini_shop`

## Environment Variables
The following environment variables have been updated in `.env` and `.env.local`:
```
MONGODB_URI="mongodb+srv://asianpirate27_db_user:0YvxLmGkXpD2C8bn@ayinidata.au5dy0u.mongodb.net/?appName=AyiniData"
MONGODB_DB_NAME="ayini_shop"
```

## Collections Structure
The following collections have been created to match the previous Supabase schema:

1. **categories**
   - _id (ObjectId)
   - name (string)
   - slug (string, unique)
   - description (string, optional)
   - image_url (string, optional)
   - created_at (Date)
   - updated_at (Date)

2. **products**
   - _id (ObjectId)
   - name (string)
   - slug (string, unique)
   - description (string, optional)
   - price (number)
   - weight (string)
   - image_url (string, optional)
   - ingredients (string, optional)
   - category_id (string, optional)
   - stock_quantity (number, optional)
   - is_active (boolean, optional)
   - created_at (Date)
   - updated_at (Date)

3. **profiles**
   - _id (ObjectId)
   - email (string, unique)
   - full_name (string, optional)
   - phone (string, optional)
   - address (string, optional)
   - city (string, optional)
   - state (string, optional)
   - pincode (string, optional)
   - created_at (Date)
   - updated_at (Date)

4. **orders**
   - _id (ObjectId)
   - order_number (string, unique)
   - user_id (string)
   - total_amount (number)
   - status (string, optional)
   - payment_status (string, optional)
   - payment_id (string, optional)
   - phone (string)
   - shipping_address (string)
   - shipping_city (string)
   - shipping_state (string)
   - shipping_pincode (string)
   - created_at (Date)
   - updated_at (Date)

5. **order_items**
   - _id (ObjectId)
   - order_id (string)
   - product_id (string, optional)
   - product_name (string)
   - product_price (number)
   - quantity (number)
   - subtotal (number)
   - created_at (Date)

6. **user_roles**
   - _id (ObjectId)
   - user_id (string)
   - role ('admin' | 'customer')
   - created_at (Date)

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Initialize Database**
   ```bash
   npm run init-db
   ```
   This will create the collections, indexes, and insert sample data.

3. **Start Development Server**
   ```bash
   npm run dev
   ```

## Changes Made

### Dependencies
- **Removed**: `@supabase/supabase-js`
- **Added**: `mongodb`, `mongoose`

### File Structure
- **Removed**: `src/integrations/supabase/`
- **Added**: `src/integrations/mongodb/`
  - `client.ts` - MongoDB connection
  - `models.ts` - TypeScript interfaces
  - `database.ts` - Database operations
  - `auth.ts` - Simple authentication

### API Routes
- **Added**: `src/app/api/` directory with:
  - `auth/signin/route.ts`
  - `auth/signup/route.ts`
  - `categories/route.ts`
  - `products/route.ts`

### Updated Components
All components have been updated to use MongoDB instead of Supabase:
- Admin pages (Categories, Products, Orders, Dashboard, Customers)
- Auth components
- AdminSidebar

## Authentication
A simple authentication system has been implemented using localStorage for session management. In production, consider implementing proper JWT tokens or session management.

## Notes
- The migration maintains the same functionality as the Supabase version
- Sample data is automatically inserted when running `npm run init-db`
- All CRUD operations have been migrated to use MongoDB
- The database connection uses connection pooling for optimal performance