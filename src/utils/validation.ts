import { z } from 'zod';

export const emailSchema = z.string().email('Invalid email address');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

export const reviewSchema = z.object({
  userName: z.string().min(1, 'Name is required'),
  rating: z.number().min(1).max(5),
  comment: z.string().min(1, 'Comment is required'),
});

export const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: emailSchema,
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
});

export const checkoutFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: emailSchema,
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(5, 'Valid ZIP code is required'),
  country: z.string().min(1, 'Country is required'),
  paymentMethod: z.enum(['credit-card', 'paypal']),
});