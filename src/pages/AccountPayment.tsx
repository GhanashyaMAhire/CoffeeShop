import React from 'react';
import { CreditCard, Plus } from 'lucide-react';

const AccountPayment: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-serif font-bold text-amber-900 mb-8">Payment Methods</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center py-8">
              <CreditCard className="h-16 w-16 text-amber-400 mx-auto mb-4" />
              <h2 className="text-xl font-medium text-amber-900 mb-2">No payment methods</h2>
              <p className="text-amber-700 mb-4">
                Add a payment method to make checkout faster.
              </p>
              <button className="bg-amber-600 hover:bg-amber-500 text-white font-medium py-2 px-4 rounded transition-colors flex items-center justify-center mx-auto">
                <Plus size={20} className="mr-2" />
                Add Payment Method
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPayment;