import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, ChevronLeft, ArrowRight } from 'lucide-react';
import CartItem from '../components/CartItem';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { cartItems, subtotal, tax, total, clearCart } = useCart();
  
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="bg-amber-50 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <ShoppingCart size={36} className="text-amber-600" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-amber-900 mb-4">Your Cart is Empty</h2>
          <p className="text-amber-700 mb-6">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link 
            to="/products" 
            className="bg-amber-600 hover:bg-amber-500 text-white font-medium py-3 px-6 rounded-full transition-colors inline-flex items-center"
          >
            Start Shopping
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-amber-900">Your Cart</h1>
          <button
            onClick={clearCart}
            className="text-amber-600 hover:text-amber-800 transition-colors"
          >
            Clear Cart
          </button>
        </div>
        
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2 mb-8 lg:mb-0">
            {/* Cart Items */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-medium text-amber-900 mb-4">
                  Items ({cartItems.length})
                </h2>
                
                <div className="divide-y divide-amber-200">
                  {cartItems.map(item => (
                    <CartItem key={item.product.id} item={item} />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Continue Shopping */}
            <div className="mt-6">
              <Link 
                to="/products" 
                className="inline-flex items-center text-amber-600 hover:text-amber-800 transition-colors font-medium"
              >
                <ChevronLeft size={18} className="mr-1" />
                Continue Shopping
              </Link>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-24">
              <div className="p-6">
                <h2 className="text-xl font-medium text-amber-900 mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-amber-800">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-amber-800">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-amber-800">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t border-amber-200 pt-3 flex justify-between font-bold text-amber-900">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <Link 
                  to="/checkout" 
                  className="w-full bg-amber-600 hover:bg-amber-500 text-white font-medium py-3 px-6 rounded-md transition-colors flex items-center justify-center"
                >
                  Proceed to Checkout
                  <ArrowRight size={18} className="ml-2" />
                </Link>
                
                <div className="mt-6 text-center text-sm text-amber-700">
                  <p>We accept</p>
                  <div className="flex justify-center space-x-2 mt-2">
                    <div className="bg-gray-100 rounded px-2 py-1">Visa</div>
                    <div className="bg-gray-100 rounded px-2 py-1">Mastercard</div>
                    <div className="bg-gray-100 rounded px-2 py-1">PayPal</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;