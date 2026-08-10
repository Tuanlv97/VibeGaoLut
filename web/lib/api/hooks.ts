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

// ================= ADMIN HOOKS & MUTATIONS ================= //

// 12. Admin Stats KPI
export function useAdminStats() {
  return useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: async () => {
      try {
        return await fetchAPI<{
          totalRevenue: number;
          totalOrders: number;
          pendingOrdersCount: number;
          totalProducts: number;
        }>('/admin/stats');
      } catch {
        return {
          totalRevenue: 154200000,
          totalOrders: 1248,
          pendingOrdersCount: 18,
          totalProducts: MOCK_PRODUCTS.length,
        };
      }
    },
  });
}

// 13. Admin Orders
export function useAdminOrders(status?: string) {
  return useQuery({
    queryKey: ['admin', 'orders', status],
    queryFn: async () => {
      try {
        const queryStr = status ? `?status=${status}` : '';
        return await fetchAPI<any[]>(`/admin/orders${queryStr}`);
      } catch {
        return [
          {
            id: 'ord-1',
            orderNumber: 'GP-883920',
            customerName: 'Nguyễn Văn An',
            customerPhone: '0912345678',
            customerEmail: 'an.nguyen@example.com',
            province: 'Hà Nội',
            district: 'Cầu Giấy',
            ward: 'Dịch Vọng',
            addressDetail: 'Số 12 Ngõ 45',
            subtotal: 240000,
            shippingFee: 25000,
            totalAmount: 265000,
            paymentMethod: 'COD',
            status: 'PENDING',
            createdAt: new Date().toISOString(),
            items: [
              {
                id: 'item-1',
                productId: 'p-1',
                productName: 'Gạo Lứt Đỏ ST25 GreenPantry 1kg',
                unitPrice: 120000,
                quantity: 2,
                subtotal: 240000,
              },
            ],
          },
        ];
      }
    },
  });
}

// 14. Update Order Status
export function useUpdateOrderStatus() {
  return useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
      return await fetchAPI<any>(`/admin/orders/${orderId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
    },
  });
}

// 15. Create Product
export function useCreateProduct() {
  return useMutation({
    mutationFn: async (payload: any) => {
      return await fetchAPI<any>('/admin/products', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    },
  });
}

// 16. Update Product
export function useUpdateProduct() {
  return useMutation({
    mutationFn: async ({ id, ...payload }: { id: string; [key: string]: any }) => {
      return await fetchAPI<any>(`/admin/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      });
    },
  });
}

// 17. Delete Product
export function useDeleteProduct() {
  return useMutation({
    mutationFn: async (id: string) => {
      return await fetchAPI<any>(`/admin/products/${id}`, {
        method: 'DELETE',
      });
    },
  });
}

// 18. Admin Blog Posts
export function useAdminBlogPosts() {
  return useQuery({
    queryKey: ['admin', 'blog'],
    queryFn: async () => {
      try {
        return await fetchAPI<{ items: any[]; total: number }>('/admin/blog');
      } catch {
        return { items: MOCK_BLOG_POSTS, total: MOCK_BLOG_POSTS.length };
      }
    },
  });
}

// 19. Create Blog Post
export function useCreateBlogPost() {
  return useMutation({
    mutationFn: async (payload: any) => {
      return await fetchAPI<any>('/admin/blog', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    },
  });
}

// 20. Update Blog Post
export function useUpdateBlogPost() {
  return useMutation({
    mutationFn: async ({ id, ...payload }: { id: string; [key: string]: any }) => {
      return await fetchAPI<any>(`/admin/blog/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      });
    },
  });
}

// 21. Delete Blog Post
export function useDeleteBlogPost() {
  return useMutation({
    mutationFn: async (id: string) => {
      return await fetchAPI<any>(`/admin/blog/${id}`, {
        method: 'DELETE',
      });
    },
  });
}

// 22. Admin Questions
export function useAdminQuestions() {
  return useQuery({
    queryKey: ['admin', 'questions'],
    queryFn: async () => {
      try {
        return await fetchAPI<any[]>('/admin/questions');
      } catch {
        return MOCK_QUESTIONS;
      }
    },
  });
}

// 23. Moderate Question Status
export function useModerateQuestionStatus() {
  return useMutation({
    mutationFn: async ({ questionId, status }: { questionId: string; status: string }) => {
      return await fetchAPI<any>(`/admin/questions/${questionId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
    },
  });
}

// 24. Answer Question
export function useAnswerQuestion() {
  return useMutation({
    mutationFn: async ({
      questionId,
      content,
      responderName,
      approve,
    }: {
      questionId: string;
      content: string;
      responderName?: string;
      approve?: boolean;
    }) => {
      return await fetchAPI<any>(`/admin/questions/${questionId}/answer`, {
        method: 'POST',
        body: JSON.stringify({ content, responderName, approve }),
      });
    },
  });
}

// 25. Admin Auth Login
export function useAdminLogin() {
  return useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      return await fetchAPI<{
        accessToken: string;
        user: { id: string; email: string; fullName: string; role: any };
      }>('/admin/auth/login', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    },
  });
}

// 26. Admin Users List
export function useAdminUsers() {
  return useQuery({
    queryKey: ['admin', 'users'],
    queryFn: async () => {
      return await fetchAPI<any[]>('/admin/users');
    },
  });
}

// 27. Create Admin User
export function useCreateAdminUser() {
  return useMutation({
    mutationFn: async (payload: { email: string; password: string; fullName: string; role: string }) => {
      return await fetchAPI<any>('/admin/users', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    },
  });
}

// 28. Update Admin User
export function useUpdateAdminUser() {
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: { fullName?: string; role?: string; isActive?: boolean; password?: string } }) => {
      return await fetchAPI<any>(`/admin/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },
  });
}

// 29. Delete Admin User
export function useDeleteAdminUser() {
  return useMutation({
    mutationFn: async (id: string) => {
      return await fetchAPI<any>(`/admin/users/${id}`, {
        method: 'DELETE',
      });
    },
  });
}


