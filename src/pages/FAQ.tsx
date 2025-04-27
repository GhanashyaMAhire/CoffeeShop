import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    question: 'How fresh are your coffee beans?',
    answer: 'We roast our beans in small batches several times a week to ensure maximum freshness. All orders are shipped within 48 hours of roasting, and we always include the roast date on every bag.',
    category: 'Products',
  },
  {
    question: 'What is your shipping policy?',
    answer: 'We offer free standard shipping on all orders over $50. Standard shipping typically takes 3-5 business days. Express shipping options are available at checkout for an additional fee.',
    category: 'Orders & Shipping',
  },
  {
    question: 'How do I return a product?',
    answer: 'If you\'re not completely satisfied with your purchase, you can return unused and unopened items within 30 days for a full refund. Please contact our customer service team to initiate a return.',
    category: 'Returns & Refunds',
  },
  {
    question: 'What brewing method do you recommend?',
    answer: 'Different coffee beans shine with different brewing methods. For our light roasts, we often recommend pour-over or AeroPress to highlight their bright, complex flavors. For medium to dark roasts, French press or espresso can bring out their rich, full-bodied characteristics. Check each product page for specific brewing recommendations.',
    category: 'Brewing',
  },
  {
    question: 'Do you offer wholesale options?',
    answer: 'Yes, we offer wholesale pricing for cafes, restaurants, and offices. Please contact our wholesale team at wholesale@beanandbrew.com for more information or fill out the wholesale inquiry form on our website.',
    category: 'Business',
  },
  {
    question: 'How should I store my coffee?',
    answer: 'For optimal freshness, store your coffee in an airtight container away from light, heat, and moisture. We don\'t recommend storing coffee in the refrigerator or freezer, as this can introduce moisture and affect the flavor. Ideally, purchase only what you\'ll use within 2-3 weeks.',
    category: 'Products',
  },
  {
    question: 'Do you offer subscriptions?',
    answer: 'Yes! Our coffee subscription service allows you to receive fresh beans on a schedule that works for you. You can choose your favorite beans, frequency (weekly, bi-weekly, or monthly), and easily pause or modify your subscription at any time.',
    category: 'Subscriptions',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, and Google Pay. All transactions are secure and encrypted for your protection.',
    category: 'Payment',
  },
  {
    question: 'Are your coffees organic or Fair Trade?',
    answer: 'Many of our coffees are certified organic and/or Fair Trade. We\'re committed to sustainable and ethical sourcing practices. Each product page indicates the specific certifications for that coffee. We also work directly with many farmers through direct trade relationships to ensure fair compensation and sustainable practices.',
    category: 'Products',
  },
  {
    question: 'Can I visit your roastery?',
    answer: 'Yes! We offer tours of our roastery by appointment. You can book a tour through our website or by calling our customer service team. Tours include a guided tasting of our current offerings and a behind-the-scenes look at our roasting process.',
    category: 'Business',
  },
];

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  const categories = ['All', ...Array.from(new Set(faqs.map(faq => faq.category)))];
  
  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-serif font-bold text-amber-900 mb-4">Frequently Asked Questions</h1>
            <p className="text-amber-700">
              Find answers to common questions about our products, ordering, shipping, and more.
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="mb-8">
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-amber-500" />
              </div>
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? 'bg-amber-600 text-white'
                      : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* FAQs */}
          <div className="space-y-4">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-8 bg-amber-50 rounded-lg">
                <p className="text-amber-800 mb-2">No FAQs matching your search criteria.</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setActiveCategory('All');
                  }}
                  className="text-amber-600 hover:text-amber-800 transition-colors font-medium"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              filteredFAQs.map((faq, index) => (
                <div key={index} className="border border-amber-200 rounded-lg overflow-hidden">
                  <button
                    className="w-full px-6 py-4 text-left bg-amber-50 flex justify-between items-center focus:outline-none"
                    onClick={() => toggleFAQ(index)}
                  >
                    <span className="font-medium text-amber-900">{faq.question}</span>
                    {activeIndex === index ? (
                      <ChevronUp className="h-5 w-5 text-amber-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-amber-600" />
                    )}
                  </button>
                  
                  <div 
                    className={`px-6 py-4 bg-white transition-all duration-300 ${
                      activeIndex === index ? 'block' : 'hidden'
                    }`}
                  >
                    <p className="text-amber-700">{faq.answer}</p>
                    <div className="mt-2 text-sm">
                      <span className="inline-block bg-amber-100 text-amber-800 px-2 py-1 rounded">
                        {faq.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {/* Contact for More Questions */}
          <div className="mt-12 bg-amber-50 rounded-lg p-6 text-center">
            <h3 className="text-xl font-serif font-medium text-amber-900 mb-3">
              Still have questions?
            </h3>
            <p className="text-amber-700 mb-4">
              Can't find the answer you're looking for? Please contact our customer support team.
            </p>
            <a
              href="/contact"
              className="inline-block bg-amber-600 hover:bg-amber-500 text-white font-medium py-2 px-6 rounded transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;