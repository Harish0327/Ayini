"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "sonner";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  weight?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  likedItems: number[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number, weight?: string) => void;
  updateQuantity: (id: number, quantity: number, weight?: string) => void;
  toggleLike: (id: number) => void;
  getCartCount: () => number;
  getCartTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [likedItems, setLikedItems] = useState<number[]>([]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id && i.weight === item.weight);
      if (existing) {
        toast.success("Quantity updated in cart!");
        return prev.map(i => 
          i.id === item.id && i.weight === item.weight ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      toast.success("Added to cart!");
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number, weight?: string) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.weight === weight)));
    toast.success("Removed from cart!");
  };

  const updateQuantity = (id: number, quantity: number, weight?: string) => {
    if (quantity <= 0) {
      removeFromCart(id, weight);
      return;
    }
    setCartItems(prev => 
      prev.map(item => 
        item.id === id && item.weight === weight ? { ...item, quantity } : item
      )
    );
  };

  const toggleLike = (id: number) => {
    setLikedItems(prev => {
      const isLiked = prev.includes(id);
      if (isLiked) {
        toast.success("Removed from wishlist!");
        return prev.filter(itemId => itemId !== id);
      }
      toast.success("Added to wishlist!");
      return [...prev, id];
    });
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      likedItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleLike,
      getCartCount,
      getCartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};