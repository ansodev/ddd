import Address from "../value-object/address";
import Customer from "./customer"

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let customer = new Customer('', 'Anso');
    }).toThrow('Id');
  })

  it("should throw error when name is empty", () => {
    expect(() => {
      let customer = new Customer('123', '');
    }).toThrow('Name');
  })

  it("should throw error when change name to empty string", () => {
    expect(() => {
      let customer = new Customer('123', 'Anso');
      customer.changeName('');
    }).toThrow('Name');
  })

  it("should change name", () => {
    let customer = new Customer('123', 'Anso');
    
    customer.changeName('Jane');

    expect(customer.name).toBe('Jane');
  })

  it("should activate customer", () => {
    const customer = new Customer('1', 'Customer1');
    const address = new Address('Street1', 1, '123', 'City 1');
    customer.address = address;
    
    customer.activate();
    
    expect(customer.isActive()).toBe(true);
  })

  it("should add reward points ", () => {
    const customer = new Customer('1', 'Customer 1');

    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);

    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);

    expect(customer.rewardPoints).toBe(20);
  })
})