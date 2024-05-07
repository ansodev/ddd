import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import Address from "../value-object/address";

export default class Customer extends Entity{
  private _name: string;
  private _address!: Address;
  private _active: boolean = true;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    super();
    this.id = id;
    this._name = name;
    this.validate();
  }

  validate() {
    if (this.id.length === 0) {
      this.notification.addError({ context: 'Customer', message: 'Id is required' });
    }

    if (this._name.length === 0) {
      this.notification.addError({ context: 'Customer', message: 'Name is required' });
    }

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  public get name(): string {
    return this._name;
  }

  public set address(address: Address) {
    this._address = address;
  }

  public get rewardPoints(): number {
    return this._rewardPoints;
  }

  public get address(): Address {
    return this._address;
  }

  activate() {
    this._active = true;
  }

  isActive() {
    return this._active;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  changeAddress(address: Address) {
    this._address = address;
  }
}
