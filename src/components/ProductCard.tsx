"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  id: number;
  name: string;
  price?: number;
  image: string;
  category?: string;
  weight?: string;
  variants?: Array<{ weight: string; price: number; mrp?: number }>;
}

const ProductCard = ({ id, name, price, image, category, weight, variants }: ProductCardProps) => {
  const { addToCart, toggleLike, likedItems } = useCart();
  const isLiked = likedItems.includes(id);
  const [selectedVariant, setSelectedVariant] = useState(0);
  
  const currentVariant = variants?.[selectedVariant] || { weight: weight || '250g', price: price || 0 };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({ id, name, price: currentVariant.price, image, weight: currentVariant.weight });
  };

  const handleToggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleLike(id);
  };
  return (
    <Card className="group overflow-hidden card-hover border-0 shadow-lg bg-gradient-to-br from-white to-green-50/30 backdrop-blur-sm">
      <Link href={`/product/${id}`}>
        <div className="relative overflow-hidden aspect-square">
          <Image
            src={image || '/placeholder.svg'}
            alt={name}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleLike}
            className="absolute top-3 right-3 bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm transform scale-0 group-hover:scale-100 transition-all duration-300"
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'text-red-500 fill-red-500' : 'text-green-500'}`} />
          </Button>

        </div>
      </Link>
      <CardContent className="p-6">
        <div className="mb-4">
          <Link href={`/product/${id}`}>
            <h3 className="font-bold text-xl hover:text-transparent hover:bg-gradient-to-r hover:from-green-600 hover:to-green-600 hover:bg-clip-text transition-all duration-300 mb-2">
              {name}
            </h3>
          </Link>
          {variants && variants.length > 1 ? (
            <select 
              value={selectedVariant} 
              onChange={(e) => setSelectedVariant(Number(e.target.value))}
              className="text-sm text-gray-500 font-medium bg-transparent border-none outline-none cursor-pointer"
            >
              {variants.map((variant, index) => (
                <option key={index} value={index}>{variant.weight}</option>
              ))}
            </select>
          ) : (
            <p className="text-sm text-gray-500 font-medium">{currentVariant.weight}</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-600 bg-clip-text text-transparent">
              ₹{currentVariant.price}
            </p>
            {currentVariant.mrp && (
              <p className="text-xs text-gray-400 line-through">₹{currentVariant.mrp}</p>
            )}
          </div>
          <Button 
            size="sm" 
            onClick={handleAddToCart}
            className="gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;