import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import ProductInterface from "./product.interface";

export default class Product extends Entity implements ProductInterface {
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    super();
    this.id = id;
    this._name = name;
    this._price = price;
    this.validate();
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;  
  }

  validate() {
    if (this.id.length === 0) {
      this.notification.addError({ context: 'Product', message: 'Id is required' });
    }

    if (this._name.length === 0) {
      this.notification.addError({ context: 'Product', message: 'Name is required' });
    }

    if (this._price < 0) {
      this.notification.addError({ context: 'Product', message: 'Price must be greater than zero' });
    }

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }
  
  changePrice(price: number) {
    this._price = price;
    this.validate();
  }
}