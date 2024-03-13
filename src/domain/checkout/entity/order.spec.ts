import Order from "./order"
import OrderItem from "./order_items";


describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      const order = new Order('', '123', []);
    }).toThrow('Id')
  })

  it("should throw error when customer id is empty", () => {
    expect(() => {
      const order = new Order('123', '', []);
    }).toThrow('CustomerId')
  })

  it("should throw error when order items is empty", () => {
    expect(() => {
      const order = new Order('123', '123', []);
    }).toThrow('Items')
  })

  it("should calculate total", () => {
    const item = new OrderItem('i1', 'Item 1', 100, 'p1', 2);
    const item2 = new OrderItem('i2', 'Item 2', 50, 'p2', 2);
    const order = new Order('1', '1', [item, item2]);
    expect(order.total).toBe(300);
  })

  it("should throw error if the item qtd is lesser than 0 ", () => {
    expect(() => {
      const item = new OrderItem('i1', 'Item 1', 100, 'p1', 0);
      const order = new Order('1', '1', [item]);
    }).toThrow('Quantity')
  })
})