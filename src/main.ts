import Address from "./domain/customer/value-object/address";
import Customer from "./domain/customer/entity/customer";
import Order from "./domain/checkout/entity/order";
import OrderItem from "./domain/checkout/entity/order_items";

const customer = new Customer('1', 'Anso');
customer.address = new Address('Rua A', 10, '', 'Cidade B');

const item1 = new OrderItem('1', 'Item 1', 100, 'p1', 100);
const item2 = new OrderItem('2', 'Item 2', 200, 'p2', 100);

const order = new Order('1', customer.id, [item1, item2])