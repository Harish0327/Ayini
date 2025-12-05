"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(Array.isArray(data) ? data : []);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };



  // Use MongoDB products
  const displayProducts = loading ? [] : products;

  const filteredProducts =
    selectedCategory === "all"
      ? displayProducts
      : displayProducts.filter((p) => p.category === selectedCategory);

  // Map MongoDB products to match expected format
  const mappedProducts = filteredProducts.map(product => ({
    ...product,
    id: product.id || product._id,
    image: product.image_url || product.image || '/placeholder.svg'
  }));

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
          <p className="text-lg text-muted-foreground">
            Browse our collection of authentic traditional spice blends
          </p>
        </div>



        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-8">Loading products...</div>
          ) : (
            mappedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))
          )}
        </div>

        {/* Pagination - Only show if more than 8 products */}
        {displayProducts.length > 8 && (
          <div className="flex justify-center mt-12">
            <div className="flex gap-2">
              <Button variant="outline" disabled>
                Previous
              </Button>
              <Button variant="default">1</Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">Next</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;