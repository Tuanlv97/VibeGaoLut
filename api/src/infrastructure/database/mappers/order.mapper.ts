import { Order, OrderItem } from '@domain/entities/order.entity';
import { OrderStatus } from '@domain/enums/order-status.enum';
import { OrderOrmEntity } from '../entities/order.orm-entity';
import { OrderItemOrmEntity } from '../entities/order-item.orm-entity';

export class OrderMapper {
  static toDomain(ormEntity: OrderOrmEntity): Order {
    const items = (ormEntity.items || []).map(
      (item) =>
        new OrderItem(
          item.id,
          item.orderId,
          item.productId,
          item.productName,
          Number(item.unitPrice),
          item.quantity,
          Number(item.subtotal),
        ),
    );

    return new Order(
      ormEntity.id,
      ormEntity.orderNumber,
      ormEntity.customerName,
      ormEntity.customerPhone,
      ormEntity.customerEmail,
      ormEntity.province,
      ormEntity.district,
      ormEntity.ward,
      ormEntity.addressDetail,
      Number(ormEntity.subtotal),
      Number(ormEntity.shippingFee),
      Number(ormEntity.totalAmount),
      ormEntity.paymentMethod,
      ormEntity.status as OrderStatus,
      new Date(ormEntity.createdAt),
      items,
      ormEntity.customerId || null,
      ormEntity.pointsUsed || 0,
      Number(ormEntity.pointsDiscountAmount || 0),
      ormEntity.pointsEarned || 0,
    );
  }

  static toOrm(domainEntity: Order): OrderOrmEntity {
    const ormEntity = new OrderOrmEntity();
    ormEntity.id = domainEntity.id;
    ormEntity.orderNumber = domainEntity.orderNumber;
    ormEntity.customerName = domainEntity.customerName;
    ormEntity.customerPhone = domainEntity.customerPhone;
    ormEntity.customerEmail = domainEntity.customerEmail;
    ormEntity.province = domainEntity.province;
    ormEntity.district = domainEntity.district;
    ormEntity.ward = domainEntity.ward;
    ormEntity.addressDetail = domainEntity.addressDetail;
    ormEntity.subtotal = domainEntity.subtotal;
    ormEntity.shippingFee = domainEntity.shippingFee;
    ormEntity.totalAmount = domainEntity.totalAmount;
    ormEntity.paymentMethod = domainEntity.paymentMethod;
    ormEntity.status = domainEntity.status;
    ormEntity.createdAt = domainEntity.createdAt;
    ormEntity.customerId = domainEntity.customerId;
    ormEntity.pointsUsed = domainEntity.pointsUsed;
    ormEntity.pointsDiscountAmount = domainEntity.pointsDiscountAmount;
    ormEntity.pointsEarned = domainEntity.pointsEarned;

    ormEntity.items = (domainEntity.items || []).map((item) => {
      const itemOrm = new OrderItemOrmEntity();
      itemOrm.id = item.id;
      itemOrm.orderId = item.orderId;
      itemOrm.productId = item.productId;
      itemOrm.productName = item.productName;
      itemOrm.unitPrice = item.unitPrice;
      itemOrm.quantity = item.quantity;
      itemOrm.subtotal = item.subtotal;
      return itemOrm;
    });

    return ormEntity;
  }
}
