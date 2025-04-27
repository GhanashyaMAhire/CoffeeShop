import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Package, Settings, CreditCard, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Account: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-serif font-bold text-amber-900 mb-8">My Account</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Orders */}
            <Link
              to="/account/orders"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <Package className="h-8 w-8 text-amber-600 mr-3" />
                <h2 className="text-xl font-medium text-amber-900">Orders</h2>
              </div>
              <p className="text-amber-700">View and track your orders</p>
            </Link>

            {/* Settings */}
            <Link
              to="/account/settings"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <Settings className="h-8 w-8 text-amber-600 mr-3" />
                <h2 className="text-xl font-medium text-amber-900">Settings</h2>
              </div>
              <p className="text-amber-700">Manage your account preferences</p>
            </Link>

            {/* Payment Methods */}
            <Link
              to="/account/payment"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <CreditCard className="h-8 w-8 text-amber-600 mr-3" />
                <h2 className="text-xl font-medium text-amber-900">Payment Methods</h2>
              </div>
              <p className="text-amber-700">Manage your payment options</p>
            </Link>

            {/* Wishlist */}
            <Link
              to="/account/wishlist"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <Heart className="h-8 w-8 text-amber-600 mr-3" />
                <h2 className="text-xl font-medium text-amber-900">Wishlist</h2>
              </div>
              <p className="text-amber-700">View your saved items</p>
            </Link>
          </div>

          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-medium text-amber-900 mb-4">Account Information</h2>
            <div className="space-y-2">
              <p className="text-amber-700">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="text-amber-700">
                <strong>Member since:</strong>{' '}
                {new Date(user.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;