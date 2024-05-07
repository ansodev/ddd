import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUsecase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress('Anso', new Address('Rua A', 10, '123', 'Cidade B'));

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  };
};

const input = {
  id: customer.id,
  name: 'Anso Updated',
  address: {
    street: 'Rua A Updated',
    number: 20,
    city: 'Cidade B Updated',
    zip: '123 Updated'
  }
};

describe('Update Customer', () => {
  it('should update a customer', async () => {
    const customerRepository = MockRepository();
    const customerUpdateUsecase = new UpdateCustomerUsecase(customerRepository);
    const output = await customerUpdateUsecase.execute(input);
    expect(output).toEqual(input);
  });
});