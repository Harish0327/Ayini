const { MongoClient } = require('mongodb');

const products = [
  {
    name: "Kambu Puttu Mix",
    slug: "kambu-puttu-mix",
    description: "Traditional Kambu (Pearl Millet) Puttu Mix",
    image_url: "/assets/KambuPuttumix.JPG",
    ingredients: "Pearl Millet, Salt, Natural Spices",
    stock_quantity: 100,
    is_active: true,
    variants: [
      { weight: "250g", price: 75, mrp: 112 },
      { weight: "500g", price: 150, mrp: 225 },
      { weight: "750g", price: 225, mrp: 337 }
    ],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Sprouted Ragi Nutri Mix",
    slug: "sprouted-ragi-nutri-mix",
    description: "Nutritious Sprouted Ragi Mix",
    image_url: "/assets/Spourtedragimix.JPG",
    ingredients: "Sprouted Ragi, Natural Nutrients",
    stock_quantity: 100,
    is_active: true,
    variants: [
      { weight: "250g", price: 234, mrp: 351 },
      { weight: "500g", price: 468, mrp: 702 },
      { weight: "750g", price: 702, mrp: 1053 }
    ],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Idly Podi",
    slug: "idly-podi",
    description: "Traditional Idly Podi",
    image_url: "/assets/IdlyPodi.JPG",
    ingredients: "Lentils, Spices, Curry Leaves, Salt",
    stock_quantity: 100,
    is_active: true,
    variants: [
      { weight: "150g", price: 89, mrp: 133 },
      { weight: "250g", price: 148, mrp: 222 },
      { weight: "500g", price: 296, mrp: 444 },
      { weight: "750g", price: 445, mrp: 667 }
    ],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Chai Leaf",
    slug: "chai-leaf",
    description: "Premium Chai Leaf",
    image_url: "/assets/Chaileaf.JPG",
    ingredients: "Premium Tea Leaves",
    stock_quantity: 100,
    is_active: true,
    variants: [
      { weight: "250g", price: 130, mrp: 195 },
      { weight: "500g", price: 260, mrp: 390 }
    ],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Green Chai Leaf",
    slug: "green-chai-leaf",
    description: "Premium Green Chai Leaf",
    image_url: "/assets/Greentealeaf.JPG",
    ingredients: "Premium Green Tea Leaves",
    stock_quantity: 100,
    is_active: true,
    variants: [
      { weight: "200g", price: 132, mrp: 198 },
      { weight: "400g", price: 264, mrp: 396 }
    ],
    created_at: new Date(),
    updated_at: new Date()
  }
];

async function createVariantProducts() {
  const client = new MongoClient("mongodb+srv://asianpirate27_db_user:0YvxLmGkXpD2C8bn@ayinidata.au5dy0u.mongodb.net/?appName=AyiniData");
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('ayini_shop');
    const collection = db.collection('products');
    
    // Clear existing products
    await collection.deleteMany({});
    console.log('Cleared existing products');
    
    const result = await collection.insertMany(products);
    console.log(`${result.insertedCount} products with variants added successfully!`);
    
    // List all products to verify
    const allProducts = await collection.find({}).toArray();
    console.log(`Total products in database: ${allProducts.length}`);
    allProducts.forEach((p, i) => {
      console.log(`${i+1}. ${p.name} - ${p.variants.length} variants`);
    });
    
  } catch (error) {
    console.error('Error adding products:', error);
  } finally {
    await client.close();
  }
}

createVariantProducts();