"use client";

import { useState, useEffect } from "react";

const GreenTreeHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const webImages = [
    "/src/assets/WebScreen1.png",
    "/src/assets/WebScreen2.png", 
    "/src/assets/WebScreen3.png",
    "/src/assets/WebScreen4.png",
    "/src/assets/WebScreen5.png"
  ];
  
  const mobileImages = [
    "/src/assets/MobileScreen - 1.png",
    "/src/assets/MobileScreen  - 2.png",
    "/src/assets/MobileScreen  - 3.png", 
    "/src/assets/MobileScreen  - 4.png",
    "/src/assets/MobileScreen  - 5.png",
    "/src/assets/MobileScreen  - 6.png"
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % webImages.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [webImages.length]);
  
  return (
    <section className="w-full relative overflow-hidden">
      {/* Desktop Images */}
      <div className="hidden md:block">
        <img 
          src={webImages[currentSlide]}
          alt={`Web Screen ${currentSlide + 1}`}
          className="w-full h-auto object-cover transition-opacity duration-500"
        />
      </div>
      
      {/* Mobile Images */}
      <div className="block md:hidden">
        <img 
          src={mobileImages[currentSlide % mobileImages.length]}
          alt={`Mobile Screen ${(currentSlide % mobileImages.length) + 1}`}
          className="w-full h-auto object-cover transition-opacity duration-500"
        />
      </div>
      
      {/* Slide Indicators */}
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

export default GreenTreeHero;