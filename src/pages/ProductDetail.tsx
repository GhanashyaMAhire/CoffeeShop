import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Coffee, Heart, Share2, ChevronLeft, Star } from 'lucide-react';
import { products } from '../data/products';
import { reviews as allReviews } from '../data/reviews';
import { useCart } from '../context/CartContext';
import ReviewsList from '../components/ReviewsList';
import ReviewForm from '../components/ReviewForm';
import ProductCard from '../components/ProductCard';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState(allReviews);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');
  
  const product = products.find(p => p.id === Number(id));
  const productReviews = reviews.filter(review => review.productId === Number(id));
  
  const averageRating = productReviews.length 
    ? (productReviews.reduce((sum, review) => sum + review.rating, 0) / productReviews.length).toFixed(1)
    : 'No ratings';
  
  const similarProducts = products
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  const handleReviewSubmit = (newReview: {
    productId: number;
    userName: string;
    rating: number;
    comment: string;
  }) => {
    const review = {
      ...newReview,
      id: reviews.length + 1,
      date: new Date().toISOString().split('T')[0],
    };
    
    setReviews([...reviews, review]);
  };
  
  if (!product) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-bold text-amber-900 mb-4">Product Not Found</h2>
          <p className="text-amber-700 mb-6">
            Sorry, the product you're looking for doesn't exist or has been removed.
          </p>
          <Link 
            to="/products" 
            className="bg-amber-600 hover:bg-amber-500 text-white font-medium py-2 px-6 rounded-full transition-colors inline-flex items-center"
          >
            <ChevronLeft size={18} className="mr-2" />
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="text-sm text-amber-600 mb-6">
          <ol className="flex flex-wrap items-center">
            <li className="flex items-center">
              <Link to="/" className="hover:text-amber-800 transition-colors">Home</Link>
              <span className="mx-2">/</span>
            </li>
            <li className="flex items-center">
              <Link to="/products" className="hover:text-amber-800 transition-colors">Shop</Link>
              <span className="mx-2">/</span>
            </li>
            <li className="flex items-center">
              <Link 
                to={`/products?category=${product.category}`} 
                className="hover:text-amber-800 transition-colors"
              >
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Link>
              <span className="mx-2">/</span>
            </li>
            <li className="text-amber-800 font-medium truncate">{product.name}</li>
          </ol>
        </nav>
        
        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          {/* Product Image */}
          <div className="mb-8 lg:mb-0">
            <div className="bg-amber-50 rounded-lg overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-serif font-bold text-amber-900 mb-2">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                <span className="text-amber-700 font-medium mr-1">{averageRating}</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star}
                      size={16}
                      className={`${
                        productReviews.length && star <= Math.round(Number(averageRating))
                          ? 'text-amber-500 fill-amber-500' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
                <span className="ml-1 text-amber-600 text-sm">
                  ({productReviews.length} {productReviews.length === 1 ? 'review' : 'reviews'})
                </span>
              </div>
              
              <span className="text-xs uppercase font-medium px-2 py-1 bg-amber-100 text-amber-700 rounded">
                {product.category}
              </span>
            </div>
            
            <p className="text-2xl font-medium text-amber-800 mb-4">
              ${product.price.toFixed(2)}
            </p>
            
            <p className="text-amber-700 mb-6">{product.description}</p>
            
            {/* Product Details */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-amber-900 mb-2">Details</h3>
              <ul className="space-y-2 text-amber-700">
                {product.details.origin && (
                  <li className="flex">
                    <span className="font-medium w-32">Origin:</span>
                    <span>{product.details.origin}</span>
                  </li>
                )}
                {product.details.roastLevel && (
                  <li className="flex">
                    <span className="font-medium w-32">Roast Level:</span>
                    <span>{product.details.roastLevel.charAt(0).toUpperCase() + product.details.roastLevel.slice(1)}</span>
                  </li>
                )}
                {product.details.flavor && (
                  <li className="flex">
                    <span className="font-medium w-32">Flavor Notes:</span>
                    <span>{product.details.flavor.join(', ')}</span>
                  </li>
                )}
                {product.details.ingredients && (
                  <li className="flex">
                    <span className="font-medium w-32">Ingredients:</span>
                    <span>{product.details.ingredients.join(', ')}</span>
                  </li>
                )}
              </ul>
            </div>
            
            {/* Add to Cart */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="flex items-center border border-amber-300 rounded-md overflow-hidden mr-4">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 bg-amber-100 hover:bg-amber-200 text-amber-800 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium text-amber-900">
                    {quantity}
                  </span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 bg-amber-100 hover:bg-amber-200 text-amber-800 transition-colors"
                  >
                    +
                  </button>
                </div>
                
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-amber-600 hover:bg-amber-500 text-white font-medium py-3 px-6 rounded-md transition-colors flex items-center justify-center"
                >
                  <ShoppingCart size={18} className="mr-2" />
                  Add to Cart
                </button>
              </div>
              
              <div className="flex space-x-4">
                <button className="flex items-center text-amber-700 hover:text-amber-900 transition-colors">
                  <Heart size={18} className="mr-1" />
                  <span>Save</span>
                </button>
                <button className="flex items-center text-amber-700 hover:text-amber-900 transition-colors">
                  <Share2 size={18} className="mr-1" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs: Description and Reviews */}
        <div className="mt-12 mb-16">
          <div className="border-b border-amber-200 mb-6">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('description')}
                className={`pb-2 px-1 font-medium ${
                  activeTab === 'description'
                    ? 'border-b-2 border-amber-600 text-amber-900'
                    : 'text-amber-600 hover:text-amber-800'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-2 px-1 font-medium ${
                  activeTab === 'reviews'
                    ? 'border-b-2 border-amber-600 text-amber-900'
                    : 'text-amber-600 hover:text-amber-800'
                }`}
              >
                Reviews ({productReviews.length})
              </button>
            </div>
          </div>
          
          <div>
            {activeTab === 'description' ? (
              <div className="prose prose-amber max-w-none">
                <p className="text-amber-700 mb-4">
                  {product.description}
                </p>
                {product.category === 'coffee' && (
                  <>
                    <h3 className="text-xl font-serif font-semibold text-amber-900 mb-3">
                      About {product.name}
                    </h3>
                    <p className="text-amber-700 mb-4">
                      {product.details.origin && `Sourced from the beautiful highlands of ${product.details.origin}, `}
                      this {product.details.roastLevel} roast coffee offers a delightful balance of flavors. 
                      {product.details.flavor && ` Experience the wonderful notes of ${product.details.flavor.join(', ')}.`}
                    </p>
                    <h3 className="text-xl font-serif font-semibold text-amber-900 mb-3">
                      Brewing Recommendations
                    </h3>
                    <p className="text-amber-700 mb-4">
                      For the best flavor, we recommend brewing using a pour-over method with water at 200°F. 
                      Use 2 tablespoons of coffee per 6 ounces of water and adjust to taste.
                    </p>
                    <h3 className="text-xl font-serif font-semibold text-amber-900 mb-3">
                      Storage
                    </h3>
                    <p className="text-amber-700">
                      Store in an airtight container away from direct sunlight, heat, and moisture. 
                      For the freshest taste, consume within two weeks of opening.
                    </p>
                  </>
                )}
              </div>
            ) : (
              <div className="space-y-8">
                <ReviewsList reviews={productReviews} />
                <ReviewForm productId={product.id} onSubmit={handleReviewSubmit} />
              </div>
            )}
          </div>
        </div>
        
        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-serif font-bold text-amber-900 mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;