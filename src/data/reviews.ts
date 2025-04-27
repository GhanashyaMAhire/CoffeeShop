import { Review } from '../types';

export const reviews: Review[] = [
  {
    id: 1,
    productId: 1,
    userName: 'Coffee Lover',
    rating: 5,
    comment: 'This Ethiopian Yirgacheffe is incredible! The citrus notes really shine through.',
    date: '2025-04-10',
  },
  {
    id: 2,
    productId: 1,
    userName: 'Morning Brewer',
    rating: 4,
    comment: 'Bright and flavorful. Makes for a perfect morning cup.',
    date: '2025-04-05',
  },
  {
    id: 3,
    productId: 2,
    userName: 'Bean Enthusiast',
    rating: 5,
    comment: 'Smooth, balanced, and exactly what I want in a Colombian coffee.',
    date: '2025-04-08',
  },
  {
    id: 4,
    productId: 4,
    userName: 'Daily Drinker',
    rating: 4,
    comment: 'This house blend has become my daily driver. Great price for the quality!',
    date: '2025-04-12',
  },
  {
    id: 5,
    productId: 6,
    userName: 'Pour Over Pro',
    rating: 5,
    comment: 'Beautiful dripper that makes a perfect cup every time. Worth every penny.',
    date: '2025-04-03',
  },
];