import React from 'react';
import { Package } from 'lucide-react';

const AccountOrders: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-serif font-bold text-amber-900 mb-8">My Orders</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center py-8">
              <Package className="h-16 w-16 text-amber-400 mx-auto mb-4" />
              <h2 className="text-xl font-medium text-amber-900 mb-2">No orders yet</h2>
              <p className="text-amber-700">
                When you make a purchase, your order history will appear here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountOrders;