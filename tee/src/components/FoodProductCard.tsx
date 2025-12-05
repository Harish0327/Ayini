"use client";

import { useState } from "react";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

interface FoodProductCardProps {
  id: number;
  name: string;
  description: string;
  price?: number;
  image: string;
  rating: number;
  variants?: Array<{ weight: string; price: number; mrp?: number }>;
}

const FoodProductCard = ({ id, name, description, price, image, rating, variants }: FoodProductCardProps) => {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const { addToCart } = useCart();
  
  const currentVariant = variants?.[selectedVariant] || { weight: '250g', price: price || 0 };

  const handleAddToCart = () => {
    addToCart({ id, name, price: currentVariant.price, image, weight: currentVariant.weight });
  };

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Food Image - Overlapping */}
      <div className="relative z-10 flex justify-center mb-[-60px]">
        <div className="w-40 h-40 rounded-full bg-white p-2 shadow-lg">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>

      {/* Card Content */}
      <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-[25px] pt-20 pb-8 px-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-green-300">
        {/* Product Name */}
        <h3 className="text-xl font-bold text-green-700 text-center mb-3">
          {name}
        </h3>

        {/* Description */}
        <p className="text-gray-700 text-center text-sm mb-4 leading-relaxed">
          {description}
        </p>

        {/* Weight Selector */}
        {variants && variants.length > 1 && (
          <div className="text-center mb-4">
            <select 
              value={selectedVariant} 
              onChange={(e) => setSelectedVariant(Number(e.target.value))}
              className="bg-white border border-green-300 rounded-lg px-3 py-1 text-sm font-medium text-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {variants.map((variant, index) => (
                <option key={index} value={index}>{variant.weight}</option>
              ))}
            </select>
          </div>
        )}

        {/* Price */}
        <div className="text-center mb-4">
          <span className="text-2xl font-bold text-green-700">₹{currentVariant.price}</span>
          {currentVariant.mrp && (
            <span className="text-sm text-gray-500 line-through ml-2">₹{currentVariant.mrp}</span>
          )}
        </div>

        {/* Rating */}
        <div className="flex justify-center mb-6">
          <div className="bg-yellow-400 px-3 py-1 rounded-full flex items-center space-x-1">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`w-3 h-3 ${
                  index < rating ? "text-white fill-white" : "text-yellow-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Order Button */}
        <div className="text-center">
          <Button 
            onClick={handleAddToCart}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full text-sm transition-colors duration-300 flex items-center gap-2 mx-auto"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FoodProductCard;