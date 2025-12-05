"use client";

import { useState, useEffect } from "react";
import FoodProductCard from "./FoodProductCard";

const FoodProductSection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products', { cache: 'no-store' });
      const data = await response.json();
      if (data && data.length > 0) {
        const mappedProducts = data.slice(0, 3).map((product: any) => ({
          ...product,
          id: product.id || product._id,
          image: product.image_url || product.image || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
          rating: 5
        }));
        setProducts(mappedProducts);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-white to-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif', letterSpacing: '1px' }}>
            Our Signature Blends
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
            Handcrafted with love using traditional recipes passed down through generations
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((product) => (
            <FoodProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoodProductSection;