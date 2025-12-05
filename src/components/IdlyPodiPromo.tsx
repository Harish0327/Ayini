"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Cookie } from "lucide-react";

const IdlyPodiPromo = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Card */}
        <Card className="relative bg-gradient-to-br from-yellow-300 to-yellow-400 p-8 rounded-3xl shadow-2xl overflow-hidden">
          <div className="absolute top-6 left-6">
            <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Georgia, serif' }}>
              Idly Podi
            </h2>
          </div>
          
          <div className="absolute top-6 right-6">
            <span className="text-2xl font-bold text-gray-800">₹120</span>
          </div>

          <div className="flex flex-col items-center my-12">
            <div className="relative mb-6">
              <img 
                src="/assets/IdlyPodi.JPG"
                alt="Idly Podi with Idly and Ghee"
                className="w-64 h-64 object-cover rounded-full shadow-xl"
              />
            </div>
            <div className="text-center">
              <p className="text-gray-800 font-bold text-lg mb-3" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
                "Grandma's Secret Recipe"
              </p>
              <Button 
                size="sm" 
                className="bg-white/20 hover:bg-white/30 text-gray-800 rounded-full p-2 w-10 h-10"
              >
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Right Section */}
        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-8 rounded-3xl">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                Flavors crafted for tradition, & 
                <span className="text-orange-600"> cravings</span>
              </h1>
              
              <p className="text-gray-600 text-lg mb-8 font-medium">
                Roasted Gram, Red Chilli, Sesame, Salt, and Secret Home Blend.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold">
                  Taste the Tradition
                </Button>
                <Button variant="outline" className="border-orange-400 text-orange-600 hover:bg-orange-50 px-8 py-3 rounded-full font-semibold">
                  <Cookie className="w-5 h-5 mr-2" />
                  Order Now
                </Button>
              </div>
            </div>

            {/* Founder Section */}
            <div className="border-t border-orange-200 pt-8">
              <div className="flex items-center space-x-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-bold text-xl text-gray-800">Gopika Harni</h3>
                    <div className="w-8 h-px bg-orange-400"></div>
                    <span className="text-orange-600 font-medium">Founder</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Our kitchen crafts every Idly Podi with love, bringing authentic Coimbatore flavors to your plate.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-4 right-4 text-2xl opacity-30">🍃</div>
          <div className="absolute bottom-4 right-8 text-xl opacity-30">🌾</div>
        </div>
      </div>
    </div>
  );
};

export default IdlyPodiPromo;