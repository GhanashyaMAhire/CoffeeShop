import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };
  
  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      // In a real application, you would send the form data to a server
      console.log('Form submitted:', formData);
      setSubmitted(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }
  };
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-serif font-bold text-amber-900 mb-4">Contact Us</h1>
            <p className="text-amber-700 max-w-2xl mx-auto">
              Have questions, feedback, or just want to say hello? We'd love to hear from you! 
              Fill out the form below or reach out to us directly using the contact information provided.
            </p>
          </div>
          
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Contact Information */}
            <div className="mb-8 lg:mb-0">
              <div className="bg-amber-50 rounded-lg p-6 h-full">
                <h2 className="text-xl font-serif font-bold text-amber-900 mb-6">Get In Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-amber-100 p-3 rounded-full mr-4">
                      <MapPin className="h-5 w-5 text-amber-700" />
                    </div>
                    <div>
                      <h3 className="font-medium text-amber-900 mb-1">Visit Us</h3>
                      <address className="text-amber-700 not-italic">
                        123 Coffee Street<br />
                        Portland, OR 97201<br />
                        United States
                      </address>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-amber-100 p-3 rounded-full mr-4">
                      <Mail className="h-5 w-5 text-amber-700" />
                    </div>
                    <div>
                      <h3 className="font-medium text-amber-900 mb-1">Email Us</h3>
                      <a href="mailto:hello@beanandbrew.com" className="text-amber-700 hover:text-amber-900 transition-colors">
                        hello@beanandbrew.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-amber-100 p-3 rounded-full mr-4">
                      <Phone className="h-5 w-5 text-amber-700" />
                    </div>
                    <div>
                      <h3 className="font-medium text-amber-900 mb-1">Call Us</h3>
                      <a href="tel:+15035551234" className="text-amber-700 hover:text-amber-900 transition-colors">
                        (503) 555-1234
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-amber-100 p-3 rounded-full mr-4">
                      <Clock className="h-5 w-5 text-amber-700" />
                    </div>
                    <div>
                      <h3 className="font-medium text-amber-900 mb-1">Hours</h3>
                      <p className="text-amber-700">
                        Monday - Friday: 6am - 8pm<br />
                        Saturday: 7am - 8pm<br />
                        Sunday: 7am - 6pm
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-serif font-bold text-amber-900 mb-6">Send us a Message</h2>
                  
                  {submitted ? (
                    <div className="bg-green-50 text-green-800 p-4 rounded mb-6">
                      <h3 className="font-medium mb-2">Thank you for your message!</h3>
                      <p>We've received your inquiry and will get back to you as soon as possible.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label htmlFor="name" className="block text-amber-800 mb-1">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
                              errors.name 
                                ? 'border-red-300 focus:ring-red-200' 
                                : 'border-amber-300 focus:ring-amber-200'
                            }`}
                          />
                          {errors.name && (
                            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-amber-800 mb-1">
                            Your Email *
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
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="subject" className="block text-amber-800 mb-1">
                          Subject *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
                            errors.subject 
                              ? 'border-red-300 focus:ring-red-200' 
                              : 'border-amber-300 focus:ring-amber-200'
                          }`}
                        >
                          <option value="">Select a subject</option>
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="Product Question">Product Question</option>
                          <option value="Order Support">Order Support</option>
                          <option value="Feedback">Feedback</option>
                          <option value="Wholesale">Wholesale</option>
                          <option value="Other">Other</option>
                        </select>
                        {errors.subject && (
                          <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
                        )}
                      </div>
                      
                      <div className="mb-6">
                        <label htmlFor="message" className="block text-amber-800 mb-1">
                          Your Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
                            errors.message 
                              ? 'border-red-300 focus:ring-red-200' 
                              : 'border-amber-300 focus:ring-amber-200'
                          }`}
                        ></textarea>
                        {errors.message && (
                          <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                        )}
                      </div>
                      
                      <button
                        type="submit"
                        className="bg-amber-600 hover:bg-amber-500 text-white font-medium py-2 px-6 rounded transition-colors inline-flex items-center"
                      >
                        Send Message
                        <Send size={16} className="ml-2" />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Interactive Map */}
          <div className="mt-12 bg-white rounded-lg shadow-md overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2795.3105686581307!2d-122.68195698444384!3d45.52345337910149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDMxJzI0LjQiTiAxMjLCsDQwJzU1LjAiVw!5e0!3m2!1sen!2sus!4v1635959145784!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Store Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;