import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface ReviewFormProps {
  productId: number;
  onSubmit: (review: {
    productId: number;
    userName: string;
    rating: number;
    comment: string;
  }) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId, onSubmit }) => {
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!userName.trim()) {
      setError('Please enter your name');
      return;
    }
    
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }
    
    if (!comment.trim()) {
      setError('Please enter a comment');
      return;
    }
    
    onSubmit({
      productId,
      userName: userName.trim(),
      rating,
      comment: comment.trim(),
    });
    
    // Reset form
    setUserName('');
    setRating(0);
    setComment('');
    setSuccess(true);
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };
  
  return (
    <div className="bg-amber-50 rounded-lg p-6">
      <h3 className="text-xl font-serif font-semibold text-amber-900 mb-4">Write a Review</h3>
      
      {success && (
        <div className="bg-green-100 text-green-800 p-3 rounded mb-4">
          Thank you for your review! It has been submitted successfully.
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 text-red-800 p-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="userName" className="block text-amber-800 mb-1">Your Name</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-3 py-2 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-amber-800 mb-1">Rating</label>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setRating(i + 1)}
                onMouseEnter={() => setHoveredRating(i + 1)}
                onMouseLeave={() => setHoveredRating(0)}
                className="text-2xl mr-1 focus:outline-none"
              >
                <Star
                  size={24}
                  className={`${
                    (hoveredRating ? i < hoveredRating : i < rating)
                      ? 'text-amber-500 fill-amber-500'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="comment" className="block text-amber-800 mb-1">Your Review</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
          ></textarea>
        </div>
        
        <button
          type="submit"
          className="bg-amber-600 hover:bg-amber-500 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;