"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, ChevronDown, ShoppingCart, User, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useCart } from "@/contexts/CartContext";
import Logo from "@/assets/Logo.png";

const Navbar = () => {
  const { getCartCount } = useCart();
  const [activeItem, setActiveItem] = useState("Home");
  const [showSearch, setShowSearch] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const cartCount = getCartCount();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { name: "Home", href: "/", hasDropdown: false },
    { name: "Shop", href: "/shop", hasDropdown: false },
    { name: "About", href: "/about", hasDropdown: false },
    { name: "Contact", href: "/contact", hasDropdown: false },
  ];

  return (
    <>
    <nav className="sticky top-0 z-50 w-full bg-white px-6 py-4 shadow-lg border-b border-gray-200">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left - Brand */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-3">
            <Image 
              src={Logo} 
              alt="Ayini Logo" 
              width={100} 
              height={32} 
              className="h-8 w-auto object-contain"
            />
            <span className="text-green-600 font-bold text-3xl tracking-wider" style={{ fontFamily: 'Brush Script MT, cursive' }}>
              Ayini
            </span>
          </Link>
        </div>

        {/* Center - Menu Container */}
        <div className="hidden md:flex rounded-full px-8 py-3">
          <div className="flex items-center space-x-8 relative">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setActiveItem(item.name)}
                className={`flex items-center space-x-1 text-sm font-medium transition-colors relative ${
                  activeItem === item.name ? "text-green-600" : "text-green-500 hover:text-green-600"
                }`}
              >
                <span>{item.name}</span>
                {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                {activeItem === item.name && (
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-green-500 rounded-full" />
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative" ref={searchRef}>
            <button 
              onClick={() => setShowSearch(!showSearch)}
              className="text-green-600 hover:text-green-700 transition-colors p-2 hover:bg-green-50 rounded-full"
            >
              <Search className="w-5 h-5" />
            </button>
            {showSearch && (
              <div className="absolute right-0 top-12 w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  autoFocus
                />
              </div>
            )}
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart */}
            <Link href="/cart" className="text-green-600 hover:text-green-700 transition-colors p-2 hover:bg-green-50 rounded-full relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <Link 
              href="/auth" 
              className="text-green-600 hover:text-green-700 transition-colors p-2 hover:bg-green-50 rounded-full"
            >
              <User className="w-5 h-5" />
            </Link>

            <Link 
              href="/shop" 
              className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-700 transition-all hover:scale-105"
            >
              Shop Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden text-green-600 p-2 hover:bg-green-50 rounded-full"
          >
            {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-6 py-4 space-y-4">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => {
                  setActiveItem(item.name);
                  setShowMobileMenu(false);
                }}
                className="block text-green-600 hover:text-green-700 font-medium"
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
              <Link href="/cart" className="flex items-center space-x-2 text-green-600">
                <ShoppingCart className="w-5 h-5" />
                <span>Cart ({cartCount})</span>
              </Link>
              <Link href="/auth" className="flex items-center space-x-2 text-green-600">
                <User className="w-5 h-5" />
                <span>Account</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
    </>
  );
};

export default Navbar;