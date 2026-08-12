'use client';

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
        return { items: [], total: 0 };
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
        return [];
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
        return null;
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
        return [];
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
        return { items: [], total: 0 };
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
        return { post: null, relatedProducts: [] };
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
        return [];
      }
    },
  });
}

// 8. Mutation for Guest Checkout
// Local Order Storage Helpers for client-side persistence
export function getLocalOrders(): any[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem('greenpantry_local_orders');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveLocalOrder(order: any) {
  if (typeof window === 'undefined') return;
  try {
    const existing = getLocalOrders();
    const updated = [order, ...existing.filter((o) => o.orderNumber !== order.orderNumber)];
    localStorage.setItem('greenpantry_local_orders', JSON.stringify(updated));
  } catch {}
}

export function updateLocalOrderStatus(orderId: string, status: string) {
  if (typeof window === 'undefined') return;
  try {
    const existing = getLocalOrders();
    const updated = existing.map((o) =>
      o.id === orderId || o.orderNumber === orderId ? { ...o, status } : o
    );
    localStorage.setItem('greenpantry_local_orders', JSON.stringify(updated));
  } catch {}
}

// 8. Mutation for Guest Checkout
export function useCreateOrder() {
  return useMutation({
    mutationFn: async (payload: CreateOrderPayload) => {
      const res = await fetchAPI<any>('/orders', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      if (res && res.orderNumber) {
        saveLocalOrder(res);
      }
      return res;
    },
  });
}

// 9. Mutation for Track Order
export function useTrackOrder() {
  return useMutation({
    mutationFn: async ({ orderNumber, customerPhone }: { orderNumber: string; customerPhone: string }) => {
      try {
        const queryStr = new URLSearchParams({ orderNumber, customerPhone }).toString();
        return await fetchAPI<any>(`/orders/track?${queryStr}`);
      } catch (error) {
        const local = getLocalOrders();
        const found = local.find(
          (o) =>
            o.orderNumber.toLowerCase() === orderNumber.toLowerCase() &&
            (o.customerPhone === customerPhone || !customerPhone)
        );
        if (found) return found;
        throw error;
      }
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
  const { data: orders = [] } = useAdminOrders();
  const { data: productsData } = useProducts();

  return useQuery({
    queryKey: ['admin', 'stats', orders, productsData],
    queryFn: async () => {
      try {
        return await fetchAPI<{
          totalRevenue: number;
          totalOrders: number;
          pendingOrdersCount: number;
          totalProducts: number;
        }>('/admin/stats');
      } catch {
        const totalRevenue = orders.reduce(
          (sum, o) => (o.status !== 'CANCELLED' ? sum + (o.totalAmount || 0) : sum),
          0,
        );
        const pendingOrdersCount = orders.filter((o) => o.status === 'PENDING').length;
        const totalProducts = productsData?.items?.length || MOCK_PRODUCTS.length;

        return {
          totalRevenue,
          totalOrders: orders.length,
          pendingOrdersCount,
          totalProducts,
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
      let apiOrders: any[] = [];
      try {
        const queryStr = status ? `?status=${status}` : '';
        const res = await fetchAPI<any>(`/admin/orders${queryStr}`);
        apiOrders = Array.isArray(res) ? res : (res?.items || []);
      } catch {
        apiOrders = [];
      }

      const localOrders = getLocalOrders();
      const orderMap = new Map<string, any>();

      // Put API orders first, then merge local orders so newly placed guest orders are never lost
      if (Array.isArray(apiOrders)) {
        apiOrders.forEach((o) => {
          if (o && o.orderNumber) orderMap.set(o.orderNumber, o);
        });
      }

      if (Array.isArray(localOrders)) {
        localOrders.forEach((o) => {
          if (o && o.orderNumber) orderMap.set(o.orderNumber, o);
        });
      }

      let allOrders = Array.from(orderMap.values());

      if (status && status !== 'ALL') {
        allOrders = allOrders.filter((o) => o.status === status);
      }

      return allOrders;
    },
  });
}

// 14. Update Order Status
export function useUpdateOrderStatus() {
  return useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
      updateLocalOrderStatus(orderId, status);
      try {
        return await fetchAPI<any>(`/admin/orders/${orderId}/status`, {
          method: 'PATCH',
          body: JSON.stringify({ status }),
        });
      } catch {
        return { success: true, orderId, status };
      }
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
        return { items: [], total: 0 };
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
        return [];
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


