import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import CustomerValidatorFactory from "../factory/customer.validator.factory";
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
    CustomerValidatorFactory.create().validate(this);

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
