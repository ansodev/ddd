import CustomerRepository from "../../../infrastructure/customer/repostitory/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUsecase from "./find.customer.usecase";

const customer = new Customer('1', 'Customer 1');
const address = new Address('Street 1', 123, 'zip', 'city');
customer.changeAddress(address);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe('Find Customer', () => { 
  
  it('should find a customer', async () => {
    const customerRepository = MockRepository();
    const usecase = new FindCustomerUsecase(customerRepository)

    const input = { id: '1' };

    const output = {
      id: '1',
      name: 'Customer 1',
      address: {
        street: 'Street 1',
        number: 123,
        city: 'city',
        zip: 'zip',
      }
    }

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });

  it('should not found a customer', async () => {
    const customerRepository = MockRepository();
  
    customerRepository.find.mockImplementation(() => {
      throw new Error('Customer not found');
    });

    const usecase = new FindCustomerUsecase(customerRepository)

    const input = { id: '2' };

    expect(() => usecase.execute(input)).rejects.toThrow('Customer not found');
  });

});