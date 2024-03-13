import OrderItem from "./order_items";

export default class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[] = [];
  private _total: number;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.sum();
    this.validate();
  }

  public get id(): string {
    return this._id;
  }

  public get customerId(): string {
    return this._customerId;
  }

  public get items(): OrderItem[] {
    return this._items;
  }

  public get total(): number { 
    return this._total;
  }

  validate(): Boolean {
    if (this._id.length === 0) {
      throw new Error('Id');
    }

    if (this._customerId.length === 0) {
      throw new Error('CustomerId');
    }

    if (this._items.length === 0) {
      throw new Error('Items');
    }

    if (this._items.some(item => item.quantity <= 0)) {
      throw new Error('Quantity');
    }

    return true;
  }

  sum(): number {
    return this._items.reduce((acc, item) => acc + item.price, 0);
  }

  addItem(item: OrderItem): void {
    this._items.push(item);
  }

}
