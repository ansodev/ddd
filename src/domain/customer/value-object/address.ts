export default class Address {
  _street: string;
  _number: number;
  _city: string;
  _zip: string;

  constructor(street: string, number: number, zip: string, city: string) {
    this._street = street;
    this._number = number;
    this._city = city;
    this._zip = zip;
    this.validate();
  }

  get street() {
    return this._street;
  }

  get number() {
    return this._number;
  }

  get city() {
    return this._city;
  }

  get zip() {
    return this._zip;
  }

  validate() {
    if (this._street.length <= 0) {
      throw new Error("Street");
    }

    if (this._city.length <= 0) {
      throw new Error("City");
    }

    if (this._number <= 0) {
      throw new Error("Number");
    }

    if (this._zip.length <= 0) {
      throw new Error("Zipcode");
    }
  }
}
