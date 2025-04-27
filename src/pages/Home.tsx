import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Coffee, ShoppingBag, Star, Truck } from 'lucide-react';
import Advertisement from '../components/Advertisement';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { advertisements } from '../data/advertisements';
import { heroImages } from '../data/heroImages';

const Home: React.FC = () => {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const featuredProducts = products.filter(product => product.featured);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="min-h-screen">
      {/* Special Offers Section */}
      <section className="pt-24 pb-10 bg-coffee-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-coffee-900 text-center mb-8">Special Offers</h2>
          <Advertisement advertisements={advertisements} />
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative h-[600px]">
        {heroImages.map((hero, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentHeroIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0">
              <img 
                src={hero.url} 
                alt={hero.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-coffee-900/80 to-coffee-800/40"></div>
            </div>
            
            <div className="relative container mx-auto px-4 h-full flex items-center">
              <div className="max-w-xl text-white">
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{hero.title}</h1>
                <p className="text-xl text-coffee-100 mb-8">{hero.description}</p>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    to="/products" 
                    className="bg-coffee-400 hover:bg-coffee-500 text-white font-medium py-3 px-6 rounded-full transition-colors inline-flex items-center"
                  >
                    Shop Now
                    <ArrowRight size={18} className="ml-2" />
                  </Link>
                  <Link 
                    to="/about" 
                    className="bg-transparent hover:bg-white/10 text-white border border-white font-medium py-3 px-6 rounded-full transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-coffee-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-coffee-900 text-center mb-12">Why Choose Bean & Brew?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-coffee-100 p-3 rounded-full">
                  <Coffee className="h-8 w-8 text-coffee-700" />
                </div>
              </div>
              <h3 className="text-xl font-medium text-coffee-900 mb-2">Premium Beans</h3>
              <p className="text-coffee-700">
                We source only the highest quality beans from sustainable farms around the world.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-coffee-100 p-3 rounded-full">
                  <Star className="h-8 w-8 text-coffee-700" />
                </div>
              </div>
              <h3 className="text-xl font-medium text-coffee-900 mb-2">Expert Roasting</h3>
              <p className="text-coffee-700">
                Our master roasters bring out the unique flavor profile of each origin.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-coffee-100 p-3 rounded-full">
                  <Truck className="h-8 w-8 text-coffee-700" />
                </div>
              </div>
              <h3 className="text-xl font-medium text-coffee-900 mb-2">Fresh Delivery</h3>
              <p className="text-coffee-700">
                We ship within 48 hours of roasting to ensure maximum freshness.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-coffee-100 p-3 rounded-full">
                  <ShoppingBag className="h-8 w-8 text-coffee-700" />
                </div>
              </div>
              <h3 className="text-xl font-medium text-coffee-900 mb-2">Satisfaction Guaranteed</h3>
              <p className="text-coffee-700">
                Love your coffee or we'll make it right with our 100% satisfaction guarantee.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-serif font-bold text-coffee-900">Featured Products</h2>
            <Link 
              to="/products" 
              className="text-coffee-600 hover:text-coffee-700 font-medium inline-flex items-center"
            >
              View All
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-16 bg-coffee-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">Join Our Coffee Community</h2>
          <p className="text-coffee-100 max-w-2xl mx-auto mb-8">
            Subscribe to our newsletter for brewing tips, special offers, and updates on new coffee arrivals.
          </p>
          
          <form className="max-w-md mx-auto flex">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-4 py-3 rounded-l-lg bg-coffee-700 border border-coffee-600 text-white placeholder-coffee-300 focus:outline-none focus:ring-2 focus:ring-coffee-500"
            />
            <button 
              type="submit" 
              className="bg-coffee-600 hover:bg-coffee-500 text-white font-medium py-3 px-6 rounded-r-lg transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;