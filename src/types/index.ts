export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    featured?: boolean;
    details?: {
      origin?: string;
      origins?: string[];
      roastLevel?: string;
      flavor?: string[];
      process?: string;
      altitude?: string;
      harvest?: string;
      ingredients?: string[];
      steepTime?: string;
      temperature?: string;
      servings?: string;
      material?: string;
      size?: string;
      filterSize?: string;
      includes?: string[];
      care?: string;
      allergens?: string[];
      nutrition?: {
        calories: number;
        protein: string;
        fat: string;
        carbs: string;
      };
      grade?: string;
      options?: string[];
      settings?: string;
      capacity?: string;
      warranty?: string;
    };
  }
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Review {
  id: number;
  productId: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Advertisement {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
}
