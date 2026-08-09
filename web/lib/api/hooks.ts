import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchAPI } from './client';
import {
  Product,
  Category,
  BlogPost,
  Question,
  MOCK_PRODUCTS,
  MOCK_CATEGORIES,
  MOCK_BLOG_POSTS,
  MOCK_QUESTIONS,
} from '@/lib/mock-data';

export interface ProductsQueryParams {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export interface CreateOrderPayload {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  province: string;
  district: string;
  ward: string;
  addressDetail: string;
  items: { productId: string; quantity: number }[];
}

export interface CreateReviewPayload {
  orderNumber: string;
  customerPhone: string;
  productId: string;
  rating: number;
  comment: string;
  images?: string[];
}

export interface CreateQuestionPayload {
  authorName: string;
  authorEmail: string;
  questionType: string;
  content: string;
  productId?: string;
}

// 1. Hook for Product List
export function useProducts(params?: ProductsQueryParams) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: async () => {
      try {
        const queryStr = new URLSearchParams();
        if (params?.categoryId) queryStr.set('categoryId', params.categoryId);
        if (params?.minPrice) queryStr.set('minPrice', params.minPrice.toString());
        if (params?.maxPrice) queryStr.set('maxPrice', params.maxPrice.toString());
        if (params?.search) queryStr.set('search', params.search);
        if (params?.sort) queryStr.set('sort', params.sort);
        if (params?.page) queryStr.set('page', params.page.toString());
        if (params?.limit) queryStr.set('limit', params.limit.toString());

        const res = await fetchAPI<{ items: any[]; total: number }>(`/products?${queryStr.toString()}`);
        return res;
      } catch {
        // Graceful fallback to Mock Data
        let filtered = [...MOCK_PRODUCTS];
        if (params?.search) {
          const q = params.search.toLowerCase();
          filtered = filtered.filter(
            (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q),
          );
        }
        return { items: filtered, total: filtered.length };
      }
    },
  });
}

// 2. Hook for New Arrivals
export function useNewArrivals() {
  return useQuery({
    queryKey: ['products', 'new-arrivals'],
    queryFn: async () => {
      try {
        return await fetchAPI<any[]>('/products/new-arrivals');
      } catch {
        return MOCK_PRODUCTS.filter((p) => p.isFeaturedNew);
      }
    },
  });
}

// 3. Hook for Product Detail
export function useProductDetail(slug: string) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      try {
        return await fetchAPI<any>(`/products/${slug}`);
      } catch {
        return MOCK_PRODUCTS.find((p) => p.slug === slug || p.id === slug) || MOCK_PRODUCTS[0];
      }
    },
    enabled: Boolean(slug),
  });
}

// 4. Hook for Categories
export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      try {
        return await fetchAPI<any[]>('/categories');
      } catch {
        return MOCK_CATEGORIES;
      }
    },
  });
}

// 5. Hook for Blog Posts
export function useBlogPosts(params?: { categoryId?: string; page?: number }) {
  return useQuery({
    queryKey: ['blog', 'posts', params],
    queryFn: async () => {
      try {
        const queryStr = new URLSearchParams();
        if (params?.categoryId) queryStr.set('categoryId', params.categoryId);
        if (params?.page) queryStr.set('page', params.page.toString());
        return await fetchAPI<{ items: any[]; total: number }>(`/blog/posts?${queryStr.toString()}`);
      } catch {
        return { items: MOCK_BLOG_POSTS, total: MOCK_BLOG_POSTS.length };
      }
    },
  });
}

// 6. Hook for Blog Post Detail
export function useBlogPostDetail(slug: string) {
  return useQuery({
    queryKey: ['blog', 'post', slug],
    queryFn: async () => {
      try {
        return await fetchAPI<{ post: any; relatedProducts: any[] }>(`/blog/posts/${slug}`);
      } catch {
        const post = MOCK_BLOG_POSTS.find((b) => b.slug === slug || b.id === slug) || MOCK_BLOG_POSTS[0];
        const related = MOCK_PRODUCTS.filter((p) => post.relatedProductIds.includes(p.id));
        return { post, relatedProducts: related };
      }
    },
    enabled: Boolean(slug),
  });
}

// 7. Hook for Community Questions
export function useQuestions(productId?: string) {
  return useQuery({
    queryKey: ['questions', productId],
    queryFn: async () => {
      try {
        const queryStr = productId ? `?productId=${productId}` : '';
        return await fetchAPI<any[]>(`/questions${queryStr}`);
      } catch {
        if (productId) {
          return MOCK_QUESTIONS.filter((q) => q.productId === productId);
        }
        return MOCK_QUESTIONS;
      }
    },
  });
}

// 8. Mutation for Guest Checkout
export function useCreateOrder() {
  return useMutation({
    mutationFn: async (payload: CreateOrderPayload) => {
      return await fetchAPI<any>('/orders', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    },
  });
}

// 9. Mutation for Track Order
export function useTrackOrder() {
  return useMutation({
    mutationFn: async ({ orderNumber, customerPhone }: { orderNumber: string; customerPhone: string }) => {
      const queryStr = new URLSearchParams({ orderNumber, customerPhone }).toString();
      return await fetchAPI<any>(`/orders/track?${queryStr}`);
    },
  });
}

// 10. Mutation for Create Review
export function useCreateReview() {
  return useMutation({
    mutationFn: async (payload: CreateReviewPayload) => {
      return await fetchAPI<any>('/reviews', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    },
  });
}

// 11. Mutation for Create Question
export function useCreateQuestion() {
  return useMutation({
    mutationFn: async (payload: CreateQuestionPayload) => {
      return await fetchAPI<any>('/questions', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    },
  });
}
