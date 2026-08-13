import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore } from '../stores/cart-store';
import { useTodoStore } from '../stores/todo-store';

describe('Zustand Client Stores Unit Tests', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  describe('useCartStore', () => {
    it('should add item to cart and calculate subtotal correctly', () => {
      const store = useCartStore.getState();
      
      store.addItem({
        id: 'prod_1',
        name: 'Gạo Lứt Đỏ ST25',
        price: 120000,
        weightUnit: '1kg',
        image: '/img1.jpg',
        slug: 'gao-lut-do-st25',
      }, 2);

      expect(useCartStore.getState().items.length).toBe(1);
      expect(useCartStore.getState().items[0].quantity).toBe(2);
      expect(useCartStore.getState().getSubtotal()).toBe(240000);
      expect(useCartStore.getState().getShippingFee()).toBe(30000); // subtotal < 300,000
      expect(useCartStore.getState().getGrandTotal()).toBe(270000);
    });

    it('should grant free shipping when subtotal >= 300,000 VND', () => {
      const store = useCartStore.getState();
      
      store.addItem({
        id: 'prod_1',
        name: 'Gạo Lứt Đỏ ST25',
        price: 150000,
        weightUnit: '1kg',
        image: '/img1.jpg',
        slug: 'gao-lut-do-st25',
      }, 2);

      expect(useCartStore.getState().getSubtotal()).toBe(300000);
      expect(useCartStore.getState().getShippingFee()).toBe(0);
      expect(useCartStore.getState().getGrandTotal()).toBe(300000);
    });

    it('should update quantity and remove item when quantity is 0', () => {
      const store = useCartStore.getState();
      
      store.addItem({
        id: 'prod_1',
        name: 'Gạo Lứt Đỏ ST25',
        price: 120000,
        weightUnit: '1kg',
        image: '/img1.jpg',
        slug: 'gao-lut-do-st25',
      }, 1);

      store.updateQuantity('prod_1', 3);
      expect(useCartStore.getState().items[0].quantity).toBe(3);

      store.updateQuantity('prod_1', 0);
      expect(useCartStore.getState().items.length).toBe(0);
    });

    it('should throw error when adding quantity exceeding stockQuantity (e.g. stock=3, choose 5)', () => {
      const store = useCartStore.getState();

      expect(() => {
        store.addItem(
          {
            id: 'prod_stock_test',
            name: 'Túi Gạo Thử Nghiệm',
            price: 50000,
            weightUnit: '1kg',
            image: '/img.jpg',
            slug: 'tui-gao-thu-nghiem',
            stockQuantity: 3,
          },
          5
        );
      }).toThrow('Số lượng không đủ! Sản phẩm "Túi Gạo Thử Nghiệm" hiện chỉ còn 3 túi trong kho.');
    });
  });

  describe('useTodoStore', () => {
    it('should add todo item, toggle status, and filter by date', () => {
      const today = '2026-08-10';
      const store = useTodoStore.getState();

      store.addTodo('Uống 1L nước trà gạo lứt', today, 'Mô tả chi tiết');

      const todayTodos = store.getTodosByDate(today);
      const addedTodo = todayTodos.find((t) => t.title === 'Uống 1L nước trà gạo lứt');

      expect(addedTodo).toBeDefined();
      expect(addedTodo?.completed).toBe(false);

      if (addedTodo) {
        store.toggleTodo(addedTodo.id);
        const updatedTodo = useTodoStore.getState().todos.find((t) => t.id === addedTodo.id);
        expect(updatedTodo?.completed).toBe(true);
      }
    });
  });
});
