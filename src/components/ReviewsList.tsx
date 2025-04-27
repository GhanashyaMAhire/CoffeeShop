import React from 'react';
import { Star } from 'lucide-react';
import { Review } from '../types';

interface ReviewsListProps {
  reviews: Review[];
}

const ReviewsList: React.FC<ReviewsListProps> = ({ reviews }) => {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-amber-700">No reviews yet. Be the first to review this product!</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="bg-amber-50 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-medium text-amber-900">{review.userName}</h4>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={`${
                      i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <span className="text-xs text-amber-700">
              {new Date(review.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
          <p className="text-amber-800">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewsList;