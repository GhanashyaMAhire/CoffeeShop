import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Coffee, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import AccountDropdown from './AccountDropdown';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, signOut } = useAuth();
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsAccountDropdownOpen(false);
  }, [location]);

  const handleAccountClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAccountDropdownOpen(!isAccountDropdownOpen);
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#1A0F0A] shadow-lg py-2' : 'bg-[#1A0F0A]/90 py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Coffee className="h-8 w-8 text-coffee-100" />
          <span className="text-xl font-serif font-bold text-coffee-50">Bean & Brew</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" label="Home" isScrolled={isScrolled} />
          <NavLink to="/products" label="Shop" isScrolled={isScrolled} />
          <NavLink to="/contact" label="Contact" isScrolled={isScrolled} />
          <NavLink to="/faq" label="FAQ" isScrolled={isScrolled} />
          
          {user ? (
            <div className="relative">
              <button 
                onClick={handleAccountClick}
                className="flex items-center text-coffee-100 hover:text-white transition-colors"
              >
                <User size={20} className="mr-2" />
                <span>Account</span>
              </button>
              {isAccountDropdownOpen && (
                <AccountDropdown onClose={() => setIsAccountDropdownOpen(false)} />
              )}
            </div>
          ) : (
            <Link 
              to="/auth" 
              className="text-coffee-100 hover:text-white transition-colors"
            >
              Sign In
            </Link>
          )}
          
          <Link 
            to="/cart" 
            className="relative p-2 rounded-full hover:bg-coffee-700 transition-colors"
          >
            <ShoppingCart className="h-6 w-6 text-coffee-100" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-coffee-400 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <Link 
            to="/cart" 
            className="relative p-2 mr-2 rounded-full hover:bg-coffee-700 transition-colors"
          >
            <ShoppingCart className="h-6 w-6 text-coffee-100" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-coffee-400 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-coffee-100" />
            ) : (
              <Menu className="h-6 w-6 text-coffee-100" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#1A0F0A] shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <MobileNavLink to="/" label="Home" />
            <MobileNavLink to="/products" label="Shop" />
            <MobileNavLink to="/contact" label="Contact" />
            <MobileNavLink to="/faq" label="FAQ" />
            {user ? (
              <button
                onClick={() => signOut()}
                className="block w-full text-left px-4 py-2 text-coffee-100 hover:text-white hover:bg-coffee-700 transition-colors rounded"
              >
                Sign Out
              </button>
            ) : (
              <Link 
                to="/auth" 
                className="block px-4 py-2 text-coffee-100 hover:text-white hover:bg-coffee-700 transition-colors rounded"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
  isScrolled: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label, isScrolled }) => {
  const location = useLocation();
  const isActive = location.pathname === to || 
    (to !== '/' && location.pathname.startsWith(to));
  
  return (
    <Link 
      to={to} 
      className={`transition-colors px-2 py-1 font-medium ${
        isActive 
          ? 'text-coffee-200 border-b-2 border-coffee-400' 
          : 'text-coffee-100 hover:text-white'
      }`}
    >
      {label}
    </Link>
  );
};

interface MobileNavLinkProps {
  to: string;
  label: string;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to || 
    (to !== '/' && location.pathname.startsWith(to));
  
  return (
    <Link 
      to={to} 
      className={`block py-2 px-4 text-lg font-medium ${
        isActive 
          ? 'text-coffee-200 bg-coffee-700 rounded' 
          : 'text-coffee-100 hover:text-white hover:bg-coffee-700 rounded'
      }`}
    >
      {label}
    </Link>
  );
};

export default Header;