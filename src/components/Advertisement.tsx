import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Advertisement as AdvertisementType } from '../types';

interface AdvertisementProps {
  advertisements: AdvertisementType[];
  autoRotate?: boolean;
  interval?: number;
}

const Advertisement: React.FC<AdvertisementProps> = ({ 
  advertisements,
  autoRotate = true,
  interval = 5000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  
  const goToNext = useCallback(() => {
    setDirection('right');
    setCurrentIndex((prevIndex) => (prevIndex + 1) % advertisements.length);
  }, [advertisements.length]);
  
  const goToPrevious = useCallback(() => {
    setDirection('left');
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? advertisements.length - 1 : prevIndex - 1
    );
  }, [advertisements.length]);
  
  useEffect(() => {
    if (!autoRotate || advertisements.length <= 1 || isHovered) return;
    
    const rotationInterval = setInterval(goToNext, interval);
    return () => clearInterval(rotationInterval);
  }, [autoRotate, advertisements.length, interval, isHovered, goToNext]);
  
  if (advertisements.length === 0) return null;
  
  return (
    <div 
      className="relative overflow-hidden rounded-lg bg-[#2C1810] h-[300px] md:h-[400px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {advertisements.map((ad, index) => (
        <div 
          key={ad.id}
          className={`absolute inset-0 transition-all duration-700 transform ${
            index === currentIndex 
              ? 'opacity-100 translate-x-0 z-10' 
              : direction === 'right'
                ? index < currentIndex 
                  ? 'opacity-0 -translate-x-full z-0'
                  : 'opacity-0 translate-x-full z-0'
                : index < currentIndex
                  ? 'opacity-0 translate-x-full z-0'
                  : 'opacity-0 -translate-x-full z-0'
          }`}
        >
          <div className="relative h-full">
            <img 
              src={ad.image} 
              alt={ad.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#2C1810]/80 to-transparent flex flex-col justify-center px-6 md:px-12">
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#F5E6D3] mb-2 md:mb-4">
                {ad.title}
              </h3>
              <p className="text-[#E6C8A0] mb-6 max-w-md">
                {ad.description}
              </p>
              <div>
                <Link 
                  to={ad.link}
                  className="inline-block bg-[#8B4513] hover:bg-[#A0522D] text-white font-medium py-2 px-6 rounded-full transition-colors"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {advertisements.length > 1 && (
        <>
          <button 
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 rounded-full p-2 text-white transition-colors"
            aria-label="Previous advertisement"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 rounded-full p-2 text-white transition-colors"
            aria-label="Next advertisement"
          >
            <ChevronRight size={24} />
          </button>
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
            {advertisements.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 'right' : 'left');
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-white w-4' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to advertisement ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Advertisement;