const { MongoClient } = require('mongodb');

const products = [
  // Kambu Puttu Mix variants
  {
    name: "Kambu Puttu Mix - 250g",
    slug: "kambu-puttu-mix-250g",
    description: "Traditional Kambu (Pearl Millet) Puttu Mix - 250g pack",
    price: 75,
    weight: "250g",
    image_url: "/assets/KambuPuttumix.JPG",
    ingredients: "Pearl Millet, Salt, Natural Spices",
    stock_quantity: 100,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Kambu Puttu Mix - 500g",
    slug: "kambu-puttu-mix-500g", 
    description: "Traditional Kambu (Pearl Millet) Puttu Mix - 500g pack",
    price: 150,
    weight: "500g",
    image_url: "/assets/KambuPuttumix.JPG",
    ingredients: "Pearl Millet, Salt, Natural Spices",
    stock_quantity: 100,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Kambu Puttu Mix - 750g",
    slug: "kambu-puttu-mix-750g",
    description: "Traditional Kambu (Pearl Millet) Puttu Mix - 750g pack", 
    price: 225,
    weight: "750g",
    image_url: "/assets/KambuPuttumix.JPG",
    ingredients: "Pearl Millet, Salt, Natural Spices",
    stock_quantity: 100,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  // Sprouted Ragi Nutri Mix variants
  {
    name: "Sprouted Ragi Nutri Mix - 250g",
    slug: "sprouted-ragi-nutri-mix-250g",
    description: "Nutritious Sprouted Ragi Mix - 250g pack",
    price: 234,
    weight: "250g", 
    image_url: "/assets/Spourtedragimix.JPG",
    ingredients: "Sprouted Ragi, Natural Nutrients",
    stock_quantity: 100,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Sprouted Ragi Nutri Mix - 500g",
    slug: "sprouted-ragi-nutri-mix-500g",
    description: "Nutritious Sprouted Ragi Mix - 500g pack",
    price: 468,
    weight: "500g",
    image_url: "/assets/Spourtedragimix.JPG", 
    ingredients: "Sprouted Ragi, Natural Nutrients",
    stock_quantity: 100,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Sprouted Ragi Nutri Mix - 750g",
    slug: "sprouted-ragi-nutri-mix-750g",
    description: "Nutritious Sprouted Ragi Mix - 750g pack",
    price: 702,
    weight: "750g",
    image_url: "/assets/Spourtedragimix.JPG",
    ingredients: "Sprouted Ragi, Natural Nutrients", 
    stock_quantity: 100,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  // Idly Podi variants
  {
    name: "Idly Podi - 150g",
    slug: "idly-podi-150g",
    description: "Traditional Idly Podi - 150g pack",
    price: 89,
    weight: "150g",
    image_url: "/assets/IdlyPodi.JPG",
    ingredients: "Lentils, Spices, Curry Leaves, Salt",
    stock_quantity: 100,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Idly Podi - 250g", 
    slug: "idly-podi-250g",
    description: "Traditional Idly Podi - 250g pack",
    price: 148,
    weight: "250g",
    image_url: "/assets/IdlyPodi.JPG",
    ingredients: "Lentils, Spices, Curry Leaves, Salt",
    stock_quantity: 100,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Idly Podi - 500g",
    slug: "idly-podi-500g", 
    description: "Traditional Idly Podi - 500g pack",
    price: 296,
    weight: "500g",
    image_url: "/assets/IdlyPodi.JPG",
    ingredients: "Lentils, Spices, Curry Leaves, Salt",
    stock_quantity: 100,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Idly Podi - 750g",
    slug: "idly-podi-750g",
    description: "Traditional Idly Podi - 750g pack", 
    price: 445,
    weight: "750g",
    image_url: "/assets/IdlyPodi.JPG",
    ingredients: "Lentils, Spices, Curry Leaves, Salt",
    stock_quantity: 100,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  // Chai Leaf variants
  {
    name: "Chai Leaf - 250g",
    slug: "chai-leaf-250g",
    description: "Premium Chai Leaf - 250g pack",
    price: 130,
    weight: "250g",
    image_url: "/assets/Chaileaf.JPG", 
    ingredients: "Premium Tea Leaves",
    stock_quantity: 100,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Chai Leaf - 500g",
    slug: "chai-leaf-500g",
    description: "Premium Chai Leaf - 500g pack",
    price: 260,
    weight: "500g",
    image_url: "/assets/Chaileaf.JPG",
    ingredients: "Premium Tea Leaves",
    stock_quantity: 100,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  // Green Chai Leaf variants
  {
    name: "Green Chai Leaf - 200g",
    slug: "green-chai-leaf-200g", 
    description: "Premium Green Chai Leaf - 200g pack",
    price: 132,
    weight: "200g",
    image_url: "/assets/Greentealeaf.JPG",
    ingredients: "Premium Green Tea Leaves",
    stock_quantity: 100,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Green Chai Leaf - 400g",
    slug: "green-chai-leaf-400g",
    description: "Premium Green Chai Leaf - 400g pack", 
    price: 264,
    weight: "400g",
    image_url: "/assets/Greentealeaf.JPG",
    ingredients: "Premium Green Tea Leaves",
    stock_quantity: 100,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  }
];

async function addProducts() {
  const client = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017');
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('spice_heritage');
    const collection = db.collection('products');
    
    const result = await collection.insertMany(products);
    console.log(`${result.insertedCount} products added successfully!`);
    
    // List all products to verify
    const allProducts = await collection.find({}).toArray();
    console.log(`Total products in database: ${allProducts.length}`);
    
  } catch (error) {
    console.error('Error adding products:', error);
  } finally {
    await client.close();
  }
}

addProducts();