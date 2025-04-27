import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Save, Loader } from 'lucide-react';

const AccountSettings: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    notifications: {
      orderUpdates: true,
      promotions: true,
      newsletter: true,
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error updating settings:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-serif font-bold text-amber-900 mb-8">Account Settings</h1>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-medium text-amber-900 mb-4">Profile Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-amber-800 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-3 py-2 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-amber-800 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-3 py-2 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-medium text-amber-900 mb-4">Email Preferences</h2>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.notifications.orderUpdates}
                        onChange={(e) => setFormData({
                          ...formData,
                          notifications: {
                            ...formData.notifications,
                            orderUpdates: e.target.checked,
                          },
                        })}
                        className="rounded border-amber-300 text-amber-600 focus:ring-amber-500"
                      />
                      <span className="ml-2 text-amber-800">Order updates and shipping notifications</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.notifications.promotions}
                        onChange={(e) => setFormData({
                          ...formData,
                          notifications: {
                            ...formData.notifications,
                            promotions: e.target.checked,
                          },
                        })}
                        className="rounded border-amber-300 text-amber-600 focus:ring-amber-500"
                      />
                      <span className="ml-2 text-amber-800">Promotional offers and discounts</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.notifications.newsletter}
                        onChange={(e) => setFormData({
                          ...formData,
                          notifications: {
                            ...formData.notifications,
                            newsletter: e.target.checked,
                          },
                        })}
                        className="rounded border-amber-300 text-amber-600 focus:ring-amber-500"
                      />
                      <span className="ml-2 text-amber-800">Newsletter subscription</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-amber-600 hover:bg-amber-500 text-white font-medium py-2 px-4 rounded transition-colors flex items-center justify-center"
                >
                  {loading ? (
                    <Loader size={20} className="animate-spin" />
                  ) : (
                    <>
                      <Save size={20} className="mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
                
                {success && (
                  <p className="mt-4 text-green-600 text-sm">Settings updated successfully!</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;