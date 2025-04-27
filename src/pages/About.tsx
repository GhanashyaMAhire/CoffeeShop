import React from 'react';
import { Coffee, Users, Leaf, Award } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-serif font-bold text-amber-900 mb-6">Our Story</h1>
          <p className="text-lg text-amber-700 mb-8">
            Since 2010, Bean & Brew has been dedicated to bringing the finest coffee experiences to our community. 
            What started as a small roastery in Portland has grown into a passionate community of coffee lovers.
          </p>
          <div className="relative h-96 rounded-lg overflow-hidden">
            <img 
              src="https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg" 
              alt="Bean & Brew Roastery" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
        </div>

        {/* Values Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-serif font-bold text-amber-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coffee className="h-8 w-8 text-amber-700" />
              </div>
              <h3 className="text-xl font-medium text-amber-900 mb-2">Quality First</h3>
              <p className="text-amber-700">
                We source only the highest quality beans and maintain strict standards throughout our roasting process.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-amber-700" />
              </div>
              <h3 className="text-xl font-medium text-amber-900 mb-2">Community Focus</h3>
              <p className="text-amber-700">
                We believe in building strong relationships with our farmers, customers, and local community.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-amber-700" />
              </div>
              <h3 className="text-xl font-medium text-amber-900 mb-2">Sustainability</h3>
              <p className="text-amber-700">
                Environmental responsibility guides every decision, from farming practices to packaging.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-amber-700" />
              </div>
              <h3 className="text-xl font-medium text-amber-900 mb-2">Excellence</h3>
              <p className="text-amber-700">
                We continuously strive for excellence in every cup and every customer interaction.
              </p>
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-serif font-bold text-amber-900 text-center mb-12">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img 
                src="https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg" 
                alt="Coffee Roasting Process" 
                className="rounded-lg shadow-md mb-4"
              />
              <h3 className="text-xl font-medium text-amber-900 mb-2">Artisanal Roasting</h3>
              <p className="text-amber-700">
                Our master roasters carefully monitor every batch to bring out the unique characteristics of each origin.
              </p>
            </div>
            
            <div>
              <img 
                src="https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg" 
                alt="Quality Control" 
                className="rounded-lg shadow-md mb-4"
              />
              <h3 className="text-xl font-medium text-amber-900 mb-2">Quality Control</h3>
              <p className="text-amber-700">
                Every batch undergoes rigorous quality control and cupping sessions before reaching our customers.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-amber-900 text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="rounded-lg overflow-hidden mb-4">
                <img 
                  src="https://images.pexels.com/photos/4792696/pexels-photo-4792696.jpeg" 
                  alt="Master Roaster" 
                  className="w-full h-48 object-cover"
                />
              </div>
              <h3 className="text-xl font-medium text-amber-900 mb-1">Sarah Chen</h3>
              <p className="text-amber-700">Master Roaster</p>
            </div>
            
            <div className="text-center">
              <div className="rounded-lg overflow-hidden mb-4">
                <img 
                  src="https://images.pexels.com/photos/4792701/pexels-photo-4792701.jpeg" 
                  alt="Head Barista" 
                  className="w-full h-48 object-cover"
                />
              </div>
              <h3 className="text-xl font-medium text-amber-900 mb-1">James Wilson</h3>
              <p className="text-amber-700">Head Barista</p>
            </div>
            
            <div className="text-center">
              <div className="rounded-lg overflow-hidden mb-4">
                <img 
                  src="https://images.pexels.com/photos/7242908/pexels-photo-7242908.jpeg" 
                  alt="Quality Manager" 
                  className="w-full h-48 object-cover"
                />
              </div>
              <h3 className="text-xl font-medium text-amber-900 mb-1">Maria Rodriguez</h3>
              <p className="text-amber-700">Quality Manager</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;