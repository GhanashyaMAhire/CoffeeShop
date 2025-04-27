import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Package, Settings, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AccountDropdown: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      onClose();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
      <Link
        to="/account"
        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center"
        onClick={onClose}
      >
        <User size={16} className="mr-2" />
        Profile
      </Link>
      <Link
        to="/account/orders"
        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center"
        onClick={onClose}
      >
        <Package size={16} className="mr-2" />
        Orders
      </Link>
      <Link
        to="/account/settings"
        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center"
        onClick={onClose}
      >
        <Settings size={16} className="mr-2" />
        Settings
      </Link>
      <button
        onClick={handleSignOut}
        className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100 flex items-center"
      >
        <LogOut size={16} className="mr-2" />
        Sign Out
      </button>
    </div>
  );
};

export default AccountDropdown;