"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Star, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";

interface ProductDetailProps {
  id: string;
}

const ProductDetail = ({ id }: ProductDetailProps) => {
  const { addToCart, toggleLike, likedItems } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState("250g");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const isLiked = product ? likedItems.includes(parseInt(product.id)) : false;

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch('/api/products');
      const products = await response.json();
      const foundProduct = products.find(p => p.id === id || p.id === parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedWeight(foundProduct.weight || "250g");
      }
    } catch (error) {
      console.error('Failed to fetch product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        weight: selectedWeight
      });
    }
  };

  const handleToggleLike = () => {
    toggleLike(product.id);
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center">
        <div>Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center">
        <div>Product not found</div>
      </div>
    );
  }

  const displayProduct = {
    ...product,
    originalPrice: Math.round(product.price * 1.2),
    rating: 4.9,
    reviews: 156,
    ingredients: product.ingredients ? product.ingredients.split(', ') : ['Traditional spices'],
    weights: ["100g", "250g", "500g", "1kg"],
    inStock: product.stock_quantity > 0,
    image: product.image_url || product.image || '/placeholder.svg'
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-green-50">
              <img
                src={displayProduct.image}
                alt={displayProduct.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full mb-3">
                Spice Powder
              </span>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{displayProduct.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(displayProduct.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-gray-600">({displayProduct.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-3xl font-bold text-green-600">₹{displayProduct.price}</span>
                <span className="text-xl text-gray-400 line-through">₹{displayProduct.originalPrice}</span>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-medium">
                  {Math.round(((displayProduct.originalPrice - displayProduct.price) / displayProduct.originalPrice) * 100)}% OFF
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{displayProduct.description}</p>
            </div>

            {/* Weight Selection */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Weight</h3>
              <div className="flex space-x-2">
                {displayProduct.weights.map((weight) => (
                  <button
                    key={weight}
                    onClick={() => setSelectedWeight(weight)}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      selectedWeight === weight
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-300 hover:border-green-300'
                    }`}
                  >
                    {weight}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-gray-300 rounded-lg hover:border-green-300"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border border-gray-300 rounded-lg hover:border-green-300"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button onClick={handleAddToCart} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button onClick={handleToggleLike} variant="outline" className="border-green-300 text-green-700 hover:bg-green-50 py-3">
                <Heart className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-red-500' : ''}`} />
              </Button>
            </div>

            {/* Ingredients */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {displayProduct.ingredients.map((ingredient) => (
                  <span key={ingredient} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;