"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import FoodProductSection from "@/components/FoodProductSection";
import IdlyPodiPromo from "@/components/IdlyPodiPromo";

import { ShoppingBag, Truck, Award, Heart } from "lucide-react";
import Image from "next/image";

import WebScreen1 from "@/assets/WebScreen1.png";
import WebScreen2 from "@/assets/WebScreen2.png";
import WebScreen3 from "@/assets/WebScreen3.png";
import WebScreen4 from "@/assets/WebScreen4.png";
import WebScreen5 from "@/assets/WebScreen5.png";
import MobileScreen1 from "@/assets/MobileScreen - 1.png";
import MobileScreen2 from "@/assets/MobileScreen  - 2.png";
import MobileScreen3 from "@/assets/MobileScreen  - 3.png";
import MobileScreen4 from "@/assets/MobileScreen  - 4.png";
import MobileScreen5 from "@/assets/MobileScreen  - 5.png";
import MobileScreen6 from "@/assets/MobileScreen  - 6.png";

const HeroSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const webImages = [
    WebScreen1,
    WebScreen2, 
    WebScreen3,
    WebScreen4,
    WebScreen5
  ];
  
  const mobileImages = [
    MobileScreen1,
    MobileScreen2,
    MobileScreen3, 
    MobileScreen4,
    MobileScreen5,
    MobileScreen6
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % webImages.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [webImages.length]);
  
  return (
    <section className="w-full relative overflow-hidden h-screen md:h-screen">
      <div className="hidden md:block h-full">
        <Image 
          src={webImages[currentSlide]}
          alt={`Web Screen ${currentSlide + 1}`}
          className="w-full h-full object-cover transition-opacity duration-500"
        />
      </div>
      
      <div className="block md:hidden h-full">
        <Image 
          src={mobileImages[currentSlide % mobileImages.length]}
          alt={`Mobile Screen ${(currentSlide % mobileImages.length) + 1}`}
          className="w-full h-full object-cover transition-opacity duration-500"
        />
      </div>
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {webImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentSlide === index ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};


const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products', { cache: 'no-store' });
      const data = await response.json();
      if (data && data.length > 0) {
        const mappedProducts = data.map((product: any) => ({
          ...product,
          id: product.id || product._id,
          image: product.image_url || product.image || '/placeholder.svg'
        }));
        setFeaturedProducts(mappedProducts);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - Slideshow */}
      <HeroSlideshow />

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6 text-gray-900 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                Welcome to Taste of Ayini
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Bringing you authentic Indian flavors and traditional spice blends. 
                Our brand is launching soon with premium quality products crafted with love and tradition.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-green-800 mb-4">About Taste of Ayini</h3>
                <p className="text-gray-700 leading-relaxed">
                  Taste of Ayini is dedicated to bringing authentic Indian flavors to your kitchen. 
                  We specialize in traditional spice blends, powders, and culinary essentials that 
                  capture the true essence of Indian cuisine.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Our products are carefully sourced and prepared using time-tested methods to ensure 
                  the highest quality and authentic taste in every package.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                  <div className="text-gray-600">Natural Products</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">Fresh</div>
                  <div className="text-gray-600">Daily Preparation</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">Fast</div>
                  <div className="text-gray-600">Home Delivery</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
                  <div className="text-gray-600">Customer Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>





      {/* Food Product Cards */}
      <FoodProductSection />
      
      {/* Idly Podi Promotion */}
      <section className="py-20">
        <IdlyPodiPromo />
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Our Bestsellers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our most loved traditional spice blends and powders
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
          <div className="text-center">
            <Link href="/shop">
              <Button size="lg" variant="outline" className="border-green-300 text-green-700 hover:bg-green-50">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">What Our Customers Say</h2>
            <div className="flex justify-center items-center space-x-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">4.9/5</div>
                <div className="text-yellow-500">★★★★★</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">2,500+</div>
                <div className="text-gray-600">Reviews</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                text: "The idly podi tastes just like my grandmother's recipe! Absolutely authentic.",
                rating: 5,
              },
              {
                name: "Rajesh Kumar",
                text: "Best quality spices I've found online. Fresh and aromatic every time!",
                rating: 5,
              },
              {
                name: "Meena Patel",
                text: "Fast delivery and excellent packaging. The sambar powder is outstanding!",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl">
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-500 text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                <p className="font-semibold text-gray-900">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-600">
        <div className="container mx-auto px-4 text-center text-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Cooking?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of happy customers who have discovered the authentic taste of India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop">
                <Button size="lg" className="bg-white text-green-600 hover:bg-green-50 px-8 py-4 text-lg font-semibold">
                  Shop Now
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg">
                  Contact Us
                </Button>
              </Link>
            </div>
            <div className="mt-8 text-sm opacity-80">
              Free shipping on orders above ₹500 • 30-day money-back guarantee
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;