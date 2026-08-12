import { LoyaltyPointCalculator } from '@domain/services/loyalty-point.calculator';

describe('LoyaltyPointCalculator Domain Service', () => {
  it('should calculate points earned based on 10,000 VNĐ = 1 Point rule', () => {
    expect(LoyaltyPointCalculator.calculatePointsEarned(0)).toBe(0);
    expect(LoyaltyPointCalculator.calculatePointsEarned(9999)).toBe(0);
    expect(LoyaltyPointCalculator.calculatePointsEarned(10000)).toBe(1);
    expect(LoyaltyPointCalculator.calculatePointsEarned(250000)).toBe(25);
    expect(LoyaltyPointCalculator.calculatePointsEarned(359000)).toBe(35);
  });

  it('should calculate discount amount based on 10 Points = 1,000 VNĐ rule', () => {
    expect(LoyaltyPointCalculator.calculatePointsDiscountAmount(0)).toBe(0);
    expect(LoyaltyPointCalculator.calculatePointsDiscountAmount(10)).toBe(1000);
    expect(LoyaltyPointCalculator.calculatePointsDiscountAmount(50)).toBe(5000);
  });

  it('should validate point redemption rules correctly', () => {
    // Valid cases
    expect(LoyaltyPointCalculator.validateRedemption(0, 50, 100000).isValid).toBe(true);
    expect(LoyaltyPointCalculator.validateRedemption(10, 50, 100000).isValid).toBe(true);
    expect(LoyaltyPointCalculator.validateRedemption(50, 50, 100000).isValid).toBe(true);

    // Minimum points check
    const minCheck = LoyaltyPointCalculator.validateRedemption(5, 50, 100000);
    expect(minCheck.isValid).toBe(false);

    // Multiples of 10 check
    const multipleCheck = LoyaltyPointCalculator.validateRedemption(15, 50, 100000);
    expect(multipleCheck.isValid).toBe(false);

    // Insufficient balance check
    const balanceCheck = LoyaltyPointCalculator.validateRedemption(60, 50, 100000);
    expect(balanceCheck.isValid).toBe(false);

    // Discount > subtotal check
    const discountCheck = LoyaltyPointCalculator.validateRedemption(100, 100, 5000);
    expect(discountCheck.isValid).toBe(false);
  });
});
