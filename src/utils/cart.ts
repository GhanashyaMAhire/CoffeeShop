import { CartItem, Product } from '../types';

export const calculateCartTotals = (items: CartItem[]) => {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + tax;
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    subtotal,
    tax,
    total,
    totalItems,
  };
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

export const isProductInCart = (cartItems: CartItem[], productId: number): boolean => {
  return cartItems.some(item => item.product.id === productId);
};

export const findCartItem = (cartItems: CartItem[], productId: number): CartItem | undefined => {
  return cartItems.find(item => item.product.id === productId);
};

export const updateCartItemQuantity = (
  cartItems: CartItem[],
  productId: number,
  quantity: number
): CartItem[] => {
  return cartItems.map(item =>
    item.product.id === productId
      ? { ...item, quantity: Math.max(0, quantity) }
      : item
  ).filter(item => item.quantity > 0);
};

export const addToCart = (
  cartItems: CartItem[],
  product: Product,
  quantity: number = 1
): CartItem[] => {
  const existingItem = findCartItem(cartItems, product.id);

  if (existingItem) {
    return updateCartItemQuantity(
      cartItems,
      product.id,
      existingItem.quantity + quantity
    );
  }

  return [...cartItems, { product, quantity }];
};