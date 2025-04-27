import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Coffee, Mail, Lock, Loader } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { sendWelcomeEmail } from '../utils/email';

const Auth: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/';
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (isSignUp) {
        await signUp(email, password);
        await sendWelcomeEmail(email);
        alert('Please check your email to verify your account');
      } else {
        await signIn(email, password);
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen pt-24 pb-16 bg-coffee-50">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block p-3 rounded-full bg-coffee-100 mb-4">
              <Coffee size={32} className="text-coffee-800" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-coffee-900 mb-2">
              {isSignUp ? 'Create an Account' : 'Welcome Back'}
            </h1>
            <p className="text-coffee-600">
              {isSignUp 
                ? 'Join our coffee-loving community'
                : 'Sign in to your account'}
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            {error && (
              <div className="bg-red-50 text-red-800 p-3 rounded mb-4">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-coffee-800 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-coffee-400" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-coffee-200 rounded focus:outline-none focus:ring-2 focus:ring-coffee-500"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-coffee-800 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-coffee-400" />
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-coffee-200 rounded focus:outline-none focus:ring-2 focus:ring-coffee-500"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-coffee-600 hover:bg-coffee-500 text-white font-medium py-2 px-4 rounded transition-colors flex items-center justify-center"
              >
                {loading ? (
                  <Loader size={20} className="animate-spin" />
                ) : (
                  isSignUp ? 'Sign Up' : 'Sign In'
                )}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-coffee-600 hover:text-coffee-800 transition-colors"
              >
                {isSignUp 
                  ? 'Already have an account? Sign in'
                  : 'Need an account? Sign up'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;