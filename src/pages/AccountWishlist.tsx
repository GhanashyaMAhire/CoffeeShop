import React from 'react';
import { Heart } from 'lucide-react';

const AccountWishlist: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-serif font-bold text-amber-900 mb-8">My Wishlist</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center py-8">
              <Heart className="h-16 w-16 text-amber-400 mx-auto mb-4" />
              <h2 className="text-xl font-medium text-amber-900 mb-2">Your wishlist is empty</h2>
              <p className="text-amber-700">
                Save items you're interested in by clicking the heart icon on product pages.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountWishlist;