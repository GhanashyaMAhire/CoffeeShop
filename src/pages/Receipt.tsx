import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Download, Printer, Mail } from 'lucide-react';

interface ShippingAddress {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface ReceiptItem {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
}

interface ReceiptData {
  id: string;
  date: string;
  items: ReceiptItem[];
  subtotal: number;
  tax: number;
  total: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
}

const Receipt: React.FC = () => {
  const navigate = useNavigate();
  const [receipt, setReceipt] = useState<ReceiptData | null>(null);
  
  useEffect(() => {
    const storedReceipt = localStorage.getItem('lastReceipt');
    
    if (storedReceipt) {
      setReceipt(JSON.parse(storedReceipt));
    } else {
      navigate('/');
    }
  }, [navigate]);
  
  if (!receipt) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <p className="text-amber-700">Loading receipt...</p>
      </div>
    );
  }
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleDownload = () => {
    // In a real application, you would generate a PDF here
    alert('Download functionality would be implemented in a production environment');
  };
  
  const handleEmail = () => {
    // In a real application, you would send an email here
    alert('Email functionality would be implemented in a production environment');
  };
  
  return (
    <div className="min-h-screen pt-24 pb-16 print:pt-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Print/Download Controls - Hidden when printing */}
          <div className="mb-8 print:hidden">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Link 
                to="/" 
                className="inline-flex items-center text-amber-600 hover:text-amber-800 transition-colors font-medium"
              >
                <ArrowLeft size={18} className="mr-1" />
                Continue Shopping
              </Link>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center text-amber-600 hover:text-amber-800 transition-colors"
                >
                  <Printer size={18} className="mr-1" />
                  <span>Print</span>
                </button>
                
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center text-amber-600 hover:text-amber-800 transition-colors"
                >
                  <Download size={18} className="mr-1" />
                  <span>Download</span>
                </button>
                
                <button
                  onClick={handleEmail}
                  className="inline-flex items-center text-amber-600 hover:text-amber-800 transition-colors"
                >
                  <Mail size={18} className="mr-1" />
                  <span>Email</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Receipt */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden print:shadow-none">
            <div className="p-8">
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between mb-8 pb-8 border-b border-amber-200">
                <div>
                  <h1 className="text-2xl font-serif font-bold text-amber-900 mb-2">Receipt</h1>
                  <p className="text-amber-700">Thank you for your order!</p>
                  
                  <div className="mt-4 flex items-center text-green-600 bg-green-50 px-3 py-2 rounded">
                    <Check size={18} className="mr-2" />
                    <span>Payment Successful</span>
                  </div>
                </div>
                
                <div className="text-right mt-4 sm:mt-0">
                  <div className="text-xl font-serif font-bold text-amber-900 mb-1">Bean & Brew</div>
                  <div className="text-amber-700">123 Coffee Street</div>
                  <div className="text-amber-700">Portland, OR 97201</div>
                  <div className="text-amber-700">hello@beanandbrew.com</div>
                </div>
              </div>
              
              {/* Order Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-medium text-amber-900 mb-2">Order Details</h3>
                  <p className="text-amber-700"><strong>Order #:</strong> {receipt.id}</p>
                  <p className="text-amber-700">
                    <strong>Order Date:</strong> {new Date(receipt.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-amber-700">
                    <strong>Payment Method:</strong> {receipt.paymentMethod === 'credit-card' ? 'Credit Card' : 'PayPal'}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-amber-900 mb-2">Shipping Address</h3>
                  <p className="text-amber-700">{receipt.shippingAddress.name}</p>
                  <p className="text-amber-700">{receipt.shippingAddress.address}</p>
                  <p className="text-amber-700">
                    {receipt.shippingAddress.city}, {receipt.shippingAddress.state} {receipt.shippingAddress.zipCode}
                  </p>
                  <p className="text-amber-700">{receipt.shippingAddress.country}</p>
                </div>
              </div>
              
              {/* Order Items */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-amber-900 mb-4">Order Items</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-amber-50">
                      <tr>
                        <th className="py-2 px-4 text-left text-amber-800">Product</th>
                        <th className="py-2 px-4 text-right text-amber-800">Price</th>
                        <th className="py-2 px-4 text-right text-amber-800">Quantity</th>
                        <th className="py-2 px-4 text-right text-amber-800">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-amber-100">
                      {receipt.items.map((item, index) => (
                        <tr key={index}>
                          <td className="py-4 px-4">
                            <div className="flex items-center">
                              <div className="w-12 h-12 bg-amber-50 rounded overflow-hidden mr-3 hidden sm:block">
                                <img
                                  src={item.product.image}
                                  alt={item.product.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span className="font-medium text-amber-900">{item.product.name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-right text-amber-700">
                            ${item.product.price.toFixed(2)}
                          </td>
                          <td className="py-4 px-4 text-right text-amber-700">
                            {item.quantity}
                          </td>
                          <td className="py-4 px-4 text-right font-medium text-amber-900">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="mb-8 flex justify-end">
                <div className="w-full max-w-xs">
                  <div className="space-y-2">
                    <div className="flex justify-between text-amber-700">
                      <span>Subtotal</span>
                      <span>${receipt.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-amber-700">
                      <span>Tax (8%)</span>
                      <span>${receipt.tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-amber-700">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="border-t border-amber-200 pt-2 flex justify-between font-bold text-amber-900">
                      <span>Total</span>
                      <span>${receipt.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Footer */}
              <div className="text-center text-amber-700 border-t border-amber-200 pt-8">
                <p className="mb-2">
                  If you have any questions about your order, please contact our customer service:
                </p>
                <p className="font-medium">
                  (503) 555-1234 or hello@beanandbrew.com
                </p>
                <p className="mt-4">
                  Thank you for choosing Bean & Brew!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receipt;