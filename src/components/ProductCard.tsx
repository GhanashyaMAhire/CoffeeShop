import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Check } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [showCartConfirm, setShowCartConfirm] = useState(false);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setShowCartConfirm(true);
    
    // Hide the confirmation after 3 seconds
    setTimeout(() => setShowCartConfirm(false), 3000);
  };
  
  const handleViewCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div 
      className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={handleProductClick}
    >
      {product.featured && (
        <div className="absolute top-4 left-4 z-10 bg-amber-600 text-white text-xs uppercase font-bold py-1 px-2 rounded-full">
          Featured
        </div>
      )}
      
      <div className="h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-serif font-semibold text-amber-900 mb-1">{product.name}</h3>
          <span className="font-medium text-amber-700">${product.price.toFixed(2)}</span>
        </div>
        
        <p className="text-amber-700 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase font-medium text-amber-600 bg-amber-100 px-2 py-1 rounded">
            {product.category}
          </span>
          
          {showCartConfirm ? (
            <div className="flex space-x-2">
              <button
                onClick={handleViewCart}
                className="flex items-center justify-center p-2 rounded-full bg-green-100 hover:bg-green-200 text-green-800 transition-colors"
              >
                <Check size={18} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center p-2 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-800 transition-colors"
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingCart size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;