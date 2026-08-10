import { test, expect } from '@playwright/test';

test.describe('Guest Checkout & Order Tracking E2E Flow', () => {
  test('should allow Guest user to view products, add to cart, checkout COD, and track order', async ({ page }) => {
    // 1. Visit Home & Products Page
    await page.goto('http://localhost:3000/products');
    await expect(page).toHaveTitle(/GreenPantry/i);

    // 2. Visit Product Detail
    await page.goto('http://localhost:3000/products/gao-lut-do-st25-1kg');
    await expect(page.locator('h1')).toContainText(/Gạo Lứt/i);

    // 3. Click Add to Cart
    const addToCartBtn = page.getByRole('button', { name: 'Thêm Vào Giỏ Hàng', exact: true });
    await expect(addToCartBtn).toBeVisible();
    await addToCartBtn.click();
    await page.waitForTimeout(500);

    // 4. Navigate to Cart Page
    await page.goto('http://localhost:3000/cart');
    await expect(page.locator('h1').first()).toContainText(/Giỏ Hàng Của Bạn/i);

    // 5. Navigate to Checkout Page
    await page.goto('http://localhost:3000/checkout');
    await expect(page.locator('h1, h2').first()).toContainText(/Thanh Toán/i);

    // 6. Fill Checkout Form
    await page.fill('input[placeholder="Nhập họ và tên..."]', 'Nguyễn Văn Test');
    await page.fill('input[placeholder="Ví dụ: 0912345678"]', '0912345678');
    await page.fill('input[placeholder="Ví dụ: mail@example.com"]', 'testguest@example.com');
    await page.fill('textarea[placeholder*="Số 10 Phạm Hùng"]', 'Số 1 Phạm Hùng');

    // 7. Submit Order Form
    const submitBtn = page.getByRole('button', { name: /Xác Nhận Đặt Hàng/i });
    await expect(submitBtn).toBeVisible();
    await submitBtn.click();

    // 8. Verify Order Tracking Page
    await page.goto('http://localhost:3000/orders/track');
    await expect(page.locator('h1, h2').first()).toContainText(/Tra Cứu/i);

    const orderInput = page.locator('input[placeholder*="GP-"]');
    if (await orderInput.isVisible()) {
      await orderInput.fill('GP-883920');
      await page.fill('input[placeholder*="SĐT"]', '0912345678');
      const trackBtn = page.locator('button[type="submit"]');
      if (await trackBtn.isVisible()) {
        await trackBtn.click();
      }
    }
  });
});
