import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Instagram, Facebook, Twitter, MapPin, Mail, Phone, Check } from 'lucide-react';
import { sendNewsletterConfirmationEmail } from '../utils/email';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      try {
        await sendNewsletterConfirmationEmail(email);
        setSubscribed(true);
        setEmail('');
        
        // Reset the success message after 3 seconds
        setTimeout(() => setSubscribed(false), 3000);
      } catch (error) {
        console.error('Failed to subscribe:', error);
      }
    }
  };

  return (
    <footer className="bg-coffee-800 text-coffee-100 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo and About */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <Coffee className="h-8 w-8 text-coffee-200" />
              <span className="text-xl font-serif font-bold text-coffee-50">Bean & Brew</span>
            </Link>
            <p className="text-coffee-200 mb-4">
              Crafting exceptional coffee experiences since 2010. We source the finest beans from around the world to bring you the perfect cup.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-coffee-200 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-coffee-200 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-coffee-200 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-serif font-bold mb-4 text-coffee-50">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-coffee-200 hover:text-white transition-colors"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/products" 
                  className="text-coffee-200 hover:text-white transition-colors"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-coffee-200 hover:text-white transition-colors"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  to="/faq" 
                  className="text-coffee-200 hover:text-white transition-colors"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  className="text-coffee-200 hover:text-white transition-colors"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy" 
                  className="text-coffee-200 hover:text-white transition-colors"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-serif font-bold mb-4 text-coffee-50">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-coffee-200 mr-2 mt-0.5" />
                <span className="text-coffee-200">123 Coffee Street<br />Beans & Brow CoffeeShop Nashik, Maharashtra, India-423301</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-coffee-200 mr-2" />
                <a href="tel:+15035551234" className="text-coffee-200 hover:text-white transition-colors">
                  7249233582
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-coffee-200 mr-2" />
                <a href="mailto:hello@beanandbrew.com" className="text-coffee-200 hover:text-white transition-colors">
                  bean.brow@gmail.com
                </a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter Signup */}
          <div>
            <h3 className="text-lg font-serif font-bold mb-4 text-coffee-50">Stay Updated</h3>
            <p className="text-coffee-200 mb-4">
              Subscribe to our newsletter for updates on new products, brewing tips, and exclusive offers.
            </p>
            <form onSubmit={handleSubmit} className="space-y-2">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address" 
                className="w-full px-4 py-2 rounded bg-coffee-700 border border-coffee-600 text-white placeholder-coffee-300 focus:outline-none focus:ring-2 focus:ring-coffee-400"
                required
              />
              <button 
                type="submit" 
                className="w-full bg-coffee-400 hover:bg-coffee-500 text-white font-medium py-2 px-4 rounded transition-colors flex items-center justify-center"
              >
                {subscribed ? (
                  <>
                    <Check size={18} className="mr-2" />
                    Subscribed!
                  </>
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-6 mt-6 border-t border-coffee-700 text-center text-coffee-300 text-sm">
          <p>&copy; {new Date().getFullYear()} Bean & Brew Coffee Co. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;