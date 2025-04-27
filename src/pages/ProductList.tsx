import React, { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { Product } from '../types';

const ProductList: React.FC = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'name' | 'price-asc' | 'price-desc'>('name');
  const [showFilters, setShowFilters] = useState(false);
  
  const categories = ['all', ...new Set(products.map(product => product.category))];
  
  useEffect(() => {
    let result = [...products];
    
    // Filter by category
    if (activeCategory !== 'all') {
      result = result.filter(product => product.category === activeCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        product => 
          product.name.toLowerCase().includes(term) || 
          product.description.toLowerCase().includes(term)
      );
    }
    
    // Sort
    switch (sortOrder) {
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
    }
    
    setFilteredProducts(result);
  }, [activeCategory, searchTerm, sortOrder]);
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-amber-900 mb-2">Shop Our Products</h1>
          <p className="text-amber-700">
            Discover our selection of premium coffees, teas, equipment, and more.
          </p>
        </div>
        
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Mobile Filters Toggle */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-between bg-amber-100 px-4 py-2 rounded-lg text-amber-800 font-medium"
            >
              <span>Filters & Sorting</span>
              <Filter size={20} />
            </button>
          </div>
          
          {/* Sidebar Filters */}
          <div className={`lg:block ${showFilters ? 'block' : 'hidden'} lg:col-span-1`}>
            <div className="bg-amber-50 rounded-lg p-6 sticky top-24">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-amber-900 mb-3">Search</h3>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-amber-900 mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                        activeCategory === category
                          ? 'bg-amber-200 text-amber-900 font-medium'
                          : 'text-amber-700 hover:bg-amber-100'
                      }`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-amber-900 mb-3">Sort By</h3>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as 'name' | 'price-asc' | 'price-desc')}
                  className="w-full px-3 py-2 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="price-asc">Price (Low to High)</option>
                  <option value="price-desc">Price (High to Low)</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-amber-50 rounded-lg p-8 text-center">
                <h3 className="text-xl font-medium text-amber-900 mb-2">No products found</h3>
                <p className="text-amber-700 mb-4">
                  Try adjusting your search or filter criteria.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    setSearchTerm('');
                    setSortOrder('name');
                  }}
                  className="bg-amber-600 hover:bg-amber-500 text-white font-medium py-2 px-4 rounded transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                <div className="mb-4 flex justify-between items-center">
                  <p className="text-amber-700">
                    Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;