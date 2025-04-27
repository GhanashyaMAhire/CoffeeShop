import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../types';
import { useCart } from '../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;
  
  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(product.id, newQuantity);
  };
  
  const handleRemove = () => {
    removeFromCart(product.id);
  };
  
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b border-amber-200">
      <div className="flex-shrink-0 w-full sm:w-24 h-24 mb-3 sm:mb-0 sm:mr-4 bg-amber-50 rounded overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-grow">
        <h3 className="text-lg font-medium text-amber-900">{product.name}</h3>
        <p className="text-sm text-amber-700 mb-2">${product.price.toFixed(2)}</p>
      </div>
      
      <div className="flex items-center mt-3 sm:mt-0">
        <div className="flex items-center border border-amber-300 rounded overflow-hidden mr-4">
          <button
            onClick={() => handleQuantityChange(quantity - 1)}
            className="px-2 py-1 bg-amber-100 hover:bg-amber-200 text-amber-800 transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </button>
          
          <span className="w-10 text-center font-medium text-amber-900">
            {quantity}
          </span>
          
          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            className="px-2 py-1 bg-amber-100 hover:bg-amber-200 text-amber-800 transition-colors"
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>
        </div>
        
        <div className="text-right">
          <p className="font-semibold text-amber-900 mb-1">
            ${(product.price * quantity).toFixed(2)}
          </p>
          
          <button
            onClick={handleRemove}
            className="text-amber-600 hover:text-amber-800 transition-colors inline-flex items-center text-sm"
            aria-label={`Remove ${product.name} from cart`}
          >
            <Trash2 size={14} className="mr-1" />
            <span>Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;