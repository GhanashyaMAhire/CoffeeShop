import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { checkoutFormSchema } from '../utils/validation';
import { sendOrderConfirmationEmail } from '../utils/email';
import { formatPrice } from '../utils/cart';
import { CreditCard, Loader } from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  paymentMethod: 'credit-card' | 'paypal';
}

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, subtotal, tax, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    paymentMethod: 'credit-card',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when field is updated
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      // Validate form data
      checkoutFormSchema.parse(formData);

      // Generate a receipt ID
      const receiptId = `INV-${Math.floor(100000 + Math.random() * 900000)}`;
      const date = new Date().toISOString();

      // Store receipt data in localStorage
      const receiptData = {
        id: receiptId,
        date,
        items: cartItems,
        subtotal,
        tax,
        total,
        shippingAddress: {
          name: `${formData.firstName} ${formData.lastName}`,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
        paymentMethod: formData.paymentMethod,
      };

      localStorage.setItem('lastReceipt', JSON.stringify(receiptData));

      // Send order confirmation email
      await sendOrderConfirmationEmail(formData.email, receiptId);

      // Clear the cart and navigate to receipt page
      clearCart();
      navigate('/receipt');
    } catch (error) {
      if (error instanceof Error) {
        setErrors({ submit: error.message });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-serif font-bold text-amber-900 mb-8">Checkout</h1>

          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Form */}
            <div className="lg:col-span-2 mb-8 lg:mb-0">
              <form id="checkout-form" onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-medium text-amber-900 mb-6">Shipping Information</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label htmlFor="firstName" className="block text-amber-800 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
                          errors.firstName
                            ? 'border-red-300 focus:ring-red-200'
                            : 'border-amber-300 focus:ring-amber-200'
                        }`}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-amber-800 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
                          errors.lastName
                            ? 'border-red-300 focus:ring-red-200'
                            : 'border-amber-300 focus:ring-amber-200'
                        }`}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="block text-amber-800 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
                        errors.email
                          ? 'border-red-300 focus:ring-red-200'
                          : 'border-amber-300 focus:ring-amber-200'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="address" className="block text-amber-800 mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
                        errors.address
                          ? 'border-red-300 focus:ring-red-200'
                          : 'border-amber-300 focus:ring-amber-200'
                      }`}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="city" className="block text-amber-800 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
                          errors.city
                            ? 'border-red-300 focus:ring-red-200'
                            : 'border-amber-300 focus:ring-amber-200'
                        }`}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="state" className="block text-amber-800 mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
                          errors.state
                            ? 'border-red-300 focus:ring-red-200'
                            : 'border-amber-300 focus:ring-amber-200'
                        }`}
                      />
                      {errors.state && (
                        <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="zipCode" className="block text-amber-800 mb-1">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
                          errors.zipCode
                            ? 'border-red-300 focus:ring-red-200'
                            : 'border-amber-300 focus:ring-amber-200'
                        }`}
                      />
                      {errors.zipCode && (
                        <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="country" className="block text-amber-800 mb-1">
                        Country *
                      </label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
                          errors.country
                            ? 'border-red-300 focus:ring-red-200'
                            : 'border-amber-300 focus:ring-amber-200'
                        }`}
                      />
                      {errors.country && (
                        <p className="text-red-500 text-xs mt-1">{errors.country}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-amber-900 mb-3">Payment Method</h3>
                    <div className="space-y-2">
                      <label className="block">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="credit-card"
                          checked={formData.paymentMethod === 'credit-card'}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <span className="text-amber-800">Credit Card</span>
                      </label>
                      <label className="block">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="paypal"
                          checked={formData.paymentMethod === 'paypal'}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <span className="text-amber-800">PayPal</span>
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-24">
                <div className="p-6">
                  <h2 className="text-xl font-medium text-amber-900 mb-4">Order Summary</h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-amber-800">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-amber-800">
                      <span>Tax (8%)</span>
                      <span>{formatPrice(tax)}</span>
                    </div>
                    <div className="flex justify-between text-amber-800">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="border-t border-amber-200 pt-3 flex justify-between font-bold text-amber-900">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    form="checkout-form"
                    disabled={loading}
                    className="w-full bg-amber-600 hover:bg-amber-500 text-white font-medium py-3 px-6 rounded transition-colors flex items-center justify-center"
                  >
                    {loading ? (
                      <Loader size={20} className="animate-spin" />
                    ) : (
                      <>
                        <CreditCard size={20} className="mr-2" />
                        Complete Order
                      </>
                    )}
                  </button>

                  {errors.submit && (
                    <p className="mt-4 text-red-500 text-sm text-center">{errors.submit}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;