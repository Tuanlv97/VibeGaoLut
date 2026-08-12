export class LoyaltyPointCalculator {
  public static readonly EARN_RATE_VND_PER_POINT = 10000;
  public static readonly REDEEM_CONVERSION_VND_PER_POINT = 100; // 10 points = 1000 VNĐ
  public static readonly MINIMUM_REDEEM_POINTS = 10;

  /**
   * Calculates points earned for a given order subtotal amount.
   * Rule: Every 10,000 VNĐ = 1 Point.
   */
  public static calculatePointsEarned(subtotal: number): number {
    if (!subtotal || subtotal < this.EARN_RATE_VND_PER_POINT) {
      return 0;
    }
    return Math.floor(subtotal / this.EARN_RATE_VND_PER_POINT);
  }

  /**
   * Calculates VNĐ discount amount for a given number of points.
   * Rule: 10 Points = 1,000 VNĐ (1 Point = 100 VNĐ).
   */
  public static calculatePointsDiscountAmount(pointsToUse: number): number {
    if (!pointsToUse || pointsToUse < 0) {
      return 0;
    }
    return pointsToUse * this.REDEEM_CONVERSION_VND_PER_POINT;
  }

  /**
   * Validates if requested points to use is valid for the customer's balance and order subtotal.
   */
  public static validateRedemption(
    pointsToUse: number,
    availableBalance: number,
    subtotal: number,
  ): { isValid: boolean; message?: string } {
    if (pointsToUse <= 0) {
      return { isValid: true };
    }

    if (pointsToUse < this.MINIMUM_REDEEM_POINTS) {
      return {
        isValid: false,
        message: `Số điểm tối thiểu để quy đổi là ${this.MINIMUM_REDEEM_POINTS} điểm (tương ứng 1.000đ).`,
      };
    }

    if (pointsToUse % 10 !== 0) {
      return {
        isValid: false,
        message: 'Số điểm sử dụng phải là bội số của 10 (ví dụ: 10, 20, 30 điểm).',
      };
    }

    if (pointsToUse > availableBalance) {
      return {
        isValid: false,
        message: `Số điểm muốn sử dụng (${pointsToUse} điểm) vượt quá số dư hiện có (${availableBalance} điểm).`,
      };
    }

    const discountAmount = this.calculatePointsDiscountAmount(pointsToUse);
    if (discountAmount > subtotal) {
      return {
        isValid: false,
        message: 'Số tiền giảm giá từ điểm tích lũy không được vượt quá tạm tính của đơn hàng.',
      };
    }

    return { isValid: true };
  }
}
