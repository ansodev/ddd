import Order from "../../../../domain/checkout/entity/order";
import OrderModel from "./order.model";
import OrderItemModel from "./order-item.model";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItem from "../../../../domain/checkout/entity/order_items";

export default class OrderRepository implements OrderRepositoryInterface {
  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        total: entity.total,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );

    entity.items.forEach(async (item) => {
      await OrderItemModel.upsert({
        id: item.id,
        name: item.name,
        product_id: item.productId,
        quantity: item.quantity,
        price: item.price,
        order_id: entity.id,
      }).catch((error) => console.log(error));
    });
  }

  async find(id: string): Promise<Order> {
    const found = await OrderModel.findOne({ where: { id }, include: ["items"] });
    const order = new Order(
      found.id,
      found.customer_id,
      found.items.map(
        (item) =>
          new OrderItem(
            item.id,
            item.name,
            item.price / item.quantity,
            item.product_id,
            item.quantity
          )
      )
    );
    return order;
  }
  
  async findAll(): Promise<Order[]> {
    const orders = await OrderModel.findAll({ include: ["items"] });
    return orders.map((order) => {
      return new Order(
        order.id,
        order.customer_id,
        order.items.map(
          (item) =>
            new OrderItem(
              item.id,
              item.name,
              item.price / item.quantity,
              item.product_id,
              item.quantity
            )
        )
      );
     });
  }

  async create(entity: Order) {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total,
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          product_id: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }
}
