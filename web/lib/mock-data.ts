export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  stockQuantity: number;
  weightUnit: string;
  origin: string;
  ingredients: string;
  nutritionInfo: {
    calories: string;
    protein: string;
    carbs: string;
    fiber: string;
    fat: string;
  };
  description: string;
  categorySlug: string;
  categoryName: string;
  isFeaturedNew: boolean;
  releasedAt: string;
  rating: number;
  reviewCount: number;
  images: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  productCount: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  authorName: string;
  readingTimeMinutes: number;
  categorySlug: string;
  categoryName: string;
  publishedAt: string;
  isFeatured: boolean;
  relatedProductIds: string[];
}

export interface Question {
  id: string;
  authorName: string;
  authorEmail: string;
  questionType: 'General' | 'Product' | 'Nutrition' | 'Cooking';
  content: string;
  createdAt: string;
  status: 'APPROVED' | 'PENDING';
  productId?: string;
  productName?: string;
  answer?: {
    responderName: string;
    content: string;
    createdAt: string;
    isOfficial: boolean;
  };
}

export interface Review {
  id: string;
  productId: string;
  orderId: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: string;
  verified: boolean;
  images?: string[];
}

export const MOCK_CATEGORIES: Category[] = [];

export const MOCK_PRODUCTS: Product[] = [];

export const MOCK_BLOG_POSTS: BlogPost[] = [];

export const MOCK_QUESTIONS: Question[] = [];

export const MOCK_REVIEWS: Review[] = [];
