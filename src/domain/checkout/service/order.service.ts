import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_items";
import { v4 as uuid } from 'uuid';

export default class OrderService {
  static placeOrder(customer: Customer, items: OrderItem[]) {
    if (items.length === 0) {
      throw new Error('Order must have at least on item');
    }

    const id = uuid();

    const order = new Order(id, customer.id, items);

    customer.addRewardPoints(order.total / 2);

    return order;
  }

  static total(orders: Order[]) {
    return orders.reduce((acc, order) => acc + order.total, 0);
  }
}